import {
  BufferAttribute,
  BufferGeometry,
  ClampToEdgeWrapping,
  CustomBlending,
  DoubleSide,
  LinearFilter,
  LinearMipmapLinearFilter,
  Mesh,
  MeshBasicMaterial,
  NoColorSpace,
  OneFactor,
  OneMinusSrcAlphaFactor,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  SrcAlphaFactor,
  Texture,
  Vector2,
  Vector3,
  Vector4,
  WebGLRenderer,
} from "three";
import type { PageSurface } from "../cache/surfaceCache";
import { CAMERA_FOV } from "../core/layout";
import { FlipBookError } from "../errors";
import { containFit } from "./frame";
import type { FlipRenderer, FrameState, RendererHooks, SlotFrame } from "./frame";
import {
  PAGE_FRAGMENT,
  PAGE_VERTEX,
  SHADOW_FRAGMENT,
  SHADOW_VERTEX,
  SHEET_FRAGMENT,
  SHEET_VERTEX,
} from "./shaders";

/**
 * The curl renderer. Three.js is used directly: two flat planes for the
 * resting pages, a thin seam at the binding, a soft shadow under the book and
 * one subdivided sheet that the vertex shader folds. Nothing is lit by scene
 * lights and there are no shadow maps; all shading is analytic, in the
 * fragment shaders. It draws only when asked.
 */

const PAPER: [number, number, number] = [0.992, 0.988, 0.976];
const SHEET_COLUMNS = 150;
const SHEET_ROWS = 104;

interface FoldUniforms {
  uFoldOn: { value: number };
  uN: { value: Vector2 };
  uD: { value: number };
  uR: { value: number };
  uSide: { value: number };
  uPage: { value: Vector2 };
  uShadow: { value: number };
  uPaper: { value: Vector3 };
  uGutter: { value: number };
}

function sheetGeometry(width: number, height: number, quality: number): BufferGeometry {
  const columns = Math.max(24, Math.round(SHEET_COLUMNS * quality));
  const rows = Math.max(16, Math.round(SHEET_ROWS * quality));
  const positions = new Float32Array((columns + 1) * (rows + 1) * 3);
  let k = 0;
  for (let j = 0; j <= rows; j++) {
    for (let i = 0; i <= columns; i++) {
      positions[k++] = (i / columns) * width;
      positions[k++] = (j / rows - 0.5) * height;
      positions[k++] = 0;
    }
  }
  const indices = new Uint32Array(columns * rows * 6);
  k = 0;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < columns; i++) {
      const a = j * (columns + 1) + i;
      const b = a + 1;
      const c = a + columns + 1;
      const d = c + 1;
      // Alternate the diagonal so a diagonal fold meets an even mesh.
      if ((i + j) % 2 === 0) {
        indices[k++] = a;
        indices[k++] = b;
        indices[k++] = d;
        indices[k++] = a;
        indices[k++] = d;
        indices[k++] = c;
      } else {
        indices[k++] = a;
        indices[k++] = b;
        indices[k++] = c;
        indices[k++] = b;
        indices[k++] = d;
        indices[k++] = c;
      }
    }
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  geometry.setIndex(new BufferAttribute(indices, 1));
  return geometry;
}

export class WebGLFlipRenderer implements FlipRenderer {
  readonly kind = "webgl" as const;
  readonly releasesCpuAfterUpload = true;
  readonly canvas: HTMLCanvasElement;
  readonly maxTextureSize: number;

  private readonly renderer: WebGLRenderer;
  private readonly scene = new Scene();
  private readonly camera = new PerspectiveCamera(CAMERA_FOV, 1, 0.1, 10);
  private readonly fold: FoldUniforms;
  private readonly textures = new Map<PageSurface, Texture>();
  private readonly maxAnisotropy: number;

  private leftPage!: Mesh<PlaneGeometry, ShaderMaterial>;
  private rightPage!: Mesh<PlaneGeometry, ShaderMaterial>;
  private incomingLeft: Mesh<PlaneGeometry, ShaderMaterial> | null = null;
  private incomingRight: Mesh<PlaneGeometry, ShaderMaterial> | null = null;
  private sheet!: Mesh<BufferGeometry, ShaderMaterial>;
  private seam!: Mesh<PlaneGeometry, MeshBasicMaterial>;
  private shadow!: Mesh<PlaneGeometry, ShaderMaterial>;

  private pageWidth = 0;
  private pageHeight = 0;
  private meshQuality = 0;
  private lost = false;
  private disposed = false;

