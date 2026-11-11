/**
 * GLSL for the three materials. The fold in SHEET_VERTEX repeats
 * `foldPoint` from core/fold.ts line for line; change them together.
 *
 * Colour: textures are sampled and written as they are, with no colour-space
 * conversion on either side, so a printed patch has the same value on a
 * resting page and on the moving sheet. Shading only ever multiplies.
 */

const COMMON = /* glsl */ `
const float PI = 3.141592653589793;

uniform float uFoldOn;
uniform vec2 uN;
uniform float uD;
uniform float uR;
uniform float uSide;
uniform vec2 uPage;
uniform float uShadow;
uniform vec3 uPaper;
uniform float uGutter;

float sdSheet(vec2 m) {
  vec2 q = abs(m - vec2(0.5 * uPage.x, 0.0)) - 0.5 * uPage;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0);
}

// How high the paper rises past the fold line at a point on that line, as a
// share of the full lift 2r. Follows the line's ruling out along uN to where
// the sheet ends: far enough and the paper goes right over (1); near either
// end of the fold, where the line leaves the sheet, it barely lifts (0).
float riseAt(vec2 foot) {
  vec2 n = vec2(abs(uN.x) < 1e-5 ? 1e-5 : uN.x, abs(uN.y) < 1e-5 ? 1e-5 : uN.y);
  vec2 a = (vec2(0.0, -0.5 * uPage.y) - foot) / n;
  vec2 b = (vec2(uPage.x, 0.5 * uPage.y) - foot) / n;
  float enter = max(max(min(a.x, b.x), min(a.y, b.y)), 0.0);
  float leave = min(max(a.x, b.x), max(a.y, b.y));
  float chord = leave - enter;
  if (chord <= 0.0) return 0.0;
  float t = clamp(leave / max(PI * uR, 0.02 * uPage.x), 0.0, 1.0);
  float height = sin(0.5 * PI * t);
  return height * height * clamp(chord / (0.03 * uPage.x), 0.0, 1.0);
}

// Shadow of the flap lying over the fixed part of the sheet, for a point q
// on that side of the fold line (s <= 0). The flap is found by reflecting q
// back into material space.
float flapShadow(vec2 q, float s) {
  float soft = 1.5 * uR + 0.012 * uPage.x;
  vec2 m = q + (PI * uR - 2.0 * s) * uN;
  float outside = max(sdSheet(m), 0.0);
  return uShadow * 0.8 * exp(-outside / soft);
}

// Contact shadow the turning sheet casts on the plane z = 0, for a point q
// given in the sheet's own frame: the flap on one side of the fold line, the
// roll on the other. The roll's shadow is as deep and as wide as the paper
// is high beside it, so it thins out toward the ends of the fold instead of
// running at full strength to the page edge.
float foldShadow(vec2 q) {
  float s = dot(uN, q) - uD;
  if (s <= 0.0) return flapShadow(q, s);
  float rise = riseAt(q - s * uN);
  float soft = 1.5 * uR * rise + 0.012 * uPage.x;
  float beyond = max(s - uR * min(1.0, 2.0 * rise), 0.0);
  return uShadow * smoothstep(0.0, 0.5, rise) * exp(-beyond / (1.3 * soft));
}

// Soft darkening toward the binding, the same on resting and turning paper.
float gutter(float u) {
  return 1.0 - uGutter * (0.085 * exp(-u / 0.016) + 0.03 * exp(-u / 0.085));
}

vec3 pageColor(sampler2D map, float hasMap, vec2 uv, vec2 fit) {
  vec2 f = (uv - 0.5) * fit + 0.5;
  vec4 texel = texture2D(map, vec2(f.x, 1.0 - f.y));
  float inside = step(0.0, f.x) * step(f.x, 1.0) * step(0.0, f.y) * step(f.y, 1.0);
  return mix(uPaper, texel.rgb, texel.a * inside * hasMap);
}
`;