  constructor(
    canvas: HTMLCanvasElement,
    private readonly hooks: RendererHooks,
  ) {
    this.canvas = canvas;
    try {
      this.renderer = new WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        premultipliedAlpha: true,
        preserveDrawingBuffer: false,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      });
    } catch (error) {
      throw new FlipBookError("WEBGL_UNAVAILABLE", "WebGL is not available", { cause: error });
    }
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setPixelRatio(1);
    this.renderer.sortObjects = true;
    this.maxTextureSize = this.renderer.capabilities.maxTextureSize || 4096;
    this.maxAnisotropy = Math.min(4, this.renderer.capabilities.getMaxAnisotropy() || 1);

    this.fold = {
      uFoldOn: { value: 0 },
      uN: { value: new Vector2(1, 0) },
      uD: { value: 1e6 },
      uR: { value: 0 },
      uSide: { value: 1 },
      uPage: { value: new Vector2(1, 1) },
      uShadow: { value: 0 },
      uPaper: { value: new Vector3(...PAPER) },
      uGutter: { value: 1 },
    };

    canvas.addEventListener("webglcontextlost", this.onContextLost, false);
    canvas.addEventListener("webglcontextrestored", this.onContextRestored, false);
  }

  private readonly onContextLost = (event: Event) => {
    event.preventDefault();
    this.lost = true;
    // Every GPU copy is gone; the surfaces that gave up their pixels are too.
    this.textures.clear();
    this.hooks.onContextLost();
  };

  private readonly onContextRestored = () => {
    this.lost = false;
    this.hooks.onContextRestored();
  };

  get contextLost(): boolean {
    return this.lost;
  }

  private pageMaterial(side: 1 | -1): ShaderMaterial {
    return new ShaderMaterial({
      vertexShader: PAGE_VERTEX,
      fragmentShader: PAGE_FRAGMENT,
      uniforms: {
        ...this.fold,
        uMap: { value: null },
        uHasMap: { value: 0 },
        uFit: { value: new Vector2(1, 1) },
        uPageSide: { value: side },
        uOpacity: { value: 1 },
      },
      depthTest: false,
      depthWrite: false,
    });
  }

  private build(width: number, height: number): void {
    this.pageWidth = width;
    this.pageHeight = height;
    this.fold.uPage.value.set(width, height);

    for (const mesh of [this.leftPage, this.rightPage, this.incomingLeft, this.incomingRight, this.seam, this.shadow]) {
      if (!mesh) continue;
      this.scene.remove(mesh);
      mesh.geometry.dispose();
      mesh.material.dispose();
    }
    this.incomingLeft = null;
    this.incomingRight = null;

    const plane = () => new PlaneGeometry(width, height);
    this.leftPage = new Mesh(plane(), this.pageMaterial(-1));
    this.leftPage.position.x = -width / 2;
    this.rightPage = new Mesh(plane(), this.pageMaterial(1));
    this.rightPage.position.x = width / 2;
    for (const mesh of [this.leftPage, this.rightPage]) {
      mesh.renderOrder = 0;
      mesh.frustumCulled = false;
      this.scene.add(mesh);
    }

    this.seam = new Mesh(
      new PlaneGeometry(1, height),
      new MeshBasicMaterial({ color: 0x222a35, depthTest: true, depthWrite: false }),
    );
    this.seam.position.z = 0.0012 * width;
    this.seam.renderOrder = 2;
    this.scene.add(this.seam);

    this.shadow = new Mesh(
      new PlaneGeometry(2 * width + 1.2 * width, height + 1.2 * width),
      new ShaderMaterial({
        vertexShader: SHADOW_VERTEX,
        fragmentShader: SHADOW_FRAGMENT,
        uniforms: { uRect: { value: new Vector4(-width, width, height / 2, 0.035 * width) }, uStrength: { value: 0.3 } },
        // Blended, but kept in the opaque pass so it is drawn before the
        // pages; three.js draws everything marked transparent after them.
        transparent: false,
        blending: CustomBlending,
        blendSrc: SrcAlphaFactor,
        blendDst: OneMinusSrcAlphaFactor,
        blendSrcAlpha: OneFactor,
        blendDstAlpha: OneMinusSrcAlphaFactor,
        depthTest: false,
        depthWrite: false,
      }),
    );
    this.shadow.renderOrder = -1;
    this.shadow.frustumCulled = false;
    this.scene.add(this.shadow);

    this.buildSheet(this.meshQuality || 1);
  }

  private buildSheet(quality: number): void {
    if (this.sheet) {
      this.scene.remove(this.sheet);
      this.sheet.geometry.dispose();
      this.sheet.material.dispose();
    }
    this.meshQuality = quality;
    this.sheet = new Mesh(
      sheetGeometry(this.pageWidth, this.pageHeight, quality),
      new ShaderMaterial({
        vertexShader: SHEET_VERTEX,
        fragmentShader: SHEET_FRAGMENT,
        uniforms: {
          ...this.fold,
          uGrab: { value: new Vector2() },
          uSag: { value: 0 },
          uRestMap: { value: null },
          uTurnedMap: { value: null },
          uHasRest: { value: 0 },
          uHasTurned: { value: 0 },
          uFitRest: { value: new Vector2(1, 1) },
          uFitTurned: { value: new Vector2(1, 1) },
          uCurl: { value: 0 },
        },
        side: DoubleSide,
        depthTest: true,
        depthWrite: true,
      }),
    );
    this.sheet.renderOrder = 1;
    this.sheet.frustumCulled = false;
    this.sheet.visible = false;
    this.scene.add(this.sheet);
  }

  private ensureIncoming(): void {
    if (this.incomingLeft && this.incomingRight) return;
    const plane = () => new PlaneGeometry(this.pageWidth, this.pageHeight);
    this.incomingLeft = new Mesh(plane(), this.pageMaterial(-1));
    this.incomingRight = new Mesh(plane(), this.pageMaterial(1));
    for (const mesh of [this.incomingLeft, this.incomingRight]) {
      mesh.renderOrder = 0;
      mesh.frustumCulled = false;
      mesh.visible = false;
      this.scene.add(mesh);
    }
  }

  private textureFor(surface: PageSurface | null): Texture | null {
    if (!surface || surface.disposed) return null;
    const existing = this.textures.get(surface);
    if (existing) return existing;
    if (!surface.image) return null;
    const texture = new Texture(surface.image as never);
    texture.colorSpace = NoColorSpace;
    texture.flipY = false;
    texture.premultiplyAlpha = false;
    texture.generateMipmaps = true;
    texture.minFilter = LinearMipmapLinearFilter;
    texture.magFilter = LinearFilter;
    texture.wrapS = ClampToEdgeWrapping;
    texture.wrapT = ClampToEdgeWrapping;
    texture.anisotropy = this.maxAnisotropy;
    texture.needsUpdate = true;
    texture.onUpdate = () => {
      // The pixels are on the GPU now; the owner may free the CPU copy.
      texture.onUpdate = null as never;
      this.hooks.onUploaded(surface);
    };
    this.textures.set(surface, texture);
    return texture;
  }

  private applySlot(
    mesh: Mesh<PlaneGeometry, ShaderMaterial>,
    slot: SlotFrame,
    contain: boolean,
    offset: number,
    opacity: number,
    side: 1 | -1,
  ): void {
    mesh.visible = slot.exists && opacity > 0.001;
    if (!mesh.visible) return;
    const uniforms = mesh.material.uniforms;
    const texture = this.textureFor(slot.surface);
    uniforms.uMap.value = texture;
    uniforms.uHasMap.value = texture ? 1 : 0;
    const fit = containFit(slot.surface, this.pageWidth / this.pageHeight, contain);
    (uniforms.uFit.value as Vector2).set(fit[0], fit[1]);
    uniforms.uOpacity.value = opacity;
    mesh.material.transparent = opacity < 0.999;
    mesh.position.x = (side * this.pageWidth) / 2 + offset;
  }

  resize(cssWidth: number, cssHeight: number, pixelRatio: number): void {
    const width = Math.max(1, Math.round(cssWidth * pixelRatio));
    const height = Math.max(1, Math.round(cssHeight * pixelRatio));
    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.renderer.setSize(width, height, false);
    }
  }

  render(frame: FrameState): void {
    if (this.disposed || this.lost) return;
    const { layout, camera } = frame;
    const { w, h } = layout.page;
    if (w !== this.pageWidth || h !== this.pageHeight) this.build(w, h);
    const quality = Math.round(frame.meshQuality * 20) / 20;
    if (quality !== this.meshQuality) this.buildSheet(quality);

    const cam = this.camera;
    cam.aspect = layout.cssWidth / layout.cssHeight;
    cam.zoom = camera.zoom;
    cam.near = Math.max(0.05, layout.cameraDistance - 2.5);
    cam.far = layout.cameraDistance + 1;
    cam.position.set(camera.x, camera.y, layout.cameraDistance);
    cam.updateProjectionMatrix();
    cam.updateMatrixWorld();

    const fold = this.fold;
    const sheet = frame.sheet;
    if (sheet && sheet.fold.active) {
      fold.uFoldOn.value = 1;
      fold.uN.value.set(sheet.fold.nx, sheet.fold.ny);
      fold.uD.value = sheet.fold.d;
      fold.uR.value = sheet.fold.r;
      fold.uSide.value = sheet.side;
      fold.uShadow.value = frame.shadowOpacity * sheet.fold.envelope;
    } else {
      fold.uFoldOn.value = 0;
      fold.uN.value.set(1, 0);
      fold.uD.value = 1e6;
      fold.uR.value = 0;
      fold.uSide.value = sheet ? sheet.side : 1;
      fold.uShadow.value = 0;
    }
    fold.uGutter.value = frame.seam.visible ? 1 : 0;

    const slide = frame.slide;
    this.applySlot(this.leftPage, frame.left, frame.contain, slide?.outgoingOffset ?? 0, slide?.outgoingOpacity ?? 1, -1);
    this.applySlot(this.rightPage, frame.right, frame.contain, slide?.outgoingOffset ?? 0, slide?.outgoingOpacity ?? 1, 1);
    if (slide) {
      this.ensureIncoming();
      this.applySlot(this.incomingLeft!, slide.incomingLeft, frame.contain, slide.incomingOffset, slide.incomingOpacity, -1);
      this.applySlot(this.incomingRight!, slide.incomingRight, frame.contain, slide.incomingOffset, slide.incomingOpacity, 1);
    } else if (this.incomingLeft && this.incomingRight) {
      this.incomingLeft.visible = false;
      this.incomingRight.visible = false;
    }

    this.sheet.visible = !!sheet;
    if (sheet) {
      const uniforms = this.sheet.material.uniforms;
      const rest = this.textureFor(sheet.rest.surface);
      const turned = this.textureFor(sheet.turned.surface);
      const aspect = this.pageWidth / this.pageHeight;
      uniforms.uRestMap.value = rest;
      uniforms.uHasRest.value = rest ? 1 : 0;
      uniforms.uTurnedMap.value = turned;
      uniforms.uHasTurned.value = turned ? 1 : 0;
      const fitRest = containFit(sheet.rest.surface, aspect, frame.contain);
      const fitTurned = containFit(sheet.turned.surface, aspect, frame.contain);
      (uniforms.uFitRest.value as Vector2).set(fitRest[0], fitRest[1]);
      (uniforms.uFitTurned.value as Vector2).set(fitTurned[0], fitTurned[1]);
      (uniforms.uGrab.value as Vector2).set(sheet.fold.grabU, sheet.fold.grabV);
      uniforms.uSag.value = sheet.fold.active ? sheet.fold.sag : 0;
      uniforms.uCurl.value = frame.shadowOpacity * sheet.fold.envelope;
    }

    this.seam.visible = frame.seam.visible && !slide;
    if (this.seam.visible) {
      this.seam.scale.x = Math.max(1e-4, frame.seam.cssWidth / layout.pxPerWorld);
      this.seam.material.color.set(frame.seam.color);
    }

    const shadowUniforms = this.shadow.material.uniforms;
    this.shadow.visible = frame.bookRight > frame.bookLeft && !slide;
    (shadowUniforms.uRect.value as Vector4).set(frame.bookLeft, frame.bookRight, h / 2, 0.035 * w);

    this.renderer.render(this.scene, cam);
  }

  dropSurface(surface: PageSurface): void {
    const texture = this.textures.get(surface);
    if (!texture) return;
    this.textures.delete(surface);
    texture.dispose();
  }

  finish(): void {
    if (this.lost || this.disposed) return;
    this.renderer.getContext().finish();
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    this.canvas.removeEventListener("webglcontextlost", this.onContextLost, false);
    this.canvas.removeEventListener("webglcontextrestored", this.onContextRestored, false);
    for (const texture of this.textures.values()) texture.dispose();
    this.textures.clear();
    for (const mesh of [this.leftPage, this.rightPage, this.incomingLeft, this.incomingRight, this.sheet, this.seam, this.shadow]) {
      if (!mesh) continue;
      this.scene.remove(mesh);
      mesh.geometry.dispose();
      (mesh.material as ShaderMaterial).dispose();
    }
    this.renderer.dispose();
    // Hand the context back promptly; browsers cap how many may be live.
    this.renderer.forceContextLoss();
  }
}