export const PAGE_VERTEX = /* glsl */ `
varying vec2 vUv;
varying vec2 vWorld;
void main() {
  vUv = uv;
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorld = world.xy;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

export const PAGE_FRAGMENT = /* glsl */ `
${COMMON}
uniform sampler2D uMap;
uniform float uHasMap;
uniform vec2 uFit;
uniform float uPageSide;
uniform float uOpacity;
varying vec2 vUv;
varying vec2 vWorld;
void main() {
  vec3 color = pageColor(uMap, uHasMap, vUv, uFit);
  float u = uPageSide > 0.0 ? vUv.x : 1.0 - vUv.x;
  float shade = gutter(u);
  if (uFoldOn > 0.5) shade *= 1.0 - foldShadow(vec2(vWorld.x * uSide, vWorld.y));
  gl_FragColor = vec4(color * shade, uOpacity);
}
`;

export const SHEET_VERTEX = /* glsl */ `
const float PI = 3.141592653589793;
uniform vec2 uN;
uniform float uD;
uniform float uR;
uniform float uSide;
uniform vec2 uPage;
uniform vec2 uGrab;
uniform float uSag;
varying vec2 vMaterial;
varying vec3 vNormal;
varying vec3 vPosition;
varying float vS;
void main() {
  vec2 m = position.xy;
  float s = dot(uN, m) - uD;
  vec3 p = vec3(m, 0.0);
  vec3 n = vec3(0.0, 0.0, 1.0);
  float wrap = 0.0;
  if (s > 0.0) {
    if (uR <= 1e-6) {
      p.xy = m - 2.0 * s * uN;
      n = vec3(0.0, 0.0, -1.0);
      wrap = 1.0;
    } else if (s < PI * uR) {
      float theta = s / uR;
      float halfSine = sin(0.5 * theta);
      p.xy = m - (s - uR * sin(theta)) * uN;
      p.z = 2.0 * uR * halfSine * halfSine;
      n = vec3(-sin(theta) * uN, cos(theta));
      wrap = theta / PI;
    } else {
      p.xy = m - (2.0 * s - PI * uR) * uN;
      p.z = 2.0 * uR;
      n = vec3(0.0, 0.0, -1.0);
      wrap = 1.0;
    }
    if (uSag > 0.0 && p.z > 0.0) {
      float tau = abs(dot(vec2(-uN.y, uN.x), m - uGrab)) / uPage.y;
      float weight = smoothstep(0.0, 1.0, min(tau, 1.0));
      float lifted = uR > 1e-6 ? smoothstep(0.0, 1.0, clamp(s / (PI * uR), 0.0, 1.0)) : 1.0;
      p.z -= min(uSag * weight * lifted, 0.6 * p.z);
    }
  }
  p.x *= uSide;
  n.x *= uSide;
  vMaterial = m;
  vNormal = n;
  vPosition = p;
  vS = s;
  vec4 clip = projectionMatrix * viewMatrix * vec4(p, 1.0);
  // Lifted paper wins the depth test against the part of the sheet still flat.
  clip.z -= 2e-4 * wrap * clip.w;
  gl_Position = clip;
}
`;

export const SHEET_FRAGMENT = /* glsl */ `
${COMMON}
uniform sampler2D uRestMap;
uniform sampler2D uTurnedMap;
uniform float uHasRest;
uniform float uHasTurned;
uniform vec2 uFitRest;
uniform vec2 uFitTurned;
uniform float uCurl;
uniform float uSeamHalf;
varying vec2 vMaterial;
varying vec3 vNormal;
varying vec3 vPosition;
varying float vS;
void main() {
  // Paper still lying on the binding leaves the seam showing, as a resting
  // page does. Paper that has lifted covers it.
  if (vS <= 0.0 && vMaterial.x < uSeamHalf) discard;
  bool restFace = dot(vNormal, cameraPosition - vPosition) > 0.0;
  float u = vMaterial.x / uPage.x;
  float v = vMaterial.y / uPage.y + 0.5;
  // The resting face reads outward from the binding; the other face is the
  // page that will lie on the far side, so its image runs the opposite way.
  float restU = uSide > 0.0 ? u : 1.0 - u;
  vec3 restColor = pageColor(uRestMap, uHasRest, vec2(restU, v), uFitRest);
  vec3 turnedColor = pageColor(uTurnedMap, uHasTurned, vec2(1.0 - restU, v), uFitTurned);
  float radius = max(uR, 1e-5);
  float t = clamp(vS / (PI * radius), 0.0, 1.0);
  float shade = gutter(u);
  vec3 color;
  if (restFace) {
    color = restColor;
    // Inside of the bend: darker the further the paper tilts away from the
    // viewer, so a shallow hand-bend is lightly shaded and a tight roll
    // deeply. Then the shadow of the flap overhead. On the part lying flat
    // it is taken where the paper is; on the bend it is taken at the crease
    // below, so the inside of the curl starts exactly as dark as the paper
    // it rises from and never shows as a bright sliver beside it.
    float tilt = 1.0 - abs(normalize(vNormal).z);
    shade *= 1.0 - uCurl * 0.6 * pow(tilt, 0.8);
    float past = max(vS, 0.0);
    shade *= 1.0 - flapShadow(vMaterial - past * uN, vS - past);
  } else {
    color = turnedColor;
    // Outside of the curl: darkest at the silhouette, easing over the top of
    // the roll and a little way onto the flap.
    float roll = 1.0 - smoothstep(0.5, 1.0, t);
    float tail = 0.4 * exp(-max(vS - PI * radius, 0.0) / (1.5 * radius));
    float sheen = 0.1 * exp(-pow((t - 0.82) / 0.11, 2.0)) * (1.0 - step(1.0, t));
    shade *= 1.0 - uCurl * (max(0.9 * roll, tail) - sheen);
  }
  gl_FragColor = vec4(color * shade, 1.0);
}
`;

export const SHADOW_VERTEX = /* glsl */ `
varying vec2 vWorld;
void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorld = world.xy;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

export const SHADOW_FRAGMENT = /* glsl */ `
uniform vec4 uRect; // minX, maxX, halfHeight, softness
uniform float uStrength;
varying vec2 vWorld;
void main() {
  vec2 centre = vec2(0.5 * (uRect.x + uRect.y), -0.35 * uRect.w);
  vec2 q = abs(vWorld - centre) - vec2(0.5 * (uRect.y - uRect.x), uRect.z);
  float distance = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0);
  float alpha = uStrength * exp(-max(distance, 0.0) / uRect.w);
  gl_FragColor = vec4(0.0, 0.0, 0.0, alpha);
}
`;
