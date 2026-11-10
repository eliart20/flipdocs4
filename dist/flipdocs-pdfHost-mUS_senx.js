var Iy = Object.defineProperty;
var Cg = (c) => {
  throw TypeError(c);
};
var Py = (c, e, t) => e in c ? Iy(c, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : c[e] = t;
var R = (c, e, t) => Py(c, typeof e != "symbol" ? e + "" : e, t), Af = (c, e, t) => e.has(c) || Cg("Cannot " + t);
var n = (c, e, t) => (Af(c, e, "read from private field"), t ? t.call(c) : e.get(c)), y = (c, e, t) => e.has(c) ? Cg("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(c) : e.set(c, t), g = (c, e, t, s) => (Af(c, e, "write to private field"), s ? s.call(c, t) : e.set(c, t), t), w = (c, e, t) => (Af(c, e, "access private method"), t);
var ee = (c, e, t, s) => ({
  set _(i) {
    g(c, e, i, t);
  },
  get _() {
    return n(c, e, s);
  }
});
import { R as Ry } from "./flipdocs-pdfSource-Cr3j4Beq.js";
var Dy = {
  /***/
  9306(c, e, t) {
    var s = t(4901), i = t(6823), r = TypeError;
    c.exports = function(a) {
      if (s(a)) return a;
      throw new r(i(a) + " is not a function");
    };
  },
  /***/
  6194(c, e, t) {
    var s = t(2248).has;
    c.exports = function(i) {
      return s(i), i;
    };
  },
  /***/
  3506(c, e, t) {
    var s = t(3925), i = String, r = TypeError;
    c.exports = function(a) {
      if (s(a)) return a;
      throw new r("Can't set " + i(a) + " as a prototype");
    };
  },
  /***/
  7080(c, e, t) {
    var s = t(4402).has;
    c.exports = function(i) {
      return s(i), i;
    };
  },
  /***/
  3463(c) {
    var e = TypeError;
    c.exports = function(t) {
      if (typeof t == "string") return t;
      throw new e("Argument is not a string");
    };
  },
  /***/
  4328(c, e, t) {
    var s = t(4995), i = new s.WeakMap(), r = s.set, a = s.remove;
    c.exports = function(o) {
      return r(i, o, 1), a(i, o), o;
    };
  },
  /***/
  6557(c, e, t) {
    var s = t(4995).has;
    c.exports = function(i) {
      return s(i), i;
    };
  },
  /***/
  679(c, e, t) {
    var s = t(1625), i = TypeError;
    c.exports = function(r, a) {
      if (s(a, r)) return r;
      throw new i("Incorrect invocation");
    };
  },
  /***/
  3972(c, e, t) {
    var s = t(34), i = String, r = TypeError;
    c.exports = function(a) {
      if (a === void 0 || s(a)) return a;
      throw new r(i(a) + " is not an object or undefined");
    };
  },
  /***/
  8551(c, e, t) {
    var s = t(34), i = String, r = TypeError;
    c.exports = function(a) {
      if (s(a)) return a;
      throw new r(i(a) + " is not an object");
    };
  },
  /***/
  4154(c, e, t) {
    var s = t(6955), i = TypeError;
    c.exports = function(r) {
      if (s(r) === "Uint8Array") return r;
      throw new i("Argument is not an Uint8Array");
    };
  },
  /***/
  7811(c) {
    c.exports = typeof ArrayBuffer < "u" && typeof DataView < "u";
  },
  /***/
  7394(c, e, t) {
    var s = t(4576), i = t(6706), r = t(2195), a = s.ArrayBuffer, o = s.TypeError;
    c.exports = a && i(a.prototype, "byteLength", "get") || function(l) {
      if (r(l) !== "ArrayBuffer") throw new o("ArrayBuffer expected");
      return l.byteLength;
    };
  },
  /***/
  3238(c, e, t) {
    var s = t(4576), i = t(7811), r = t(7394), a = s.DataView;
    c.exports = function(o) {
      if (!i || r(o) !== 0) return !1;
      try {
        return new a(o), !1;
      } catch {
        return !0;
      }
    };
  },
  /***/
  5169(c, e, t) {
    var s = t(3238), i = TypeError;
    c.exports = function(r) {
      if (s(r)) throw new i("ArrayBuffer is detached");
      return r;
    };
  },
  /***/
  5636(c, e, t) {
    var s = t(4576), i = t(9504), r = t(6706), a = t(7696), o = t(5169), l = t(7394), h = t(4483), d = t(1548), u = s.structuredClone, f = s.ArrayBuffer, p = s.DataView, m = Math.min, v = f.prototype, A = p.prototype, b = i(v.slice), E = r(v, "resizable", "get"), S = r(v, "maxByteLength", "get"), T = i(A.getInt8), x = i(A.setInt8);
    c.exports = (d || h) && function(C, I, M) {
      var P = l(C), O = I === void 0 ? P : a(I), D = !E || !E(C), $;
      if (o(C), d && (C = u(C, { transfer: [C] }), P === O && (M || D)))
        return C;
      if (P >= O && (!M || D))
        $ = b(C, 0, O);
      else {
        var F = M && !D && S ? { maxByteLength: S(C) } : void 0;
        $ = new f(O, F);
        for (var N = new p(C), K = new p($), B = m(O, P), k = 0; k < B; k++) x(K, k, T(N, k));
      }
      return d || h(C), $;
    };
  },
  /***/
  4644(c, e, t) {
    var s = t(7811), i = t(3724), r = t(4576), a = t(4901), o = t(34), l = t(9297), h = t(6955), d = t(6823), u = t(6699), f = t(6840), p = t(2106), m = t(1625), v = t(2787), A = t(2967), b = t(8227), E = t(3392), S = t(1181), T = S.enforce, x = S.get, C = r.Int8Array, I = C && C.prototype, M = r.Uint8ClampedArray, P = M && M.prototype, O = C && v(C), D = I && v(I), $ = Object.prototype, F = r.TypeError, N = b("toStringTag"), K = E("TYPED_ARRAY_TAG"), B = "TypedArrayConstructor", k = s && !!A && h(r.opera) !== "Opera", _ = !1, st, mt, ft, et = {
      Int8Array: 1,
      Uint8Array: 1,
      Uint8ClampedArray: 1,
      Int16Array: 2,
      Uint16Array: 2,
      Int32Array: 4,
      Uint32Array: 4,
      Float32Array: 4,
      Float64Array: 8
    }, J = {
      BigInt64Array: 8,
      BigUint64Array: 8
    }, lt = function(ht) {
      if (!o(ht)) return !1;
      var Ot = h(ht);
      return Ot === "DataView" || l(et, Ot) || l(J, Ot);
    }, Mt = function(Y) {
      var ht = v(Y);
      if (o(ht)) {
        var Ot = x(ht);
        return Ot && l(Ot, B) ? Ot[B] : Mt(ht);
      }
    }, U = function(Y) {
      if (!o(Y)) return !1;
      var ht = h(Y);
      return l(et, ht) || l(J, ht);
    }, L = function(Y) {
      if (U(Y)) return Y;
      throw new F("Target is not a typed array");
    }, H = function(Y) {
      if (a(Y) && (!A || m(O, Y))) return Y;
      throw new F(d(Y) + " is not a typed array constructor");
    }, X = function(Y, ht, Ot, is) {
      if (i) {
        if (Ot) for (var ae in et) {
          var te = r[ae];
          if (te && l(te.prototype, Y)) try {
            delete te.prototype[Y];
          } catch {
            try {
              te.prototype[Y] = ht;
            } catch {
            }
          }
        }
        (!D[Y] || Ot) && f(D, Y, Ot ? ht : k && I[Y] || ht, is);
      }
    }, dt = function(Y, ht, Ot) {
      var is, ae;
      if (i) {
        if (A) {
          if (Ot) {
            for (is in et)
              if (ae = r[is], ae && l(ae, Y)) try {
                delete ae[Y];
              } catch {
              }
          }
          if (!O[Y] || Ot)
            try {
              return f(O, Y, Ot ? ht : k && O[Y] || ht);
            } catch {
            }
          else return;
        }
        for (is in et)
          ae = r[is], ae && (!ae[Y] || Ot) && f(ae, Y, ht);
      }
    };
    for (st in et)
      mt = r[st], ft = mt && mt.prototype, ft ? T(ft)[B] = mt : k = !1;
    for (st in J)
      mt = r[st], ft = mt && mt.prototype, ft && (T(ft)[B] = mt);
    if ((!k || !a(O) || O === Function.prototype) && (O = function() {
      throw new F("Incorrect invocation");
    }, k))
      for (st in et)
        r[st] && A(r[st], O);
    if ((!k || !D || D === $) && (D = O.prototype, k))
      for (st in et)
        r[st] && A(r[st].prototype, D);
    if (k && v(P) !== D && A(P, D), i && !l(D, N)) {
      _ = !0, p(D, N, {
        configurable: !0,
        get: function() {
          return o(this) ? this[K] : void 0;
        }
      });
      for (st in et) r[st] && u(r[st], K, st);
    }
    c.exports = {
      NATIVE_ARRAY_BUFFER_VIEWS: k,
      TYPED_ARRAY_TAG: _ && K,
      aTypedArray: L,
      aTypedArrayConstructor: H,
      exportTypedArrayMethod: X,
      exportTypedArrayStaticMethod: dt,
      getTypedArrayConstructor: Mt,
      isView: lt,
      isTypedArray: U,
      TypedArray: O,
      TypedArrayPrototype: D
    };
  },
  /***/
  5370(c, e, t) {
    var s = t(6198);
    c.exports = function(i, r, a) {
      for (var o = 0, l = arguments.length > 2 ? a : s(r), h = new i(l); l > o; ) h[o] = r[o++];
      return h;
    };
  },
  /***/
  9617(c, e, t) {
    var s = t(5397), i = t(5610), r = t(6198), a = function(o) {
      return function(l, h, d) {
        var u = s(l), f = r(u);
        if (f === 0) return !o && -1;
        var p = i(d, f), m;
        if (o && h !== h) {
          for (; f > p; )
            if (m = u[p++], m !== m) return !0;
        } else for (; f > p; p++)
          if ((o || p in u) && u[p] === h) return o || p || 0;
        return !o && -1;
      };
    };
    c.exports = {
      // `Array.prototype.includes` method
      // https://tc39.es/ecma262/#sec-array.prototype.includes
      includes: a(!0),
      // `Array.prototype.indexOf` method
      // https://tc39.es/ecma262/#sec-array.prototype.indexof
      indexOf: a(!1)
    };
  },
  /***/
  4527(c, e, t) {
    var s = t(3724), i = t(4376), r = TypeError, a = Object.getOwnPropertyDescriptor, o = s && !(function() {
      if (this !== void 0) return !0;
      try {
        Object.defineProperty([], "length", { writable: !1 }).length = 1;
      } catch (l) {
        return l instanceof TypeError;
      }
    })();
    c.exports = o ? function(l, h) {
      if (i(l) && !a(l, "length").writable)
        throw new r("Cannot set read only .length");
      return l.length = h;
    } : function(l, h) {
      return l.length = h;
    };
  },
  /***/
  7680(c, e, t) {
    var s = t(9504);
    c.exports = s([].slice);
  },
  /***/
  2804(c) {
    var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", t = e + "+/", s = e + "-_", i = function(r) {
      for (var a = {}, o = 0; o < 64; o++) a[r.charAt(o)] = o;
      return a;
    };
    c.exports = {
      i2c: t,
      c2i: i(t),
      i2cUrl: s,
      c2iUrl: i(s)
    };
  },
  /***/
  6319(c, e, t) {
    var s = t(8551), i = t(9539);
    c.exports = function(r, a, o, l) {
      try {
        return l ? a(s(o)[0], o[1]) : a(o);
      } catch (h) {
        i(r, "throw", h);
      }
    };
  },
  /***/
  2195(c, e, t) {
    var s = t(9504), i = s({}.toString), r = s("".slice);
    c.exports = function(a) {
      return r(i(a), 8, -1);
    };
  },
  /***/
  6955(c, e, t) {
    var s = t(2140), i = t(4901), r = t(2195), a = t(8227), o = a("toStringTag"), l = Object, h = r(/* @__PURE__ */ (function() {
      return arguments;
    })()) === "Arguments", d = function(u, f) {
      try {
        return u[f];
      } catch {
      }
    };
    c.exports = s ? r : function(u) {
      var f, p, m;
      return u === void 0 ? "Undefined" : u === null ? "Null" : typeof (p = d(f = l(u), o)) == "string" ? p : h ? r(f) : (m = r(f)) === "Object" && i(f.callee) ? "Arguments" : m;
    };
  },
  /***/
  7740(c, e, t) {
    var s = t(9297), i = t(5031), r = t(7347), a = t(4913);
    c.exports = function(o, l, h) {
      for (var d = i(l), u = a.f, f = r.f, p = 0; p < d.length; p++) {
        var m = d[p];
        !s(o, m) && !(h && s(h, m)) && u(o, m, f(l, m));
      }
    };
  },
  /***/
  2211(c, e, t) {
    var s = t(9039);
    c.exports = !s(function() {
      function i() {
      }
      return i.prototype.constructor = null, Object.getPrototypeOf(new i()) !== i.prototype;
    });
  },
  /***/
  2529(c) {
    c.exports = function(e, t) {
      return { value: e, done: t };
    };
  },
  /***/
  6699(c, e, t) {
    var s = t(3724), i = t(4913), r = t(6980);
    c.exports = s ? function(a, o, l) {
      return i.f(a, o, r(1, l));
    } : function(a, o, l) {
      return a[o] = l, a;
    };
  },
  /***/
  6980(c) {
    c.exports = function(e, t) {
      return {
        enumerable: !(e & 1),
        configurable: !(e & 2),
        writable: !(e & 4),
        value: t
      };
    };
  },
  /***/
  4659(c, e, t) {
    var s = t(3724), i = t(4913), r = t(6980);
    c.exports = function(a, o, l) {
      s ? i.f(a, o, r(0, l)) : a[o] = l;
    };
  },
  /***/
  2106(c, e, t) {
    var s = t(283), i = t(4913);
    c.exports = function(r, a, o) {
      return o.get && s(o.get, a, { getter: !0 }), o.set && s(o.set, a, { setter: !0 }), i.f(r, a, o);
    };
  },
  /***/
  6840(c, e, t) {
    var s = t(4901), i = t(4913), r = t(283), a = t(9433);
    c.exports = function(o, l, h, d) {
      d || (d = {});
      var u = d.enumerable, f = d.name !== void 0 ? d.name : l;
      if (s(h) && r(h, f, d), d.global)
        u ? o[l] = h : a(l, h);
      else {
        try {
          d.unsafe ? o[l] && (u = !0) : delete o[l];
        } catch {
        }
        u ? o[l] = h : i.f(o, l, {
          value: h,
          enumerable: !1,
          configurable: !d.nonConfigurable,
          writable: !d.nonWritable
        });
      }
      return o;
    };
  },
  /***/
  6279(c, e, t) {
    var s = t(6840);
    c.exports = function(i, r, a) {
      for (var o in r) s(i, o, r[o], a);
      return i;
    };
  },
  /***/
  9433(c, e, t) {
    var s = t(4576), i = Object.defineProperty;
    c.exports = function(r, a) {
      try {
        i(s, r, { value: a, configurable: !0, writable: !0 });
      } catch {
        s[r] = a;
      }
      return a;
    };
  },
  /***/
  3724(c, e, t) {
    var s = t(9039);
    c.exports = !s(function() {
      return Object.defineProperty({}, 1, { get: function() {
        return 7;
      } })[1] !== 7;
    });
  },
  /***/
  4483(c, e, t) {
    var s = t(4576), i = t(9429), r = t(1548), a = s.structuredClone, o = s.ArrayBuffer, l = s.MessageChannel, h = !1, d, u, f, p;
    if (r)
      h = function(m) {
        a(m, { transfer: [m] });
      };
    else if (o) try {
      l || (d = i("worker_threads"), d && (l = d.MessageChannel)), l && (u = new l(), f = new o(2), p = function(m) {
        u.port1.postMessage(null, [m]);
      }, f.byteLength === 2 && (p(f), f.byteLength === 0 && (h = p)));
    } catch {
    }
    c.exports = h;
  },
  /***/
  4055(c, e, t) {
    var s = t(4576), i = t(34), r = s.document, a = i(r) && i(r.createElement);
    c.exports = function(o) {
      return a ? r.createElement(o) : {};
    };
  },
  /***/
  6837(c) {
    var e = TypeError, t = 9007199254740991;
    c.exports = function(s) {
      if (s > t) throw e("Maximum allowed index exceeded");
      return s;
    };
  },
  /***/
  5002(c) {
    c.exports = {
      IndexSizeError: { s: "INDEX_SIZE_ERR", c: 1, m: 1 },
      DOMStringSizeError: { s: "DOMSTRING_SIZE_ERR", c: 2, m: 0 },
      HierarchyRequestError: { s: "HIERARCHY_REQUEST_ERR", c: 3, m: 1 },
      WrongDocumentError: { s: "WRONG_DOCUMENT_ERR", c: 4, m: 1 },
      InvalidCharacterError: { s: "INVALID_CHARACTER_ERR", c: 5, m: 1 },
      NoDataAllowedError: { s: "NO_DATA_ALLOWED_ERR", c: 6, m: 0 },
      NoModificationAllowedError: { s: "NO_MODIFICATION_ALLOWED_ERR", c: 7, m: 1 },
      NotFoundError: { s: "NOT_FOUND_ERR", c: 8, m: 1 },
      NotSupportedError: { s: "NOT_SUPPORTED_ERR", c: 9, m: 1 },
      InUseAttributeError: { s: "INUSE_ATTRIBUTE_ERR", c: 10, m: 1 },
      InvalidStateError: { s: "INVALID_STATE_ERR", c: 11, m: 1 },
      SyntaxError: { s: "SYNTAX_ERR", c: 12, m: 1 },
      InvalidModificationError: { s: "INVALID_MODIFICATION_ERR", c: 13, m: 1 },
      NamespaceError: { s: "NAMESPACE_ERR", c: 14, m: 1 },
      InvalidAccessError: { s: "INVALID_ACCESS_ERR", c: 15, m: 1 },
      ValidationError: { s: "VALIDATION_ERR", c: 16, m: 0 },
      TypeMismatchError: { s: "TYPE_MISMATCH_ERR", c: 17, m: 1 },
      SecurityError: { s: "SECURITY_ERR", c: 18, m: 1 },
      NetworkError: { s: "NETWORK_ERR", c: 19, m: 1 },
      AbortError: { s: "ABORT_ERR", c: 20, m: 1 },
      URLMismatchError: { s: "URL_MISMATCH_ERR", c: 21, m: 1 },
      QuotaExceededError: { s: "QUOTA_EXCEEDED_ERR", c: 22, m: 1 },
      TimeoutError: { s: "TIMEOUT_ERR", c: 23, m: 1 },
      InvalidNodeTypeError: { s: "INVALID_NODE_TYPE_ERR", c: 24, m: 1 },
      DataCloneError: { s: "DATA_CLONE_ERR", c: 25, m: 1 }
    };
  },
  /***/
  8727(c) {
    c.exports = [
      "constructor",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "toLocaleString",
      "toString",
      "valueOf"
    ];
  },
  /***/
  6193(c, e, t) {
    var s = t(4215);
    c.exports = s === "NODE";
  },
  /***/
  2839(c, e, t) {
    var s = t(4576), i = s.navigator, r = i && i.userAgent;
    c.exports = r ? String(r) : "";
  },
  /***/
  9519(c, e, t) {
    var s = t(4576), i = t(2839), r = s.process, a = s.Deno, o = r && r.versions || a && a.version, l = o && o.v8, h, d;
    l && (h = l.split("."), d = h[0] > 0 && h[0] < 4 ? 1 : +(h[0] + h[1])), !d && i && (h = i.match(/Edge\/(\d+)/), (!h || h[1] >= 74) && (h = i.match(/Chrome\/(\d+)/), h && (d = +h[1]))), c.exports = d;
  },
  /***/
  4215(c, e, t) {
    var s = t(4576), i = t(2839), r = t(2195), a = function(o) {
      return i.slice(0, o.length) === o;
    };
    c.exports = (function() {
      return a("Bun/") ? "BUN" : a("Cloudflare-Workers") ? "CLOUDFLARE" : a("Deno/") ? "DENO" : a("Node.js/") ? "NODE" : s.Bun && typeof Bun.version == "string" ? "BUN" : s.Deno && typeof Deno.version == "object" ? "DENO" : r(s.process) === "process" ? "NODE" : s.window && s.document ? "BROWSER" : "REST";
    })();
  },
  /***/
  8574(c, e, t) {
    var s = t(9504), i = Error, r = s("".replace), a = (function(h) {
      return String(new i(h).stack);
    })("zxcasd"), o = /\n\s*at [^:]*:[^\n]*/, l = o.test(a);
    c.exports = function(h, d) {
      if (l && typeof h == "string" && !i.prepareStackTrace)
        for (; d--; ) h = r(h, o, "");
      return h;
    };
  },
  /***/
  6518(c, e, t) {
    var s = t(4576), i = t(7347).f, r = t(6699), a = t(6840), o = t(9433), l = t(7740), h = t(2796);
    c.exports = function(d, u) {
      var f = d.target, p = d.global, m = d.stat, v, A, b, E, S, T;
      if (p ? A = s : m ? A = s[f] || o(f, {}) : A = s[f] && s[f].prototype, A) for (b in u) {
        if (S = u[b], d.dontCallGetSet ? (T = i(A, b), E = T && T.value) : E = A[b], v = h(p ? b : f + (m ? "." : "#") + b, d.forced), !v && E !== void 0) {
          if (typeof S == typeof E) continue;
          l(S, E);
        }
        (d.sham || E && E.sham) && r(S, "sham", !0), a(A, b, S, d);
      }
    };
  },
  /***/
  9039(c) {
    c.exports = function(e) {
      try {
        return !!e();
      } catch {
        return !0;
      }
    };
  },
  /***/
  8745(c, e, t) {
    var s = t(616), i = Function.prototype, r = i.apply, a = i.call;
    c.exports = typeof Reflect == "object" && Reflect.apply || (s ? a.bind(r) : function() {
      return a.apply(r, arguments);
    });
  },
  /***/
  6080(c, e, t) {
    var s = t(7476), i = t(9306), r = t(616), a = s(s.bind);
    c.exports = function(o, l) {
      return i(o), l === void 0 ? o : r ? a(o, l) : function() {
        return o.apply(l, arguments);
      };
    };
  },
  /***/
  616(c, e, t) {
    var s = t(9039);
    c.exports = !s(function() {
      var i = (function() {
      }).bind();
      return typeof i != "function" || i.hasOwnProperty("prototype");
    });
  },
  /***/
  9565(c, e, t) {
    var s = t(616), i = Function.prototype.call;
    c.exports = s ? i.bind(i) : function() {
      return i.apply(i, arguments);
    };
  },
  /***/
  350(c, e, t) {
    var s = t(3724), i = t(9297), r = Function.prototype, a = s && Object.getOwnPropertyDescriptor, o = i(r, "name"), l = o && (function() {
    }).name === "something", h = o && (!s || s && a(r, "name").configurable);
    c.exports = {
      EXISTS: o,
      PROPER: l,
      CONFIGURABLE: h
    };
  },
  /***/
  6706(c, e, t) {
    var s = t(9504), i = t(9306);
    c.exports = function(r, a, o) {
      try {
        return s(i(Object.getOwnPropertyDescriptor(r, a)[o]));
      } catch {
      }
    };
  },
  /***/
  7476(c, e, t) {
    var s = t(2195), i = t(9504);
    c.exports = function(r) {
      if (s(r) === "Function") return i(r);
    };
  },
  /***/
  9504(c, e, t) {
    var s = t(616), i = Function.prototype, r = i.call, a = s && i.bind.bind(r, r);
    c.exports = s ? a : function(o) {
      return function() {
        return r.apply(o, arguments);
      };
    };
  },
  /***/
  944(c) {
    var e = TypeError;
    c.exports = function(t) {
      var s = t && t.alphabet;
      if (s === void 0 || s === "base64" || s === "base64url") return s || "base64";
      throw new e("Incorrect `alphabet` option");
    };
  },
  /***/
  9429(c, e, t) {
    var s = t(4576), i = t(6193);
    c.exports = function(r) {
      if (i) {
        try {
          return s.process.getBuiltinModule(r);
        } catch {
        }
        try {
          return Function('return require("' + r + '")')();
        } catch {
        }
      }
    };
  },
  /***/
  7751(c, e, t) {
    var s = t(4576), i = t(4901), r = function(a) {
      return i(a) ? a : void 0;
    };
    c.exports = function(a, o) {
      return arguments.length < 2 ? r(s[a]) : s[a] && s[a][o];
    };
  },
  /***/
  1767(c) {
    c.exports = function(e) {
      return {
        iterator: e,
        next: e.next,
        done: !1
      };
    };
  },
  /***/
  8646(c, e, t) {
    var s = t(9565), i = t(8551), r = t(1767), a = t(851);
    c.exports = function(o, l) {
      (!l || typeof o != "string") && i(o);
      var h = a(o);
      return r(i(h !== void 0 ? s(h, o) : o));
    };
  },
  /***/
  851(c, e, t) {
    var s = t(6955), i = t(5966), r = t(4117), a = t(6269), o = t(8227), l = o("iterator");
    c.exports = function(h) {
      if (!r(h)) return i(h, l) || i(h, "@@iterator") || a[s(h)];
    };
  },
  /***/
  81(c, e, t) {
    var s = t(9565), i = t(9306), r = t(8551), a = t(6823), o = t(851), l = TypeError;
    c.exports = function(h, d) {
      var u = arguments.length < 2 ? o(h) : d;
      if (i(u)) return r(s(u, h));
      throw new l(a(h) + " is not iterable");
    };
  },
  /***/
  5966(c, e, t) {
    var s = t(9306), i = t(4117);
    c.exports = function(r, a) {
      var o = r[a];
      return i(o) ? void 0 : s(o);
    };
  },
  /***/
  3789(c, e, t) {
    var s = t(9306), i = t(8551), r = t(9565), a = t(1291), o = t(1767), l = "Invalid size", h = RangeError, d = TypeError, u = Math.max, f = function(p, m) {
      this.set = p, this.size = u(m, 0), this.has = s(p.has), this.keys = s(p.keys);
    };
    f.prototype = {
      getIterator: function() {
        return o(i(r(this.keys, this.set)));
      },
      includes: function(p) {
        return r(this.has, this.set, p);
      }
    }, c.exports = function(p) {
      i(p);
      var m = +p.size;
      if (m !== m) throw new d(l);
      var v = a(m);
      if (v < 0) throw new h(l);
      return new f(p, v);
    };
  },
  /***/
  4576(c) {
    var e = function(t) {
      return t && t.Math === Math && t;
    };
    c.exports = // eslint-disable-next-line es/no-global-this -- safe
    e(typeof globalThis == "object" && globalThis) || e(typeof window == "object" && window) || // eslint-disable-next-line no-restricted-globals -- safe
    e(typeof self == "object" && self) || e(typeof global == "object" && global) || e(typeof this == "object" && this) || // eslint-disable-next-line no-new-func -- fallback
    /* @__PURE__ */ (function() {
      return this;
    })() || Function("return this")();
  },
  /***/
  9297(c, e, t) {
    var s = t(9504), i = t(8981), r = s({}.hasOwnProperty);
    c.exports = Object.hasOwn || function(o, l) {
      return r(i(o), l);
    };
  },
  /***/
  421(c) {
    c.exports = {};
  },
  /***/
  397(c, e, t) {
    var s = t(7751);
    c.exports = s("document", "documentElement");
  },
  /***/
  5917(c, e, t) {
    var s = t(3724), i = t(9039), r = t(4055);
    c.exports = !s && !i(function() {
      return Object.defineProperty(r("div"), "a", {
        get: function() {
          return 7;
        }
      }).a !== 7;
    });
  },
  /***/
  7055(c, e, t) {
    var s = t(9504), i = t(9039), r = t(2195), a = Object, o = s("".split);
    c.exports = i(function() {
      return !a("z").propertyIsEnumerable(0);
    }) ? function(l) {
      return r(l) === "String" ? o(l, "") : a(l);
    } : a;
  },
  /***/
  3167(c, e, t) {
    var s = t(4901), i = t(34), r = t(2967);
    c.exports = function(a, o, l) {
      var h, d;
      return (
        // it can work only with native `setPrototypeOf`
        r && // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
        s(h = o.constructor) && h !== l && i(d = h.prototype) && d !== l.prototype && r(a, d), a
      );
    };
  },
  /***/
  3706(c, e, t) {
    var s = t(9504), i = t(4901), r = t(7629), a = s(Function.toString);
    i(r.inspectSource) || (r.inspectSource = function(o) {
      return a(o);
    }), c.exports = r.inspectSource;
  },
  /***/
  1181(c, e, t) {
    var s = t(8622), i = t(4576), r = t(34), a = t(6699), o = t(9297), l = t(7629), h = t(6119), d = t(421), u = "Object already initialized", f = i.TypeError, p = i.WeakMap, m, v, A, b = function(x) {
      return A(x) ? v(x) : m(x, {});
    }, E = function(x) {
      return function(C) {
        var I;
        if (!r(C) || (I = v(C)).type !== x)
          throw new f("Incompatible receiver, " + x + " required");
        return I;
      };
    };
    if (s || l.state) {
      var S = l.state || (l.state = new p());
      S.get = S.get, S.has = S.has, S.set = S.set, m = function(x, C) {
        if (S.has(x)) throw new f(u);
        return C.facade = x, S.set(x, C), C;
      }, v = function(x) {
        return S.get(x) || {};
      }, A = function(x) {
        return S.has(x);
      };
    } else {
      var T = h("state");
      d[T] = !0, m = function(x, C) {
        if (o(x, T)) throw new f(u);
        return C.facade = x, a(x, T, C), C;
      }, v = function(x) {
        return o(x, T) ? x[T] : {};
      }, A = function(x) {
        return o(x, T);
      };
    }
    c.exports = {
      set: m,
      get: v,
      has: A,
      enforce: b,
      getterFor: E
    };
  },
  /***/
  4209(c, e, t) {
    var s = t(8227), i = t(6269), r = s("iterator"), a = Array.prototype;
    c.exports = function(o) {
      return o !== void 0 && (i.Array === o || a[r] === o);
    };
  },
  /***/
  4376(c, e, t) {
    var s = t(2195);
    c.exports = Array.isArray || function(r) {
      return s(r) === "Array";
    };
  },
  /***/
  1108(c, e, t) {
    var s = t(6955);
    c.exports = function(i) {
      var r = s(i);
      return r === "BigInt64Array" || r === "BigUint64Array";
    };
  },
  /***/
  4901(c) {
    var e = typeof document == "object" && document.all;
    c.exports = typeof e > "u" && e !== void 0 ? function(t) {
      return typeof t == "function" || t === e;
    } : function(t) {
      return typeof t == "function";
    };
  },
  /***/
  2796(c, e, t) {
    var s = t(9039), i = t(4901), r = /#|\.prototype\./, a = function(u, f) {
      var p = l[o(u)];
      return p === d ? !0 : p === h ? !1 : i(f) ? s(f) : !!f;
    }, o = a.normalize = function(u) {
      return String(u).replace(r, ".").toLowerCase();
    }, l = a.data = {}, h = a.NATIVE = "N", d = a.POLYFILL = "P";
    c.exports = a;
  },
  /***/
  4117(c) {
    c.exports = function(e) {
      return e == null;
    };
  },
  /***/
  34(c, e, t) {
    var s = t(4901);
    c.exports = function(i) {
      return typeof i == "object" ? i !== null : s(i);
    };
  },
  /***/
  3925(c, e, t) {
    var s = t(34);
    c.exports = function(i) {
      return s(i) || i === null;
    };
  },
  /***/
  6395(c) {
    c.exports = !1;
  },
  /***/
  5810(c, e, t) {
    var s = t(34), i = t(1181).get;
    c.exports = function(a) {
      if (!s(a)) return !1;
      var o = i(a);
      return !!o && o.type === "RawJSON";
    };
  },
  /***/
  757(c, e, t) {
    var s = t(7751), i = t(4901), r = t(1625), a = t(7040), o = Object;
    c.exports = a ? function(l) {
      return typeof l == "symbol";
    } : function(l) {
      var h = s("Symbol");
      return i(h) && r(h.prototype, o(l));
    };
  },
  /***/
  507(c, e, t) {
    var s = t(9565);
    c.exports = function(i, r, a) {
      for (var o = a ? i : i.iterator, l = i.next, h, d; !(h = s(l, o)).done; )
        if (d = r(h.value), d !== void 0) return d;
    };
  },
  /***/
  2652(c, e, t) {
    var s = t(6080), i = t(9565), r = t(8551), a = t(6823), o = t(4209), l = t(6198), h = t(1625), d = t(81), u = t(851), f = t(9539), p = TypeError, m = function(A, b) {
      this.stopped = A, this.result = b;
    }, v = m.prototype;
    c.exports = function(A, b, E) {
      var S = E && E.that, T = !!(E && E.AS_ENTRIES), x = !!(E && E.IS_RECORD), C = !!(E && E.IS_ITERATOR), I = !!(E && E.INTERRUPTED), M = s(b, S), P, O, D, $, F, N, K, B = function(_) {
        return P && f(P, "normal"), new m(!0, _);
      }, k = function(_) {
        return T ? (r(_), I ? M(_[0], _[1], B) : M(_[0], _[1])) : I ? M(_, B) : M(_);
      };
      if (x)
        P = A.iterator;
      else if (C)
        P = A;
      else {
        if (O = u(A), !O) throw new p(a(A) + " is not iterable");
        if (o(O)) {
          for (D = 0, $ = l(A); $ > D; D++)
            if (F = k(A[D]), F && h(v, F)) return F;
          return new m(!1);
        }
        P = d(A, O);
      }
      for (N = x ? A.next : P.next; !(K = i(N, P)).done; ) {
        try {
          F = k(K.value);
        } catch (_) {
          f(P, "throw", _);
        }
        if (typeof F == "object" && F && h(v, F)) return F;
      }
      return new m(!1);
    };
  },
  /***/
  1385(c, e, t) {
    var s = t(9539);
    c.exports = function(i, r, a) {
      for (var o = i.length - 1; o >= 0; o--)
        if (i[o] !== void 0)
          try {
            a = s(i[o].iterator, r, a);
          } catch (l) {
            r = "throw", a = l;
          }
      if (r === "throw") throw a;
      return a;
    };
  },
  /***/
  9539(c, e, t) {
    var s = t(9565), i = t(8551), r = t(5966);
    c.exports = function(a, o, l) {
      var h, d;
      i(a);
      try {
        if (h = r(a, "return"), !h) {
          if (o === "throw") throw l;
          return l;
        }
        h = s(h, a);
      } catch (u) {
        d = !0, h = u;
      }
      if (o === "throw") throw l;
      if (d) throw h;
      return i(h), l;
    };
  },
  /***/
  9462(c, e, t) {
    var s = t(9565), i = t(2360), r = t(6699), a = t(6279), o = t(8227), l = t(1181), h = t(5966), d = t(7657).IteratorPrototype, u = t(2529), f = t(9539), p = t(1385), m = o("toStringTag"), v = "IteratorHelper", A = "WrapForValidIterator", b = "normal", E = "throw", S = l.set, T = function(I) {
      var M = l.getterFor(I ? A : v);
      return a(i(d), {
        next: function() {
          var O = M(this);
          if (I) return O.nextHandler();
          if (O.done) return u(void 0, !0);
          try {
            var D = O.nextHandler();
            return O.returnHandlerResult ? D : u(D, O.done);
          } catch ($) {
            throw O.done = !0, $;
          }
        },
        return: function() {
          var P = M(this), O = P.iterator;
          if (P.done = !0, I) {
            var D = h(O, "return");
            return D ? s(D, O) : u(void 0, !0);
          }
          if (P.inner) try {
            f(P.inner.iterator, b);
          } catch ($) {
            return f(O, E, $);
          }
          if (P.openIters) try {
            p(P.openIters, b);
          } catch ($) {
            return f(O, E, $);
          }
          return O && f(O, b), u(void 0, !0);
        }
      });
    }, x = T(!0), C = T(!1);
    r(C, m, "Iterator Helper"), c.exports = function(I, M, P) {
      var O = function($, F) {
        F ? (F.iterator = $.iterator, F.next = $.next) : F = $, F.type = M ? A : v, F.returnHandlerResult = !!P, F.nextHandler = I, F.counter = 0, F.done = !1, S(this, F);
      };
      return O.prototype = M ? x : C, O;
    };
  },
  /***/
  684(c) {
    c.exports = function(e, t) {
      var s = typeof Iterator == "function" && Iterator.prototype[e];
      if (s) try {
        s.call({ next: null }, t).next();
      } catch {
        return !0;
      }
    };
  },
  /***/
  4549(c, e, t) {
    var s = t(4576);
    c.exports = function(i, r) {
      var a = s.Iterator, o = a && a.prototype, l = o && o[i], h = !1;
      if (l) try {
        l.call({
          next: function() {
            return { done: !0 };
          },
          return: function() {
            h = !0;
          }
        }, -1);
      } catch (d) {
        d instanceof r || (h = !1);
      }
      if (!h) return l;
    };
  },
  /***/
  7657(c, e, t) {
    var s = t(9039), i = t(4901), r = t(34), a = t(2360), o = t(2787), l = t(6840), h = t(8227), d = t(6395), u = h("iterator"), f = !1, p, m, v;
    [].keys && (v = [].keys(), "next" in v ? (m = o(o(v)), m !== Object.prototype && (p = m)) : f = !0);
    var A = !r(p) || s(function() {
      var b = {};
      return p[u].call(b) !== b;
    });
    A ? p = {} : d && (p = a(p)), i(p[u]) || l(p, u, function() {
      return this;
    }), c.exports = {
      IteratorPrototype: p,
      BUGGY_SAFARI_ITERATORS: f
    };
  },
  /***/
  6269(c) {
    c.exports = {};
  },
  /***/
  6198(c, e, t) {
    var s = t(8014);
    c.exports = function(i) {
      return s(i.length);
    };
  },
  /***/
  283(c, e, t) {
    var s = t(9504), i = t(9039), r = t(4901), a = t(9297), o = t(3724), l = t(350).CONFIGURABLE, h = t(3706), d = t(1181), u = d.enforce, f = d.get, p = String, m = Object.defineProperty, v = s("".slice), A = s("".replace), b = s([].join), E = o && !i(function() {
      return m(function() {
      }, "length", { value: 8 }).length !== 8;
    }), S = String(String).split("String"), T = c.exports = function(x, C, I) {
      v(p(C), 0, 7) === "Symbol(" && (C = "[" + A(p(C), /^Symbol\(([^)]*)\).*$/, "$1") + "]"), I && I.getter && (C = "get " + C), I && I.setter && (C = "set " + C), (!a(x, "name") || l && x.name !== C) && (o ? m(x, "name", { value: C, configurable: !0 }) : x.name = C), E && I && a(I, "arity") && x.length !== I.arity && m(x, "length", { value: I.arity });
      try {
        I && a(I, "constructor") && I.constructor ? o && m(x, "prototype", { writable: !1 }) : x.prototype && (x.prototype = void 0);
      } catch {
      }
      var M = u(x);
      return a(M, "source") || (M.source = b(S, typeof C == "string" ? C : "")), x;
    };
    Function.prototype.toString = T(function() {
      return r(this) && f(this).source || h(this);
    }, "toString");
  },
  /***/
  2248(c, e, t) {
    var s = t(9504), i = Map.prototype;
    c.exports = {
      // eslint-disable-next-line es/no-map -- safe
      Map,
      set: s(i.set),
      get: s(i.get),
      has: s(i.has),
      remove: s(i.delete),
      proto: i
    };
  },
  /***/
  741(c) {
    var e = Math.ceil, t = Math.floor;
    c.exports = Math.trunc || function(i) {
      var r = +i;
      return (r > 0 ? t : e)(r);
    };
  },
  /***/
  7819(c, e, t) {
    var s = t(9039);
    c.exports = !s(function() {
      var i = "9007199254740993", r = JSON.rawJSON(i);
      return !JSON.isRawJSON(r) || JSON.stringify(r) !== i;
    });
  },
  /***/
  6043(c, e, t) {
    var s = t(9306), i = TypeError, r = function(a) {
      var o, l;
      this.promise = new a(function(h, d) {
        if (o !== void 0 || l !== void 0) throw new i("Bad Promise constructor");
        o = h, l = d;
      }), this.resolve = s(o), this.reject = s(l);
    };
    c.exports.f = function(a) {
      return new r(a);
    };
  },
  /***/
  2603(c, e, t) {
    var s = t(655);
    c.exports = function(i, r) {
      return i === void 0 ? arguments.length < 2 ? "" : r : s(i);
    };
  },
  /***/
  4149(c) {
    var e = RangeError;
    c.exports = function(t) {
      if (t === t) return t;
      throw new e("NaN is not allowed");
    };
  },
  /***/
  2360(c, e, t) {
    var s = t(8551), i = t(6801), r = t(8727), a = t(421), o = t(397), l = t(4055), h = t(6119), d = ">", u = "<", f = "prototype", p = "script", m = h("IE_PROTO"), v = function() {
    }, A = function(x) {
      return u + p + d + x + u + "/" + p + d;
    }, b = function(x) {
      x.write(A("")), x.close();
      var C = x.parentWindow.Object;
      return x = null, C;
    }, E = function() {
      var x = l("iframe"), C = "java" + p + ":", I;
      return x.style.display = "none", o.appendChild(x), x.src = String(C), I = x.contentWindow.document, I.open(), I.write(A("document.F=Object")), I.close(), I.F;
    }, S, T = function() {
      try {
        S = new ActiveXObject("htmlfile");
      } catch {
      }
      T = typeof document < "u" ? document.domain && S ? b(S) : E() : b(S);
      for (var x = r.length; x--; ) delete T[f][r[x]];
      return T();
    };
    a[m] = !0, c.exports = Object.create || function(C, I) {
      var M;
      return C !== null ? (v[f] = s(C), M = new v(), v[f] = null, M[m] = C) : M = T(), I === void 0 ? M : i.f(M, I);
    };
  },
  /***/
  6801(c, e, t) {
    var s = t(3724), i = t(8686), r = t(4913), a = t(8551), o = t(5397), l = t(1072);
    e.f = s && !i ? Object.defineProperties : function(d, u) {
      a(d);
      for (var f = o(u), p = l(u), m = p.length, v = 0, A; m > v; ) r.f(d, A = p[v++], f[A]);
      return d;
    };
  },
  /***/
  4913(c, e, t) {
    var s = t(3724), i = t(5917), r = t(8686), a = t(8551), o = t(6969), l = TypeError, h = Object.defineProperty, d = Object.getOwnPropertyDescriptor, u = "enumerable", f = "configurable", p = "writable";
    e.f = s ? r ? function(v, A, b) {
      if (a(v), A = o(A), a(b), typeof v == "function" && A === "prototype" && "value" in b && p in b && !b[p]) {
        var E = d(v, A);
        E && E[p] && (v[A] = b.value, b = {
          configurable: f in b ? b[f] : E[f],
          enumerable: u in b ? b[u] : E[u],
          writable: !1
        });
      }
      return h(v, A, b);
    } : h : function(v, A, b) {
      if (a(v), A = o(A), a(b), i) try {
        return h(v, A, b);
      } catch {
      }
      if ("get" in b || "set" in b) throw new l("Accessors not supported");
      return "value" in b && (v[A] = b.value), v;
    };
  },
  /***/
  7347(c, e, t) {
    var s = t(3724), i = t(9565), r = t(8773), a = t(6980), o = t(5397), l = t(6969), h = t(9297), d = t(5917), u = Object.getOwnPropertyDescriptor;
    e.f = s ? u : function(p, m) {
      if (p = o(p), m = l(m), d) try {
        return u(p, m);
      } catch {
      }
      if (h(p, m)) return a(!i(r.f, p, m), p[m]);
    };
  },
  /***/
  8480(c, e, t) {
    var s = t(1828), i = t(8727), r = i.concat("length", "prototype");
    e.f = Object.getOwnPropertyNames || function(o) {
      return s(o, r);
    };
  },
  /***/
  3717(c, e) {
    e.f = Object.getOwnPropertySymbols;
  },
  /***/
  2787(c, e, t) {
    var s = t(9297), i = t(4901), r = t(8981), a = t(6119), o = t(2211), l = a("IE_PROTO"), h = Object, d = h.prototype;
    c.exports = o ? h.getPrototypeOf : function(u) {
      var f = r(u);
      if (s(f, l)) return f[l];
      var p = f.constructor;
      return i(p) && f instanceof p ? p.prototype : f instanceof h ? d : null;
    };
  },
  /***/
  1625(c, e, t) {
    var s = t(9504);
    c.exports = s({}.isPrototypeOf);
  },
  /***/
  1828(c, e, t) {
    var s = t(9504), i = t(9297), r = t(5397), a = t(9617).indexOf, o = t(421), l = s([].push);
    c.exports = function(h, d) {
      var u = r(h), f = 0, p = [], m;
      for (m in u) !i(o, m) && i(u, m) && l(p, m);
      for (; d.length > f; ) i(u, m = d[f++]) && (~a(p, m) || l(p, m));
      return p;
    };
  },
  /***/
  1072(c, e, t) {
    var s = t(1828), i = t(8727);
    c.exports = Object.keys || function(a) {
      return s(a, i);
    };
  },
  /***/
  8773(c, e) {
    var t = {}.propertyIsEnumerable, s = Object.getOwnPropertyDescriptor, i = s && !t.call({ 1: 2 }, 1);
    e.f = i ? function(a) {
      var o = s(this, a);
      return !!o && o.enumerable;
    } : t;
  },
  /***/
  2967(c, e, t) {
    var s = t(6706), i = t(34), r = t(7750), a = t(3506);
    c.exports = Object.setPrototypeOf || ("__proto__" in {} ? (function() {
      var o = !1, l = {}, h;
      try {
        h = s(Object.prototype, "__proto__", "set"), h(l, []), o = l instanceof Array;
      } catch {
      }
      return function(u, f) {
        return r(u), a(f), i(u) && (o ? h(u, f) : u.__proto__ = f), u;
      };
    })() : void 0);
  },
  /***/
  4270(c, e, t) {
    var s = t(9565), i = t(4901), r = t(34), a = TypeError;
    c.exports = function(o, l) {
      var h, d;
      if (l === "string" && i(h = o.toString) && !r(d = s(h, o)) || i(h = o.valueOf) && !r(d = s(h, o)) || l !== "string" && i(h = o.toString) && !r(d = s(h, o))) return d;
      throw new a("Can't convert object to primitive value");
    };
  },
  /***/
  5031(c, e, t) {
    var s = t(7751), i = t(9504), r = t(8480), a = t(3717), o = t(8551), l = i([].concat);
    c.exports = s("Reflect", "ownKeys") || function(d) {
      var u = r.f(o(d)), f = a.f;
      return f ? l(u, f(d)) : u;
    };
  },
  /***/
  8235(c, e, t) {
    var s = t(9504), i = t(9297), r = SyntaxError, a = parseInt, o = String.fromCharCode, l = s("".charAt), h = s("".slice), d = s(/./.exec), u = {
      '\\"': '"',
      "\\\\": "\\",
      "\\/": "/",
      "\\b": "\b",
      "\\f": "\f",
      "\\n": `
`,
      "\\r": "\r",
      "\\t": "	"
    }, f = /^[\da-f]{4}$/i, p = /^[\u0000-\u001F]$/;
    c.exports = function(m, v) {
      for (var A = !0, b = ""; v < m.length; ) {
        var E = l(m, v);
        if (E === "\\") {
          var S = h(m, v, v + 2);
          if (i(u, S))
            b += u[S], v += 2;
          else if (S === "\\u") {
            v += 2;
            var T = h(m, v, v + 4);
            if (!d(f, T)) throw new r("Bad Unicode escape at: " + v);
            b += o(a(T, 16)), v += 4;
          } else throw new r('Unknown escape sequence: "' + S + '"');
        } else if (E === '"') {
          A = !1, v++;
          break;
        } else {
          if (d(p, E)) throw new r("Bad control character in string literal at: " + v);
          b += E, v++;
        }
      }
      if (A) throw new r("Unterminated string at: " + v);
      return { value: b, end: v };
    };
  },
  /***/
  1103(c) {
    c.exports = function(e) {
      try {
        return { error: !1, value: e() };
      } catch (t) {
        return { error: !0, value: t };
      }
    };
  },
  /***/
  7750(c, e, t) {
    var s = t(4117), i = TypeError;
    c.exports = function(r) {
      if (s(r)) throw new i("Can't call method on " + r);
      return r;
    };
  },
  /***/
  9286(c, e, t) {
    var s = t(4402), i = t(8469), r = s.Set, a = s.add;
    c.exports = function(o) {
      var l = new r();
      return i(o, function(h) {
        a(l, h);
      }), l;
    };
  },
  /***/
  3440(c, e, t) {
    var s = t(7080), i = t(4402), r = t(9286), a = t(5170), o = t(3789), l = t(8469), h = t(507), d = i.has, u = i.remove;
    c.exports = function(p) {
      var m = s(this), v = o(p), A = r(m);
      return a(m) <= v.size ? l(m, function(b) {
        v.includes(b) && u(A, b);
      }) : h(v.getIterator(), function(b) {
        d(A, b) && u(A, b);
      }), A;
    };
  },
  /***/
  4402(c, e, t) {
    var s = t(9504), i = Set.prototype;
    c.exports = {
      // eslint-disable-next-line es/no-set -- safe
      Set,
      add: s(i.add),
      has: s(i.has),
      remove: s(i.delete),
      proto: i
    };
  },
  /***/
  8750(c, e, t) {
    var s = t(7080), i = t(4402), r = t(5170), a = t(3789), o = t(8469), l = t(507), h = i.Set, d = i.add, u = i.has;
    c.exports = function(p) {
      var m = s(this), v = a(p), A = new h();
      return r(m) > v.size ? l(v.getIterator(), function(b) {
        u(m, b) && d(A, b);
      }) : o(m, function(b) {
        v.includes(b) && d(A, b);
      }), A;
    };
  },
  /***/
  4449(c, e, t) {
    var s = t(7080), i = t(4402).has, r = t(5170), a = t(3789), o = t(8469), l = t(507), h = t(9539);
    c.exports = function(u) {
      var f = s(this), p = a(u);
      if (r(f) <= p.size) return o(f, function(v) {
        if (p.includes(v)) return !1;
      }, !0) !== !1;
      var m = p.getIterator();
      return l(m, function(v) {
        if (i(f, v)) return h(m, "normal", !1);
      }) !== !1;
    };
  },
  /***/
  3838(c, e, t) {
    var s = t(7080), i = t(5170), r = t(8469), a = t(3789);
    c.exports = function(l) {
      var h = s(this), d = a(l);
      return i(h) > d.size ? !1 : r(h, function(u) {
        if (!d.includes(u)) return !1;
      }, !0) !== !1;
    };
  },
  /***/
  8527(c, e, t) {
    var s = t(7080), i = t(4402).has, r = t(5170), a = t(3789), o = t(507), l = t(9539);
    c.exports = function(d) {
      var u = s(this), f = a(d);
      if (r(u) < f.size) return !1;
      var p = f.getIterator();
      return o(p, function(m) {
        if (!i(u, m)) return l(p, "normal", !1);
      }) !== !1;
    };
  },
  /***/
  8469(c, e, t) {
    var s = t(9504), i = t(507), r = t(4402), a = r.Set, o = r.proto, l = s(o.forEach), h = s(o.keys), d = h(new a()).next;
    c.exports = function(u, f, p) {
      return p ? i({ iterator: h(u), next: d }, f) : l(u, f);
    };
  },
  /***/
  4916(c, e, t) {
    var s = t(7751), i = function(a) {
      return {
        size: a,
        has: function() {
          return !1;
        },
        keys: function() {
          return {
            next: function() {
              return { done: !0 };
            }
          };
        }
      };
    }, r = function(a) {
      return {
        size: a,
        has: function() {
          return !0;
        },
        keys: function() {
          throw new Error("e");
        }
      };
    };
    c.exports = function(a, o) {
      var l = s("Set");
      try {
        new l()[a](i(0));
        try {
          return new l()[a](i(-1)), !1;
        } catch {
          if (!o) return !0;
          try {
            return new l()[a](r(-1 / 0)), !1;
          } catch {
            var h = new l([1, 2]);
            return o(h[a](r(1 / 0)));
          }
        }
      } catch {
        return !1;
      }
    };
  },
  /***/
  9835(c) {
    c.exports = function(e) {
      try {
        var t = /* @__PURE__ */ new Set(), s = {
          size: 0,
          has: function() {
            return !0;
          },
          keys: function() {
            return Object.defineProperty({}, "next", {
              get: function() {
                return t.clear(), t.add(4), function() {
                  return { done: !0 };
                };
              }
            });
          }
        }, i = t[e](s);
        return i.size === 1 && i.values().next().value === 4;
      } catch {
        return !1;
      }
    };
  },
  /***/
  5170(c, e, t) {
    var s = t(6706), i = t(4402);
    c.exports = s(i.proto, "size", "get") || function(r) {
      return r.size;
    };
  },
  /***/
  3650(c, e, t) {
    var s = t(7080), i = t(4402), r = t(9286), a = t(3789), o = t(507), l = i.add, h = i.has, d = i.remove;
    c.exports = function(f) {
      var p = s(this), m = a(f).getIterator(), v = r(p);
      return o(m, function(A) {
        h(p, A) ? d(v, A) : l(v, A);
      }), v;
    };
  },
  /***/
  4204(c, e, t) {
    var s = t(7080), i = t(4402).add, r = t(9286), a = t(3789), o = t(507);
    c.exports = function(h) {
      var d = s(this), u = a(h).getIterator(), f = r(d);
      return o(u, function(p) {
        i(f, p);
      }), f;
    };
  },
  /***/
  6119(c, e, t) {
    var s = t(5745), i = t(3392), r = s("keys");
    c.exports = function(a) {
      return r[a] || (r[a] = i(a));
    };
  },
  /***/
  7629(c, e, t) {
    var s = t(6395), i = t(4576), r = t(9433), a = "__core-js_shared__", o = c.exports = i[a] || r(a, {});
    (o.versions || (o.versions = [])).push({
      version: "3.48.0",
      mode: s ? "pure" : "global",
      copyright: "© 2013–2025 Denis Pushkarev (zloirock.ru), 2025–2026 CoreJS Company (core-js.io). All rights reserved.",
      license: "https://github.com/zloirock/core-js/blob/v3.48.0/LICENSE",
      source: "https://github.com/zloirock/core-js"
    });
  },
  /***/
  5745(c, e, t) {
    var s = t(7629);
    c.exports = function(i, r) {
      return s[i] || (s[i] = r || {});
    };
  },
  /***/
  1548(c, e, t) {
    var s = t(4576), i = t(9039), r = t(9519), a = t(4215), o = s.structuredClone;
    c.exports = !!o && !i(function() {
      if (a === "DENO" && r > 92 || a === "NODE" && r > 94 || a === "BROWSER" && r > 97) return !1;
      var l = new ArrayBuffer(8), h = o(l, { transfer: [l] });
      return l.byteLength !== 0 || h.byteLength !== 8;
    });
  },
  /***/
  4495(c, e, t) {
    var s = t(9519), i = t(9039), r = t(4576), a = r.String;
    c.exports = !!Object.getOwnPropertySymbols && !i(function() {
      var o = /* @__PURE__ */ Symbol("symbol detection");
      return !a(o) || !(Object(o) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      !Symbol.sham && s && s < 41;
    });
  },
  /***/
  5610(c, e, t) {
    var s = t(1291), i = Math.max, r = Math.min;
    c.exports = function(a, o) {
      var l = s(a);
      return l < 0 ? i(l + o, 0) : r(l, o);
    };
  },
  /***/
  5854(c, e, t) {
    var s = t(2777), i = TypeError;
    c.exports = function(r) {
      var a = s(r, "number");
      if (typeof a == "number") throw new i("Can't convert number to bigint");
      return BigInt(a);
    };
  },
  /***/
  7696(c, e, t) {
    var s = t(1291), i = t(8014), r = RangeError;
    c.exports = function(a) {
      if (a === void 0) return 0;
      var o = s(a), l = i(o);
      if (o !== l) throw new r("Wrong length or index");
      return l;
    };
  },
  /***/
  5397(c, e, t) {
    var s = t(7055), i = t(7750);
    c.exports = function(r) {
      return s(i(r));
    };
  },
  /***/
  1291(c, e, t) {
    var s = t(741);
    c.exports = function(i) {
      var r = +i;
      return r !== r || r === 0 ? 0 : s(r);
    };
  },
  /***/
  8014(c, e, t) {
    var s = t(1291), i = Math.min;
    c.exports = function(r) {
      var a = s(r);
      return a > 0 ? i(a, 9007199254740991) : 0;
    };
  },
  /***/
  8981(c, e, t) {
    var s = t(7750), i = Object;
    c.exports = function(r) {
      return i(s(r));
    };
  },
  /***/
  9590(c, e, t) {
    var s = t(1291), i = RangeError;
    c.exports = function(r) {
      var a = s(r);
      if (a < 0) throw new i("The argument can't be less than 0");
      return a;
    };
  },
  /***/
  2777(c, e, t) {
    var s = t(9565), i = t(34), r = t(757), a = t(5966), o = t(4270), l = t(8227), h = TypeError, d = l("toPrimitive");
    c.exports = function(u, f) {
      if (!i(u) || r(u)) return u;
      var p = a(u, d), m;
      if (p) {
        if (f === void 0 && (f = "default"), m = s(p, u, f), !i(m) || r(m)) return m;
        throw new h("Can't convert object to primitive value");
      }
      return f === void 0 && (f = "number"), o(u, f);
    };
  },
  /***/
  6969(c, e, t) {
    var s = t(2777), i = t(757);
    c.exports = function(r) {
      var a = s(r, "string");
      return i(a) ? a : a + "";
    };
  },
  /***/
  2140(c, e, t) {
    var s = t(8227), i = s("toStringTag"), r = {};
    r[i] = "z", c.exports = String(r) === "[object z]";
  },
  /***/
  655(c, e, t) {
    var s = t(6955), i = String;
    c.exports = function(r) {
      if (s(r) === "Symbol") throw new TypeError("Cannot convert a Symbol value to a string");
      return i(r);
    };
  },
  /***/
  6823(c) {
    var e = String;
    c.exports = function(t) {
      try {
        return e(t);
      } catch {
        return "Object";
      }
    };
  },
  /***/
  3392(c, e, t) {
    var s = t(9504), i = 0, r = Math.random(), a = s(1.1.toString);
    c.exports = function(o) {
      return "Symbol(" + (o === void 0 ? "" : o) + ")_" + a(++i + r, 36);
    };
  },
  /***/
  9143(c, e, t) {
    var s = t(4576), i = t(9504), r = t(3972), a = t(3463), o = t(9297), l = t(2804), h = t(944), d = t(5169), u = l.c2i, f = l.c2iUrl, p = s.SyntaxError, m = s.TypeError, v = i("".charAt), A = function(S, T) {
      for (var x = S.length; T < x; T++) {
        var C = v(S, T);
        if (C !== " " && C !== "	" && C !== `
` && C !== "\f" && C !== "\r") break;
      }
      return T;
    }, b = function(S, T, x) {
      var C = S.length;
      C < 4 && (S += C === 2 ? "AA" : "A");
      var I = (T[v(S, 0)] << 18) + (T[v(S, 1)] << 12) + (T[v(S, 2)] << 6) + T[v(S, 3)], M = [
        I >> 16 & 255,
        I >> 8 & 255,
        I & 255
      ];
      if (C === 2) {
        if (x && M[1] !== 0)
          throw new p("Extra bits");
        return [M[0]];
      }
      if (C === 3) {
        if (x && M[2] !== 0)
          throw new p("Extra bits");
        return [M[0], M[1]];
      }
      return M;
    }, E = function(S, T, x) {
      for (var C = T.length, I = 0; I < C; I++)
        S[x + I] = T[I];
      return x + C;
    };
    c.exports = function(S, T, x, C) {
      a(S), r(T);
      var I = h(T) === "base64" ? u : f, M = T ? T.lastChunkHandling : void 0;
      if (M === void 0 && (M = "loose"), M !== "loose" && M !== "strict" && M !== "stop-before-partial")
        throw new m("Incorrect `lastChunkHandling` option");
      x && d(x.buffer);
      var P = S.length, O = x || [], D = 0, $ = 0, F = "", N = 0;
      if (C) for (; ; ) {
        if (N = A(S, N), N === P) {
          if (F.length > 0) {
            if (M === "stop-before-partial")
              break;
            if (M === "loose") {
              if (F.length === 1)
                throw new p("Malformed padding: exactly one additional character");
              D = E(O, b(F, I, !1), D);
            } else
              throw new p("Missing padding");
          }
          $ = P;
          break;
        }
        var K = v(S, N);
        if (++N, K === "=") {
          if (F.length < 2)
            throw new p("Padding is too early");
          if (N = A(S, N), F.length === 2) {
            if (N === P) {
              if (M === "stop-before-partial")
                break;
              throw new p("Malformed padding: only one =");
            }
            v(S, N) === "=" && (++N, N = A(S, N));
          }
          if (N < P)
            throw new p("Unexpected character after padding");
          D = E(O, b(F, I, M === "strict"), D), $ = P;
          break;
        }
        if (!o(I, K))
          throw new p("Unexpected character");
        var B = C - D;
        if (B === 1 && F.length === 2 || B === 2 && F.length === 3 || (F += K, F.length === 4 && (D = E(O, b(F, I, !1), D), F = "", $ = N, D === C)))
          break;
      }
      return { bytes: O, read: $, written: D };
    };
  },
  /***/
  2303(c, e, t) {
    var s = t(4576), i = t(9504), r = s.Uint8Array, a = s.SyntaxError, o = s.parseInt, l = Math.min, h = /[^\da-f]/i, d = i(h.exec), u = i("".slice);
    c.exports = function(f, p) {
      var m = f.length;
      if (m % 2 !== 0) throw new a("String should be an even number of characters");
      for (var v = p ? l(p.length, m / 2) : m / 2, A = p || new r(v), b = 0, E = 0; E < v; ) {
        var S = u(f, b, b += 2);
        if (d(h, S)) throw new a("String should only contain hex characters");
        A[E++] = o(S, 16);
      }
      return { bytes: A, read: b };
    };
  },
  /***/
  7416(c, e, t) {
    var s = t(9039), i = t(8227), r = t(3724), a = t(6395), o = i("iterator");
    c.exports = !s(function() {
      var l = new URL("b?a=1&b=2&c=3", "https://a"), h = l.searchParams, d = new URLSearchParams("a=1&a=2&b=3"), u = "";
      return l.pathname = "c%20d", h.forEach(function(f, p) {
        h.delete("b"), u += p + f;
      }), d.delete("a", 2), d.delete("b", void 0), a && (!l.toJSON || !d.has("a", 1) || d.has("a", 2) || !d.has("a", void 0) || d.has("b")) || !h.size && (a || !r) || !h.sort || l.href !== "https://a/c%20d?a=1&c=3" || h.get("c") !== "3" || String(new URLSearchParams("?a=1")) !== "a=1" || !h[o] || new URL("https://a@b").username !== "a" || new URLSearchParams(new URLSearchParams("a=b")).get("a") !== "b" || new URL("https://тест").host !== "xn--e1aybc" || new URL("https://a#б").hash !== "#%D0%B1" || u !== "a1c3" || new URL("https://x", void 0).host !== "x";
    });
  },
  /***/
  7040(c, e, t) {
    var s = t(4495);
    c.exports = s && !Symbol.sham && typeof Symbol.iterator == "symbol";
  },
  /***/
  8686(c, e, t) {
    var s = t(3724), i = t(9039);
    c.exports = s && i(function() {
      return Object.defineProperty(function() {
      }, "prototype", {
        value: 42,
        writable: !1
      }).prototype !== 42;
    });
  },
  /***/
  2812(c) {
    var e = TypeError;
    c.exports = function(t, s) {
      if (t < s) throw new e("Not enough arguments");
      return t;
    };
  },
  /***/
  8622(c, e, t) {
    var s = t(4576), i = t(4901), r = s.WeakMap;
    c.exports = i(r) && /native code/.test(String(r));
  },
  /***/
  4995(c, e, t) {
    var s = t(9504), i = WeakMap.prototype;
    c.exports = {
      // eslint-disable-next-line es/no-weak-map -- safe
      WeakMap,
      set: s(i.set),
      get: s(i.get),
      has: s(i.has),
      remove: s(i.delete)
    };
  },
  /***/
  8227(c, e, t) {
    var s = t(4576), i = t(5745), r = t(9297), a = t(3392), o = t(4495), l = t(7040), h = s.Symbol, d = i("wks"), u = l ? h.for || h : h && h.withoutSetter || a;
    c.exports = function(f) {
      return r(d, f) || (d[f] = o && r(h, f) ? h[f] : u("Symbol." + f)), d[f];
    };
  },
  /***/
  6573(c, e, t) {
    var s = t(3724), i = t(2106), r = t(3238), a = ArrayBuffer.prototype;
    s && !("detached" in a) && i(a, "detached", {
      configurable: !0,
      get: function() {
        return r(this);
      }
    });
  },
  /***/
  7936(c, e, t) {
    var s = t(6518), i = t(5636);
    i && s({ target: "ArrayBuffer", proto: !0 }, {
      transferToFixedLength: function() {
        return i(this, arguments.length ? arguments[0] : void 0, !1);
      }
    });
  },
  /***/
  8100(c, e, t) {
    var s = t(6518), i = t(5636);
    i && s({ target: "ArrayBuffer", proto: !0 }, {
      transfer: function() {
        return i(this, arguments.length ? arguments[0] : void 0, !0);
      }
    });
  },
  /***/
  4114(c, e, t) {
    var s = t(6518), i = t(8981), r = t(6198), a = t(4527), o = t(6837), l = t(9039), h = l(function() {
      return [].push.call({ length: 4294967296 }, 1) !== 4294967297;
    }), d = function() {
      try {
        Object.defineProperty([], "length", { writable: !1 }).push();
      } catch (f) {
        return f instanceof TypeError;
      }
    }, u = h || !d();
    s({ target: "Array", proto: !0, arity: 1, forced: u }, {
      // eslint-disable-next-line no-unused-vars -- required for `.length`
      push: function(p) {
        var m = i(this), v = r(m), A = arguments.length;
        o(v + A);
        for (var b = 0; b < A; b++)
          m[v] = arguments[b], v++;
        return a(m, v), v;
      }
    });
  },
  /***/
  8111(c, e, t) {
    var s = t(6518), i = t(4576), r = t(679), a = t(8551), o = t(4901), l = t(2787), h = t(2106), d = t(4659), u = t(9039), f = t(9297), p = t(8227), m = t(7657).IteratorPrototype, v = t(3724), A = t(6395), b = "constructor", E = "Iterator", S = p("toStringTag"), T = TypeError, x = i[E], C = A || !o(x) || x.prototype !== m || !u(function() {
      x({});
    }), I = function() {
      if (r(this, m), l(this) === m) throw new T("Abstract class Iterator not directly constructable");
    }, M = function(P, O) {
      v ? h(m, P, {
        configurable: !0,
        get: function() {
          return O;
        },
        set: function(D) {
          if (a(this), this === m) throw new T("You can't redefine this property");
          f(this, P) ? this[P] = D : d(this, P, D);
        }
      }) : m[P] = O;
    };
    f(m, S) || M(S, E), (C || !f(m, b) || m[b] === Object) && M(b, I), I.prototype = m, s({ global: !0, constructor: !0, forced: C }, {
      Iterator: I
    });
  },
  /***/
  9314(c, e, t) {
    var s = t(6518), i = t(9565), r = t(8551), a = t(1767), o = t(4149), l = t(9590), h = t(9539), d = t(9462), u = t(684), f = t(4549), p = t(6395), m = !p && !u("drop", 0), v = !p && !m && f("drop", RangeError), A = p || m || v, b = d(function() {
      for (var E = this.iterator, S = this.next, T, x; this.remaining; )
        if (this.remaining--, T = r(i(S, E)), x = this.done = !!T.done, x) return;
      if (T = r(i(S, E)), x = this.done = !!T.done, !x) return T.value;
    });
    s({ target: "Iterator", proto: !0, real: !0, forced: A }, {
      drop: function(S) {
        r(this);
        var T;
        try {
          T = l(o(+S));
        } catch (x) {
          h(this, "throw", x);
        }
        return v ? i(v, this, T) : new b(a(this), {
          remaining: T
        });
      }
    });
  },
  /***/
  1148(c, e, t) {
    var s = t(6518), i = t(9565), r = t(2652), a = t(9306), o = t(8551), l = t(1767), h = t(9539), d = t(4549), u = d("every", TypeError);
    s({ target: "Iterator", proto: !0, real: !0, forced: u }, {
      every: function(p) {
        o(this);
        try {
          a(p);
        } catch (A) {
          h(this, "throw", A);
        }
        if (u) return i(u, this, p);
        var m = l(this), v = 0;
        return !r(m, function(A, b) {
          if (!p(A, v++)) return b();
        }, { IS_RECORD: !0, INTERRUPTED: !0 }).stopped;
      }
    });
  },
  /***/
  2489(c, e, t) {
    var s = t(6518), i = t(9565), r = t(9306), a = t(8551), o = t(1767), l = t(9462), h = t(6319), d = t(6395), u = t(9539), f = t(684), p = t(4549), m = !d && !f("filter", function() {
    }), v = !d && !m && p("filter", TypeError), A = d || m || v, b = l(function() {
      for (var E = this.iterator, S = this.predicate, T = this.next, x, C, I; ; ) {
        if (x = a(i(T, E)), C = this.done = !!x.done, C) return;
        if (I = x.value, h(E, S, [I, this.counter++], !0)) return I;
      }
    });
    s({ target: "Iterator", proto: !0, real: !0, forced: A }, {
      filter: function(S) {
        a(this);
        try {
          r(S);
        } catch (T) {
          u(this, "throw", T);
        }
        return v ? i(v, this, S) : new b(o(this), {
          predicate: S
        });
      }
    });
  },
  /***/
  116(c, e, t) {
    var s = t(6518), i = t(9565), r = t(2652), a = t(9306), o = t(8551), l = t(1767), h = t(9539), d = t(4549), u = d("find", TypeError);
    s({ target: "Iterator", proto: !0, real: !0, forced: u }, {
      find: function(p) {
        o(this);
        try {
          a(p);
        } catch (A) {
          h(this, "throw", A);
        }
        if (u) return i(u, this, p);
        var m = l(this), v = 0;
        return r(m, function(A, b) {
          if (p(A, v++)) return b(A);
        }, { IS_RECORD: !0, INTERRUPTED: !0 }).result;
      }
    });
  },
  /***/
  531(c, e, t) {
    var s = t(6518), i = t(9565), r = t(9306), a = t(8551), o = t(1767), l = t(8646), h = t(9462), d = t(9539), u = t(6395), f = t(684), p = t(4549);
    function m() {
      try {
        var S = Iterator.prototype.flatMap.call((/* @__PURE__ */ new Map([[4, 5]])).entries(), function(T) {
          return T;
        });
        S.next(), S.return();
      } catch {
        return !0;
      }
    }
    var v = !u && !f("flatMap", function() {
    }), A = !u && !v && p("flatMap", TypeError), b = u || v || A || m(), E = h(function() {
      for (var S = this.iterator, T = this.mapper, x, C; ; ) {
        if (C = this.inner) try {
          if (x = a(i(C.next, C.iterator)), !x.done) return x.value;
          this.inner = null;
        } catch (I) {
          d(S, "throw", I);
        }
        if (x = a(i(this.next, S)), this.done = !!x.done) return;
        try {
          this.inner = l(T(x.value, this.counter++), !1);
        } catch (I) {
          d(S, "throw", I);
        }
      }
    });
    s({ target: "Iterator", proto: !0, real: !0, forced: b }, {
      flatMap: function(T) {
        a(this);
        try {
          r(T);
        } catch (x) {
          d(this, "throw", x);
        }
        return A ? i(A, this, T) : new E(o(this), {
          mapper: T,
          inner: null
        });
      }
    });
  },
  /***/
  7588(c, e, t) {
    var s = t(6518), i = t(9565), r = t(2652), a = t(9306), o = t(8551), l = t(1767), h = t(9539), d = t(4549), u = d("forEach", TypeError);
    s({ target: "Iterator", proto: !0, real: !0, forced: u }, {
      forEach: function(p) {
        o(this);
        try {
          a(p);
        } catch (A) {
          h(this, "throw", A);
        }
        if (u) return i(u, this, p);
        var m = l(this), v = 0;
        r(m, function(A) {
          p(A, v++);
        }, { IS_RECORD: !0 });
      }
    });
  },
  /***/
  1701(c, e, t) {
    var s = t(6518), i = t(9565), r = t(9306), a = t(8551), o = t(1767), l = t(9462), h = t(6319), d = t(9539), u = t(684), f = t(4549), p = t(6395), m = !p && !u("map", function() {
    }), v = !p && !m && f("map", TypeError), A = p || m || v, b = l(function() {
      var E = this.iterator, S = a(i(this.next, E)), T = this.done = !!S.done;
      if (!T) return h(E, this.mapper, [S.value, this.counter++], !0);
    });
    s({ target: "Iterator", proto: !0, real: !0, forced: A }, {
      map: function(S) {
        a(this);
        try {
          r(S);
        } catch (T) {
          d(this, "throw", T);
        }
        return v ? i(v, this, S) : new b(o(this), {
          mapper: S
        });
      }
    });
  },
  /***/
  8237(c, e, t) {
    var s = t(6518), i = t(2652), r = t(9306), a = t(8551), o = t(1767), l = t(9539), h = t(4549), d = t(8745), u = t(9039), f = TypeError, p = u(function() {
      [].keys().reduce(function() {
      }, void 0);
    }), m = !p && h("reduce", f);
    s({ target: "Iterator", proto: !0, real: !0, forced: p || m }, {
      reduce: function(A) {
        a(this);
        try {
          r(A);
        } catch (x) {
          l(this, "throw", x);
        }
        var b = arguments.length < 2, E = b ? void 0 : arguments[1];
        if (m)
          return d(m, this, b ? [A] : [A, E]);
        var S = o(this), T = 0;
        if (i(S, function(x) {
          b ? (b = !1, E = x) : E = A(E, x, T), T++;
        }, { IS_RECORD: !0 }), b) throw new f("Reduce of empty iterator with no initial value");
        return E;
      }
    });
  },
  /***/
  3579(c, e, t) {
    var s = t(6518), i = t(9565), r = t(2652), a = t(9306), o = t(8551), l = t(1767), h = t(9539), d = t(4549), u = d("some", TypeError);
    s({ target: "Iterator", proto: !0, real: !0, forced: u }, {
      some: function(p) {
        o(this);
        try {
          a(p);
        } catch (A) {
          h(this, "throw", A);
        }
        if (u) return i(u, this, p);
        var m = l(this), v = 0;
        return r(m, function(A, b) {
          if (p(A, v++)) return b();
        }, { IS_RECORD: !0, INTERRUPTED: !0 }).stopped;
      }
    });
  },
  /***/
  4972(c, e, t) {
    var s = t(6518), i = t(9565), r = t(8551), a = t(1767), o = t(4149), l = t(9590), h = t(9462), d = t(9539), u = t(4549), f = t(6395), p = !f && u("take", RangeError), m = h(function() {
      var v = this.iterator;
      if (!this.remaining--)
        return this.done = !0, d(v, "normal", void 0);
      var A = r(i(this.next, v)), b = this.done = !!A.done;
      if (!b) return A.value;
    });
    s({ target: "Iterator", proto: !0, real: !0, forced: f || p }, {
      take: function(A) {
        r(this);
        var b;
        try {
          b = l(o(+A));
        } catch (E) {
          d(this, "throw", E);
        }
        return p ? i(p, this, b) : new m(a(this), {
          remaining: b
        });
      }
    });
  },
  /***/
  9112(c, e, t) {
    var s = t(6518), i = t(3724), r = t(4576), a = t(7751), o = t(9504), l = t(9565), h = t(4901), d = t(34), u = t(4376), f = t(9297), p = t(655), m = t(6198), v = t(4659), A = t(9039), b = t(8235), E = t(4495), S = r.JSON, T = r.Number, x = r.SyntaxError, C = S && S.parse, I = a("Object", "keys"), M = Object.getOwnPropertyDescriptor, P = o("".charAt), O = o("".slice), D = o(/./.exec), $ = o([].push), F = /^\d$/, N = /^[1-9]$/, K = /^[\d-]$/, B = /^[\t\n\r ]$/, k = 0, _ = 1, st = function(U, L) {
      U = p(U);
      var H = new J(U, 0), X = H.parse(), dt = X.value, Y = H.skip(B, X.end);
      if (Y < U.length)
        throw new x('Unexpected extra character: "' + P(U, Y) + '" after the parsed data at: ' + Y);
      return h(L) ? mt({ "": dt }, "", L, X) : dt;
    }, mt = function(U, L, H, X) {
      var dt = U[L], Y = X && dt === X.value, ht = Y && typeof X.source == "string" ? { source: X.source } : {}, Ot, is, ae, te, ji;
      if (d(dt)) {
        var Lr = u(dt), Ld = Y ? X.nodes : Lr ? [] : {};
        if (Lr)
          for (Ot = Ld.length, ae = m(dt), te = 0; te < ae; te++)
            ft(dt, te, mt(dt, "" + te, H, te < Ot ? Ld[te] : void 0));
        else
          for (is = I(dt), ae = m(is), te = 0; te < ae; te++)
            ji = is[te], ft(dt, ji, mt(dt, ji, H, f(Ld, ji) ? Ld[ji] : void 0));
      }
      return l(H, U, L, dt, ht);
    }, ft = function(U, L, H) {
      if (i) {
        var X = M(U, L);
        if (X && !X.configurable) return;
      }
      H === void 0 ? delete U[L] : v(U, L, H);
    }, et = function(U, L, H, X) {
      this.value = U, this.end = L, this.source = H, this.nodes = X;
    }, J = function(U, L) {
      this.source = U, this.index = L;
    };
    J.prototype = {
      fork: function(U) {
        return new J(this.source, U);
      },
      parse: function() {
        var U = this.source, L = this.skip(B, this.index), H = this.fork(L), X = P(U, L);
        if (D(K, X)) return H.number();
        switch (X) {
          case "{":
            return H.object();
          case "[":
            return H.array();
          case '"':
            return H.string();
          case "t":
            return H.keyword(!0);
          case "f":
            return H.keyword(!1);
          case "n":
            return H.keyword(null);
        }
        throw new x('Unexpected character: "' + X + '" at: ' + L);
      },
      node: function(U, L, H, X, dt) {
        return new et(L, X, U ? null : O(this.source, H, X), dt);
      },
      object: function() {
        for (var U = this.source, L = this.index + 1, H = !1, X = {}, dt = {}; L < U.length; ) {
          if (L = this.until(['"', "}"], L), P(U, L) === "}" && !H) {
            L++;
            break;
          }
          var Y = this.fork(L).string(), ht = Y.value;
          L = Y.end, L = this.until([":"], L) + 1, L = this.skip(B, L), Y = this.fork(L).parse(), v(dt, ht, Y), v(X, ht, Y.value), L = this.until([",", "}"], Y.end);
          var Ot = P(U, L);
          if (Ot === ",")
            H = !0, L++;
          else if (Ot === "}") {
            L++;
            break;
          }
        }
        return this.node(_, X, this.index, L, dt);
      },
      array: function() {
        for (var U = this.source, L = this.index + 1, H = !1, X = [], dt = []; L < U.length; ) {
          if (L = this.skip(B, L), P(U, L) === "]" && !H) {
            L++;
            break;
          }
          var Y = this.fork(L).parse();
          if ($(dt, Y), $(X, Y.value), L = this.until([",", "]"], Y.end), P(U, L) === ",")
            H = !0, L++;
          else if (P(U, L) === "]") {
            L++;
            break;
          }
        }
        return this.node(_, X, this.index, L, dt);
      },
      string: function() {
        var U = this.index, L = b(this.source, this.index + 1);
        return this.node(k, L.value, U, L.end);
      },
      number: function() {
        var U = this.source, L = this.index, H = L;
        if (P(U, H) === "-" && H++, P(U, H) === "0") H++;
        else if (D(N, P(U, H))) H = this.skip(F, H + 1);
        else throw new x("Failed to parse number at: " + H);
        if (P(U, H) === "." && (H = this.skip(F, H + 1)), P(U, H) === "e" || P(U, H) === "E") {
          H++, (P(U, H) === "+" || P(U, H) === "-") && H++;
          var X = H;
          if (H = this.skip(F, H), X === H) throw new x("Failed to parse number's exponent value at: " + H);
        }
        return this.node(k, T(O(U, L, H)), L, H);
      },
      keyword: function(U) {
        var L = "" + U, H = this.index, X = H + L.length;
        if (O(this.source, H, X) !== L) throw new x("Failed to parse value at: " + H);
        return this.node(k, U, H, X);
      },
      skip: function(U, L) {
        for (var H = this.source; L < H.length && D(U, P(H, L)); L++) ;
        return L;
      },
      until: function(U, L) {
        L = this.skip(B, L);
        for (var H = P(this.source, L), X = 0; X < U.length; X++) if (U[X] === H) return L;
        throw new x('Unexpected character: "' + H + '" at: ' + L);
      }
    };
    var lt = A(function() {
      var U = "9007199254740993", L;
      return C(U, function(H, X, dt) {
        L = dt.source;
      }), L !== U;
    }), Mt = E && !A(function() {
      return 1 / C("-0 	") !== -1 / 0;
    });
    s({ target: "JSON", stat: !0, forced: lt }, {
      parse: function(L, H) {
        return Mt && !h(H) ? C(L) : st(L, H);
      }
    });
  },
  /***/
  3110(c, e, t) {
    var s = t(6518), i = t(7751), r = t(8745), a = t(9565), o = t(9504), l = t(9039), h = t(4376), d = t(4901), u = t(5810), f = t(757), p = t(2195), m = t(655), v = t(7680), A = t(8235), b = t(3392), E = t(4495), S = t(7819), T = String, x = i("JSON", "stringify"), C = o(/./.exec), I = o("".charAt), M = o("".charCodeAt), P = o("".replace), O = o("".slice), D = o([].push), $ = o(1.1.toString), F = /[\uD800-\uDFFF]/g, N = /^[\uD800-\uDBFF]$/, K = /^[\uDC00-\uDFFF]$/, B = b(), k = B.length, _ = !E || l(function() {
      var J = i("Symbol")("stringify detection");
      return x([J]) !== "[null]" || x({ a: J }) !== "{}" || x(Object(J)) !== "{}";
    }), st = l(function() {
      return x("\uDF06\uD834") !== '"\\udf06\\ud834"' || x("\uDEAD") !== '"\\udead"';
    }), mt = _ ? function(J, lt) {
      var Mt = v(arguments), U = et(lt);
      if (!(!d(U) && (J === void 0 || f(J))))
        return Mt[1] = function(L, H) {
          if (d(U) && (H = a(U, this, T(L), H)), !f(H)) return H;
        }, r(x, null, Mt);
    } : x, ft = function(J, lt, Mt) {
      var U = I(Mt, lt - 1), L = I(Mt, lt + 1);
      return C(N, J) && !C(K, L) || C(K, J) && !C(N, U) ? "\\u" + $(M(J, 0), 16) : J;
    }, et = function(J) {
      if (d(J)) return J;
      if (h(J)) {
        for (var lt = J.length, Mt = [], U = 0; U < lt; U++) {
          var L = J[U];
          typeof L == "string" ? D(Mt, L) : (typeof L == "number" || p(L) === "Number" || p(L) === "String") && D(Mt, m(L));
        }
        var H = Mt.length, X = !0;
        return function(dt, Y) {
          if (X)
            return X = !1, Y;
          if (h(this)) return Y;
          for (var ht = 0; ht < H; ht++) if (Mt[ht] === dt) return Y;
        };
      }
    };
    x && s({ target: "JSON", stat: !0, arity: 3, forced: _ || st || !S }, {
      stringify: function(lt, Mt, U) {
        var L = et(Mt), H = [], X = mt(lt, function(te, ji) {
          var Lr = d(L) ? a(L, this, T(te), ji) : ji;
          return !S && u(Lr) ? B + (D(H, Lr.rawJSON) - 1) : Lr;
        }, U);
        if (typeof X != "string" || (st && (X = P(X, F, ft)), S)) return X;
        for (var dt = "", Y = X.length, ht = 0; ht < Y; ht++) {
          var Ot = I(X, ht);
          if (Ot === '"') {
            var is = A(X, ++ht).end - 1, ae = O(X, ht, is);
            dt += O(ae, 0, k) === B ? H[O(ae, k)] : '"' + ae + '"', ht = is;
          } else dt += Ot;
        }
        return dt;
      }
    });
  },
  /***/
  2731(c, e, t) {
    var s = t(6518), i = t(9306), r = t(6194), a = t(2248), o = t(6395), l = a.get, h = a.has, d = a.set;
    s({ target: "Map", proto: !0, real: !0, forced: o }, {
      getOrInsertComputed: function(f, p) {
        if (r(this), i(p), h(this, f)) return l(this, f);
        f === 0 && 1 / f === -1 / 0 && (f = 0);
        var m = p(f);
        return d(this, f, m), m;
      }
    });
  },
  /***/
  5367(c, e, t) {
    var s = t(6518), i = t(6194), r = t(2248), a = t(6395), o = r.get, l = r.has, h = r.set;
    s({ target: "Map", proto: !0, real: !0, forced: a }, {
      getOrInsert: function(u, f) {
        return l(i(this), u) ? o(this, u) : (h(this, u, f), f);
      }
    });
  },
  /***/
  3068(c, e, t) {
    var s = t(6518), i = t(9504), r = t(2652), a = RangeError, o = TypeError, l = 1 / 0, h = NaN, d = Math.abs, u = Math.pow, f = i([].push), p = u(2, 1023), m = u(2, 53) - 1, v = Number.MAX_VALUE, A = u(2, 971), b = {}, E = {}, S = {}, T = {}, x = {}, C = function(I, M) {
      var P = I + M, O = M - (P - I);
      return { hi: P, lo: O };
    };
    s({ target: "Math", stat: !0 }, {
      // eslint-disable-next-line max-statements -- ok
      sumPrecise: function(M) {
        var P = [], O = 0, D = T;
        switch (r(M, function(U) {
          if (++O >= m) throw new a("Maximum allowed index exceeded");
          if (typeof U != "number") throw new o("Value is not a number");
          D !== b && (U !== U ? D = b : U === l ? D = D === E ? b : S : U === -l ? D = D === S ? b : E : (U !== 0 || 1 / U === l) && (D === T || D === x) && (D = x, f(P, U)));
        }), D) {
          case b:
            return h;
          case E:
            return -l;
          case S:
            return l;
          case T:
            return -0;
        }
        for (var $ = [], F = 0, N, K, B, k, _, st, mt = 0; mt < P.length; mt++) {
          N = P[mt];
          for (var ft = 0, et = 0; et < $.length; et++) {
            if (K = $[et], d(N) < d(K) && (st = N, N = K, K = st), B = C(N, K), k = B.hi, _ = B.lo, d(k) === l) {
              var J = k === l ? 1 : -1;
              F += J, N = N - J * p - J * p, d(N) < d(K) && (st = N, N = K, K = st), B = C(N, K), k = B.hi, _ = B.lo;
            }
            _ !== 0 && ($[ft++] = _), N = k;
          }
          $.length = ft, N !== 0 && f($, N);
        }
        var lt = $.length - 1;
        if (k = 0, _ = 0, F !== 0) {
          var Mt = lt >= 0 ? $[lt] : 0;
          if (lt--, d(F) > 1 || F > 0 && Mt > 0 || F < 0 && Mt < 0)
            return F > 0 ? l : -l;
          if (B = C(F * p, Mt / 2), k = B.hi, _ = B.lo, _ *= 2, d(2 * k) === l)
            return k > 0 ? k === p && _ === -(A / 2) && lt >= 0 && $[lt] < 0 ? v : l : k === -p && _ === A / 2 && lt >= 0 && $[lt] > 0 ? -v : -l;
          _ !== 0 && ($[++lt] = _, _ = 0), k *= 2;
        }
        for (; lt >= 0 && (B = C(k, $[lt--]), k = B.hi, _ = B.lo, _ === 0); )
          ;
        return lt >= 0 && (_ < 0 && $[lt] < 0 || _ > 0 && $[lt] > 0) && (K = _ * 2, N = k + K, K === N - k && (k = N)), k;
      }
    });
  },
  /***/
  1689(c, e, t) {
    var s = t(6518), i = t(4576), r = t(8745), a = t(7680), o = t(6043), l = t(9306), h = t(1103), d = i.Promise, u = !1, f = !d || !d.try || h(function() {
      d.try(function(p) {
        u = p === 8;
      }, 8);
    }).error || !u;
    s({ target: "Promise", stat: !0, forced: f }, {
      try: function(p) {
        var m = arguments.length > 1 ? a(arguments, 1) : [], v = o.f(this), A = h(function() {
          return r(l(p), void 0, m);
        });
        return (A.error ? v.reject : v.resolve)(A.value), v.promise;
      }
    });
  },
  /***/
  4628(c, e, t) {
    var s = t(6518), i = t(6043);
    s({ target: "Promise", stat: !0 }, {
      withResolvers: function() {
        var a = i.f(this);
        return {
          promise: a.promise,
          resolve: a.resolve,
          reject: a.reject
        };
      }
    });
  },
  /***/
  7642(c, e, t) {
    var s = t(6518), i = t(3440), r = t(9039), a = t(4916), o = !a("difference", function(h) {
      return h.size === 0;
    }), l = o || r(function() {
      var h = {
        size: 1,
        has: function() {
          return !0;
        },
        keys: function() {
          var u = 0;
          return {
            next: function() {
              var f = u++ > 1;
              return d.has(1) && d.clear(), { done: f, value: 2 };
            }
          };
        }
      }, d = /* @__PURE__ */ new Set([1, 2, 3, 4]);
      return d.difference(h).size !== 3;
    });
    s({ target: "Set", proto: !0, real: !0, forced: l }, {
      difference: i
    });
  },
  /***/
  8004(c, e, t) {
    var s = t(6518), i = t(9039), r = t(8750), a = t(4916), o = !a("intersection", function(l) {
      return l.size === 2 && l.has(1) && l.has(2);
    }) || i(function() {
      return String(Array.from((/* @__PURE__ */ new Set([1, 2, 3])).intersection(/* @__PURE__ */ new Set([3, 2])))) !== "3,2";
    });
    s({ target: "Set", proto: !0, real: !0, forced: o }, {
      intersection: r
    });
  },
  /***/
  3853(c, e, t) {
    var s = t(6518), i = t(4449), r = t(4916), a = !r("isDisjointFrom", function(o) {
      return !o;
    });
    s({ target: "Set", proto: !0, real: !0, forced: a }, {
      isDisjointFrom: i
    });
  },
  /***/
  5876(c, e, t) {
    var s = t(6518), i = t(3838), r = t(4916), a = !r("isSubsetOf", function(o) {
      return o;
    });
    s({ target: "Set", proto: !0, real: !0, forced: a }, {
      isSubsetOf: i
    });
  },
  /***/
  2475(c, e, t) {
    var s = t(6518), i = t(8527), r = t(4916), a = !r("isSupersetOf", function(o) {
      return !o;
    });
    s({ target: "Set", proto: !0, real: !0, forced: a }, {
      isSupersetOf: i
    });
  },
  /***/
  5024(c, e, t) {
    var s = t(6518), i = t(3650), r = t(9835), a = t(4916), o = !a("symmetricDifference") || !r("symmetricDifference");
    s({ target: "Set", proto: !0, real: !0, forced: o }, {
      symmetricDifference: i
    });
  },
  /***/
  1698(c, e, t) {
    var s = t(6518), i = t(4204), r = t(9835), a = t(4916), o = !a("union") || !r("union");
    s({ target: "Set", proto: !0, real: !0, forced: o }, {
      union: i
    });
  },
  /***/
  9577(c, e, t) {
    var s = t(4644), i = t(1108), r = t(6198), a = t(1291), o = t(5854), l = s.aTypedArray, h = s.getTypedArrayConstructor, d = s.exportTypedArrayMethod, u = RangeError, f = (function() {
      try {
        new Int8Array(1).with(2, { valueOf: function() {
          throw 8;
        } });
      } catch (m) {
        return m === 8;
      }
    })(), p = f && (function() {
      try {
        new Int8Array(1).with(-0.5, 1);
      } catch {
        return !0;
      }
    })();
    d("with", function(m, v) {
      var A = l(this), b = r(A), E = a(m), S = E < 0 ? b + E : E, T = i(A) ? o(v) : +v;
      if (S >= b || S < 0) throw new u("Incorrect index");
      for (var x = new (h(A))(b), C = 0; C < b; C++) x[C] = C === S ? T : A[C];
      return x;
    }, !f || p);
  },
  /***/
  5213(c, e, t) {
    var s = t(6518), i = t(4576), r = t(5370), a = t(9143), o = i.Uint8Array, l = !o || !o.fromBase64 || !(function() {
      try {
        o.fromBase64("a");
        return;
      } catch {
      }
      try {
        o.fromBase64("", null);
      } catch {
        return !0;
      }
    })();
    o && s({ target: "Uint8Array", stat: !0, forced: l }, {
      fromBase64: function(d) {
        var u = a(d, arguments.length > 1 ? arguments[1] : void 0, null, 9007199254740991);
        return r(o, u.bytes);
      }
    });
  },
  /***/
  6632(c, e, t) {
    var s = t(6518), i = t(4576), r = t(9143), a = t(4154), o = i.Uint8Array, l = !o || !o.prototype.setFromBase64 || !(function() {
      var h = new o([255, 255, 255, 255, 255]);
      try {
        h.setFromBase64("", null);
        return;
      } catch {
      }
      try {
        h.setFromBase64("a");
        return;
      } catch {
      }
      try {
        h.setFromBase64("MjYyZg===");
      } catch {
        return h[0] === 50 && h[1] === 54 && h[2] === 50 && h[3] === 255 && h[4] === 255;
      }
    })();
    o && s({ target: "Uint8Array", proto: !0, forced: l }, {
      setFromBase64: function(d) {
        a(this);
        var u = r(d, arguments.length > 1 ? arguments[1] : void 0, this, this.length);
        return { read: u.read, written: u.written };
      }
    });
  },
  /***/
  4226(c, e, t) {
    var s = t(6518), i = t(4576), r = t(3463), a = t(4154), o = t(5169), l = t(2303);
    function h() {
      try {
        var d = new ArrayBuffer(16, { maxByteLength: 1024 });
        new Uint8Array(d).setFromHex("cafed00d");
      } catch {
        return !0;
      }
    }
    i.Uint8Array && s({ target: "Uint8Array", proto: !0, forced: h() }, {
      setFromHex: function(u) {
        a(this), r(u), o(this.buffer);
        var f = l(u, this).read;
        return { read: f, written: f / 2 };
      }
    });
  },
  /***/
  9486(c, e, t) {
    var s = t(6518), i = t(4576), r = t(9504), a = t(3972), o = t(4154), l = t(5169), h = t(2804), d = t(944), u = h.i2c, f = h.i2cUrl, p = r("".charAt), m = i.Uint8Array, v = !m || !m.prototype.toBase64 || !(function() {
      try {
        var A = new m();
        A.toBase64(null);
      } catch {
        return !0;
      }
    })();
    m && s({ target: "Uint8Array", proto: !0, forced: v }, {
      toBase64: function() {
        var b = o(this), E = arguments.length ? a(arguments[0]) : void 0, S = d(E) === "base64" ? u : f, T = !!E && !!E.omitPadding;
        l(this.buffer);
        for (var x = "", C = 0, I = b.length, M, P = function(O) {
          return p(S, M >> 6 * O & 63);
        }; C + 2 < I; C += 3)
          M = (b[C] << 16) + (b[C + 1] << 8) + b[C + 2], x += P(3) + P(2) + P(1) + P(0);
        return C + 2 === I ? (M = (b[C] << 16) + (b[C + 1] << 8), x += P(3) + P(2) + P(1) + (T ? "" : "=")) : C + 1 === I && (M = b[C] << 16, x += P(3) + P(2) + (T ? "" : "==")), x;
      }
    });
  },
  /***/
  456(c, e, t) {
    var s = t(6518), i = t(4576), r = t(9504), a = t(4154), o = t(5169), l = r(1.1.toString), h = i.Uint8Array, d = !h || !h.prototype.toHex || !(function() {
      try {
        var u = new h([255, 255, 255, 255, 255, 255, 255, 255]);
        return u.toHex() === "ffffffffffffffff";
      } catch {
        return !1;
      }
    })();
    h && s({ target: "Uint8Array", proto: !0, forced: d }, {
      toHex: function() {
        a(this), o(this.buffer);
        for (var f = "", p = 0, m = this.length; p < m; p++) {
          var v = l(this[p], 16);
          f += v.length === 1 ? "0" + v : v;
        }
        return f;
      }
    });
  },
  /***/
  9452(c, e, t) {
    var s = t(6518), i = t(9306), r = t(6557), a = t(4328), o = t(4995), l = t(6395), h = o.get, d = o.has, u = o.set, f = l || !(function() {
      try {
        WeakMap.prototype.getOrInsertComputed && (/* @__PURE__ */ new WeakMap()).getOrInsertComputed(1, function() {
          throw 1;
        });
      } catch (p) {
        return p instanceof TypeError;
      }
    })();
    s({ target: "WeakMap", proto: !0, real: !0, forced: f }, {
      getOrInsertComputed: function(m, v) {
        if (r(this), a(m), i(v), d(this, m)) return h(this, m);
        var A = v(m);
        return u(this, m, A), A;
      }
    });
  },
  /***/
  8454(c, e, t) {
    var s = t(6518), i = t(6557), r = t(4995), a = t(6395), o = r.get, l = r.has, h = r.set;
    s({ target: "WeakMap", proto: !0, real: !0, forced: a }, {
      getOrInsert: function(u, f) {
        return l(i(this), u) ? o(this, u) : (h(this, u, f), f);
      }
    });
  },
  /***/
  4979(c, e, t) {
    var s = t(6518), i = t(4576), r = t(7751), a = t(6980), o = t(4913).f, l = t(9297), h = t(679), d = t(3167), u = t(2603), f = t(5002), p = t(8574), m = t(3724), v = t(6395), A = "DOMException", b = r("Error"), E = r(A), S = function() {
      h(this, T);
      var B = arguments.length, k = u(B < 1 ? void 0 : arguments[0]), _ = u(B < 2 ? void 0 : arguments[1], "Error"), st = new E(k, _), mt = new b(k);
      return mt.name = A, o(st, "stack", a(1, p(mt.stack, 1))), d(st, this, S), st;
    }, T = S.prototype = E.prototype, x = "stack" in new b(A), C = "stack" in new E(1, 2), I = E && m && Object.getOwnPropertyDescriptor(i, A), M = !!I && !(I.writable && I.configurable), P = x && !M && !C;
    s({ global: !0, constructor: !0, forced: v || P }, {
      // TODO: fix export logic
      DOMException: P ? S : E
    });
    var O = r(A), D = O.prototype;
    if (D.constructor !== O) {
      v || o(D, "constructor", a(1, O));
      for (var $ in f) if (l(f, $)) {
        var F = f[$], N = F.s;
        l(O, N) || o(O, N, a(6, F.c));
      }
    }
  },
  /***/
  4603(c, e, t) {
    var s = t(6840), i = t(9504), r = t(655), a = t(2812), o = URLSearchParams, l = o.prototype, h = i(l.append), d = i(l.delete), u = i(l.forEach), f = i([].push), p = new o("a=1&a=2&b=3");
    p.delete("a", 1), p.delete("b", void 0), p + "" != "a=2" && s(l, "delete", function(m) {
      var v = arguments.length, A = v < 2 ? void 0 : arguments[1];
      if (v && A === void 0) return d(this, m);
      var b = [];
      u(this, function(P, O) {
        f(b, { key: O, value: P });
      }), a(v, 1);
      for (var E = r(m), S = r(A), T = 0, x = 0, C = !1, I = b.length, M; T < I; )
        M = b[T++], C || M.key === E ? (C = !0, d(this, M.key)) : x++;
      for (; x < I; )
        M = b[x++], M.key === E && M.value === S || h(this, M.key, M.value);
    }, { enumerable: !0, unsafe: !0 });
  },
  /***/
  7566(c, e, t) {
    var s = t(6840), i = t(9504), r = t(655), a = t(2812), o = URLSearchParams, l = o.prototype, h = i(l.getAll), d = i(l.has), u = new o("a=1");
    (u.has("a", 2) || !u.has("a", void 0)) && s(l, "has", function(p) {
      var m = arguments.length, v = m < 2 ? void 0 : arguments[1];
      if (m && v === void 0) return d(this, p);
      var A = h(this, p);
      a(m, 1);
      for (var b = r(v), E = 0; E < A.length; )
        if (A[E++] === b) return !0;
      return !1;
    }, { enumerable: !0, unsafe: !0 });
  },
  /***/
  8721(c, e, t) {
    var s = t(3724), i = t(9504), r = t(2106), a = URLSearchParams.prototype, o = i(a.forEach);
    s && !("size" in a) && r(a, "size", {
      get: function() {
        var h = 0;
        return o(this, function() {
          h++;
        }), h;
      },
      configurable: !0,
      enumerable: !0
    });
  },
  /***/
  5781(c, e, t) {
    var s = t(6518), i = t(7751), r = t(2812), a = t(655), o = t(7416), l = i("URL");
    s({ target: "URL", stat: !0, forced: !o }, {
      parse: function(d) {
        var u = r(arguments.length, 1), f = a(d), p = u < 2 || arguments[1] === void 0 ? void 0 : a(arguments[1]);
        try {
          return new l(f, p);
        } catch {
          return null;
        }
      }
    });
  }
  /******/
}, Ig = {};
function q(c) {
  var e = Ig[c];
  if (e !== void 0)
    return e.exports;
  var t = Ig[c] = {
    /******/
    // no module.id needed
    /******/
    // no module.loaded needed
    /******/
    exports: {}
    /******/
  };
  return Dy[c].call(t.exports, t, t.exports, q), t.exports;
}
q.d = (c, e) => {
  for (var t in e)
    q.o(e, t) && !q.o(c, t) && Object.defineProperty(c, t, { enumerable: !0, get: e[t] });
};
q.o = (c, e) => Object.prototype.hasOwnProperty.call(c, e);
q(4114);
q(6573);
q(8100);
q(7936);
q(8111);
q(8237);
q(5367);
q(2731);
q(3068);
q(9577);
q(6632);
q(4226);
q(9486);
q(456);
q(5781);
const xs = typeof process == "object" && process + "" == "[object process]" && !process.versions.nw && !(process.versions.electron && process.type && process.type !== "browser"), Rf = [1e-3, 0, 0, 1e-3, 0, 0], wf = 1.35, Ss = {
  ANY: 1,
  DISPLAY: 2,
  PRINT: 4,
  ANNOTATIONS_FORMS: 16,
  ANNOTATIONS_STORAGE: 32,
  ANNOTATIONS_DISABLE: 64,
  IS_EDITING: 128,
  OPLIST: 256
}, In = {
  DISABLE: 0,
  ENABLE: 1,
  ENABLE_FORMS: 2,
  ENABLE_STORAGE: 3
}, Fh = "pdfjs_internal_editor_", tt = {
  DISABLE: -1,
  NONE: 0,
  FREETEXT: 3,
  HIGHLIGHT: 9,
  STAMP: 13,
  INK: 15,
  POPUP: 16,
  SIGNATURE: 101,
  COMMENT: 102
}, ut = {
  RESIZE: 1,
  CREATE: 2,
  FREETEXT_SIZE: 11,
  FREETEXT_COLOR: 12,
  FREETEXT_OPACITY: 13,
  INK_COLOR: 21,
  INK_THICKNESS: 22,
  INK_OPACITY: 23,
  HIGHLIGHT_COLOR: 31,
  HIGHLIGHT_THICKNESS: 32,
  HIGHLIGHT_FREE: 33,
  HIGHLIGHT_SHOW_ALL: 34,
  DRAW_STEP: 41
}, My = {
  PRINT: 4,
  MODIFY_CONTENTS: 8,
  COPY: 16,
  MODIFY_ANNOTATIONS: 32,
  FILL_INTERACTIVE_FORMS: 256,
  COPY_FOR_ACCESSIBILITY: 512,
  ASSEMBLE: 1024,
  PRINT_HIGH_QUALITY: 2048
}, $r = {
  TRIANGLES: 1,
  LATTICE: 2
}, oe = {
  FILL: 0,
  STROKE: 1,
  FILL_STROKE: 2,
  INVISIBLE: 3,
  FILL_STROKE_MASK: 3,
  ADD_TO_PATH_FLAG: 4
}, Gd = {
  GRAYSCALE_1BPP: 1,
  RGB_24BPP: 2,
  RGBA_32BPP: 3
}, ie = {
  TEXT: 1,
  LINK: 2,
  FREETEXT: 3,
  LINE: 4,
  SQUARE: 5,
  CIRCLE: 6,
  POLYGON: 7,
  POLYLINE: 8,
  HIGHLIGHT: 9,
  UNDERLINE: 10,
  SQUIGGLY: 11,
  STRIKEOUT: 12,
  STAMP: 13,
  CARET: 14,
  INK: 15,
  POPUP: 16,
  FILEATTACHMENT: 17,
  SOUND: 18,
  MOVIE: 19,
  WIDGET: 20,
  SCREEN: 21,
  PRINTERMARK: 22,
  TRAPNET: 23,
  WATERMARK: 24,
  THREED: 25,
  REDACT: 26
}, fo = {
  SOLID: 1,
  DASHED: 2,
  BEVELED: 3,
  INSET: 4,
  UNDERLINE: 5
}, of = {
  ERRORS: 0,
  WARNINGS: 1,
  INFOS: 5
}, kh = {
  dependency: 1,
  setLineWidth: 2,
  setLineCap: 3,
  setLineJoin: 4,
  setMiterLimit: 5,
  setDash: 6,
  setRenderingIntent: 7,
  setFlatness: 8,
  setGState: 9,
  save: 10,
  restore: 11,
  transform: 12,
  moveTo: 13,
  lineTo: 14,
  curveTo: 15,
  curveTo2: 16,
  curveTo3: 17,
  closePath: 18,
  rectangle: 19,
  stroke: 20,
  closeStroke: 21,
  fill: 22,
  eoFill: 23,
  fillStroke: 24,
  eoFillStroke: 25,
  closeFillStroke: 26,
  closeEOFillStroke: 27,
  endPath: 28,
  clip: 29,
  eoClip: 30,
  beginText: 31,
  endText: 32,
  setCharSpacing: 33,
  setWordSpacing: 34,
  setHScale: 35,
  setLeading: 36,
  setFont: 37,
  setTextRenderingMode: 38,
  setTextRise: 39,
  moveText: 40,
  setLeadingMoveText: 41,
  setTextMatrix: 42,
  nextLine: 43,
  showText: 44,
  showSpacedText: 45,
  nextLineShowText: 46,
  nextLineSetSpacingShowText: 47,
  setCharWidth: 48,
  setCharWidthAndBounds: 49,
  setStrokeColorSpace: 50,
  setFillColorSpace: 51,
  setStrokeColor: 52,
  setStrokeColorN: 53,
  setFillColor: 54,
  setFillColorN: 55,
  setStrokeGray: 56,
  setFillGray: 57,
  setStrokeRGBColor: 58,
  setFillRGBColor: 59,
  setStrokeCMYKColor: 60,
  setFillCMYKColor: 61,
  shadingFill: 62,
  beginInlineImage: 63,
  beginImageData: 64,
  endInlineImage: 65,
  paintXObject: 66,
  markPoint: 67,
  markPointProps: 68,
  beginMarkedContent: 69,
  beginMarkedContentProps: 70,
  endMarkedContent: 71,
  beginCompat: 72,
  endCompat: 73,
  paintFormXObjectBegin: 74,
  paintFormXObjectEnd: 75,
  beginGroup: 76,
  endGroup: 77,
  beginAnnotation: 80,
  endAnnotation: 81,
  paintImageMaskXObject: 83,
  paintImageMaskXObjectGroup: 84,
  paintImageXObject: 85,
  paintInlineImageXObject: 86,
  paintInlineImageXObjectGroup: 87,
  paintImageXObjectRepeat: 88,
  paintImageMaskXObjectRepeat: 89,
  paintSolidColorImageMask: 90,
  constructPath: 91,
  setStrokeTransparent: 92,
  setFillTransparent: 93,
  rawFillPath: 94
}, rh = {
  moveTo: 0,
  lineTo: 1,
  curveTo: 2,
  quadraticCurveTo: 3,
  closePath: 4
}, nm = {
  NEED_PASSWORD: 1,
  INCORRECT_PASSWORD: 2
};
let lf = of.WARNINGS;
function Oy(c) {
  Number.isInteger(c) && (lf = c);
}
function Ly() {
  return lf;
}
function hf(c) {
  lf >= of.INFOS && console.info(`Info: ${c}`);
}
function Z(c) {
  lf >= of.WARNINGS && console.warn(`Warning: ${c}`);
}
function bt(c) {
  throw new Error(c);
}
function Gt(c, e) {
  c || bt(e);
}
function Fy(c) {
  switch (c?.protocol) {
    case "http:":
    case "https:":
    case "ftp:":
    case "mailto:":
    case "tel:":
      return !0;
    default:
      return !1;
  }
}
function rm(c, e = null, t = null) {
  if (!c)
    return null;
  if (t && typeof c == "string" && (t.addDefaultProtocol && c.startsWith("www.") && c.match(/\./g)?.length >= 2 && (c = `http://${c}`), t.tryConvertEncoding))
    try {
      c = $y(c);
    } catch {
    }
  const s = e ? URL.parse(c, e) : URL.parse(c);
  return Fy(s) ? s : null;
}
function am(c, e, t = !1) {
  const s = URL.parse(c);
  return s ? (s.hash = e, s.href) : t && rm(c, "http://example.com") ? c.split("#", 1)[0] + `${e ? `#${e}` : ""}` : "";
}
function Df(c) {
  return c.substring(c.lastIndexOf("/") + 1);
}
function nt(c, e, t, s = !1) {
  return Object.defineProperty(c, e, {
    value: t,
    enumerable: !s,
    configurable: !0,
    writable: !1
  }), t;
}
const ho = (function() {
  function e(t, s) {
    this.message = t, this.name = s;
  }
  return e.prototype = new Error(), e.constructor = e, e;
})();
class Pg extends ho {
  constructor(e, t) {
    super(e, "PasswordException"), this.code = t;
  }
}
class Ef extends ho {
  constructor(e, t) {
    super(e, "UnknownErrorException"), this.details = t;
  }
}
class Mf extends ho {
  constructor(e) {
    super(e, "InvalidPDFException");
  }
}
class Cu extends ho {
  constructor(e, t, s) {
    super(e, "ResponseException"), this.status = t, this.missing = s;
  }
}
class ky extends ho {
  constructor(e) {
    super(e, "FormatError");
  }
}
class Dr extends ho {
  constructor(e) {
    super(e, "AbortException");
  }
}
function Ny(c) {
  (typeof c != "object" || c?.length === void 0) && bt("Invalid argument for bytesToString");
  const e = c.length, t = 8192;
  if (e < t)
    return String.fromCharCode.apply(null, c);
  const s = [];
  for (let i = 0; i < e; i += t) {
    const r = Math.min(i + t, e), a = c.subarray(i, r);
    s.push(String.fromCharCode.apply(null, a));
  }
  return s.join("");
}
function cf(c) {
  typeof c != "string" && bt("Invalid argument for stringToBytes");
  const e = c.length, t = new Uint8Array(e);
  for (let s = 0; s < e; ++s)
    t[s] = c.charCodeAt(s) & 255;
  return t;
}
function By(c) {
  return String.fromCharCode(c >> 24 & 255, c >> 16 & 255, c >> 8 & 255, c & 255);
}
function Uy() {
  const c = new Uint8Array(4);
  return c[0] = 1, new Uint32Array(c.buffer, 0, 1)[0] === 1;
}
function Hy() {
  try {
    return new Function(""), !0;
  } catch {
    return !1;
  }
}
class de {
  static get isLittleEndian() {
    return nt(this, "isLittleEndian", Uy());
  }
  static get isEvalSupported() {
    return nt(this, "isEvalSupported", Hy());
  }
  static get isOffscreenCanvasSupported() {
    return nt(this, "isOffscreenCanvasSupported", typeof OffscreenCanvas < "u");
  }
  static get isImageDecoderSupported() {
    return nt(this, "isImageDecoderSupported", typeof ImageDecoder < "u");
  }
  static get isFloat16ArraySupported() {
    return nt(this, "isFloat16ArraySupported", typeof Float16Array < "u");
  }
  static get isSanitizerSupported() {
    return nt(this, "isSanitizerSupported", typeof Sanitizer < "u");
  }
  static get platform() {
    const {
      platform: e,
      userAgent: t
    } = navigator;
    return nt(this, "platform", {
      isAndroid: t.includes("Android"),
      isLinux: e.includes("Linux"),
      isMac: e.includes("Mac"),
      isWindows: e.includes("Win"),
      isFirefox: t.includes("Firefox")
    });
  }
  static get isCSSRoundSupported() {
    return nt(this, "isCSSRoundSupported", globalThis.CSS?.supports?.("width: round(1.5px, 1px)"));
  }
}
const Sf = Array.from(Array(256).keys(), (c) => c.toString(16).padStart(2, "0"));
var Rn, _d, Of;
class j {
  static makeHexColor(e, t, s) {
    return `#${Sf[e]}${Sf[t]}${Sf[s]}`;
  }
  static domMatrixToTransform(e) {
    return [e.a, e.b, e.c, e.d, e.e, e.f];
  }
  static scaleMinMax(e, t) {
    let s;
    e[0] ? (e[0] < 0 && (s = t[0], t[0] = t[2], t[2] = s), t[0] *= e[0], t[2] *= e[0], e[3] < 0 && (s = t[1], t[1] = t[3], t[3] = s), t[1] *= e[3], t[3] *= e[3]) : (s = t[0], t[0] = t[1], t[1] = s, s = t[2], t[2] = t[3], t[3] = s, e[1] < 0 && (s = t[1], t[1] = t[3], t[3] = s), t[1] *= e[1], t[3] *= e[1], e[2] < 0 && (s = t[0], t[0] = t[2], t[2] = s), t[0] *= e[2], t[2] *= e[2]), t[0] += e[4], t[1] += e[5], t[2] += e[4], t[3] += e[5];
  }
  static transform(e, t) {
    return [e[0] * t[0] + e[2] * t[1], e[1] * t[0] + e[3] * t[1], e[0] * t[2] + e[2] * t[3], e[1] * t[2] + e[3] * t[3], e[0] * t[4] + e[2] * t[5] + e[4], e[1] * t[4] + e[3] * t[5] + e[5]];
  }
  static multiplyByDOMMatrix(e, t) {
    return [e[0] * t.a + e[2] * t.b, e[1] * t.a + e[3] * t.b, e[0] * t.c + e[2] * t.d, e[1] * t.c + e[3] * t.d, e[0] * t.e + e[2] * t.f + e[4], e[1] * t.e + e[3] * t.f + e[5]];
  }
  static applyTransform(e, t, s = 0) {
    const i = e[s], r = e[s + 1];
    e[s] = i * t[0] + r * t[2] + t[4], e[s + 1] = i * t[1] + r * t[3] + t[5];
  }
  static applyTransformToBezier(e, t, s = 0) {
    const i = t[0], r = t[1], a = t[2], o = t[3], l = t[4], h = t[5];
    for (let d = 0; d < 6; d += 2) {
      const u = e[s + d], f = e[s + d + 1];
      e[s + d] = u * i + f * a + l, e[s + d + 1] = u * r + f * o + h;
    }
  }
  static applyInverseTransform(e, t) {
    const s = e[0], i = e[1], r = t[0] * t[3] - t[1] * t[2];
    e[0] = (s * t[3] - i * t[2] + t[2] * t[5] - t[4] * t[3]) / r, e[1] = (-s * t[1] + i * t[0] + t[4] * t[1] - t[5] * t[0]) / r;
  }
  static axialAlignedBoundingBox(e, t, s) {
    const i = t[0], r = t[1], a = t[2], o = t[3], l = t[4], h = t[5], d = e[0], u = e[1], f = e[2], p = e[3];
    let m = i * d + l, v = m, A = i * f + l, b = A, E = o * u + h, S = E, T = o * p + h, x = T;
    if (r !== 0 || a !== 0) {
      const C = r * d, I = r * f, M = a * u, P = a * p;
      m += M, b += M, A += P, v += P, E += C, x += C, T += I, S += I;
    }
    s[0] = Math.min(s[0], m, A, v, b), s[1] = Math.min(s[1], E, T, S, x), s[2] = Math.max(s[2], m, A, v, b), s[3] = Math.max(s[3], E, T, S, x);
  }
  static inverseTransform(e) {
    const t = e[0] * e[3] - e[1] * e[2];
    return [e[3] / t, -e[1] / t, -e[2] / t, e[0] / t, (e[2] * e[5] - e[4] * e[3]) / t, (e[4] * e[1] - e[5] * e[0]) / t];
  }
  static singularValueDecompose2dScale(e, t) {
    const s = e[0], i = e[1], r = e[2], a = e[3], o = s ** 2 + i ** 2, l = s * r + i * a, h = r ** 2 + a ** 2, d = (o + h) / 2, u = Math.sqrt(d ** 2 - (o * h - l ** 2));
    t[0] = Math.sqrt(d + u || 1), t[1] = Math.sqrt(d - u || 1);
  }
  static normalizeRect(e) {
    const t = e.slice(0);
    return e[0] > e[2] && (t[0] = e[2], t[2] = e[0]), e[1] > e[3] && (t[1] = e[3], t[3] = e[1]), t;
  }
  static intersect(e, t) {
    const s = Math.max(Math.min(e[0], e[2]), Math.min(t[0], t[2])), i = Math.min(Math.max(e[0], e[2]), Math.max(t[0], t[2]));
    if (s > i)
      return null;
    const r = Math.max(Math.min(e[1], e[3]), Math.min(t[1], t[3])), a = Math.min(Math.max(e[1], e[3]), Math.max(t[1], t[3]));
    return r > a ? null : [s, r, i, a];
  }
  static pointBoundingBox(e, t, s) {
    s[0] = Math.min(s[0], e), s[1] = Math.min(s[1], t), s[2] = Math.max(s[2], e), s[3] = Math.max(s[3], t);
  }
  static rectBoundingBox(e, t, s, i, r) {
    r[0] = Math.min(r[0], e, s), r[1] = Math.min(r[1], t, i), r[2] = Math.max(r[2], e, s), r[3] = Math.max(r[3], t, i);
  }
  static bezierBoundingBox(e, t, s, i, r, a, o, l, h) {
    h[0] = Math.min(h[0], e, o), h[1] = Math.min(h[1], t, l), h[2] = Math.max(h[2], e, o), h[3] = Math.max(h[3], t, l), w(this, Rn, Of).call(this, e, s, r, o, t, i, a, l, 3 * (-e + 3 * (s - r) + o), 6 * (e - 2 * s + r), 3 * (s - e), h), w(this, Rn, Of).call(this, e, s, r, o, t, i, a, l, 3 * (-t + 3 * (i - a) + l), 6 * (t - 2 * i + a), 3 * (i - t), h);
  }
}
Rn = new WeakSet(), _d = function(e, t, s, i, r, a, o, l, h, d) {
  if (h <= 0 || h >= 1)
    return;
  const u = 1 - h, f = h * h, p = f * h, m = u * (u * (u * e + 3 * h * t) + 3 * f * s) + p * i, v = u * (u * (u * r + 3 * h * a) + 3 * f * o) + p * l;
  d[0] = Math.min(d[0], m), d[1] = Math.min(d[1], v), d[2] = Math.max(d[2], m), d[3] = Math.max(d[3], v);
}, Of = function(e, t, s, i, r, a, o, l, h, d, u, f) {
  if (Math.abs(h) < 1e-12) {
    Math.abs(d) >= 1e-12 && w(this, Rn, _d).call(this, e, t, s, i, r, a, o, l, -u / d, f);
    return;
  }
  const p = d ** 2 - 4 * u * h;
  if (p < 0)
    return;
  const m = Math.sqrt(p), v = 2 * h;
  w(this, Rn, _d).call(this, e, t, s, i, r, a, o, l, (-d + m) / v, f), w(this, Rn, _d).call(this, e, t, s, i, r, a, o, l, (-d - m) / v, f);
}, y(j, Rn);
function $y(c) {
  return decodeURIComponent(escape(c));
}
let xf = null, Rg = null;
function jy(c) {
  return xf || (xf = /([\u00a0\u00b5\u037e\u0eb3\u2000-\u200a\u202f\u2126\ufb00-\ufb04\ufb06\ufb20-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufba1\ufba4-\ufba9\ufbae-\ufbb1\ufbd3-\ufbdc\ufbde-\ufbe7\ufbea-\ufbf8\ufbfc-\ufbfd\ufc00-\ufc5d\ufc64-\ufcf1\ufcf5-\ufd3d\ufd88\ufdf4\ufdfa-\ufdfb\ufe71\ufe77\ufe79\ufe7b\ufe7d]+)|(\ufb05+)/gu, Rg = /* @__PURE__ */ new Map([["ﬅ", "ſt"]])), c.replaceAll(xf, (e, t, s) => t ? t.normalize("NFKC") : Rg.get(s));
}
function om() {
  if (typeof crypto.randomUUID == "function")
    return crypto.randomUUID();
  const c = new Uint8Array(32);
  return crypto.getRandomValues(c), Ny(c);
}
const Eo = "pdfjs_internal_id_";
function Gy(c, e, t) {
  if (!Array.isArray(t) || t.length < 2)
    return !1;
  const [s, i, ...r] = t;
  if (!c(s) && !Number.isInteger(s) || !e(i))
    return !1;
  const a = r.length;
  let o = !0;
  switch (i.name) {
    case "XYZ":
      if (a < 2 || a > 3)
        return !1;
      break;
    case "Fit":
    case "FitB":
      return a === 0;
    case "FitH":
    case "FitBH":
    case "FitV":
    case "FitBV":
      if (a > 1)
        return !1;
      break;
    case "FitR":
      if (a !== 4)
        return !1;
      o = !1;
      break;
    default:
      return !1;
  }
  for (const l of r)
    if (!(typeof l == "number" || o && l === null))
      return !1;
  return !0;
}
const ag = () => [], og = () => /* @__PURE__ */ new Map(), Lf = () => /* @__PURE__ */ Object.create(null);
function Ae(c, e, t) {
  return Math.min(Math.max(c, e), t);
}
typeof Blob.prototype.bytes != "function" && (Blob.prototype.bytes = async function() {
  return new Uint8Array(await this.arrayBuffer());
});
typeof Response.prototype.bytes != "function" && (Response.prototype.bytes = async function() {
  return new Uint8Array(await this.arrayBuffer());
});
typeof AbortSignal.any != "function" && (AbortSignal.any = function(c) {
  const e = new AbortController(), {
    signal: t
  } = e;
  for (const s of c)
    if (s.aborted)
      return e.abort(s.reason), t;
  for (const s of c)
    s.addEventListener("abort", () => {
      e.abort(s.reason);
    }, {
      signal: t
    });
  return t;
});
q(1701);
q(4603);
q(7566);
q(8721);
class Nh {
  static textContent(e) {
    const t = [], s = {
      items: t,
      styles: /* @__PURE__ */ Object.create(null)
    };
    function i(r) {
      if (!r)
        return;
      let a = null;
      const o = r.name;
      if (o === "#text")
        a = r.value;
      else if (Nh.shouldBuildText(o))
        r?.attributes?.textContent ? a = r.attributes.textContent : r.value && (a = r.value);
      else return;
      if (a !== null && t.push({
        str: a
      }), !!r.children)
        for (const l of r.children)
          i(l);
    }
    return i(e), s;
  }
  static shouldBuildText(e) {
    return !(e === "textarea" || e === "input" || e === "option" || e === "select");
  }
}
class lm {
  static setupStorage(e, t, s, i, r) {
    const a = i.getValue(t, {
      value: null
    });
    switch (s.name) {
      case "textarea":
        if (a.value !== null && (e.textContent = a.value), r === "print")
          break;
        e.addEventListener("input", (o) => {
          i.setValue(t, {
            value: o.target.value
          });
        });
        break;
      case "input":
        if (s.attributes.type === "radio" || s.attributes.type === "checkbox") {
          if (a.value === s.attributes.xfaOn ? e.setAttribute("checked", !0) : a.value === s.attributes.xfaOff && e.removeAttribute("checked"), r === "print")
            break;
          e.addEventListener("change", (o) => {
            i.setValue(t, {
              value: o.target.checked ? o.target.getAttribute("xfaOn") : o.target.getAttribute("xfaOff")
            });
          });
        } else {
          if (a.value !== null && e.setAttribute("value", a.value), r === "print")
            break;
          e.addEventListener("input", (o) => {
            i.setValue(t, {
              value: o.target.value
            });
          });
        }
        break;
      case "select":
        if (a.value !== null) {
          e.setAttribute("value", a.value);
          for (const o of s.children)
            o.attributes.value === a.value ? o.attributes.selected = !0 : o.attributes.hasOwnProperty("selected") && delete o.attributes.selected;
        }
        e.addEventListener("input", (o) => {
          const l = o.target.options, h = l.selectedIndex === -1 ? "" : l[l.selectedIndex].value;
          i.setValue(t, {
            value: h
          });
        });
        break;
    }
  }
  static setAttributes({
    html: e,
    element: t,
    storage: s = null,
    intent: i,
    linkService: r
  }) {
    const {
      attributes: a
    } = t, o = e instanceof HTMLAnchorElement;
    a.type === "radio" && (a.name = `${a.name}-${i}`);
    for (const [l, h] of Object.entries(a))
      if (h != null)
        switch (l) {
          case "class":
            h.length && e.setAttribute(l, h.join(" "));
            break;
          case "dataId":
            break;
          case "id":
            e.setAttribute("data-element-id", h);
            break;
          case "style":
            Object.assign(e.style, h);
            break;
          case "textContent":
            e.textContent = h;
            break;
          default:
            (!o || l !== "href" && l !== "newWindow") && e.setAttribute(l, h);
        }
    o && r.addLinkAttributes(e, a.href, a.newWindow), s && a.dataId && this.setupStorage(e, a.dataId, t, s);
  }
  static render(e) {
    const t = e.annotationStorage, s = e.linkService, i = e.xfaHtml, r = e.intent || "display", a = document.createElement(i.name);
    i.attributes && this.setAttributes({
      html: a,
      element: i,
      intent: r,
      linkService: s
    });
    const o = r !== "richText", l = e.div;
    if (l.append(a), e.viewport) {
      const u = `matrix(${e.viewport.transform.join(",")})`;
      l.style.transform = u;
    }
    o && l.setAttribute("class", "xfaLayer xfaFont");
    const h = [];
    if (i.children.length === 0) {
      if (i.value) {
        const u = document.createTextNode(i.value);
        a.append(u), o && Nh.shouldBuildText(i.name) && h.push(u);
      }
      return {
        textDivs: h
      };
    }
    const d = [[i, -1, a]];
    for (; d.length > 0; ) {
      const [u, f, p] = d.at(-1);
      if (f + 1 === u.children.length) {
        d.pop();
        continue;
      }
      const m = u.children[++d.at(-1)[1]];
      if (m === null)
        continue;
      const {
        name: v
      } = m;
      if (v === "#text") {
        const b = document.createTextNode(m.value);
        h.push(b), p.append(b);
        continue;
      }
      const A = m?.attributes?.xmlns ? document.createElementNS(m.attributes.xmlns, v) : document.createElement(v);
      if (p.append(A), m.attributes && this.setAttributes({
        html: A,
        element: m,
        storage: t,
        intent: r,
        linkService: s
      }), m.children?.length > 0)
        d.push([m, -1, A]);
      else if (m.value) {
        const b = document.createTextNode(m.value);
        o && Nh.shouldBuildText(v) && h.push(b), A.append(b);
      }
    }
    for (const u of l.querySelectorAll(".xfaNonInteractive input, .xfaNonInteractive textarea"))
      u.setAttribute("readOnly", !0);
    return {
      textDivs: h
    };
  }
  static update(e) {
    const t = `matrix(${e.viewport.transform.join(",")})`;
    e.div.style.transform = t, e.div.hidden = !1;
  }
}
const Gi = "http://www.w3.org/2000/svg", Br = class Br {
};
R(Br, "CSS", 96), R(Br, "PDF", 72), R(Br, "PDF_TO_CSS_UNITS", Br.CSS / Br.PDF);
let Mr = Br;
async function lg(c, e = "text") {
  if (Mh(c, document.baseURI)) {
    const t = await fetch(c);
    if (!t.ok)
      throw new Error(t.statusText);
    switch (e) {
      case "blob":
        return t.blob();
      case "bytes":
        return t.bytes();
      case "json":
        return t.json();
    }
    return t.text();
  }
  return new Promise((t, s) => {
    const i = new XMLHttpRequest();
    i.open("GET", c, !0), i.responseType = e === "bytes" ? "arraybuffer" : e, i.onreadystatechange = () => {
      if (i.readyState === XMLHttpRequest.DONE) {
        if (i.status === 200 || i.status === 0) {
          switch (e) {
            case "bytes":
              t(new Uint8Array(i.response));
              return;
            case "blob":
            case "json":
              t(i.response);
              return;
          }
          t(i.responseText);
          return;
        }
        s(new Error(i.statusText));
      }
    }, i.send(null);
  });
}
class Rd {
  constructor({
    viewBox: e,
    userUnit: t,
    scale: s,
    rotation: i,
    offsetX: r = 0,
    offsetY: a = 0,
    dontFlip: o = !1
  }) {
    this.viewBox = e, this.userUnit = t, this.scale = s, this.rotation = i, this.offsetX = r, this.offsetY = a, s *= t;
    const l = (e[2] + e[0]) / 2, h = (e[3] + e[1]) / 2;
    let d, u, f, p;
    switch (i %= 360, i < 0 && (i += 360), i) {
      case 180:
        d = -1, u = 0, f = 0, p = 1;
        break;
      case 90:
        d = 0, u = 1, f = 1, p = 0;
        break;
      case 270:
        d = 0, u = -1, f = -1, p = 0;
        break;
      case 0:
        d = 1, u = 0, f = 0, p = -1;
        break;
      default:
        throw new Error("PageViewport: Invalid rotation, must be a multiple of 90 degrees.");
    }
    o && (f = -f, p = -p);
    let m, v, A, b;
    d === 0 ? (m = Math.abs(h - e[1]) * s + r, v = Math.abs(l - e[0]) * s + a, A = (e[3] - e[1]) * s, b = (e[2] - e[0]) * s) : (m = Math.abs(l - e[0]) * s + r, v = Math.abs(h - e[1]) * s + a, A = (e[2] - e[0]) * s, b = (e[3] - e[1]) * s), this.transform = [d * s, u * s, f * s, p * s, m - d * s * l - f * s * h, v - u * s * l - p * s * h], this.width = A, this.height = b;
  }
  get rawDims() {
    const e = this.viewBox;
    return nt(this, "rawDims", {
      pageWidth: e[2] - e[0],
      pageHeight: e[3] - e[1],
      pageX: e[0],
      pageY: e[1]
    });
  }
  clone({
    scale: e = this.scale,
    rotation: t = this.rotation,
    offsetX: s = this.offsetX,
    offsetY: i = this.offsetY,
    dontFlip: r = !1
  } = {}) {
    return new Rd({
      viewBox: this.viewBox.slice(),
      userUnit: this.userUnit,
      scale: e,
      rotation: t,
      offsetX: s,
      offsetY: i,
      dontFlip: r
    });
  }
  convertToViewportPoint(e, t) {
    const s = [e, t];
    return j.applyTransform(s, this.transform), s;
  }
  convertToViewportRectangle(e) {
    const t = [e[0], e[1]];
    j.applyTransform(t, this.transform);
    const s = [e[2], e[3]];
    return j.applyTransform(s, this.transform), [t[0], t[1], s[0], s[1]];
  }
  convertToPdfPoint(e, t) {
    const s = [e, t];
    return j.applyInverseTransform(s, this.transform), s;
  }
}
class hg extends ho {
  constructor(e, t = 0) {
    super(e, "RenderingCancelledException"), this.extraDelay = t;
  }
}
function df(c) {
  const e = c.length;
  let t = 0;
  for (; t < e && c[t].trim() === ""; )
    t++;
  return c.substring(t, t + 5).toLowerCase() === "data:";
}
function cg(c) {
  return typeof c == "string" && /\.pdf$/i.test(c);
}
function _y(c) {
  return [c] = c.split(/[#?]/, 1), Df(c);
}
function Wy(c, e = "document.pdf") {
  if (typeof c != "string")
    return e;
  if (df(c))
    return Z('getPdfFilenameFromUrl: ignore "data:"-URL for performance reasons.'), e;
  const s = ((o) => {
    try {
      return new URL(o);
    } catch {
      try {
        return new URL(decodeURIComponent(o));
      } catch {
        try {
          return new URL(o, "https://foo.bar");
        } catch {
          try {
            return new URL(decodeURIComponent(o), "https://foo.bar");
          } catch {
            return null;
          }
        }
      }
    }
  })(c);
  if (!s)
    return e;
  const i = (o) => {
    try {
      let l = decodeURIComponent(o);
      return l.includes("/") && (l = Df(l), /^\.pdf$/i.test(l)) ? o : l;
    } catch {
      return o;
    }
  }, r = /\.pdf$/i, a = Df(s.pathname);
  if (r.test(a))
    return i(a);
  if (s.searchParams.size > 0) {
    const o = (h) => [...h].findLast((d) => r.test(d)), l = o(s.searchParams.values()) ?? o(s.searchParams.keys());
    if (l)
      return i(l);
  }
  if (s.hash) {
    const l = /[^/?#=]+\.pdf\b(?!.*\.pdf\b)/i.exec(s.hash);
    if (l)
      return i(l[0]);
  }
  return e;
}
var Nn;
class Dg {
  constructor() {
    y(this, Nn, /* @__PURE__ */ new Map());
    R(this, "times", []);
  }
  time(e) {
    n(this, Nn).has(e) && Z(`Timer is already running for ${e}`), n(this, Nn).set(e, Date.now());
  }
  timeEnd(e) {
    n(this, Nn).has(e) || Z(`Timer has not been started for ${e}`), this.times.push({
      name: e,
      start: n(this, Nn).get(e),
      end: Date.now()
    }), n(this, Nn).delete(e);
  }
  toString() {
    const e = Math.max(...this.times.map((t) => t.name.length));
    return this.times.map((t) => `${t.name.padEnd(e)} ${t.end - t.start}ms
`).join("");
  }
}
Nn = new WeakMap();
function Mh(c, e) {
  const t = e ? URL.parse(c, e) : URL.parse(c);
  return /https?:/.test(t?.protocol ?? "");
}
function Vs(c) {
  c.preventDefault();
}
function Kt(c) {
  c.preventDefault(), c.stopPropagation();
}
function Vy(c) {
  console.log("Deprecated API usage: " + c);
}
var Hh;
class Iu {
  static toDateObject(e) {
    if (e instanceof Date)
      return e;
    if (!e || typeof e != "string")
      return null;
    n(this, Hh) || g(this, Hh, new RegExp("^D:(\\d{4})(\\d{2})?(\\d{2})?(\\d{2})?(\\d{2})?(\\d{2})?([Z|+|-])?(\\d{2})?'?(\\d{2})?'?"));
    const t = n(this, Hh).exec(e);
    if (!t)
      return null;
    const s = parseInt(t[1], 10);
    let i = parseInt(t[2], 10);
    i = i >= 1 && i <= 12 ? i - 1 : 0;
    let r = parseInt(t[3], 10);
    r = r >= 1 && r <= 31 ? r : 1;
    let a = parseInt(t[4], 10);
    a = a >= 0 && a <= 23 ? a : 0;
    let o = parseInt(t[5], 10);
    o = o >= 0 && o <= 59 ? o : 0;
    let l = parseInt(t[6], 10);
    l = l >= 0 && l <= 59 ? l : 0;
    const h = t[7] || "Z";
    let d = parseInt(t[8], 10);
    d = d >= 0 && d <= 23 ? d : 0;
    let u = parseInt(t[9], 10) || 0;
    return u = u >= 0 && u <= 59 ? u : 0, h === "-" ? (a += d, o += u) : h === "+" && (a -= d, o -= u), new Date(Date.UTC(s, i, r, a, o, l));
  }
}
Hh = new WeakMap(), y(Iu, Hh);
function zy(c, {
  scale: e = 1,
  rotation: t = 0
}) {
  const {
    width: s,
    height: i
  } = c.attributes.style, r = [0, 0, parseInt(s), parseInt(i)];
  return new Rd({
    viewBox: r,
    userUnit: 1,
    scale: e,
    rotation: t
  });
}
function Dd(c) {
  if (c.startsWith("#")) {
    const e = parseInt(c.slice(1), 16);
    return [(e & 16711680) >> 16, (e & 65280) >> 8, e & 255];
  }
  return c.startsWith("rgb(") ? c.slice(4, -1).split(",").map((e) => parseInt(e)) : c.startsWith("rgba(") ? c.slice(5, -1).split(",", 3).map((e) => parseInt(e)) : (Z(`Not a valid color format: "${c}"`), [0, 0, 0]);
}
function Xy(c) {
  const e = document.createElement("span");
  e.style.visibility = "hidden", e.style.colorScheme = "only light", document.body.append(e);
  for (const t of c.keys()) {
    e.style.color = t;
    const s = window.getComputedStyle(e).color;
    c.set(t, Dd(s));
  }
  e.remove();
}
function jt(c) {
  const {
    a: e,
    b: t,
    c: s,
    d: i,
    e: r,
    f: a
  } = c.getTransform();
  return [e, t, s, i, r, a];
}
function ui(c) {
  const {
    a: e,
    b: t,
    c: s,
    d: i,
    e: r,
    f: a
  } = c.getTransform().invertSelf();
  return [e, t, s, i, r, a];
}
function ao(c, e, t = !1, s = !0) {
  if (e instanceof Rd) {
    const {
      pageWidth: i,
      pageHeight: r
    } = e.rawDims, {
      style: a
    } = c, o = de.isCSSRoundSupported, l = `var(--total-scale-factor) * ${i}px`, h = `var(--total-scale-factor) * ${r}px`, d = o ? `round(down, ${l}, var(--scale-round-x))` : `calc(${l})`, u = o ? `round(down, ${h}, var(--scale-round-y))` : `calc(${h})`;
    !t || e.rotation % 180 === 0 ? (a.width = d, a.height = u) : (a.width = u, a.height = d);
  }
  s && c.setAttribute("data-main-rotation", e.rotation);
}
class Ui {
  constructor() {
    const {
      pixelRatio: e
    } = Ui;
    this.sx = e, this.sy = e;
  }
  get scaled() {
    return this.sx !== 1 || this.sy !== 1;
  }
  get symmetric() {
    return this.sx === this.sy;
  }
  limitCanvas(e, t, s, i, r = -1) {
    let a = 1 / 0, o = 1 / 0, l = 1 / 0;
    s = Ui.capPixels(s, r), s > 0 && (a = Math.sqrt(s / (e * t))), i !== -1 && (o = i / e, l = i / t);
    const h = Math.min(a, o, l);
    return this.sx > h || this.sy > h ? (this.sx = h, this.sy = h, !0) : !1;
  }
  static get pixelRatio() {
    return globalThis.devicePixelRatio || 1;
  }
  static capPixels(e, t) {
    if (t >= 0) {
      const s = Math.ceil(window.screen.availWidth * window.screen.availHeight * this.pixelRatio ** 2 * (1 + t / 100));
      return e > 0 ? Math.min(e, s) : s;
    }
    return e;
  }
}
const Ff = ["image/apng", "image/avif", "image/bmp", "image/gif", "image/jpeg", "image/png", "image/svg+xml", "image/webp", "image/x-icon"];
class Yy {
  static get isDarkMode() {
    return nt(this, "isDarkMode", !!window?.matchMedia?.("(prefers-color-scheme: dark)").matches);
  }
}
class Ky {
  static get commentForegroundColor() {
    const e = document.createElement("span");
    e.classList.add("comment", "sidebar");
    const {
      style: t
    } = e;
    t.width = t.height = "0", t.display = "none", t.color = "var(--comment-fg-color)", document.body.append(e);
    const {
      color: s
    } = window.getComputedStyle(e);
    return e.remove(), nt(this, "commentForegroundColor", Dd(s));
  }
}
function Jy(c, e) {
  e = Ae(e ?? 1, 0, 1);
  const t = 255 * (1 - e);
  return c.map((s) => Math.round(s * e + t));
}
function Mg(c, e) {
  const t = c[0] / 255, s = c[1] / 255, i = c[2] / 255, r = Math.max(t, s, i), a = Math.min(t, s, i), o = (r + a) / 2;
  if (r === a)
    e[0] = e[1] = 0;
  else {
    const l = r - a;
    switch (e[1] = o < 0.5 ? l / (r + a) : l / (2 - r - a), r) {
      case t:
        e[0] = ((s - i) / l + (s < i ? 6 : 0)) * 60;
        break;
      case s:
        e[0] = ((i - t) / l + 2) * 60;
        break;
      case i:
        e[0] = ((t - s) / l + 4) * 60;
        break;
    }
  }
  e[2] = o;
}
function kf(c, e) {
  const t = c[0], s = c[1], i = c[2], r = (1 - Math.abs(2 * i - 1)) * s, a = r * (1 - Math.abs(t / 60 % 2 - 1)), o = i - r / 2;
  switch (Math.floor(t / 60)) {
    case 0:
      e[0] = r + o, e[1] = a + o, e[2] = o;
      break;
    case 1:
      e[0] = a + o, e[1] = r + o, e[2] = o;
      break;
    case 2:
      e[0] = o, e[1] = r + o, e[2] = a + o;
      break;
    case 3:
      e[0] = o, e[1] = a + o, e[2] = r + o;
      break;
    case 4:
      e[0] = a + o, e[1] = o, e[2] = r + o;
      break;
    case 5:
    case 6:
      e[0] = r + o, e[1] = o, e[2] = a + o;
      break;
  }
}
function Og(c) {
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}
function Lg(c, e, t) {
  kf(c, t), t.map(Og);
  const s = 0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2];
  kf(e, t), t.map(Og);
  const i = 0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2];
  return s > i ? (s + 0.05) / (i + 0.05) : (i + 0.05) / (s + 0.05);
}
const Fg = /* @__PURE__ */ new Map();
function Qy(c, e) {
  const t = c[0] + c[1] * 256 + c[2] * 65536 + e[0] * 16777216 + e[1] * 4294967296 + e[2] * 1099511627776;
  let s = Fg.get(t);
  if (s)
    return s;
  const i = new Float32Array(9), r = i.subarray(0, 3), a = i.subarray(3, 6);
  Mg(c, a);
  const o = i.subarray(6, 9);
  Mg(e, o);
  const l = o[2] < 0.5, h = l ? 12 : 4.5;
  if (a[2] = l ? Math.sqrt(a[2]) : 1 - Math.sqrt(1 - a[2]), Lg(a, o, r) < h) {
    let d, u;
    l ? (d = a[2], u = 1) : (d = 0, u = a[2]);
    const f = 5e-3;
    for (; u - d > f; ) {
      const p = a[2] = (d + u) / 2;
      l === Lg(a, o, r) < h ? d = p : u = p;
    }
    a[2] = l ? u : d;
  }
  return kf(a, r), s = j.makeHexColor(Math.round(r[0] * 255), Math.round(r[1] * 255), Math.round(r[2] * 255)), Fg.set(t, s), s;
}
function hm({
  html: c,
  dir: e,
  className: t
}, s) {
  const i = document.createDocumentFragment();
  if (typeof c == "string") {
    const r = document.createElement("p");
    r.dir = e || "auto";
    const a = c.split(/(?:\r\n?|\n)/);
    for (let o = 0, l = a.length; o < l; ++o) {
      const h = a[o];
      r.append(document.createTextNode(h)), o < l - 1 && r.append(document.createElement("br"));
    }
    i.append(r);
  } else
    lm.render({
      xfaHtml: c,
      div: i,
      intent: "richText"
    });
  i.firstElementChild.classList.add("richText", t), s.append(i);
}
function cm(c) {
  const e = new Path2D();
  if (!c)
    return e;
  for (let t = 0, s = c.length; t < s; )
    switch (c[t++]) {
      case rh.moveTo:
        e.moveTo(c[t++], c[t++]);
        break;
      case rh.lineTo:
        e.lineTo(c[t++], c[t++]);
        break;
      case rh.curveTo:
        e.bezierCurveTo(c[t++], c[t++], c[t++], c[t++], c[t++], c[t++]);
        break;
      case rh.quadraticCurveTo:
        e.quadraticCurveTo(c[t++], c[t++], c[t++], c[t++]);
        break;
      case rh.closePath:
        e.closePath();
        break;
      default:
        Z(`Unrecognized drawing path operator: ${c[t - 1]}`);
        break;
    }
  return e;
}
q(4972);
q(4628);
q(7642);
q(8004);
q(3853);
q(5876);
q(2475);
q(5024);
q(1698);
q(8454);
q(9452);
q(4979);
q(3579);
q(3110);
q(9314);
q(1148);
q(9112);
var Bn, Un, Ds, Ms, $h, Hn, Po, Ro, jh, Bu, dm, De, um, fm, po, hh;
const Vi = class Vi {
  constructor(e) {
    y(this, De);
    y(this, Bn, null);
    y(this, Un, null);
    y(this, Ds);
    y(this, Ms, null);
    y(this, $h, null);
    y(this, Hn, null);
    y(this, Po, null);
    y(this, Ro, null);
    g(this, Ds, e), n(Vi, jh) || g(Vi, jh, Object.freeze({
      freetext: "pdfjs-editor-remove-freetext-button",
      highlight: "pdfjs-editor-remove-highlight-button",
      ink: "pdfjs-editor-remove-ink-button",
      stamp: "pdfjs-editor-remove-stamp-button",
      signature: "pdfjs-editor-remove-signature-button"
    }));
  }
  render() {
    const e = g(this, Bn, document.createElement("div"));
    e.classList.add("editToolbar", "hidden"), e.setAttribute("role", "toolbar");
    const t = n(this, Ds)._uiManager._signal;
    t instanceof AbortSignal && !t.aborted && (e.addEventListener("contextmenu", Vs, {
      signal: t
    }), e.addEventListener("pointerdown", w(Vi, Bu, dm), {
      signal: t
    }));
    const s = g(this, Ms, document.createElement("div"));
    s.className = "buttons", e.append(s);
    const i = n(this, Ds).toolbarPosition;
    if (i) {
      const {
        style: r
      } = e, a = n(this, Ds)._uiManager.direction === "ltr" ? 1 - i[0] : i[0];
      r.insetInlineEnd = `${100 * a}%`, r.top = `calc(${100 * i[1]}% + var(--editor-toolbar-vert-offset))`;
    }
    return e;
  }
  get div() {
    return n(this, Bn);
  }
  hide() {
    n(this, Bn).classList.add("hidden"), n(this, Un)?.hideDropdown();
  }
  show() {
    n(this, Bn).classList.remove("hidden"), n(this, $h)?.shown(), n(this, Hn)?.shown();
  }
  addDeleteButton() {
    const {
      editorType: e,
      _uiManager: t
    } = n(this, Ds), s = document.createElement("button");
    s.classList.add("basic", "deleteButton"), s.tabIndex = 0, s.setAttribute("data-l10n-id", n(Vi, jh)[e]), w(this, De, po).call(this, s) && s.addEventListener("click", (i) => {
      t.delete();
    }, {
      signal: t._signal
    }), n(this, Ms).append(s);
  }
  async addAltText(e) {
    const t = await e.render();
    w(this, De, po).call(this, t), n(this, Ms).append(t, n(this, De, hh)), g(this, $h, e);
  }
  addComment(e, t = null) {
    if (n(this, Hn))
      return;
    const s = e.renderForToolbar();
    if (!s)
      return;
    w(this, De, po).call(this, s);
    const i = g(this, Po, n(this, De, hh));
    t ? (n(this, Ms).insertBefore(s, t), n(this, Ms).insertBefore(i, t)) : n(this, Ms).append(s, i), g(this, Hn, e), e.toolbar = this;
  }
  addColorPicker(e) {
    if (n(this, Un))
      return;
    g(this, Un, e);
    const t = e.renderButton();
    w(this, De, po).call(this, t), n(this, Ms).append(t, n(this, De, hh));
  }
  async addEditSignatureButton(e) {
    const t = g(this, Ro, await e.renderEditButton(n(this, Ds)));
    w(this, De, po).call(this, t), n(this, Ms).append(t, n(this, De, hh));
  }
  removeButton(e) {
    e === "comment" && (n(this, Hn)?.removeToolbarCommentButton(), g(this, Hn, null), n(this, Po)?.remove(), g(this, Po, null));
  }
  async addButton(e, t) {
    switch (e) {
      case "colorPicker":
        t && this.addColorPicker(t);
        break;
      case "altText":
        t && await this.addAltText(t);
        break;
      case "editSignature":
        t && await this.addEditSignatureButton(t);
        break;
      case "delete":
        this.addDeleteButton();
        break;
      case "comment":
        t && this.addComment(t);
        break;
    }
  }
  async addButtonBefore(e, t, s) {
    if (!t && e === "comment")
      return;
    const i = n(this, Ms).querySelector(s);
    i && e === "comment" && this.addComment(t, i);
  }
  updateEditSignatureButton(e) {
    n(this, Ro) && (n(this, Ro).title = e);
  }
  remove() {
    n(this, Bn).remove(), n(this, Un)?.destroy(), g(this, Un, null);
  }
};
Bn = new WeakMap(), Un = new WeakMap(), Ds = new WeakMap(), Ms = new WeakMap(), $h = new WeakMap(), Hn = new WeakMap(), Po = new WeakMap(), Ro = new WeakMap(), jh = new WeakMap(), Bu = new WeakSet(), dm = function(e) {
  e.stopPropagation();
}, De = new WeakSet(), um = function(e) {
  n(this, Ds)._focusEventsAllowed = !1, Kt(e);
}, fm = function(e) {
  n(this, Ds)._focusEventsAllowed = !0, Kt(e);
}, po = function(e) {
  const t = n(this, Ds)._uiManager._signal;
  return !(t instanceof AbortSignal) || t.aborted ? !1 : (e.addEventListener("focusin", w(this, De, um).bind(this), {
    capture: !0,
    signal: t
  }), e.addEventListener("focusout", w(this, De, fm).bind(this), {
    capture: !0,
    signal: t
  }), e.addEventListener("contextmenu", Vs, {
    signal: t
  }), !0);
}, hh = function() {
  const e = document.createElement("div");
  return e.className = "divider", e;
}, y(Vi, Bu), y(Vi, jh, null);
let Nf = Vi;
var Gh, jr, Xi, On, pm, gm, Bf;
class Zy {
  constructor(e) {
    y(this, On);
    y(this, Gh, null);
    y(this, jr, null);
    y(this, Xi);
    g(this, Xi, e);
  }
  show(e, t, s) {
    const [i, r] = w(this, On, gm).call(this, t, s), {
      style: a
    } = n(this, jr) || g(this, jr, w(this, On, pm).call(this));
    e.append(n(this, jr)), a.insetInlineEnd = `${100 * i}%`, a.top = `calc(${100 * r}% + var(--editor-toolbar-vert-offset))`;
  }
  hide() {
    n(this, jr).remove();
  }
}
Gh = new WeakMap(), jr = new WeakMap(), Xi = new WeakMap(), On = new WeakSet(), pm = function() {
  const e = g(this, jr, document.createElement("div"));
  e.className = "editToolbar", e.setAttribute("role", "toolbar");
  const t = n(this, Xi)._signal;
  t instanceof AbortSignal && !t.aborted && e.addEventListener("contextmenu", Vs, {
    signal: t
  });
  const s = g(this, Gh, document.createElement("div"));
  return s.className = "buttons", e.append(s), n(this, Xi).hasCommentManager() && w(this, On, Bf).call(this, "commentButton", "pdfjs-comment-floating-button", "pdfjs-comment-floating-button-label", () => {
    n(this, Xi).commentSelection("floating_button");
  }), w(this, On, Bf).call(this, "highlightButton", "pdfjs-highlight-floating-button1", "pdfjs-highlight-floating-button-label", () => {
    n(this, Xi).highlightSelection("floating_button");
  }), e;
}, gm = function(e, t) {
  let s = 0, i = 0;
  for (const r of e) {
    const a = r.y + r.height;
    if (a < s)
      continue;
    const o = r.x + (t ? r.width : 0);
    if (a > s) {
      i = o, s = a;
      continue;
    }
    t ? o > i && (i = o) : o < i && (i = o);
  }
  return [t ? 1 - i : i, s];
}, Bf = function(e, t, s, i) {
  const r = document.createElement("button");
  r.classList.add("basic", e), r.tabIndex = 0, r.setAttribute("data-l10n-id", t);
  const a = document.createElement("span");
  r.append(a), a.className = "visuallyHidden", a.setAttribute("data-l10n-id", s);
  const o = n(this, Xi)._signal;
  o instanceof AbortSignal && !o.aborted && (r.addEventListener("contextmenu", Vs, {
    signal: o
  }), r.addEventListener("click", i, {
    signal: o
  })), n(this, Gh).append(r);
};
function mm(c, e, t) {
  for (const s of t)
    e.addEventListener(s, c[s].bind(c));
}
var Gr, _r, Do, Wr;
const xt = class xt {
  static initializeAndAddPointerId(e) {
    (n(xt, _r) || g(xt, _r, /* @__PURE__ */ new Set())).add(e);
  }
  static setPointer(e, t) {
    n(xt, Gr) || g(xt, Gr, t), n(xt, Wr) ?? g(xt, Wr, e);
  }
  static setTimeStamp(e) {
    g(xt, Do, e);
  }
  static isSamePointerId(e) {
    return n(xt, Gr) === e;
  }
  static isSamePointerIdOrRemove(e) {
    return n(xt, Gr) === e ? !0 : (n(xt, _r)?.delete(e), !1);
  }
  static isSamePointerType(e) {
    return n(xt, Wr) === e;
  }
  static isInitializedAndDifferentPointerType(e) {
    return n(xt, Wr) !== null && !xt.isSamePointerType(e);
  }
  static isSameTimeStamp(e) {
    return n(xt, Do) === e;
  }
  static isUsingMultiplePointers() {
    return n(xt, _r)?.size >= 1;
  }
  static clearPointerType() {
    g(xt, Wr, null);
  }
  static clearPointerIds() {
    g(xt, Gr, NaN), g(xt, _r, null);
  }
  static clearTimeStamp() {
    g(xt, Do, NaN);
  }
};
Gr = new WeakMap(), _r = new WeakMap(), Do = new WeakMap(), Wr = new WeakMap(), y(xt, Gr, NaN), y(xt, _r, null), y(xt, Do, NaN), y(xt, Wr, null);
let Le = xt;
var Uu;
class qy {
  constructor() {
    y(this, Uu, 0);
  }
  get id() {
    return `${Fh}${ee(this, Uu)._++}`;
  }
}
Uu = new WeakMap();
var Mo, _h, Fe, Oo, Wd;
const bg = class bg {
  constructor() {
    y(this, Oo);
    y(this, Mo, om());
    y(this, _h, 0);
    y(this, Fe, null);
  }
  static get _isSVGFittingCanvas() {
    const e = 'data:image/svg+xml;charset=UTF-8,<svg viewBox="0 0 1 1" width="1" height="1" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="1" style="fill:red;"/></svg>', s = new OffscreenCanvas(1, 3).getContext("2d", {
      willReadFrequently: !0
    }), i = new Image();
    i.src = e;
    const r = i.decode().then(() => (s.drawImage(i, 0, 0, 1, 1, 0, 0, 1, 3), new Uint32Array(s.getImageData(0, 0, 1, 1).data.buffer)[0] === 0));
    return nt(this, "_isSVGFittingCanvas", r);
  }
  async getFromFile(e) {
    const {
      lastModified: t,
      name: s,
      size: i,
      type: r
    } = e;
    return w(this, Oo, Wd).call(this, `${t}_${s}_${i}_${r}`, e);
  }
  async getFromUrl(e) {
    return w(this, Oo, Wd).call(this, e, e);
  }
  async getFromBlob(e, t) {
    const s = await t;
    return w(this, Oo, Wd).call(this, e, s);
  }
  async getFromId(e) {
    n(this, Fe) || g(this, Fe, /* @__PURE__ */ new Map());
    const t = n(this, Fe).get(e);
    if (!t)
      return null;
    if (t.bitmap)
      return t.refCounter += 1, t;
    if (t.file)
      return this.getFromFile(t.file);
    if (t.blobPromise) {
      const {
        blobPromise: s
      } = t;
      return delete t.blobPromise, this.getFromBlob(t.id, s);
    }
    return this.getFromUrl(t.url);
  }
  getFromCanvas(e, t) {
    n(this, Fe) || g(this, Fe, /* @__PURE__ */ new Map());
    let s = n(this, Fe).get(e);
    if (s?.bitmap)
      return s.refCounter += 1, s;
    const i = new OffscreenCanvas(t.width, t.height);
    return i.getContext("2d").drawImage(t, 0, 0), s = {
      bitmap: i.transferToImageBitmap(),
      id: `image_${n(this, Mo)}_${ee(this, _h)._++}`,
      refCounter: 1,
      isSvg: !1
    }, n(this, Fe).set(e, s), n(this, Fe).set(s.id, s), s;
  }
  getSvgUrl(e) {
    const t = n(this, Fe).get(e);
    return t?.isSvg ? t.svgUrl : null;
  }
  deleteId(e) {
    n(this, Fe) || g(this, Fe, /* @__PURE__ */ new Map());
    const t = n(this, Fe).get(e);
    if (!t || (t.refCounter -= 1, t.refCounter !== 0))
      return;
    const {
      bitmap: s
    } = t;
    if (!t.url && !t.file) {
      const i = new OffscreenCanvas(s.width, s.height);
      i.getContext("bitmaprenderer").transferFromImageBitmap(s), t.blobPromise = i.convertToBlob();
    }
    s.close?.(), t.bitmap = null;
  }
  isValidId(e) {
    return e.startsWith(`image_${n(this, Mo)}_`);
  }
};
Mo = new WeakMap(), _h = new WeakMap(), Fe = new WeakMap(), Oo = new WeakSet(), Wd = async function(e, t) {
  n(this, Fe) || g(this, Fe, /* @__PURE__ */ new Map());
  let s = n(this, Fe).get(e);
  if (s === null)
    return null;
  if (s?.bitmap)
    return s.refCounter += 1, s;
  try {
    s || (s = {
      bitmap: null,
      id: `image_${n(this, Mo)}_${ee(this, _h)._++}`,
      refCounter: 0,
      isSvg: !1
    });
    let i;
    if (typeof t == "string" ? (s.url = t, i = await lg(t, "blob")) : t instanceof File ? i = s.file = t : t instanceof Blob && (i = t), i.type === "image/svg+xml") {
      const r = bg._isSVGFittingCanvas, a = new FileReader(), o = new Image(), l = new Promise((h, d) => {
        o.onload = () => {
          s.bitmap = o, s.isSvg = !0, h();
        }, a.onload = async () => {
          const u = s.svgUrl = a.result;
          o.src = await r ? `${u}#svgView(preserveAspectRatio(none))` : u;
        }, o.onerror = a.onerror = d;
      });
      a.readAsDataURL(i), await l;
    } else
      s.bitmap = await createImageBitmap(i);
    s.refCounter = 1;
  } catch (i) {
    Z(i), s = null;
  }
  return n(this, Fe).set(e, s), s && n(this, Fe).set(s.id, s), s;
};
let Uf = bg;
var Jt, $n, Wh, Ht;
class tb {
  constructor(e = 128) {
    y(this, Jt, []);
    y(this, $n, !1);
    y(this, Wh);
    y(this, Ht, -1);
    g(this, Wh, e);
  }
  add({
    cmd: e,
    undo: t,
    post: s,
    mustExec: i,
    type: r = NaN,
    overwriteIfSameType: a = !1,
    keepUndo: o = !1
  }) {
    if (i && e(), n(this, $n))
      return;
    const l = {
      cmd: e,
      undo: t,
      post: s,
      type: r
    };
    if (n(this, Ht) === -1) {
      n(this, Jt).length > 0 && (n(this, Jt).length = 0), g(this, Ht, 0), n(this, Jt).push(l);
      return;
    }
    if (a && n(this, Jt)[n(this, Ht)].type === r) {
      o && (l.undo = n(this, Jt)[n(this, Ht)].undo), n(this, Jt)[n(this, Ht)] = l;
      return;
    }
    const h = n(this, Ht) + 1;
    h === n(this, Wh) ? n(this, Jt).splice(0, 1) : (g(this, Ht, h), h < n(this, Jt).length && n(this, Jt).splice(h)), n(this, Jt).push(l);
  }
  undo() {
    if (n(this, Ht) === -1)
      return;
    g(this, $n, !0);
    const {
      undo: e,
      post: t
    } = n(this, Jt)[n(this, Ht)];
    e(), t?.(), g(this, $n, !1), g(this, Ht, n(this, Ht) - 1);
  }
  redo() {
    if (n(this, Ht) < n(this, Jt).length - 1) {
      g(this, Ht, n(this, Ht) + 1), g(this, $n, !0);
      const {
        cmd: e,
        post: t
      } = n(this, Jt)[n(this, Ht)];
      e(), t?.(), g(this, $n, !1);
    }
  }
  hasSomethingToUndo() {
    return n(this, Ht) !== -1;
  }
  hasSomethingToRedo() {
    return n(this, Ht) < n(this, Jt).length - 1;
  }
  cleanType(e) {
    if (n(this, Ht) !== -1) {
      for (let t = n(this, Ht); t >= 0; t--)
        if (n(this, Jt)[t].type !== e) {
          n(this, Jt).splice(t + 1, n(this, Ht) - t), g(this, Ht, t);
          return;
        }
      n(this, Jt).length = 0, g(this, Ht, -1);
    }
  }
  destroy() {
    g(this, Jt, null);
  }
}
Jt = new WeakMap(), $n = new WeakMap(), Wh = new WeakMap(), Ht = new WeakMap();
var Hu, vm;
class Md {
  constructor(e) {
    y(this, Hu);
    this.buffer = [], this.callbacks = /* @__PURE__ */ new Map(), this.allKeys = /* @__PURE__ */ new Set();
    const {
      isMac: t
    } = de.platform;
    for (const [s, i, r = {}] of e)
      for (const a of s) {
        const o = a.startsWith("mac+");
        t && o ? (this.callbacks.set(a.slice(4), {
          callback: i,
          options: r
        }), this.allKeys.add(a.split("+").at(-1))) : !t && !o && (this.callbacks.set(a, {
          callback: i,
          options: r
        }), this.allKeys.add(a.split("+").at(-1)));
      }
  }
  exec(e, t) {
    if (!this.allKeys.has(t.key))
      return;
    const s = this.callbacks.get(w(this, Hu, vm).call(this, t));
    if (!s)
      return;
    const {
      callback: i,
      options: {
        bubbles: r = !1,
        args: a = [],
        checker: o = null
      }
    } = s;
    o && !o(e, t) || (i.bind(e, ...a, t)(), r || Kt(t));
  }
}
Hu = new WeakSet(), vm = function(e) {
  e.altKey && this.buffer.push("alt"), e.ctrlKey && this.buffer.push("ctrl"), e.metaKey && this.buffer.push("meta"), e.shiftKey && this.buffer.push("shift"), this.buffer.push(e.key);
  const t = this.buffer.join("+");
  return this.buffer.length = 0, t;
};
const $u = class $u {
  get _colors() {
    const e = /* @__PURE__ */ new Map([["CanvasText", null], ["Canvas", null]]);
    return Xy(e), nt(this, "_colors", e);
  }
  convert(e) {
    const t = Dd(e);
    if (!window.matchMedia("(forced-colors: active)").matches)
      return t;
    for (const [s, i] of this._colors)
      if (i.every((r, a) => r === t[a]))
        return $u._colorsMapping.get(s);
    return t;
  }
  getHexCode(e) {
    const t = this._colors.get(e);
    return t ? j.makeHexColor(...t) : e;
  }
};
R($u, "_colorsMapping", /* @__PURE__ */ new Map([["CanvasText", [0, 0, 0]], ["Canvas", [255, 255, 255]]]));
let Hf = $u;
var Lo, as, Fo, Vt, $t, ko, No, Ge, Bo, Os, ue, jn, Gn, _n, Wn, gi, Ls, Vr, Vh, zh, Uo, Xh, mi, Vn, Ho, zn, vi, ju, Yi, $o, Yh, Xn, zr, jo, Yn, Kh, ne, wt, Ki, Kn, Jn, Jh, Go, Qh, Qn, yi, Ji, Zh, qh, Fs, G, Vd, $f, ym, bm, Am, ch, wm, Em, Sm, jf, xm, Tm, Cm, Im, $e, _i, Pm, Rm, Gf, Dm, dh, _f;
const To = class To {
  constructor(e, t, s, i, r, a, o, l, h, d, u, f, p, m, v, A) {
    y(this, G);
    y(this, Lo, new AbortController());
    y(this, as, null);
    y(this, Fo, null);
    y(this, Vt, /* @__PURE__ */ new Map());
    y(this, $t, /* @__PURE__ */ new Map());
    y(this, ko, null);
    y(this, No, null);
    y(this, Ge, null);
    y(this, Bo, null);
    y(this, Os, new tb());
    y(this, ue, null);
    y(this, jn, null);
    y(this, Gn, null);
    y(this, _n, 0);
    y(this, Wn, /* @__PURE__ */ new Set());
    y(this, gi, null);
    y(this, Ls, null);
    y(this, Vr, /* @__PURE__ */ new Set());
    R(this, "_editorUndoBar", null);
    y(this, Vh, !1);
    y(this, zh, !1);
    y(this, Uo, !1);
    y(this, Xh, null);
    y(this, mi, null);
    y(this, Vn, null);
    y(this, Ho, null);
    y(this, zn, !1);
    y(this, vi, null);
    y(this, ju, new qy());
    y(this, Yi, !1);
    y(this, $o, !1);
    y(this, Yh, !1);
    y(this, Xn, null);
    y(this, zr, null);
    y(this, jo, null);
    y(this, Yn, null);
    y(this, Kh, null);
    y(this, ne, tt.NONE);
    y(this, wt, /* @__PURE__ */ new Set());
    y(this, Ki, null);
    y(this, Kn, null);
    y(this, Jn, null);
    y(this, Jh, null);
    y(this, Go, null);
    y(this, Qh, {
      isEditing: !1,
      isEmpty: !0,
      hasSomethingToUndo: !1,
      hasSomethingToRedo: !1,
      hasSelectedEditor: !1,
      hasSelectedText: !1
    });
    y(this, Qn, [0, 0]);
    y(this, yi, null);
    y(this, Ji, null);
    y(this, Zh, null);
    y(this, qh, null);
    y(this, Fs, null);
    const b = this._signal = n(this, Lo).signal;
    g(this, Ji, e), g(this, Zh, t), g(this, qh, s), g(this, No, i), g(this, ue, r), g(this, Kn, a), g(this, Go, l), this._eventBus = o, o._on("editingaction", this.onEditingAction.bind(this), {
      signal: b
    }), o._on("pagechanging", this.onPageChanging.bind(this), {
      signal: b
    }), o._on("scalechanging", this.onScaleChanging.bind(this), {
      signal: b
    }), o._on("rotationchanging", this.onRotationChanging.bind(this), {
      signal: b
    }), o._on("setpreference", this.onSetPreference.bind(this), {
      signal: b
    }), o._on("switchannotationeditorparams", (E) => this.updateParams(E.type, E.value), {
      signal: b
    }), window.addEventListener("pointerdown", () => {
      g(this, $o, !0);
    }, {
      capture: !0,
      signal: b
    }), window.addEventListener("pointerup", () => {
      g(this, $o, !1);
    }, {
      capture: !0,
      signal: b
    }), window.addEventListener("beforeunload", w(this, G, ym).bind(this), {
      capture: !0,
      signal: b
    }), w(this, G, wm).call(this), w(this, G, Im).call(this), w(this, G, jf).call(this), g(this, Ge, l.annotationStorage), g(this, Xh, l.filterFactory), g(this, Jn, h), g(this, Ho, d || null), g(this, Vh, u), g(this, zh, f), g(this, Uo, p), g(this, Kh, m || null), this.viewParameters = {
      realScale: Mr.PDF_TO_CSS_UNITS,
      rotation: 0
    }, this.isShiftKeyDown = !1, this._editorUndoBar = v || null, this._supportsPinchToZoom = A !== !1, r?.setSidebarUiManager(this);
  }
  static get _keyboardManager() {
    const e = To.prototype, t = (a) => n(a, Ji).contains(document.activeElement) && document.activeElement.tagName !== "BUTTON" && a.hasSomethingToControl(), s = (a, {
      target: o
    }) => {
      if (o instanceof HTMLInputElement) {
        const {
          type: l
        } = o;
        return l !== "text" && l !== "number";
      }
      return !0;
    }, i = this.TRANSLATE_SMALL, r = this.TRANSLATE_BIG;
    return nt(this, "_keyboardManager", new Md([[["ctrl+a", "mac+meta+a"], e.selectAll, {
      checker: s
    }], [["ctrl+z", "mac+meta+z"], e.undo, {
      checker: s
    }], [["ctrl+y", "ctrl+shift+z", "mac+meta+shift+z", "ctrl+shift+Z", "mac+meta+shift+Z"], e.redo, {
      checker: s
    }], [["Backspace", "alt+Backspace", "ctrl+Backspace", "shift+Backspace", "mac+Backspace", "mac+alt+Backspace", "mac+ctrl+Backspace", "Delete", "ctrl+Delete", "shift+Delete", "mac+Delete"], e.delete, {
      checker: s
    }], [["Enter", "mac+Enter"], e.addNewEditorFromKeyboard, {
      checker: (a, {
        target: o
      }) => !(o instanceof HTMLButtonElement) && n(a, Ji).contains(o) && !a.isEnterHandled
    }], [[" ", "mac+ "], e.addNewEditorFromKeyboard, {
      checker: (a, {
        target: o
      }) => !(o instanceof HTMLButtonElement) && n(a, Ji).contains(document.activeElement)
    }], [["Escape", "mac+Escape"], e.unselectAll], [["ArrowLeft", "mac+ArrowLeft"], e.translateSelectedEditors, {
      args: [-i, 0],
      checker: t
    }], [["ctrl+ArrowLeft", "mac+shift+ArrowLeft"], e.translateSelectedEditors, {
      args: [-r, 0],
      checker: t
    }], [["ArrowRight", "mac+ArrowRight"], e.translateSelectedEditors, {
      args: [i, 0],
      checker: t
    }], [["ctrl+ArrowRight", "mac+shift+ArrowRight"], e.translateSelectedEditors, {
      args: [r, 0],
      checker: t
    }], [["ArrowUp", "mac+ArrowUp"], e.translateSelectedEditors, {
      args: [0, -i],
      checker: t
    }], [["ctrl+ArrowUp", "mac+shift+ArrowUp"], e.translateSelectedEditors, {
      args: [0, -r],
      checker: t
    }], [["ArrowDown", "mac+ArrowDown"], e.translateSelectedEditors, {
      args: [0, i],
      checker: t
    }], [["ctrl+ArrowDown", "mac+shift+ArrowDown"], e.translateSelectedEditors, {
      args: [0, r],
      checker: t
    }]]));
  }
  destroy() {
    n(this, Fs)?.resolve(), g(this, Fs, null), n(this, Lo)?.abort(), g(this, Lo, null), this._signal = null;
    for (const e of n(this, $t).values())
      e.destroy();
    n(this, $t).clear(), n(this, Vt).clear(), n(this, Vr).clear(), n(this, Yn)?.clear(), g(this, as, null), n(this, wt).clear(), n(this, Os).destroy(), n(this, No)?.destroy(), n(this, ue)?.destroy(), n(this, Kn)?.destroy(), n(this, vi)?.hide(), g(this, vi, null), n(this, jo)?.destroy(), g(this, jo, null), g(this, Fo, null), n(this, mi) && (clearTimeout(n(this, mi)), g(this, mi, null)), n(this, yi) && (clearTimeout(n(this, yi)), g(this, yi, null)), this._editorUndoBar?.destroy(), g(this, Go, null);
  }
  combinedSignal(e) {
    return AbortSignal.any([this._signal, e.signal]);
  }
  get mlManager() {
    return n(this, Kh);
  }
  get useNewAltTextFlow() {
    return n(this, zh);
  }
  get useNewAltTextWhenAddingImage() {
    return n(this, Uo);
  }
  get hcmFilter() {
    return nt(this, "hcmFilter", n(this, Jn) ? n(this, Xh).addHCMFilter(n(this, Jn).foreground, n(this, Jn).background) : "none");
  }
  get direction() {
    return nt(this, "direction", getComputedStyle(n(this, Ji)).direction);
  }
  get _highlightColors() {
    return nt(this, "_highlightColors", n(this, Ho) ? new Map(n(this, Ho).split(",").map((e) => (e = e.split("=").map((t) => t.trim()), e[1] = e[1].toUpperCase(), e))) : null);
  }
  get highlightColors() {
    const {
      _highlightColors: e
    } = this;
    if (!e)
      return nt(this, "highlightColors", null);
    const t = /* @__PURE__ */ new Map(), s = !!n(this, Jn);
    for (const [i, r] of e) {
      const a = i.endsWith("_HCM");
      if (s && a) {
        t.set(i.replace("_HCM", ""), r);
        continue;
      }
      !s && !a && t.set(i, r);
    }
    return nt(this, "highlightColors", t);
  }
  get highlightColorNames() {
    return nt(this, "highlightColorNames", this.highlightColors ? new Map(Array.from(this.highlightColors, (e) => e.reverse())) : null);
  }
  getNonHCMColor(e) {
    if (!this._highlightColors)
      return e;
    const t = this.highlightColorNames.get(e);
    return this._highlightColors.get(t) || e;
  }
  getNonHCMColorName(e) {
    return this.highlightColorNames.get(e) || e;
  }
  setCurrentDrawingSession(e) {
    e ? (this.unselectAll(), this.disableUserSelect(!0)) : this.disableUserSelect(!1), g(this, Gn, e);
  }
  setMainHighlightColorPicker(e) {
    g(this, jo, e);
  }
  editAltText(e, t = !1) {
    n(this, No)?.editAltText(this, e, t);
  }
  hasCommentManager() {
    return !!n(this, ue);
  }
  editComment(e, t, s, i) {
    n(this, ue)?.showDialog(this, e, t, s, i);
  }
  selectComment(e, t) {
    n(this, $t).get(e)?.getEditorByUID(t)?.toggleComment(!0, !0);
  }
  updateComment(e) {
    n(this, ue)?.updateComment(e.getData());
  }
  updatePopupColor(e) {
    n(this, ue)?.updatePopupColor(e);
  }
  removeComment(e) {
    n(this, ue)?.removeComments([e.uid]);
  }
  deleteComment(e, t) {
    const s = () => {
      e.comment = t;
    }, i = () => {
      this._editorUndoBar?.show(s, "comment"), this.toggleComment(null), e.comment = null;
    };
    this.addCommands({
      cmd: i,
      undo: s,
      mustExec: !0
    });
  }
  toggleComment(e, t, s = void 0) {
    n(this, ue)?.toggleCommentPopup(e, t, s);
  }
  makeCommentColor(e, t) {
    return e && n(this, ue)?.makeCommentColor(e, t) || null;
  }
  getCommentDialogElement() {
    return n(this, ue)?.dialogElement || null;
  }
  async waitForEditorsRendered(e) {
    if (n(this, $t).has(e - 1))
      return;
    const {
      resolve: t,
      promise: s
    } = Promise.withResolvers(), i = (r) => {
      r.pageNumber === e && (this._eventBus._off("editorsrendered", i), t());
    };
    this._eventBus.on("editorsrendered", i), await s;
  }
  getSignature(e) {
    n(this, Kn)?.getSignature({
      uiManager: this,
      editor: e
    });
  }
  get signatureManager() {
    return n(this, Kn);
  }
  switchToMode(e, t) {
    this._eventBus.on("annotationeditormodechanged", t, {
      once: !0,
      signal: this._signal
    }), this._eventBus.dispatch("showannotationeditorui", {
      source: this,
      mode: e
    });
  }
  setPreference(e, t) {
    this._eventBus.dispatch("setpreference", {
      source: this,
      name: e,
      value: t
    });
  }
  onSetPreference({
    name: e,
    value: t
  }) {
    e === "enableNewAltTextWhenAddingImage" && g(this, Uo, t);
  }
  onPageChanging({
    pageNumber: e
  }) {
    g(this, _n, e - 1);
  }
  deletePage(e) {
    for (const t of this.getEditors(e))
      t.remove();
    n(this, $t).delete(e), n(this, _n) === e && g(this, _n, 0);
  }
  focusMainContainer() {
    n(this, Ji).focus();
  }
  findParent(e, t) {
    for (const s of n(this, $t).values()) {
      const {
        x: i,
        y: r,
        width: a,
        height: o
      } = s.div.getBoundingClientRect();
      if (e >= i && e <= i + a && t >= r && t <= r + o)
        return s;
    }
    return null;
  }
  disableUserSelect(e = !1) {
    n(this, Zh).classList.toggle("noUserSelect", e);
  }
  addShouldRescale(e) {
    n(this, Vr).add(e);
  }
  removeShouldRescale(e) {
    n(this, Vr).delete(e);
  }
  onScaleChanging({
    scale: e
  }) {
    this.commitOrRemove(), this.viewParameters.realScale = e * Mr.PDF_TO_CSS_UNITS;
    for (const t of n(this, Vr))
      t.onScaleChanging();
    n(this, Gn)?.onScaleChanging();
  }
  onRotationChanging({
    pagesRotation: e
  }) {
    this.commitOrRemove(), this.viewParameters.rotation = e;
  }
  highlightSelection(e = "", t = !1) {
    const s = document.getSelection();
    if (!s || s.isCollapsed)
      return;
    const {
      anchorNode: i,
      anchorOffset: r,
      focusNode: a,
      focusOffset: o
    } = s, l = s.toString(), d = w(this, G, Vd).call(this, s).closest(".textLayer"), u = this.getSelectionBoxes(d);
    if (!u)
      return;
    s.empty();
    const f = w(this, G, $f).call(this, d), p = n(this, ne) === tt.NONE, m = () => {
      const v = f?.createAndAddNewEditor({
        x: 0,
        y: 0
      }, !1, {
        methodOfCreation: e,
        boxes: u,
        anchorNode: i,
        anchorOffset: r,
        focusNode: a,
        focusOffset: o,
        text: l
      });
      p && this.showAllEditors("highlight", !0, !0), t && v?.editComment();
    };
    if (p) {
      this.switchToMode(tt.HIGHLIGHT, m);
      return;
    }
    m();
  }
  commentSelection(e = "") {
    this.highlightSelection(e, !0);
  }
  getAndRemoveDataFromAnnotationStorage(e) {
    if (!n(this, Ge))
      return null;
    const t = `${Fh}${e}`, s = n(this, Ge).getRawValue(t);
    return s && n(this, Ge).remove(t), s;
  }
  addToAnnotationStorage(e) {
    !e.isEmpty() && n(this, Ge) && !n(this, Ge).has(e.id) && n(this, Ge).setValue(e.id, e);
  }
  a11yAlert(e, t = null) {
    const s = n(this, qh);
    s && (s.setAttribute("data-l10n-id", e), t ? s.setAttribute("data-l10n-args", JSON.stringify(t)) : s.removeAttribute("data-l10n-args"));
  }
  blur() {
    if (this.isShiftKeyDown = !1, n(this, zn) && (g(this, zn, !1), w(this, G, ch).call(this, "main_toolbar")), !this.hasSelection)
      return;
    const {
      activeElement: e
    } = document;
    for (const t of n(this, wt))
      if (t.div.contains(e)) {
        g(this, zr, [t, e]), t._focusEventsAllowed = !1;
        break;
      }
  }
  focus() {
    if (!n(this, zr))
      return;
    const [e, t] = n(this, zr);
    g(this, zr, null), t.addEventListener("focusin", () => {
      e._focusEventsAllowed = !0;
    }, {
      once: !0,
      signal: this._signal
    }), t.focus();
  }
  addEditListeners() {
    w(this, G, jf).call(this), this.setEditingState(!0);
  }
  removeEditListeners() {
    w(this, G, xm).call(this), this.setEditingState(!1);
  }
  dragOver(e) {
    for (const {
      type: t
    } of e.dataTransfer.items)
      for (const s of n(this, Ls))
        if (s.isHandlingMimeForPasting(t)) {
          e.dataTransfer.dropEffect = "copy", e.preventDefault();
          return;
        }
  }
  drop(e) {
    for (const t of e.dataTransfer.items)
      for (const s of n(this, Ls))
        if (s.isHandlingMimeForPasting(t.type)) {
          s.paste(t, this.currentLayer), e.preventDefault();
          return;
        }
  }
  copy(e) {
    if (e.preventDefault(), n(this, as)?.commitOrRemove(), !this.hasSelection)
      return;
    const t = [];
    for (const s of n(this, wt)) {
      const i = s.serialize(!0);
      i && t.push(i);
    }
    t.length !== 0 && e.clipboardData.setData("application/pdfjs", JSON.stringify(t));
  }
  cut(e) {
    this.copy(e), this.delete();
  }
  async paste(e) {
    e.preventDefault();
    const {
      clipboardData: t
    } = e;
    for (const r of t.items)
      for (const a of n(this, Ls))
        if (a.isHandlingMimeForPasting(r.type)) {
          a.paste(r, this.currentLayer);
          return;
        }
    let s = t.getData("application/pdfjs");
    if (!s)
      return;
    try {
      s = JSON.parse(s);
    } catch (r) {
      Z(`paste: "${r.message}".`);
      return;
    }
    if (!Array.isArray(s))
      return;
    this.unselectAll();
    const i = this.currentLayer;
    try {
      const r = [];
      for (const l of s) {
        const h = await i.deserialize(l);
        if (!h)
          return;
        r.push(h);
      }
      const a = () => {
        for (const l of r)
          w(this, G, Gf).call(this, l);
        w(this, G, _f).call(this, r);
      }, o = () => {
        for (const l of r)
          l.remove();
      };
      this.addCommands({
        cmd: a,
        undo: o,
        mustExec: !0
      });
    } catch (r) {
      Z(`paste: "${r.message}".`);
    }
  }
  keydown(e) {
    !this.isShiftKeyDown && e.key === "Shift" && (this.isShiftKeyDown = !0), n(this, ne) !== tt.NONE && !this.isEditorHandlingKeyboard && To._keyboardManager.exec(this, e);
  }
  keyup(e) {
    this.isShiftKeyDown && e.key === "Shift" && (this.isShiftKeyDown = !1, n(this, zn) && (g(this, zn, !1), w(this, G, ch).call(this, "main_toolbar")));
  }
  onEditingAction({
    name: e
  }) {
    switch (e) {
      case "undo":
      case "redo":
      case "delete":
      case "selectAll":
        this[e]();
        break;
      case "highlightSelection":
        this.highlightSelection("context_menu");
        break;
      case "commentSelection":
        this.commentSelection("context_menu");
        break;
    }
  }
  updatePageIndex(e, t) {
    for (const i of this.getEditors(e))
      i.pageIndex = t;
    const s = n(this, ko).get(e);
    s && (s.pageIndex = t, n(this, $t).set(t, s), n(this, Yi) ? s.enable() : s.disable());
  }
  startUpdatePages() {
    g(this, ko, new Map(n(this, $t))), n(this, $t).clear();
  }
  endUpdatePages() {
    g(this, ko, null);
  }
  clonePage(e, t) {
    for (const s of this.getEditors(e)) {
      const i = s.serialize(s.mode !== tt.HIGHLIGHT);
      i && (i.pageIndex = t, i.id = this.getId(), i.isClone = !0, delete i.popupRef, n(this, Ge).setValue(i.id, i));
    }
  }
  findClonesForPage(e) {
    const t = [], {
      pageIndex: s
    } = e;
    for (const [i, r] of n(this, Ge))
      r.pageIndex === s && r.isClone && (n(this, Ge).remove(i), t.push(e.deserialize(r).then((a) => {
        a && (a.isClone = !0, e.addOrRebuild(a));
      })));
    return Promise.all(t);
  }
  setEditingState(e) {
    e ? (w(this, G, Em).call(this), w(this, G, Tm).call(this), w(this, G, $e).call(this, {
      isEditing: n(this, ne) !== tt.NONE,
      isEmpty: w(this, G, dh).call(this),
      hasSomethingToUndo: n(this, Os).hasSomethingToUndo(),
      hasSomethingToRedo: n(this, Os).hasSomethingToRedo(),
      hasSelectedEditor: !1
    })) : (w(this, G, Sm).call(this), w(this, G, Cm).call(this), w(this, G, $e).call(this, {
      isEditing: !1
    }), this.disableUserSelect(!1));
  }
  registerEditorTypes(e) {
    if (!n(this, Ls)) {
      g(this, Ls, e);
      for (const t of n(this, Ls))
        w(this, G, _i).call(this, t.defaultPropertiesToUpdate);
    }
  }
  getId() {
    return n(this, ju).id;
  }
  get currentLayer() {
    return n(this, $t).get(n(this, _n));
  }
  getLayer(e) {
    return n(this, $t).get(e);
  }
  get currentPageIndex() {
    return n(this, _n);
  }
  addLayer(e) {
    n(this, $t).set(e.pageIndex, e), n(this, Yi) ? e.enable() : e.disable();
  }
  removeLayer(e) {
    n(this, $t).delete(e.pageIndex);
  }
  async updateMode(e, t = null, s = !1, i = !1, r = !1, a = !1) {
    if (n(this, ne) !== e && !(n(this, Fs) && (await n(this, Fs).promise, !n(this, Fs)))) {
      if (g(this, Fs, Promise.withResolvers()), n(this, Gn)?.commitOrRemove(), n(this, ne) === tt.POPUP && n(this, ue)?.hideSidebar(), n(this, ue)?.destroyPopup(), g(this, ne, e), e === tt.NONE) {
        this.setEditingState(!1), w(this, G, Rm).call(this);
        for (const o of n(this, Vt).values())
          o.hideStandaloneCommentButton();
        this._editorUndoBar?.hide(), this.toggleComment(null), n(this, Fs).resolve();
        return;
      }
      for (const o of n(this, Vt).values())
        o.addStandaloneCommentButton();
      e === tt.SIGNATURE && await n(this, Kn)?.loadSignatures(), s && Le.clearPointerType(), this.setEditingState(!0), await w(this, G, Pm).call(this), this.unselectAll();
      for (const o of n(this, $t).values())
        o.updateMode(e);
      if (e === tt.POPUP) {
        n(this, Fo) || g(this, Fo, await n(this, Go).getAnnotationsByType(new Set(n(this, Ls).map((h) => h._editorType))));
        const o = /* @__PURE__ */ new Set(), l = [];
        for (const h of n(this, Vt).values()) {
          const {
            annotationElementId: d,
            hasComment: u,
            deleted: f
          } = h;
          d && o.add(d), u && !f && l.push(h.getData());
        }
        for (const h of n(this, Fo)) {
          const {
            id: d,
            popupRef: u,
            contentsObj: f
          } = h;
          u && f?.str && !o.has(d) && !n(this, Wn).has(d) && l.push(h);
        }
        n(this, ue)?.showSidebar(l);
      }
      if (!t) {
        i && this.addNewEditorFromKeyboard(), n(this, Fs).resolve();
        return;
      }
      for (const o of n(this, Vt).values())
        o.uid === t ? (this.setSelected(o), a ? o.editComment() : r ? o.enterInEditMode() : o.focus()) : o.unselect();
      n(this, Fs).resolve();
    }
  }
  addNewEditorFromKeyboard() {
    this.currentLayer.canCreateNewEmptyEditor() && this.currentLayer.addNewEditor();
  }
  updateToolbar(e) {
    e.mode !== n(this, ne) && this._eventBus.dispatch("switchannotationeditormode", {
      source: this,
      ...e
    });
  }
  updateParams(e, t) {
    if (n(this, Ls)) {
      switch (e) {
        case ut.CREATE:
          this.currentLayer.addNewEditor(t);
          return;
        case ut.HIGHLIGHT_SHOW_ALL:
          this._eventBus.dispatch("reporttelemetry", {
            source: this,
            details: {
              type: "editing",
              data: {
                type: "highlight",
                action: "toggle_visibility"
              }
            }
          }), (n(this, Jh) || g(this, Jh, /* @__PURE__ */ new Map())).set(e, t), this.showAllEditors("highlight", t);
          break;
      }
      if (this.hasSelection)
        for (const s of n(this, wt))
          s.updateParams(e, t);
      else
        for (const s of n(this, Ls))
          s.updateDefaultParams(e, t);
    }
  }
  showAllEditors(e, t, s = !1) {
    for (const r of n(this, Vt).values())
      r.editorType === e && r.show(t);
    (n(this, Jh)?.get(ut.HIGHLIGHT_SHOW_ALL) ?? !0) !== t && w(this, G, _i).call(this, [[ut.HIGHLIGHT_SHOW_ALL, t]]);
  }
  enableWaiting(e = !1) {
    if (n(this, Yh) !== e) {
      g(this, Yh, e);
      for (const t of n(this, $t).values())
        e ? t.disableClick() : t.enableClick(), t.div.classList.toggle("waiting", e);
    }
  }
  *getEditors(e) {
    for (const t of n(this, Vt).values())
      t.pageIndex === e && (yield t);
  }
  getEditor(e) {
    return n(this, Vt).get(e);
  }
  addEditor(e) {
    n(this, Vt).set(e.id, e);
  }
  removeEditor(e) {
    e.div.contains(document.activeElement) && (n(this, mi) && clearTimeout(n(this, mi)), g(this, mi, setTimeout(() => {
      this.focusMainContainer(), g(this, mi, null);
    }, 0))), n(this, Vt).delete(e.id), e.annotationElementId && n(this, Yn)?.delete(e.annotationElementId), this.unselect(e), (!e.annotationElementId || !n(this, Wn).has(e.annotationElementId)) && n(this, Ge)?.remove(e.id);
  }
  addDeletedAnnotationElement(e) {
    n(this, Wn).add(e.annotationElementId), this.addChangedExistingAnnotation(e), e.deleted = !0;
  }
  isDeletedAnnotationElement(e) {
    return n(this, Wn).has(e);
  }
  removeDeletedAnnotationElement(e) {
    n(this, Wn).delete(e.annotationElementId), this.removeChangedExistingAnnotation(e), e.deleted = !1;
  }
  setActiveEditor(e) {
    n(this, as) !== e && (g(this, as, e), e && w(this, G, _i).call(this, e.propertiesToUpdate));
  }
  updateUI(e) {
    n(this, G, Dm) === e && w(this, G, _i).call(this, e.propertiesToUpdate);
  }
  updateUIForDefaultProperties(e) {
    w(this, G, _i).call(this, e.defaultPropertiesToUpdate);
  }
  toggleSelected(e) {
    if (n(this, wt).has(e)) {
      n(this, wt).delete(e), e.unselect(), w(this, G, $e).call(this, {
        hasSelectedEditor: this.hasSelection
      });
      return;
    }
    n(this, wt).add(e), e.select(), w(this, G, _i).call(this, e.propertiesToUpdate), w(this, G, $e).call(this, {
      hasSelectedEditor: !0
    });
  }
  setSelected(e) {
    this.updateToolbar({
      mode: e.mode,
      editId: e.uid
    }), n(this, Gn)?.commitOrRemove();
    for (const t of n(this, wt))
      t !== e && t.unselect();
    n(this, ue)?.destroyPopup(), n(this, wt).clear(), n(this, wt).add(e), e.select(), w(this, G, _i).call(this, e.propertiesToUpdate), w(this, G, $e).call(this, {
      hasSelectedEditor: !0
    });
  }
  isSelected(e) {
    return n(this, wt).has(e);
  }
  get firstSelectedEditor() {
    return n(this, wt).values().next().value;
  }
  unselect(e) {
    e.unselect(), n(this, wt).delete(e), w(this, G, $e).call(this, {
      hasSelectedEditor: this.hasSelection
    });
  }
  get hasSelection() {
    return n(this, wt).size !== 0;
  }
  get isEnterHandled() {
    return n(this, wt).size === 1 && this.firstSelectedEditor.isEnterHandled;
  }
  undo() {
    n(this, Os).undo(), w(this, G, $e).call(this, {
      hasSomethingToUndo: n(this, Os).hasSomethingToUndo(),
      hasSomethingToRedo: !0,
      isEmpty: w(this, G, dh).call(this)
    }), this._editorUndoBar?.hide();
  }
  redo() {
    n(this, Os).redo(), w(this, G, $e).call(this, {
      hasSomethingToUndo: !0,
      hasSomethingToRedo: n(this, Os).hasSomethingToRedo(),
      isEmpty: w(this, G, dh).call(this)
    });
  }
  addCommands(e) {
    n(this, Os).add(e), w(this, G, $e).call(this, {
      hasSomethingToUndo: !0,
      hasSomethingToRedo: !1,
      isEmpty: w(this, G, dh).call(this)
    });
  }
  cleanUndoStack(e) {
    n(this, Os).cleanType(e);
  }
  delete() {
    this.commitOrRemove();
    const e = this.currentLayer?.endDrawingSession(!0);
    if (!this.hasSelection && !e)
      return;
    const t = e ? [e] : [...n(this, wt)], s = () => {
      this._editorUndoBar?.show(i, t.length === 1 ? t[0].editorType : t.length);
      for (const r of t)
        r.remove();
    }, i = () => {
      for (const r of t)
        w(this, G, Gf).call(this, r);
    };
    this.addCommands({
      cmd: s,
      undo: i,
      mustExec: !0
    });
  }
  commitOrRemove() {
    n(this, as)?.commitOrRemove();
  }
  hasSomethingToControl() {
    return n(this, as) || this.hasSelection;
  }
  selectAll() {
    for (const e of n(this, wt))
      e.commit();
    w(this, G, _f).call(this, n(this, Vt).values());
  }
  unselectAll() {
    if (!(n(this, as) && (n(this, as).commitOrRemove(), n(this, ne) !== tt.NONE)) && !n(this, Gn)?.commitOrRemove() && (n(this, ue)?.destroyPopup(), !!this.hasSelection)) {
      for (const e of n(this, wt))
        e.unselect();
      n(this, wt).clear(), w(this, G, $e).call(this, {
        hasSelectedEditor: !1
      });
    }
  }
  translateSelectedEditors(e, t, s = !1) {
    if (s || this.commitOrRemove(), !this.hasSelection)
      return;
    n(this, Qn)[0] += e, n(this, Qn)[1] += t;
    const [i, r] = n(this, Qn), a = [...n(this, wt)], o = 1e3;
    n(this, yi) && clearTimeout(n(this, yi)), g(this, yi, setTimeout(() => {
      g(this, yi, null), n(this, Qn)[0] = n(this, Qn)[1] = 0, this.addCommands({
        cmd: () => {
          for (const l of a)
            n(this, Vt).has(l.id) && (l.translateInPage(i, r), l.translationDone());
        },
        undo: () => {
          for (const l of a)
            n(this, Vt).has(l.id) && (l.translateInPage(-i, -r), l.translationDone());
        },
        mustExec: !1
      });
    }, o));
    for (const l of a)
      l.translateInPage(e, t), l.translationDone();
  }
  setUpDragSession() {
    if (this.hasSelection) {
      this.disableUserSelect(!0), g(this, gi, /* @__PURE__ */ new Map());
      for (const e of n(this, wt))
        n(this, gi).set(e, {
          savedX: e.x,
          savedY: e.y,
          savedPageIndex: e.pageIndex,
          newX: 0,
          newY: 0,
          newPageIndex: -1
        });
    }
  }
  endDragSession() {
    if (!n(this, gi))
      return !1;
    this.disableUserSelect(!1);
    const e = n(this, gi);
    g(this, gi, null);
    let t = !1;
    for (const [{
      x: i,
      y: r,
      pageIndex: a
    }, o] of e)
      o.newX = i, o.newY = r, o.newPageIndex = a, t || (t = i !== o.savedX || r !== o.savedY || a !== o.savedPageIndex);
    if (!t)
      return !1;
    const s = (i, r, a, o) => {
      if (n(this, Vt).has(i.id)) {
        const l = n(this, $t).get(o);
        l ? i._setParentAndPosition(l, r, a) : (i.pageIndex = o, i.x = r, i.y = a);
      }
    };
    return this.addCommands({
      cmd: () => {
        for (const [i, {
          newX: r,
          newY: a,
          newPageIndex: o
        }] of e)
          s(i, r, a, o);
      },
      undo: () => {
        for (const [i, {
          savedX: r,
          savedY: a,
          savedPageIndex: o
        }] of e)
          s(i, r, a, o);
      },
      mustExec: !0
    }), !0;
  }
  dragSelectedEditors(e, t) {
    if (n(this, gi))
      for (const s of n(this, gi).keys())
        s.drag(e, t);
  }
  rebuild(e) {
    if (e.parent === null) {
      const t = this.getLayer(e.pageIndex);
      t ? (t.changeParent(e), t.addOrRebuild(e)) : (this.addEditor(e), this.addToAnnotationStorage(e), e.rebuild());
    } else
      e.parent.addOrRebuild(e);
  }
  get isEditorHandlingKeyboard() {
    return this.getActive()?.shouldGetKeyboardEvents() || n(this, wt).size === 1 && this.firstSelectedEditor.shouldGetKeyboardEvents();
  }
  isActive(e) {
    return n(this, as) === e;
  }
  getActive() {
    return n(this, as);
  }
  getMode() {
    return n(this, ne);
  }
  isEditingMode() {
    return n(this, ne) !== tt.NONE;
  }
  get imageManager() {
    return nt(this, "imageManager", new Uf());
  }
  getSelectionBoxes(e) {
    if (!e)
      return null;
    const t = document.getSelection();
    for (let h = 0, d = t.rangeCount; h < d; h++)
      if (!e.contains(t.getRangeAt(h).commonAncestorContainer))
        return null;
    const {
      x: s,
      y: i,
      width: r,
      height: a
    } = e.getBoundingClientRect();
    let o;
    switch (e.getAttribute("data-main-rotation")) {
      case "90":
        o = (h, d, u, f) => ({
          x: (d - i) / a,
          y: 1 - (h + u - s) / r,
          width: f / a,
          height: u / r
        });
        break;
      case "180":
        o = (h, d, u, f) => ({
          x: 1 - (h + u - s) / r,
          y: 1 - (d + f - i) / a,
          width: u / r,
          height: f / a
        });
        break;
      case "270":
        o = (h, d, u, f) => ({
          x: 1 - (d + f - i) / a,
          y: (h - s) / r,
          width: f / a,
          height: u / r
        });
        break;
      default:
        o = (h, d, u, f) => ({
          x: (h - s) / r,
          y: (d - i) / a,
          width: u / r,
          height: f / a
        });
        break;
    }
    const l = [];
    for (let h = 0, d = t.rangeCount; h < d; h++) {
      const u = t.getRangeAt(h);
      if (!u.collapsed)
        for (const {
          x: f,
          y: p,
          width: m,
          height: v
        } of u.getClientRects())
          m === 0 || v === 0 || l.push(o(f, p, m, v));
    }
    return l.length === 0 ? null : l;
  }
  addChangedExistingAnnotation({
    annotationElementId: e,
    id: t
  }) {
    (n(this, Bo) || g(this, Bo, /* @__PURE__ */ new Map())).set(e, t);
  }
  removeChangedExistingAnnotation({
    annotationElementId: e
  }) {
    n(this, Bo)?.delete(e);
  }
  renderAnnotationElement(e) {
    const t = n(this, Bo)?.get(e.data.id);
    if (!t)
      return;
    const s = n(this, Ge).getRawValue(t);
    s && (n(this, ne) === tt.NONE && !s.hasBeenModified || s.renderAnnotationElement(e));
  }
  setMissingCanvas(e, t, s) {
    const i = n(this, Yn)?.get(e);
    i && (i.setCanvas(t, s), n(this, Yn).delete(e));
  }
  addMissingCanvas(e, t) {
    (n(this, Yn) || g(this, Yn, /* @__PURE__ */ new Map())).set(e, t);
  }
};
Lo = new WeakMap(), as = new WeakMap(), Fo = new WeakMap(), Vt = new WeakMap(), $t = new WeakMap(), ko = new WeakMap(), No = new WeakMap(), Ge = new WeakMap(), Bo = new WeakMap(), Os = new WeakMap(), ue = new WeakMap(), jn = new WeakMap(), Gn = new WeakMap(), _n = new WeakMap(), Wn = new WeakMap(), gi = new WeakMap(), Ls = new WeakMap(), Vr = new WeakMap(), Vh = new WeakMap(), zh = new WeakMap(), Uo = new WeakMap(), Xh = new WeakMap(), mi = new WeakMap(), Vn = new WeakMap(), Ho = new WeakMap(), zn = new WeakMap(), vi = new WeakMap(), ju = new WeakMap(), Yi = new WeakMap(), $o = new WeakMap(), Yh = new WeakMap(), Xn = new WeakMap(), zr = new WeakMap(), jo = new WeakMap(), Yn = new WeakMap(), Kh = new WeakMap(), ne = new WeakMap(), wt = new WeakMap(), Ki = new WeakMap(), Kn = new WeakMap(), Jn = new WeakMap(), Jh = new WeakMap(), Go = new WeakMap(), Qh = new WeakMap(), Qn = new WeakMap(), yi = new WeakMap(), Ji = new WeakMap(), Zh = new WeakMap(), qh = new WeakMap(), Fs = new WeakMap(), G = new WeakSet(), Vd = function({
  anchorNode: e
}) {
  return e.nodeType === Node.TEXT_NODE ? e.parentElement : e;
}, $f = function(e) {
  const {
    currentLayer: t
  } = this;
  if (t.hasTextLayer(e))
    return t;
  for (const s of n(this, $t).values())
    if (s.hasTextLayer(e))
      return s;
  return null;
}, ym = function(e) {
  this.commitOrRemove(), this.currentLayer?.endDrawingSession(!1);
}, bm = function() {
  const e = document.getSelection();
  if (!e || e.isCollapsed)
    return;
  const s = w(this, G, Vd).call(this, e).closest(".textLayer"), i = this.getSelectionBoxes(s);
  i && (n(this, vi) || g(this, vi, new Zy(this)), n(this, vi).show(s, i, this.direction === "ltr"));
}, Am = function() {
  const e = document.getSelection();
  if (!e || e.isCollapsed) {
    n(this, Ki) && (n(this, vi)?.hide(), g(this, Ki, null), w(this, G, $e).call(this, {
      hasSelectedText: !1
    }));
    return;
  }
  const {
    anchorNode: t
  } = e;
  if (t === n(this, Ki))
    return;
  const i = w(this, G, Vd).call(this, e).closest(".textLayer");
  if (!i) {
    n(this, Ki) && (n(this, vi)?.hide(), g(this, Ki, null), w(this, G, $e).call(this, {
      hasSelectedText: !1
    }));
    return;
  }
  if (n(this, vi)?.hide(), g(this, Ki, t), w(this, G, $e).call(this, {
    hasSelectedText: !0
  }), !(n(this, ne) !== tt.HIGHLIGHT && n(this, ne) !== tt.NONE) && (n(this, ne) === tt.HIGHLIGHT && this.showAllEditors("highlight", !0, !0), g(this, zn, this.isShiftKeyDown), !this.isShiftKeyDown)) {
    const r = n(this, ne) === tt.HIGHLIGHT ? w(this, G, $f).call(this, i) : null;
    if (r?.toggleDrawing(), n(this, $o)) {
      const a = new AbortController(), o = this.combinedSignal(a), l = (h) => {
        h.type === "pointerup" && h.button !== 0 || (a.abort(), r?.toggleDrawing(!0), h.type === "pointerup" && w(this, G, ch).call(this, "main_toolbar"));
      };
      window.addEventListener("pointerup", l, {
        signal: o
      }), window.addEventListener("blur", l, {
        signal: o
      });
    } else
      r?.toggleDrawing(!0), w(this, G, ch).call(this, "main_toolbar");
  }
}, ch = function(e = "") {
  n(this, ne) === tt.HIGHLIGHT ? this.highlightSelection(e) : n(this, Vh) && w(this, G, bm).call(this);
}, wm = function() {
  document.addEventListener("selectionchange", w(this, G, Am).bind(this), {
    signal: this._signal
  });
}, Em = function() {
  if (n(this, Vn))
    return;
  g(this, Vn, new AbortController());
  const e = this.combinedSignal(n(this, Vn));
  window.addEventListener("focus", this.focus.bind(this), {
    signal: e
  }), window.addEventListener("blur", this.blur.bind(this), {
    signal: e
  });
}, Sm = function() {
  n(this, Vn)?.abort(), g(this, Vn, null);
}, jf = function() {
  if (n(this, Xn))
    return;
  g(this, Xn, new AbortController());
  const e = this.combinedSignal(n(this, Xn));
  window.addEventListener("keydown", this.keydown.bind(this), {
    signal: e
  }), window.addEventListener("keyup", this.keyup.bind(this), {
    signal: e
  });
}, xm = function() {
  n(this, Xn)?.abort(), g(this, Xn, null);
}, Tm = function() {
  if (n(this, jn))
    return;
  g(this, jn, new AbortController());
  const e = this.combinedSignal(n(this, jn));
  document.addEventListener("copy", this.copy.bind(this), {
    signal: e
  }), document.addEventListener("cut", this.cut.bind(this), {
    signal: e
  }), document.addEventListener("paste", this.paste.bind(this), {
    signal: e
  });
}, Cm = function() {
  n(this, jn)?.abort(), g(this, jn, null);
}, Im = function() {
  const e = this._signal;
  document.addEventListener("dragover", this.dragOver.bind(this), {
    signal: e
  }), document.addEventListener("drop", this.drop.bind(this), {
    signal: e
  });
}, $e = function(e) {
  Object.entries(e).some(([s, i]) => n(this, Qh)[s] !== i) && (this._eventBus.dispatch("editingstateschanged", {
    source: this,
    details: Object.assign(n(this, Qh), e)
  }), n(this, ne) === tt.HIGHLIGHT && e.hasSelectedEditor === !1 && w(this, G, _i).call(this, [[ut.HIGHLIGHT_FREE, !0]]));
}, _i = function(e) {
  this._eventBus.dispatch("annotationeditorparamschanged", {
    source: this,
    details: e
  });
}, Pm = async function() {
  if (!n(this, Yi)) {
    g(this, Yi, !0);
    const e = [];
    for (const t of n(this, $t).values())
      e.push(t.enable());
    await Promise.all(e);
    for (const t of n(this, Vt).values())
      t.enable();
  }
}, Rm = function() {
  if (this.unselectAll(), n(this, Yi)) {
    g(this, Yi, !1);
    for (const e of n(this, $t).values())
      e.disable();
    for (const e of n(this, Vt).values())
      e.disable();
  }
}, Gf = function(e) {
  const t = n(this, $t).get(e.pageIndex);
  t ? t.addOrRebuild(e) : (this.addEditor(e), this.addToAnnotationStorage(e));
}, Dm = function() {
  let e = null;
  for (e of n(this, wt))
    ;
  return e;
}, dh = function() {
  if (n(this, Vt).size === 0)
    return !0;
  if (n(this, Vt).size === 1)
    for (const e of n(this, Vt).values())
      return e.isEmpty();
  return !1;
}, _f = function(e) {
  for (const t of n(this, wt))
    t.unselect();
  n(this, wt).clear();
  for (const t of e)
    t.isEmpty() || (n(this, wt).add(t), t.select());
  w(this, G, $e).call(this, {
    hasSelectedEditor: this.hasSelection
  });
}, R(To, "TRANSLATE_SMALL", 1), R(To, "TRANSLATE_BIG", 10);
let oo = To;
var fe, bi, Ys, _o, Ai, os, Wo, wi, Qe, Qi, Xr, Ei, Zn, hi, uh, zd;
const je = class je {
  constructor(e) {
    y(this, hi);
    y(this, fe, null);
    y(this, bi, !1);
    y(this, Ys, null);
    y(this, _o, null);
    y(this, Ai, null);
    y(this, os, null);
    y(this, Wo, !1);
    y(this, wi, null);
    y(this, Qe, null);
    y(this, Qi, null);
    y(this, Xr, null);
    y(this, Ei, !1);
    g(this, Qe, e), g(this, Ei, e._uiManager.useNewAltTextFlow), n(je, Zn) || g(je, Zn, Object.freeze({
      added: "pdfjs-editor-new-alt-text-added-button",
      "added-label": "pdfjs-editor-new-alt-text-added-button-label",
      missing: "pdfjs-editor-new-alt-text-missing-button",
      "missing-label": "pdfjs-editor-new-alt-text-missing-button-label",
      review: "pdfjs-editor-new-alt-text-to-review-button",
      "review-label": "pdfjs-editor-new-alt-text-to-review-button-label"
    }));
  }
  static initialize(e) {
    je._l10n ?? (je._l10n = e);
  }
  async render() {
    const e = g(this, Ys, document.createElement("button"));
    e.className = "altText", e.tabIndex = "0";
    const t = g(this, _o, document.createElement("span"));
    e.append(t), n(this, Ei) ? (e.classList.add("new"), e.setAttribute("data-l10n-id", n(je, Zn).missing), t.setAttribute("data-l10n-id", n(je, Zn)["missing-label"])) : (e.setAttribute("data-l10n-id", "pdfjs-editor-alt-text-button"), t.setAttribute("data-l10n-id", "pdfjs-editor-alt-text-button-label"));
    const s = n(this, Qe)._uiManager._signal;
    e.addEventListener("contextmenu", Vs, {
      signal: s
    }), e.addEventListener("pointerdown", (r) => r.stopPropagation(), {
      signal: s
    });
    const i = (r) => {
      r.preventDefault(), n(this, Qe)._uiManager.editAltText(n(this, Qe)), n(this, Ei) && n(this, Qe)._reportTelemetry({
        action: "pdfjs.image.alt_text.image_status_label_clicked",
        data: {
          label: n(this, hi, uh)
        }
      });
    };
    return e.addEventListener("click", i, {
      capture: !0,
      signal: s
    }), e.addEventListener("keydown", (r) => {
      r.target === e && r.key === "Enter" && (g(this, Wo, !0), i(r));
    }, {
      signal: s
    }), await w(this, hi, zd).call(this), e;
  }
  finish() {
    n(this, Ys) && (n(this, Ys).focus({
      focusVisible: n(this, Wo)
    }), g(this, Wo, !1));
  }
  isEmpty() {
    return n(this, Ei) ? n(this, fe) === null : !n(this, fe) && !n(this, bi);
  }
  hasData() {
    return n(this, Ei) ? n(this, fe) !== null || !!n(this, Qi) : this.isEmpty();
  }
  get guessedText() {
    return n(this, Qi);
  }
  async setGuessedText(e) {
    n(this, fe) === null && (g(this, Qi, e), g(this, Xr, await je._l10n.get("pdfjs-editor-new-alt-text-generated-alt-text-with-disclaimer", {
      generatedAltText: e
    })), w(this, hi, zd).call(this));
  }
  toggleAltTextBadge(e = !1) {
    if (!n(this, Ei) || n(this, fe)) {
      n(this, wi)?.remove(), g(this, wi, null);
      return;
    }
    if (!n(this, wi)) {
      const t = g(this, wi, document.createElement("div"));
      t.className = "noAltTextBadge", n(this, Qe).div.append(t);
    }
    n(this, wi).classList.toggle("hidden", !e);
  }
  serialize(e) {
    let t = n(this, fe);
    return !e && n(this, Qi) === t && (t = n(this, Xr)), {
      altText: t,
      decorative: n(this, bi),
      guessedText: n(this, Qi),
      textWithDisclaimer: n(this, Xr)
    };
  }
  get data() {
    return {
      altText: n(this, fe),
      decorative: n(this, bi)
    };
  }
  set data({
    altText: e,
    decorative: t,
    guessedText: s,
    textWithDisclaimer: i,
    cancel: r = !1
  }) {
    s && (g(this, Qi, s), g(this, Xr, i)), !(n(this, fe) === e && n(this, bi) === t) && (r || (g(this, fe, e), g(this, bi, t)), w(this, hi, zd).call(this));
  }
  toggle(e = !1) {
    n(this, Ys) && (!e && n(this, os) && (clearTimeout(n(this, os)), g(this, os, null)), n(this, Ys).disabled = !e);
  }
  shown() {
    n(this, Qe)._reportTelemetry({
      action: "pdfjs.image.alt_text.image_status_label_displayed",
      data: {
        label: n(this, hi, uh)
      }
    });
  }
  destroy() {
    n(this, Ys)?.remove(), g(this, Ys, null), g(this, _o, null), g(this, Ai, null), n(this, wi)?.remove(), g(this, wi, null);
  }
};
fe = new WeakMap(), bi = new WeakMap(), Ys = new WeakMap(), _o = new WeakMap(), Ai = new WeakMap(), os = new WeakMap(), Wo = new WeakMap(), wi = new WeakMap(), Qe = new WeakMap(), Qi = new WeakMap(), Xr = new WeakMap(), Ei = new WeakMap(), Zn = new WeakMap(), hi = new WeakSet(), uh = function() {
  return n(this, fe) && "added" || n(this, fe) === null && this.guessedText && "review" || "missing";
}, zd = async function() {
  const e = n(this, Ys);
  if (!e)
    return;
  if (n(this, Ei)) {
    if (e.classList.toggle("done", !!n(this, fe)), e.setAttribute("data-l10n-id", n(je, Zn)[n(this, hi, uh)]), n(this, _o)?.setAttribute("data-l10n-id", n(je, Zn)[`${n(this, hi, uh)}-label`]), !n(this, fe)) {
      n(this, Ai)?.remove();
      return;
    }
  } else {
    if (!n(this, fe) && !n(this, bi)) {
      e.classList.remove("done"), n(this, Ai)?.remove();
      return;
    }
    e.classList.add("done"), e.setAttribute("data-l10n-id", "pdfjs-editor-alt-text-edit-button");
  }
  let t = n(this, Ai);
  if (!t) {
    g(this, Ai, t = document.createElement("span")), t.className = "tooltip", t.setAttribute("role", "tooltip"), t.id = `alt-text-tooltip-${n(this, Qe).id}`;
    const i = 100, r = n(this, Qe)._uiManager._signal;
    r.addEventListener("abort", () => {
      clearTimeout(n(this, os)), g(this, os, null);
    }, {
      once: !0
    }), e.addEventListener("mouseenter", () => {
      g(this, os, setTimeout(() => {
        g(this, os, null), n(this, Ai).classList.add("show"), n(this, Qe)._reportTelemetry({
          action: "alt_text_tooltip"
        });
      }, i));
    }, {
      signal: r
    }), e.addEventListener("mouseleave", () => {
      n(this, os) && (clearTimeout(n(this, os)), g(this, os, null)), n(this, Ai)?.classList.remove("show");
    }, {
      signal: r
    });
  }
  n(this, bi) ? t.setAttribute("data-l10n-id", "pdfjs-editor-alt-text-decorative-tooltip") : (t.removeAttribute("data-l10n-id"), t.textContent = n(this, fe)), t.parentNode || e.append(t), n(this, Qe).getElementForAltText()?.setAttribute("aria-describedby", t.id);
}, y(je, Zn, null), R(je, "_l10n", null);
let Pu = je;
var Ee, ks, Yr, Ft, tc, qn, Ns, tr, er, Kr, ec, Wf;
class Fd {
  constructor(e) {
    y(this, ec);
    y(this, Ee, null);
    y(this, ks, null);
    y(this, Yr, !1);
    y(this, Ft, null);
    y(this, tc, null);
    y(this, qn, null);
    y(this, Ns, null);
    y(this, tr, null);
    y(this, er, !1);
    y(this, Kr, null);
    g(this, Ft, e);
  }
  renderForToolbar() {
    const e = g(this, ks, document.createElement("button"));
    return e.className = "comment", w(this, ec, Wf).call(this, e, !1);
  }
  renderForStandalone() {
    const e = g(this, Ee, document.createElement("button"));
    e.className = "annotationCommentButton";
    const t = n(this, Ft).commentButtonPosition;
    if (t) {
      const {
        style: s
      } = e;
      s.insetInlineEnd = `calc(${100 * (n(this, Ft)._uiManager.direction === "ltr" ? 1 - t[0] : t[0])}% - var(--comment-button-dim))`, s.top = `calc(${100 * t[1]}% - var(--comment-button-dim))`;
      const i = n(this, Ft).commentButtonColor;
      i && (s.backgroundColor = i);
    }
    return w(this, ec, Wf).call(this, e, !0);
  }
  focusButton() {
    setTimeout(() => {
      (n(this, Ee) ?? n(this, ks))?.focus();
    }, 0);
  }
  onUpdatedColor() {
    if (!n(this, Ee))
      return;
    const e = n(this, Ft).commentButtonColor;
    e && (n(this, Ee).style.backgroundColor = e), n(this, Ft)._uiManager.updatePopupColor(n(this, Ft));
  }
  get commentButtonWidth() {
    return (n(this, Ee)?.getBoundingClientRect().width ?? 0) / n(this, Ft).parent.boundingClientRect.width;
  }
  get commentPopupPositionInLayer() {
    if (n(this, Kr))
      return n(this, Kr);
    if (!n(this, Ee))
      return null;
    const {
      x: e,
      y: t,
      height: s
    } = n(this, Ee).getBoundingClientRect(), {
      x: i,
      y: r,
      width: a,
      height: o
    } = n(this, Ft).parent.boundingClientRect;
    return [(e - i) / a, (t + s - r) / o];
  }
  set commentPopupPositionInLayer(e) {
    g(this, Kr, e);
  }
  hasDefaultPopupPosition() {
    return n(this, Kr) === null;
  }
  removeStandaloneCommentButton() {
    n(this, Ee)?.remove(), g(this, Ee, null);
  }
  removeToolbarCommentButton() {
    n(this, ks)?.remove(), g(this, ks, null);
  }
  setCommentButtonStates({
    selected: e,
    hasPopup: t
  }) {
    n(this, Ee) && (n(this, Ee).classList.toggle("selected", e), n(this, Ee).ariaExpanded = t);
  }
  edit(e) {
    const t = this.commentPopupPositionInLayer;
    let s, i;
    if (t)
      [s, i] = t;
    else {
      [s, i] = n(this, Ft).commentButtonPosition;
      const {
        width: d,
        height: u,
        x: f,
        y: p
      } = n(this, Ft);
      s = f + s * d, i = p + i * u;
    }
    const r = n(this, Ft).parent.boundingClientRect, {
      x: a,
      y: o,
      width: l,
      height: h
    } = r;
    n(this, Ft)._uiManager.editComment(n(this, Ft), a + s * l, o + i * h, {
      ...e,
      parentDimensions: r
    });
  }
  finish() {
    n(this, ks) && (n(this, ks).focus({
      focusVisible: n(this, Yr)
    }), g(this, Yr, !1));
  }
  isDeleted() {
    return n(this, er) || n(this, Ns) === "";
  }
  isEmpty() {
    return n(this, Ns) === null;
  }
  hasBeenEdited() {
    return this.isDeleted() || n(this, Ns) !== n(this, tc);
  }
  serialize() {
    return this.data;
  }
  get data() {
    return {
      text: n(this, Ns),
      richText: n(this, qn),
      date: n(this, tr),
      deleted: this.isDeleted()
    };
  }
  set data(e) {
    if (e !== n(this, Ns) && g(this, qn, null), e === null) {
      g(this, Ns, ""), g(this, er, !0);
      return;
    }
    g(this, Ns, e), g(this, tr, /* @__PURE__ */ new Date()), g(this, er, !1);
  }
  restoreData({
    text: e,
    richText: t,
    date: s
  }) {
    g(this, Ns, e), g(this, qn, t), g(this, tr, s), g(this, er, !1);
  }
  setInitialText(e, t = null) {
    g(this, tc, e), this.data = e, g(this, tr, null), g(this, qn, t);
  }
  shown() {
  }
  destroy() {
    n(this, ks)?.remove(), g(this, ks, null), n(this, Ee)?.remove(), g(this, Ee, null), g(this, Ns, ""), g(this, qn, null), g(this, tr, null), g(this, Ft, null), g(this, Yr, !1), g(this, er, !1);
  }
}
Ee = new WeakMap(), ks = new WeakMap(), Yr = new WeakMap(), Ft = new WeakMap(), tc = new WeakMap(), qn = new WeakMap(), Ns = new WeakMap(), tr = new WeakMap(), er = new WeakMap(), Kr = new WeakMap(), ec = new WeakSet(), Wf = function(e, t) {
  if (!n(this, Ft)._uiManager.hasCommentManager())
    return null;
  e.tabIndex = "0", e.ariaHasPopup = "dialog", t ? (e.ariaControls = "commentPopup", e.setAttribute("data-l10n-id", "pdfjs-show-comment-button")) : (e.ariaControlsElements = [n(this, Ft)._uiManager.getCommentDialogElement()], e.setAttribute("data-l10n-id", "pdfjs-editor-add-comment-button"));
  const s = n(this, Ft)._uiManager._signal;
  if (!(s instanceof AbortSignal) || s.aborted)
    return e;
  e.addEventListener("contextmenu", Vs, {
    signal: s
  }), t && (e.addEventListener("focusin", (r) => {
    n(this, Ft)._focusEventsAllowed = !1, Kt(r);
  }, {
    capture: !0,
    signal: s
  }), e.addEventListener("focusout", (r) => {
    n(this, Ft)._focusEventsAllowed = !0, Kt(r);
  }, {
    capture: !0,
    signal: s
  })), e.addEventListener("pointerdown", (r) => r.stopPropagation(), {
    signal: s
  });
  const i = (r) => {
    r.preventDefault(), e === n(this, ks) ? this.edit() : n(this, Ft).toggleComment(!0);
  };
  return e.addEventListener("click", i, {
    capture: !0,
    signal: s
  }), e.addEventListener("keydown", (r) => {
    r.target === e && r.key === "Enter" && (g(this, Yr, !0), i(r));
  }, {
    signal: s
  }), e.addEventListener("pointerenter", () => {
    n(this, Ft).toggleComment(!1, !0);
  }, {
    signal: s
  }), e.addEventListener("pointerleave", () => {
    n(this, Ft).toggleComment(!1, !1);
  }, {
    signal: s
  }), e;
};
var Vo, Jr, sc, ic, nc, rc, ac, Zi, Qr, qi, Zr, tn, Or, Mm, Om, Lm;
const Ag = class Ag {
  constructor({
    container: e,
    isPinchingDisabled: t = null,
    isPinchingStopped: s = null,
    onPinchStart: i = null,
    onPinching: r = null,
    onPinchEnd: a = null,
    signal: o
  }) {
    y(this, Or);
    y(this, Vo);
    y(this, Jr, !1);
    y(this, sc, null);
    y(this, ic);
    y(this, nc);
    y(this, rc);
    y(this, ac);
    y(this, Zi, null);
    y(this, Qr);
    y(this, qi, null);
    y(this, Zr);
    y(this, tn, null);
    g(this, Vo, e), g(this, sc, s), g(this, ic, t), g(this, nc, i), g(this, rc, r), g(this, ac, a), g(this, Zr, new AbortController()), g(this, Qr, AbortSignal.any([o, n(this, Zr).signal])), e.addEventListener("touchstart", w(this, Or, Mm).bind(this), {
      passive: !1,
      signal: n(this, Qr)
    });
  }
  get MIN_TOUCH_DISTANCE_TO_PINCH() {
    return 35 / Ui.pixelRatio;
  }
  destroy() {
    n(this, Zr)?.abort(), g(this, Zr, null), n(this, Zi)?.abort(), g(this, Zi, null);
  }
};
Vo = new WeakMap(), Jr = new WeakMap(), sc = new WeakMap(), ic = new WeakMap(), nc = new WeakMap(), rc = new WeakMap(), ac = new WeakMap(), Zi = new WeakMap(), Qr = new WeakMap(), qi = new WeakMap(), Zr = new WeakMap(), tn = new WeakMap(), Or = new WeakSet(), Mm = function(e) {
  var i, r, a;
  if ((i = n(this, ic)) != null && i.call(this))
    return;
  if (e.touches.length === 1) {
    if (n(this, Zi))
      return;
    const o = g(this, Zi, new AbortController()), l = AbortSignal.any([n(this, Qr), o.signal]), h = n(this, Vo), d = {
      capture: !0,
      signal: l,
      passive: !1
    }, u = (f) => {
      f.pointerType === "touch" && (n(this, Zi)?.abort(), g(this, Zi, null));
    };
    h.addEventListener("pointerdown", (f) => {
      f.pointerType === "touch" && (Kt(f), u(f));
    }, d), h.addEventListener("pointerup", u, d), h.addEventListener("pointercancel", u, d);
    return;
  }
  if (!n(this, tn)) {
    g(this, tn, new AbortController());
    const o = AbortSignal.any([n(this, Qr), n(this, tn).signal]), l = n(this, Vo), h = {
      signal: o,
      capture: !1,
      passive: !1
    };
    l.addEventListener("touchmove", w(this, Or, Om).bind(this), h);
    const d = w(this, Or, Lm).bind(this);
    l.addEventListener("touchend", d, h), l.addEventListener("touchcancel", d, h), h.capture = !0, l.addEventListener("pointerdown", Kt, h), l.addEventListener("pointermove", Kt, h), l.addEventListener("pointercancel", Kt, h), l.addEventListener("pointerup", Kt, h), (r = n(this, nc)) == null || r.call(this);
  }
  if (Kt(e), e.touches.length !== 2 || (a = n(this, sc)) != null && a.call(this)) {
    g(this, qi, null);
    return;
  }
  let [t, s] = e.touches;
  t.identifier > s.identifier && ([t, s] = [s, t]), g(this, qi, {
    touch0X: t.screenX,
    touch0Y: t.screenY,
    touch1X: s.screenX,
    touch1Y: s.screenY
  });
}, Om = function(e) {
  var T;
  if (!n(this, qi) || e.touches.length !== 2)
    return;
  Kt(e);
  let [t, s] = e.touches;
  t.identifier > s.identifier && ([t, s] = [s, t]);
  const {
    screenX: i,
    screenY: r
  } = t, {
    screenX: a,
    screenY: o
  } = s, l = n(this, qi), {
    touch0X: h,
    touch0Y: d,
    touch1X: u,
    touch1Y: f
  } = l, p = u - h, m = f - d, v = a - i, A = o - r, b = Math.hypot(v, A) || 1, E = Math.hypot(p, m) || 1;
  if (!n(this, Jr) && Math.abs(E - b) <= Ag.MIN_TOUCH_DISTANCE_TO_PINCH)
    return;
  if (l.touch0X = i, l.touch0Y = r, l.touch1X = a, l.touch1Y = o, !n(this, Jr)) {
    g(this, Jr, !0);
    return;
  }
  const S = [(i + a) / 2, (r + o) / 2];
  (T = n(this, rc)) == null || T.call(this, S, E, b);
}, Lm = function(e) {
  var t;
  e.touches.length >= 2 || (n(this, tn) && (n(this, tn).abort(), g(this, tn, null), (t = n(this, ac)) == null || t.call(this)), n(this, qi) && (Kt(e), g(this, qi, null), g(this, Jr, !1)));
};
let Ru = Ag;
var qr, Ks, Bt, Et, en, zo, sr, oc, Se, ta, sn, Bs, ir, lc, ea, ls, hc, sa, nn, Si, Xo, Yo, Us, ia, cc, Gu, Q, Vf, dc, zf, Xd, Fm, km, Xf, Yd, Yf, Nm, Bm, Um, Kf, Hm, Jf, $m, jm, Gm, Qf, fh;
const it = class it {
  constructor(e) {
    y(this, Q);
    y(this, qr, null);
    y(this, Ks, null);
    y(this, Bt, null);
    y(this, Et, null);
    y(this, en, null);
    y(this, zo, !1);
    y(this, sr, null);
    y(this, oc, "");
    y(this, Se, null);
    y(this, ta, null);
    y(this, sn, null);
    y(this, Bs, null);
    y(this, ir, null);
    y(this, lc, "");
    y(this, ea, !1);
    y(this, ls, null);
    y(this, hc, !1);
    y(this, sa, !1);
    y(this, nn, !1);
    y(this, Si, null);
    y(this, Xo, 0);
    y(this, Yo, 0);
    y(this, Us, null);
    y(this, ia, null);
    R(this, "isSelected", !1);
    R(this, "_isCopy", !1);
    R(this, "_editToolbar", null);
    R(this, "_initialOptions", /* @__PURE__ */ Object.create(null));
    R(this, "_initialData", null);
    R(this, "_isVisible", !0);
    R(this, "_uiManager", null);
    R(this, "_focusEventsAllowed", !0);
    y(this, cc, !1);
    y(this, Gu, it._zIndex++);
    this.parent = e.parent, this.id = e.id, this.width = this.height = null, this.pageIndex = e.parent.pageIndex, this.name = e.name, this.div = null, this._uiManager = e.uiManager, this.annotationElementId = null, this._willKeepAspectRatio = !1, this._initialOptions.isCentered = e.isCentered, this._structTreeParentId = null, this.annotationElementId = e.annotationElementId || null, this.creationDate = e.creationDate || /* @__PURE__ */ new Date(), this.modificationDate = e.modificationDate || null, this.canAddComment = !0;
    const {
      rotation: t,
      rawDims: {
        pageWidth: s,
        pageHeight: i,
        pageX: r,
        pageY: a
      }
    } = this.parent.viewport;
    this.rotation = t, this.pageRotation = (360 + t - this._uiManager.viewParameters.rotation) % 360, this.pageDimensions = [s, i], this.pageTranslation = [r, a];
    const [o, l] = this.parentDimensions;
    this.x = e.x / o, this.y = e.y / l, this.isAttachedToDOM = !1, this.deleted = !1;
  }
  static get _resizerKeyboardManager() {
    const e = it.prototype._resizeWithKeyboard, t = oo.TRANSLATE_SMALL, s = oo.TRANSLATE_BIG;
    return nt(this, "_resizerKeyboardManager", new Md([[["ArrowLeft", "mac+ArrowLeft"], e, {
      args: [-t, 0]
    }], [["ctrl+ArrowLeft", "mac+shift+ArrowLeft"], e, {
      args: [-s, 0]
    }], [["ArrowRight", "mac+ArrowRight"], e, {
      args: [t, 0]
    }], [["ctrl+ArrowRight", "mac+shift+ArrowRight"], e, {
      args: [s, 0]
    }], [["ArrowUp", "mac+ArrowUp"], e, {
      args: [0, -t]
    }], [["ctrl+ArrowUp", "mac+shift+ArrowUp"], e, {
      args: [0, -s]
    }], [["ArrowDown", "mac+ArrowDown"], e, {
      args: [0, t]
    }], [["ctrl+ArrowDown", "mac+shift+ArrowDown"], e, {
      args: [0, s]
    }], [["Escape", "mac+Escape"], it.prototype._stopResizingWithKeyboard]]));
  }
  updatePageIndex(e) {
    this.pageIndex = e;
  }
  get editorType() {
    return Object.getPrototypeOf(this).constructor._type;
  }
  get mode() {
    return Object.getPrototypeOf(this).constructor._editorType;
  }
  static get isDrawer() {
    return !1;
  }
  static get _defaultLineColor() {
    return nt(this, "_defaultLineColor", this._colorManager.getHexCode("CanvasText"));
  }
  static deleteAnnotationElement(e) {
    const t = new eb({
      id: e._uiManager.getId(),
      parent: e.parent,
      uiManager: e._uiManager
    });
    t.annotationElementId = e.annotationElementId, t.deleted = !0, t._uiManager.addToAnnotationStorage(t);
  }
  static initialize(e, t) {
    if (it._l10n ?? (it._l10n = e), it._l10nResizer || (it._l10nResizer = Object.freeze({
      topLeft: "pdfjs-editor-resizer-top-left",
      topMiddle: "pdfjs-editor-resizer-top-middle",
      topRight: "pdfjs-editor-resizer-top-right",
      middleRight: "pdfjs-editor-resizer-middle-right",
      bottomRight: "pdfjs-editor-resizer-bottom-right",
      bottomMiddle: "pdfjs-editor-resizer-bottom-middle",
      bottomLeft: "pdfjs-editor-resizer-bottom-left",
      middleLeft: "pdfjs-editor-resizer-middle-left"
    })), it._borderLineWidth !== -1)
      return;
    const s = getComputedStyle(document.documentElement);
    it._borderLineWidth = parseFloat(s.getPropertyValue("--outline-width")) || 0;
  }
  static updateDefaultParams(e, t) {
  }
  static get defaultPropertiesToUpdate() {
    return [];
  }
  static isHandlingMimeForPasting(e) {
    return !1;
  }
  static paste(e, t) {
    bt("Not implemented");
  }
  get propertiesToUpdate() {
    return [];
  }
  get _isDraggable() {
    return n(this, cc);
  }
  set _isDraggable(e) {
    g(this, cc, e), this.div?.classList.toggle("draggable", e);
  }
  get uid() {
    return this.annotationElementId || this.id;
  }
  get isEnterHandled() {
    return !0;
  }
  center() {
    const [e, t] = this.pageDimensions;
    switch (this.parentRotation) {
      case 90:
        this.x -= this.height * t / (e * 2), this.y += this.width * e / (t * 2);
        break;
      case 180:
        this.x += this.width / 2, this.y += this.height / 2;
        break;
      case 270:
        this.x += this.height * t / (e * 2), this.y -= this.width * e / (t * 2);
        break;
      default:
        this.x -= this.width / 2, this.y -= this.height / 2;
        break;
    }
    this.fixAndSetPosition();
  }
  addCommands(e) {
    this._uiManager.addCommands(e);
  }
  get currentLayer() {
    return this._uiManager.currentLayer;
  }
  setInBackground() {
    this.div.style.zIndex = 0;
  }
  setInForeground() {
    this.div.style.zIndex = n(this, Gu);
  }
  setParent(e) {
    e !== null ? (this.pageIndex = e.pageIndex, this.pageDimensions = e.pageDimensions) : (w(this, Q, fh).call(this), n(this, Bs)?.remove(), g(this, Bs, null)), this.parent = e;
  }
  focusin(e) {
    this._focusEventsAllowed && (n(this, ea) ? g(this, ea, !1) : this.parent.setSelected(this));
  }
  focusout(e) {
    !this._focusEventsAllowed || !this.isAttachedToDOM || e.relatedTarget?.closest(`#${this.id}`) || (e.preventDefault(), this.parent?.isMultipleSelection || this.commitOrRemove());
  }
  commitOrRemove() {
    this.isEmpty() ? this.remove() : this.commit();
  }
  commit() {
    this.isInEditMode() && this.addToAnnotationStorage();
  }
  addToAnnotationStorage() {
    this._uiManager.addToAnnotationStorage(this);
  }
  setAt(e, t, s, i) {
    const [r, a] = this.parentDimensions;
    [s, i] = this.screenToPageTranslation(s, i), this.x = (e + s) / r, this.y = (t + i) / a, this.fixAndSetPosition();
  }
  _moveAfterPaste(e, t) {
    if (this.isClone) {
      delete this.isClone;
      return;
    }
    const [s, i] = this.parentDimensions;
    this.setAt(e * s, t * i, this.width * s, this.height * i), this._onTranslated();
  }
  translate(e, t) {
    w(this, Q, Vf).call(this, this.parentDimensions, e, t);
  }
  translateInPage(e, t) {
    n(this, ls) || g(this, ls, [this.x, this.y, this.width, this.height]), w(this, Q, Vf).call(this, this.pageDimensions, e, t), this.div.scrollIntoView({
      block: "nearest"
    });
  }
  translationDone() {
    this._onTranslated(this.x, this.y);
  }
  drag(e, t) {
    n(this, ls) || g(this, ls, [this.x, this.y, this.width, this.height]);
    const {
      div: s,
      parentDimensions: [i, r]
    } = this;
    if (this.x += e / i, this.y += t / r, this.parent && (this.x < 0 || this.x > 1 || this.y < 0 || this.y > 1)) {
      const {
        x: u,
        y: f
      } = this.div.getBoundingClientRect();
      this.parent.findNewParent(this, u, f) && (this.x -= Math.floor(this.x), this.y -= Math.floor(this.y));
    }
    let {
      x: a,
      y: o
    } = this;
    const [l, h] = this.getBaseTranslation();
    a += l, o += h;
    const {
      style: d
    } = s;
    d.left = `${(100 * a).toFixed(2)}%`, d.top = `${(100 * o).toFixed(2)}%`, this._onTranslating(a, o), s.scrollIntoView({
      block: "nearest"
    });
  }
  _onTranslating(e, t) {
  }
  _onTranslated(e, t) {
  }
  get _hasBeenMoved() {
    return !!n(this, ls) && (n(this, ls)[0] !== this.x || n(this, ls)[1] !== this.y);
  }
  get _hasBeenResized() {
    return !!n(this, ls) && (n(this, ls)[2] !== this.width || n(this, ls)[3] !== this.height);
  }
  getBaseTranslation() {
    const [e, t] = this.parentDimensions, {
      _borderLineWidth: s
    } = it, i = s / e, r = s / t;
    switch (this.rotation) {
      case 90:
        return [-i, r];
      case 180:
        return [i, r];
      case 270:
        return [i, -r];
      default:
        return [-i, -r];
    }
  }
  get _mustFixPosition() {
    return !0;
  }
  fixAndSetPosition(e = this.rotation) {
    const {
      div: {
        style: t
      },
      pageDimensions: [s, i]
    } = this;
    let {
      x: r,
      y: a,
      width: o,
      height: l
    } = this;
    if (o *= s, l *= i, r *= s, a *= i, this._mustFixPosition)
      switch (e) {
        case 0:
          r = Ae(r, 0, s - o), a = Ae(a, 0, i - l);
          break;
        case 90:
          r = Ae(r, 0, s - l), a = Ae(a, o, i);
          break;
        case 180:
          r = Ae(r, o, s), a = Ae(a, l, i);
          break;
        case 270:
          r = Ae(r, l, s), a = Ae(a, 0, i - o);
          break;
      }
    this.x = r /= s, this.y = a /= i;
    const [h, d] = this.getBaseTranslation();
    r += h, a += d, t.left = `${(100 * r).toFixed(2)}%`, t.top = `${(100 * a).toFixed(2)}%`, this.moveInDOM();
  }
  screenToPageTranslation(e, t) {
    var s;
    return w(s = it, dc, zf).call(s, e, t, this.parentRotation);
  }
  pageTranslationToScreen(e, t) {
    var s;
    return w(s = it, dc, zf).call(s, e, t, 360 - this.parentRotation);
  }
  get parentScale() {
    return this._uiManager.viewParameters.realScale;
  }
  get parentRotation() {
    return (this._uiManager.viewParameters.rotation + this.pageRotation) % 360;
  }
  get parentDimensions() {
    const {
      parentScale: e,
      pageDimensions: [t, s]
    } = this;
    return [t * e, s * e];
  }
  setDims() {
    const {
      div: {
        style: e
      },
      width: t,
      height: s
    } = this;
    e.width = `${(100 * t).toFixed(2)}%`, e.height = `${(100 * s).toFixed(2)}%`;
  }
  getInitialTranslation() {
    return [0, 0];
  }
  _onResized() {
  }
  static _round(e) {
    return Math.round(e * 1e4) / 1e4;
  }
  _onResizing() {
  }
  altTextFinish() {
    n(this, Bt)?.finish();
  }
  get toolbarButtons() {
    return null;
  }
  async addEditToolbar() {
    if (this._editToolbar || n(this, sa))
      return this._editToolbar;
    this._editToolbar = new Nf(this), this.div.append(this._editToolbar.render());
    const {
      toolbarButtons: e
    } = this;
    if (e)
      for (const [t, s] of e)
        await this._editToolbar.addButton(t, s);
    return this.hasComment || this._editToolbar.addButton("comment", this.addCommentButton()), this._editToolbar.addButton("delete"), this._editToolbar;
  }
  addCommentButtonInToolbar() {
    this._editToolbar?.addButtonBefore("comment", this.addCommentButton(), ".deleteButton");
  }
  removeCommentButtonFromToolbar() {
    this._editToolbar?.removeButton("comment");
  }
  removeEditToolbar() {
    this._editToolbar?.remove(), this._editToolbar = null, n(this, Bt)?.destroy();
  }
  addContainer(e) {
    const t = this._editToolbar?.div;
    t ? t.before(e) : this.div.append(e);
  }
  getClientDimensions() {
    return this.div.getBoundingClientRect();
  }
  createAltText() {
    return n(this, Bt) || (Pu.initialize(it._l10n), g(this, Bt, new Pu(this)), n(this, qr) && (n(this, Bt).data = n(this, qr), g(this, qr, null))), n(this, Bt);
  }
  get altTextData() {
    return n(this, Bt)?.data;
  }
  set altTextData(e) {
    n(this, Bt) && (n(this, Bt).data = e);
  }
  get guessedAltText() {
    return n(this, Bt)?.guessedText;
  }
  async setGuessedAltText(e) {
    await n(this, Bt)?.setGuessedText(e);
  }
  serializeAltText(e) {
    return n(this, Bt)?.serialize(e);
  }
  hasAltText() {
    return !!n(this, Bt) && !n(this, Bt).isEmpty();
  }
  hasAltTextData() {
    return n(this, Bt)?.hasData() ?? !1;
  }
  focusCommentButton() {
    n(this, Et)?.focusButton();
  }
  addCommentButton() {
    return this.canAddComment ? n(this, Et) || g(this, Et, new Fd(this)) : null;
  }
  addStandaloneCommentButton() {
    if (this._uiManager.hasCommentManager()) {
      if (n(this, en)) {
        this._uiManager.isEditingMode() && n(this, en).classList.remove("hidden");
        return;
      }
      this.hasComment && (g(this, en, n(this, Et).renderForStandalone()), this.div.append(n(this, en)));
    }
  }
  removeStandaloneCommentButton() {
    n(this, Et).removeStandaloneCommentButton(), g(this, en, null);
  }
  hideStandaloneCommentButton() {
    n(this, en)?.classList.add("hidden");
  }
  get comment() {
    if (!n(this, Et))
      return null;
    const {
      data: {
        richText: e,
        text: t,
        date: s,
        deleted: i
      }
    } = n(this, Et);
    return {
      text: t,
      richText: e,
      date: s,
      deleted: i,
      color: this.getNonHCMColor(),
      opacity: this.opacity ?? 1
    };
  }
  set comment(e) {
    n(this, Et) || g(this, Et, new Fd(this)), typeof e == "object" && e !== null ? n(this, Et).restoreData(e) : n(this, Et).data = e, this.hasComment ? (this.removeCommentButtonFromToolbar(), this.addStandaloneCommentButton(), this._uiManager.updateComment(this)) : (this.addCommentButtonInToolbar(), this.removeStandaloneCommentButton(), this._uiManager.removeComment(this));
  }
  setCommentData({
    comment: e,
    popupRef: t,
    richText: s
  }) {
    if (!t || (n(this, Et) || g(this, Et, new Fd(this)), n(this, Et).setInitialText(e, s), !this.annotationElementId))
      return;
    const i = this._uiManager.getAndRemoveDataFromAnnotationStorage(this.annotationElementId);
    i && this.updateFromAnnotationLayer(i);
  }
  get hasEditedComment() {
    return n(this, Et)?.hasBeenEdited();
  }
  get hasDeletedComment() {
    return n(this, Et)?.isDeleted();
  }
  get hasComment() {
    return !!n(this, Et) && !n(this, Et).isEmpty() && !n(this, Et).isDeleted();
  }
  async editComment(e) {
    n(this, Et) || g(this, Et, new Fd(this)), n(this, Et).edit(e);
  }
  toggleComment(e, t = void 0) {
    this.hasComment && this._uiManager.toggleComment(this, e, t);
  }
  setSelectedCommentButton(e) {
    n(this, Et).setSelectedButton(e);
  }
  addComment(e) {
    if (this.hasEditedComment) {
      const [, , , i] = e.rect, [r] = this.pageDimensions, [a] = this.pageTranslation, o = a + r + 1, l = i - 100, h = o + 180;
      e.popup = {
        contents: this.comment.text,
        deleted: this.comment.deleted,
        rect: [o, l, h, i]
      };
    }
  }
  updateFromAnnotationLayer({
    popup: {
      contents: e,
      deleted: t
    }
  }) {
    n(this, Et).data = t ? null : e;
  }
  get parentBoundingClientRect() {
    return this.parent.boundingClientRect;
  }
  render() {
    const e = this.div = document.createElement("div");
    e.setAttribute("data-editor-rotation", (360 - this.rotation) % 360), e.className = this.name, e.setAttribute("id", this.id), e.tabIndex = n(this, zo) ? -1 : 0, e.setAttribute("role", "application"), this.defaultL10nId && e.setAttribute("data-l10n-id", this.defaultL10nId), this._isVisible || e.classList.add("hidden"), this.setInForeground(), w(this, Q, Jf).call(this);
    const [t, s] = this.parentDimensions;
    this.parentRotation % 180 !== 0 && (e.style.maxWidth = `${(100 * s / t).toFixed(2)}%`, e.style.maxHeight = `${(100 * t / s).toFixed(2)}%`);
    const [i, r] = this.getInitialTranslation();
    return this.translate(i, r), mm(this, e, ["keydown", "pointerdown", "dblclick"]), this.isResizable && this._uiManager._supportsPinchToZoom && (n(this, ia) || g(this, ia, new Ru({
      container: e,
      isPinchingDisabled: () => !this.isSelected,
      onPinchStart: w(this, Q, Nm).bind(this),
      onPinching: w(this, Q, Bm).bind(this),
      onPinchEnd: w(this, Q, Um).bind(this),
      signal: this._uiManager._signal
    }))), this.addStandaloneCommentButton(), this._uiManager._editorUndoBar?.hide(), e;
  }
  pointerdown(e) {
    const {
      isMac: t
    } = de.platform;
    if (e.button !== 0 || e.ctrlKey && t) {
      e.preventDefault();
      return;
    }
    if (g(this, ea, !0), this._isDraggable) {
      w(this, Q, Hm).call(this, e);
      return;
    }
    w(this, Q, Kf).call(this, e);
  }
  _onStartDragging() {
  }
  _onStopDragging() {
  }
  moveInDOM() {
    n(this, Si) && clearTimeout(n(this, Si)), g(this, Si, setTimeout(() => {
      g(this, Si, null), this.parent?.moveEditorInDOM(this);
    }, 0));
  }
  _setParentAndPosition(e, t, s) {
    e.changeParent(this), this.x = t, this.y = s, this.fixAndSetPosition(), this._onTranslated();
  }
  getRect(e, t, s = this.rotation) {
    const i = this.parentScale, [r, a] = this.pageDimensions, [o, l] = this.pageTranslation, h = e / i, d = t / i, u = this.x * r, f = this.y * a, p = this.width * r, m = this.height * a;
    switch (s) {
      case 0:
        return [u + h + o, a - f - d - m + l, u + h + p + o, a - f - d + l];
      case 90:
        return [u + d + o, a - f + h + l, u + d + m + o, a - f + h + p + l];
      case 180:
        return [u - h - p + o, a - f + d + l, u - h + o, a - f + d + m + l];
      case 270:
        return [u - d - m + o, a - f - h - p + l, u - d + o, a - f - h + l];
      default:
        throw new Error("Invalid rotation");
    }
  }
  getRectInCurrentCoords(e, t) {
    const [s, i, r, a] = e, o = r - s, l = a - i;
    switch (this.rotation) {
      case 0:
        return [s, t - a, o, l];
      case 90:
        return [s, t - i, l, o];
      case 180:
        return [r, t - i, o, l];
      case 270:
        return [r, t - a, l, o];
      default:
        throw new Error("Invalid rotation");
    }
  }
  getPDFRect() {
    return this.getRect(0, 0);
  }
  getNonHCMColor() {
    return this.color && it._colorManager.convert(this._uiManager.getNonHCMColor(this.color));
  }
  onUpdatedColor() {
    n(this, Et)?.onUpdatedColor();
  }
  getData() {
    const {
      comment: {
        text: e,
        color: t,
        date: s,
        opacity: i,
        deleted: r,
        richText: a
      },
      uid: o,
      pageIndex: l,
      creationDate: h,
      modificationDate: d
    } = this;
    return {
      id: o,
      pageIndex: l,
      rect: this.getPDFRect(),
      richText: a,
      contentsObj: {
        str: e
      },
      creationDate: h,
      modificationDate: s || d,
      popupRef: !r,
      color: t,
      opacity: i
    };
  }
  onceAdded(e) {
  }
  isEmpty() {
    return !1;
  }
  enableEditMode() {
    return this.isInEditMode() ? !1 : (this.parent.setEditingState(!1), g(this, sa, !0), !0);
  }
  disableEditMode() {
    return this.isInEditMode() ? (this.parent.setEditingState(!0), g(this, sa, !1), !0) : !1;
  }
  isInEditMode() {
    return n(this, sa);
  }
  shouldGetKeyboardEvents() {
    return n(this, nn);
  }
  needsToBeRebuilt() {
    return this.div && !this.isAttachedToDOM;
  }
  get isOnScreen() {
    const {
      top: e,
      left: t,
      bottom: s,
      right: i
    } = this.getClientDimensions(), {
      innerHeight: r,
      innerWidth: a
    } = window;
    return t < a && i > 0 && e < r && s > 0;
  }
  rebuild() {
    w(this, Q, Jf).call(this);
  }
  rotate(e) {
  }
  resize() {
  }
  serializeDeleted() {
    return {
      id: this.annotationElementId,
      deleted: !0,
      pageIndex: this.pageIndex,
      popupRef: this._initialData?.popupRef || ""
    };
  }
  serialize(e = !1, t = null) {
    return {
      annotationType: this.mode,
      pageIndex: this.pageIndex,
      rect: this.getPDFRect(),
      rotation: this.rotation,
      structTreeParentId: this._structTreeParentId,
      popupRef: this._initialData?.popupRef || ""
    };
  }
  static async deserialize(e, t, s) {
    const i = new this.prototype.constructor({
      parent: t,
      id: s.getId(),
      uiManager: s,
      annotationElementId: e.annotationElementId,
      creationDate: e.creationDate,
      modificationDate: e.modificationDate
    });
    i.rotation = e.rotation, g(i, qr, e.accessibilityData), i._isCopy = e.isCopy || !1;
    const [r, a] = i.pageDimensions, [o, l, h, d] = i.getRectInCurrentCoords(e.rect, a);
    return i.x = o / r, i.y = l / a, i.width = h / r, i.height = d / a, i;
  }
  get hasBeenModified() {
    return !!this.annotationElementId && (this.deleted || this.serialize() !== null);
  }
  remove() {
    if (n(this, ir)?.abort(), g(this, ir, null), this.isEmpty() || this.commit(), this.parent ? this.parent.remove(this) : this._uiManager.removeEditor(this), this.hideCommentPopup(), n(this, Si) && (clearTimeout(n(this, Si)), g(this, Si, null)), w(this, Q, fh).call(this), this.removeEditToolbar(), n(this, Us)) {
      for (const e of n(this, Us).values())
        clearTimeout(e);
      g(this, Us, null);
    }
    this.parent = null, n(this, ia)?.destroy(), g(this, ia, null), n(this, Bs)?.remove(), g(this, Bs, null);
  }
  get isResizable() {
    return !1;
  }
  makeResizable() {
    this.isResizable && (w(this, Q, Fm).call(this), n(this, Se).classList.remove("hidden"));
  }
  get toolbarPosition() {
    return null;
  }
  get commentButtonPosition() {
    return this._uiManager.direction === "ltr" ? [1, 0] : [0, 0];
  }
  get commentButtonPositionInPage() {
    const {
      commentButtonPosition: [e, t]
    } = this, [s, i, r, a] = this.getPDFRect();
    return [it._round(s + (r - s) * e), it._round(i + (a - i) * (1 - t))];
  }
  get commentButtonColor() {
    return this._uiManager.makeCommentColor(this.getNonHCMColor(), this.opacity);
  }
  get commentPopupPosition() {
    return n(this, Et).commentPopupPositionInLayer;
  }
  set commentPopupPosition(e) {
    n(this, Et).commentPopupPositionInLayer = e;
  }
  hasDefaultPopupPosition() {
    return n(this, Et).hasDefaultPopupPosition();
  }
  get commentButtonWidth() {
    return n(this, Et).commentButtonWidth;
  }
  get elementBeforePopup() {
    return this.div;
  }
  setCommentButtonStates(e) {
    n(this, Et)?.setCommentButtonStates(e);
  }
  keydown(e) {
    if (!this.isResizable || e.target !== this.div || e.key !== "Enter")
      return;
    this._uiManager.setSelected(this), g(this, sn, {
      savedX: this.x,
      savedY: this.y,
      savedWidth: this.width,
      savedHeight: this.height
    });
    const t = n(this, Se).children;
    if (!n(this, Ks)) {
      g(this, Ks, Array.from(t));
      const a = w(this, Q, $m).bind(this), o = w(this, Q, jm).bind(this), l = this._uiManager._signal;
      for (const h of n(this, Ks)) {
        const d = h.getAttribute("data-resizer-name");
        h.setAttribute("role", "spinbutton"), h.addEventListener("keydown", a, {
          signal: l
        }), h.addEventListener("blur", o, {
          signal: l
        }), h.addEventListener("focus", w(this, Q, Gm).bind(this, d), {
          signal: l
        }), h.setAttribute("data-l10n-id", it._l10nResizer[d]);
      }
    }
    const s = n(this, Ks)[0];
    let i = 0;
    for (const a of t) {
      if (a === s)
        break;
      i++;
    }
    const r = (360 - this.rotation + this.parentRotation) % 360 / 90 * (n(this, Ks).length / 4);
    if (r !== i) {
      if (r < i)
        for (let o = 0; o < i - r; o++)
          n(this, Se).append(n(this, Se).firstElementChild);
      else if (r > i)
        for (let o = 0; o < r - i; o++)
          n(this, Se).firstElementChild.before(n(this, Se).lastElementChild);
      let a = 0;
      for (const o of t) {
        const h = n(this, Ks)[a++].getAttribute("data-resizer-name");
        o.setAttribute("data-l10n-id", it._l10nResizer[h]);
      }
    }
    w(this, Q, Qf).call(this, 0), g(this, nn, !0), n(this, Se).firstElementChild.focus({
      focusVisible: !0
    }), e.preventDefault(), e.stopImmediatePropagation();
  }
  _resizeWithKeyboard(e, t) {
    n(this, nn) && w(this, Q, Yf).call(this, n(this, lc), {
      deltaX: e,
      deltaY: t,
      fromKeyboard: !0
    });
  }
  _stopResizingWithKeyboard() {
    w(this, Q, fh).call(this), this.div.focus();
  }
  select() {
    if (this.isSelected && this._editToolbar) {
      this._editToolbar.show();
      return;
    }
    if (this.isSelected = !0, this.makeResizable(), this.div?.classList.add("selectedEditor"), !this._editToolbar) {
      this.addEditToolbar().then(() => {
        this.div?.classList.contains("selectedEditor") && this._editToolbar?.show();
      });
      return;
    }
    this._editToolbar?.show(), n(this, Bt)?.toggleAltTextBadge(!1);
  }
  focus() {
    this.div && !this.div.contains(document.activeElement) && setTimeout(() => this.div?.focus({
      preventScroll: !0
    }), 0);
  }
  unselect() {
    this.isSelected && (this.isSelected = !1, n(this, Se)?.classList.add("hidden"), this.div?.classList.remove("selectedEditor"), this.div?.contains(document.activeElement) && this._uiManager.currentLayer.div.focus({
      preventScroll: !0
    }), this._editToolbar?.hide(), n(this, Bt)?.toggleAltTextBadge(!0), this.hideCommentPopup());
  }
  hideCommentPopup() {
    this.hasComment && this._uiManager.toggleComment(null);
  }
  updateParams(e, t) {
  }
  disableEditing() {
  }
  enableEditing() {
  }
  get canChangeContent() {
    return !1;
  }
  enterInEditMode() {
    this.canChangeContent && (this.enableEditMode(), this.div.focus());
  }
  dblclick(e) {
    e.target.nodeName !== "BUTTON" && (this.enterInEditMode(), this.parent.updateToolbar({
      mode: this.constructor._editorType,
      editId: this.uid
    }));
  }
  getElementForAltText() {
    return this.div;
  }
  get contentDiv() {
    return this.div;
  }
  get isEditing() {
    return n(this, hc);
  }
  set isEditing(e) {
    g(this, hc, e), this.parent && (e ? (this.parent.setSelected(this), this.parent.setActiveEditor(this)) : this.parent.setActiveEditor(null));
  }
  static get MIN_SIZE() {
    return 16;
  }
  static canCreateNewEmptyEditor() {
    return !0;
  }
  get telemetryInitialData() {
    return {
      action: "added"
    };
  }
  get telemetryFinalData() {
    return null;
  }
  _reportTelemetry(e, t = !1) {
    if (t) {
      n(this, Us) || g(this, Us, /* @__PURE__ */ new Map());
      const {
        action: s
      } = e;
      let i = n(this, Us).get(s);
      i && clearTimeout(i), i = setTimeout(() => {
        this._reportTelemetry(e), n(this, Us).delete(s), n(this, Us).size === 0 && g(this, Us, null);
      }, it._telemetryTimeout), n(this, Us).set(s, i);
      return;
    }
    e.type || (e.type = this.editorType), this._uiManager._eventBus.dispatch("reporttelemetry", {
      source: this,
      details: {
        type: "editing",
        data: e
      }
    });
  }
  show(e = this._isVisible) {
    this.div.classList.toggle("hidden", !e), this._isVisible = e;
  }
  enable() {
    this.div && (this.div.tabIndex = 0), g(this, zo, !1);
  }
  disable() {
    this.div && (this.div.tabIndex = -1), g(this, zo, !0);
  }
  updateFakeAnnotationElement(e) {
    if (!n(this, Bs) && !this.deleted) {
      g(this, Bs, e.addFakeAnnotation(this));
      return;
    }
    if (this.deleted) {
      n(this, Bs).remove(), g(this, Bs, null);
      return;
    }
    (this.hasEditedComment || this._hasBeenMoved || this._hasBeenResized) && n(this, Bs).updateEdited({
      rect: this.getPDFRect(),
      popup: this.comment
    });
  }
  renderAnnotationElement(e) {
    if (this.deleted)
      return e.hide(), null;
    let t = e.container.querySelector(".annotationContent");
    if (!t)
      t = document.createElement("div"), t.classList.add("annotationContent", this.editorType), e.container.prepend(t);
    else if (t.nodeName === "CANVAS") {
      const s = t;
      t = document.createElement("div"), t.classList.add("annotationContent", this.editorType), s.before(t);
    }
    return t;
  }
  resetAnnotationElement(e) {
    const {
      firstElementChild: t
    } = e.container;
    t?.nodeName === "DIV" && t.classList.contains("annotationContent") && t.remove();
  }
};
qr = new WeakMap(), Ks = new WeakMap(), Bt = new WeakMap(), Et = new WeakMap(), en = new WeakMap(), zo = new WeakMap(), sr = new WeakMap(), oc = new WeakMap(), Se = new WeakMap(), ta = new WeakMap(), sn = new WeakMap(), Bs = new WeakMap(), ir = new WeakMap(), lc = new WeakMap(), ea = new WeakMap(), ls = new WeakMap(), hc = new WeakMap(), sa = new WeakMap(), nn = new WeakMap(), Si = new WeakMap(), Xo = new WeakMap(), Yo = new WeakMap(), Us = new WeakMap(), ia = new WeakMap(), cc = new WeakMap(), Gu = new WeakMap(), Q = new WeakSet(), Vf = function([e, t], s, i) {
  [s, i] = this.screenToPageTranslation(s, i), this.x += s / e, this.y += i / t, this._onTranslating(this.x, this.y), this.fixAndSetPosition();
}, dc = new WeakSet(), zf = function(e, t, s) {
  switch (s) {
    case 90:
      return [t, -e];
    case 180:
      return [-e, -t];
    case 270:
      return [-t, e];
    default:
      return [e, t];
  }
}, Xd = function(e) {
  switch (e) {
    case 90: {
      const [t, s] = this.pageDimensions;
      return [0, -t / s, s / t, 0];
    }
    case 180:
      return [-1, 0, 0, -1];
    case 270: {
      const [t, s] = this.pageDimensions;
      return [0, t / s, -s / t, 0];
    }
    default:
      return [1, 0, 0, 1];
  }
}, Fm = function() {
  if (n(this, Se))
    return;
  g(this, Se, document.createElement("div")), n(this, Se).classList.add("resizers");
  const e = this._willKeepAspectRatio ? ["topLeft", "topRight", "bottomRight", "bottomLeft"] : ["topLeft", "topMiddle", "topRight", "middleRight", "bottomRight", "bottomMiddle", "bottomLeft", "middleLeft"], t = this._uiManager._signal;
  for (const s of e) {
    const i = document.createElement("div");
    n(this, Se).append(i), i.classList.add("resizer", s), i.setAttribute("data-resizer-name", s), i.addEventListener("pointerdown", w(this, Q, km).bind(this, s), {
      signal: t
    }), i.addEventListener("contextmenu", Vs, {
      signal: t
    }), i.tabIndex = -1;
  }
  this.div.prepend(n(this, Se));
}, km = function(e, t) {
  t.preventDefault();
  const {
    isMac: s
  } = de.platform;
  if (t.button !== 0 || t.ctrlKey && s)
    return;
  n(this, Bt)?.toggle(!1);
  const i = this._isDraggable;
  this._isDraggable = !1, g(this, ta, [t.screenX, t.screenY]);
  const r = new AbortController(), a = this._uiManager.combinedSignal(r);
  this.parent.togglePointerEvents(!1), window.addEventListener("pointermove", w(this, Q, Yf).bind(this, e), {
    passive: !0,
    capture: !0,
    signal: a
  }), window.addEventListener("touchmove", Kt, {
    passive: !1,
    signal: a
  }), window.addEventListener("contextmenu", Vs, {
    signal: a
  }), g(this, sn, {
    savedX: this.x,
    savedY: this.y,
    savedWidth: this.width,
    savedHeight: this.height
  });
  const o = this.parent.div.style.cursor, l = this.div.style.cursor;
  this.div.style.cursor = this.parent.div.style.cursor = window.getComputedStyle(t.target).cursor;
  const h = () => {
    r.abort(), this.parent.togglePointerEvents(!0), n(this, Bt)?.toggle(!0), this._isDraggable = i, this.parent.div.style.cursor = o, this.div.style.cursor = l, w(this, Q, Yd).call(this);
  };
  window.addEventListener("pointerup", h, {
    signal: a
  }), window.addEventListener("blur", h, {
    signal: a
  });
}, Xf = function(e, t, s, i) {
  this.width = s, this.height = i, this.x = e, this.y = t, this.setDims(), this.fixAndSetPosition(), this._onResized();
}, Yd = function() {
  if (!n(this, sn))
    return;
  const {
    savedX: e,
    savedY: t,
    savedWidth: s,
    savedHeight: i
  } = n(this, sn);
  g(this, sn, null);
  const r = this.x, a = this.y, o = this.width, l = this.height;
  r === e && a === t && o === s && l === i || this.addCommands({
    cmd: w(this, Q, Xf).bind(this, r, a, o, l),
    undo: w(this, Q, Xf).bind(this, e, t, s, i),
    mustExec: !0
  });
}, Yf = function(e, t) {
  const [s, i] = this.parentDimensions, r = this.x, a = this.y, o = this.width, l = this.height, h = it.MIN_SIZE / s, d = it.MIN_SIZE / i, u = w(this, Q, Xd).call(this, this.rotation), f = (B, k) => [u[0] * B + u[2] * k, u[1] * B + u[3] * k], p = w(this, Q, Xd).call(this, 360 - this.rotation), m = (B, k) => [p[0] * B + p[2] * k, p[1] * B + p[3] * k];
  let v, A, b = !1, E = !1;
  switch (e) {
    case "topLeft":
      b = !0, v = (B, k) => [0, 0], A = (B, k) => [B, k];
      break;
    case "topMiddle":
      v = (B, k) => [B / 2, 0], A = (B, k) => [B / 2, k];
      break;
    case "topRight":
      b = !0, v = (B, k) => [B, 0], A = (B, k) => [0, k];
      break;
    case "middleRight":
      E = !0, v = (B, k) => [B, k / 2], A = (B, k) => [0, k / 2];
      break;
    case "bottomRight":
      b = !0, v = (B, k) => [B, k], A = (B, k) => [0, 0];
      break;
    case "bottomMiddle":
      v = (B, k) => [B / 2, k], A = (B, k) => [B / 2, 0];
      break;
    case "bottomLeft":
      b = !0, v = (B, k) => [0, k], A = (B, k) => [B, 0];
      break;
    case "middleLeft":
      E = !0, v = (B, k) => [0, k / 2], A = (B, k) => [B, k / 2];
      break;
  }
  const S = v(o, l), T = A(o, l);
  let x = f(...T);
  const C = it._round(r + x[0]), I = it._round(a + x[1]);
  let M = 1, P = 1, O, D;
  if (t.fromKeyboard)
    ({
      deltaX: O,
      deltaY: D
    } = t);
  else {
    const {
      screenX: B,
      screenY: k
    } = t, [_, st] = n(this, ta);
    [O, D] = this.screenToPageTranslation(B - _, k - st), n(this, ta)[0] = B, n(this, ta)[1] = k;
  }
  if ([O, D] = m(O / s, D / i), b) {
    const B = Math.hypot(o, l);
    M = P = Math.max(Math.min(Math.hypot(T[0] - S[0] - O, T[1] - S[1] - D) / B, 1 / o, 1 / l), h / o, d / l);
  } else E ? M = Ae(Math.abs(T[0] - S[0] - O), h, 1) / o : P = Ae(Math.abs(T[1] - S[1] - D), d, 1) / l;
  const $ = it._round(o * M), F = it._round(l * P);
  x = f(...A($, F));
  const N = C - x[0], K = I - x[1];
  n(this, ls) || g(this, ls, [this.x, this.y, this.width, this.height]), this.width = $, this.height = F, this.x = N, this.y = K, this.setDims(), this.fixAndSetPosition(), this._onResizing();
}, Nm = function() {
  g(this, sn, {
    savedX: this.x,
    savedY: this.y,
    savedWidth: this.width,
    savedHeight: this.height
  }), n(this, Bt)?.toggle(!1), this.parent.togglePointerEvents(!1);
}, Bm = function(e, t, s) {
  let r = 0.7 * (s / t) + 1 - 0.7;
  if (r === 1)
    return;
  const a = w(this, Q, Xd).call(this, this.rotation), o = (C, I) => [a[0] * C + a[2] * I, a[1] * C + a[3] * I], [l, h] = this.parentDimensions, d = this.x, u = this.y, f = this.width, p = this.height, m = it.MIN_SIZE / l, v = it.MIN_SIZE / h;
  r = Math.max(Math.min(r, 1 / f, 1 / p), m / f, v / p);
  const A = it._round(f * r), b = it._round(p * r);
  if (A === f && b === p)
    return;
  n(this, ls) || g(this, ls, [d, u, f, p]);
  const E = o(f / 2, p / 2), S = it._round(d + E[0]), T = it._round(u + E[1]), x = o(A / 2, b / 2);
  this.x = S - x[0], this.y = T - x[1], this.width = A, this.height = b, this.setDims(), this.fixAndSetPosition(), this._onResizing();
}, Um = function() {
  n(this, Bt)?.toggle(!0), this.parent.togglePointerEvents(!0), w(this, Q, Yd).call(this);
}, Kf = function(e) {
  const {
    isMac: t
  } = de.platform;
  e.ctrlKey && !t || e.shiftKey || e.metaKey && t ? this.parent.toggleSelected(this) : this.parent.setSelected(this);
}, Hm = function(e) {
  const {
    isSelected: t
  } = this;
  this._uiManager.setUpDragSession();
  let s = !1;
  const i = new AbortController(), r = this._uiManager.combinedSignal(i), a = {
    capture: !0,
    passive: !1,
    signal: r
  }, o = (h) => {
    i.abort(), g(this, sr, null), g(this, ea, !1), this._uiManager.endDragSession() || w(this, Q, Kf).call(this, h), s && this._onStopDragging();
  };
  t && (g(this, Xo, e.clientX), g(this, Yo, e.clientY), g(this, sr, e.pointerId), g(this, oc, e.pointerType), window.addEventListener("pointermove", (h) => {
    s || (s = !0, this._uiManager.toggleComment(this, !0, !1), this._onStartDragging());
    const {
      clientX: d,
      clientY: u,
      pointerId: f
    } = h;
    if (f !== n(this, sr)) {
      Kt(h);
      return;
    }
    const [p, m] = this.screenToPageTranslation(d - n(this, Xo), u - n(this, Yo));
    g(this, Xo, d), g(this, Yo, u), this._uiManager.dragSelectedEditors(p, m);
  }, a), window.addEventListener("touchmove", Kt, a), window.addEventListener("pointerdown", (h) => {
    h.pointerType === n(this, oc) && (n(this, ia) || h.isPrimary) && o(h), Kt(h);
  }, a));
  const l = (h) => {
    if (!n(this, sr) || n(this, sr) === h.pointerId) {
      o(h);
      return;
    }
    Kt(h);
  };
  window.addEventListener("pointerup", l, {
    signal: r
  }), window.addEventListener("blur", l, {
    signal: r
  });
}, Jf = function() {
  if (n(this, ir) || !this.div)
    return;
  g(this, ir, new AbortController());
  const e = this._uiManager.combinedSignal(n(this, ir));
  this.div.addEventListener("focusin", this.focusin.bind(this), {
    signal: e
  }), this.div.addEventListener("focusout", this.focusout.bind(this), {
    signal: e
  });
}, $m = function(e) {
  it._resizerKeyboardManager.exec(this, e);
}, jm = function(e) {
  n(this, nn) && e.relatedTarget?.parentNode !== n(this, Se) && w(this, Q, fh).call(this);
}, Gm = function(e) {
  g(this, lc, n(this, nn) ? e : "");
}, Qf = function(e) {
  if (n(this, Ks))
    for (const t of n(this, Ks))
      t.tabIndex = e;
}, fh = function() {
  g(this, nn, !1), w(this, Q, Qf).call(this, -1), w(this, Q, Yd).call(this);
}, y(it, dc), R(it, "_l10n", null), R(it, "_l10nResizer", null), R(it, "_borderLineWidth", -1), R(it, "_colorManager", new Hf()), R(it, "_zIndex", 1), R(it, "_telemetryTimeout", 1e3);
let kt = it;
class eb extends kt {
  constructor(e) {
    super(e), this.annotationElementId = e.annotationElementId, this.deleted = !0;
  }
  serialize() {
    return this.serializeDeleted();
  }
}
const kg = 3285377520, Ps = 4294901760, fi = 65535;
class _m {
  constructor(e) {
    this.h1 = e ? e & 4294967295 : kg, this.h2 = e ? e & 4294967295 : kg;
  }
  update(e) {
    let t, s;
    if (typeof e == "string") {
      t = new Uint8Array(e.length * 2), s = 0;
      for (let v = 0, A = e.length; v < A; v++) {
        const b = e.charCodeAt(v);
        b <= 255 ? t[s++] = b : (t[s++] = b >>> 8, t[s++] = b & 255);
      }
    } else if (ArrayBuffer.isView(e))
      t = e.slice(), s = t.byteLength;
    else
      throw new Error("Invalid data format, must be a string or TypedArray.");
    const i = s >> 2, r = s - i * 4, a = new Uint32Array(t.buffer, 0, i);
    let o = 0, l = 0, h = this.h1, d = this.h2;
    const u = 3432918353, f = 461845907, p = u & fi, m = f & fi;
    for (let v = 0; v < i; v++)
      v & 1 ? (o = a[v], o = o * u & Ps | o * p & fi, o = o << 15 | o >>> 17, o = o * f & Ps | o * m & fi, h ^= o, h = h << 13 | h >>> 19, h = h * 5 + 3864292196) : (l = a[v], l = l * u & Ps | l * p & fi, l = l << 15 | l >>> 17, l = l * f & Ps | l * m & fi, d ^= l, d = d << 13 | d >>> 19, d = d * 5 + 3864292196);
    switch (o = 0, r) {
      case 3:
        o ^= t[i * 4 + 2] << 16;
      case 2:
        o ^= t[i * 4 + 1] << 8;
      case 1:
        o ^= t[i * 4], o = o * u & Ps | o * p & fi, o = o << 15 | o >>> 17, o = o * f & Ps | o * m & fi, i & 1 ? h ^= o : d ^= o;
    }
    this.h1 = h, this.h2 = d;
  }
  hexdigest() {
    let e = this.h1, t = this.h2;
    return e ^= t >>> 1, e = e * 3981806797 & Ps | e * 36045 & fi, t = t * 4283543511 & Ps | ((t << 16 | e >>> 16) * 2950163797 & Ps) >>> 16, e ^= t >>> 1, e = e * 444984403 & Ps | e * 60499 & fi, t = t * 3301882366 & Ps | ((t << 16 | e >>> 16) * 3120437893 & Ps) >>> 16, e ^= t >>> 1, (e >>> 0).toString(16).padStart(8, "0") + (t >>> 0).toString(16).padStart(8, "0");
  }
}
const Bh = Object.freeze({
  map: null,
  hash: "",
  transfer: void 0
});
var na, ra, rn, xe, _u, Wm;
class dg {
  constructor() {
    y(this, _u);
    y(this, na, !1);
    y(this, ra, null);
    y(this, rn, null);
    y(this, xe, /* @__PURE__ */ new Map());
    R(this, "onSetModified", null);
    R(this, "onResetModified", null);
    R(this, "onAnnotationEditor", null);
  }
  getValue(e, t) {
    const s = n(this, xe).get(e);
    return s === void 0 ? t : Object.assign(t, s);
  }
  getRawValue(e) {
    return n(this, xe).get(e);
  }
  remove(e) {
    const t = n(this, xe).get(e);
    t !== void 0 && (t instanceof kt && n(this, rn).delete(t.annotationElementId), n(this, xe).delete(e), n(this, xe).size === 0 && this.resetModified(), !n(this, xe).values().some((s) => s instanceof kt) && this.onAnnotationEditor?.(null));
  }
  setValue(e, t) {
    const s = n(this, xe).get(e);
    let i = !1;
    if (s !== void 0)
      for (const [r, a] of Object.entries(t))
        s[r] !== a && (i = !0, s[r] = a);
    else
      i = !0, n(this, xe).set(e, t);
    i && w(this, _u, Wm).call(this), t instanceof kt && ((n(this, rn) || g(this, rn, /* @__PURE__ */ new Map())).set(t.annotationElementId, t), this.onAnnotationEditor?.(t.constructor._type));
  }
  has(e) {
    return n(this, xe).has(e);
  }
  get size() {
    return n(this, xe).size;
  }
  resetModified() {
    n(this, na) && (g(this, na, !1), this.onResetModified?.());
  }
  get print() {
    return new Vm(this);
  }
  get serializable() {
    if (n(this, xe).size === 0)
      return Bh;
    const e = /* @__PURE__ */ new Map(), t = new _m(), s = [], i = /* @__PURE__ */ Object.create(null);
    let r = !1;
    for (const [a, o] of n(this, xe)) {
      const l = o instanceof kt ? o.serialize(!1, i) : o;
      o.page && (o.pageIndex = o.page._pageIndex, delete o.page), l && (e.set(a, l), t.update(`${a}:${JSON.stringify(l)}`), r || (r = !!l.bitmap));
    }
    if (r)
      for (const a of e.values())
        a.bitmap && s.push(a.bitmap);
    return e.size > 0 ? {
      map: e,
      hash: t.hexdigest(),
      transfer: s
    } : Bh;
  }
  get editorStats() {
    let e = null;
    const t = /* @__PURE__ */ new Map();
    let s = 0, i = 0;
    for (const r of n(this, xe).values()) {
      if (!(r instanceof kt)) {
        r.popup && (r.popup.deleted ? i += 1 : s += 1);
        continue;
      }
      r.isCommentDeleted ? i += 1 : r.hasEditedComment && (s += 1);
      const a = r.telemetryFinalData;
      if (!a)
        continue;
      const {
        type: o
      } = a;
      t.has(o) || t.set(o, Object.getPrototypeOf(r).constructor), e || (e = /* @__PURE__ */ Object.create(null));
      const l = e[o] || (e[o] = /* @__PURE__ */ new Map());
      for (const [h, d] of Object.entries(a)) {
        if (h === "type")
          continue;
        const u = l.getOrInsertComputed(h, og);
        u.set(d, (u.get(d) ?? 0) + 1);
      }
    }
    if ((i > 0 || s > 0) && (e || (e = /* @__PURE__ */ Object.create(null)), e.comments = {
      deleted: i,
      edited: s
    }), !e)
      return null;
    for (const [r, a] of t)
      e[r] = a.computeTelemetryFinalData(e[r]);
    return e;
  }
  resetModifiedIds() {
    g(this, ra, null);
  }
  updateEditor(e, t) {
    const s = n(this, rn)?.get(e);
    return s ? (s.updateFromAnnotationLayer(t), !0) : !1;
  }
  getEditor(e) {
    return n(this, rn)?.get(e) || null;
  }
  get modifiedIds() {
    if (n(this, ra))
      return n(this, ra);
    const e = [];
    if (n(this, rn))
      for (const t of n(this, rn).values())
        t.serialize() && e.push(t.annotationElementId);
    return g(this, ra, {
      ids: new Set(e),
      hash: e.join(",")
    });
  }
  [Symbol.iterator]() {
    return n(this, xe).entries();
  }
}
na = new WeakMap(), ra = new WeakMap(), rn = new WeakMap(), xe = new WeakMap(), _u = new WeakSet(), Wm = function() {
  n(this, na) || (g(this, na, !0), this.onSetModified?.());
};
var uc;
class Vm extends dg {
  constructor(t) {
    super();
    y(this, uc, Bh);
    const {
      serializable: s
    } = t;
    if (s === Bh)
      return;
    const {
      map: i,
      hash: r,
      transfer: a
    } = s, o = structuredClone(i, a ? {
      transfer: a
    } : null);
    g(this, uc, {
      map: o,
      hash: r,
      transfer: []
    });
  }
  get print() {
    bt("Should not call PrintAnnotationStorage.print");
  }
  get serializable() {
    return n(this, uc);
  }
  get modifiedIds() {
    return nt(this, "modifiedIds", {
      ids: /* @__PURE__ */ new Set(),
      hash: ""
    });
  }
}
uc = new WeakMap();
q(7588);
const uo = "__forcedDependency", {
  floor: Ng,
  ceil: Bg
} = Math;
function Ug(c, e, t, s, i, r) {
  c[e * 4 + 0] = Math.min(c[e * 4 + 0], t), c[e * 4 + 1] = Math.min(c[e * 4 + 1], s), c[e * 4 + 2] = Math.max(c[e * 4 + 2], i), c[e * 4 + 3] = Math.max(c[e * 4 + 3], r);
}
const Zf = new Uint32Array(new Uint8Array([255, 255, 0, 0]).buffer)[0];
var Ko, nr;
class sb {
  constructor(e, t) {
    y(this, Ko);
    y(this, nr);
    g(this, Ko, e), g(this, nr, t);
  }
  get length() {
    return n(this, Ko).length;
  }
  isEmpty(e) {
    return n(this, Ko)[e] === Zf;
  }
  minX(e) {
    return n(this, nr)[e * 4 + 0] / 256;
  }
  minY(e) {
    return n(this, nr)[e * 4 + 1] / 256;
  }
  maxX(e) {
    return (n(this, nr)[e * 4 + 2] + 1) / 256;
  }
  maxY(e) {
    return (n(this, nr)[e * 4 + 3] + 1) / 256;
  }
}
Ko = new WeakMap(), nr = new WeakMap();
const Hg = (c, e) => c?.getOrInsertComputed(e, () => ({
  dependencies: /* @__PURE__ */ new Set(),
  isRenderingOperation: !1
}));
var an, yt, Tt, aa, oa, la, ke, fc, qf;
class ib {
  constructor(e, t) {
    y(this, fc);
    y(this, an, [[1, 0, 0, 1, 0, 0]]);
    y(this, yt, [-1 / 0, -1 / 0, 1 / 0, 1 / 0]);
    y(this, Tt, new Float64Array([1 / 0, 1 / 0, -1 / 0, -1 / 0]));
    R(this, "_pendingBBoxIdx", -1);
    y(this, aa);
    y(this, oa);
    y(this, la);
    y(this, ke);
    R(this, "_savesStack", []);
    R(this, "_markedContentStack", []);
    g(this, aa, e.width), g(this, oa, e.height), w(this, fc, qf).call(this, t);
  }
  growOperationsCount(e) {
    e >= n(this, ke).length && w(this, fc, qf).call(this, e, n(this, ke));
  }
  get clipBox() {
    return n(this, yt);
  }
  save(e) {
    return g(this, yt, {
      __proto__: n(this, yt)
    }), this._savesStack.push(e), this;
  }
  restore(e, t) {
    const s = Object.getPrototypeOf(n(this, yt));
    if (s === null)
      return this;
    g(this, yt, s);
    const i = this._savesStack.pop();
    return i !== void 0 && (t?.(i, e), n(this, ke)[e] = n(this, ke)[i]), this;
  }
  recordOpenMarker(e) {
    return this._savesStack.push(e), this;
  }
  getOpenMarker() {
    return this._savesStack.length === 0 ? null : this._savesStack.at(-1);
  }
  recordCloseMarker(e, t) {
    const s = this._savesStack.pop();
    return s !== void 0 && (t?.(s, e), n(this, ke)[e] = n(this, ke)[s]), this;
  }
  beginMarkedContent(e) {
    return this._markedContentStack.push(e), this;
  }
  endMarkedContent(e, t) {
    const s = this._markedContentStack.pop();
    return s !== void 0 && (t?.(s, e), n(this, ke)[e] = n(this, ke)[s]), this;
  }
  pushBaseTransform(e) {
    return n(this, an).push(j.multiplyByDOMMatrix(n(this, an).at(-1), e.getTransform())), this;
  }
  popBaseTransform() {
    return n(this, an).length > 1 && n(this, an).pop(), this;
  }
  resetBBox(e) {
    return this._pendingBBoxIdx !== e && (this._pendingBBoxIdx = e, n(this, Tt)[0] = 1 / 0, n(this, Tt)[1] = 1 / 0, n(this, Tt)[2] = -1 / 0, n(this, Tt)[3] = -1 / 0), this;
  }
  recordClipBox(e, t, s, i, r, a) {
    const o = j.multiplyByDOMMatrix(n(this, an).at(-1), t.getTransform()), l = [1 / 0, 1 / 0, -1 / 0, -1 / 0];
    j.axialAlignedBoundingBox([s, r, i, a], o, l);
    const h = j.intersect(n(this, yt), l);
    return h ? (n(this, yt)[0] = h[0], n(this, yt)[1] = h[1], n(this, yt)[2] = h[2], n(this, yt)[3] = h[3]) : (n(this, yt)[0] = n(this, yt)[1] = 1 / 0, n(this, yt)[2] = n(this, yt)[3] = -1 / 0), this;
  }
  recordBBox(e, t, s, i, r, a) {
    const o = n(this, yt);
    if (o[0] === 1 / 0)
      return this;
    const l = j.multiplyByDOMMatrix(n(this, an).at(-1), t.getTransform());
    if (o[0] === -1 / 0)
      return j.axialAlignedBoundingBox([s, r, i, a], l, n(this, Tt)), this;
    const h = [1 / 0, 1 / 0, -1 / 0, -1 / 0];
    return j.axialAlignedBoundingBox([s, r, i, a], l, h), n(this, Tt)[0] = Math.min(n(this, Tt)[0], Math.max(h[0], o[0])), n(this, Tt)[1] = Math.min(n(this, Tt)[1], Math.max(h[1], o[1])), n(this, Tt)[2] = Math.max(n(this, Tt)[2], Math.min(h[2], o[2])), n(this, Tt)[3] = Math.max(n(this, Tt)[3], Math.min(h[3], o[3])), this;
  }
  recordFullPageBBox(e) {
    return n(this, Tt)[0] = Math.max(0, n(this, yt)[0]), n(this, Tt)[1] = Math.max(0, n(this, yt)[1]), n(this, Tt)[2] = Math.min(n(this, aa), n(this, yt)[2]), n(this, Tt)[3] = Math.min(n(this, oa), n(this, yt)[3]), this;
  }
  recordOperation(e, t = !1, s) {
    if (this._pendingBBoxIdx !== e)
      return this;
    const i = Ng(n(this, Tt)[0] * 256 / n(this, aa)), r = Ng(n(this, Tt)[1] * 256 / n(this, oa)), a = Bg(n(this, Tt)[2] * 256 / n(this, aa)), o = Bg(n(this, Tt)[3] * 256 / n(this, oa));
    if (Ug(n(this, la), e, i, r, a, o), s)
      for (const l of s)
        for (const h of l)
          h !== e && Ug(n(this, la), h, i, r, a, o);
    return t || (this._pendingBBoxIdx = -1), this;
  }
  bboxToClipBoxDropOperation(e) {
    return this._pendingBBoxIdx === e && (this._pendingBBoxIdx = -1, n(this, yt)[0] = Math.max(n(this, yt)[0], n(this, Tt)[0]), n(this, yt)[1] = Math.max(n(this, yt)[1], n(this, Tt)[1]), n(this, yt)[2] = Math.min(n(this, yt)[2], n(this, Tt)[2]), n(this, yt)[3] = Math.min(n(this, yt)[3], n(this, Tt)[3])), this;
  }
  take() {
    return new sb(n(this, ke), n(this, la));
  }
  takeDebugMetadata() {
    throw new Error("Unreachable");
  }
  recordSimpleData(e, t) {
    return this;
  }
  recordIncrementalData(e, t) {
    return this;
  }
  resetIncrementalData(e, t) {
    return this;
  }
  recordNamedData(e, t) {
    return this;
  }
  recordSimpleDataFromNamed(e, t, s) {
    return this;
  }
  recordFutureForcedDependency(e, t) {
    return this;
  }
  inheritSimpleDataAsFutureForcedDependencies(e) {
    return this;
  }
  inheritPendingDependenciesAsFutureForcedDependencies() {
    return this;
  }
  recordCharacterBBox(e, t, s, i = 1, r = 0, a = 0, o) {
    return this;
  }
  getSimpleIndex(e) {
  }
  recordDependencies(e, t) {
    return this;
  }
  recordNamedDependency(e, t) {
    return this;
  }
  recordShowTextOperation(e, t = !1) {
    return this;
  }
}
an = new WeakMap(), yt = new WeakMap(), Tt = new WeakMap(), aa = new WeakMap(), oa = new WeakMap(), la = new WeakMap(), ke = new WeakMap(), fc = new WeakSet(), qf = function(e, t) {
  const s = new ArrayBuffer(e * 4);
  g(this, la, new Uint8ClampedArray(s)), g(this, ke, new Uint32Array(s)), t && t.length > 0 ? (n(this, ke).set(t), n(this, ke).fill(Zf, t.length)) : n(this, ke).fill(Zf);
};
var Ze, qe, ha, Js, Jo, rr, ar, Ct;
class nb {
  constructor(e, t = !1) {
    y(this, Ze, {
      __proto__: null
    });
    y(this, qe, {
      __proto__: null,
      transform: [],
      moveText: [],
      sameLineText: [],
      [uo]: []
    });
    y(this, ha, /* @__PURE__ */ new Map());
    y(this, Js, /* @__PURE__ */ new Set());
    y(this, Jo, /* @__PURE__ */ new Map());
    y(this, rr);
    y(this, ar);
    y(this, Ct);
    g(this, Ct, e), t && (g(this, rr, /* @__PURE__ */ new Map()), g(this, ar, (s, i) => {
      Hg(n(this, rr), i).dependencies.add(s);
    }));
  }
  get clipBox() {
    return n(this, Ct).clipBox;
  }
  growOperationsCount(e) {
    n(this, Ct).growOperationsCount(e);
  }
  save(e) {
    return g(this, Ze, {
      __proto__: n(this, Ze)
    }), g(this, qe, {
      __proto__: n(this, qe),
      transform: {
        __proto__: n(this, qe).transform
      },
      moveText: {
        __proto__: n(this, qe).moveText
      },
      sameLineText: {
        __proto__: n(this, qe).sameLineText
      },
      [uo]: {
        __proto__: n(this, qe)[uo]
      }
    }), n(this, Ct).save(e), this;
  }
  restore(e) {
    n(this, Ct).restore(e, n(this, ar));
    const t = Object.getPrototypeOf(n(this, Ze));
    return t === null ? this : (g(this, Ze, t), g(this, qe, Object.getPrototypeOf(n(this, qe))), this);
  }
  recordOpenMarker(e) {
    return n(this, Ct).recordOpenMarker(e, n(this, ar)), this;
  }
  getOpenMarker() {
    return n(this, Ct).getOpenMarker();
  }
  recordCloseMarker(e) {
    return n(this, Ct).recordCloseMarker(e, n(this, ar)), this;
  }
  beginMarkedContent(e) {
    return n(this, Ct).beginMarkedContent(e), this;
  }
  endMarkedContent(e) {
    return n(this, Ct).endMarkedContent(e, n(this, ar)), this;
  }
  pushBaseTransform(e) {
    return n(this, Ct).pushBaseTransform(e), this;
  }
  popBaseTransform() {
    return n(this, Ct).popBaseTransform(), this;
  }
  recordSimpleData(e, t) {
    return n(this, Ze)[e] = t, this;
  }
  recordIncrementalData(e, t) {
    return n(this, qe)[e].push(t), this;
  }
  resetIncrementalData(e, t) {
    return n(this, qe)[e].length = 0, this;
  }
  recordNamedData(e, t) {
    return n(this, ha).set(e, t), this;
  }
  recordSimpleDataFromNamed(e, t, s) {
    n(this, Ze)[e] = n(this, ha).get(t) ?? s;
  }
  recordFutureForcedDependency(e, t) {
    return this.recordIncrementalData(uo, t), this;
  }
  inheritSimpleDataAsFutureForcedDependencies(e) {
    for (const t of e)
      t in n(this, Ze) && this.recordFutureForcedDependency(t, n(this, Ze)[t]);
    return this;
  }
  inheritPendingDependenciesAsFutureForcedDependencies() {
    for (const e of n(this, Js))
      this.recordFutureForcedDependency(uo, e);
    return this;
  }
  resetBBox(e) {
    return n(this, Ct).resetBBox(e), this;
  }
  recordClipBox(e, t, s, i, r, a) {
    return n(this, Ct).recordClipBox(e, t, s, i, r, a), this;
  }
  recordBBox(e, t, s, i, r, a) {
    return n(this, Ct).recordBBox(e, t, s, i, r, a), this;
  }
  recordCharacterBBox(e, t, s, i = 1, r = 0, a = 0, o) {
    const l = s.bbox;
    let h, d;
    if (l && (h = l[2] !== l[0] && l[3] !== l[1] && n(this, Jo).get(s), h !== !1 && (d = [0, 0, 0, 0], j.axialAlignedBoundingBox(l, s.fontMatrix, d), (i !== 1 || r !== 0 || a !== 0) && j.scaleMinMax([i, 0, 0, -i, r, a], d), h)))
      return this.recordBBox(e, t, d[0], d[2], d[1], d[3]);
    if (!o)
      return this.recordFullPageBBox(e);
    const u = o();
    return l && d && h === void 0 && (h = d[0] <= r - u.actualBoundingBoxLeft && d[2] >= r + u.actualBoundingBoxRight && d[1] <= a - u.actualBoundingBoxAscent && d[3] >= a + u.actualBoundingBoxDescent, n(this, Jo).set(s, h), h) ? this.recordBBox(e, t, d[0], d[2], d[1], d[3]) : this.recordBBox(e, t, r - u.actualBoundingBoxLeft, r + u.actualBoundingBoxRight, a - u.actualBoundingBoxAscent, a + u.actualBoundingBoxDescent);
  }
  recordFullPageBBox(e) {
    return n(this, Ct).recordFullPageBBox(e), this;
  }
  getSimpleIndex(e) {
    return n(this, Ze)[e];
  }
  recordDependencies(e, t) {
    const s = n(this, Js), i = n(this, Ze), r = n(this, qe);
    for (const a of t)
      a in n(this, Ze) ? s.add(i[a]) : a in r && r[a].forEach(s.add, s);
    return this;
  }
  recordNamedDependency(e, t) {
    return n(this, ha).has(t) && n(this, Js).add(n(this, ha).get(t)), this;
  }
  recordOperation(e, t = !1) {
    if (this.recordDependencies(e, [uo]), n(this, rr)) {
      const i = Hg(n(this, rr), e), {
        dependencies: r
      } = i;
      n(this, Js).forEach(r.add, r), n(this, Ct)._savesStack.forEach(r.add, r), n(this, Ct)._markedContentStack.forEach(r.add, r), r.delete(e), i.isRenderingOperation = !0;
    }
    const s = !t && e === n(this, Ct)._pendingBBoxIdx;
    return n(this, Ct).recordOperation(e, t, [n(this, Js), n(this, Ct)._savesStack, n(this, Ct)._markedContentStack]), s && n(this, Js).clear(), this;
  }
  recordShowTextOperation(e, t = !1) {
    const s = Array.from(n(this, Js));
    this.recordOperation(e, t), this.recordIncrementalData("sameLineText", e);
    for (const i of s)
      this.recordIncrementalData("sameLineText", i);
    return this;
  }
  bboxToClipBoxDropOperation(e, t = !1) {
    const s = !t && e === n(this, Ct)._pendingBBoxIdx;
    return n(this, Ct).bboxToClipBoxDropOperation(e), s && n(this, Js).clear(), this;
  }
  take() {
    return n(this, Jo).clear(), n(this, Ct).take();
  }
  takeDebugMetadata() {
    return n(this, rr);
  }
}
Ze = new WeakMap(), qe = new WeakMap(), ha = new WeakMap(), Js = new WeakMap(), Jo = new WeakMap(), rr = new WeakMap(), ar = new WeakMap(), Ct = new WeakMap();
var It, zt, Qs, Qo, Zo;
const wg = class wg {
  constructor(e, t, s) {
    y(this, It);
    y(this, zt);
    y(this, Qs);
    y(this, Qo, 0);
    y(this, Zo, 0);
    if (e instanceof wg && n(e, Qs) === !!s)
      return e;
    g(this, It, e), g(this, zt, t), g(this, Qs, !!s);
  }
  get clipBox() {
    return n(this, It).clipBox;
  }
  growOperationsCount() {
    throw new Error("Unreachable");
  }
  save(e) {
    return ee(this, Zo)._++, n(this, It).save(n(this, zt)), this;
  }
  restore(e) {
    return n(this, Zo) > 0 && (n(this, It).restore(n(this, zt)), ee(this, Zo)._--), this;
  }
  recordOpenMarker(e) {
    return ee(this, Qo)._++, this;
  }
  getOpenMarker() {
    return n(this, Qo) > 0 ? n(this, zt) : n(this, It).getOpenMarker();
  }
  recordCloseMarker(e) {
    return ee(this, Qo)._--, this;
  }
  beginMarkedContent(e) {
    return this;
  }
  endMarkedContent(e) {
    return this;
  }
  pushBaseTransform(e) {
    return n(this, It).pushBaseTransform(e), this;
  }
  popBaseTransform() {
    return n(this, It).popBaseTransform(), this;
  }
  recordSimpleData(e, t) {
    return n(this, It).recordSimpleData(e, n(this, zt)), this;
  }
  recordIncrementalData(e, t) {
    return n(this, It).recordIncrementalData(e, n(this, zt)), this;
  }
  resetIncrementalData(e, t) {
    return n(this, It).resetIncrementalData(e, n(this, zt)), this;
  }
  recordNamedData(e, t) {
    return this;
  }
  recordSimpleDataFromNamed(e, t, s) {
    return n(this, It).recordSimpleDataFromNamed(e, t, n(this, zt)), this;
  }
  recordFutureForcedDependency(e, t) {
    return n(this, It).recordFutureForcedDependency(e, n(this, zt)), this;
  }
  inheritSimpleDataAsFutureForcedDependencies(e) {
    return n(this, It).inheritSimpleDataAsFutureForcedDependencies(e), this;
  }
  inheritPendingDependenciesAsFutureForcedDependencies() {
    return n(this, It).inheritPendingDependenciesAsFutureForcedDependencies(), this;
  }
  resetBBox(e) {
    return n(this, Qs) || n(this, It).resetBBox(n(this, zt)), this;
  }
  recordClipBox(e, t, s, i, r, a) {
    return n(this, Qs) || n(this, It).recordClipBox(n(this, zt), t, s, i, r, a), this;
  }
  recordBBox(e, t, s, i, r, a) {
    return n(this, Qs) || n(this, It).recordBBox(n(this, zt), t, s, i, r, a), this;
  }
  recordCharacterBBox(e, t, s, i, r, a, o) {
    return n(this, Qs) || n(this, It).recordCharacterBBox(n(this, zt), t, s, i, r, a, o), this;
  }
  recordFullPageBBox(e) {
    return n(this, Qs) || n(this, It).recordFullPageBBox(n(this, zt)), this;
  }
  getSimpleIndex(e) {
    return n(this, It).getSimpleIndex(e);
  }
  recordDependencies(e, t) {
    return n(this, It).recordDependencies(n(this, zt), t), this;
  }
  recordNamedDependency(e, t) {
    return n(this, It).recordNamedDependency(n(this, zt), t), this;
  }
  recordOperation(e) {
    return n(this, It).recordOperation(n(this, zt), !0), this;
  }
  recordShowTextOperation(e) {
    return n(this, It).recordShowTextOperation(n(this, zt), !0), this;
  }
  bboxToClipBoxDropOperation(e) {
    return n(this, Qs) || n(this, It).bboxToClipBoxDropOperation(n(this, zt), !0), this;
  }
  take() {
    throw new Error("Unreachable");
  }
  takeDebugMetadata() {
    throw new Error("Unreachable");
  }
};
It = new WeakMap(), zt = new WeakMap(), Qs = new WeakMap(), Qo = new WeakMap(), Zo = new WeakMap();
let Du = wg;
const Rs = {
  stroke: ["path", "transform", "filter", "strokeColor", "strokeAlpha", "lineWidth", "lineCap", "lineJoin", "miterLimit", "dash"],
  fill: ["path", "transform", "filter", "fillColor", "fillAlpha", "globalCompositeOperation", "SMask"],
  imageXObject: ["transform", "SMask", "filter", "fillAlpha", "strokeAlpha", "globalCompositeOperation"],
  rawFillPath: ["filter", "fillColor", "fillAlpha"],
  showText: ["transform", "leading", "charSpacing", "wordSpacing", "hScale", "textRise", "moveText", "textMatrix", "font", "fontObj", "filter", "fillColor", "textRenderingMode", "SMask", "fillAlpha", "strokeAlpha", "globalCompositeOperation", "sameLineText"],
  transform: ["transform"],
  transformAndFill: ["transform", "fillColor"]
};
var ca, da, ua, fa, pa, pc;
const Oh = class Oh {
  constructor(e) {
    y(this, ca);
    y(this, da);
    y(this, ua, 4);
    y(this, fa, 0);
    y(this, pa, new (n(Oh, pc))(n(this, ua) * 6));
    g(this, ca, e.width), g(this, da, e.height);
  }
  record(e, t, s, i) {
    if (n(this, fa) === n(this, ua)) {
      g(this, ua, n(this, ua) * 2);
      const o = new (n(Oh, pc))(n(this, ua) * 6);
      o.set(n(this, pa)), g(this, pa, o);
    }
    const r = j.domMatrixToTransform(e.getTransform());
    let a;
    if (i[0] !== 1 / 0) {
      const o = [1 / 0, 1 / 0, -1 / 0, -1 / 0];
      j.axialAlignedBoundingBox([0, -s, t, 0], r, o);
      const l = j.intersect(i, o);
      if (!l)
        return;
      const [h, d, u, f] = l;
      if (h !== o[0] || d !== o[1] || u !== o[2] || f !== o[3]) {
        const p = Math.atan2(r[1], r[0]), m = Math.abs(Math.sin(p)), v = Math.abs(Math.cos(p));
        if (m < 1e-6 || v < 1e-6 || Math.abs(m - v) < 1e-6)
          a = [h, d, h, f, u, d];
        else {
          const A = u - h, b = f - d, E = m * m, S = v * v, T = v * m, x = S - E, C = (b * S - A * T) / x, I = (b * T - A * E) / x;
          a = [h + I, d, h, d + C, u, f - C];
        }
      }
    }
    a || (a = [0, -s, 0, 0, t, -s], j.applyTransform(a, r, 0), j.applyTransform(a, r, 2), j.applyTransform(a, r, 4)), a[0] /= n(this, ca), a[1] /= n(this, da), a[2] /= n(this, ca), a[3] /= n(this, da), a[4] /= n(this, ca), a[5] /= n(this, da), n(this, pa).set(a, n(this, fa) * 6), ee(this, fa)._++;
  }
  take() {
    return n(this, pa).subarray(0, n(this, fa) * 6);
  }
};
ca = new WeakMap(), da = new WeakMap(), ua = new WeakMap(), fa = new WeakMap(), pa = new WeakMap(), pc = new WeakMap(), y(Oh, pc, de.isFloat16ArraySupported ? Float16Array : Float32Array);
let tp = Oh;
var qo;
class rb {
  constructor({
    ownerDocument: e = globalThis.document,
    styleElement: t = null
  }) {
    y(this, qo, /* @__PURE__ */ new Set());
    this._document = e, this.nativeFontFaces = /* @__PURE__ */ new Set(), this.styleElement = null, this.loadingRequests = [], this.loadTestFontId = 0;
  }
  addNativeFontFace(e) {
    this.nativeFontFaces.add(e), this._document.fonts.add(e);
  }
  removeNativeFontFace(e) {
    this.nativeFontFaces.delete(e), this._document.fonts.delete(e);
  }
  insertRule(e) {
    this.styleElement || (this.styleElement = this._document.createElement("style"), this._document.documentElement.getElementsByTagName("head")[0].append(this.styleElement));
    const t = this.styleElement.sheet;
    t.insertRule(e, t.cssRules.length);
  }
  clear() {
    for (const e of this.nativeFontFaces)
      this._document.fonts.delete(e);
    this.nativeFontFaces.clear(), n(this, qo).clear(), this.styleElement && (this.styleElement.remove(), this.styleElement = null);
  }
  async loadSystemFont({
    systemFontInfo: e,
    disableFontFace: t,
    _inspectFont: s
  }) {
    if (!(!e || n(this, qo).has(e.loadedName))) {
      if (Gt(!t, "loadSystemFont shouldn't be called when `disableFontFace` is set."), this.isFontLoadingAPISupported) {
        const {
          loadedName: i,
          src: r,
          style: a
        } = e, o = new FontFace(i, r, a);
        this.addNativeFontFace(o);
        try {
          await o.load(), n(this, qo).add(i), s?.(e);
        } catch {
          Z(`Cannot load system font: ${e.baseFontName}, installing it could help to improve PDF rendering.`), this.removeNativeFontFace(o);
        }
        return;
      }
      bt("Not implemented: loadSystemFont without the Font Loading API.");
    }
  }
  async bind(e) {
    if (e.attached || e.missingFile && !e.systemFontInfo)
      return;
    if (e.attached = !0, e.systemFontInfo) {
      await this.loadSystemFont(e);
      return;
    }
    if (this.isFontLoadingAPISupported) {
      const s = e.createNativeFontFace();
      if (s) {
        this.addNativeFontFace(s);
        try {
          await s.loaded;
        } catch (i) {
          throw Z(`Failed to load font '${s.family}': '${i}'.`), e.disableFontFace = !0, i;
        }
      }
      return;
    }
    const t = e.createFontFaceRule();
    if (t) {
      if (this.insertRule(t), this.isSyncFontLoadingSupported)
        return;
      await new Promise((s) => {
        const i = this._queueLoadingCallback(s);
        this._prepareFontLoadEvent(e, i);
      });
    }
  }
  get isFontLoadingAPISupported() {
    const e = !!this._document?.fonts;
    return nt(this, "isFontLoadingAPISupported", e);
  }
  get isSyncFontLoadingSupported() {
    return nt(this, "isSyncFontLoadingSupported", xs || de.platform.isFirefox);
  }
  _queueLoadingCallback(e) {
    function t() {
      for (Gt(!i.done, "completeRequest() cannot be called twice."), i.done = !0; s.length > 0 && s[0].done; ) {
        const r = s.shift();
        setTimeout(r.callback, 0);
      }
    }
    const {
      loadingRequests: s
    } = this, i = {
      done: !1,
      complete: t,
      callback: e
    };
    return s.push(i), i;
  }
  get _loadTestFont() {
    const e = atob("T1RUTwALAIAAAwAwQ0ZGIDHtZg4AAAOYAAAAgUZGVE1lkzZwAAAEHAAAABxHREVGABQAFQAABDgAAAAeT1MvMlYNYwkAAAEgAAAAYGNtYXABDQLUAAACNAAAAUJoZWFk/xVFDQAAALwAAAA2aGhlYQdkA+oAAAD0AAAAJGhtdHgD6AAAAAAEWAAAAAZtYXhwAAJQAAAAARgAAAAGbmFtZVjmdH4AAAGAAAAAsXBvc3T/hgAzAAADeAAAACAAAQAAAAEAALZRFsRfDzz1AAsD6AAAAADOBOTLAAAAAM4KHDwAAAAAA+gDIQAAAAgAAgAAAAAAAAABAAADIQAAAFoD6AAAAAAD6AABAAAAAAAAAAAAAAAAAAAAAQAAUAAAAgAAAAQD6AH0AAUAAAKKArwAAACMAooCvAAAAeAAMQECAAACAAYJAAAAAAAAAAAAAQAAAAAAAAAAAAAAAFBmRWQAwAAuAC4DIP84AFoDIQAAAAAAAQAAAAAAAAAAACAAIAABAAAADgCuAAEAAAAAAAAAAQAAAAEAAAAAAAEAAQAAAAEAAAAAAAIAAQAAAAEAAAAAAAMAAQAAAAEAAAAAAAQAAQAAAAEAAAAAAAUAAQAAAAEAAAAAAAYAAQAAAAMAAQQJAAAAAgABAAMAAQQJAAEAAgABAAMAAQQJAAIAAgABAAMAAQQJAAMAAgABAAMAAQQJAAQAAgABAAMAAQQJAAUAAgABAAMAAQQJAAYAAgABWABYAAAAAAAAAwAAAAMAAAAcAAEAAAAAADwAAwABAAAAHAAEACAAAAAEAAQAAQAAAC7//wAAAC7////TAAEAAAAAAAABBgAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAD/gwAyAAAAAQAAAAAAAAAAAAAAAAAAAAABAAQEAAEBAQJYAAEBASH4DwD4GwHEAvgcA/gXBIwMAYuL+nz5tQXkD5j3CBLnEQACAQEBIVhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYAAABAQAADwACAQEEE/t3Dov6fAH6fAT+fPp8+nwHDosMCvm1Cvm1DAz6fBQAAAAAAAABAAAAAMmJbzEAAAAAzgTjFQAAAADOBOQpAAEAAAAAAAAADAAUAAQAAAABAAAAAgABAAAAAAAAAAAD6AAAAAAAAA==");
    return nt(this, "_loadTestFont", e);
  }
  _prepareFontLoadEvent(e, t) {
    function s(T, x) {
      return T.charCodeAt(x) << 24 | T.charCodeAt(x + 1) << 16 | T.charCodeAt(x + 2) << 8 | T.charCodeAt(x + 3) & 255;
    }
    function i(T, x, C, I) {
      const M = T.substring(0, x), P = T.substring(x + C);
      return M + I + P;
    }
    let r, a;
    const o = this._document.createElement("canvas");
    o.width = 1, o.height = 1;
    const l = o.getContext("2d");
    let h = 0;
    function d(T, x) {
      if (++h > 30) {
        Z("Load test font never loaded."), x();
        return;
      }
      if (l.font = "30px " + T, l.fillText(".", 0, 20), l.getImageData(0, 0, 1, 1).data[3] > 0) {
        x();
        return;
      }
      setTimeout(d.bind(null, T, x));
    }
    const u = `lt${Date.now()}${this.loadTestFontId++}`;
    let f = this._loadTestFont;
    f = i(f, 976, u.length, u);
    const m = 16, v = 1482184792;
    let A = s(f, m);
    for (r = 0, a = u.length - 3; r < a; r += 4)
      A = A - v + s(u, r) | 0;
    r < u.length && (A = A - v + s(u + "XXX", r) | 0), f = i(f, m, 4, By(A));
    const b = `url(data:font/opentype;base64,${btoa(f)});`, E = `@font-face {font-family:"${u}";src:${b}}`;
    this.insertRule(E);
    const S = this._document.createElement("div");
    S.style.visibility = "hidden", S.style.width = S.style.height = "10px", S.style.position = "absolute", S.style.top = S.style.left = "0px";
    for (const T of [e.loadedName, u]) {
      const x = this._document.createElement("span");
      x.textContent = "Hi", x.style.fontFamily = T, S.append(x);
    }
    this._document.body.append(S), d(u, () => {
      S.remove(), t.complete();
    });
  }
}
qo = new WeakMap();
var Pt;
class ab {
  constructor(e, t = null, s, i) {
    R(this, "compiledGlyphs", /* @__PURE__ */ Object.create(null));
    y(this, Pt);
    g(this, Pt, e), this._inspectFont = t, s && (this.charProcOperatorList = s), i && Object.assign(this, i);
  }
  createNativeFontFace() {
    if (!this.data || this.disableFontFace)
      return null;
    let e;
    if (!this.cssFontInfo)
      e = new FontFace(this.loadedName, this.data, {});
    else {
      const t = {
        weight: this.cssFontInfo.fontWeight
      };
      this.cssFontInfo.italicAngle && (t.style = `oblique ${this.cssFontInfo.italicAngle}deg`), e = new FontFace(this.cssFontInfo.fontFamily, this.data, t);
    }
    return this._inspectFont?.(this), e;
  }
  createFontFaceRule() {
    if (!this.data || this.disableFontFace)
      return null;
    const e = `url(data:${this.mimetype};base64,${this.data.toBase64()});`;
    let t;
    if (!this.cssFontInfo)
      t = `@font-face {font-family:"${this.loadedName}";src:${e}}`;
    else {
      let s = `font-weight: ${this.cssFontInfo.fontWeight};`;
      this.cssFontInfo.italicAngle && (s += `font-style: oblique ${this.cssFontInfo.italicAngle}deg;`), t = `@font-face {font-family:"${this.cssFontInfo.fontFamily}";${s}src:${e}}`;
    }
    return this._inspectFont?.(this, e), t;
  }
  getPathGenerator(e, t) {
    if (this.compiledGlyphs[t] !== void 0)
      return this.compiledGlyphs[t];
    const s = this.loadedName + "_path_" + t;
    let i;
    try {
      i = e.get(s);
    } catch (a) {
      Z(`getPathGenerator - ignoring character: "${a}".`);
    }
    const r = cm(i?.path);
    return this.fontExtraProperties || e.delete(s), this.compiledGlyphs[t] = r;
  }
  get black() {
    return n(this, Pt).black;
  }
  get bold() {
    return n(this, Pt).bold;
  }
  get disableFontFace() {
    return n(this, Pt).disableFontFace;
  }
  set disableFontFace(e) {
    nt(this, "disableFontFace", !!e);
  }
  get fontExtraProperties() {
    return n(this, Pt).fontExtraProperties;
  }
  get isInvalidPDFjsFont() {
    return n(this, Pt).isInvalidPDFjsFont;
  }
  get isType3Font() {
    return n(this, Pt).isType3Font;
  }
  get italic() {
    return n(this, Pt).italic;
  }
  get missingFile() {
    return n(this, Pt).missingFile;
  }
  get remeasure() {
    return n(this, Pt).remeasure;
  }
  get vertical() {
    return n(this, Pt).vertical;
  }
  get ascent() {
    return n(this, Pt).ascent;
  }
  get defaultWidth() {
    return n(this, Pt).defaultWidth;
  }
  get descent() {
    return n(this, Pt).descent;
  }
  get bbox() {
    return n(this, Pt).bbox;
  }
  get fontMatrix() {
    return n(this, Pt).fontMatrix;
  }
  get fallbackName() {
    return n(this, Pt).fallbackName;
  }
  get loadedName() {
    return n(this, Pt).loadedName;
  }
  get mimetype() {
    return n(this, Pt).mimetype;
  }
  get name() {
    return n(this, Pt).name;
  }
  get data() {
    return n(this, Pt).data;
  }
  clearData() {
    n(this, Pt).clearData();
  }
  get cssFontInfo() {
    return n(this, Pt).cssFontInfo;
  }
  get systemFontInfo() {
    return n(this, Pt).systemFontInfo;
  }
  get defaultVMetrics() {
    return n(this, Pt).defaultVMetrics;
  }
}
Pt = new WeakMap();
class zm {
}
R(zm, "strings", ["fontFamily", "fontWeight", "italicAngle"]);
class Xm {
}
R(Xm, "strings", ["css", "loadedName", "baseFontName", "src"]);
const Oe = class Oe {
};
R(Oe, "bools", ["black", "bold", "disableFontFace", "fontExtraProperties", "isInvalidPDFjsFont", "isType3Font", "italic", "missingFile", "remeasure", "vertical"]), R(Oe, "numbers", ["ascent", "defaultWidth", "descent"]), R(Oe, "strings", ["fallbackName", "loadedName", "mimetype", "name"]), R(Oe, "OFFSET_NUMBERS", Math.ceil(Oe.bools.length * 2 / 8)), R(Oe, "OFFSET_BBOX", Oe.OFFSET_NUMBERS + Oe.numbers.length * 8), R(Oe, "OFFSET_FONT_MATRIX", Oe.OFFSET_BBOX + 1 + 8), R(Oe, "OFFSET_DEFAULT_VMETRICS", Oe.OFFSET_FONT_MATRIX + 1 + 48), R(Oe, "OFFSET_STRINGS", Oe.OFFSET_DEFAULT_VMETRICS + 1 + 6);
let ns = Oe;
class Ue {
}
R(Ue, "KIND", 0), R(Ue, "HAS_BBOX", 1), R(Ue, "HAS_BACKGROUND", 2), R(Ue, "SHADING_TYPE", 3), R(Ue, "N_COORD", 4), R(Ue, "N_COLOR", 8), R(Ue, "N_STOP", 12), R(Ue, "N_FIGURES", 16);
var gc, Wu, tl, el, Kd;
class ob {
  constructor(e) {
    y(this, el);
    y(this, gc);
    y(this, Wu, new TextDecoder());
    y(this, tl);
    g(this, gc, e), g(this, tl, new DataView(e));
  }
  get fontFamily() {
    return w(this, el, Kd).call(this, 0);
  }
  get fontWeight() {
    return w(this, el, Kd).call(this, 1);
  }
  get italicAngle() {
    return w(this, el, Kd).call(this, 2);
  }
}
gc = new WeakMap(), Wu = new WeakMap(), tl = new WeakMap(), el = new WeakSet(), Kd = function(e) {
  Gt(e < zm.strings.length, "Invalid string index");
  let t = 0;
  for (let i = 0; i < e; i++)
    t += n(this, tl).getUint32(t) + 4;
  const s = n(this, tl).getUint32(t);
  return n(this, Wu).decode(new Uint8Array(n(this, gc), t + 4, s));
};
var ga, sl, xi, ma, ph;
class lb {
  constructor(e) {
    y(this, ma);
    y(this, ga);
    y(this, sl, new TextDecoder());
    y(this, xi);
    g(this, ga, e), g(this, xi, new DataView(e));
  }
  get guessFallback() {
    return n(this, xi).getUint8(0) !== 0;
  }
  get css() {
    return w(this, ma, ph).call(this, 0);
  }
  get loadedName() {
    return w(this, ma, ph).call(this, 1);
  }
  get baseFontName() {
    return w(this, ma, ph).call(this, 2);
  }
  get src() {
    return w(this, ma, ph).call(this, 3);
  }
  get style() {
    let e = 1;
    e += 4 + n(this, xi).getUint32(e);
    const t = n(this, xi).getUint32(e), s = n(this, sl).decode(new Uint8Array(n(this, ga), e + 4, t));
    e += 4 + t;
    const i = n(this, xi).getUint32(e), r = n(this, sl).decode(new Uint8Array(n(this, ga), e + 4, i));
    return {
      style: s,
      weight: r
    };
  }
}
ga = new WeakMap(), sl = new WeakMap(), xi = new WeakMap(), ma = new WeakSet(), ph = function(e) {
  Gt(e < Xm.strings.length, "Invalid string index");
  let t = 5;
  for (let i = 0; i < e; i++)
    t += n(this, xi).getUint32(t) + 4;
  const s = n(this, xi).getUint32(t);
  return n(this, sl).decode(new Uint8Array(n(this, ga), t + 4, s));
};
var Zs, Vu, Qt, St, zs, Jd, Qd, gh, ep;
class hb {
  constructor({
    buffer: e,
    extra: t
  }) {
    y(this, St);
    y(this, Zs);
    y(this, Vu, new TextDecoder());
    y(this, Qt);
    g(this, Zs, e), g(this, Qt, new DataView(e)), t && Object.assign(this, t);
  }
  get black() {
    return w(this, St, zs).call(this, 0);
  }
  get bold() {
    return w(this, St, zs).call(this, 1);
  }
  get disableFontFace() {
    return w(this, St, zs).call(this, 2);
  }
  get fontExtraProperties() {
    return w(this, St, zs).call(this, 3);
  }
  get isInvalidPDFjsFont() {
    return w(this, St, zs).call(this, 4);
  }
  get isType3Font() {
    return w(this, St, zs).call(this, 5);
  }
  get italic() {
    return w(this, St, zs).call(this, 6);
  }
  get missingFile() {
    return w(this, St, zs).call(this, 7);
  }
  get remeasure() {
    return w(this, St, zs).call(this, 8);
  }
  get vertical() {
    return w(this, St, zs).call(this, 9);
  }
  get ascent() {
    return w(this, St, Jd).call(this, 0);
  }
  get defaultWidth() {
    return w(this, St, Jd).call(this, 1);
  }
  get descent() {
    return w(this, St, Jd).call(this, 2);
  }
  get bbox() {
    return w(this, St, Qd).call(this, ns.OFFSET_BBOX, 4, "getInt16", 2);
  }
  get fontMatrix() {
    return w(this, St, Qd).call(this, ns.OFFSET_FONT_MATRIX, 6, "getFloat64", 8);
  }
  get defaultVMetrics() {
    return w(this, St, Qd).call(this, ns.OFFSET_DEFAULT_VMETRICS, 3, "getInt16", 2);
  }
  get fallbackName() {
    return w(this, St, gh).call(this, 0);
  }
  get loadedName() {
    return w(this, St, gh).call(this, 1);
  }
  get mimetype() {
    return w(this, St, gh).call(this, 2);
  }
  get name() {
    return w(this, St, gh).call(this, 3);
  }
  get data() {
    const {
      offset: e,
      length: t
    } = w(this, St, ep).call(this);
    return t === 0 ? void 0 : new Uint8Array(n(this, Zs), e + 4, t);
  }
  clearData() {
    const {
      offset: e,
      length: t
    } = w(this, St, ep).call(this);
    t !== 0 && (n(this, Qt).setUint32(e, 0), g(this, Zs, new Uint8Array(n(this, Zs), 0, e + 4).slice().buffer), g(this, Qt, new DataView(n(this, Zs))));
  }
  get cssFontInfo() {
    let e = ns.OFFSET_STRINGS;
    const t = n(this, Qt).getUint32(e);
    e += 4 + t;
    const s = n(this, Qt).getUint32(e);
    e += 4 + s;
    const i = n(this, Qt).getUint32(e);
    if (i === 0)
      return null;
    const r = new Uint8Array(i);
    return r.set(new Uint8Array(n(this, Zs), e + 4, i)), new ob(r.buffer);
  }
  get systemFontInfo() {
    let e = ns.OFFSET_STRINGS;
    const t = n(this, Qt).getUint32(e);
    e += 4 + t;
    const s = n(this, Qt).getUint32(e);
    if (s === 0)
      return null;
    const i = new Uint8Array(s);
    return i.set(new Uint8Array(n(this, Zs), e + 4, s)), new lb(i.buffer);
  }
}
Zs = new WeakMap(), Vu = new WeakMap(), Qt = new WeakMap(), St = new WeakSet(), zs = function(e) {
  Gt(e < ns.bools.length, "Invalid boolean index");
  const t = Math.floor(e / 4), s = e * 2 % 8, i = n(this, Qt).getUint8(t) >> s & 3;
  return i === 0 ? void 0 : i === 2;
}, Jd = function(e) {
  return Gt(e < ns.numbers.length, "Invalid number index"), n(this, Qt).getFloat64(ns.OFFSET_NUMBERS + e * 8);
}, Qd = function(e, t, s, i) {
  const r = n(this, Qt).getUint8(e);
  if (r === 0)
    return;
  Gt(r === t, "Invalid array length."), e += 1;
  const a = new Array(r);
  for (let o = 0; o < r; o++)
    a[o] = n(this, Qt)[s](e, !0), e += i;
  return a;
}, gh = function(e) {
  Gt(e < ns.strings.length, "Invalid string index");
  let t = ns.OFFSET_STRINGS + 4;
  for (let i = 0; i < e; i++)
    t += n(this, Qt).getUint32(t) + 4;
  const s = n(this, Qt).getUint32(t);
  return n(this, Vu).decode(new Uint8Array(n(this, Zs), t + 4, s));
}, ep = function() {
  let e = ns.OFFSET_STRINGS;
  const t = n(this, Qt).getUint32(e);
  e += 4 + t;
  const s = n(this, Qt).getUint32(e);
  e += 4 + s;
  const i = n(this, Qt).getUint32(e);
  e += 4 + i;
  const r = n(this, Qt).getUint32(e);
  return {
    offset: e,
    length: r
  };
};
class cb {
  constructor(e) {
    this.buffer = e, this.view = new DataView(e), this.data = new Uint8Array(e);
  }
  getIR() {
    const e = this.view, t = this.data[Ue.KIND], s = !!this.data[Ue.HAS_BBOX], i = !!this.data[Ue.HAS_BACKGROUND], r = e.getUint32(Ue.N_COORD, !0), a = e.getUint32(Ue.N_COLOR, !0), o = e.getUint32(Ue.N_STOP, !0), l = e.getUint32(Ue.N_FIGURES, !0);
    let h = 20;
    const d = new Float32Array(this.buffer, h, r * 2);
    h += r * 8;
    const u = new Uint8Array(this.buffer, h, a * 3);
    h += a * 3;
    const f = [];
    for (let A = 0; A < o; ++A) {
      const b = e.getFloat32(h, !0);
      h += 4;
      const E = e.getUint32(h, !0);
      h += 4, f.push([b, `#${E.toString(16).padStart(6, "0")}`]);
    }
    let p = null;
    if (s) {
      p = [];
      for (let A = 0; A < 4; ++A)
        p.push(e.getFloat32(h, !0)), h += 4;
    }
    let m = null;
    i && (m = new Uint8Array(this.buffer, h, 3), h += 3);
    const v = [];
    for (let A = 0; A < l; ++A) {
      const b = e.getUint8(h);
      h += 1, h = Math.ceil(h / 4) * 4;
      const E = e.getUint32(h, !0);
      h += 4;
      const S = new Int32Array(this.buffer, h, E);
      h += E * 4;
      const T = e.getUint32(h, !0);
      h += 4;
      const x = new Int32Array(this.buffer, h, T);
      h += T * 4;
      const C = {
        type: b,
        coords: S,
        colors: x
      };
      b === $r.LATTICE && (C.verticesPerRow = e.getUint32(h, !0), h += 4), v.push(C);
    }
    if (t === 1)
      return ["RadialAxial", "axial", p, f, Array.from(d.slice(0, 2)), Array.from(d.slice(2, 4)), null, null];
    if (t === 2)
      return ["RadialAxial", "radial", p, f, [d[0], d[1]], [d[3], d[4]], d[2], d[5]];
    if (t === 3) {
      const A = this.data[Ue.SHADING_TYPE];
      let b = null;
      if (d.length > 0) {
        b = [1 / 0, 1 / 0, -1 / 0, -1 / 0];
        for (let E = 0, S = d.length; E < S; E += 2)
          j.pointBoundingBox(d[E], d[E + 1], b);
      }
      return ["Mesh", A, d, u, v, b, p, m];
    }
    throw new Error(`Unsupported pattern kind: ${t}`);
  }
}
var il;
class db {
  constructor(e) {
    y(this, il);
    g(this, il, e);
  }
  get path() {
    return de.isFloat16ArraySupported ? new Float16Array(n(this, il)) : new Float32Array(n(this, il));
  }
}
il = new WeakMap();
function ub(c) {
  if (c instanceof URL)
    return c;
  if (typeof c == "string") {
    if (xs) {
      if (/^[a-z][a-z0-9\-+.]+:/i.test(c))
        return new URL(c);
      const t = process.getBuiltinModule("url");
      return new URL(t.pathToFileURL(c));
    }
    const e = URL.parse(c, window.location);
    if (e)
      return e;
  }
  throw new Error("Invalid PDF url data: either string or URL-object is expected in the url property.");
}
function fb(c) {
  if (xs && typeof Buffer < "u" && c instanceof Buffer)
    throw new Error("Please provide binary data as `Uint8Array`, rather than `Buffer`.");
  if (c instanceof Uint8Array && c.byteLength === c.buffer.byteLength)
    return c;
  if (typeof c == "string")
    return cf(c);
  if (c instanceof ArrayBuffer || ArrayBuffer.isView(c) || typeof c == "object" && !isNaN(c?.length))
    return new Uint8Array(c);
  throw new Error("Invalid PDF binary data: either TypedArray, string, or array-like object is expected in the data property.");
}
function kd(c) {
  if (typeof c != "string")
    return null;
  if (c.endsWith("/"))
    return c;
  throw new Error(`Invalid factory url: "${c}" must include trailing slash.`);
}
const sp = (c) => typeof c == "object" && Number.isInteger(c?.num) && c.num >= 0 && Number.isInteger(c?.gen) && c.gen >= 0, pb = (c) => typeof c == "object" && typeof c?.name == "string", gb = Gy.bind(null, sp, pb);
var on, zu;
class mb {
  constructor() {
    y(this, on, /* @__PURE__ */ new Map());
    y(this, zu, Promise.resolve());
  }
  postMessage(e, t) {
    const s = {
      data: structuredClone(e, t ? {
        transfer: t
      } : null)
    };
    n(this, zu).then(() => {
      for (const [i] of n(this, on))
        i.call(this, s);
    });
  }
  addEventListener(e, t, s = null) {
    let i = null;
    if (s?.signal instanceof AbortSignal) {
      const {
        signal: r
      } = s;
      if (r.aborted) {
        Z("LoopbackPort - cannot use an `aborted` signal.");
        return;
      }
      const a = () => this.removeEventListener(e, t);
      i = () => r.removeEventListener("abort", a), r.addEventListener("abort", a);
    }
    n(this, on).set(t, i);
  }
  removeEventListener(e, t) {
    n(this, on).get(t)?.(), n(this, on).delete(t);
  }
  terminate() {
    for (const [, e] of n(this, on))
      e?.();
    n(this, on).clear();
  }
}
on = new WeakMap(), zu = new WeakMap();
q(1689);
const Nd = {
  DATA: 1,
  ERROR: 2
}, se = {
  CANCEL: 1,
  CANCEL_COMPLETE: 2,
  CLOSE: 3,
  ENQUEUE: 4,
  ERROR: 5,
  PULL: 6,
  PULL_COMPLETE: 7,
  START_COMPLETE: 8
};
function $g() {
}
function Ke(c) {
  if (c instanceof Dr || c instanceof Mf || c instanceof Pg || c instanceof Cu || c instanceof Ef)
    return c;
  switch (c instanceof Error || typeof c == "object" && c !== null || bt('wrapReason: Expected "reason" to be a (possibly cloned) Error.'), c.name) {
    case "AbortException":
      return new Dr(c.message);
    case "InvalidPDFException":
      return new Mf(c.message);
    case "PasswordException":
      return new Pg(c.message, c.code);
    case "ResponseException":
      return new Cu(c.message, c.status, c.missing);
    case "UnknownErrorException":
      return new Ef(c.message, c.details);
  }
  return new Ef(c.message, c.toString());
}
var nl, Ws, Ym, Km, Jm, Zd;
class mh {
  constructor(e, t, s) {
    y(this, Ws);
    y(this, nl, new AbortController());
    this.sourceName = e, this.targetName = t, this.comObj = s, this.callbackId = 1, this.streamId = 1, this.streamSinks = /* @__PURE__ */ Object.create(null), this.streamControllers = /* @__PURE__ */ Object.create(null), this.callbackCapabilities = /* @__PURE__ */ Object.create(null), this.actionHandler = /* @__PURE__ */ Object.create(null), s.addEventListener("message", w(this, Ws, Ym).bind(this), {
      signal: n(this, nl).signal
    });
  }
  on(e, t) {
    const s = this.actionHandler;
    if (s[e])
      throw new Error(`There is already an actionName called "${e}"`);
    s[e] = t;
  }
  send(e, t, s) {
    this.comObj.postMessage({
      sourceName: this.sourceName,
      targetName: this.targetName,
      action: e,
      data: t
    }, s);
  }
  sendWithPromise(e, t, s) {
    const i = this.callbackId++, r = Promise.withResolvers();
    this.callbackCapabilities[i] = r;
    try {
      this.comObj.postMessage({
        sourceName: this.sourceName,
        targetName: this.targetName,
        action: e,
        callbackId: i,
        data: t
      }, s);
    } catch (a) {
      r.reject(a);
    }
    return r.promise;
  }
  sendWithStream(e, t, s, i) {
    const r = this.streamId++, a = this.sourceName, o = this.targetName, l = this.comObj;
    return new ReadableStream({
      start: (h) => {
        const d = Promise.withResolvers();
        return this.streamControllers[r] = {
          controller: h,
          startCall: d,
          pullCall: null,
          cancelCall: null,
          isClosed: !1
        }, l.postMessage({
          sourceName: a,
          targetName: o,
          action: e,
          streamId: r,
          data: t,
          desiredSize: h.desiredSize
        }, i), d.promise;
      },
      pull: (h) => {
        const d = Promise.withResolvers();
        return this.streamControllers[r].pullCall = d, l.postMessage({
          sourceName: a,
          targetName: o,
          stream: se.PULL,
          streamId: r,
          desiredSize: h.desiredSize
        }), d.promise;
      },
      cancel: (h) => {
        Gt(h instanceof Error, "cancel must have a valid reason");
        const d = Promise.withResolvers();
        return this.streamControllers[r].cancelCall = d, this.streamControllers[r].isClosed = !0, l.postMessage({
          sourceName: a,
          targetName: o,
          stream: se.CANCEL,
          streamId: r,
          reason: Ke(h)
        }), d.promise;
      }
    }, s);
  }
  destroy() {
    n(this, nl)?.abort(), g(this, nl, null);
  }
}
nl = new WeakMap(), Ws = new WeakSet(), Ym = function({
  data: e
}) {
  if (e.targetName !== this.sourceName)
    return;
  if (e.stream) {
    w(this, Ws, Jm).call(this, e);
    return;
  }
  if (e.callback) {
    const s = e.callbackId, i = this.callbackCapabilities[s];
    if (!i)
      throw new Error(`Cannot resolve callback ${s}`);
    if (delete this.callbackCapabilities[s], e.callback === Nd.DATA)
      i.resolve(e.data);
    else if (e.callback === Nd.ERROR)
      i.reject(Ke(e.reason));
    else
      throw new Error("Unexpected callback case");
    return;
  }
  const t = this.actionHandler[e.action];
  if (!t)
    throw new Error(`Unknown action from worker: ${e.action}`);
  if (e.callbackId) {
    const s = this.sourceName, i = e.sourceName, r = this.comObj;
    Promise.try(t, e.data).then(function(a) {
      r.postMessage({
        sourceName: s,
        targetName: i,
        callback: Nd.DATA,
        callbackId: e.callbackId,
        data: a
      });
    }, function(a) {
      r.postMessage({
        sourceName: s,
        targetName: i,
        callback: Nd.ERROR,
        callbackId: e.callbackId,
        reason: Ke(a)
      });
    });
    return;
  }
  if (e.streamId) {
    w(this, Ws, Km).call(this, e);
    return;
  }
  t(e.data);
}, Km = function(e) {
  const t = e.streamId, s = this.sourceName, i = e.sourceName, r = this.comObj, a = this, o = this.actionHandler[e.action], l = {
    enqueue(h, d = 1, u) {
      if (this.isCancelled)
        return;
      const f = this.desiredSize;
      this.desiredSize -= d, f > 0 && this.desiredSize <= 0 && (this.sinkCapability = Promise.withResolvers(), this.ready = this.sinkCapability.promise), r.postMessage({
        sourceName: s,
        targetName: i,
        stream: se.ENQUEUE,
        streamId: t,
        chunk: h
      }, u);
    },
    close() {
      this.isCancelled || (this.isCancelled = !0, r.postMessage({
        sourceName: s,
        targetName: i,
        stream: se.CLOSE,
        streamId: t
      }), delete a.streamSinks[t]);
    },
    error(h) {
      Gt(h instanceof Error, "error must have a valid reason"), !this.isCancelled && (this.isCancelled = !0, r.postMessage({
        sourceName: s,
        targetName: i,
        stream: se.ERROR,
        streamId: t,
        reason: Ke(h)
      }));
    },
    sinkCapability: Promise.withResolvers(),
    onPull: null,
    onCancel: null,
    isCancelled: !1,
    desiredSize: e.desiredSize,
    ready: null
  };
  l.sinkCapability.resolve(), l.ready = l.sinkCapability.promise, this.streamSinks[t] = l, Promise.try(o, e.data, l).then(function() {
    r.postMessage({
      sourceName: s,
      targetName: i,
      stream: se.START_COMPLETE,
      streamId: t,
      success: !0
    });
  }, function(h) {
    r.postMessage({
      sourceName: s,
      targetName: i,
      stream: se.START_COMPLETE,
      streamId: t,
      reason: Ke(h)
    });
  });
}, Jm = function(e) {
  const t = e.streamId, s = this.sourceName, i = e.sourceName, r = this.comObj, a = this.streamControllers[t], o = this.streamSinks[t];
  switch (e.stream) {
    case se.START_COMPLETE:
      e.success ? a.startCall.resolve() : a.startCall.reject(Ke(e.reason));
      break;
    case se.PULL_COMPLETE:
      e.success ? a.pullCall.resolve() : a.pullCall.reject(Ke(e.reason));
      break;
    case se.PULL:
      if (!o) {
        r.postMessage({
          sourceName: s,
          targetName: i,
          stream: se.PULL_COMPLETE,
          streamId: t,
          success: !0
        });
        break;
      }
      o.desiredSize <= 0 && e.desiredSize > 0 && o.sinkCapability.resolve(), o.desiredSize = e.desiredSize, Promise.try(o.onPull || $g).then(function() {
        r.postMessage({
          sourceName: s,
          targetName: i,
          stream: se.PULL_COMPLETE,
          streamId: t,
          success: !0
        });
      }, function(h) {
        r.postMessage({
          sourceName: s,
          targetName: i,
          stream: se.PULL_COMPLETE,
          streamId: t,
          reason: Ke(h)
        });
      });
      break;
    case se.ENQUEUE:
      if (Gt(a, "enqueue should have stream controller"), a.isClosed)
        break;
      a.controller.enqueue(e.chunk);
      break;
    case se.CLOSE:
      if (Gt(a, "close should have stream controller"), a.isClosed)
        break;
      a.isClosed = !0, a.controller.close(), w(this, Ws, Zd).call(this, a, t);
      break;
    case se.ERROR:
      Gt(a, "error should have stream controller"), a.controller.error(Ke(e.reason)), w(this, Ws, Zd).call(this, a, t);
      break;
    case se.CANCEL_COMPLETE:
      e.success ? a.cancelCall.resolve() : a.cancelCall.reject(Ke(e.reason)), w(this, Ws, Zd).call(this, a, t);
      break;
    case se.CANCEL:
      if (!o)
        break;
      const l = Ke(e.reason);
      Promise.try(o.onCancel || $g, l).then(function() {
        r.postMessage({
          sourceName: s,
          targetName: i,
          stream: se.CANCEL_COMPLETE,
          streamId: t,
          success: !0
        });
      }, function(h) {
        r.postMessage({
          sourceName: s,
          targetName: i,
          stream: se.CANCEL_COMPLETE,
          streamId: t,
          reason: Ke(h)
        });
      }), o.sinkCapability.reject(l), o.isCancelled = !0, delete this.streamSinks[t];
      break;
    default:
      throw new Error("Unexpected stream case");
  }
}, Zd = async function(e, t) {
  await Promise.allSettled([e.startCall?.promise, e.pullCall?.promise, e.cancelCall?.promise]), delete this.streamControllers[t];
};
var Xu;
class Qm {
  constructor({
    cMapUrl: e = null,
    standardFontDataUrl: t = null,
    wasmUrl: s = null
  }) {
    y(this, Xu, Object.freeze({
      cMapUrl: "CMap",
      standardFontDataUrl: "font",
      wasmUrl: "wasm"
    }));
    this.cMapUrl = e, this.standardFontDataUrl = t, this.wasmUrl = s;
  }
  async fetch({
    kind: e,
    filename: t
  }) {
    switch (e) {
      case "cMapUrl":
      case "standardFontDataUrl":
      case "wasmUrl":
        break;
      default:
        bt(`Not implemented: ${e}`);
    }
    const s = this[e];
    if (!s)
      throw new Error(`Ensure that the \`${e}\` API parameter is provided.`);
    const i = `${s}${t}`;
    return this._fetch(i, e).catch((r) => {
      throw new Error(`Unable to load ${n(this, Xu)[e]} data at: ${i}`);
    });
  }
  async _fetch(e, t) {
    bt("Abstract method `_fetch` called.");
  }
}
Xu = new WeakMap();
class jg extends Qm {
  async _fetch(e, t) {
    const s = t === "cMapUrl" && !e.endsWith(".bcmap") ? "text" : "bytes", i = await lg(e, s);
    return i instanceof Uint8Array ? i : cf(i);
  }
}
var mc;
class Zm {
  constructor({
    enableHWA: e = !1
  }) {
    y(this, mc, !1);
    g(this, mc, e);
  }
  create(e, t) {
    if (e <= 0 || t <= 0)
      throw new Error("Invalid canvas size");
    const s = this._createCanvas(e, t);
    return {
      canvas: s,
      context: s.getContext("2d", {
        willReadFrequently: !n(this, mc)
      })
    };
  }
  reset({
    canvas: e
  }, t, s) {
    if (!e)
      throw new Error("Canvas is not specified");
    if (t <= 0 || s <= 0)
      throw new Error("Invalid canvas size");
    e.width = t, e.height = s;
  }
  destroy(e) {
    const {
      canvas: t
    } = e;
    if (!t)
      throw new Error("Canvas is not specified");
    t.width = t.height = 0, e.canvas = null, e.context = null;
  }
  _createCanvas(e, t) {
    bt("Abstract method `_createCanvas` called.");
  }
}
mc = new WeakMap();
class vb extends Zm {
  constructor({
    ownerDocument: e = globalThis.document,
    enableHWA: t = !1
  }) {
    super({
      enableHWA: t
    }), this._document = e;
  }
  _createCanvas(e, t) {
    const s = this._document.createElement("canvas");
    return s.width = e, s.height = t, s;
  }
}
q(2489);
class qm {
  addFilter(e) {
    return "none";
  }
  addHCMFilter(e, t) {
    return "none";
  }
  addAlphaFilter(e) {
    return "none";
  }
  addLuminosityFilter(e) {
    return "none";
  }
  addHighlightHCMFilter(e, t, s, i, r) {
    return "none";
  }
  destroy(e = !1) {
  }
}
var va, rl, ln, hn, Ne, ya, ba, W, Me, vh, go, qd, mo, tv, ip, vo, yh, bh, np, Ah;
class yb extends qm {
  constructor({
    docId: t,
    ownerDocument: s = globalThis.document
  }) {
    super();
    y(this, W);
    y(this, va);
    y(this, rl);
    y(this, ln);
    y(this, hn);
    y(this, Ne);
    y(this, ya);
    y(this, ba, 0);
    g(this, hn, t), g(this, Ne, s);
  }
  addFilter(t) {
    if (!t)
      return "none";
    let s = n(this, W, Me).get(t);
    if (s)
      return s;
    const [i, r, a] = w(this, W, qd).call(this, t), o = t.length === 1 ? i : `${i}${r}${a}`;
    if (s = n(this, W, Me).get(o), s)
      return n(this, W, Me).set(t, s), s;
    const l = `g_${n(this, hn)}_transfer_map_${ee(this, ba)._++}`, h = w(this, W, mo).call(this, l);
    n(this, W, Me).set(t, h), n(this, W, Me).set(o, h);
    const d = w(this, W, vo).call(this, l);
    return w(this, W, bh).call(this, i, r, a, d), h;
  }
  addHCMFilter(t, s) {
    const i = `${t}-${s}`, r = "base";
    let a = n(this, W, vh).get(r);
    if (a?.key === i || (a ? (a.filter?.remove(), a.key = i, a.url = "none", a.filter = null) : (a = {
      key: i,
      url: "none",
      filter: null
    }, n(this, W, vh).set(r, a)), !t || !s))
      return a.url;
    const o = w(this, W, Ah).call(this, t);
    t = j.makeHexColor(...o);
    const l = w(this, W, Ah).call(this, s);
    if (s = j.makeHexColor(...l), n(this, W, go).style.color = "", t === "#000000" && s === "#ffffff" || t === s)
      return a.url;
    const h = new Array(256);
    for (let m = 0; m <= 255; m++) {
      const v = m / 255;
      h[m] = v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    }
    const d = h.join(","), u = `g_${n(this, hn)}_hcm_filter`, f = a.filter = w(this, W, vo).call(this, u);
    w(this, W, bh).call(this, d, d, d, f), w(this, W, ip).call(this, f);
    const p = (m, v) => {
      const A = o[m] / 255, b = l[m] / 255, E = new Array(v + 1);
      for (let S = 0; S <= v; S++)
        E[S] = A + S / v * (b - A);
      return E.join(",");
    };
    return w(this, W, bh).call(this, p(0, 5), p(1, 5), p(2, 5), f), a.url = w(this, W, mo).call(this, u), a.url;
  }
  addAlphaFilter(t) {
    let s = n(this, W, Me).get(t);
    if (s)
      return s;
    const [i] = w(this, W, qd).call(this, [t]), r = `alpha_${i}`;
    if (s = n(this, W, Me).get(r), s)
      return n(this, W, Me).set(t, s), s;
    const a = `g_${n(this, hn)}_alpha_map_${ee(this, ba)._++}`, o = w(this, W, mo).call(this, a);
    n(this, W, Me).set(t, o), n(this, W, Me).set(r, o);
    const l = w(this, W, vo).call(this, a);
    return w(this, W, np).call(this, i, l), o;
  }
  addLuminosityFilter(t) {
    let s = n(this, W, Me).get(t || "luminosity");
    if (s)
      return s;
    let i, r;
    if (t ? ([i] = w(this, W, qd).call(this, [t]), r = `luminosity_${i}`) : r = "luminosity", s = n(this, W, Me).get(r), s)
      return n(this, W, Me).set(t, s), s;
    const a = `g_${n(this, hn)}_luminosity_map_${ee(this, ba)._++}`, o = w(this, W, mo).call(this, a);
    n(this, W, Me).set(t, o), n(this, W, Me).set(r, o);
    const l = w(this, W, vo).call(this, a);
    return w(this, W, tv).call(this, l), t && w(this, W, np).call(this, i, l), o;
  }
  addHighlightHCMFilter(t, s, i, r, a) {
    const o = `${s}-${i}-${r}-${a}`;
    let l = n(this, W, vh).get(t);
    if (l?.key === o || (l ? (l.filter?.remove(), l.key = o, l.url = "none", l.filter = null) : (l = {
      key: o,
      url: "none",
      filter: null
    }, n(this, W, vh).set(t, l)), !s || !i))
      return l.url;
    const [h, d] = [s, i].map(w(this, W, Ah).bind(this));
    let u = Math.round(0.2126 * h[0] + 0.7152 * h[1] + 0.0722 * h[2]), f = Math.round(0.2126 * d[0] + 0.7152 * d[1] + 0.0722 * d[2]), [p, m] = [r, a].map(w(this, W, Ah).bind(this));
    f < u && ([u, f, p, m] = [f, u, m, p]), n(this, W, go).style.color = "";
    const v = (E, S, T) => {
      const x = new Array(256), C = (f - u) / T, I = E / 255, M = (S - E) / (255 * T);
      let P = 0;
      for (let O = 0; O <= T; O++) {
        const D = Math.round(u + O * C), $ = I + O * M;
        for (let F = P; F <= D; F++)
          x[F] = $;
        P = D + 1;
      }
      for (let O = P; O < 256; O++)
        x[O] = x[P - 1];
      return x.join(",");
    }, A = `g_${n(this, hn)}_hcm_${t}_filter`, b = l.filter = w(this, W, vo).call(this, A);
    return w(this, W, ip).call(this, b), w(this, W, bh).call(this, v(p[0], m[0], 5), v(p[1], m[1], 5), v(p[2], m[2], 5), b), l.url = w(this, W, mo).call(this, A), l.url;
  }
  destroy(t = !1) {
    t && n(this, ya)?.size || (n(this, ln)?.parentNode.parentNode.remove(), g(this, ln, null), n(this, rl)?.clear(), g(this, rl, null), n(this, ya)?.clear(), g(this, ya, null), g(this, ba, 0));
  }
}
va = new WeakMap(), rl = new WeakMap(), ln = new WeakMap(), hn = new WeakMap(), Ne = new WeakMap(), ya = new WeakMap(), ba = new WeakMap(), W = new WeakSet(), Me = function() {
  return n(this, rl) || g(this, rl, /* @__PURE__ */ new Map());
}, vh = function() {
  return n(this, ya) || g(this, ya, /* @__PURE__ */ new Map());
}, go = function() {
  if (!n(this, ln)) {
    const t = n(this, Ne).createElement("div"), {
      style: s
    } = t;
    s.visibility = "hidden", s.contain = "strict", s.width = s.height = 0, s.position = "absolute", s.top = s.left = 0, s.zIndex = -1;
    const i = n(this, Ne).createElementNS(Gi, "svg");
    i.setAttribute("width", 0), i.setAttribute("height", 0), g(this, ln, n(this, Ne).createElementNS(Gi, "defs")), t.append(i), i.append(n(this, ln)), n(this, Ne).body.append(t);
  }
  return n(this, ln);
}, qd = function(t) {
  if (t.length === 1) {
    const h = t[0], d = new Array(256);
    for (let f = 0; f < 256; f++)
      d[f] = h[f] / 255;
    const u = d.join(",");
    return [u, u, u];
  }
  const [s, i, r] = t, a = new Array(256), o = new Array(256), l = new Array(256);
  for (let h = 0; h < 256; h++)
    a[h] = s[h] / 255, o[h] = i[h] / 255, l[h] = r[h] / 255;
  return [a.join(","), o.join(","), l.join(",")];
}, mo = function(t) {
  if (n(this, va) === void 0) {
    g(this, va, "");
    const s = n(this, Ne).URL;
    s !== n(this, Ne).baseURI && (df(s) ? Z('#createUrl: ignore "data:"-URL for performance reasons.') : g(this, va, am(s, "")));
  }
  return `url(${n(this, va)}#${t})`;
}, tv = function(t) {
  const s = n(this, Ne).createElementNS(Gi, "feColorMatrix");
  s.setAttribute("type", "matrix"), s.setAttribute("values", "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0.59 0.11 0 0"), t.append(s);
}, ip = function(t) {
  const s = n(this, Ne).createElementNS(Gi, "feColorMatrix");
  s.setAttribute("type", "matrix"), s.setAttribute("values", "0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0 0 0 1 0"), t.append(s);
}, vo = function(t) {
  const s = n(this, Ne).createElementNS(Gi, "filter");
  return s.setAttribute("color-interpolation-filters", "sRGB"), s.setAttribute("id", t), n(this, W, go).append(s), s;
}, yh = function(t, s, i) {
  const r = n(this, Ne).createElementNS(Gi, s);
  r.setAttribute("type", "discrete"), r.setAttribute("tableValues", i), t.append(r);
}, bh = function(t, s, i, r) {
  const a = n(this, Ne).createElementNS(Gi, "feComponentTransfer");
  r.append(a), w(this, W, yh).call(this, a, "feFuncR", t), w(this, W, yh).call(this, a, "feFuncG", s), w(this, W, yh).call(this, a, "feFuncB", i);
}, np = function(t, s) {
  const i = n(this, Ne).createElementNS(Gi, "feComponentTransfer");
  s.append(i), w(this, W, yh).call(this, i, "feFuncA", t);
}, Ah = function(t) {
  return n(this, W, go).style.color = t, Dd(getComputedStyle(n(this, W, go)).getPropertyValue("color"));
};
if (xs) {
  let c;
  try {
    const e = process.getBuiltinModule("module").createRequire(import.meta.url);
    try {
      c = e("@napi-rs/canvas");
    } catch (t) {
      Z(`Cannot load "@napi-rs/canvas" package: "${t}".`);
    }
  } catch (e) {
    Z(`Cannot access the \`require\` function: "${e}".`);
  }
  globalThis.DOMMatrix || (c?.DOMMatrix ? globalThis.DOMMatrix = c.DOMMatrix : Z("Cannot polyfill `DOMMatrix`, rendering may be broken.")), globalThis.ImageData || (c?.ImageData ? globalThis.ImageData = c.ImageData : Z("Cannot polyfill `ImageData`, rendering may be broken.")), globalThis.Path2D || (c?.Path2D ? globalThis.Path2D = c.Path2D : Z("Cannot polyfill `Path2D`, rendering may be broken.")), globalThis.navigator?.language || (globalThis.navigator = {
    language: "en-US",
    platform: "",
    userAgent: ""
  });
}
async function bb(c) {
  const t = await process.getBuiltinModule("fs").promises.readFile(c);
  return new Uint8Array(t);
}
class Ab extends qm {
}
class wb extends Zm {
  _createCanvas(e, t) {
    return process.getBuiltinModule("module").createRequire(import.meta.url)("@napi-rs/canvas").createCanvas(e, t);
  }
}
class Eb extends Qm {
  async _fetch(e, t) {
    return bb(e);
  }
}
const Sb = `
struct Uniforms {
  offsetX      : f32,
  offsetY      : f32,
  scaleX       : f32,
  scaleY       : f32,
  paddedWidth  : f32,
  paddedHeight : f32,
  borderSize   : f32,
  _pad         : f32,
};

@group(0) @binding(0) var<uniform> u : Uniforms;

struct VertexInput {
  @location(0) position : vec2<f32>,
  @location(1) color    : vec4<f32>,
};

struct VertexOutput {
  @builtin(position) position : vec4<f32>,
  @location(0)       color    : vec3<f32>,
};

@vertex
fn vs_main(in : VertexInput) -> VertexOutput {
  var out : VertexOutput;
  let cx = (in.position.x + u.offsetX) * u.scaleX;
  let cy = (in.position.y + u.offsetY) * u.scaleY;
  out.position = vec4<f32>(
    ((cx + u.borderSize) / u.paddedWidth) * 2.0 - 1.0,
    1.0 - ((cy + u.borderSize) / u.paddedHeight) * 2.0,
    0.0,
    1.0
  );
  out.color = in.color.rgb;
  return out;
}

@fragment
fn fs_main(in : VertexOutput) -> @location(0) vec4<f32> {
  return vec4<f32>(in.color, 1.0);
}
`;
var vc, al, ol, ll, ih, ev, sv;
class xb {
  constructor() {
    y(this, ih);
    y(this, vc, null);
    y(this, al, null);
    y(this, ol, null);
    y(this, ll, null);
  }
  init() {
    n(this, vc) === null && g(this, vc, w(this, ih, ev).call(this));
  }
  get isReady() {
    return n(this, al) !== null;
  }
  draw(e, t, s, i, r, a) {
    const o = n(this, al), {
      offsetX: l,
      offsetY: h,
      scaleX: d,
      scaleY: u
    } = t, {
      posData: f,
      colData: p,
      vertexCount: m
    } = w(this, ih, sv).call(this, e, t), v = o.createBuffer({
      size: Math.max(f.byteLength, 4),
      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
    });
    f.byteLength > 0 && o.queue.writeBuffer(v, 0, f);
    const A = o.createBuffer({
      size: Math.max(p.byteLength, 4),
      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
    });
    p.byteLength > 0 && o.queue.writeBuffer(A, 0, p);
    const b = o.createBuffer({
      size: 32,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    });
    o.queue.writeBuffer(b, 0, new Float32Array([l, h, d, u, i, r, a, 0]));
    const E = o.createBindGroup({
      layout: n(this, ol).getBindGroupLayout(0),
      entries: [{
        binding: 0,
        resource: {
          buffer: b
        }
      }]
    }), S = new OffscreenCanvas(i, r), T = S.getContext("webgpu");
    T.configure({
      device: o,
      format: n(this, ll),
      alphaMode: s ? "opaque" : "premultiplied"
    });
    const x = s ? {
      r: s[0] / 255,
      g: s[1] / 255,
      b: s[2] / 255,
      a: 1
    } : {
      r: 0,
      g: 0,
      b: 0,
      a: 0
    }, C = o.createCommandEncoder(), I = C.beginRenderPass({
      colorAttachments: [{
        view: T.getCurrentTexture().createView(),
        clearValue: x,
        loadOp: "clear",
        storeOp: "store"
      }]
    });
    return m > 0 && (I.setPipeline(n(this, ol)), I.setBindGroup(0, E), I.setVertexBuffer(0, v), I.setVertexBuffer(1, A), I.draw(m)), I.end(), o.queue.submit([C.finish()]), v.destroy(), A.destroy(), b.destroy(), S.transferToImageBitmap();
  }
}
vc = new WeakMap(), al = new WeakMap(), ol = new WeakMap(), ll = new WeakMap(), ih = new WeakSet(), ev = async function() {
  if (!globalThis.navigator?.gpu)
    return !1;
  try {
    const e = await navigator.gpu.requestAdapter();
    if (!e)
      return !1;
    g(this, ll, navigator.gpu.getPreferredCanvasFormat());
    const t = g(this, al, await e.requestDevice()), s = t.createShaderModule({
      code: Sb
    });
    return g(this, ol, t.createRenderPipeline({
      layout: "auto",
      vertex: {
        module: s,
        entryPoint: "vs_main",
        buffers: [{
          arrayStride: 8,
          attributes: [{
            shaderLocation: 0,
            offset: 0,
            format: "float32x2"
          }]
        }, {
          arrayStride: 4,
          attributes: [{
            shaderLocation: 1,
            offset: 0,
            format: "unorm8x4"
          }]
        }]
      },
      fragment: {
        module: s,
        entryPoint: "fs_main",
        targets: [{
          format: n(this, ll)
        }]
      },
      primitive: {
        topology: "triangle-list"
      }
    })), !0;
  } catch {
    return !1;
  }
}, sv = function(e, t) {
  const {
    coords: s,
    colors: i
  } = t;
  let r = 0;
  for (const u of e) {
    const f = u.coords;
    if (u.type === $r.TRIANGLES)
      r += f.length;
    else if (u.type === $r.LATTICE) {
      const p = u.verticesPerRow;
      r += (Math.floor(f.length / p) - 1) * (p - 1) * 6;
    }
  }
  const a = new Float32Array(r * 2), o = new Uint8Array(r * 4);
  let l = 0, h = 0;
  const d = (u, f) => {
    a[l++] = s[u * 2], a[l++] = s[u * 2 + 1], o[h++] = i[f * 4], o[h++] = i[f * 4 + 1], o[h++] = i[f * 4 + 2], h++;
  };
  for (const u of e) {
    const f = u.coords, p = u.colors;
    if (u.type === $r.TRIANGLES)
      for (let m = 0, v = f.length; m < v; m += 3)
        d(f[m], p[m]), d(f[m + 1], p[m + 1]), d(f[m + 2], p[m + 2]);
    else if (u.type === $r.LATTICE) {
      const m = u.verticesPerRow, v = Math.floor(f.length / m) - 1, A = m - 1;
      for (let b = 0; b < v; b++) {
        let E = b * m;
        for (let S = 0; S < A; S++, E++)
          d(f[E], p[E]), d(f[E + 1], p[E + 1]), d(f[E + m], p[E + m]), d(f[E + m + 1], p[E + m + 1]), d(f[E + 1], p[E + 1]), d(f[E + m], p[E + m]);
      }
    }
  }
  return {
    posData: a,
    colData: o,
    vertexCount: r
  };
};
const ug = new xb();
function Tb() {
  ug.init();
}
function Cb() {
  return ug.isReady;
}
function Ib(c, e, t, s, i, r) {
  return ug.draw(c, e, t, s, i, r);
}
const Pe = {
  FILL: "Fill",
  STROKE: "Stroke",
  SHADING: "Shading"
};
function tu(c, e) {
  if (!e)
    return;
  const t = e[2] - e[0], s = e[3] - e[1], i = new Path2D();
  i.rect(e[0], e[1], t, s), c.clip(i);
}
class fg {
  isModifyingCurrentTransform() {
    return !1;
  }
  getPattern() {
    bt("Abstract method `getPattern` called.");
  }
}
class Pb extends fg {
  constructor(e) {
    super(), this._type = e[1], this._bbox = e[2], this._colorStops = e[3], this._p0 = e[4], this._p1 = e[5], this._r0 = e[6], this._r1 = e[7], this.matrix = null;
  }
  isOriginBased() {
    return this._p0[0] === 0 && this._p0[1] === 0 && (!this.isRadial() || this._p1[0] === 0 && this._p1[1] === 0);
  }
  isRadial() {
    return this._type === "radial";
  }
  _isCircleCenterOutside() {
    return !this.isRadial() || this._r0 > this._r1 ? !1 : Math.hypot(this._p0[0] - this._p1[0], this._p0[1] - this._p1[1]) > this._r1;
  }
  _createGradient(e, t = null) {
    let s, i = this._p0, r = this._p1;
    if (t && (i = i.slice(), r = r.slice(), j.applyTransform(i, t), j.applyTransform(r, t)), this._type === "axial")
      s = e.createLinearGradient(i[0], i[1], r[0], r[1]);
    else if (this._type === "radial") {
      let a = this._r0, o = this._r1;
      if (t) {
        const l = new Float32Array(2);
        j.singularValueDecompose2dScale(t, l), a *= l[0], o *= l[0];
      }
      s = e.createRadialGradient(i[0], i[1], a, r[0], r[1], o);
    }
    for (const a of this._colorStops)
      s.addColorStop(a[0], a[1]);
    return s;
  }
  _createReversedGradient(e, t = null) {
    let s = this._p1, i = this._p0;
    t && (s = s.slice(), i = i.slice(), j.applyTransform(s, t), j.applyTransform(i, t));
    let r = this._r1, a = this._r0;
    if (t) {
      const h = new Float32Array(2);
      j.singularValueDecompose2dScale(t, h), r *= h[0], a *= h[0];
    }
    const o = e.createRadialGradient(s[0], s[1], r, i[0], i[1], a), l = this._colorStops.map(([h, d]) => [1 - h, d]).reverse();
    for (const [h, d] of l)
      o.addColorStop(h, d);
    return o;
  }
  getPattern(e, t, s, i) {
    let r;
    if (i === Pe.STROKE || i === Pe.FILL) {
      if (this.isOriginBased()) {
        let f = j.transform(s, t.baseTransform);
        this.matrix && (f = j.transform(f, this.matrix));
        const p = 1e-3, m = Math.hypot(f[0], f[1]), v = Math.hypot(f[2], f[3]), A = (f[0] * f[2] + f[1] * f[3]) / (m * v);
        if (Math.abs(A) < p)
          if (this.isRadial()) {
            if (Math.abs(m - v) < p)
              return this._createGradient(e, f);
          } else
            return this._createGradient(e, f);
      }
      const a = t.current.getClippedPathBoundingBox(i, jt(e)) || [0, 0, 0, 0], o = Math.ceil(a[2] - a[0]) || 1, l = Math.ceil(a[3] - a[1]) || 1, h = t.canvasFactory.create(o, l), d = h.context;
      d.clearRect(0, 0, d.canvas.width, d.canvas.height), d.beginPath(), d.rect(0, 0, d.canvas.width, d.canvas.height), d.translate(-a[0], -a[1]), s = j.transform(s, [1, 0, 0, 1, a[0], a[1]]), d.transform(...t.baseTransform), this.matrix && d.transform(...this.matrix), tu(d, this._bbox), this._isCircleCenterOutside() && (d.fillStyle = this._createReversedGradient(d), d.fill()), d.fillStyle = this._createGradient(d), d.fill(), r = e.createPattern(h.canvas, "no-repeat"), t.canvasFactory.destroy(h);
      const u = new DOMMatrix(s);
      r.setTransform(u);
    } else
      this._isCircleCenterOutside() && (e.save(), tu(e, this._bbox), e.fillStyle = this._createReversedGradient(e), e.fillRect(-1e10, -1e10, 2e10, 2e10), e.restore()), tu(e, this._bbox), r = this._createGradient(e);
    return r;
  }
}
function Tf(c, e, t, s, i, r, a, o) {
  const l = e.coords, h = e.colors, d = c.data, u = c.width * 4;
  let f;
  l[t * 2 + 1] > l[s * 2 + 1] && (f = t, t = s, s = f, f = r, r = a, a = f), l[s * 2 + 1] > l[i * 2 + 1] && (f = s, s = i, i = f, f = a, a = o, o = f), l[t * 2 + 1] > l[s * 2 + 1] && (f = t, t = s, s = f, f = r, r = a, a = f);
  const p = (l[t * 2] + e.offsetX) * e.scaleX, m = (l[t * 2 + 1] + e.offsetY) * e.scaleY, v = (l[s * 2] + e.offsetX) * e.scaleX, A = (l[s * 2 + 1] + e.offsetY) * e.scaleY, b = (l[i * 2] + e.offsetX) * e.scaleX, E = (l[i * 2 + 1] + e.offsetY) * e.scaleY;
  if (m >= E)
    return;
  const S = h[r * 4], T = h[r * 4 + 1], x = h[r * 4 + 2], C = h[a * 4], I = h[a * 4 + 1], M = h[a * 4 + 2], P = h[o * 4], O = h[o * 4 + 1], D = h[o * 4 + 2], $ = Math.round(m), F = Math.round(E);
  let N, K, B, k, _, st, mt, ft;
  for (let et = $; et <= F; et++) {
    if (et < A) {
      const L = et < m ? 0 : (m - et) / (m - A);
      N = p - (p - v) * L, K = S - (S - C) * L, B = T - (T - I) * L, k = x - (x - M) * L;
    } else {
      let L;
      et > E ? L = 1 : A === E ? L = 0 : L = (A - et) / (A - E), N = v - (v - b) * L, K = C - (C - P) * L, B = I - (I - O) * L, k = M - (M - D) * L;
    }
    let J;
    et < m ? J = 0 : et > E ? J = 1 : J = (m - et) / (m - E), _ = p - (p - b) * J, st = S - (S - P) * J, mt = T - (T - O) * J, ft = x - (x - D) * J;
    const lt = Math.round(Math.min(N, _)), Mt = Math.round(Math.max(N, _));
    let U = u * et + lt * 4;
    for (let L = lt; L <= Mt; L++)
      J = (N - L) / (N - _), J < 0 ? J = 0 : J > 1 && (J = 1), d[U++] = K - (K - st) * J | 0, d[U++] = B - (B - mt) * J | 0, d[U++] = k - (k - ft) * J | 0, d[U++] = 255;
  }
}
function Rb(c, e, t) {
  const s = e.coords, i = e.colors;
  let r, a;
  switch (e.type) {
    case $r.LATTICE:
      const o = e.verticesPerRow, l = Math.floor(s.length / o) - 1, h = o - 1;
      for (r = 0; r < l; r++) {
        let d = r * o;
        for (let u = 0; u < h; u++, d++)
          Tf(c, t, s[d], s[d + 1], s[d + o], i[d], i[d + 1], i[d + o]), Tf(c, t, s[d + o + 1], s[d + 1], s[d + o], i[d + o + 1], i[d + 1], i[d + o]);
      }
      break;
    case $r.TRIANGLES:
      for (r = 0, a = s.length; r < a; r += 3)
        Tf(c, t, s[r], s[r + 1], s[r + 2], i[r], i[r + 1], i[r + 2]);
      break;
    default:
      throw new Error("illegal figure");
  }
}
class Db extends fg {
  constructor(e) {
    super(), this._coords = e[2], this._colors = e[3], this._figures = e[4], this._bounds = e[5], this._bbox = e[6], this._background = e[7], this.matrix = null;
  }
  _createMeshCanvas(e, t, s) {
    const o = Math.floor(this._bounds[0]), l = Math.floor(this._bounds[1]), h = Math.ceil(this._bounds[2]) - o, d = Math.ceil(this._bounds[3]) - l, u = Math.min(Math.ceil(Math.abs(h * e[0] * 1.1)), 3e3) || 1, f = Math.min(Math.ceil(Math.abs(d * e[1] * 1.1)), 3e3) || 1, p = h ? h / u : 1, m = d ? d / f : 1, v = {
      coords: this._coords,
      colors: this._colors,
      offsetX: -o,
      offsetY: -l,
      scaleX: 1 / p,
      scaleY: 1 / m
    }, A = u + 4, b = f + 4, E = s.create(A, b);
    if (Cb())
      E.context.drawImage(Ib(this._figures, v, t, A, b, 2), 0, 0);
    else {
      const S = E.context.createImageData(u, f);
      if (t) {
        const T = S.data;
        for (let x = 0, C = T.length; x < C; x += 4)
          T[x] = t[0], T[x + 1] = t[1], T[x + 2] = t[2], T[x + 3] = 255;
      }
      for (const T of this._figures)
        Rb(S, T, v);
      E.context.putImageData(S, 2, 2);
    }
    return {
      canvas: E.canvas,
      offsetX: o - 2 * p,
      offsetY: l - 2 * m,
      scaleX: p,
      scaleY: m
    };
  }
  isModifyingCurrentTransform() {
    return !0;
  }
  getPattern(e, t, s, i) {
    tu(e, this._bbox);
    const r = new Float32Array(2);
    if (i === Pe.SHADING)
      j.singularValueDecompose2dScale(jt(e), r);
    else if (this.matrix) {
      j.singularValueDecompose2dScale(this.matrix, r);
      const [l, h] = r;
      j.singularValueDecompose2dScale(t.baseTransform, r), r[0] *= l, r[1] *= h;
    } else
      j.singularValueDecompose2dScale(t.baseTransform, r);
    const a = this._createMeshCanvas(r, i === Pe.SHADING ? null : this._background, t.canvasFactory);
    i !== Pe.SHADING && (e.setTransform(...t.baseTransform), this.matrix && e.transform(...this.matrix)), e.translate(a.offsetX, a.offsetY), e.scale(a.scaleX, a.scaleY);
    const o = e.createPattern(a.canvas, "no-repeat");
    return t.canvasFactory.destroy(a), o;
  }
}
class Mb extends fg {
  getPattern() {
    return "hotpink";
  }
}
function Ob(c) {
  switch (c[0]) {
    case "RadialAxial":
      return new Pb(c);
    case "Mesh":
      return new Db(c);
    case "Dummy":
      return new Mb();
  }
  throw new Error(`Unknown IR type: ${c[0]}`);
}
const Gg = {
  COLORED: 1,
  UNCOLORED: 2
}, Yu = class Yu {
  constructor(e, t, s, i) {
    this.color = e[1], this.operatorList = e[2], this.matrix = e[3], this.bbox = e[4], this.xstep = e[5], this.ystep = e[6], this.paintType = e[7], this.tilingType = e[8], this.ctx = t, this.canvasGraphicsFactory = s, this.baseTransform = i;
  }
  createPatternCanvas(e, t) {
    const {
      bbox: s,
      operatorList: i,
      paintType: r,
      tilingType: a,
      color: o,
      canvasGraphicsFactory: l
    } = this;
    let {
      xstep: h,
      ystep: d
    } = this;
    h = Math.abs(h), d = Math.abs(d), hf("TilingType: " + a);
    const u = s[0], f = s[1], p = s[2], m = s[3], v = p - u, A = m - f, b = new Float32Array(2);
    j.singularValueDecompose2dScale(this.matrix, b);
    const [E, S] = b;
    j.singularValueDecompose2dScale(this.baseTransform, b);
    const T = E * b[0], x = S * b[1];
    let C = v, I = A, M = !1, P = !1;
    const O = Math.ceil(h * T), D = Math.ceil(d * x), $ = Math.ceil(v * T), F = Math.ceil(A * x);
    O >= $ ? C = h : M = !0, D >= F ? I = d : P = !0;
    const N = this.getSizeAndScale(C, this.ctx.canvas.width, T), K = this.getSizeAndScale(I, this.ctx.canvas.height, x), B = e.canvasFactory.create(N.size, K.size), k = B.context, _ = l.createCanvasGraphics(k, t);
    if (_.groupLevel = e.groupLevel, this.setFillAndStrokeStyleToContext(_, r, o), k.translate(-N.scale * u, -K.scale * f), _.transform(0, N.scale, 0, 0, K.scale, 0, 0), k.save(), _.dependencyTracker?.save(), this.clipBbox(_, u, f, p, m), _.baseTransform = jt(_.ctx), _.executeOperatorList(i), _.endDrawing(), _.dependencyTracker?.restore(), k.restore(), M || P) {
      const st = B.canvas;
      M && (C = h), P && (I = d);
      const mt = this.getSizeAndScale(C, this.ctx.canvas.width, T), ft = this.getSizeAndScale(I, this.ctx.canvas.height, x), et = mt.size, J = ft.size, lt = e.canvasFactory.create(et, J), Mt = lt.context, U = M ? Math.floor(v / h) : 0, L = P ? Math.floor(A / d) : 0;
      for (let H = 0; H <= U; H++)
        for (let X = 0; X <= L; X++)
          Mt.drawImage(st, et * H, J * X, et, J, 0, 0, et, J);
      return e.canvasFactory.destroy(B), {
        canvas: lt.canvas,
        canvasEntry: lt,
        scaleX: mt.scale,
        scaleY: ft.scale,
        offsetX: u,
        offsetY: f
      };
    }
    return {
      canvas: B.canvas,
      canvasEntry: B,
      scaleX: N.scale,
      scaleY: K.scale,
      offsetX: u,
      offsetY: f
    };
  }
  getSizeAndScale(e, t, s) {
    const i = Math.max(Yu.MAX_PATTERN_SIZE, t);
    let r = Math.ceil(e * s);
    return r >= i ? r = i : s = r / e, {
      scale: s,
      size: r
    };
  }
  clipBbox(e, t, s, i, r) {
    const a = i - t, o = r - s;
    e.ctx.rect(t, s, a, o), j.axialAlignedBoundingBox([t, s, i, r], jt(e.ctx), e.current.minMax), e.clip(), e.endPath();
  }
  setFillAndStrokeStyleToContext(e, t, s) {
    const i = e.ctx, r = e.current;
    switch (t) {
      case Gg.COLORED:
        const {
          fillStyle: a,
          strokeStyle: o
        } = this.ctx;
        i.fillStyle = r.fillColor = a, i.strokeStyle = r.strokeColor = o;
        break;
      case Gg.UNCOLORED:
        i.fillStyle = i.strokeStyle = s, r.fillColor = r.strokeColor = s;
        break;
      default:
        throw new ky(`Unsupported paint type: ${t}`);
    }
  }
  isModifyingCurrentTransform() {
    return !1;
  }
  getPattern(e, t, s, i, r) {
    let a = s;
    i !== Pe.SHADING && (a = j.transform(a, t.baseTransform), this.matrix && (a = j.transform(a, this.matrix)));
    const o = this.createPatternCanvas(t, r);
    let l = new DOMMatrix(a);
    l = l.translate(o.offsetX, o.offsetY), l = l.scale(1 / o.scaleX, 1 / o.scaleY);
    const h = e.createPattern(o.canvas, "repeat");
    return t.canvasFactory.destroy(o.canvasEntry), h.setTransform(l), h;
  }
};
R(Yu, "MAX_PATTERN_SIZE", 3e3);
let rp = Yu;
function Lb({
  src: c,
  srcPos: e = 0,
  dest: t,
  width: s,
  height: i,
  nonBlackColor: r = 4294967295,
  inverseDecode: a = !1
}) {
  const o = de.isLittleEndian ? 4278190080 : 255, [l, h] = a ? [r, o] : [o, r], d = s >> 3, u = s & 7, f = l ^ h, p = c.length;
  t = new Uint32Array(t.buffer);
  let m = 0;
  for (let v = 0; v < i; ++v) {
    for (const b = e + d; e < b; ++e, m += 8) {
      const E = c[e];
      t[m] = l ^ -(E >> 7 & 1) & f, t[m + 1] = l ^ -(E >> 6 & 1) & f, t[m + 2] = l ^ -(E >> 5 & 1) & f, t[m + 3] = l ^ -(E >> 4 & 1) & f, t[m + 4] = l ^ -(E >> 3 & 1) & f, t[m + 5] = l ^ -(E >> 2 & 1) & f, t[m + 6] = l ^ -(E >> 1 & 1) & f, t[m + 7] = l ^ -(E & 1) & f;
    }
    if (u === 0)
      continue;
    const A = e < p ? c[e++] : 255;
    for (let b = 0; b < u; ++b, ++m)
      t[m] = l ^ -(A >> 7 - b & 1) & f;
  }
  return {
    srcPos: e,
    destPos: m
  };
}
const _g = 16, Wg = 100, Fb = 15, Vg = 10, ss = 16, Cf = new DOMMatrix(), Ts = new Float32Array(2), So = new Float32Array([1 / 0, 1 / 0, -1 / 0, -1 / 0]);
function kb(c, e) {
  if (c._removeMirroring)
    throw new Error("Context is already forwarding operations.");
  c.__originalSave = c.save, c.__originalRestore = c.restore, c.__originalRotate = c.rotate, c.__originalScale = c.scale, c.__originalTranslate = c.translate, c.__originalTransform = c.transform, c.__originalSetTransform = c.setTransform, c.__originalResetTransform = c.resetTransform, c.__originalClip = c.clip, c.__originalMoveTo = c.moveTo, c.__originalLineTo = c.lineTo, c.__originalBezierCurveTo = c.bezierCurveTo, c.__originalRect = c.rect, c.__originalClosePath = c.closePath, c.__originalBeginPath = c.beginPath, c._removeMirroring = () => {
    c.save = c.__originalSave, c.restore = c.__originalRestore, c.rotate = c.__originalRotate, c.scale = c.__originalScale, c.translate = c.__originalTranslate, c.transform = c.__originalTransform, c.setTransform = c.__originalSetTransform, c.resetTransform = c.__originalResetTransform, c.clip = c.__originalClip, c.moveTo = c.__originalMoveTo, c.lineTo = c.__originalLineTo, c.bezierCurveTo = c.__originalBezierCurveTo, c.rect = c.__originalRect, c.closePath = c.__originalClosePath, c.beginPath = c.__originalBeginPath, delete c._removeMirroring;
  }, c.save = function() {
    e.save(), this.__originalSave();
  }, c.restore = function() {
    e.restore(), this.__originalRestore();
  }, c.translate = function(t, s) {
    e.translate(t, s), this.__originalTranslate(t, s);
  }, c.scale = function(t, s) {
    e.scale(t, s), this.__originalScale(t, s);
  }, c.transform = function(t, s, i, r, a, o) {
    e.transform(t, s, i, r, a, o), this.__originalTransform(t, s, i, r, a, o);
  }, c.setTransform = function(t, s, i, r, a, o) {
    e.setTransform(t, s, i, r, a, o), this.__originalSetTransform(t, s, i, r, a, o);
  }, c.resetTransform = function() {
    e.resetTransform(), this.__originalResetTransform();
  }, c.rotate = function(t) {
    e.rotate(t), this.__originalRotate(t);
  }, c.clip = function(t) {
    e.clip(t), this.__originalClip(t);
  }, c.moveTo = function(t, s) {
    e.moveTo(t, s), this.__originalMoveTo(t, s);
  }, c.lineTo = function(t, s) {
    e.lineTo(t, s), this.__originalLineTo(t, s);
  }, c.bezierCurveTo = function(t, s, i, r, a, o) {
    e.bezierCurveTo(t, s, i, r, a, o), this.__originalBezierCurveTo(t, s, i, r, a, o);
  }, c.rect = function(t, s, i, r) {
    e.rect(t, s, i, r), this.__originalRect(t, s, i, r);
  }, c.closePath = function() {
    e.closePath(), this.__originalClosePath();
  }, c.beginPath = function() {
    e.beginPath(), this.__originalBeginPath();
  };
}
function Bd(c, e, t, s, i, r, a, o, l, h) {
  const [d, u, f, p, m, v] = jt(c);
  if (u === 0 && f === 0) {
    const E = a * d + m, S = Math.round(E), T = o * p + v, x = Math.round(T), C = (a + l) * d + m, I = Math.abs(Math.round(C) - S) || 1, M = (o + h) * p + v, P = Math.abs(Math.round(M) - x) || 1;
    return c.setTransform(Math.sign(d), 0, 0, Math.sign(p), S, x), c.drawImage(e, t, s, i, r, 0, 0, I, P), c.setTransform(d, u, f, p, m, v), [I, P];
  }
  if (d === 0 && p === 0) {
    const E = o * f + m, S = Math.round(E), T = a * u + v, x = Math.round(T), C = (o + h) * f + m, I = Math.abs(Math.round(C) - S) || 1, M = (a + l) * u + v, P = Math.abs(Math.round(M) - x) || 1;
    return c.setTransform(0, Math.sign(u), Math.sign(f), 0, S, x), c.drawImage(e, t, s, i, r, 0, 0, P, I), c.setTransform(d, u, f, p, m, v), [P, I];
  }
  c.drawImage(e, t, s, i, r, a, o, l, h);
  const A = Math.hypot(d, u), b = Math.hypot(f, p);
  return [A * l, b * h];
}
class zg {
  constructor(e, t) {
    R(this, "alphaIsShape", !1);
    R(this, "fontSize", 0);
    R(this, "fontSizeScale", 1);
    R(this, "textMatrix", null);
    R(this, "textMatrixScale", 1);
    R(this, "fontMatrix", Rf);
    R(this, "leading", 0);
    R(this, "x", 0);
    R(this, "y", 0);
    R(this, "lineX", 0);
    R(this, "lineY", 0);
    R(this, "charSpacing", 0);
    R(this, "wordSpacing", 0);
    R(this, "textHScale", 1);
    R(this, "textRenderingMode", oe.FILL);
    R(this, "textRise", 0);
    R(this, "fillColor", "#000000");
    R(this, "strokeColor", "#000000");
    R(this, "patternFill", !1);
    R(this, "patternStroke", !1);
    R(this, "fillAlpha", 1);
    R(this, "strokeAlpha", 1);
    R(this, "lineWidth", 1);
    R(this, "activeSMask", null);
    R(this, "transferMaps", "none");
    R(this, "minMax", So.slice());
    this.clipBox = new Float32Array([0, 0, e, t]);
  }
  clone() {
    const e = Object.create(this);
    return e.clipBox = this.clipBox.slice(), e.minMax = this.minMax.slice(), e;
  }
  getPathBoundingBox(e = Pe.FILL, t = null) {
    const s = this.minMax.slice();
    if (e === Pe.STROKE) {
      t || bt("Stroke bounding box must include transform."), j.singularValueDecompose2dScale(t, Ts);
      const i = Ts[0] * this.lineWidth / 2, r = Ts[1] * this.lineWidth / 2;
      s[0] -= i, s[1] -= r, s[2] += i, s[3] += r;
    }
    return s;
  }
  updateClipFromPath() {
    const e = j.intersect(this.clipBox, this.getPathBoundingBox());
    this.startNewPathAndClipBox(e || [0, 0, 0, 0]);
  }
  isEmptyClip() {
    return this.minMax[0] === 1 / 0;
  }
  startNewPathAndClipBox(e) {
    this.clipBox.set(e, 0), this.minMax.set(So, 0);
  }
  getClippedPathBoundingBox(e = Pe.FILL, t = null) {
    return j.intersect(this.clipBox, this.getPathBoundingBox(e, t));
  }
}
function Xg(c, e) {
  if (e instanceof ImageData) {
    c.putImageData(e, 0, 0);
    return;
  }
  const t = e.height, s = e.width, i = t % ss, r = (t - i) / ss, a = i === 0 ? r : r + 1, o = c.createImageData(s, ss);
  let l = 0, h;
  const d = e.data, u = o.data;
  let f, p, m, v;
  if (e.kind === Gd.GRAYSCALE_1BPP) {
    const A = d.byteLength, b = new Uint32Array(u.buffer, 0, u.byteLength >> 2), E = b.length, S = s + 7 >> 3, T = 4294967295, x = de.isLittleEndian ? 4278190080 : 255;
    for (f = 0; f < a; f++) {
      for (m = f < r ? ss : i, h = 0, p = 0; p < m; p++) {
        const C = A - l;
        let I = 0;
        const M = C > S ? s : C * 8 - 7, P = M & -8;
        let O = 0, D = 0;
        for (; I < P; I += 8)
          D = d[l++], b[h++] = D & 128 ? T : x, b[h++] = D & 64 ? T : x, b[h++] = D & 32 ? T : x, b[h++] = D & 16 ? T : x, b[h++] = D & 8 ? T : x, b[h++] = D & 4 ? T : x, b[h++] = D & 2 ? T : x, b[h++] = D & 1 ? T : x;
        for (; I < M; I++)
          O === 0 && (D = d[l++], O = 128), b[h++] = D & O ? T : x, O >>= 1;
      }
      for (; h < E; )
        b[h++] = 0;
      c.putImageData(o, 0, f * ss);
    }
  } else if (e.kind === Gd.RGBA_32BPP) {
    for (p = 0, v = s * ss * 4, f = 0; f < r; f++)
      u.set(d.subarray(l, l + v)), l += v, c.putImageData(o, 0, p), p += ss;
    f < a && (v = s * i * 4, u.set(d.subarray(l, l + v)), c.putImageData(o, 0, p));
  } else if (e.kind === Gd.RGB_24BPP)
    for (m = ss, v = s * m, f = 0; f < a; f++) {
      for (f >= r && (m = i, v = s * m), h = 0, p = v; p--; )
        u[h++] = d[l++], u[h++] = d[l++], u[h++] = d[l++], u[h++] = 255;
      c.putImageData(o, 0, f * ss);
    }
  else
    throw new Error(`bad image kind: ${e.kind}`);
}
function Yg(c, e) {
  if (e.bitmap) {
    c.drawImage(e.bitmap, 0, 0);
    return;
  }
  const t = e.height, s = e.width, i = t % ss, r = (t - i) / ss, a = i === 0 ? r : r + 1, o = c.createImageData(s, ss);
  let l = 0;
  const h = e.data, d = o.data;
  for (let u = 0; u < a; u++) {
    const f = u < r ? ss : i;
    ({
      srcPos: l
    } = Lb({
      src: h,
      srcPos: l,
      dest: d,
      width: s,
      height: f,
      nonBlackColor: 0
    })), c.putImageData(o, 0, u * ss);
  }
}
function ah(c, e) {
  const t = ["strokeStyle", "fillStyle", "fillRule", "globalAlpha", "lineWidth", "lineCap", "lineJoin", "miterLimit", "globalCompositeOperation", "font", "filter"];
  for (const s of t)
    c[s] !== void 0 && (e[s] = c[s]);
  c.setLineDash !== void 0 && (e.setLineDash(c.getLineDash()), e.lineDashOffset = c.lineDashOffset);
}
function Ud(c) {
  c.strokeStyle = c.fillStyle = "#000000", c.fillRule = "nonzero", c.globalAlpha = 1, c.lineWidth = 1, c.lineCap = "butt", c.lineJoin = "miter", c.miterLimit = 10, c.globalCompositeOperation = "source-over", c.font = "10px sans-serif", c.setLineDash !== void 0 && (c.setLineDash([]), c.lineDashOffset = 0);
  const {
    filter: e
  } = c;
  e !== "none" && e !== "" && (c.filter = "none");
}
function Kg(c, e) {
  if (e)
    return !0;
  j.singularValueDecompose2dScale(c, Ts);
  const t = Math.fround(Ui.pixelRatio * Mr.PDF_TO_CSS_UNITS);
  return Ts[0] <= t && Ts[1] <= t;
}
const Nb = ["butt", "round", "square"], Bb = ["miter", "round", "bevel"], Ub = {}, Jg = {};
var di, ap, op, lp;
const Eg = class Eg {
  constructor(e, t, s, i, r, {
    optionalContentConfig: a,
    markedContentStack: o = null
  }, l, h, d, u) {
    y(this, di);
    this.ctx = e, this.current = new zg(this.ctx.canvas.width, this.ctx.canvas.height), this.stateStack = [], this.pendingClip = null, this.pendingEOFill = !1, this.commonObjs = t, this.objs = s, this.canvasFactory = i, this.filterFactory = r, this.groupStack = [], this.baseTransform = null, this.baseTransformStack = [], this.groupLevel = 0, this.smaskStack = [], this.smaskCounter = 0, this.tempSMask = null, this.smaskGroupCanvases = [], this.suspendedCtx = null, this.contentVisible = !0, this.markedContentStack = o || [], this.optionalContentConfig = a, this.cachedPatterns = /* @__PURE__ */ new Map(), this.annotationCanvasMap = l, this.viewportScale = 1, this.outputScaleX = 1, this.outputScaleY = 1, this.pageColors = h, this._cachedScaleForStroking = [-1, 0], this._cachedGetSinglePixelWidth = null, this._cachedBitmapsMap = /* @__PURE__ */ new Map(), this.dependencyTracker = d ?? null, this.imagesTracker = u ?? null;
  }
  getObject(e, t, s = null) {
    return typeof t == "string" ? (this.dependencyTracker?.recordNamedDependency(e, t), t.startsWith("g_") ? this.commonObjs.get(t) : this.objs.get(t)) : s;
  }
  beginDrawing({
    transform: e,
    viewport: t,
    transparency: s = !1,
    background: i = null
  }) {
    const r = this.ctx.canvas.width, a = this.ctx.canvas.height, o = this.ctx.fillStyle;
    if (this.ctx.fillStyle = i || "#ffffff", this.ctx.fillRect(0, 0, r, a), this.ctx.fillStyle = o, s) {
      const l = this.transparentCanvasEntry = this.canvasFactory.create(r, a);
      this.compositeCtx = this.ctx, {
        canvas: this.transparentCanvas,
        context: this.ctx
      } = l, this.ctx.save(), this.ctx.transform(...jt(this.compositeCtx));
    }
    this.ctx.save(), Ud(this.ctx), e && (this.ctx.transform(...e), this.outputScaleX = e[0], this.outputScaleY = e[0]), this.ctx.transform(...t.transform), this.viewportScale = t.scale, this.baseTransform = jt(this.ctx);
  }
  executeOperatorList(e, t, s, i, r) {
    const a = e.argsArray, o = e.fnArray;
    let l = t || 0;
    const h = a.length;
    if (h === l)
      return l;
    const d = h - l > Vg && typeof s == "function", u = d ? Date.now() + Fb : 0;
    let f = 0;
    const p = this.commonObjs, m = this.objs;
    let v, A;
    for (; ; ) {
      if (i !== void 0) {
        if (l === i.nextBreakPoint)
          return i.breakIt(l, s), l;
        if (i.shouldSkip(l)) {
          if (++l === h)
            return l;
          continue;
        }
      }
      if (!r || r(l))
        if (v = o[l], A = a[l] ?? null, v !== kh.dependency)
          A === null ? this[v](l) : this[v](l, ...A);
        else
          for (const b of A) {
            this.dependencyTracker?.recordNamedData(b, l);
            const E = b.startsWith("g_") ? p : m;
            if (!E.has(b))
              return E.get(b, s), l;
          }
      if (l++, l === h)
        return l;
      if (d && ++f > Vg) {
        if (Date.now() > u)
          return s(), l;
        f = 0;
      }
    }
  }
  endDrawing() {
    w(this, di, ap).call(this);
    for (const e of this.smaskGroupCanvases)
      this.canvasFactory.destroy(e);
    this.smaskGroupCanvases.length = 0, this.tempSMask = null, this.smaskStack.length = 0, this.cachedPatterns.clear();
    for (const e of this._cachedBitmapsMap.values()) {
      for (const t of e.values())
        typeof HTMLCanvasElement < "u" && t instanceof HTMLCanvasElement && (t.width = t.height = 0);
      e.clear();
    }
    this._cachedBitmapsMap.clear(), w(this, di, op).call(this);
  }
  _scaleImage(e, t) {
    const s = e.width ?? e.displayWidth, i = e.height ?? e.displayHeight, r = Math.max(Math.hypot(t[0], t[1]), 1), a = Math.max(Math.hypot(t[2], t[3]), 1), o = [];
    let l = r, h = a, d = s, u = i;
    for (; l > 2 && d > 1 || h > 2 && u > 1; ) {
      let b = d, E = u;
      l > 2 && d > 1 && (b = d >= 16384 ? Math.floor(d / 2) - 1 || 1 : Math.ceil(d / 2), l /= d / b), h > 2 && u > 1 && (E = u >= 16384 ? Math.floor(u / 2) - 1 || 1 : Math.ceil(u) / 2, h /= u / E), o.push({
        newWidth: b,
        newHeight: E
      }), d = b, u = E;
    }
    if (o.length === 0)
      return {
        img: e,
        paintWidth: s,
        paintHeight: i,
        tmpCanvas: null
      };
    if (o.length === 1) {
      const {
        newWidth: b,
        newHeight: E
      } = o[0], S = this.canvasFactory.create(b, E);
      return S.context.drawImage(e, 0, 0, s, i, 0, 0, b, E), {
        img: S.canvas,
        paintWidth: b,
        paintHeight: E,
        tmpCanvas: S
      };
    }
    let f = this.canvasFactory.create(1, 1), p = this.canvasFactory.create(1, 1), m = s, v = i, A = e;
    for (const {
      newWidth: b,
      newHeight: E
    } of o)
      this.canvasFactory.reset(p, b, E), p.context.drawImage(A, 0, 0, m, v, 0, 0, b, E), [f, p] = [p, f], A = f.canvas, m = b, v = E;
    return this.canvasFactory.destroy(p), {
      img: f.canvas,
      paintWidth: m,
      paintHeight: v,
      tmpCanvas: f
    };
  }
  _createMaskCanvas(e, t) {
    const s = this.ctx, {
      width: i,
      height: r
    } = t, a = this.current.fillColor, o = this.current.patternFill, l = jt(s);
    let h, d, u, f;
    if ((t.bitmap || t.data) && t.count > 1) {
      const D = t.bitmap || t.data.buffer;
      d = JSON.stringify(o ? l : [l.slice(0, 4), a]), h = this._cachedBitmapsMap.getOrInsertComputed(D, og);
      const $ = h.get(d);
      if ($ && !o) {
        const F = Math.round(Math.min(l[0], l[2]) + l[4]), N = Math.round(Math.min(l[1], l[3]) + l[5]);
        return this.dependencyTracker?.recordDependencies(e, Rs.transformAndFill), {
          canvas: $,
          offsetX: F,
          offsetY: N
        };
      }
      u = $;
    }
    u || (f = this.canvasFactory.create(i, r), Yg(f.context, t));
    let p = j.transform(l, [1 / i, 0, 0, -1 / r, 0, 0]);
    p = j.transform(p, [1, 0, 0, 1, 0, -r]);
    const m = So.slice();
    j.axialAlignedBoundingBox([0, 0, i, r], p, m);
    const [v, A, b, E] = m, S = Math.round(b - v) || 1, T = Math.round(E - A) || 1, x = this.canvasFactory.create(S, T), C = x.context, I = v, M = A;
    C.translate(-I, -M), C.transform(...p);
    let P = null;
    if (!u) {
      const D = this._scaleImage(f.canvas, ui(C));
      u = D.img, P = D.tmpCanvas, u !== f.canvas && (this.canvasFactory.destroy(f), f = null), h && o && (h.set(d, u), P = null, f = null);
    }
    C.imageSmoothingEnabled = Kg(jt(C), t.interpolate), Bd(C, u, 0, 0, u.width, u.height, 0, 0, i, r), P && this.canvasFactory.destroy(P), f && this.canvasFactory.destroy(f), C.globalCompositeOperation = "source-in";
    const O = j.transform(ui(C), [1, 0, 0, 1, -I, -M]);
    return C.fillStyle = o ? a.getPattern(s, this, O, Pe.FILL, e) : a, C.fillRect(0, 0, i, r), h && !o && h.set(d, x.canvas), this.dependencyTracker?.recordDependencies(e, Rs.transformAndFill), {
      canvas: x.canvas,
      canvasEntry: h && !o ? null : x,
      offsetX: Math.round(I),
      offsetY: Math.round(M)
    };
  }
  setLineWidth(e, t) {
    this.dependencyTracker?.recordSimpleData("lineWidth", e), t !== this.current.lineWidth && (this._cachedScaleForStroking[0] = -1), this.current.lineWidth = t, this.ctx.lineWidth = t;
  }
  setLineCap(e, t) {
    this.dependencyTracker?.recordSimpleData("lineCap", e), this.ctx.lineCap = Nb[t];
  }
  setLineJoin(e, t) {
    this.dependencyTracker?.recordSimpleData("lineJoin", e), this.ctx.lineJoin = Bb[t];
  }
  setMiterLimit(e, t) {
    this.dependencyTracker?.recordSimpleData("miterLimit", e), this.ctx.miterLimit = t;
  }
  setDash(e, t, s) {
    this.dependencyTracker?.recordSimpleData("dash", e);
    const i = this.ctx;
    i.setLineDash !== void 0 && (i.setLineDash(t), i.lineDashOffset = s);
  }
  setRenderingIntent(e, t) {
  }
  setFlatness(e, t) {
  }
  setGState(e, t) {
    for (const [s, i] of t)
      switch (s) {
        case "LW":
          this.setLineWidth(e, i);
          break;
        case "LC":
          this.setLineCap(e, i);
          break;
        case "LJ":
          this.setLineJoin(e, i);
          break;
        case "ML":
          this.setMiterLimit(e, i);
          break;
        case "D":
          this.setDash(e, i[0], i[1]);
          break;
        case "RI":
          this.setRenderingIntent(e, i);
          break;
        case "FL":
          this.setFlatness(e, i);
          break;
        case "Font":
          this.setFont(e, i[0], i[1]);
          break;
        case "CA":
          this.dependencyTracker?.recordSimpleData("strokeAlpha", e), this.current.strokeAlpha = i;
          break;
        case "ca":
          this.dependencyTracker?.recordSimpleData("fillAlpha", e), this.ctx.globalAlpha = this.current.fillAlpha = i;
          break;
        case "BM":
          this.dependencyTracker?.recordSimpleData("globalCompositeOperation", e), this.ctx.globalCompositeOperation = i;
          break;
        case "SMask":
          this.dependencyTracker?.recordSimpleData("SMask", e), this.current.activeSMask = i ? this.tempSMask : null, this.tempSMask = null, this.checkSMaskState();
          break;
        case "TR":
          this.dependencyTracker?.recordSimpleData("filter", e), this.ctx.filter = this.current.transferMaps = this.filterFactory.addFilter(i);
          break;
      }
  }
  get inSMaskMode() {
    return !!this.suspendedCtx;
  }
  checkSMaskState() {
    const e = this.inSMaskMode;
    this.current.activeSMask && !e ? this.beginSMaskMode() : !this.current.activeSMask && e && this.endSMaskMode();
  }
  beginSMaskMode(e) {
    if (this.inSMaskMode)
      throw new Error("beginSMaskMode called while already in smask mode");
    const t = this.ctx.canvas.width, s = this.ctx.canvas.height, i = this.canvasFactory.create(t, s);
    this.smaskScratchCanvas = i, this.suspendedCtx = this.ctx;
    const r = this.ctx = i.context;
    r.setTransform(this.suspendedCtx.getTransform()), ah(this.suspendedCtx, r), kb(r, this.suspendedCtx), this.setGState(e, [["BM", "source-over"]]);
  }
  endSMaskMode() {
    if (!this.inSMaskMode)
      throw new Error("endSMaskMode called while not in smask mode");
    this.ctx._removeMirroring(), ah(this.ctx, this.suspendedCtx), this.ctx = this.suspendedCtx, this.suspendedCtx = null, this.canvasFactory.destroy(this.smaskScratchCanvas), this.smaskScratchCanvas = null;
  }
  compose(e) {
    if (!this.current.activeSMask)
      return;
    e ? (e[0] = Math.floor(e[0]), e[1] = Math.floor(e[1]), e[2] = Math.ceil(e[2]), e[3] = Math.ceil(e[3])) : e = [0, 0, this.ctx.canvas.width, this.ctx.canvas.height];
    const t = this.current.activeSMask, s = this.suspendedCtx;
    this.composeSMask(s, t, this.ctx, e), this.ctx.save(), this.ctx.setTransform(1, 0, 0, 1, 0, 0), this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height), this.ctx.restore();
  }
  composeSMask(e, t, s, i) {
    const r = i[0], a = i[1], o = i[2] - r, l = i[3] - a;
    o === 0 || l === 0 || (this.genericComposeSMask(t.context, s, o, l, t.subtype, t.backdrop, t.transferMap, r, a, t.offsetX, t.offsetY), e.save(), e.globalAlpha = 1, e.globalCompositeOperation = "source-over", e.setTransform(1, 0, 0, 1, 0, 0), e.drawImage(s.canvas, 0, 0), e.restore());
  }
  genericComposeSMask(e, t, s, i, r, a, o, l, h, d, u) {
    let f = e.canvas, p = l - d, m = h - u, v = null;
    if (a)
      if (p < 0 || m < 0 || p + s > f.width || m + i > f.height) {
        v = this.canvasFactory.create(s, i);
        const b = v.context;
        b.drawImage(f, -p, -m), b.globalCompositeOperation = "destination-atop", b.fillStyle = a, b.fillRect(0, 0, s, i), b.globalCompositeOperation = "source-over", f = v.canvas, p = m = 0;
      } else {
        e.save(), e.globalAlpha = 1, e.setTransform(1, 0, 0, 1, 0, 0);
        const b = new Path2D();
        b.rect(p, m, s, i), e.clip(b), e.globalCompositeOperation = "destination-atop", e.fillStyle = a, e.fillRect(p, m, s, i), e.restore();
      }
    t.save(), t.globalAlpha = 1, t.setTransform(1, 0, 0, 1, 0, 0), r === "Alpha" && o ? t.filter = this.filterFactory.addAlphaFilter(o) : r === "Luminosity" && (t.filter = this.filterFactory.addLuminosityFilter(o));
    const A = new Path2D();
    A.rect(l, h, s, i), t.clip(A), t.globalCompositeOperation = "destination-in", t.drawImage(f, p, m, s, i, l, h, s, i), t.restore(), v && this.canvasFactory.destroy(v);
  }
  save(e) {
    this.inSMaskMode && ah(this.ctx, this.suspendedCtx), this.ctx.save();
    const t = this.current;
    this.stateStack.push(t), this.current = t.clone(), this.dependencyTracker?.save(e);
  }
  restore(e) {
    if (this.dependencyTracker?.restore(e), this.stateStack.length === 0) {
      this.inSMaskMode && this.endSMaskMode();
      return;
    }
    this.current = this.stateStack.pop(), this.ctx.restore(), this.inSMaskMode && ah(this.suspendedCtx, this.ctx), this.checkSMaskState(), this.pendingClip = null, this._cachedScaleForStroking[0] = -1, this._cachedGetSinglePixelWidth = null;
  }
  transform(e, t, s, i, r, a, o) {
    this.dependencyTracker?.recordIncrementalData("transform", e), this.ctx.transform(t, s, i, r, a, o), this._cachedScaleForStroking[0] = -1, this._cachedGetSinglePixelWidth = null;
  }
  constructPath(e, t, s, i) {
    let [r] = s;
    if (!i) {
      r || (r = s[0] = new Path2D()), this[t](e, r);
      return;
    }
    if (this.dependencyTracker !== null) {
      const a = t === kh.stroke ? this.current.lineWidth / 2 : 0;
      this.dependencyTracker.resetBBox(e).recordBBox(e, this.ctx, i[0] - a, i[2] + a, i[1] - a, i[3] + a).recordDependencies(e, ["transform"]);
    }
    r instanceof Path2D || (r = s[0] = cm(r)), j.axialAlignedBoundingBox(i, jt(this.ctx), this.current.minMax), this[t](e, r), this._pathStartIdx = e;
  }
  closePath(e) {
    this.ctx.closePath();
  }
  stroke(e, t, s = !0) {
    const i = this.ctx, r = this.current.strokeColor;
    if (i.globalAlpha = this.current.strokeAlpha, this.contentVisible)
      if (typeof r == "object" && r?.getPattern) {
        const a = r.isModifyingCurrentTransform() ? i.getTransform() : null;
        if (i.save(), i.strokeStyle = r.getPattern(i, this, ui(i), Pe.STROKE, e), a) {
          const o = new Path2D();
          o.addPath(t, i.getTransform().invertSelf().multiplySelf(a)), t = o;
        }
        this.rescaleAndStroke(t, !1), i.restore();
      } else
        this.rescaleAndStroke(t, !0);
    this.dependencyTracker?.recordDependencies(e, Rs.stroke), s && this.consumePath(e, t, this.current.getClippedPathBoundingBox(Pe.STROKE, jt(this.ctx))), i.globalAlpha = this.current.fillAlpha;
  }
  closeStroke(e, t) {
    this.stroke(e, t);
  }
  fill(e, t, s = !0) {
    const i = this.ctx, r = this.current.fillColor, a = this.current.patternFill;
    let o = !1;
    if (a) {
      const h = r.isModifyingCurrentTransform() ? i.getTransform() : null;
      if (this.dependencyTracker?.save(e), i.save(), i.fillStyle = r.getPattern(i, this, ui(i), Pe.FILL, e), h) {
        const d = new Path2D();
        d.addPath(t, i.getTransform().invertSelf().multiplySelf(h)), t = d;
      }
      o = !0;
    }
    const l = this.current.getClippedPathBoundingBox();
    this.contentVisible && l !== null && (this.pendingEOFill ? (i.fill(t, "evenodd"), this.pendingEOFill = !1) : i.fill(t)), this.dependencyTracker?.recordDependencies(e, Rs.fill), o && (i.restore(), this.dependencyTracker?.restore(e)), s && this.consumePath(e, t, l);
  }
  eoFill(e, t) {
    this.pendingEOFill = !0, this.fill(e, t);
  }
  fillStroke(e, t) {
    this.fill(e, t, !1), this.stroke(e, t, !1), this.consumePath(e, t);
  }
  eoFillStroke(e, t) {
    this.pendingEOFill = !0, this.fillStroke(e, t);
  }
  closeFillStroke(e, t) {
    this.fillStroke(e, t);
  }
  closeEOFillStroke(e, t) {
    this.pendingEOFill = !0, this.fillStroke(e, t);
  }
  endPath(e, t) {
    this.consumePath(e, t);
  }
  rawFillPath(e, t) {
    this.ctx.fill(t), this.dependencyTracker?.recordDependencies(e, Rs.rawFillPath).recordOperation(e);
  }
  clip(e) {
    this.dependencyTracker?.recordFutureForcedDependency("clipMode", e), this.pendingClip = Ub;
  }
  eoClip(e) {
    this.dependencyTracker?.recordFutureForcedDependency("clipMode", e), this.pendingClip = Jg;
  }
  beginText(e) {
    this.current.textMatrix = null, this.current.textMatrixScale = 1, this.current.x = this.current.lineX = 0, this.current.y = this.current.lineY = 0, this.dependencyTracker?.recordOpenMarker(e).resetIncrementalData("sameLineText").resetIncrementalData("moveText", e);
  }
  endText(e) {
    const t = this.pendingTextPaths, s = this.ctx;
    if (this.dependencyTracker) {
      const {
        dependencyTracker: i
      } = this;
      t !== void 0 && i.recordFutureForcedDependency("textClip", i.getOpenMarker()).recordFutureForcedDependency("textClip", e), i.recordCloseMarker(e);
    }
    if (t !== void 0) {
      const i = new Path2D(), r = s.getTransform().invertSelf();
      for (const {
        transform: a,
        x: o,
        y: l,
        fontSize: h,
        path: d
      } of t)
        d && i.addPath(d, new DOMMatrix(a).preMultiplySelf(r).translate(o, l).scale(h, -h));
      s.clip(i);
    }
    delete this.pendingTextPaths;
  }
  setCharSpacing(e, t) {
    this.dependencyTracker?.recordSimpleData("charSpacing", e), this.current.charSpacing = t;
  }
  setWordSpacing(e, t) {
    this.dependencyTracker?.recordSimpleData("wordSpacing", e), this.current.wordSpacing = t;
  }
  setHScale(e, t) {
    this.dependencyTracker?.recordSimpleData("hScale", e), this.current.textHScale = t / 100;
  }
  setLeading(e, t) {
    this.dependencyTracker?.recordSimpleData("leading", e), this.current.leading = -t;
  }
  setFont(e, t, s) {
    this.dependencyTracker?.recordSimpleData("font", e).recordSimpleDataFromNamed("fontObj", t, e);
    const i = this.commonObjs.get(t), r = this.current;
    if (!i)
      throw new Error(`Can't find font for ${t}`);
    if (r.fontMatrix = i.fontMatrix || Rf, (r.fontMatrix[0] === 0 || r.fontMatrix[3] === 0) && Z("Invalid font matrix for font " + t), s < 0 ? (s = -s, r.fontDirection = -1) : r.fontDirection = 1, this.current.font = i, this.current.fontSize = s, i.isType3Font)
      return;
    const a = i.loadedName || "sans-serif", o = i.systemFontInfo?.css || `"${a}", ${i.fallbackName}`;
    let l = "normal";
    i.black ? l = "900" : i.bold && (l = "bold");
    const h = i.italic ? "italic" : "normal";
    let d = s;
    s < _g ? d = _g : s > Wg && (d = Wg), this.current.fontSizeScale = s / d, this.ctx.font = `${h} ${l} ${d}px ${o}`;
  }
  setTextRenderingMode(e, t) {
    this.dependencyTracker?.recordSimpleData("textRenderingMode", e), this.current.textRenderingMode = t;
  }
  setTextRise(e, t) {
    this.dependencyTracker?.recordSimpleData("textRise", e), this.current.textRise = t;
  }
  moveText(e, t, s) {
    this.dependencyTracker?.resetIncrementalData("sameLineText").recordIncrementalData("moveText", e), this.current.x = this.current.lineX += t, this.current.y = this.current.lineY += s;
  }
  setLeadingMoveText(e, t, s) {
    this.setLeading(e, -s), this.moveText(e, t, s);
  }
  setTextMatrix(e, t) {
    this.dependencyTracker?.resetIncrementalData("sameLineText").recordSimpleData("textMatrix", e);
    const {
      current: s
    } = this;
    s.textMatrix = t, s.textMatrixScale = Math.hypot(t[0], t[1]), s.x = s.lineX = 0, s.y = s.lineY = 0;
  }
  nextLine(e) {
    this.moveText(e, 0, this.current.leading), this.dependencyTracker?.recordIncrementalData("moveText", this.dependencyTracker.getSimpleIndex("leading") ?? e);
  }
  paintChar(e, t, s, i, r, a) {
    const o = this.ctx, l = this.current, h = l.font, d = l.textRenderingMode, u = l.fontSize / l.fontSizeScale, f = d & oe.FILL_STROKE_MASK, p = !!(d & oe.ADD_TO_PATH_FLAG), m = l.patternFill && !h.missingFile, v = l.patternStroke && !h.missingFile;
    let A;
    if ((h.disableFontFace || p || m || v) && !h.missingFile && (A = h.getPathGenerator(this.commonObjs, t)), A && (h.disableFontFace || m || v)) {
      o.save(), o.translate(s, i), o.scale(u, -u), this.dependencyTracker?.recordCharacterBBox(e, o, h);
      let b;
      if (f === oe.FILL || f === oe.FILL_STROKE)
        if (r) {
          b = o.getTransform(), o.setTransform(...r);
          const E = w(this, di, lp).call(this, A, b, r);
          o.fill(E);
        } else
          o.fill(A);
      if (f === oe.STROKE || f === oe.FILL_STROKE)
        if (a) {
          b || (b = o.getTransform()), o.setTransform(...a);
          const {
            a: E,
            b: S,
            c: T,
            d: x
          } = b, C = j.inverseTransform(a), I = j.transform([E, S, T, x, 0, 0], C);
          j.singularValueDecompose2dScale(I, Ts), o.lineWidth *= Math.max(Ts[0], Ts[1]) / u, o.stroke(w(this, di, lp).call(this, A, b, a));
        } else
          o.lineWidth /= u, o.stroke(A);
      o.restore();
    } else
      (f === oe.FILL || f === oe.FILL_STROKE) && (o.fillText(t, s, i), this.dependencyTracker?.recordCharacterBBox(e, o, h, u, s, i, () => o.measureText(t))), (f === oe.STROKE || f === oe.FILL_STROKE) && (this.dependencyTracker && this.dependencyTracker?.recordCharacterBBox(e, o, h, u, s, i, () => o.measureText(t)).recordDependencies(e, Rs.stroke), o.strokeText(t, s, i));
    p && ((this.pendingTextPaths || (this.pendingTextPaths = [])).push({
      transform: jt(o),
      x: s,
      y: i,
      fontSize: u,
      path: A
    }), this.dependencyTracker?.recordCharacterBBox(e, o, h, u, s, i));
  }
  get isFontSubpixelAAEnabled() {
    const e = this.canvasFactory.create(10, 10), t = e.context;
    t.scale(1.5, 1), t.fillText("I", 0, 10);
    const s = t.getImageData(0, 0, 10, 10).data;
    this.canvasFactory.destroy(e);
    let i = !1;
    for (let r = 3; r < s.length; r += 4)
      if (s[r] > 0 && s[r] < 255) {
        i = !0;
        break;
      }
    return nt(this, "isFontSubpixelAAEnabled", i);
  }
  showText(e, t) {
    this.dependencyTracker && (this.dependencyTracker.recordDependencies(e, Rs.showText).resetBBox(e), this.current.textRenderingMode & oe.ADD_TO_PATH_FLAG && this.dependencyTracker.recordFutureForcedDependency("textClip", e).inheritPendingDependenciesAsFutureForcedDependencies());
    const s = this.current, i = s.font;
    if (i.isType3Font) {
      this.showType3Text(e, t), this.dependencyTracker?.recordShowTextOperation(e);
      return;
    }
    const r = s.fontSize;
    if (r === 0) {
      this.dependencyTracker?.recordOperation(e);
      return;
    }
    const a = this.ctx, o = s.fontSizeScale, l = s.charSpacing, h = s.wordSpacing, d = s.fontDirection, u = s.textHScale * d, f = t.length, p = i.vertical, m = p ? 1 : -1, v = i.defaultVMetrics, A = r * s.fontMatrix[0], b = s.textRenderingMode === oe.FILL && !i.disableFontFace && !s.patternFill;
    a.save(), s.textMatrix && a.transform(...s.textMatrix), a.translate(s.x, s.y + s.textRise), d > 0 ? a.scale(u, -1) : a.scale(u, 1);
    let E, S;
    const T = s.textRenderingMode & oe.FILL_STROKE_MASK, x = T === oe.FILL || T === oe.FILL_STROKE, C = T === oe.STROKE || T === oe.FILL_STROKE;
    if (x && s.patternFill) {
      a.save();
      const D = s.fillColor.getPattern(a, this, ui(a), Pe.FILL, e);
      E = jt(a), a.restore(), a.fillStyle = D;
    }
    if (C && s.patternStroke) {
      a.save();
      const D = s.strokeColor.getPattern(a, this, ui(a), Pe.STROKE, e);
      S = jt(a), a.restore(), a.strokeStyle = D;
    }
    let I = s.lineWidth;
    const M = s.textMatrixScale;
    if (M === 0 || I === 0 ? C && (I = this.getSinglePixelWidth()) : I /= M, o !== 1 && (a.scale(o, o), I /= o), a.lineWidth = I, i.isInvalidPDFjsFont) {
      const D = [];
      let $ = 0;
      for (const N of t)
        D.push(N.unicode), $ += N.width;
      const F = D.join("");
      if (a.fillText(F, 0, 0), this.dependencyTracker !== null) {
        const N = a.measureText(F);
        this.dependencyTracker.recordBBox(e, this.ctx, -N.actualBoundingBoxLeft, N.actualBoundingBoxRight, -N.actualBoundingBoxAscent, N.actualBoundingBoxDescent).recordShowTextOperation(e);
      }
      s.x += $ * A * u, a.restore(), this.compose();
      return;
    }
    let P = 0, O;
    for (O = 0; O < f; ++O) {
      const D = t[O];
      if (typeof D == "number") {
        P += m * D * r / 1e3;
        continue;
      }
      let $ = !1;
      const F = (D.isSpace ? h : 0) + l, N = D.fontChar, K = D.accent;
      let B, k, _ = D.width;
      if (p) {
        const ft = D.vmetric || v, et = -(D.vmetric ? ft[1] : _ * 0.5) * A, J = ft[2] * A;
        _ = ft ? -ft[0] : _, B = et / o, k = (P + J) / o;
      } else
        B = P / o, k = 0;
      let st;
      if (i.remeasure && _ > 0) {
        st = a.measureText(N);
        const ft = st.width * 1e3 / r * o;
        if (_ < ft && this.isFontSubpixelAAEnabled) {
          const et = _ / ft;
          $ = !0, a.save(), a.scale(et, 1), B /= et;
        } else _ !== ft && (B += (_ - ft) / 2e3 * r / o);
      }
      if (this.contentVisible && (D.isInFont || i.missingFile)) {
        if (b && !K)
          a.fillText(N, B, k), this.dependencyTracker?.recordCharacterBBox(e, a, st ? {
            bbox: null
          } : i, r / o, B, k, () => st ?? a.measureText(N));
        else if (this.paintChar(e, N, B, k, E, S), K) {
          const ft = B + r * K.offset.x / o, et = k - r * K.offset.y / o;
          this.paintChar(e, K.fontChar, ft, et, E, S);
        }
      }
      const mt = p ? _ * A - F * d : _ * A + F * d;
      P += mt, $ && a.restore();
    }
    p ? s.y -= P : s.x += P * u, a.restore(), this.compose(), this.dependencyTracker?.recordShowTextOperation(e);
  }
  showType3Text(e, t) {
    const s = this.ctx, i = this.current, r = i.font, a = i.fontSize, o = i.fontDirection, l = r.vertical ? 1 : -1, h = i.charSpacing, d = i.wordSpacing, u = i.textHScale * o, f = i.fontMatrix || Rf, p = t.length, m = i.textRenderingMode === oe.INVISIBLE;
    let v, A, b, E;
    if (m || a === 0)
      return;
    this._cachedScaleForStroking[0] = -1, this._cachedGetSinglePixelWidth = null, s.save(), i.textMatrix && s.transform(...i.textMatrix), s.translate(i.x, i.y + i.textRise), s.scale(u, o);
    const S = this.dependencyTracker;
    for (this.dependencyTracker = S ? new Du(S, e) : null, v = 0; v < p; ++v) {
      if (A = t[v], typeof A == "number") {
        E = l * A * a / 1e3, this.ctx.translate(E, 0), i.x += E * u;
        continue;
      }
      const T = (A.isSpace ? d : 0) + h, x = r.charProcOperatorList[A.operatorListId];
      x ? this.contentVisible && (this.save(), s.scale(a, a), s.transform(...f), this.executeOperatorList(x), this.restore()) : Z(`Type3 character "${A.operatorListId}" is not available.`);
      const C = [A.width, 0];
      j.applyTransform(C, f), b = C[0] * a + T, s.translate(b, 0), i.x += b * u;
    }
    s.restore(), S && (this.dependencyTracker = S);
  }
  setCharWidth(e, t, s) {
  }
  setCharWidthAndBounds(e, t, s, i, r, a, o) {
    const l = new Path2D();
    l.rect(i, r, a - i, o - r), this.ctx.clip(l), this.dependencyTracker?.recordBBox(e, this.ctx, i, a, r, o).recordClipBox(e, this.ctx, i, a, r, o), this.endPath(e);
  }
  getColorN_Pattern(e, t) {
    let s;
    if (t[0] === "TilingPattern") {
      const i = this.baseTransform || jt(this.ctx), r = {
        createCanvasGraphics: (a, o) => new Eg(a, this.commonObjs, this.objs, this.canvasFactory, this.filterFactory, {
          optionalContentConfig: this.optionalContentConfig,
          markedContentStack: this.markedContentStack
        }, void 0, void 0, this.dependencyTracker ? new Du(this.dependencyTracker, o, !0) : null)
      };
      s = new rp(t, this.ctx, r, i);
    } else
      s = this._getPattern(e, t[1], t[2]);
    return s;
  }
  setStrokeColorN(e, ...t) {
    this.dependencyTracker?.recordSimpleData("strokeColor", e), this.current.strokeColor = this.getColorN_Pattern(e, t), this.current.patternStroke = !0;
  }
  setFillColorN(e, ...t) {
    this.dependencyTracker?.recordSimpleData("fillColor", e), this.current.fillColor = this.getColorN_Pattern(e, t), this.current.patternFill = !0;
  }
  setStrokeRGBColor(e, t) {
    this.dependencyTracker?.recordSimpleData("strokeColor", e), this.ctx.strokeStyle = this.current.strokeColor = t, this.current.patternStroke = !1;
  }
  setStrokeTransparent(e) {
    this.dependencyTracker?.recordSimpleData("strokeColor", e), this.ctx.strokeStyle = this.current.strokeColor = "transparent", this.current.patternStroke = !1;
  }
  setFillRGBColor(e, t) {
    this.dependencyTracker?.recordSimpleData("fillColor", e), this.ctx.fillStyle = this.current.fillColor = t, this.current.patternFill = !1;
  }
  setFillTransparent(e) {
    this.dependencyTracker?.recordSimpleData("fillColor", e), this.ctx.fillStyle = this.current.fillColor = "transparent", this.current.patternFill = !1;
  }
  _getPattern(e, t, s = null) {
    let i;
    return this.cachedPatterns.has(t) ? i = this.cachedPatterns.get(t) : (i = Ob(this.getObject(e, t)), this.cachedPatterns.set(t, i)), s && (i.matrix = s), i;
  }
  shadingFill(e, t) {
    if (!this.contentVisible)
      return;
    const s = this.ctx;
    this.save(e);
    const i = this._getPattern(e, t);
    s.fillStyle = i.getPattern(s, this, ui(s), Pe.SHADING, e);
    const r = ui(s);
    if (r) {
      const {
        width: a,
        height: o
      } = s.canvas, l = So.slice();
      j.axialAlignedBoundingBox([0, 0, a, o], r, l);
      const [h, d, u, f] = l;
      this.ctx.fillRect(h, d, u - h, f - d);
    } else
      this.ctx.fillRect(-1e10, -1e10, 2e10, 2e10);
    this.dependencyTracker?.resetBBox(e).recordFullPageBBox(e).recordDependencies(e, Rs.transform).recordDependencies(e, Rs.fill).recordOperation(e), this.compose(this.current.getClippedPathBoundingBox()), this.restore(e);
  }
  beginInlineImage() {
    bt("Should not call beginInlineImage");
  }
  beginImageData() {
    bt("Should not call beginImageData");
  }
  paintFormXObjectBegin(e, t, s) {
    if (this.contentVisible && (this.save(e), this.baseTransformStack.push(this.baseTransform), t && this.transform(e, ...t), this.baseTransform = jt(this.ctx), s)) {
      j.axialAlignedBoundingBox(s, this.baseTransform, this.current.minMax);
      const [i, r, a, o] = s, l = new Path2D();
      l.rect(i, r, a - i, o - r), this.ctx.clip(l), this.dependencyTracker?.recordClipBox(e, this.ctx, i, a, r, o), this.endPath(e);
    }
  }
  paintFormXObjectEnd(e) {
    this.contentVisible && (this.restore(e), this.baseTransform = this.baseTransformStack.pop());
  }
  beginGroup(e, t) {
    if (!this.contentVisible)
      return;
    this.save(e), this.inSMaskMode && (this.endSMaskMode(), this.current.activeSMask = null);
    const s = this.ctx;
    t.isolated || hf("TODO: Support non-isolated groups."), t.knockout && Z("Knockout groups not supported.");
    const i = jt(s);
    t.matrix && s.transform(...t.matrix);
    const r = [0, 0, s.canvas.width, s.canvas.height];
    let a;
    t.bbox ? (a = So.slice(), j.axialAlignedBoundingBox(t.bbox, jt(s), a), a = j.intersect(a, r) || [0, 0, 0, 0]) : a = r;
    const o = Math.floor(a[0]), l = Math.floor(a[1]), h = Math.max(Math.ceil(a[2]) - o, 1), d = Math.max(Math.ceil(a[3]) - l, 1);
    this.current.startNewPathAndClipBox([0, 0, h, d]), t.smask && this.smaskCounter++;
    const u = this.canvasFactory.create(h, d);
    t.smask && this.smaskGroupCanvases.push(u);
    const f = u.context;
    if (f.translate(-o, -l), f.transform(...i), t.bbox) {
      let p = new Path2D();
      const [m, v, A, b] = t.bbox;
      if (p.rect(m, v, A - m, b - v), t.matrix) {
        const E = new Path2D();
        E.addPath(p, new DOMMatrix(t.matrix)), p = E;
      }
      f.clip(p);
    }
    t.smask && this.smaskStack.push({
      canvas: u.canvas,
      context: f,
      offsetX: o,
      offsetY: l,
      subtype: t.smask.subtype,
      backdrop: t.smask.backdrop,
      transferMap: t.smask.transferMap || null,
      startTransformInverse: null
    }), (!t.smask || this.dependencyTracker) && (s.setTransform(1, 0, 0, 1, 0, 0), s.translate(o, l), s.save()), ah(s, f), this.ctx = f, this.dependencyTracker?.inheritSimpleDataAsFutureForcedDependencies(["fillAlpha", "strokeAlpha", "globalCompositeOperation"]).pushBaseTransform(s), this.setGState(e, [["BM", "source-over"], ["ca", 1], ["CA", 1], ["TR", null]]), this.groupStack.push(s), this.groupLevel++;
  }
  endGroup(e, t) {
    if (!this.contentVisible)
      return;
    this.groupLevel--;
    const s = this.ctx, i = this.groupStack.pop();
    if (this.ctx = i, this.ctx.imageSmoothingEnabled = !1, this.dependencyTracker?.popBaseTransform(), t.smask)
      this.tempSMask = this.smaskStack.pop(), this.restore(e), this.dependencyTracker && this.ctx.restore();
    else {
      this.ctx.restore();
      const r = jt(this.ctx);
      this.restore(e), this.ctx.save(), this.ctx.setTransform(...r);
      const a = So.slice();
      j.axialAlignedBoundingBox([0, 0, s.canvas.width, s.canvas.height], r, a), this.ctx.drawImage(s.canvas, 0, 0), this.ctx.restore(), this.canvasFactory.destroy({
        canvas: s.canvas,
        context: s
      }), this.compose(a);
    }
  }
  beginAnnotation(e, t, s, i, r, a) {
    if (w(this, di, ap).call(this), Ud(this.ctx), this.ctx.save(), this.save(e), this.baseTransform && this.ctx.setTransform(...this.baseTransform), s) {
      const o = s[2] - s[0], l = s[3] - s[1];
      if (a && this.annotationCanvasMap) {
        i = i.slice(), i[4] -= s[0], i[5] -= s[1], s = s.slice(), s[0] = s[1] = 0, s[2] = o, s[3] = l, j.singularValueDecompose2dScale(jt(this.ctx), Ts);
        const {
          viewportScale: h
        } = this, d = Math.ceil(o * this.outputScaleX * h), u = Math.ceil(l * this.outputScaleY * h);
        this.annotationCanvas = this.canvasFactory.create(d, u);
        const {
          canvas: f,
          context: p
        } = this.annotationCanvas;
        this.annotationCanvasMap.set(t, f), this.annotationCanvas.savedCtx = this.ctx, this.ctx = p, this.ctx.save(), this.ctx.setTransform(Ts[0], 0, 0, -Ts[1], 0, l * Ts[1]), Ud(this.ctx);
      } else {
        Ud(this.ctx), this.endPath(e);
        const h = new Path2D();
        h.rect(s[0], s[1], o, l), this.ctx.clip(h);
      }
    }
    this.current = new zg(this.ctx.canvas.width, this.ctx.canvas.height), this.transform(e, ...i), this.transform(e, ...r);
  }
  endAnnotation(e) {
    this.annotationCanvas && (this.ctx.restore(), w(this, di, op).call(this), this.ctx = this.annotationCanvas.savedCtx, delete this.annotationCanvas.savedCtx, delete this.annotationCanvas);
  }
  paintImageMaskXObject(e, t) {
    if (!this.contentVisible)
      return;
    const s = t.count;
    t = this.getObject(e, t.data, t), t.count = s;
    const i = this.ctx, r = this._createMaskCanvas(e, t), a = r.canvas;
    i.save(), i.setTransform(1, 0, 0, 1, 0, 0), i.drawImage(a, r.offsetX, r.offsetY), this.dependencyTracker?.resetBBox(e).recordBBox(e, this.ctx, r.offsetX, r.offsetX + a.width, r.offsetY, r.offsetY + a.height).recordOperation(e), i.restore(), r.canvasEntry && this.canvasFactory.destroy(r.canvasEntry), this.compose();
  }
  paintImageMaskXObjectRepeat(e, t, s, i = 0, r = 0, a, o) {
    if (!this.contentVisible)
      return;
    t = this.getObject(e, t.data, t);
    const l = this.ctx;
    l.save();
    const h = jt(l);
    l.transform(s, i, r, a, 0, 0);
    const d = this._createMaskCanvas(e, t);
    l.setTransform(1, 0, 0, 1, d.offsetX - h[4], d.offsetY - h[5]), this.dependencyTracker?.resetBBox(e);
    for (let u = 0, f = o.length; u < f; u += 2) {
      const p = j.transform(h, [s, i, r, a, o[u], o[u + 1]]);
      l.drawImage(d.canvas, p[4], p[5]), this.dependencyTracker?.recordBBox(e, this.ctx, p[4], p[4] + d.canvas.width, p[5], p[5] + d.canvas.height);
    }
    l.restore(), d.canvasEntry && this.canvasFactory.destroy(d.canvasEntry), this.compose(), this.dependencyTracker?.recordOperation(e);
  }
  paintImageMaskXObjectGroup(e, t) {
    if (!this.contentVisible)
      return;
    const s = this.ctx, i = this.current.fillColor, r = this.current.patternFill;
    this.dependencyTracker?.resetBBox(e).recordDependencies(e, Rs.transformAndFill);
    for (const a of t) {
      const {
        data: o,
        width: l,
        height: h,
        transform: d
      } = a, u = this.canvasFactory.create(l, h), f = u.context;
      f.save();
      const p = this.getObject(e, o, a);
      Yg(f, p), f.globalCompositeOperation = "source-in", f.fillStyle = r ? i.getPattern(f, this, ui(s), Pe.FILL, e) : i, f.fillRect(0, 0, l, h), f.restore(), s.save(), s.transform(...d), s.scale(1, -1), Bd(s, u.canvas, 0, 0, l, h, 0, -1, 1, 1), this.canvasFactory.destroy(u), this.dependencyTracker?.recordBBox(e, s, 0, l, 0, h), s.restore();
    }
    this.compose(), this.dependencyTracker?.recordOperation(e);
  }
  paintImageXObject(e, t) {
    if (!this.contentVisible)
      return;
    const s = this.getObject(e, t);
    if (!s) {
      Z("Dependent image isn't ready yet");
      return;
    }
    this.paintInlineImageXObject(e, s);
  }
  paintImageXObjectRepeat(e, t, s, i, r) {
    if (!this.contentVisible)
      return;
    const a = this.getObject(e, t);
    if (!a) {
      Z("Dependent image isn't ready yet");
      return;
    }
    const o = a.width, l = a.height, h = [];
    for (let d = 0, u = r.length; d < u; d += 2)
      h.push({
        transform: [s, 0, 0, i, r[d], r[d + 1]],
        x: 0,
        y: 0,
        w: o,
        h: l
      });
    this.paintInlineImageXObjectGroup(e, a, h);
  }
  applyTransferMapsToCanvas(e) {
    return this.current.transferMaps !== "none" && (e.filter = this.current.transferMaps, e.drawImage(e.canvas, 0, 0), e.filter = "none"), e.canvas;
  }
  applyTransferMapsToBitmap(e) {
    if (this.current.transferMaps === "none")
      return {
        img: e.bitmap,
        canvasEntry: null
      };
    const {
      bitmap: t,
      width: s,
      height: i
    } = e, r = this.canvasFactory.create(s, i), a = r.context;
    return a.filter = this.current.transferMaps, a.drawImage(t, 0, 0), a.filter = "none", {
      img: r.canvas,
      canvasEntry: r
    };
  }
  paintInlineImageXObject(e, t) {
    if (!this.contentVisible)
      return;
    const s = t.width, i = t.height, r = this.ctx;
    this.save(e);
    const {
      filter: a
    } = r;
    a !== "none" && a !== "" && (r.filter = "none"), r.scale(1 / s, -1 / i);
    let o, l = null;
    if (t.bitmap) {
      const d = this.applyTransferMapsToBitmap(t);
      o = d.img, l = d.canvasEntry;
    } else if (typeof HTMLElement == "function" && t instanceof HTMLElement || !t.data)
      o = t;
    else {
      const d = this.canvasFactory.create(s, i);
      Xg(d.context, t), o = this.applyTransferMapsToCanvas(d.context), l = d;
    }
    const h = this._scaleImage(o, ui(r));
    r.imageSmoothingEnabled = Kg(jt(r), t.interpolate), this.dependencyTracker && (this.dependencyTracker.resetBBox(e).recordBBox(e, r, 0, s, -i, 0).recordDependencies(e, Rs.imageXObject).recordOperation(e), this.imagesTracker?.record(r, s, i, this.dependencyTracker.clipBox)), Bd(r, h.img, 0, 0, h.paintWidth, h.paintHeight, 0, -i, s, i), h.tmpCanvas && this.canvasFactory.destroy(h.tmpCanvas), l && this.canvasFactory.destroy(l), this.compose(), this.restore(e);
  }
  paintInlineImageXObjectGroup(e, t, s) {
    if (!this.contentVisible)
      return;
    const i = this.ctx;
    let r, a = null;
    if (t.bitmap)
      r = t.bitmap;
    else {
      const o = t.width, l = t.height, h = this.canvasFactory.create(o, l);
      Xg(h.context, t), r = this.applyTransferMapsToCanvas(h.context), a = h;
    }
    this.dependencyTracker?.resetBBox(e);
    for (const o of s)
      i.save(), i.transform(...o.transform), i.scale(1, -1), Bd(i, r, o.x, o.y, o.w, o.h, 0, -1, 1, 1), this.dependencyTracker?.recordBBox(e, i, 0, 1, -1, 0), i.restore();
    a && this.canvasFactory.destroy(a), this.dependencyTracker?.recordOperation(e), this.compose();
  }
  paintSolidColorImageMask(e) {
    this.contentVisible && (this.dependencyTracker?.resetBBox(e).recordBBox(e, this.ctx, 0, 1, 0, 1).recordDependencies(e, Rs.fill).recordOperation(e), this.ctx.fillRect(0, 0, 1, 1), this.compose());
  }
  markPoint(e, t) {
  }
  markPointProps(e, t, s) {
  }
  beginMarkedContent(e, t) {
    this.dependencyTracker?.beginMarkedContent(e), this.markedContentStack.push({
      visible: !0
    });
  }
  beginMarkedContentProps(e, t, s) {
    this.dependencyTracker?.beginMarkedContent(e), t === "OC" ? this.markedContentStack.push({
      visible: this.optionalContentConfig.isVisible(s)
    }) : this.markedContentStack.push({
      visible: !0
    }), this.contentVisible = this.isContentVisible();
  }
  endMarkedContent(e) {
    this.dependencyTracker?.endMarkedContent(e), this.markedContentStack.pop(), this.contentVisible = this.isContentVisible();
  }
  beginCompat(e) {
  }
  endCompat(e) {
  }
  consumePath(e, t, s) {
    const i = this.current.isEmptyClip();
    this.pendingClip && this.current.updateClipFromPath(), this.pendingClip || this.compose(s);
    const r = this.ctx;
    this.pendingClip ? (i || (this.pendingClip === Jg ? r.clip(t, "evenodd") : r.clip(t)), this.pendingClip = null, this.dependencyTracker?.bboxToClipBoxDropOperation(e).recordFutureForcedDependency("clipPath", e)) : this.dependencyTracker?.recordOperation(e), this.current.startNewPathAndClipBox(this.current.clipBox);
  }
  getSinglePixelWidth() {
    if (!this._cachedGetSinglePixelWidth) {
      const e = jt(this.ctx);
      if (e[1] === 0 && e[2] === 0)
        this._cachedGetSinglePixelWidth = 1 / Math.min(Math.abs(e[0]), Math.abs(e[3]));
      else {
        const t = Math.abs(e[0] * e[3] - e[2] * e[1]), s = Math.hypot(e[0], e[2]), i = Math.hypot(e[1], e[3]);
        this._cachedGetSinglePixelWidth = Math.max(s, i) / t;
      }
    }
    return this._cachedGetSinglePixelWidth;
  }
  getScaleForStroking() {
    if (this._cachedScaleForStroking[0] === -1) {
      const {
        lineWidth: e
      } = this.current, {
        a: t,
        b: s,
        c: i,
        d: r
      } = this.ctx.getTransform();
      let a, o;
      if (s === 0 && i === 0) {
        const l = Math.abs(t), h = Math.abs(r);
        if (l === h)
          if (e === 0)
            a = o = 1 / l;
          else {
            const d = l * e;
            a = o = d < 1 ? 1 / d : 1;
          }
        else if (e === 0)
          a = 1 / l, o = 1 / h;
        else {
          const d = l * e, u = h * e;
          a = d < 1 ? 1 / d : 1, o = u < 1 ? 1 / u : 1;
        }
      } else {
        const l = Math.abs(t * r - s * i), h = Math.hypot(t, s), d = Math.hypot(i, r);
        if (e === 0)
          a = d / l, o = h / l;
        else {
          const u = e * l;
          a = d > u ? d / u : 1, o = h > u ? h / u : 1;
        }
      }
      this._cachedScaleForStroking[0] = a, this._cachedScaleForStroking[1] = o;
    }
    return this._cachedScaleForStroking;
  }
  rescaleAndStroke(e, t) {
    const {
      ctx: s,
      current: {
        lineWidth: i
      }
    } = this, [r, a] = this.getScaleForStroking();
    if (r === a) {
      s.lineWidth = (i || 1) * r, s.stroke(e);
      return;
    }
    const o = s.getLineDash();
    t && s.save(), s.scale(r, a), Cf.a = 1 / r, Cf.d = 1 / a;
    const l = new Path2D();
    if (l.addPath(e, Cf), o.length > 0) {
      const h = Math.max(r, a);
      s.setLineDash(o.map((d) => d / h)), s.lineDashOffset /= h;
    }
    s.lineWidth = i || 1, s.stroke(l), t && s.restore();
  }
  isContentVisible() {
    for (let e = this.markedContentStack.length - 1; e >= 0; e--)
      if (!this.markedContentStack[e].visible)
        return !1;
    return !0;
  }
};
di = new WeakSet(), ap = function() {
  for (; this.stateStack.length || this.inSMaskMode; )
    this.restore();
  this.current.activeSMask = null, this.ctx.restore(), this.transparentCanvas && (this.ctx = this.compositeCtx, this.ctx.save(), this.ctx.setTransform(1, 0, 0, 1, 0, 0), this.ctx.drawImage(this.transparentCanvas, 0, 0), this.ctx.restore(), this.canvasFactory.destroy(this.transparentCanvasEntry), this.transparentCanvas = null, this.transparentCanvasEntry = null);
}, op = function() {
  if (this.pageColors) {
    const e = this.filterFactory.addHCMFilter(this.pageColors.foreground, this.pageColors.background);
    if (e !== "none") {
      const t = this.ctx.filter;
      this.ctx.filter = e, this.ctx.drawImage(this.ctx.canvas, 0, 0), this.ctx.filter = t;
    }
  }
}, lp = function(e, t, s) {
  const i = new Path2D();
  return i.addPath(e, new DOMMatrix(s).invertSelf().multiplySelf(t)), i;
};
let Io = Eg;
for (const c in kh)
  Io.prototype[c] !== void 0 && (Io.prototype[kh[c]] = Io.prototype[c]);
var yc, bc;
class uf {
  constructor(e, t, s) {
    y(this, yc, null);
    y(this, bc, null);
    R(this, "_fullReader", null);
    R(this, "_rangeReaders", /* @__PURE__ */ new Set());
    R(this, "_source", null);
    this._source = e, g(this, yc, t), g(this, bc, s);
  }
  get _progressiveDataLength() {
    return this._fullReader?._loaded ?? 0;
  }
  getFullReader() {
    return Gt(!this._fullReader, "BasePDFStream.getFullReader can only be called once."), this._fullReader = new (n(this, yc))(this);
  }
  getRangeReader(e, t) {
    if (t <= this._progressiveDataLength)
      return null;
    const s = new (n(this, bc))(this, e, t);
    return this._rangeReaders.add(s), s;
  }
  cancelAllRequests(e) {
    this._fullReader?.cancel(e);
    for (const t of new Set(this._rangeReaders))
      t.cancel(e);
  }
}
yc = new WeakMap(), bc = new WeakMap();
class ff {
  constructor(e) {
    R(this, "onProgress", null);
    R(this, "_contentLength", 0);
    R(this, "_filename", null);
    R(this, "_headersCapability", Promise.withResolvers());
    R(this, "_isRangeSupported", !1);
    R(this, "_isStreamingSupported", !1);
    R(this, "_loaded", 0);
    R(this, "_stream", null);
    this._stream = e;
  }
  _callOnProgress() {
    this.onProgress?.({
      loaded: this._loaded,
      total: this._contentLength
    });
  }
  get headersReady() {
    return this._headersCapability.promise;
  }
  get filename() {
    return this._filename;
  }
  get contentLength() {
    return this._contentLength;
  }
  get isRangeSupported() {
    return this._isRangeSupported;
  }
  get isStreamingSupported() {
    return this._isStreamingSupported;
  }
  async read() {
    bt("Abstract method `read` called");
  }
  cancel(e) {
    bt("Abstract method `cancel` called");
  }
}
class pf {
  constructor(e, t, s) {
    R(this, "_stream", null);
    this._stream = e;
  }
  async read() {
    bt("Abstract method `read` called");
  }
  cancel(e) {
    bt("Abstract method `cancel` called");
  }
}
function Hb(c) {
  let e = !0, t = s("filename\\*", "i").exec(c);
  if (t) {
    t = t[1];
    let d = o(t);
    return d = unescape(d), d = l(d), d = h(d), r(d);
  }
  if (t = a(c), t) {
    const d = h(t);
    return r(d);
  }
  if (t = s("filename", "i").exec(c), t) {
    t = t[1];
    let d = o(t);
    return d = h(d), r(d);
  }
  function s(d, u) {
    return new RegExp("(?:^|;)\\s*" + d + '\\s*=\\s*([^";\\s][^;\\s]*|"(?:[^"\\\\]|\\\\"?)+"?)', u);
  }
  function i(d, u) {
    if (d) {
      if (!/^[\x00-\xFF]+$/.test(u))
        return u;
      try {
        const f = new TextDecoder(d, {
          fatal: !0
        }), p = cf(u);
        u = f.decode(p), e = !1;
      } catch {
      }
    }
    return u;
  }
  function r(d) {
    return e && /[\x80-\xff]/.test(d) && (d = i("utf-8", d), e && (d = i("iso-8859-1", d))), d;
  }
  function a(d) {
    const u = [];
    let f;
    const p = s("filename\\*((?!0\\d)\\d+)(\\*?)", "ig");
    for (; (f = p.exec(d)) !== null; ) {
      let [, v, A, b] = f;
      if (v = parseInt(v, 10), v in u) {
        if (v === 0)
          break;
        continue;
      }
      u[v] = [A, b];
    }
    const m = [];
    for (let v = 0; v < u.length && v in u; ++v) {
      let [A, b] = u[v];
      b = o(b), A && (b = unescape(b), v === 0 && (b = l(b))), m.push(b);
    }
    return m.join("");
  }
  function o(d) {
    if (d.startsWith('"')) {
      const u = d.slice(1).split('\\"');
      for (let f = 0; f < u.length; ++f) {
        const p = u[f].indexOf('"');
        p !== -1 && (u[f] = u[f].slice(0, p), u.length = f + 1), u[f] = u[f].replaceAll(/\\(.)/g, "$1");
      }
      d = u.join('"');
    }
    return d;
  }
  function l(d) {
    const u = d.indexOf("'");
    if (u === -1)
      return d;
    const f = d.slice(0, u), m = d.slice(u + 1).replace(/^[^']*'/, "");
    return i(f, m);
  }
  function h(d) {
    return !d.startsWith("=?") || /[\x00-\x19\x80-\xff]/.test(d) ? d : d.replaceAll(/=\?([\w-]*)\?([QqBb])\?((?:[^?]|\?(?!=))*)\?=/g, function(u, f, p, m) {
      if (p === "q" || p === "Q")
        return m = m.replaceAll("_", " "), m = m.replaceAll(/=([0-9a-fA-F]{2})/g, function(v, A) {
          return String.fromCharCode(parseInt(A, 16));
        }), i(f, m);
      try {
        m = atob(m);
      } catch {
      }
      return i(f, m);
    });
  }
  return "";
}
function iv(c, e) {
  const t = new Headers();
  if (!c || !e || typeof e != "object")
    return t;
  for (const s in e) {
    const i = e[s];
    i !== void 0 && t.append(s, i);
  }
  return t;
}
function gf(c) {
  return URL.parse(c)?.origin ?? null;
}
function nv({
  responseHeaders: c,
  isHttp: e,
  rangeChunkSize: t,
  disableRange: s
}) {
  const i = {
    contentLength: 0,
    isRangeSupported: !1
  }, r = parseInt(c.get("Content-Length"), 10);
  return !Number.isInteger(r) || (i.contentLength = r, r <= 2 * t) || s || !e || c.get("Accept-Ranges") !== "bytes" || (c.get("Content-Encoding") || "identity") === "identity" && (i.isRangeSupported = !0), i;
}
function rv(c) {
  const e = c.get("Content-Disposition");
  if (e) {
    let t = Hb(e);
    if (t.includes("%"))
      try {
        t = decodeURIComponent(t);
      } catch {
      }
    if (cg(t))
      return t;
  }
  return null;
}
function mf(c, e) {
  return new Cu(`Unexpected server response (${c}) while retrieving PDF "${e.href}".`, c, c === 404 || c === 0 && e.protocol === "file:");
}
function av(c, e) {
  if (c !== e)
    throw new Error(`Expected range response-origin "${c}" to match "${e}".`);
}
function ov(c, e, t, s) {
  return fetch(c, {
    method: "GET",
    headers: e,
    signal: s.signal,
    mode: "cors",
    credentials: t ? "include" : "same-origin",
    redirect: "follow"
  });
}
function lv(c, e) {
  if (c !== 200 && c !== 206)
    throw mf(c, e);
}
function vf(c) {
  if (c instanceof Uint8Array)
    return c.buffer;
  if (c instanceof ArrayBuffer)
    return c;
  throw new Error(`getArrayBuffer - unexpected data: ${c}`);
}
class $b extends uf {
  constructor(t) {
    super(t, jb, Gb);
    R(this, "_responseOrigin", null);
    const {
      httpHeaders: s,
      url: i
    } = t;
    Gt(/https?:/.test(i.protocol), "PDFFetchStream only supports http(s):// URLs."), this.headers = iv(!0, s);
  }
}
class jb extends ff {
  constructor(t) {
    super(t);
    R(this, "_abortController", new AbortController());
    R(this, "_reader", null);
    const {
      disableRange: s,
      disableStream: i,
      rangeChunkSize: r,
      url: a,
      withCredentials: o
    } = t._source;
    this._isStreamingSupported = !i;
    const l = new Headers(t.headers);
    ov(a, l, o, this._abortController).then((h) => {
      t._responseOrigin = gf(h.url), lv(h.status, a), this._reader = h.body.getReader();
      const d = h.headers, {
        contentLength: u,
        isRangeSupported: f
      } = nv({
        responseHeaders: d,
        isHttp: !0,
        rangeChunkSize: r,
        disableRange: s
      });
      this._contentLength = u, this._isRangeSupported = f, this._filename = rv(d), !this._isStreamingSupported && this._isRangeSupported && this.cancel(new Dr("Streaming is disabled.")), this._headersCapability.resolve();
    }).catch(this._headersCapability.reject);
  }
  async read() {
    await this._headersCapability.promise;
    const {
      value: t,
      done: s
    } = await this._reader.read();
    return s ? {
      value: t,
      done: s
    } : (this._loaded += t.byteLength, this._callOnProgress(), {
      value: vf(t),
      done: !1
    });
  }
  cancel(t) {
    this._reader?.cancel(t), this._abortController.abort();
  }
}
class Gb extends pf {
  constructor(t, s, i) {
    super(t, s, i);
    R(this, "_abortController", new AbortController());
    R(this, "_readCapability", Promise.withResolvers());
    R(this, "_reader", null);
    const {
      url: r,
      withCredentials: a
    } = t._source, o = new Headers(t.headers);
    o.append("Range", `bytes=${s}-${i - 1}`), ov(r, o, a, this._abortController).then((l) => {
      const h = gf(l.url);
      av(h, t._responseOrigin), lv(l.status, r), this._reader = l.body.getReader(), this._readCapability.resolve();
    }).catch(this._readCapability.reject);
  }
  async read() {
    await this._readCapability.promise;
    const {
      value: t,
      done: s
    } = await this._reader.read();
    return s ? {
      value: t,
      done: s
    } : {
      value: vf(t),
      done: !1
    };
  }
  cancel(t) {
    this._reader?.cancel(t), this._abortController.abort();
  }
}
q(116);
function Qg(c) {
  return c instanceof Uint8Array && c.byteLength === c.buffer.byteLength ? c.buffer : new Uint8Array(c).buffer;
}
function yf() {
  for (const c of this._requests)
    c.resolve({
      value: void 0,
      done: !0
    });
  this._requests.length = 0;
}
var Ac, hp;
class _b extends uf {
  constructor(t) {
    super(t, Wb, Vb);
    y(this, Ac);
    R(this, "_progressiveDone", !1);
    R(this, "_queuedChunks", []);
    const {
      pdfDataRangeTransport: s
    } = t, {
      initialData: i,
      progressiveDone: r
    } = s;
    if (i?.length > 0) {
      const a = Qg(i);
      this._queuedChunks.push(a);
    }
    this._progressiveDone = r, s.addRangeListener((a, o) => {
      w(this, Ac, hp).call(this, a, o);
    }), s.addProgressiveReadListener((a) => {
      w(this, Ac, hp).call(this, void 0, a);
    }), s.addProgressiveDoneListener(() => {
      this._fullReader?.progressiveDone(), this._progressiveDone = !0;
    }), s.transportReady();
  }
  getFullReader() {
    const t = super.getFullReader();
    return this._queuedChunks = null, t;
  }
  getRangeReader(t, s) {
    const i = super.getRangeReader(t, s);
    return i && (i.onDone = () => this._rangeReaders.delete(i), this._source.pdfDataRangeTransport.requestDataRange(t, s)), i;
  }
  cancelAllRequests(t) {
    super.cancelAllRequests(t), this._source.pdfDataRangeTransport.abort();
  }
}
Ac = new WeakSet(), hp = function(t, s) {
  const i = Qg(s);
  if (t === void 0)
    this._fullReader ? this._fullReader._enqueue(i) : this._queuedChunks.push(i);
  else {
    const r = this._rangeReaders.keys().find((a) => a._begin === t);
    Gt(r, "#onReceiveData - no `PDFDataTransportStreamRangeReader` instance found."), r._enqueue(i);
  }
};
var wc;
class Wb extends ff {
  constructor(t) {
    super(t);
    y(this, wc, yf.bind(this));
    R(this, "_done", !1);
    R(this, "_queuedChunks", null);
    R(this, "_requests", []);
    const {
      pdfDataRangeTransport: s,
      disableRange: i,
      disableStream: r
    } = t._source, {
      length: a,
      contentDispositionFilename: o
    } = s;
    this._queuedChunks = t._queuedChunks || [];
    for (const h of this._queuedChunks)
      this._loaded += h.byteLength;
    this._done = t._progressiveDone, this._contentLength = a, this._isStreamingSupported = !r, this._isRangeSupported = !i, cg(o) && (this._filename = o), this._headersCapability.resolve();
    const l = this._loaded;
    Promise.resolve().then(() => {
      l > 0 && this._loaded === l && this._callOnProgress();
    });
  }
  _enqueue(t) {
    this._done || (this._requests.length > 0 ? this._requests.shift().resolve({
      value: t,
      done: !1
    }) : this._queuedChunks.push(t), this._loaded += t.byteLength, this._callOnProgress());
  }
  async read() {
    if (this._queuedChunks.length > 0)
      return {
        value: this._queuedChunks.shift(),
        done: !1
      };
    if (this._done)
      return {
        value: void 0,
        done: !0
      };
    const t = Promise.withResolvers();
    return this._requests.push(t), t.promise;
  }
  cancel(t) {
    this._done = !0, n(this, wc).call(this);
  }
  progressiveDone() {
    this._done || (this._done = !0), this._queuedChunks.length === 0 && n(this, wc).call(this);
  }
}
wc = new WeakMap();
var Ec;
class Vb extends pf {
  constructor(t, s, i) {
    super(t, s, i);
    y(this, Ec, yf.bind(this));
    R(this, "onDone", null);
    R(this, "_begin", -1);
    R(this, "_done", !1);
    R(this, "_queuedChunk", null);
    R(this, "_requests", []);
    this._begin = s;
  }
  _enqueue(t) {
    this._done || (this._requests.length === 0 ? this._queuedChunk = t : (this._requests.shift().resolve({
      value: t,
      done: !1
    }), n(this, Ec).call(this)), this._done = !0, this.onDone?.());
  }
  async read() {
    if (this._queuedChunk) {
      const s = this._queuedChunk;
      return this._queuedChunk = null, {
        value: s,
        done: !1
      };
    }
    if (this._done)
      return {
        value: void 0,
        done: !0
      };
    const t = Promise.withResolvers();
    return this._requests.push(t), t.promise;
  }
  cancel(t) {
    this._done = !0, n(this, Ec).call(this), this.onDone?.();
  }
}
Ec = new WeakMap();
const If = 200, Zg = 206;
function zb(c) {
  return typeof c != "string" ? c : cf(c).buffer;
}
var Ti, nh, hv, cv;
class Xb extends uf {
  constructor(t) {
    super(t, Yb, Kb);
    y(this, nh);
    y(this, Ti, /* @__PURE__ */ new WeakMap());
    R(this, "_responseOrigin", null);
    const {
      httpHeaders: s,
      url: i
    } = t;
    this.url = i, this.isHttp = /https?:/.test(i.protocol), this.headers = iv(this.isHttp, s);
  }
  _request(t) {
    const s = new XMLHttpRequest(), i = {
      validateStatus: null,
      onHeadersReceived: t.onHeadersReceived,
      onDone: t.onDone,
      onError: t.onError,
      onProgress: t.onProgress
    };
    n(this, Ti).set(s, i), s.open("GET", this.url), s.withCredentials = this._source.withCredentials;
    for (const [r, a] of this.headers)
      s.setRequestHeader(r, a);
    return this.isHttp && "begin" in t && "end" in t ? (s.setRequestHeader("Range", `bytes=${t.begin}-${t.end - 1}`), i.validateStatus = (r) => r === Zg || r === If) : i.validateStatus = (r) => r === If, s.responseType = "arraybuffer", Gt(t.onError, "Expected `onError` callback to be provided."), s.onerror = () => t.onError(s.status), s.onreadystatechange = w(this, nh, cv).bind(this, s), s.onprogress = w(this, nh, hv).bind(this, s), s.send(null), s;
  }
  _abortRequest(t) {
    n(this, Ti).has(t) && (n(this, Ti).delete(t), t.abort());
  }
  getRangeReader(t, s) {
    const i = super.getRangeReader(t, s);
    return i && (i.onClosed = () => this._rangeReaders.delete(i)), i;
  }
}
Ti = new WeakMap(), nh = new WeakSet(), hv = function(t, s) {
  n(this, Ti).get(t)?.onProgress?.(s);
}, cv = function(t, s) {
  const i = n(this, Ti).get(t);
  if (!i || (t.readyState >= 2 && i.onHeadersReceived && (i.onHeadersReceived(), delete i.onHeadersReceived), t.readyState !== 4) || !n(this, Ti).has(t))
    return;
  if (n(this, Ti).delete(t), t.status === 0 && this.isHttp) {
    i.onError(t.status);
    return;
  }
  const r = t.status || If;
  if (!i.validateStatus(r)) {
    i.onError(t.status);
    return;
  }
  const a = zb(t.response);
  if (r === Zg) {
    const o = t.getResponseHeader("Content-Range");
    /bytes (\d+)-(\d+)\/(\d+)/.test(o) ? i.onDone(a) : (Z('Missing or invalid "Content-Range" header.'), i.onError(0));
  } else a ? i.onDone(a) : i.onError(t.status);
};
var Sc, Hi, dv, uv, fv, pv;
class Yb extends ff {
  constructor(t) {
    super(t);
    y(this, Hi);
    y(this, Sc, yf.bind(this));
    R(this, "_cachedChunks", []);
    R(this, "_done", !1);
    R(this, "_requests", []);
    R(this, "_storedError", null);
    this._fullRequestXhr = t._request({
      onHeadersReceived: w(this, Hi, dv).bind(this),
      onDone: w(this, Hi, uv).bind(this),
      onError: w(this, Hi, fv).bind(this),
      onProgress: w(this, Hi, pv).bind(this)
    });
  }
  async read() {
    if (await this._headersCapability.promise, this._storedError)
      throw this._storedError;
    if (this._cachedChunks.length > 0)
      return {
        value: this._cachedChunks.shift(),
        done: !1
      };
    if (this._done)
      return {
        value: void 0,
        done: !0
      };
    const t = Promise.withResolvers();
    return this._requests.push(t), t.promise;
  }
  cancel(t) {
    this._done = !0, this._headersCapability.reject(t), n(this, Sc).call(this), this._stream._abortRequest(this._fullRequestXhr), this._fullRequestXhr = null;
  }
}
Sc = new WeakMap(), Hi = new WeakSet(), dv = function() {
  const t = this._stream, {
    disableRange: s,
    rangeChunkSize: i
  } = t._source, r = this._fullRequestXhr;
  t._responseOrigin = gf(r.responseURL);
  const a = r.getAllResponseHeaders(), o = new Headers(a ? a.trimStart().replace(/[^\S ]+$/, "").split(/[\r\n]+/).map((d) => {
    const [u, ...f] = d.split(": ");
    return [u, f.join(": ")];
  }) : []), {
    contentLength: l,
    isRangeSupported: h
  } = nv({
    responseHeaders: o,
    isHttp: t.isHttp,
    rangeChunkSize: i,
    disableRange: s
  });
  this._contentLength = l, this._isRangeSupported = h, this._filename = rv(o), this._isRangeSupported && t._abortRequest(r), this._headersCapability.resolve();
}, uv = function(t) {
  this._requests.length > 0 ? this._requests.shift().resolve({
    value: t,
    done: !1
  }) : this._cachedChunks.push(t), this._done = !0, this._cachedChunks.length === 0 && n(this, Sc).call(this);
}, fv = function(t) {
  this._storedError = mf(t, this._stream.url), this._headersCapability.reject(this._storedError);
  for (const s of this._requests)
    s.reject(this._storedError);
  this._requests.length = 0, this._cachedChunks.length = 0;
}, pv = function(t) {
  this.onProgress?.({
    loaded: t.loaded,
    total: t.lengthComputable ? t.total : this._contentLength
  });
};
var xc, Ln, gv, mv, cp;
class Kb extends pf {
  constructor(t, s, i) {
    super(t, s, i);
    y(this, Ln);
    y(this, xc, yf.bind(this));
    R(this, "onClosed", null);
    R(this, "_done", !1);
    R(this, "_queuedChunk", null);
    R(this, "_requests", []);
    R(this, "_storedError", null);
    this._requestXhr = t._request({
      begin: s,
      end: i,
      onHeadersReceived: w(this, Ln, gv).bind(this),
      onDone: w(this, Ln, mv).bind(this),
      onError: w(this, Ln, cp).bind(this),
      onProgress: null
    });
  }
  async read() {
    if (this._storedError)
      throw this._storedError;
    if (this._queuedChunk !== null) {
      const s = this._queuedChunk;
      return this._queuedChunk = null, {
        value: s,
        done: !1
      };
    }
    if (this._done)
      return {
        value: void 0,
        done: !0
      };
    const t = Promise.withResolvers();
    return this._requests.push(t), t.promise;
  }
  cancel(t) {
    this._done = !0, n(this, xc).call(this), this._stream._abortRequest(this._requestXhr), this.onClosed?.();
  }
}
xc = new WeakMap(), Ln = new WeakSet(), gv = function() {
  const t = gf(this._requestXhr?.responseURL);
  try {
    av(t, this._stream._responseOrigin);
  } catch (s) {
    this._storedError = s, w(this, Ln, cp).call(this, 0);
  }
}, mv = function(t) {
  this._requests.length > 0 ? this._requests.shift().resolve({
    value: t,
    done: !1
  }) : this._queuedChunk = t, this._done = !0, n(this, xc).call(this), this.onClosed?.();
}, cp = function(t) {
  this._storedError ?? (this._storedError = mf(t, this._stream.url));
  for (const s of this._requests)
    s.reject(this._storedError);
  this._requests.length = 0, this._queuedChunk = null;
};
function vv(c) {
  const {
    Readable: e
  } = process.getBuiltinModule("stream");
  return typeof e.toWeb == "function" ? e.toWeb(c) : process.getBuiltinModule("module").createRequire(import.meta.url)("node-readable-to-web-readable-stream").makeDefaultReadableStreamFromNodeReadable(c);
}
class Jb extends uf {
  constructor(e) {
    super(e, Qb, Zb);
    const {
      url: t
    } = e;
    Gt(t.protocol === "file:", "PDFNodeStream only supports file:// URLs.");
  }
}
class Qb extends ff {
  constructor(t) {
    super(t);
    R(this, "_reader", null);
    const {
      disableRange: s,
      disableStream: i,
      rangeChunkSize: r,
      url: a
    } = t._source;
    this._isStreamingSupported = !i;
    const o = process.getBuiltinModule("fs");
    o.promises.lstat(a).then((l) => {
      const h = o.createReadStream(a), d = vv(h);
      this._reader = d.getReader();
      const {
        size: u
      } = l;
      this._contentLength = u, this._isRangeSupported = !s && u > 2 * r, !this._isStreamingSupported && this._isRangeSupported && this.cancel(new Dr("Streaming is disabled.")), this._headersCapability.resolve();
    }).catch((l) => {
      l.code === "ENOENT" && (l = mf(0, a)), this._headersCapability.reject(l);
    });
  }
  async read() {
    await this._headersCapability.promise;
    const {
      value: t,
      done: s
    } = await this._reader.read();
    return s ? {
      value: t,
      done: s
    } : (this._loaded += t.byteLength, this._callOnProgress(), {
      value: vf(t),
      done: !1
    });
  }
  cancel(t) {
    this._reader?.cancel(t);
  }
}
class Zb extends pf {
  constructor(t, s, i) {
    super(t, s, i);
    R(this, "_readCapability", Promise.withResolvers());
    R(this, "_reader", null);
    const {
      url: r
    } = t._source, a = process.getBuiltinModule("fs");
    try {
      const o = a.createReadStream(r, {
        start: s,
        end: i - 1
      }), l = vv(o);
      this._reader = l.getReader(), this._readCapability.resolve();
    } catch (o) {
      this._readCapability.reject(o);
    }
  }
  async read() {
    await this._readCapability.promise;
    const {
      value: t,
      done: s
    } = await this._reader.read();
    return s ? {
      value: t,
      done: s
    } : {
      value: vf(t),
      done: !1
    };
  }
  cancel(t) {
    this._reader?.cancel(t);
  }
}
function qb(c) {
  return Mh(c) ? $b : xs ? Jb : Xb;
}
var Tc, Cc;
class li {
  static get workerPort() {
    return n(this, Tc);
  }
  static set workerPort(e) {
    if (!(typeof Worker < "u" && e instanceof Worker) && e !== null)
      throw new Error("Invalid `workerPort` type.");
    g(this, Tc, e);
  }
  static get workerSrc() {
    return n(this, Cc);
  }
  static set workerSrc(e) {
    if (typeof e != "string")
      throw new Error("Invalid `workerSrc` type.");
    g(this, Cc, e);
  }
}
Tc = new WeakMap(), Cc = new WeakMap(), y(li, Tc, null), y(li, Cc, "");
var hl, Ic;
class tA {
  constructor({
    parsedData: e,
    rawData: t
  }) {
    y(this, hl);
    y(this, Ic);
    g(this, hl, e), g(this, Ic, t);
  }
  getRaw() {
    return n(this, Ic);
  }
  get(e) {
    return n(this, hl).get(e) ?? null;
  }
  [Symbol.iterator]() {
    return n(this, hl).entries();
  }
}
hl = new WeakMap(), Ic = new WeakMap();
const yo = /* @__PURE__ */ Symbol("INTERNAL");
var Pc, Rc, Dc, cl;
class eA {
  constructor(e, {
    name: t,
    intent: s,
    usage: i,
    rbGroups: r
  }) {
    y(this, Pc, !1);
    y(this, Rc, !1);
    y(this, Dc, !1);
    y(this, cl, !0);
    g(this, Pc, !!(e & Ss.DISPLAY)), g(this, Rc, !!(e & Ss.PRINT)), this.name = t, this.intent = s, this.usage = i, this.rbGroups = r;
  }
  get visible() {
    if (n(this, Dc))
      return n(this, cl);
    if (!n(this, cl))
      return !1;
    const {
      print: e,
      view: t
    } = this.usage;
    return n(this, Pc) ? t?.viewState !== "OFF" : n(this, Rc) ? e?.printState !== "OFF" : !0;
  }
  _setVisible(e, t, s = !1) {
    e !== yo && bt("Internal method `_setVisible` called."), g(this, Dc, s), g(this, cl, t);
  }
}
Pc = new WeakMap(), Rc = new WeakMap(), Dc = new WeakMap(), cl = new WeakMap();
var or, Rt, dl, ul, Mc, dp;
class sA {
  constructor(e, t = Ss.DISPLAY) {
    y(this, Mc);
    y(this, or, null);
    y(this, Rt, /* @__PURE__ */ new Map());
    y(this, dl, null);
    y(this, ul, null);
    if (this.renderingIntent = t, this.name = null, this.creator = null, e !== null) {
      this.name = e.name, this.creator = e.creator, g(this, ul, e.order);
      for (const s of e.groups)
        n(this, Rt).set(s.id, new eA(t, s));
      if (e.baseState === "OFF")
        for (const s of n(this, Rt).values())
          s._setVisible(yo, !1);
      for (const s of e.on)
        n(this, Rt).get(s)._setVisible(yo, !0);
      for (const s of e.off)
        n(this, Rt).get(s)._setVisible(yo, !1);
      g(this, dl, this.getHash());
    }
  }
  isVisible(e) {
    if (n(this, Rt).size === 0)
      return !0;
    if (!e)
      return hf("Optional content group not defined."), !0;
    if (e.type === "OCG")
      return n(this, Rt).has(e.id) ? n(this, Rt).get(e.id).visible : (Z(`Optional content group not found: ${e.id}`), !0);
    if (e.type === "OCMD") {
      if (e.expression)
        return w(this, Mc, dp).call(this, e.expression);
      if (!e.policy || e.policy === "AnyOn") {
        for (const t of e.ids) {
          if (!n(this, Rt).has(t))
            return Z(`Optional content group not found: ${t}`), !0;
          if (n(this, Rt).get(t).visible)
            return !0;
        }
        return !1;
      } else if (e.policy === "AllOn") {
        for (const t of e.ids) {
          if (!n(this, Rt).has(t))
            return Z(`Optional content group not found: ${t}`), !0;
          if (!n(this, Rt).get(t).visible)
            return !1;
        }
        return !0;
      } else if (e.policy === "AnyOff") {
        for (const t of e.ids) {
          if (!n(this, Rt).has(t))
            return Z(`Optional content group not found: ${t}`), !0;
          if (!n(this, Rt).get(t).visible)
            return !0;
        }
        return !1;
      } else if (e.policy === "AllOff") {
        for (const t of e.ids) {
          if (!n(this, Rt).has(t))
            return Z(`Optional content group not found: ${t}`), !0;
          if (n(this, Rt).get(t).visible)
            return !1;
        }
        return !0;
      }
      return Z(`Unknown optional content policy ${e.policy}.`), !0;
    }
    return Z(`Unknown group type ${e.type}.`), !0;
  }
  setVisibility(e, t = !0, s = !0) {
    const i = n(this, Rt).get(e);
    if (!i) {
      Z(`Optional content group not found: ${e}`);
      return;
    }
    if (s && t && i.rbGroups.length)
      for (const r of i.rbGroups)
        for (const a of r)
          a !== e && n(this, Rt).get(a)?._setVisible(yo, !1, !0);
    i._setVisible(yo, !!t, !0), g(this, or, null);
  }
  setOCGState({
    state: e,
    preserveRB: t
  }) {
    let s;
    for (const i of e) {
      switch (i) {
        case "ON":
        case "OFF":
        case "Toggle":
          s = i;
          continue;
      }
      const r = n(this, Rt).get(i);
      if (r)
        switch (s) {
          case "ON":
            this.setVisibility(i, !0, t);
            break;
          case "OFF":
            this.setVisibility(i, !1, t);
            break;
          case "Toggle":
            this.setVisibility(i, !r.visible, t);
            break;
        }
    }
    g(this, or, null);
  }
  get hasInitialVisibility() {
    return n(this, dl) === null || this.getHash() === n(this, dl);
  }
  getOrder() {
    return n(this, Rt).size ? n(this, ul) ? n(this, ul).slice() : [...n(this, Rt).keys()] : null;
  }
  getGroup(e) {
    return n(this, Rt).get(e) || null;
  }
  getHash() {
    if (n(this, or) !== null)
      return n(this, or);
    const e = new _m();
    for (const [t, s] of n(this, Rt))
      e.update(`${t}:${s.visible}`);
    return g(this, or, e.hexdigest());
  }
  [Symbol.iterator]() {
    return n(this, Rt).entries();
  }
}
or = new WeakMap(), Rt = new WeakMap(), dl = new WeakMap(), ul = new WeakMap(), Mc = new WeakSet(), dp = function(e) {
  const t = e.length;
  if (t < 2)
    return !0;
  const s = e[0];
  for (let i = 1; i < t; i++) {
    const r = e[i];
    let a;
    if (Array.isArray(r))
      a = w(this, Mc, dp).call(this, r);
    else if (n(this, Rt).has(r))
      a = n(this, Rt).get(r).visible;
    else
      return Z(`Optional content group not found: ${r}`), !0;
    switch (s) {
      case "And":
        if (!a)
          return !1;
        break;
      case "Or":
        if (a)
          return !0;
        break;
      case "Not":
        return !a;
      default:
        return !0;
    }
  }
  return s === "And";
};
var Zt, qs, Te, Aa, Ci, He, wh, Eh, eu;
class iA {
  constructor() {
    y(this, He);
    y(this, Zt, null);
    y(this, qs, null);
    y(this, Te, 0);
    y(this, Aa, null);
    y(this, Ci, null);
  }
  get pagesNumber() {
    return n(this, Te);
  }
  set pagesNumber(e) {
    n(this, Te) !== e && (g(this, Te, e), g(this, Zt, null), g(this, qs, null));
  }
  movePages(e, t, s) {
    w(this, He, wh).call(this);
    const i = n(this, Zt), r = w(this, He, Eh).call(this), a = t.length, o = new Uint32Array(a);
    let l = 0;
    for (let f = 0; f < a; f++) {
      const p = t[f] - 1;
      o[f] = i[p], p < s && l++;
    }
    const h = n(this, Te), d = h - a, u = Ae(s - l, 0, d);
    for (let f = 0, p = 0; f < h; f++)
      e.has(f + 1) || (i[p++] = i[f]);
    i.copyWithin(u + a, u, d), i.set(o, u), w(this, He, eu).call(this, r), i.every((f, p) => f === p + 1) && g(this, Zt, null);
  }
  deletePages(e) {
    w(this, He, wh).call(this);
    const t = n(this, Zt), s = w(this, He, Eh).call(this);
    g(this, Ci, {
      pageNumberToId: t.slice(),
      pagesNumber: n(this, Te),
      prevPageNumbers: n(this, qs).slice()
    });
    const i = n(this, Te) - e.length;
    g(this, Te, i);
    const r = g(this, Zt, new Uint32Array(i));
    g(this, qs, new Int32Array(i));
    let a = 0, o = 0;
    for (const l of e) {
      const h = l - 1;
      h !== a && (r.set(t.subarray(a, h), o), o += h - a), a = h + 1;
    }
    a < t.length && r.set(t.subarray(a), o), w(this, He, eu).call(this, s, new Set(e));
  }
  cancelDelete() {
    n(this, Ci) && (g(this, Zt, n(this, Ci).pageNumberToId), g(this, Te, n(this, Ci).pagesNumber), g(this, qs, n(this, Ci).prevPageNumbers), g(this, Ci, null));
  }
  cleanSavedData() {
    g(this, Ci, null);
  }
  copyPages(e) {
    w(this, He, wh).call(this), g(this, Aa, {
      pageNumbers: e,
      pageIds: e.map((t) => n(this, Zt)[t - 1])
    });
  }
  cancelCopy() {
    g(this, Aa, null);
  }
  pastePages(e) {
    w(this, He, wh).call(this);
    const t = n(this, Zt), s = w(this, He, Eh).call(this), {
      pageNumbers: i,
      pageIds: r
    } = n(this, Aa), a = n(this, Te) + i.length;
    g(this, Te, a);
    const o = g(this, Zt, new Uint32Array(a));
    g(this, qs, new Int32Array(a)), o.set(t.subarray(0, e), 0), o.set(r, e), o.set(t.subarray(e), e + i.length), w(this, He, eu).call(this, s, null, e, i), g(this, Aa, null);
  }
  hasBeenAltered() {
    return n(this, Zt) !== null;
  }
  getPageMappingForSaving(e = null) {
    e ?? (e = w(this, He, Eh).call(this));
    let t = 0;
    for (const i of e.values())
      t = Math.max(t, i.length);
    const s = new Array(t);
    for (let i = 0; i < t; i++)
      s[i] = {
        document: null,
        pageIndices: [],
        includePages: []
      };
    for (const [i, r] of e)
      for (let a = 0, o = r.length; a < o; a++)
        s[a].includePages.push([i - 1, r[a] - 1]);
    for (const {
      includePages: i,
      pageIndices: r
    } of s) {
      i.sort((a, o) => a[0] - o[0]);
      for (let a = 0, o = i.length; a < o; a++)
        r.push(i[a][1]), i[a] = i[a][0];
    }
    return s;
  }
  extractPages(e) {
    e = Array.from(e).sort((s, i) => s - i);
    const t = /* @__PURE__ */ new Map();
    for (let s = 0, i = e.length; s < i; s++) {
      const r = this.getPageId(e[s]);
      t.getOrInsertComputed(r, ag).push(s + 1);
    }
    return this.getPageMappingForSaving(t);
  }
  getPrevPageNumber(e) {
    return n(this, qs)?.[e - 1] ?? 0;
  }
  getPageNumber(e) {
    if (!n(this, Zt))
      return e;
    const t = n(this, Zt);
    for (let s = 0, i = n(this, Te); s < i; s++)
      if (t[s] === e)
        return s + 1;
    return 0;
  }
  getPageId(e) {
    return n(this, Zt)?.[e - 1] ?? e;
  }
  getMapping() {
    return n(this, Zt)?.subarray(0, this.pagesNumber);
  }
}
Zt = new WeakMap(), qs = new WeakMap(), Te = new WeakMap(), Aa = new WeakMap(), Ci = new WeakMap(), He = new WeakSet(), wh = function() {
  if (n(this, Zt))
    return;
  const e = n(this, Te), t = g(this, Zt, new Uint32Array(e));
  for (let s = 0; s < e; s++)
    t[s] = s + 1;
  g(this, qs, new Int32Array(t));
}, Eh = function() {
  const e = /* @__PURE__ */ new Map(), t = n(this, Zt);
  for (let s = 0, i = n(this, Te); s < i; s++) {
    const r = t[s], a = e.get(r);
    a ? a.push(s + 1) : e.set(r, [s + 1]);
  }
  return e;
}, eu = function(e, t = null, s = -1, i = null) {
  const r = n(this, qs), a = n(this, Zt), o = s + (i?.length ?? 0), l = /* @__PURE__ */ new Map();
  for (let h = 0, d = n(this, Te); h < d; h++) {
    if (h >= s && h < o) {
      r[h] = -i[h - s];
      continue;
    }
    const u = a[h], f = e.get(u);
    let p = l.get(u) || 0;
    if (t && f)
      for (; p < f.length && t.has(f[p]); )
        p++;
    r[h] = f?.[p], l.set(u, p + 1);
  }
};
const bo = /* @__PURE__ */ Symbol("INITIAL_DATA"), qg = () => ({
  ...Promise.withResolvers(),
  data: bo
});
var Hs;
class yv {
  constructor() {
    y(this, Hs, /* @__PURE__ */ new Map());
  }
  get(e, t = null) {
    if (t) {
      const i = n(this, Hs).getOrInsertComputed(e, qg);
      return i.promise.then(() => t(i.data)), null;
    }
    const s = n(this, Hs).get(e);
    if (!s || s.data === bo)
      throw new Error(`Requesting object that isn't resolved yet ${e}.`);
    return s.data;
  }
  has(e) {
    const t = n(this, Hs).get(e);
    return !!t && t.data !== bo;
  }
  delete(e) {
    const t = n(this, Hs).get(e);
    return !t || t.data === bo ? !1 : (n(this, Hs).delete(e), !0);
  }
  resolve(e, t = null) {
    const s = n(this, Hs).getOrInsertComputed(e, qg);
    if (s.data !== bo)
      throw new Error(`Object already resolved ${e}.`);
    s.data = t, s.resolve();
  }
  clear() {
    for (const {
      data: e
    } of n(this, Hs).values())
      e?.bitmap?.close();
    n(this, Hs).clear();
  }
  *[Symbol.iterator]() {
    for (const [e, {
      data: t
    }] of n(this, Hs))
      t !== bo && (yield [e, t]);
  }
}
Hs = new WeakMap();
const nA = 1e5, tm = 30;
var lr, _e, Oc, Lc, fl, wa, cn, Fc, kc, Ea, Nc, pl, hr, gl, Bc, ml, Sa, Uc, Hc, vl, xa, $c, yl, bl, Fn, bv, Av, up, Is, su, fp, wv, Ev;
const we = class we {
  constructor({
    textContentSource: e,
    images: t,
    container: s,
    viewport: i
  }) {
    y(this, Fn);
    y(this, lr, Promise.withResolvers());
    y(this, _e, null);
    y(this, Oc, !1);
    y(this, Lc, !!globalThis.FontInspector?.enabled);
    y(this, fl, null);
    y(this, wa, null);
    y(this, cn, null);
    y(this, Fc, 0);
    y(this, kc, 0);
    y(this, Ea, null);
    y(this, Nc, null);
    y(this, pl, 0);
    y(this, hr, 0);
    y(this, gl, /* @__PURE__ */ Object.create(null));
    y(this, Bc, []);
    y(this, ml, null);
    y(this, Sa, []);
    y(this, Uc, /* @__PURE__ */ new WeakMap());
    y(this, Hc, null);
    var h;
    if (e instanceof ReadableStream)
      g(this, ml, e);
    else if (typeof e == "object")
      g(this, ml, new ReadableStream({
        start(d) {
          d.enqueue(e), d.close();
        }
      }));
    else
      throw new Error('No "textContentSource" parameter specified.');
    g(this, _e, g(this, Nc, s)), g(this, fl, t), g(this, hr, i.scale * Ui.pixelRatio), g(this, pl, i.rotation), g(this, cn, {
      div: null,
      properties: null,
      ctx: null
    });
    const {
      pageWidth: r,
      pageHeight: a,
      pageX: o,
      pageY: l
    } = i.rawDims;
    g(this, Hc, [1, 0, 0, -1, -o, l + a]), g(this, kc, r), g(this, Fc, a), w(h = we, Is, wv).call(h), s.style.setProperty("--min-font-size", n(we, yl)), ao(s, i), n(this, lr).promise.finally(() => {
      n(we, bl).delete(this), g(this, cn, null), g(this, gl, null);
    }).catch(() => {
    });
  }
  static get fontFamilyMap() {
    const {
      isWindows: e,
      isFirefox: t
    } = de.platform;
    return nt(this, "fontFamilyMap", /* @__PURE__ */ new Map([["sans-serif", `${e && t ? "Calibri, " : ""}sans-serif`], ["monospace", `${e && t ? "Lucida Console, " : ""}monospace`]]));
  }
  render() {
    n(this, fl) && n(this, _e).append(n(this, fl).render());
    const e = () => {
      n(this, Ea).read().then(({
        value: t,
        done: s
      }) => {
        if (s) {
          n(this, lr).resolve();
          return;
        }
        n(this, wa) ?? g(this, wa, t.lang), Object.assign(n(this, gl), t.styles), w(this, Fn, bv).call(this, t.items), e();
      }, n(this, lr).reject);
    };
    return g(this, Ea, n(this, ml).getReader()), n(we, bl).add(this), e(), n(this, lr).promise;
  }
  update({
    viewport: e,
    onBefore: t = null
  }) {
    var r;
    const s = e.scale * Ui.pixelRatio, i = e.rotation;
    if (i !== n(this, pl) && (t?.(), g(this, pl, i), ao(n(this, Nc), {
      rotation: i
    })), s !== n(this, hr)) {
      t?.(), g(this, hr, s);
      const a = {
        div: null,
        properties: null,
        ctx: w(r = we, Is, su).call(r, n(this, wa))
      };
      for (const o of n(this, Sa))
        a.properties = n(this, Uc).get(o), a.div = o, w(this, Fn, up).call(this, a);
    }
  }
  cancel() {
    const e = new Dr("TextLayer task cancelled.");
    n(this, Ea)?.cancel(e).catch(() => {
    }), g(this, Ea, null), n(this, lr).reject(e);
  }
  get textDivs() {
    return n(this, Sa);
  }
  get textContentItemsStr() {
    return n(this, Bc);
  }
  static cleanup() {
    if (!(n(this, bl).size > 0)) {
      n(this, vl).clear();
      for (const {
        canvas: e
      } of n(this, xa).values())
        e.remove();
      n(this, xa).clear();
    }
  }
};
lr = new WeakMap(), _e = new WeakMap(), Oc = new WeakMap(), Lc = new WeakMap(), fl = new WeakMap(), wa = new WeakMap(), cn = new WeakMap(), Fc = new WeakMap(), kc = new WeakMap(), Ea = new WeakMap(), Nc = new WeakMap(), pl = new WeakMap(), hr = new WeakMap(), gl = new WeakMap(), Bc = new WeakMap(), ml = new WeakMap(), Sa = new WeakMap(), Uc = new WeakMap(), Hc = new WeakMap(), vl = new WeakMap(), xa = new WeakMap(), $c = new WeakMap(), yl = new WeakMap(), bl = new WeakMap(), Fn = new WeakSet(), bv = function(e) {
  var i, r;
  if (n(this, Oc))
    return;
  (r = n(this, cn)).ctx ?? (r.ctx = w(i = we, Is, su).call(i, n(this, wa)));
  const t = n(this, Sa), s = n(this, Bc);
  for (const a of e) {
    if (t.length > nA) {
      Z("Ignoring additional textDivs for performance reasons."), g(this, Oc, !0);
      return;
    }
    if (a.str === void 0) {
      if (a.type === "beginMarkedContentProps" || a.type === "beginMarkedContent") {
        const o = n(this, _e);
        g(this, _e, document.createElement("span")), n(this, _e).classList.add("markedContent"), a.id && n(this, _e).setAttribute("id", `${a.id}`), a.tag === "Artifact" && (n(this, _e).ariaHidden = !0), o.append(n(this, _e));
      } else a.type === "endMarkedContent" && g(this, _e, n(this, _e).parentNode);
      continue;
    }
    s.push(a.str), w(this, Fn, Av).call(this, a);
  }
}, Av = function(e) {
  var m;
  const t = document.createElement("span"), s = {
    angle: 0,
    canvasWidth: 0,
    hasText: e.str !== "",
    hasEOL: e.hasEOL,
    fontSize: 0
  };
  n(this, Sa).push(t);
  const i = j.transform(n(this, Hc), e.transform);
  let r = Math.atan2(i[1], i[0]);
  const a = n(this, gl)[e.fontName];
  a.vertical && (r += Math.PI / 2);
  let o = n(this, Lc) && a.fontSubstitution || a.fontFamily;
  o = we.fontFamilyMap.get(o) || o;
  const l = Math.hypot(i[2], i[3]), h = l * w(m = we, Is, Ev).call(m, o, a, n(this, wa));
  let d, u;
  r === 0 ? (d = i[4], u = i[5] - h) : (d = i[4] + h * Math.sin(r), u = i[5] - h * Math.cos(r));
  const f = t.style;
  f.left = `${(100 * d / n(this, kc)).toFixed(2)}%`, f.top = `${(100 * u / n(this, Fc)).toFixed(2)}%`, f.setProperty("--font-height", `${l.toFixed(2)}px`), f.fontFamily = o, s.fontSize = l, t.setAttribute("role", "presentation"), t.textContent = e.str, t.dir = e.dir, n(this, Lc) && (t.dataset.fontName = a.fontSubstitutionLoadedName || e.fontName), r !== 0 && (s.angle = r * (180 / Math.PI));
  let p = !1;
  if (e.str.length > 1)
    p = !0;
  else if (e.str !== " " && e.transform[0] !== e.transform[3]) {
    const v = Math.abs(e.transform[0]), A = Math.abs(e.transform[3]);
    v !== A && Math.max(v, A) / Math.min(v, A) > 1.5 && (p = !0);
  }
  if (p && (s.canvasWidth = a.vertical ? e.height : e.width), n(this, Uc).set(t, s), n(this, cn).div = t, n(this, cn).properties = s, w(this, Fn, up).call(this, n(this, cn)), s.hasText && n(this, _e).append(t), s.hasEOL) {
    const v = document.createElement("br");
    v.setAttribute("role", "presentation"), n(this, _e).append(v);
  }
}, up = function(e) {
  var a;
  const {
    div: t,
    properties: s,
    ctx: i
  } = e, {
    style: r
  } = t;
  if (s.canvasWidth !== 0 && s.hasText) {
    const {
      fontFamily: o
    } = r, {
      canvasWidth: l,
      fontSize: h
    } = s;
    w(a = we, Is, fp).call(a, i, h * n(this, hr), o);
    const {
      width: d
    } = i.measureText(t.textContent);
    d > 0 && r.setProperty("--scale-x", l * n(this, hr) / d);
  }
  s.angle !== 0 && r.setProperty("--rotate", `${s.angle}deg`);
}, Is = new WeakSet(), su = function(e = null) {
  let t = n(this, xa).get(e || (e = ""));
  if (!t) {
    const s = document.createElement("canvas");
    s.className = "hiddenCanvasElement", s.lang = e, document.body.append(s), t = s.getContext("2d", {
      alpha: !1,
      willReadFrequently: !0
    }), n(this, xa).set(e, t), n(this, $c).set(t, {
      size: 0,
      family: ""
    });
  }
  return t;
}, fp = function(e, t, s) {
  const i = n(this, $c).get(e);
  t === i.size && s === i.family || (e.font = `${t}px ${s}`, i.size = t, i.family = s);
}, wv = function() {
  if (n(this, yl) !== null)
    return;
  const e = document.createElement("div");
  e.style.opacity = 0, e.style.lineHeight = 1, e.style.fontSize = "1px", e.style.position = "absolute", e.textContent = "X", document.body.append(e), g(this, yl, e.getBoundingClientRect().height), e.remove();
}, Ev = function(e, t, s) {
  const i = n(this, vl).get(e);
  if (i)
    return i;
  const r = w(this, Is, su).call(this, s);
  r.canvas.width = r.canvas.height = tm, w(this, Is, fp).call(this, r, tm, e);
  const a = r.measureText(""), o = a.fontBoundingBoxAscent, l = Math.abs(a.fontBoundingBoxDescent);
  r.canvas.width = r.canvas.height = 0;
  let h = 0.8;
  return o ? h = o / (o + l) : (de.platform.isFirefox && Z("Enable the `dom.textMetrics.fontBoundingBox.enabled` preference in `about:config` to improve TextLayer rendering."), t.ascent ? h = t.ascent : t.descent && (h = 1 + t.descent)), n(this, vl).set(e, h), h;
}, y(we, Is), y(we, vl, /* @__PURE__ */ new Map()), y(we, xa, /* @__PURE__ */ new Map()), y(we, $c, /* @__PURE__ */ new WeakMap()), y(we, yl, null), y(we, bl, /* @__PURE__ */ new Set());
let Uh = we;
const rA = 100;
function Sv(c = {}) {
  typeof c == "string" || c instanceof URL ? c = {
    url: c
  } : (c instanceof ArrayBuffer || ArrayBuffer.isView(c)) && (c = {
    data: c
  });
  const e = new pp(), {
    docId: t
  } = e, s = c.url ? ub(c.url) : null, i = c.data ? fb(c.data) : null, r = c.httpHeaders || null, a = c.withCredentials === !0, o = c.password ?? null, l = c.range instanceof pg ? c.range : null, h = Number.isInteger(c.rangeChunkSize) && c.rangeChunkSize > 0 ? c.rangeChunkSize : 2 ** 16;
  let d = c.worker instanceof sh ? c.worker : null;
  const u = c.verbosity, f = typeof c.docBaseUrl == "string" && !df(c.docBaseUrl) ? c.docBaseUrl : null, p = kd(c.cMapUrl), m = c.cMapPacked !== !1, v = kd(c.iccUrl), A = kd(c.standardFontDataUrl), b = kd(c.wasmUrl), E = c.stopAtErrors !== !0, S = Number.isInteger(c.maxImageSize) && c.maxImageSize > -1 ? c.maxImageSize : -1, T = c.isEvalSupported !== !1, x = typeof c.isOffscreenCanvasSupported == "boolean" ? c.isOffscreenCanvasSupported : !xs, C = typeof c.isImageDecoderSupported == "boolean" ? c.isImageDecoderSupported : !xs && (de.platform.isFirefox || !globalThis.chrome), I = Number.isInteger(c.canvasMaxAreaInBytes) ? c.canvasMaxAreaInBytes : -1, M = typeof c.disableFontFace == "boolean" ? c.disableFontFace : xs, P = c.fontExtraProperties === !0, O = c.enableXfa === !0, D = c.ownerDocument || globalThis.document, $ = c.disableRange === !0, F = c.disableStream === !0, N = c.disableAutoFetch === !0, K = c.pdfBug === !0, B = c.CanvasFactory || (xs ? wb : vb), k = c.FilterFactory || (xs ? Ab : yb), _ = c.BinaryDataFactory || (xs ? Eb : jg), st = c.enableHWA === !0, mt = c.enableWebGPU === !0, ft = c.useWasm !== !1, et = c.pagesMapper || new iA(), J = typeof c.useSystemFonts == "boolean" ? c.useSystemFonts : !xs && !M, lt = typeof c.useWorkerFetch == "boolean" ? c.useWorkerFetch : !!(_ === jg && p && m && A && b && Mh(p, document.baseURI) && Mh(A, document.baseURI) && Mh(b, document.baseURI)), Mt = null;
  Oy(u);
  const U = {
    canvasFactory: new B({
      ownerDocument: D,
      enableHWA: st
    }),
    filterFactory: new k({
      docId: t,
      ownerDocument: D
    }),
    binaryDataFactory: lt ? null : new _({
      cMapUrl: p,
      standardFontDataUrl: A,
      wasmUrl: b
    })
  };
  d || (d = sh.create({
    verbosity: u,
    port: li.workerPort
  }), e._worker = d);
  const L = {
    docId: t,
    apiVersion: "5.6.205",
    data: i,
    password: o,
    disableAutoFetch: N,
    rangeChunkSize: h,
    docBaseUrl: f,
    enableXfa: O,
    evaluatorOptions: {
      maxImageSize: S,
      disableFontFace: M,
      ignoreErrors: E,
      isEvalSupported: T,
      isOffscreenCanvasSupported: x,
      isImageDecoderSupported: C,
      canvasMaxAreaInBytes: I,
      fontExtraProperties: P,
      useSystemFonts: J,
      useWasm: ft,
      useWorkerFetch: lt,
      cMapUrl: p,
      cMapPacked: m,
      iccUrl: v,
      standardFontDataUrl: A,
      wasmUrl: b,
      enableWebGPU: mt
    }
  }, H = {
    ownerDocument: D,
    pdfBug: K,
    styleElement: Mt,
    enableHWA: st,
    loadingParams: {
      disableAutoFetch: N,
      enableXfa: O
    }
  };
  return d.promise.then(function() {
    if (e.destroyed)
      throw new Error("Loading aborted");
    if (d.destroyed)
      throw new Error("Worker was destroyed");
    const X = d.messageHandler.sendWithPromise("GetDocRequest", L, i ? [i.buffer] : null);
    let dt;
    if (!i) if (l)
      dt = new _b({
        pdfDataRangeTransport: l,
        disableRange: $,
        disableStream: F
      });
    else if (s) {
      const Y = qb(s);
      dt = new Y({
        url: s,
        httpHeaders: r,
        withCredentials: a,
        rangeChunkSize: h,
        disableRange: $,
        disableStream: F
      });
    } else
      throw new Error("getDocument - expected either `data`, `range`, or `url` parameter.");
    return X.then((Y) => {
      if (e.destroyed)
        throw new Error("Loading aborted");
      if (d.destroyed)
        throw new Error("Worker was destroyed");
      const ht = new mh(t, Y, d.port), Ot = new oA(ht, e, dt, H, U, et);
      e._transport = Ot, ht.send("Ready", null);
    });
  }).catch(e._capability.reject), e;
}
var Ku;
const Ju = class Ju {
  constructor() {
    R(this, "_capability", Promise.withResolvers());
    R(this, "_transport", null);
    R(this, "_worker", null);
    R(this, "docId", `d${ee(Ju, Ku)._++}`);
    R(this, "destroyed", !1);
    R(this, "onPassword", null);
    R(this, "onProgress", null);
  }
  get promise() {
    return this._capability.promise;
  }
  async destroy() {
    this.destroyed = !0;
    try {
      this._worker?.port && (this._worker._pendingDestroy = !0), await this._transport?.destroy();
    } catch (e) {
      throw this._worker?.port && delete this._worker._pendingDestroy, e;
    }
    this._transport = null, this._worker?.destroy(), this._worker = null;
  }
  async getData() {
    return this._transport.getData();
  }
};
Ku = new WeakMap(), y(Ju, Ku, 0);
let pp = Ju;
var Al, jc, Gc, _c;
class pg {
  constructor(e, t, s = !1, i = null) {
    y(this, Al, Promise.withResolvers());
    y(this, jc, []);
    y(this, Gc, []);
    y(this, _c, []);
    this.length = e, this.initialData = t, this.progressiveDone = s, this.contentDispositionFilename = i, Object.defineProperty(this, "onDataProgress", {
      value: () => {
        Vy("`PDFDataRangeTransport.prototype.onDataProgress` - method was removed, since loading progress is now reported automatically through the `PDFDataTransportStream` class (and related code).");
      }
    });
  }
  addRangeListener(e) {
    n(this, _c).push(e);
  }
  addProgressiveReadListener(e) {
    n(this, Gc).push(e);
  }
  addProgressiveDoneListener(e) {
    n(this, jc).push(e);
  }
  onDataRange(e, t) {
    for (const s of n(this, _c))
      s(e, t);
  }
  onDataProgressiveRead(e) {
    n(this, Al).promise.then(() => {
      for (const t of n(this, Gc))
        t(e);
    });
  }
  onDataProgressiveDone() {
    n(this, Al).promise.then(() => {
      for (const e of n(this, jc))
        e();
    });
  }
  transportReady() {
    n(this, Al).resolve();
  }
  requestDataRange(e, t) {
    bt("Abstract method PDFDataRangeTransport.requestDataRange");
  }
  abort() {
  }
}
Al = new WeakMap(), jc = new WeakMap(), Gc = new WeakMap(), _c = new WeakMap();
class aA {
  constructor(e, t) {
    this._pdfInfo = e, this._transport = t;
  }
  get pagesMapper() {
    return this._transport.pagesMapper;
  }
  get annotationStorage() {
    return this._transport.annotationStorage;
  }
  get canvasFactory() {
    return this._transport.canvasFactory;
  }
  get filterFactory() {
    return this._transport.filterFactory;
  }
  get numPages() {
    return this._pdfInfo.numPages;
  }
  get fingerprints() {
    return this._pdfInfo.fingerprints;
  }
  get isPureXfa() {
    return nt(this, "isPureXfa", !!this._transport._htmlForXfa);
  }
  get allXfaHtml() {
    return this._transport._htmlForXfa;
  }
  getPage(e) {
    return this._transport.getPage(e);
  }
  getPageIndex(e) {
    return this._transport.getPageIndex(e);
  }
  getDestinations() {
    return this._transport.getDestinations();
  }
  getDestination(e) {
    return this._transport.getDestination(e);
  }
  getPageLabels() {
    return this._transport.getPageLabels();
  }
  getPageLayout() {
    return this._transport.getPageLayout();
  }
  getPageMode() {
    return this._transport.getPageMode();
  }
  getViewerPreferences() {
    return this._transport.getViewerPreferences();
  }
  getOpenAction() {
    return this._transport.getOpenAction();
  }
  getAttachments() {
    return this._transport.getAttachments();
  }
  getAnnotationsByType(e, t) {
    return this._transport.getAnnotationsByType(e, t);
  }
  getJSActions() {
    return this._transport.getDocJSActions();
  }
  getOutline() {
    return this._transport.getOutline();
  }
  getOptionalContentConfig({
    intent: e = "display"
  } = {}) {
    const {
      renderingIntent: t
    } = this._transport.getRenderingIntent(e);
    return this._transport.getOptionalContentConfig(t);
  }
  getPermissions() {
    return this._transport.getPermissions();
  }
  getMetadata() {
    return this._transport.getMetadata();
  }
  getMarkInfo() {
    return this._transport.getMarkInfo();
  }
  getData() {
    return this._transport.getData();
  }
  saveDocument() {
    return this._transport.saveDocument();
  }
  extractPages(e) {
    return this._transport.extractPages(e);
  }
  getDownloadInfo() {
    return this._transport.downloadInfoCapability.promise;
  }
  getRawData(e) {
    return this._transport.getRawData(e);
  }
  cleanup(e = !1) {
    return this._transport.startCleanup(e || this.isPureXfa);
  }
  destroy() {
    return this.loadingTask.destroy();
  }
  cachedPageNumber(e) {
    return this._transport.cachedPageNumber(e);
  }
  get loadingParams() {
    return this._transport.loadingParams;
  }
  get loadingTask() {
    return this._transport.loadingTask;
  }
  getFieldObjects() {
    return this._transport.getFieldObjects();
  }
  hasJSActions() {
    return this._transport.hasJSActions();
  }
  getCalculationOrderIds() {
    return this._transport.getCalculationOrderIds();
  }
}
var dn, Ta, Ca, Sh;
const Sg = class Sg {
  constructor(e, t, s, i, r = !1) {
    y(this, Ca);
    y(this, dn, !1);
    y(this, Ta, null);
    this._pageIndex = e, this._pageInfo = t, this._transport = s, this._stats = r ? new Dg() : null, this._pdfBug = r, this.commonObjs = s.commonObjs, this.objs = new yv(), this._intentStates = /* @__PURE__ */ new Map(), this.destroyed = !1, this.recordedBBoxes = null, g(this, Ta, i), this.imageCoordinates = null;
  }
  clone(e) {
    const t = new Sg(e, this._pageInfo, this._transport, n(this, Ta), this._pdfBug);
    return t.clonedFromIndex = this.clonedFromIndex ?? this._pageIndex, this._transport.updatePage(t), t;
  }
  get pageNumber() {
    return this._pageIndex + 1;
  }
  set pageNumber(e) {
    this._pageIndex = e - 1, this._transport.updatePage(this);
  }
  get rotate() {
    return this._pageInfo.rotate;
  }
  get ref() {
    return this._pageInfo.ref;
  }
  get userUnit() {
    return this._pageInfo.userUnit;
  }
  get view() {
    return this._pageInfo.view;
  }
  getViewport({
    scale: e,
    rotation: t = this.rotate,
    offsetX: s = 0,
    offsetY: i = 0,
    dontFlip: r = !1
  } = {}) {
    return new Rd({
      viewBox: this.view,
      userUnit: this.userUnit,
      scale: e,
      rotation: t,
      offsetX: s,
      offsetY: i,
      dontFlip: r
    });
  }
  getAnnotations({
    intent: e = "display"
  } = {}) {
    const {
      renderingIntent: t
    } = this._transport.getRenderingIntent(e);
    return this._transport.getAnnotations(this._pageIndex, t);
  }
  getJSActions() {
    return this._transport.getPageJSActions(this._pageIndex);
  }
  get filterFactory() {
    return this._transport.filterFactory;
  }
  get isPureXfa() {
    return nt(this, "isPureXfa", !!this._transport._htmlForXfa);
  }
  async getXfa() {
    return this._transport._htmlForXfa?.children[this._pageIndex] || null;
  }
  render({
    canvasContext: e,
    canvas: t = e.canvas,
    viewport: s,
    intent: i = "display",
    annotationMode: r = In.ENABLE,
    transform: a = null,
    background: o = null,
    optionalContentConfigPromise: l = null,
    annotationCanvasMap: h = null,
    pageColors: d = null,
    printAnnotationStorage: u = null,
    isEditing: f = !1,
    recordImages: p = !1,
    recordOperations: m = !1,
    operationsFilter: v = null
  }) {
    this._stats?.time("Overall");
    const A = this._transport.getRenderingIntent(i, r, u, f), {
      renderingIntent: b,
      cacheKey: E
    } = A;
    g(this, dn, !1), l || (l = this._transport.getOptionalContentConfig(b));
    const S = this._intentStates.getOrInsertComputed(E, Lf);
    S.streamReaderCancelTimeout && (clearTimeout(S.streamReaderCancelTimeout), S.streamReaderCancelTimeout = null);
    const T = !!(b & Ss.PRINT);
    S.displayReadyCapability || (S.displayReadyCapability = Promise.withResolvers(), S.operatorList = {
      fnArray: [],
      argsArray: [],
      lastChunk: !1,
      separateAnnots: null
    }, this._stats?.time("Page Request"), this._pumpOperatorList(A));
    const x = !!(this._pdfBug && globalThis.StepperManager?.enabled), C = !!t && !this.recordedBBoxes && (m || x), I = !!t && !this.imageCoordinates && p, M = (F) => {
      if (S.renderTasks.delete(D), C) {
        const N = D.gfx?.dependencyTracker.take();
        N && (D.stepper?.setOperatorBBoxes(N, D.gfx.dependencyTracker.takeDebugMetadata()), m && (this.recordedBBoxes = N));
      }
      I && !F && (this.imageCoordinates = D.gfx?.imagesTracker.take()), T && g(this, dn, !0), w(this, Ca, Sh).call(this), F ? (D.capability.reject(F), this._abortOperatorList({
        intentState: S,
        reason: F instanceof Error ? F : new Error(F)
      })) : D.capability.resolve(), this._stats && (this._stats.timeEnd("Rendering"), this._stats.timeEnd("Overall"), globalThis.Stats?.enabled && globalThis.Stats.add(this.pageNumber, this._stats));
    };
    let P = null, O = null;
    (C || I) && (O = new ib(t, S.operatorList.length)), C && (P = new nb(O, x));
    const D = new mp({
      callback: M,
      params: {
        canvas: t,
        canvasContext: e,
        dependencyTracker: P ?? O,
        imagesTracker: I ? new tp(t) : null,
        viewport: s,
        transform: a,
        background: o
      },
      objs: this.objs,
      commonObjs: this.commonObjs,
      annotationCanvasMap: h,
      operatorList: S.operatorList,
      pageIndex: this._pageIndex,
      canvasFactory: this._transport.canvasFactory,
      filterFactory: this._transport.filterFactory,
      useRequestAnimationFrame: !T,
      pdfBug: this._pdfBug,
      pageColors: d,
      enableHWA: this._transport.enableHWA,
      operationsFilter: v
    });
    (S.renderTasks || (S.renderTasks = /* @__PURE__ */ new Set())).add(D);
    const $ = D.task;
    return Promise.all([S.displayReadyCapability.promise, l]).then(([F, N]) => {
      if (this.destroyed) {
        M();
        return;
      }
      if (this._stats?.time("Rendering"), !(N.renderingIntent & b))
        throw new Error("Must use the same `intent`-argument when calling the `PDFPageProxy.render` and `PDFDocumentProxy.getOptionalContentConfig` methods.");
      D.initializeGraphics({
        transparency: F,
        optionalContentConfig: N
      }), D.operatorListChanged();
    }).catch(M), $;
  }
  getOperatorList({
    intent: e = "display",
    annotationMode: t = In.ENABLE,
    printAnnotationStorage: s = null,
    isEditing: i = !1
  } = {}) {
    function r() {
      o.operatorList.lastChunk && (o.opListReadCapability.resolve(o.operatorList), o.renderTasks.delete(l));
    }
    const a = this._transport.getRenderingIntent(e, t, s, i, !0), o = this._intentStates.getOrInsertComputed(a.cacheKey, Lf);
    let l;
    return o.opListReadCapability || (l = /* @__PURE__ */ Object.create(null), l.operatorListChanged = r, o.opListReadCapability = Promise.withResolvers(), (o.renderTasks || (o.renderTasks = /* @__PURE__ */ new Set())).add(l), o.operatorList = {
      fnArray: [],
      argsArray: [],
      lastChunk: !1,
      separateAnnots: null
    }, this._stats?.time("Page Request"), this._pumpOperatorList(a)), o.opListReadCapability.promise;
  }
  streamTextContent({
    includeMarkedContent: e = !1,
    disableNormalization: t = !1
  } = {}) {
    return this._transport.messageHandler.sendWithStream("GetTextContent", {
      pageId: n(this, Ta).getPageId(this._pageIndex + 1) - 1,
      pageIndex: this._pageIndex,
      includeMarkedContent: e === !0,
      disableNormalization: t === !0
    }, {
      highWaterMark: 100,
      size(i) {
        return i.items.length;
      }
    });
  }
  async getTextContent(e = {}) {
    if (this._transport._htmlForXfa)
      return this.getXfa().then((i) => Nh.textContent(i));
    const t = this.streamTextContent(e), s = {
      items: [],
      styles: /* @__PURE__ */ Object.create(null),
      lang: null
    };
    for await (const i of t)
      s.lang ?? (s.lang = i.lang), Object.assign(s.styles, i.styles), s.items.push(...i.items);
    return s;
  }
  getStructTree() {
    return this._transport.getStructTree(this._pageIndex);
  }
  _destroy() {
    this.destroyed = !0;
    const e = [];
    for (const t of this._intentStates.values())
      if (this._abortOperatorList({
        intentState: t,
        reason: new Error("Page was destroyed."),
        force: !0
      }), !t.opListReadCapability)
        for (const s of t.renderTasks)
          e.push(s.completed), s.cancel();
    return this.objs.clear(), g(this, dn, !1), Promise.all(e);
  }
  cleanup(e = !1) {
    g(this, dn, !0);
    const t = w(this, Ca, Sh).call(this);
    return e && t && this._stats && (this._stats = new Dg()), t;
  }
  _startRenderPage(e, t) {
    const s = this._intentStates.get(t);
    s && (this._stats?.timeEnd("Page Request"), s.displayReadyCapability?.resolve(e));
  }
  _renderPageChunk(e, t) {
    for (let s = 0, i = e.length; s < i; s++)
      t.operatorList.fnArray.push(e.fnArray[s]), t.operatorList.argsArray.push(e.argsArray[s]);
    t.operatorList.lastChunk = e.lastChunk, t.operatorList.separateAnnots = e.separateAnnots;
    for (const s of t.renderTasks)
      s.operatorListChanged();
    e.lastChunk && w(this, Ca, Sh).call(this);
  }
  _pumpOperatorList({
    renderingIntent: e,
    cacheKey: t,
    annotationStorageSerializable: s,
    modifiedIds: i
  }) {
    const {
      map: r,
      transfer: a
    } = s, l = this._transport.messageHandler.sendWithStream("GetOperatorList", {
      pageId: n(this, Ta).getPageId(this._pageIndex + 1) - 1,
      pageIndex: this._pageIndex,
      intent: e,
      cacheKey: t,
      annotationStorage: r,
      modifiedIds: i
    }, void 0, a).getReader(), h = this._intentStates.get(t);
    h.streamReader = l;
    const d = () => {
      l.read().then(({
        value: u,
        done: f
      }) => {
        if (f) {
          h.streamReader = null;
          return;
        }
        this._transport.destroyed || (this._renderPageChunk(u, h), d());
      }, (u) => {
        if (h.streamReader = null, !this._transport.destroyed) {
          if (h.operatorList) {
            h.operatorList.lastChunk = !0;
            for (const f of h.renderTasks)
              f.operatorListChanged();
            w(this, Ca, Sh).call(this);
          }
          if (h.displayReadyCapability)
            h.displayReadyCapability.reject(u);
          else if (h.opListReadCapability)
            h.opListReadCapability.reject(u);
          else
            throw u;
        }
      });
    };
    d();
  }
  _abortOperatorList({
    intentState: e,
    reason: t,
    force: s = !1
  }) {
    if (e.streamReader) {
      if (e.streamReaderCancelTimeout && (clearTimeout(e.streamReaderCancelTimeout), e.streamReaderCancelTimeout = null), !s) {
        if (e.renderTasks.size > 0)
          return;
        if (t instanceof hg) {
          let i = rA;
          t.extraDelay > 0 && t.extraDelay < 1e3 && (i += t.extraDelay), e.streamReaderCancelTimeout = setTimeout(() => {
            e.streamReaderCancelTimeout = null, this._abortOperatorList({
              intentState: e,
              reason: t,
              force: !0
            });
          }, i);
          return;
        }
      }
      if (e.streamReader.cancel(new Dr(t.message)).catch(() => {
      }), e.streamReader = null, !this._transport.destroyed) {
        for (const [i, r] of this._intentStates)
          if (r === e) {
            this._intentStates.delete(i);
            break;
          }
        this.cleanup();
      }
    }
  }
  get stats() {
    return this._stats;
  }
};
dn = new WeakMap(), Ta = new WeakMap(), Ca = new WeakSet(), Sh = function() {
  if (!n(this, dn) || this.destroyed)
    return !1;
  for (const {
    renderTasks: e,
    operatorList: t
  } of this._intentStates.values())
    if (e.size > 0 || !t.lastChunk)
      return !1;
  return this._intentStates.clear(), this.objs.clear(), g(this, dn, !1), !0;
};
let gp = Sg;
var cr, ti, un, Ia, Qu, Pa, Ra, Xe, iu, xv, Tv, xh, wl, nu;
const Wt = class Wt {
  constructor({
    name: e = null,
    port: t = null,
    verbosity: s = Ly()
  } = {}) {
    y(this, Xe);
    y(this, cr, Promise.withResolvers());
    y(this, ti, null);
    y(this, un, null);
    y(this, Ia, null);
    if (this.name = e, this.destroyed = !1, this.verbosity = s, t) {
      if (n(Wt, Ra).has(t))
        throw new Error("Cannot use more than one PDFWorker per port.");
      n(Wt, Ra).set(t, this), w(this, Xe, xv).call(this, t);
    } else
      w(this, Xe, Tv).call(this);
  }
  get promise() {
    return n(this, cr).promise;
  }
  get port() {
    return n(this, un);
  }
  get messageHandler() {
    return n(this, ti);
  }
  destroy() {
    this.destroyed = !0, n(this, Ia)?.terminate(), g(this, Ia, null), n(Wt, Ra).delete(n(this, un)), g(this, un, null), n(this, ti)?.destroy(), g(this, ti, null);
  }
  static create(e) {
    const t = n(this, Ra).get(e?.port);
    if (t) {
      if (t._pendingDestroy)
        throw new Error("PDFWorker.create - the worker is being destroyed.\nPlease remember to await `PDFDocumentLoadingTask.destroy()`-calls.");
      return t;
    }
    return new Wt(e);
  }
  static get workerSrc() {
    if (li.workerSrc)
      return li.workerSrc;
    throw new Error('No "GlobalWorkerOptions.workerSrc" specified.');
  }
  static get _setupFakeWorkerGlobal() {
    return nt(this, "_setupFakeWorkerGlobal", (async () => n(this, wl, nu) ? n(this, wl, nu) : (await import(
      /*webpackIgnore: true*/
      /*@vite-ignore*/
      this.workerSrc
    )).WorkerMessageHandler)());
  }
};
cr = new WeakMap(), ti = new WeakMap(), un = new WeakMap(), Ia = new WeakMap(), Qu = new WeakMap(), Pa = new WeakMap(), Ra = new WeakMap(), Xe = new WeakSet(), iu = function() {
  n(this, cr).resolve(), n(this, ti).send("configure", {
    verbosity: this.verbosity
  });
}, xv = function(e) {
  g(this, un, e), g(this, ti, new mh("main", "worker", e)), n(this, ti).on("ready", () => {
  }), w(this, Xe, iu).call(this);
}, Tv = function() {
  if (n(Wt, Pa) || n(Wt, wl, nu)) {
    w(this, Xe, xh).call(this);
    return;
  }
  let {
    workerSrc: e
  } = Wt;
  try {
    Wt._isSameOrigin(window.location, e) || (e = Wt._createCDNWrapper(new URL(e, window.location).href));
    const t = new Worker(e, {
      type: "module"
    }), s = new mh("main", "worker", t), i = () => {
      r.abort(), s.destroy(), t.terminate(), this.destroyed ? n(this, cr).reject(new Error("Worker was destroyed")) : w(this, Xe, xh).call(this);
    }, r = new AbortController();
    t.addEventListener("error", () => {
      n(this, Ia) || i();
    }, {
      signal: r.signal
    }), s.on("test", (o) => {
      if (r.abort(), this.destroyed || !o) {
        i();
        return;
      }
      g(this, ti, s), g(this, un, t), g(this, Ia, t), w(this, Xe, iu).call(this);
    }), s.on("ready", (o) => {
      if (r.abort(), this.destroyed) {
        i();
        return;
      }
      try {
        a();
      } catch {
        w(this, Xe, xh).call(this);
      }
    });
    const a = () => {
      const o = new Uint8Array();
      s.send("test", o, [o.buffer]);
    };
    a();
    return;
  } catch {
    hf("The worker has been disabled.");
  }
  w(this, Xe, xh).call(this);
}, xh = function() {
  n(Wt, Pa) || (Z("Setting up fake worker."), g(Wt, Pa, !0)), Wt._setupFakeWorkerGlobal.then((e) => {
    if (this.destroyed) {
      n(this, cr).reject(new Error("Worker was destroyed"));
      return;
    }
    const t = new mb();
    g(this, un, t);
    const s = `fake${ee(Wt, Qu)._++}`, i = new mh(s + "_worker", s, t);
    e.setup(i, t), g(this, ti, new mh(s, s + "_worker", t)), w(this, Xe, iu).call(this);
  }).catch((e) => {
    n(this, cr).reject(new Error(`Setting up fake worker failed: "${e.message}".`));
  });
}, wl = new WeakSet(), nu = function() {
  try {
    return globalThis.pdfjsWorker?.WorkerMessageHandler || null;
  } catch {
    return null;
  }
}, y(Wt, wl), y(Wt, Qu, 0), y(Wt, Pa, !1), y(Wt, Ra, /* @__PURE__ */ new WeakMap()), xs && (g(Wt, Pa, !0), li.workerSrc || (li.workerSrc = "./pdf.worker.mjs")), Wt._isSameOrigin = (e, t) => {
  const s = URL.parse(e);
  if (!s?.origin || s.origin === "null")
    return !1;
  const i = new URL(t, s);
  return s.origin === i.origin;
}, Wt._createCDNWrapper = (e) => {
  const t = `await import("${e}");`;
  return URL.createObjectURL(new Blob([t], {
    type: "text/javascript"
  }));
};
let sh = Wt;
var hs, Da, fn, ei, Ma, El, pn, ci, Th, ru;
class oA {
  constructor(e, t, s, i, r, a) {
    y(this, ci);
    R(this, "downloadInfoCapability", Promise.withResolvers());
    y(this, hs, null);
    y(this, Da, /* @__PURE__ */ new Map());
    y(this, fn, null);
    y(this, ei, /* @__PURE__ */ new Map());
    y(this, Ma, /* @__PURE__ */ new Map());
    y(this, El, /* @__PURE__ */ new Map());
    y(this, pn, null);
    this.messageHandler = e, this.loadingTask = t, g(this, fn, s), this.commonObjs = new yv(), this.fontLoader = new rb({
      ownerDocument: i.ownerDocument,
      styleElement: i.styleElement
    }), this.enableHWA = i.enableHWA, this.loadingParams = i.loadingParams, this._params = i, this.canvasFactory = r.canvasFactory, this.filterFactory = r.filterFactory, this.binaryDataFactory = r.binaryDataFactory, this.pagesMapper = a, this.destroyed = !1, this.destroyCapability = null, this.setupMessageHandler();
  }
  updatePage(e) {
    const {
      _pageIndex: t
    } = e;
    n(this, ei).set(t, e), n(this, Ma).set(t, Promise.resolve(e));
  }
  get annotationStorage() {
    return nt(this, "annotationStorage", new dg());
  }
  getRenderingIntent(e, t = In.ENABLE, s = null, i = !1, r = !1) {
    let a = Ss.DISPLAY, o = Bh;
    switch (e) {
      case "any":
        a = Ss.ANY;
        break;
      case "display":
        break;
      case "print":
        a = Ss.PRINT;
        break;
      default:
        Z(`getRenderingIntent - invalid intent: ${e}`);
    }
    const l = a & Ss.PRINT && s instanceof Vm ? s : this.annotationStorage;
    switch (t) {
      case In.DISABLE:
        a += Ss.ANNOTATIONS_DISABLE;
        break;
      case In.ENABLE:
        break;
      case In.ENABLE_FORMS:
        a += Ss.ANNOTATIONS_FORMS;
        break;
      case In.ENABLE_STORAGE:
        a += Ss.ANNOTATIONS_STORAGE, o = l.serializable;
        break;
      default:
        Z(`getRenderingIntent - invalid annotationMode: ${t}`);
    }
    i && (a += Ss.IS_EDITING), r && (a += Ss.OPLIST);
    const {
      ids: h,
      hash: d
    } = l.modifiedIds, u = [a, o.hash, d];
    return {
      renderingIntent: a,
      cacheKey: u.join("_"),
      annotationStorageSerializable: o,
      modifiedIds: h
    };
  }
  destroy() {
    if (this.destroyCapability)
      return this.destroyCapability.promise;
    this.destroyed = !0, this.destroyCapability = Promise.withResolvers(), n(this, pn)?.reject(new Error("Worker was destroyed during onPassword callback"));
    const e = [];
    for (const s of n(this, ei).values())
      e.push(s._destroy());
    n(this, ei).clear(), n(this, Ma).clear(), n(this, El).clear(), this.hasOwnProperty("annotationStorage") && this.annotationStorage.resetModified();
    const t = this.messageHandler.sendWithPromise("Terminate", null);
    return e.push(t), Promise.all(e).then(() => {
      this.commonObjs.clear(), this.fontLoader.clear(), n(this, Da).clear(), this.filterFactory.destroy(), Uh.cleanup(), n(this, fn)?.cancelAllRequests(new Dr("Worker was terminated.")), this.messageHandler?.destroy(), this.messageHandler = null, this.destroyCapability.resolve();
    }, this.destroyCapability.reject), this.destroyCapability.promise;
  }
  setupMessageHandler() {
    const {
      messageHandler: e,
      loadingTask: t
    } = this;
    e.on("GetReader", (s, i) => {
      Gt(n(this, fn), "GetReader - no `BasePDFStream` instance available."), g(this, hs, n(this, fn).getFullReader()), n(this, hs).onProgress = (r) => w(this, ci, ru).call(this, r), i.onPull = () => {
        n(this, hs).read().then(function({
          value: r,
          done: a
        }) {
          if (a) {
            i.close();
            return;
          }
          Gt(r instanceof ArrayBuffer, "GetReader - expected an ArrayBuffer."), i.enqueue(new Uint8Array(r), 1, [r]);
        }).catch((r) => {
          i.error(r);
        });
      }, i.onCancel = (r) => {
        n(this, hs).cancel(r), i.ready.catch((a) => {
          if (!this.destroyed)
            throw a;
        });
      };
    }), e.on("ReaderHeadersReady", async (s) => {
      await n(this, hs).headersReady;
      const {
        isStreamingSupported: i,
        isRangeSupported: r,
        contentLength: a
      } = n(this, hs);
      return i && r && (n(this, hs).onProgress = null), {
        isStreamingSupported: i,
        isRangeSupported: r,
        contentLength: a
      };
    }), e.on("GetRangeReader", (s, i) => {
      Gt(n(this, fn), "GetRangeReader - no `BasePDFStream` instance available.");
      const r = n(this, fn).getRangeReader(s.begin, s.end);
      if (!r) {
        i.close();
        return;
      }
      i.onPull = () => {
        r.read().then(function({
          value: a,
          done: o
        }) {
          if (o) {
            i.close();
            return;
          }
          Gt(a instanceof ArrayBuffer, "GetRangeReader - expected an ArrayBuffer."), i.enqueue(new Uint8Array(a), 1, [a]);
        }).catch((a) => {
          i.error(a);
        });
      }, i.onCancel = (a) => {
        r.cancel(a), i.ready.catch((o) => {
          if (!this.destroyed)
            throw o;
        });
      };
    }), e.on("GetDoc", ({
      pdfInfo: s
    }) => {
      this.pagesMapper.pagesNumber = s.numPages, this._numPages = s.numPages, this._htmlForXfa = s.htmlForXfa, delete s.htmlForXfa, t._capability.resolve(new aA(s, this));
    }), e.on("DocException", (s) => {
      t._capability.reject(Ke(s));
    }), e.on("PasswordRequest", (s) => {
      g(this, pn, Promise.withResolvers());
      try {
        if (!t.onPassword)
          throw Ke(s);
        const i = (r) => {
          r instanceof Error ? n(this, pn).reject(r) : n(this, pn).resolve({
            password: r
          });
        };
        t.onPassword(i, s.code);
      } catch (i) {
        n(this, pn).reject(i);
      }
      return n(this, pn).promise;
    }), e.on("DataLoaded", (s) => {
      w(this, ci, ru).call(this, {
        loaded: s.length,
        total: s.length
      }), this.downloadInfoCapability.resolve(s);
    }), e.on("StartRenderPage", (s) => {
      if (this.destroyed)
        return;
      n(this, ei).get(s.pageIndex)._startRenderPage(s.transparency, s.cacheKey);
    }), e.on("commonobj", ([s, i, r]) => {
      if (this.destroyed || this.commonObjs.has(s))
        return null;
      switch (i) {
        case "Font":
          if ("error" in r) {
            const u = r.error;
            Z(`Error during font loading: ${u}`), this.commonObjs.resolve(s, u);
            break;
          }
          const a = new hb(r), o = this._params.pdfBug && globalThis.FontInspector?.enabled ? (u, f) => globalThis.FontInspector.fontAdded(u, f) : null, l = new ab(a, o, r.charProcOperatorList, r.extra);
          this.fontLoader.bind(l).catch(() => e.sendWithPromise("FontFallback", {
            id: s
          })).finally(() => {
            l.fontExtraProperties || l.clearData(), this.commonObjs.resolve(s, l);
          });
          break;
        case "CopyLocalImage":
          const {
            imageRef: h
          } = r;
          Gt(h, "The imageRef must be defined.");
          for (const u of n(this, ei).values())
            for (const [, f] of u.objs)
              if (f?.ref === h)
                return f.dataLen ? (this.commonObjs.resolve(s, structuredClone(f)), f.dataLen) : null;
          break;
        case "FontPath":
          this.commonObjs.resolve(s, new db(r));
          break;
        case "Image":
          this.commonObjs.resolve(s, r);
          break;
        case "Pattern":
          const d = new cb(r);
          this.commonObjs.resolve(s, d.getIR());
          break;
        default:
          throw new Error(`Got unknown common object type ${i}`);
      }
      return null;
    }), e.on("obj", ([s, i, r, a]) => {
      if (this.destroyed)
        return;
      const o = n(this, ei).get(i);
      if (!o.objs.has(s)) {
        if (o._intentStates.size === 0) {
          a?.bitmap?.close();
          return;
        }
        switch (r) {
          case "Image":
          case "Pattern":
            o.objs.resolve(s, a);
            break;
          default:
            throw new Error(`Got unknown object type ${r}`);
        }
      }
    }), e.on("DocProgress", (s) => {
      this.destroyed || w(this, ci, ru).call(this, s);
    }), e.on("PrepareWebGPU", () => {
      this.destroyed || Tb();
    }), e.on("FetchBinaryData", async (s) => {
      if (this.destroyed)
        throw new Error("Worker was destroyed.");
      if (!this.binaryDataFactory)
        throw new Error("`BinaryDataFactory` not initialized, see the `useWorkerFetch` parameter.");
      return this.binaryDataFactory.fetch(s);
    });
  }
  getData() {
    return this.messageHandler.sendWithPromise("GetData", null);
  }
  saveDocument() {
    this.annotationStorage.size <= 0 && Z("saveDocument called while `annotationStorage` is empty, please use the getData-method instead.");
    const {
      map: e,
      transfer: t
    } = this.annotationStorage.serializable;
    return this.messageHandler.sendWithPromise("SaveDocument", {
      isPureXfa: !!this._htmlForXfa,
      numPages: this._numPages,
      annotationStorage: e,
      filename: n(this, hs)?.filename ?? null
    }, t).finally(() => {
      this.annotationStorage.resetModified();
    });
  }
  extractPages(e) {
    const t = {
      pageInfos: e
    };
    let s;
    if (this.annotationStorage.size > 0) {
      const {
        map: i,
        transfer: r
      } = this.annotationStorage.serializable;
      t.annotationStorage = i, s = r;
    }
    return this.messageHandler.sendWithPromise("ExtractPages", t, s).finally(() => {
      this.annotationStorage.resetModified();
    });
  }
  getPage(e) {
    if (!Number.isInteger(e) || e <= 0 || e > this.pagesMapper.pagesNumber)
      return Promise.reject(new Error("Invalid page request."));
    const t = e - 1, s = this.pagesMapper.getPageId(e) - 1, i = n(this, Ma).get(t);
    if (i)
      return i;
    const r = this.messageHandler.sendWithPromise("GetPage", {
      pageIndex: s
    }).then((a) => {
      if (this.destroyed)
        throw new Error("Transport destroyed");
      a.refStr && n(this, El).set(a.refStr, s);
      const o = new gp(t, a, this, this.pagesMapper, this._params.pdfBug);
      return n(this, ei).set(t, o), o;
    });
    return n(this, Ma).set(t, r), r;
  }
  async getPageIndex(e) {
    if (!sp(e))
      throw new Error("Invalid pageIndex request.");
    const t = await this.messageHandler.sendWithPromise("GetPageIndex", {
      num: e.num,
      gen: e.gen
    }), s = this.pagesMapper.getPageNumber(t + 1);
    if (s === 0)
      throw new Error("GetPageIndex: page has been removed.");
    return s - 1;
  }
  getAnnotations(e, t) {
    return this.messageHandler.sendWithPromise("GetAnnotations", {
      pageIndex: this.pagesMapper.getPageId(e + 1) - 1,
      intent: t
    });
  }
  getFieldObjects() {
    return w(this, ci, Th).call(this, "GetFieldObjects");
  }
  hasJSActions() {
    return w(this, ci, Th).call(this, "HasJSActions");
  }
  getCalculationOrderIds() {
    return this.messageHandler.sendWithPromise("GetCalculationOrderIds", null);
  }
  getDestinations() {
    return this.messageHandler.sendWithPromise("GetDestinations", null);
  }
  getDestination(e) {
    return typeof e != "string" ? Promise.reject(new Error("Invalid destination request.")) : this.messageHandler.sendWithPromise("GetDestination", {
      id: e
    });
  }
  getPageLabels() {
    return this.messageHandler.sendWithPromise("GetPageLabels", null);
  }
  getPageLayout() {
    return this.messageHandler.sendWithPromise("GetPageLayout", null);
  }
  getPageMode() {
    return this.messageHandler.sendWithPromise("GetPageMode", null);
  }
  getViewerPreferences() {
    return this.messageHandler.sendWithPromise("GetViewerPreferences", null);
  }
  getOpenAction() {
    return this.messageHandler.sendWithPromise("GetOpenAction", null);
  }
  getAttachments() {
    return this.messageHandler.sendWithPromise("GetAttachments", null);
  }
  getAnnotationsByType(e, t) {
    return this.messageHandler.sendWithPromise("GetAnnotationsByType", {
      types: e,
      pageIndexesToSkip: t
    });
  }
  getDocJSActions() {
    return w(this, ci, Th).call(this, "GetDocJSActions");
  }
  getPageJSActions(e) {
    return this.messageHandler.sendWithPromise("GetPageJSActions", {
      pageIndex: this.pagesMapper.getPageId(e + 1) - 1
    });
  }
  getStructTree(e) {
    return this.messageHandler.sendWithPromise("GetStructTree", {
      pageIndex: this.pagesMapper.getPageId(e + 1) - 1
    });
  }
  getOutline() {
    return this.messageHandler.sendWithPromise("GetOutline", null);
  }
  getOptionalContentConfig(e) {
    return w(this, ci, Th).call(this, "GetOptionalContentConfig").then((t) => new sA(t, e));
  }
  getPermissions() {
    return this.messageHandler.sendWithPromise("GetPermissions", null);
  }
  getMetadata() {
    const e = "GetMetadata";
    return n(this, Da).getOrInsertComputed(e, () => this.messageHandler.sendWithPromise(e, null).then((t) => ({
      info: t[0],
      metadata: t[1] ? new tA(t[1]) : null,
      contentDispositionFilename: n(this, hs)?.filename ?? null,
      contentLength: n(this, hs)?.contentLength ?? null,
      hasStructTree: t[2]
    })));
  }
  getMarkInfo() {
    return this.messageHandler.sendWithPromise("GetMarkInfo", null);
  }
  getRawData(e) {
    return this.messageHandler.sendWithPromise("GetRawData", e);
  }
  async startCleanup(e = !1) {
    if (!this.destroyed) {
      await this.messageHandler.sendWithPromise("Cleanup", null);
      for (const t of n(this, ei).values())
        if (!t.cleanup())
          throw new Error(`startCleanup: Page ${t.pageNumber} is currently rendering.`);
      this.commonObjs.clear(), e || this.fontLoader.clear(), n(this, Da).clear(), this.filterFactory.destroy(!0), Uh.cleanup();
    }
  }
  cachedPageNumber(e) {
    if (!sp(e))
      return null;
    const t = e.gen === 0 ? `${e.num}R` : `${e.num}R${e.gen}`, s = n(this, El).get(t);
    if (s >= 0) {
      const i = this.pagesMapper.getPageNumber(s + 1);
      if (i !== 0)
        return i;
    }
    return null;
  }
}
hs = new WeakMap(), Da = new WeakMap(), fn = new WeakMap(), ei = new WeakMap(), Ma = new WeakMap(), El = new WeakMap(), pn = new WeakMap(), ci = new WeakSet(), Th = function(e, t = null) {
  return n(this, Da).getOrInsertComputed(e, () => this.messageHandler.sendWithPromise(e, t));
}, ru = function({
  loaded: e,
  total: t
}) {
  this.loadingTask.onProgress?.({
    loaded: e,
    total: t,
    percent: t ? Ae(Math.round(e / t * 100), 0, 100) : NaN
  });
};
class lA {
  constructor(e) {
    R(this, "_internalRenderTask", null);
    R(this, "onContinue", null);
    R(this, "onError", null);
    this._internalRenderTask = e;
  }
  get promise() {
    return this._internalRenderTask.capability.promise;
  }
  cancel(e = 0) {
    this._internalRenderTask.cancel(null, e);
  }
  get separateAnnots() {
    const {
      separateAnnots: e
    } = this._internalRenderTask.operatorList;
    if (!e)
      return !1;
    const {
      annotationCanvasMap: t
    } = this._internalRenderTask;
    return e.form || e.canvas && t?.size > 0;
  }
  get imageCoordinates() {
    return this._internalRenderTask.imageCoordinates || null;
  }
}
var dr, Oa;
const Ur = class Ur {
  constructor({
    callback: e,
    params: t,
    objs: s,
    commonObjs: i,
    annotationCanvasMap: r,
    operatorList: a,
    pageIndex: o,
    canvasFactory: l,
    filterFactory: h,
    useRequestAnimationFrame: d = !1,
    pdfBug: u = !1,
    pageColors: f = null,
    enableHWA: p = !1,
    operationsFilter: m = null
  }) {
    y(this, dr, null);
    this.callback = e, this.params = t, this.objs = s, this.commonObjs = i, this.annotationCanvasMap = r, this.operatorListIdx = null, this.operatorList = a, this._pageIndex = o, this.canvasFactory = l, this.filterFactory = h, this._pdfBug = u, this.pageColors = f, this.running = !1, this.graphicsReadyCallback = null, this.graphicsReady = !1, this._useRequestAnimationFrame = d === !0 && typeof window < "u", this.cancelled = !1, this.capability = Promise.withResolvers(), this.task = new lA(this), this._cancelBound = this.cancel.bind(this), this._continueBound = this._continue.bind(this), this._scheduleNextBound = this._scheduleNext.bind(this), this._nextBound = this._next.bind(this), this._canvas = t.canvas, this._canvasContext = t.canvas ? null : t.canvasContext, this._enableHWA = p, this._dependencyTracker = t.dependencyTracker, this._imagesTracker = t.imagesTracker, this._operationsFilter = m;
  }
  get completed() {
    return this.capability.promise.catch(function() {
    });
  }
  initializeGraphics({
    transparency: e = !1,
    optionalContentConfig: t
  }) {
    if (this.cancelled)
      return;
    if (this._canvas) {
      if (n(Ur, Oa).has(this._canvas))
        throw new Error("Cannot use the same canvas during multiple render() operations. Use different canvas or ensure previous operations were cancelled or completed.");
      n(Ur, Oa).add(this._canvas);
    }
    this._pdfBug && globalThis.StepperManager?.enabled && (this.stepper = globalThis.StepperManager.create(this._pageIndex), this.stepper.init(this.operatorList), this.stepper.nextBreakPoint = this.stepper.getNextBreakPoint());
    const {
      viewport: s,
      transform: i,
      background: r,
      dependencyTracker: a,
      imagesTracker: o
    } = this.params, l = this._canvasContext || this._canvas.getContext("2d", {
      alpha: !1,
      willReadFrequently: !this._enableHWA
    });
    this.gfx = new Io(l, this.commonObjs, this.objs, this.canvasFactory, this.filterFactory, {
      optionalContentConfig: t
    }, this.annotationCanvasMap, this.pageColors, a, o), this.gfx.beginDrawing({
      transform: i,
      viewport: s,
      transparency: e,
      background: r
    }), this.operatorListIdx = 0, this.graphicsReady = !0, this.graphicsReadyCallback?.();
  }
  cancel(e = null, t = 0) {
    this.running = !1, this.cancelled = !0, this.gfx?.endDrawing(), n(this, dr) && (window.cancelAnimationFrame(n(this, dr)), g(this, dr, null)), n(Ur, Oa).delete(this._canvas), e || (e = new hg(`Rendering cancelled, page ${this._pageIndex + 1}`, t)), this.callback(e), this.task.onError?.(e);
  }
  operatorListChanged() {
    if (!this.graphicsReady) {
      this.graphicsReadyCallback || (this.graphicsReadyCallback = this._continueBound);
      return;
    }
    this.gfx.dependencyTracker?.growOperationsCount(this.operatorList.fnArray.length), this.stepper?.updateOperatorList(this.operatorList), !this.running && this._continue();
  }
  _continue() {
    this.running = !0, !this.cancelled && (this.task.onContinue ? this.task.onContinue(this._scheduleNextBound) : this._scheduleNext());
  }
  _scheduleNext() {
    this._useRequestAnimationFrame ? g(this, dr, window.requestAnimationFrame(() => {
      g(this, dr, null), this._nextBound().catch(this._cancelBound);
    })) : Promise.resolve().then(this._nextBound).catch(this._cancelBound);
  }
  async _next() {
    this.cancelled || (this.operatorListIdx = this.gfx.executeOperatorList(this.operatorList, this.operatorListIdx, this._continueBound, this.stepper, this._operationsFilter), this.operatorListIdx === this.operatorList.argsArray.length && (this.running = !1, this.operatorList.lastChunk && (this.gfx.endDrawing(), n(Ur, Oa).delete(this._canvas), this.callback())));
  }
};
dr = new WeakMap(), Oa = new WeakMap(), y(Ur, Oa, /* @__PURE__ */ new WeakSet());
let mp = Ur;
const hA = "5.6.205", cA = "ada343803";
var cs, La, Sl, he, Wc, xl, gn, Vc, ur, si, zc, Dt, vp, yp, bp, Fr, Cv, kn;
const Je = class Je {
  constructor({
    editor: e = null,
    uiManager: t = null
  }) {
    y(this, Dt);
    y(this, cs, null);
    y(this, La, null);
    y(this, Sl);
    y(this, he, null);
    y(this, Wc, !1);
    y(this, xl, !1);
    y(this, gn, null);
    y(this, Vc);
    y(this, ur, null);
    y(this, si, null);
    e ? (g(this, xl, !1), g(this, gn, e)) : g(this, xl, !0), g(this, si, e?._uiManager || t), g(this, Vc, n(this, si)._eventBus), g(this, Sl, e?.color?.toUpperCase() || n(this, si)?.highlightColors.values().next().value || "#FFFF98"), n(Je, zc) || g(Je, zc, Object.freeze({
      blue: "pdfjs-editor-colorpicker-blue",
      green: "pdfjs-editor-colorpicker-green",
      pink: "pdfjs-editor-colorpicker-pink",
      red: "pdfjs-editor-colorpicker-red",
      yellow: "pdfjs-editor-colorpicker-yellow"
    }));
  }
  static get _keyboardManager() {
    return nt(this, "_keyboardManager", new Md([[["Escape", "mac+Escape"], Je.prototype._hideDropdownFromKeyboard], [[" ", "mac+ "], Je.prototype._colorSelectFromKeyboard], [["ArrowDown", "ArrowRight", "mac+ArrowDown", "mac+ArrowRight"], Je.prototype._moveToNext], [["ArrowUp", "ArrowLeft", "mac+ArrowUp", "mac+ArrowLeft"], Je.prototype._moveToPrevious], [["Home", "mac+Home"], Je.prototype._moveToBeginning], [["End", "mac+End"], Je.prototype._moveToEnd]]));
  }
  renderButton() {
    const e = g(this, cs, document.createElement("button"));
    e.className = "colorPicker", e.tabIndex = "0", e.setAttribute("data-l10n-id", "pdfjs-editor-colorpicker-button"), e.ariaHasPopup = "true", n(this, gn) && (e.ariaControls = `${n(this, gn).id}_colorpicker_dropdown`);
    const t = n(this, si)._signal;
    e.addEventListener("click", w(this, Dt, Fr).bind(this), {
      signal: t
    }), e.addEventListener("keydown", w(this, Dt, bp).bind(this), {
      signal: t
    });
    const s = g(this, La, document.createElement("span"));
    return s.className = "swatch", s.ariaHidden = "true", s.style.backgroundColor = n(this, Sl), e.append(s), e;
  }
  renderMainDropdown() {
    const e = g(this, he, w(this, Dt, vp).call(this));
    return e.ariaOrientation = "horizontal", e.ariaLabelledBy = "highlightColorPickerLabel", e;
  }
  _colorSelectFromKeyboard(e) {
    if (e.target === n(this, cs)) {
      w(this, Dt, Fr).call(this, e);
      return;
    }
    const t = e.target.getAttribute("data-color");
    t && w(this, Dt, yp).call(this, t, e);
  }
  _moveToNext(e) {
    if (!n(this, Dt, kn)) {
      w(this, Dt, Fr).call(this, e);
      return;
    }
    if (e.target === n(this, cs)) {
      n(this, he).firstElementChild?.focus();
      return;
    }
    e.target.nextSibling?.focus();
  }
  _moveToPrevious(e) {
    if (e.target === n(this, he)?.firstElementChild || e.target === n(this, cs)) {
      n(this, Dt, kn) && this._hideDropdownFromKeyboard();
      return;
    }
    n(this, Dt, kn) || w(this, Dt, Fr).call(this, e), e.target.previousSibling?.focus();
  }
  _moveToBeginning(e) {
    if (!n(this, Dt, kn)) {
      w(this, Dt, Fr).call(this, e);
      return;
    }
    n(this, he).firstElementChild?.focus();
  }
  _moveToEnd(e) {
    if (!n(this, Dt, kn)) {
      w(this, Dt, Fr).call(this, e);
      return;
    }
    n(this, he).lastElementChild?.focus();
  }
  hideDropdown() {
    n(this, he)?.classList.add("hidden"), n(this, cs).ariaExpanded = "false", n(this, ur)?.abort(), g(this, ur, null);
  }
  _hideDropdownFromKeyboard() {
    if (!n(this, xl)) {
      if (!n(this, Dt, kn)) {
        n(this, gn)?.unselect();
        return;
      }
      this.hideDropdown(), n(this, cs).focus({
        preventScroll: !0,
        focusVisible: n(this, Wc)
      });
    }
  }
  updateColor(e) {
    if (n(this, La) && (n(this, La).style.backgroundColor = e), !n(this, he))
      return;
    const t = n(this, si).highlightColors.values();
    for (const s of n(this, he).children)
      s.ariaSelected = t.next().value === e.toUpperCase();
  }
  destroy() {
    n(this, cs)?.remove(), g(this, cs, null), g(this, La, null), n(this, he)?.remove(), g(this, he, null);
  }
};
cs = new WeakMap(), La = new WeakMap(), Sl = new WeakMap(), he = new WeakMap(), Wc = new WeakMap(), xl = new WeakMap(), gn = new WeakMap(), Vc = new WeakMap(), ur = new WeakMap(), si = new WeakMap(), zc = new WeakMap(), Dt = new WeakSet(), vp = function() {
  const e = document.createElement("div"), t = n(this, si)._signal;
  e.addEventListener("contextmenu", Vs, {
    signal: t
  }), e.className = "dropdown", e.role = "listbox", e.ariaMultiSelectable = "false", e.ariaOrientation = "vertical", e.setAttribute("data-l10n-id", "pdfjs-editor-colorpicker-dropdown"), n(this, gn) && (e.id = `${n(this, gn).id}_colorpicker_dropdown`);
  for (const [s, i] of n(this, si).highlightColors) {
    const r = document.createElement("button");
    r.tabIndex = "0", r.role = "option", r.setAttribute("data-color", i), r.title = s, r.setAttribute("data-l10n-id", n(Je, zc)[s]);
    const a = document.createElement("span");
    r.append(a), a.className = "swatch", a.style.backgroundColor = i, r.ariaSelected = i === n(this, Sl), r.addEventListener("click", w(this, Dt, yp).bind(this, i), {
      signal: t
    }), e.append(r);
  }
  return e.addEventListener("keydown", w(this, Dt, bp).bind(this), {
    signal: t
  }), e;
}, yp = function(e, t) {
  t.stopPropagation(), n(this, Vc).dispatch("switchannotationeditorparams", {
    source: this,
    type: ut.HIGHLIGHT_COLOR,
    value: e
  }), this.updateColor(e);
}, bp = function(e) {
  Je._keyboardManager.exec(this, e);
}, Fr = function(e) {
  if (n(this, Dt, kn)) {
    this.hideDropdown();
    return;
  }
  if (g(this, Wc, e.detail === 0), n(this, ur) || (g(this, ur, new AbortController()), window.addEventListener("pointerdown", w(this, Dt, Cv).bind(this), {
    signal: n(this, si).combinedSignal(n(this, ur))
  })), n(this, cs).ariaExpanded = "true", n(this, he)) {
    n(this, he).classList.remove("hidden");
    return;
  }
  const t = g(this, he, w(this, Dt, vp).call(this));
  n(this, cs).append(t);
}, Cv = function(e) {
  n(this, he)?.contains(e.target) || this.hideDropdown();
}, kn = function() {
  return n(this, he) && !n(this, he).classList.contains("hidden");
}, y(Je, zc, null);
let Mu = Je;
var Ii, Xc, Tl, Yc;
const Hr = class Hr {
  constructor(e) {
    y(this, Ii, null);
    y(this, Xc, null);
    y(this, Tl, null);
    g(this, Xc, e), g(this, Tl, e._uiManager), n(Hr, Yc) || g(Hr, Yc, Object.freeze({
      freetext: "pdfjs-editor-color-picker-free-text-input",
      ink: "pdfjs-editor-color-picker-ink-input"
    }));
  }
  renderButton() {
    if (n(this, Ii))
      return n(this, Ii);
    const {
      editorType: e,
      colorType: t,
      color: s
    } = n(this, Xc), i = g(this, Ii, document.createElement("input"));
    return i.type = "color", i.value = s || "#000000", i.className = "basicColorPicker", i.tabIndex = 0, i.setAttribute("data-l10n-id", n(Hr, Yc)[e]), i.addEventListener("input", () => {
      n(this, Tl).updateParams(t, i.value);
    }, {
      signal: n(this, Tl)._signal
    }), i;
  }
  update(e) {
    n(this, Ii) && (n(this, Ii).value = e);
  }
  destroy() {
    n(this, Ii)?.remove(), g(this, Ii, null);
  }
  hideDropdown() {
  }
};
Ii = new WeakMap(), Xc = new WeakMap(), Tl = new WeakMap(), Yc = new WeakMap(), y(Hr, Yc, null);
let Ou = Hr;
q(531);
function em(c) {
  return Math.floor(Math.max(0, Math.min(1, c)) * 255).toString(16).padStart(2, "0");
}
function oh(c) {
  return Math.max(0, Math.min(255, 255 * c));
}
class sm {
  static CMYK_G([e, t, s, i]) {
    return ["G", 1 - Math.min(1, 0.3 * e + 0.59 * s + 0.11 * t + i)];
  }
  static G_CMYK([e]) {
    return ["CMYK", 0, 0, 0, 1 - e];
  }
  static G_RGB([e]) {
    return ["RGB", e, e, e];
  }
  static G_rgb([e]) {
    return e = oh(e), [e, e, e];
  }
  static G_HTML([e]) {
    const t = em(e);
    return `#${t}${t}${t}`;
  }
  static RGB_G([e, t, s]) {
    return ["G", 0.3 * e + 0.59 * t + 0.11 * s];
  }
  static RGB_rgb(e) {
    return e.map(oh);
  }
  static RGB_HTML(e) {
    return `#${e.map(em).join("")}`;
  }
  static T_HTML() {
    return "#00000000";
  }
  static T_rgb() {
    return [null];
  }
  static CMYK_RGB([e, t, s, i]) {
    return ["RGB", 1 - Math.min(1, e + i), 1 - Math.min(1, s + i), 1 - Math.min(1, t + i)];
  }
  static CMYK_rgb([e, t, s, i]) {
    return [oh(1 - Math.min(1, e + i)), oh(1 - Math.min(1, s + i)), oh(1 - Math.min(1, t + i))];
  }
  static CMYK_HTML(e) {
    const t = this.CMYK_RGB(e).slice(1);
    return this.RGB_HTML(t);
  }
  static RGB_CMYK([e, t, s]) {
    const i = 1 - e, r = 1 - t, a = 1 - s, o = Math.min(i, r, a);
    return ["CMYK", i, r, a, o];
  }
}
class dA {
  create(e, t, s = !1) {
    if (e <= 0 || t <= 0)
      throw new Error("Invalid SVG dimensions");
    const i = this._createSVG("svg:svg");
    return i.setAttribute("version", "1.1"), s || (i.setAttribute("width", `${e}px`), i.setAttribute("height", `${t}px`)), i.setAttribute("preserveAspectRatio", "none"), i.setAttribute("viewBox", `0 0 ${e} ${t}`), i;
  }
  createElement(e) {
    if (typeof e != "string")
      throw new Error("Invalid SVG element type");
    return this._createSVG(e);
  }
  _createSVG(e) {
    bt("Abstract method `_createSVG` called.");
  }
}
class Lu extends dA {
  _createSVG(e) {
    return document.createElementNS(Gi, e);
  }
}
const uA = 9, lo = /* @__PURE__ */ new WeakSet(), fA = (/* @__PURE__ */ new Date()).getTimezoneOffset() * 60 * 1e3;
class Pf {
  static create(e) {
    switch (e.data.annotationType) {
      case ie.LINK:
        return new gg(e);
      case ie.TEXT:
        return new gA(e);
      case ie.WIDGET:
        switch (e.data.fieldType) {
          case "Tx":
            return new mA(e);
          case "Btn":
            return e.data.radioButton ? new Rv(e) : e.data.checkBox ? new yA(e) : new bA(e);
          case "Ch":
            return new AA(e);
          case "Sig":
            return new vA(e);
        }
        return new co(e);
      case ie.POPUP:
        return new wp(e);
      case ie.FREETEXT:
        return new Fv(e);
      case ie.LINE:
        return new EA(e);
      case ie.SQUARE:
        return new SA(e);
      case ie.CIRCLE:
        return new xA(e);
      case ie.POLYLINE:
        return new kv(e);
      case ie.CARET:
        return new CA(e);
      case ie.INK:
        return new mg(e);
      case ie.POLYGON:
        return new TA(e);
      case ie.HIGHLIGHT:
        return new Nv(e);
      case ie.UNDERLINE:
        return new IA(e);
      case ie.SQUIGGLY:
        return new PA(e);
      case ie.STRIKEOUT:
        return new RA(e);
      case ie.STAMP:
        return new Bv(e);
      case ie.FILEATTACHMENT:
        return new DA(e);
      default:
        return new _t(e);
    }
  }
}
var Fa, Cl, $s, Kc, Ap;
const xg = class xg {
  constructor(e, {
    isRenderable: t = !1,
    ignoreBorder: s = !1,
    createQuadrilaterals: i = !1
  } = {}) {
    y(this, Kc);
    y(this, Fa, null);
    y(this, Cl, !1);
    y(this, $s, null);
    this.isRenderable = t, this.data = e.data, this.layer = e.layer, this.linkService = e.linkService, this.downloadManager = e.downloadManager, this.imageResourcesPath = e.imageResourcesPath, this.renderForms = e.renderForms, this.svgFactory = e.svgFactory, this.annotationStorage = e.annotationStorage, this.enableComment = e.enableComment, this.enableScripting = e.enableScripting, this.hasJSActions = e.hasJSActions, this._fieldObjects = e.fieldObjects, this.parent = e.parent, this.hasOwnCommentButton = !1, t && (this.contentElement = this.container = this._createContainer(s)), i && this._createQuadrilaterals();
  }
  static _hasPopupData({
    contentsObj: e,
    richText: t
  }) {
    return !!(e?.str || t?.str);
  }
  get _isEditable() {
    return this.data.isEditable;
  }
  get hasPopupData() {
    return xg._hasPopupData(this.data) || this.enableComment && !!this.commentText;
  }
  get commentData() {
    const {
      data: e
    } = this, t = this.annotationStorage?.getEditor(e.id);
    return t ? t.getData() : e;
  }
  get hasCommentButton() {
    return this.enableComment && this.hasPopupElement;
  }
  get commentButtonPosition() {
    const e = this.annotationStorage?.getEditor(this.data.id);
    if (e)
      return e.commentButtonPositionInPage;
    const {
      quadPoints: t,
      inkLists: s,
      rect: i
    } = this.data;
    let r = -1 / 0, a = -1 / 0;
    if (t?.length >= 8) {
      for (let o = 0; o < t.length; o += 8)
        t[o + 1] > a ? (a = t[o + 1], r = t[o + 2]) : t[o + 1] === a && (r = Math.max(r, t[o + 2]));
      return [r, a];
    }
    if (s?.length >= 1) {
      for (const o of s)
        for (let l = 0, h = o.length; l < h; l += 2)
          o[l + 1] > a ? (a = o[l + 1], r = o[l]) : o[l + 1] === a && (r = Math.max(r, o[l]));
      if (r !== 1 / 0)
        return [r, a];
    }
    return i ? [i[2], i[3]] : null;
  }
  _normalizePoint(e) {
    const {
      page: {
        view: t
      },
      viewport: {
        rawDims: {
          pageWidth: s,
          pageHeight: i,
          pageX: r,
          pageY: a
        }
      }
    } = this.parent;
    return e[1] = t[3] - e[1] + t[1], e[0] = 100 * (e[0] - r) / s, e[1] = 100 * (e[1] - a) / i, e;
  }
  get commentText() {
    const {
      data: e
    } = this;
    return this.annotationStorage.getRawValue(`${Fh}${e.id}`)?.popup?.contents || e.contentsObj?.str || "";
  }
  set commentText(e) {
    const {
      data: t
    } = this, s = {
      deleted: !e,
      contents: e || ""
    };
    this.annotationStorage.updateEditor(t.id, {
      popup: s
    }) || this.annotationStorage.setValue(`${Fh}${t.id}`, {
      id: t.id,
      annotationType: t.annotationType,
      page: this.parent.page,
      popup: s,
      popupRef: t.popupRef,
      modificationDate: /* @__PURE__ */ new Date()
    }), e || this.removePopup();
  }
  removePopup() {
    (n(this, $s)?.popup || this.popup)?.remove(), g(this, $s, this.popup = null);
  }
  updateEdited(e) {
    if (!this.container)
      return;
    e.rect && (n(this, Fa) || g(this, Fa, {
      rect: this.data.rect.slice(0)
    }));
    const {
      rect: t,
      popup: s
    } = e;
    t && w(this, Kc, Ap).call(this, t);
    let i = n(this, $s)?.popup || this.popup;
    !i && s?.text && (this._createPopup(s), i = n(this, $s).popup), i && (i.updateEdited(e), s?.deleted && (i.remove(), g(this, $s, null), this.popup = null));
  }
  resetEdited() {
    n(this, Fa) && (w(this, Kc, Ap).call(this, n(this, Fa).rect), n(this, $s)?.popup.resetEdited(), g(this, Fa, null));
  }
  _createContainer(e) {
    const {
      data: t,
      parent: {
        page: s,
        viewport: i
      }
    } = this, r = document.createElement("section");
    r.setAttribute("data-annotation-id", t.id), !(this instanceof co) && !(this instanceof gg) && (r.tabIndex = 0);
    const {
      style: a
    } = r;
    if (a.zIndex = this.parent.zIndex, this.parent.zIndex += 2, t.alternativeText && (r.title = t.alternativeText), t.noRotate && r.classList.add("norotate"), !t.rect || this instanceof wp) {
      const {
        rotation: v
      } = t;
      return !t.hasOwnCanvas && v !== 0 && this.setRotation(v, r), r;
    }
    const {
      width: o,
      height: l
    } = this;
    if (!e && t.borderStyle.width > 0) {
      a.borderWidth = `${t.borderStyle.width}px`;
      const v = t.borderStyle.horizontalCornerRadius, A = t.borderStyle.verticalCornerRadius;
      if (v > 0 || A > 0) {
        const E = `calc(${v}px * var(--total-scale-factor)) / calc(${A}px * var(--total-scale-factor))`;
        a.borderRadius = E;
      } else if (this instanceof Rv) {
        const E = `calc(${o}px * var(--total-scale-factor)) / calc(${l}px * var(--total-scale-factor))`;
        a.borderRadius = E;
      }
      switch (t.borderStyle.style) {
        case fo.SOLID:
          a.borderStyle = "solid";
          break;
        case fo.DASHED:
          a.borderStyle = "dashed";
          break;
        case fo.BEVELED:
          Z("Unimplemented border style: beveled");
          break;
        case fo.INSET:
          Z("Unimplemented border style: inset");
          break;
        case fo.UNDERLINE:
          a.borderBottomStyle = "solid";
          break;
      }
      const b = t.borderColor || null;
      b ? (g(this, Cl, !0), a.borderColor = j.makeHexColor(b[0] | 0, b[1] | 0, b[2] | 0)) : a.borderWidth = 0;
    }
    const h = j.normalizeRect([t.rect[0], s.view[3] - t.rect[1] + s.view[1], t.rect[2], s.view[3] - t.rect[3] + s.view[1]]), {
      pageWidth: d,
      pageHeight: u,
      pageX: f,
      pageY: p
    } = i.rawDims;
    a.left = `${100 * (h[0] - f) / d}%`, a.top = `${100 * (h[1] - p) / u}%`;
    const {
      rotation: m
    } = t;
    return t.hasOwnCanvas || m === 0 ? (a.width = `${100 * o / d}%`, a.height = `${100 * l / u}%`) : this.setRotation(m, r), r;
  }
  setRotation(e, t = this.container) {
    if (!this.data.rect)
      return;
    const {
      pageWidth: s,
      pageHeight: i
    } = this.parent.viewport.rawDims;
    let {
      width: r,
      height: a
    } = this;
    e % 180 !== 0 && ([r, a] = [a, r]), t.style.width = `${100 * r / s}%`, t.style.height = `${100 * a / i}%`, t.setAttribute("data-main-rotation", (360 - e) % 360);
  }
  get _commonActions() {
    const e = (t, s, i) => {
      const r = i.detail[t], a = r[0], o = r.slice(1);
      i.target.style[s] = sm[`${a}_HTML`](o), this.annotationStorage.setValue(this.data.id, {
        [s]: sm[`${a}_rgb`](o)
      });
    };
    return nt(this, "_commonActions", {
      display: (t) => {
        const {
          display: s
        } = t.detail, i = s % 2 === 1;
        this.container.style.visibility = i ? "hidden" : "visible", this.annotationStorage.setValue(this.data.id, {
          noView: i,
          noPrint: s === 1 || s === 2
        });
      },
      print: (t) => {
        this.annotationStorage.setValue(this.data.id, {
          noPrint: !t.detail.print
        });
      },
      hidden: (t) => {
        const {
          hidden: s
        } = t.detail;
        this.container.style.visibility = s ? "hidden" : "visible", this.annotationStorage.setValue(this.data.id, {
          noPrint: s,
          noView: s
        });
      },
      focus: (t) => {
        setTimeout(() => t.target.focus({
          preventScroll: !1
        }), 0);
      },
      userName: (t) => {
        t.target.title = t.detail.userName;
      },
      readonly: (t) => {
        t.target.disabled = t.detail.readonly;
      },
      required: (t) => {
        this._setRequired(t.target, t.detail.required);
      },
      bgColor: (t) => {
        e("bgColor", "backgroundColor", t);
      },
      fillColor: (t) => {
        e("fillColor", "backgroundColor", t);
      },
      fgColor: (t) => {
        e("fgColor", "color", t);
      },
      textColor: (t) => {
        e("textColor", "color", t);
      },
      borderColor: (t) => {
        e("borderColor", "borderColor", t);
      },
      strokeColor: (t) => {
        e("strokeColor", "borderColor", t);
      },
      rotation: (t) => {
        const s = t.detail.rotation;
        this.setRotation(s), this.annotationStorage.setValue(this.data.id, {
          rotation: s
        });
      }
    });
  }
  _dispatchEventFromSandbox(e, t) {
    const s = this._commonActions;
    for (const i of Object.keys(t.detail))
      (e[i] || s[i])?.(t);
  }
  _setDefaultPropertiesFromJS(e) {
    if (!this.enableScripting)
      return;
    const t = this.annotationStorage.getRawValue(this.data.id);
    if (!t)
      return;
    const s = this._commonActions;
    for (const [i, r] of Object.entries(t)) {
      const a = s[i];
      if (a) {
        const o = {
          detail: {
            [i]: r
          },
          target: e
        };
        a(o), delete t[i];
      }
    }
  }
  _createQuadrilaterals() {
    if (!this.container)
      return;
    const {
      quadPoints: e
    } = this.data;
    if (!e)
      return;
    const [t, s, i, r] = this.data.rect.map((v) => Math.fround(v));
    if (e.length === 8) {
      const [v, A, b, E] = e.subarray(2, 6);
      if (i === v && r === A && t === b && s === E)
        return;
    }
    const {
      style: a
    } = this.container;
    let o;
    if (n(this, Cl)) {
      const {
        borderColor: v,
        borderWidth: A
      } = a;
      a.borderWidth = 0, o = ["url('data:image/svg+xml;utf8,", '<svg xmlns="http://www.w3.org/2000/svg"', ' preserveAspectRatio="none" viewBox="0 0 1 1">', `<g fill="transparent" stroke="${v}" stroke-width="${A}">`], this.container.classList.add("hasBorder");
    }
    const l = i - t, h = r - s, {
      svgFactory: d
    } = this, u = d.createElement("svg");
    u.classList.add("quadrilateralsContainer"), u.setAttribute("width", 0), u.setAttribute("height", 0), u.role = "none";
    const f = d.createElement("defs");
    u.append(f);
    const p = d.createElement("clipPath"), m = `clippath_${this.data.id}`;
    p.setAttribute("id", m), p.setAttribute("clipPathUnits", "objectBoundingBox"), f.append(p);
    for (let v = 2, A = e.length; v < A; v += 8) {
      const b = e[v], E = e[v + 1], S = e[v + 2], T = e[v + 3], x = d.createElement("rect"), C = (S - t) / l, I = (r - E) / h, M = (b - S) / l, P = (E - T) / h;
      x.setAttribute("x", C), x.setAttribute("y", I), x.setAttribute("width", M), x.setAttribute("height", P), p.append(x), o?.push(`<rect vector-effect="non-scaling-stroke" x="${C}" y="${I}" width="${M}" height="${P}"/>`);
    }
    n(this, Cl) && (o.push("</g></svg>')"), a.backgroundImage = o.join("")), this.container.append(u), this.container.style.clipPath = `url(#${m})`;
  }
  _createPopup(e = null) {
    const {
      data: t
    } = this;
    let s, i;
    e ? (s = {
      str: e.text
    }, i = e.date) : (s = t.contentsObj, i = t.modificationDate), g(this, $s, new wp({
      data: {
        color: t.color,
        titleObj: t.titleObj,
        modificationDate: i,
        contentsObj: s,
        richText: t.richText,
        parentRect: t.rect,
        borderStyle: 0,
        id: `popup_${t.id}`,
        rotation: t.rotation,
        noRotate: !0
      },
      linkService: this.linkService,
      parent: this.parent,
      elements: [this]
    }));
  }
  get hasPopupElement() {
    return !!(n(this, $s) || this.popup || this.data.popupRef);
  }
  get extraPopupElement() {
    return n(this, $s);
  }
  render() {
    bt("Abstract method `AnnotationElement.render` called");
  }
  _getElementsByName(e, t = null) {
    const s = [];
    if (this._fieldObjects) {
      const i = this._fieldObjects[e];
      if (i)
        for (const {
          page: r,
          id: a,
          exportValues: o
        } of i) {
          if (r === -1 || a === t)
            continue;
          const l = typeof o == "string" ? o : null, h = document.querySelector(`[data-element-id="${a}"]`);
          if (h && !lo.has(h)) {
            Z(`_getElementsByName - element not allowed: ${a}`);
            continue;
          }
          s.push({
            id: a,
            exportValue: l,
            domElement: h
          });
        }
      return s;
    }
    for (const i of document.getElementsByName(e)) {
      const {
        exportValue: r
      } = i, a = i.getAttribute("data-element-id");
      a !== t && lo.has(i) && s.push({
        id: a,
        exportValue: r,
        domElement: i
      });
    }
    return s;
  }
  show() {
    this.container && (this.container.hidden = !1), this.popup?.maybeShow();
  }
  hide() {
    this.container && (this.container.hidden = !0), this.popup?.forceHide();
  }
  getElementsToTriggerPopup() {
    return this.container;
  }
  addHighlightArea() {
    const e = this.getElementsToTriggerPopup();
    if (Array.isArray(e))
      for (const t of e)
        t.classList.add("highlightArea");
    else
      e.classList.add("highlightArea");
  }
  _editOnDoubleClick() {
    if (!this._isEditable)
      return;
    const {
      annotationEditorType: e,
      data: {
        id: t
      }
    } = this;
    this.container.addEventListener("dblclick", () => {
      this.linkService.eventBus?.dispatch("switchannotationeditormode", {
        source: this,
        mode: e,
        editId: t,
        mustEnterInEditMode: !0
      });
    });
  }
  get width() {
    return this.data.rect[2] - this.data.rect[0];
  }
  get height() {
    return this.data.rect[3] - this.data.rect[1];
  }
};
Fa = new WeakMap(), Cl = new WeakMap(), $s = new WeakMap(), Kc = new WeakSet(), Ap = function(e) {
  const {
    container: {
      style: t
    },
    data: {
      rect: s,
      rotation: i
    },
    parent: {
      viewport: {
        rawDims: {
          pageWidth: r,
          pageHeight: a,
          pageX: o,
          pageY: l
        }
      }
    }
  } = this;
  s?.splice(0, 4, ...e), t.left = `${100 * (e[0] - o) / r}%`, t.top = `${100 * (a - e[3] + l) / a}%`, i === 0 ? (t.width = `${100 * (e[2] - e[0]) / r}%`, t.height = `${100 * (e[3] - e[1]) / a}%`) : this.setRotation(i);
};
let _t = xg;
class pA extends _t {
  constructor(e) {
    super(e, {
      isRenderable: !0,
      ignoreBorder: !0
    }), this.editor = e.editor;
  }
  render() {
    return this.container.className = "editorAnnotation", this.container;
  }
  createOrUpdatePopup() {
    const {
      editor: e
    } = this;
    e.hasComment && this._createPopup(e.comment);
  }
  get hasCommentButton() {
    return this.enableComment && this.editor.hasComment;
  }
  get commentButtonPosition() {
    return this.editor.commentButtonPositionInPage;
  }
  get commentText() {
    return this.editor.comment.text;
  }
  set commentText(e) {
    this.editor.comment = e, e || this.removePopup();
  }
  get commentData() {
    return this.editor.getData();
  }
  remove() {
    this.parent.removeAnnotation(this.data.id), this.container.remove(), this.container = null, this.removePopup();
  }
}
var Cs, kr, Iv, Pv;
class gg extends _t {
  constructor(t, s = null) {
    super(t, {
      isRenderable: !0,
      ignoreBorder: !!s?.ignoreBorder,
      createQuadrilaterals: !0
    });
    y(this, Cs);
    this.isTooltipOnly = t.data.isTooltipOnly;
  }
  render() {
    const {
      data: t,
      linkService: s
    } = this, i = document.createElement("a");
    i.setAttribute("data-element-id", t.id);
    let r = !1;
    return t.url ? (s.addLinkAttributes(i, t.url, t.newWindow), r = !0) : t.action ? (this._bindNamedAction(i, t.action, t.overlaidText), r = !0) : t.attachment ? (w(this, Cs, Iv).call(this, i, t.attachment, t.overlaidText, t.attachmentDest), r = !0) : t.setOCGState ? (w(this, Cs, Pv).call(this, i, t.setOCGState, t.overlaidText), r = !0) : t.dest ? (this._bindLink(i, t.dest, t.overlaidText), r = !0) : (t.actions && (t.actions.Action || t.actions["Mouse Up"] || t.actions["Mouse Down"]) && this.enableScripting && this.hasJSActions && (this._bindJSAction(i, t), r = !0), t.resetForm ? (this._bindResetFormAction(i, t.resetForm), r = !0) : this.isTooltipOnly && !r && (this._bindLink(i, ""), r = !0)), this.container.classList.add("linkAnnotation"), r && (this.contentElement = i, this.container.append(i)), this.container;
  }
  _bindLink(t, s, i = "") {
    t.href = this.linkService.getDestinationHash(s), t.onclick = () => (s && this.linkService.goToDestination(s), !1), (s || s === "") && w(this, Cs, kr).call(this), i && (t.title = i);
  }
  _bindNamedAction(t, s, i = "") {
    t.href = this.linkService.getAnchorUrl(""), t.onclick = () => (this.linkService.executeNamedAction(s), !1), i && (t.title = i), w(this, Cs, kr).call(this);
  }
  _bindJSAction(t, s) {
    t.href = this.linkService.getAnchorUrl("");
    const i = /* @__PURE__ */ new Map([["Action", "onclick"], ["Mouse Up", "onmouseup"], ["Mouse Down", "onmousedown"]]);
    for (const r of Object.keys(s.actions)) {
      const a = i.get(r);
      a && (t[a] = () => (this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
        source: this,
        detail: {
          id: s.id,
          name: r
        }
      }), !1));
    }
    s.overlaidText && (t.title = s.overlaidText), t.onclick || (t.onclick = () => !1), w(this, Cs, kr).call(this);
  }
  _bindResetFormAction(t, s) {
    const i = t.onclick;
    if (i || (t.href = this.linkService.getAnchorUrl("")), w(this, Cs, kr).call(this), !this._fieldObjects) {
      Z('_bindResetFormAction - "resetForm" action not supported, ensure that the `fieldObjects` parameter is provided.'), i || (t.onclick = () => !1);
      return;
    }
    t.onclick = () => {
      i?.();
      const {
        fields: r,
        refs: a,
        include: o
      } = s, l = [];
      if (r.length !== 0 || a.length !== 0) {
        const u = new Set(a);
        for (const f of r) {
          const p = this._fieldObjects[f] || [];
          for (const {
            id: m
          } of p)
            u.add(m);
        }
        for (const f of Object.values(this._fieldObjects))
          for (const p of f)
            u.has(p.id) === o && l.push(p);
      } else
        for (const u of Object.values(this._fieldObjects))
          l.push(...u);
      const h = this.annotationStorage, d = [];
      for (const u of l) {
        const {
          id: f
        } = u;
        switch (d.push(f), u.type) {
          case "text": {
            const m = u.defaultValue || "";
            h.setValue(f, {
              value: m
            });
            break;
          }
          case "checkbox":
          case "radiobutton": {
            const m = u.defaultValue === u.exportValues;
            h.setValue(f, {
              value: m
            });
            break;
          }
          case "combobox":
          case "listbox": {
            const m = u.defaultValue || "";
            h.setValue(f, {
              value: m
            });
            break;
          }
          default:
            continue;
        }
        const p = document.querySelector(`[data-element-id="${f}"]`);
        if (p) {
          if (!lo.has(p)) {
            Z(`_bindResetFormAction - element not allowed: ${f}`);
            continue;
          }
        } else continue;
        p.dispatchEvent(new Event("resetform"));
      }
      return this.enableScripting && this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
        source: this,
        detail: {
          id: "app",
          ids: d,
          name: "ResetForm"
        }
      }), !1;
    };
  }
}
Cs = new WeakSet(), kr = function() {
  this.container.setAttribute("data-internal-link", "");
}, Iv = function(t, s, i = "", r = null) {
  t.href = this.linkService.getAnchorUrl(""), s.description ? t.title = s.description : i && (t.title = i), t.onclick = () => (this.downloadManager?.openOrDownloadData(s.content, s.filename, r), !1), w(this, Cs, kr).call(this);
}, Pv = function(t, s, i = "") {
  t.href = this.linkService.getAnchorUrl(""), t.onclick = () => (this.linkService.executeSetOCGState(s), !1), i && (t.title = i), w(this, Cs, kr).call(this);
};
class gA extends _t {
  constructor(e) {
    super(e, {
      isRenderable: !0
    });
  }
  render() {
    this.container.classList.add("textAnnotation");
    const e = document.createElement("img");
    return e.src = this.imageResourcesPath + "annotation-" + this.data.name.toLowerCase() + ".svg", e.setAttribute("data-l10n-id", "pdfjs-text-annotation-type"), e.setAttribute("data-l10n-args", JSON.stringify({
      type: this.data.name
    })), !this.data.popupRef && this.hasPopupData && (this.hasOwnCommentButton = !0, this._createPopup()), this.container.append(e), this.container;
  }
}
class co extends _t {
  render() {
    return this.container;
  }
  showElementAndHideCanvas(e) {
    this.data.hasOwnCanvas && (e.previousSibling?.nodeName === "CANVAS" && (e.previousSibling.hidden = !0), e.hidden = !1);
  }
  _getKeyModifier(e) {
    return de.platform.isMac ? e.metaKey : e.ctrlKey;
  }
  _setEventListener(e, t, s, i, r) {
    s.includes("mouse") ? e.addEventListener(s, (a) => {
      this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
        source: this,
        detail: {
          id: this.data.id,
          name: i,
          value: r(a),
          shift: a.shiftKey,
          modifier: this._getKeyModifier(a)
        }
      });
    }) : e.addEventListener(s, (a) => {
      if (s === "blur") {
        if (!t.focused || !a.relatedTarget)
          return;
        t.focused = !1;
      } else if (s === "focus") {
        if (t.focused)
          return;
        t.focused = !0;
      }
      r && this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
        source: this,
        detail: {
          id: this.data.id,
          name: i,
          value: r(a)
        }
      });
    });
  }
  _setEventListeners(e, t, s, i) {
    for (const [r, a] of s)
      (a === "Action" || this.data.actions?.[a]) && ((a === "Focus" || a === "Blur") && (t || (t = {
        focused: !1
      })), this._setEventListener(e, t, r, a, i), a === "Focus" && !this.data.actions?.Blur ? this._setEventListener(e, t, "blur", "Blur", null) : a === "Blur" && !this.data.actions?.Focus && this._setEventListener(e, t, "focus", "Focus", null));
  }
  _setBackgroundColor(e) {
    const t = this.data.backgroundColor || null;
    e.style.backgroundColor = t === null ? "transparent" : j.makeHexColor(t[0], t[1], t[2]);
  }
  _setTextStyle(e) {
    const t = ["left", "center", "right"], {
      fontColor: s
    } = this.data.defaultAppearanceData, i = this.data.defaultAppearanceData.fontSize || uA, r = e.style;
    let a;
    const o = 2, l = (h) => Math.round(10 * h) / 10;
    if (this.data.multiLine) {
      const h = Math.abs(this.data.rect[3] - this.data.rect[1] - o), d = Math.round(h / (wf * i)) || 1, u = h / d;
      a = Math.min(i, l(u / wf));
    } else {
      const h = Math.abs(this.data.rect[3] - this.data.rect[1] - o);
      a = Math.min(i, l(h / wf));
    }
    r.fontSize = `calc(${a}px * var(--total-scale-factor))`, r.color = j.makeHexColor(s[0], s[1], s[2]), this.data.textAlignment !== null && (r.textAlign = t[this.data.textAlignment]);
  }
  _setRequired(e, t) {
    t ? e.setAttribute("required", !0) : e.removeAttribute("required"), e.setAttribute("aria-required", t);
  }
}
class mA extends co {
  constructor(e) {
    const t = e.renderForms || e.data.hasOwnCanvas || !e.data.hasAppearance && !!e.data.fieldValue;
    super(e, {
      isRenderable: t
    });
  }
  setPropertyOnSiblings(e, t, s, i) {
    const r = this.annotationStorage;
    for (const a of this._getElementsByName(e.name, e.id))
      a.domElement && (a.domElement[t] = s), r.setValue(a.id, {
        [i]: s
      });
  }
  render() {
    const e = this.annotationStorage, t = this.data.id;
    this.container.classList.add("textWidgetAnnotation");
    let s = null;
    if (this.renderForms) {
      const i = e.getValue(t, {
        value: this.data.fieldValue
      });
      let r = i.value || "";
      const a = e.getValue(t, {
        charLimit: this.data.maxLen
      }).charLimit;
      a && r.length > a && (r = r.slice(0, a));
      let o = i.formattedValue || this.data.textContent?.join(`
`) || null;
      o && this.data.comb && (o = o.replaceAll(/\s+/g, ""));
      const l = {
        userValue: r,
        formattedValue: o,
        lastCommittedValue: null,
        commitKey: 1,
        focused: !1
      };
      this.data.multiLine ? (s = document.createElement("textarea"), s.textContent = o ?? r, this.data.doNotScroll && (s.style.overflowY = "hidden")) : (s = document.createElement("input"), s.type = this.data.password ? "password" : "text", s.setAttribute("value", o ?? r), this.data.doNotScroll && (s.style.overflowX = "hidden")), this.data.hasOwnCanvas && (s.hidden = !0), lo.add(s), this.contentElement = s, s.setAttribute("data-element-id", t), s.disabled = this.data.readOnly, s.name = this.data.fieldName, s.tabIndex = 0;
      const {
        datetimeFormat: h,
        datetimeType: d,
        timeStep: u
      } = this.data, f = !!d && this.enableScripting;
      h && (s.title = h), this._setRequired(s, this.data.required), a && (s.maxLength = a), s.addEventListener("input", (m) => {
        e.setValue(t, {
          value: m.target.value
        }), this.setPropertyOnSiblings(s, "value", m.target.value, "value"), l.formattedValue = null;
      }), s.addEventListener("resetform", (m) => {
        const v = this.data.defaultFieldValue ?? "";
        s.value = l.userValue = v, l.formattedValue = null;
      });
      let p = (m) => {
        const {
          formattedValue: v
        } = l;
        v != null && (m.target.value = v), m.target.scrollLeft = 0;
      };
      if (this.enableScripting && this.hasJSActions) {
        s.addEventListener("focus", (v) => {
          if (l.focused)
            return;
          const {
            target: A
          } = v;
          if (f && (A.type = d, u && (A.step = u)), l.userValue) {
            const b = l.userValue;
            if (f)
              if (d === "time") {
                const E = new Date(b), S = [E.getHours(), E.getMinutes(), E.getSeconds()];
                A.value = S.map((T) => T.toString().padStart(2, "0")).join(":");
              } else
                A.value = new Date(b - fA).toISOString().split(d === "date" ? "T" : ".", 1)[0];
            else
              A.value = b;
          }
          l.lastCommittedValue = A.value, l.commitKey = 1, this.data.actions?.Focus || (l.focused = !0);
        }), s.addEventListener("updatefromsandbox", (v) => {
          this.showElementAndHideCanvas(v.target);
          const A = {
            value(b) {
              l.userValue = b.detail.value ?? "", f || e.setValue(t, {
                value: l.userValue.toString()
              }), b.target.value = l.userValue;
            },
            formattedValue(b) {
              const {
                formattedValue: E
              } = b.detail;
              l.formattedValue = E, E != null && b.target !== document.activeElement && (b.target.value = E);
              const S = {
                formattedValue: E
              };
              f && (S.value = E), e.setValue(t, S);
            },
            selRange(b) {
              b.target.setSelectionRange(...b.detail.selRange);
            },
            charLimit: (b) => {
              const {
                charLimit: E
              } = b.detail, {
                target: S
              } = b;
              if (E === 0) {
                S.removeAttribute("maxLength");
                return;
              }
              S.setAttribute("maxLength", E);
              let T = l.userValue;
              !T || T.length <= E || (T = T.slice(0, E), S.value = l.userValue = T, e.setValue(t, {
                value: T
              }), this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
                source: this,
                detail: {
                  id: t,
                  name: "Keystroke",
                  value: T,
                  willCommit: !0,
                  commitKey: 1,
                  selStart: S.selectionStart,
                  selEnd: S.selectionEnd
                }
              }));
            }
          };
          this._dispatchEventFromSandbox(A, v);
        }), s.addEventListener("keydown", (v) => {
          l.commitKey = 1;
          let A = -1;
          if (v.key === "Escape" ? A = 0 : v.key === "Enter" && !this.data.multiLine ? A = 2 : v.key === "Tab" && (l.commitKey = 3), A === -1)
            return;
          const {
            value: b
          } = v.target;
          l.lastCommittedValue !== b && (l.lastCommittedValue = b, l.userValue = b, this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
            source: this,
            detail: {
              id: t,
              name: "Keystroke",
              value: b,
              willCommit: !0,
              commitKey: A,
              selStart: v.target.selectionStart,
              selEnd: v.target.selectionEnd
            }
          }));
        });
        const m = p;
        p = null, s.addEventListener("blur", (v) => {
          if (!l.focused || !v.relatedTarget)
            return;
          this.data.actions?.Blur || (l.focused = !1);
          const {
            target: A
          } = v;
          let {
            value: b
          } = A;
          if (f) {
            if (b && d === "time") {
              const E = b.split(":").map((S) => parseInt(S, 10));
              b = new Date(2e3, 0, 1, E[0], E[1], E[2] || 0).valueOf(), A.step = "";
            } else
              b.includes("T") || (b = `${b}T00:00`), b = new Date(b).valueOf();
            A.type = "text";
          }
          l.userValue = b, l.lastCommittedValue !== b && this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
            source: this,
            detail: {
              id: t,
              name: "Keystroke",
              value: b,
              willCommit: !0,
              commitKey: l.commitKey,
              selStart: v.target.selectionStart,
              selEnd: v.target.selectionEnd
            }
          }), m(v);
        }), this.data.actions?.Keystroke && s.addEventListener("beforeinput", (v) => {
          l.lastCommittedValue = null;
          const {
            data: A,
            target: b
          } = v, {
            value: E,
            selectionStart: S,
            selectionEnd: T
          } = b;
          let x = S, C = T;
          switch (v.inputType) {
            case "deleteWordBackward": {
              const I = E.substring(0, S).match(/\w*[^\w]*$/);
              I && (x -= I[0].length);
              break;
            }
            case "deleteWordForward": {
              const I = E.substring(S).match(/^[^\w]*\w*/);
              I && (C += I[0].length);
              break;
            }
            case "deleteContentBackward":
              S === T && (x -= 1);
              break;
            case "deleteContentForward":
              S === T && (C += 1);
              break;
          }
          v.preventDefault(), this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
            source: this,
            detail: {
              id: t,
              name: "Keystroke",
              value: E,
              change: A || "",
              willCommit: !1,
              selStart: x,
              selEnd: C
            }
          });
        }), this._setEventListeners(s, l, [["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], (v) => v.target.value);
      }
      if (p && s.addEventListener("blur", p), this.data.comb) {
        const v = (this.data.rect[2] - this.data.rect[0]) / a;
        s.classList.add("comb"), s.style.letterSpacing = `calc(${v}px * var(--total-scale-factor) - 1ch)`;
      }
    } else
      s = document.createElement("div"), s.textContent = this.data.fieldValue, s.style.verticalAlign = "middle", s.style.display = "table-cell", this.data.hasOwnCanvas && (s.hidden = !0);
    return this._setTextStyle(s), this._setBackgroundColor(s), this._setDefaultPropertiesFromJS(s), this.container.append(s), this.container;
  }
}
class vA extends co {
  constructor(e) {
    super(e, {
      isRenderable: !!e.data.hasOwnCanvas
    });
  }
}
class yA extends co {
  constructor(e) {
    super(e, {
      isRenderable: e.renderForms
    });
  }
  render() {
    const e = this.annotationStorage, t = this.data, s = t.id;
    let i = e.getValue(s, {
      value: t.exportValue === t.fieldValue
    }).value;
    typeof i == "string" && (i = i !== "Off", e.setValue(s, {
      value: i
    })), this.container.classList.add("buttonWidgetAnnotation", "checkBox");
    const r = document.createElement("input");
    return lo.add(r), r.setAttribute("data-element-id", s), r.disabled = t.readOnly, this._setRequired(r, this.data.required), r.type = "checkbox", r.name = t.fieldName, i && r.setAttribute("checked", !0), r.setAttribute("exportValue", t.exportValue), r.tabIndex = 0, r.addEventListener("change", (a) => {
      const {
        name: o,
        checked: l
      } = a.target;
      for (const h of this._getElementsByName(o, s)) {
        const d = l && h.exportValue === t.exportValue;
        h.domElement && (h.domElement.checked = d), e.setValue(h.id, {
          value: d
        });
      }
      e.setValue(s, {
        value: l
      });
    }), r.addEventListener("resetform", (a) => {
      const o = t.defaultFieldValue || "Off";
      a.target.checked = o === t.exportValue;
    }), this.enableScripting && this.hasJSActions && (r.addEventListener("updatefromsandbox", (a) => {
      const o = {
        value(l) {
          l.target.checked = l.detail.value !== "Off", e.setValue(s, {
            value: l.target.checked
          });
        }
      };
      this._dispatchEventFromSandbox(o, a);
    }), this._setEventListeners(r, null, [["change", "Validate"], ["change", "Action"], ["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], (a) => a.target.checked)), this._setBackgroundColor(r), this._setDefaultPropertiesFromJS(r), this.container.append(r), this.container;
  }
}
class Rv extends co {
  constructor(e) {
    super(e, {
      isRenderable: e.renderForms
    });
  }
  render() {
    this.container.classList.add("buttonWidgetAnnotation", "radioButton");
    const e = this.annotationStorage, t = this.data, s = t.id;
    let i = e.getValue(s, {
      value: t.fieldValue === t.buttonValue
    }).value;
    if (typeof i == "string" && (i = i !== t.buttonValue, e.setValue(s, {
      value: i
    })), i)
      for (const a of this._getElementsByName(t.fieldName, s))
        e.setValue(a.id, {
          value: !1
        });
    const r = document.createElement("input");
    if (lo.add(r), r.setAttribute("data-element-id", s), r.disabled = t.readOnly, this._setRequired(r, this.data.required), r.type = "radio", r.name = t.fieldName, i && r.setAttribute("checked", !0), r.tabIndex = 0, r.addEventListener("change", (a) => {
      const {
        name: o,
        checked: l
      } = a.target;
      for (const h of this._getElementsByName(o, s))
        e.setValue(h.id, {
          value: !1
        });
      e.setValue(s, {
        value: l
      });
    }), r.addEventListener("resetform", (a) => {
      const o = t.defaultFieldValue;
      a.target.checked = o != null && o === t.buttonValue;
    }), this.enableScripting && this.hasJSActions) {
      const a = t.buttonValue;
      r.addEventListener("updatefromsandbox", (o) => {
        const l = {
          value: (h) => {
            const d = a === h.detail.value;
            for (const u of this._getElementsByName(h.target.name)) {
              const f = d && u.id === s;
              u.domElement && (u.domElement.checked = f), e.setValue(u.id, {
                value: f
              });
            }
          }
        };
        this._dispatchEventFromSandbox(l, o);
      }), this._setEventListeners(r, null, [["change", "Validate"], ["change", "Action"], ["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"]], (o) => o.target.checked);
    }
    return this._setBackgroundColor(r), this._setDefaultPropertiesFromJS(r), this.container.append(r), this.container;
  }
}
class bA extends gg {
  constructor(e) {
    super(e, {
      ignoreBorder: e.data.hasAppearance
    });
  }
  render() {
    const e = super.render();
    e.classList.add("buttonWidgetAnnotation", "pushButton");
    const t = e.lastChild;
    return this.enableScripting && this.hasJSActions && t && (this._setDefaultPropertiesFromJS(t), t.addEventListener("updatefromsandbox", (s) => {
      this._dispatchEventFromSandbox({}, s);
    })), e;
  }
}
class AA extends co {
  constructor(e) {
    super(e, {
      isRenderable: e.renderForms
    });
  }
  render() {
    this.container.classList.add("choiceWidgetAnnotation");
    const e = this.annotationStorage, t = this.data.id, s = e.getValue(t, {
      value: this.data.fieldValue
    }), i = document.createElement("select");
    lo.add(i), i.setAttribute("data-element-id", t), i.disabled = this.data.readOnly, this._setRequired(i, this.data.required), i.name = this.data.fieldName, i.tabIndex = 0;
    let r = this.data.combo && this.data.options.length > 0;
    this.data.combo || (i.size = this.data.options.length, this.data.multiSelect && (i.multiple = !0)), i.addEventListener("resetform", (u) => {
      const f = this.data.defaultFieldValue;
      for (const p of i.options)
        p.selected = p.value === f;
    });
    const a = (u, f) => {
      const p = f.replaceAll(" ", " ");
      u.textContent = p, p !== f && u.setAttribute("display-value", f);
    };
    for (const u of this.data.options) {
      const f = document.createElement("option");
      a(f, u.displayValue), f.value = u.exportValue, s.value.includes(u.exportValue) && (f.setAttribute("selected", !0), r = !1), i.append(f);
    }
    let o = null;
    if (r) {
      const u = document.createElement("option");
      u.value = " ", u.setAttribute("hidden", !0), u.setAttribute("selected", !0), i.prepend(u), o = () => {
        u.remove(), i.removeEventListener("input", o), o = null;
      }, i.addEventListener("input", o);
    }
    const l = (u) => {
      const f = u ? "value" : "textContent", {
        options: p,
        multiple: m
      } = i;
      return m ? Array.prototype.filter.call(p, (v) => v.selected).map((v) => v[f]) : p.selectedIndex === -1 ? null : p[p.selectedIndex][f];
    };
    let h = l(!1);
    const d = (u) => {
      const f = u.target.options;
      return Array.prototype.map.call(f, (p) => ({
        displayValue: p.getAttribute("display-value") || p.textContent,
        exportValue: p.value
      }));
    };
    return this.enableScripting && this.hasJSActions ? (i.addEventListener("updatefromsandbox", (u) => {
      const f = {
        value(p) {
          o?.();
          const m = p.detail.value, v = new Set(Array.isArray(m) ? m : [m]);
          for (const A of i.options)
            A.selected = v.has(A.value);
          e.setValue(t, {
            value: l(!0)
          }), h = l(!1);
        },
        multipleSelection(p) {
          i.multiple = !0;
        },
        remove(p) {
          const m = i.options, v = p.detail.remove;
          m[v].selected = !1, i.remove(v), m.length > 0 && Array.prototype.findIndex.call(m, (b) => b.selected) === -1 && (m[0].selected = !0), e.setValue(t, {
            value: l(!0),
            items: d(p)
          }), h = l(!1);
        },
        clear(p) {
          for (; i.length !== 0; )
            i.remove(0);
          e.setValue(t, {
            value: null,
            items: []
          }), h = l(!1);
        },
        insert(p) {
          const {
            index: m,
            displayValue: v,
            exportValue: A
          } = p.detail.insert, b = i.children[m], E = document.createElement("option");
          a(E, v), E.value = A, b ? b.before(E) : i.append(E), e.setValue(t, {
            value: l(!0),
            items: d(p)
          }), h = l(!1);
        },
        items(p) {
          const {
            items: m
          } = p.detail;
          for (; i.length !== 0; )
            i.remove(0);
          for (const v of m) {
            const {
              displayValue: A,
              exportValue: b
            } = v, E = document.createElement("option");
            a(E, A), E.value = b, i.append(E);
          }
          i.options.length > 0 && (i.options[0].selected = !0), e.setValue(t, {
            value: l(!0),
            items: d(p)
          }), h = l(!1);
        },
        indices(p) {
          const m = new Set(p.detail.indices);
          for (const v of p.target.options)
            v.selected = m.has(v.index);
          e.setValue(t, {
            value: l(!0)
          }), h = l(!1);
        },
        editable(p) {
          p.target.disabled = !p.detail.editable;
        }
      };
      this._dispatchEventFromSandbox(f, u);
    }), i.addEventListener("input", (u) => {
      const f = l(!0), p = l(!1);
      e.setValue(t, {
        value: f
      }), u.preventDefault(), this.linkService.eventBus?.dispatch("dispatcheventinsandbox", {
        source: this,
        detail: {
          id: t,
          name: "Keystroke",
          value: h,
          change: p,
          changeEx: f,
          willCommit: !1,
          commitKey: 1,
          keyDown: !1
        }
      });
    }), this._setEventListeners(i, null, [["focus", "Focus"], ["blur", "Blur"], ["mousedown", "Mouse Down"], ["mouseenter", "Mouse Enter"], ["mouseleave", "Mouse Exit"], ["mouseup", "Mouse Up"], ["input", "Action"], ["input", "Validate"]], (u) => u.target.value)) : i.addEventListener("input", function(u) {
      e.setValue(t, {
        value: l(!0)
      });
    }), this.data.combo && this._setTextStyle(i), this._setBackgroundColor(i), this._setDefaultPropertiesFromJS(i), this.container.append(i), this.container;
  }
}
var Jc, Ep;
class wp extends _t {
  constructor(t) {
    const {
      data: s,
      elements: i,
      parent: r
    } = t, a = !!r._commentManager;
    super(t, {
      isRenderable: !a && _t._hasPopupData(s)
    });
    y(this, Jc);
    if (this.elements = i, a && _t._hasPopupData(s)) {
      const o = this.popup = w(this, Jc, Ep).call(this);
      for (const l of i)
        l.popup = o;
    } else
      this.popup = null;
  }
  render() {
    const {
      container: t
    } = this;
    t.classList.add("popupAnnotation"), t.role = "comment";
    const s = this.popup = w(this, Jc, Ep).call(this), i = [];
    for (const r of this.elements)
      r.popup = s, r.container.ariaHasPopup = "dialog", i.push(r.data.id), r.addHighlightArea();
    return this.container.setAttribute("aria-controls", i.map((r) => `${Eo}${r}`).join(",")), this.container;
  }
}
Jc = new WeakSet(), Ep = function() {
  return new wA({
    container: this.container,
    color: this.data.color,
    titleObj: this.data.titleObj,
    modificationDate: this.data.modificationDate || this.data.creationDate,
    contentsObj: this.data.contentsObj,
    richText: this.data.richText,
    rect: this.data.rect,
    parentRect: this.data.parentRect || null,
    parent: this.parent,
    elements: this.elements,
    open: this.data.open,
    commentManager: this.parent._commentManager
  });
};
var ds, fr, Zu, qu, Il, Pl, Xt, Pi, pr, ka, Rl, Dl, Ri, us, mn, vn, Yt, yn, gr, Qc, bn, Ml, Na, mr, pe, vr, at, au, Sp, xp, Tp, ou, Cp, Dv, Mv, Ov, Lv, lu, hu, Ip;
class wA {
  constructor({
    container: e,
    color: t,
    elements: s,
    titleObj: i,
    modificationDate: r,
    contentsObj: a,
    richText: o,
    parent: l,
    rect: h,
    parentRect: d,
    open: u,
    commentManager: f = null
  }) {
    y(this, at);
    y(this, ds, null);
    y(this, fr, w(this, at, Ov).bind(this));
    y(this, Zu, w(this, at, Ip).bind(this));
    y(this, qu, w(this, at, hu).bind(this));
    y(this, Il, w(this, at, lu).bind(this));
    y(this, Pl, null);
    y(this, Xt, null);
    y(this, Pi, null);
    y(this, pr, null);
    y(this, ka, null);
    y(this, Rl, null);
    y(this, Dl, null);
    y(this, Ri, !1);
    y(this, us, null);
    y(this, mn, null);
    y(this, vn, null);
    y(this, Yt, null);
    y(this, yn, null);
    y(this, gr, null);
    y(this, Qc, null);
    y(this, bn, null);
    y(this, Ml, null);
    y(this, Na, null);
    y(this, mr, !1);
    y(this, pe, null);
    y(this, vr, null);
    g(this, Xt, e), g(this, Ml, i), g(this, Pi, a), g(this, bn, o), g(this, Rl, l), g(this, Pl, t), g(this, Qc, h), g(this, Dl, d), g(this, ka, s), g(this, ds, f), g(this, pe, s[0]), g(this, pr, Iu.toDateObject(r)), this.trigger = s.flatMap((p) => p.getElementsToTriggerPopup()), f || (w(this, at, au).call(this), n(this, Xt).hidden = !0, u && w(this, at, lu).call(this));
  }
  renderCommentButton() {
    if (n(this, Yt)) {
      n(this, Yt).parentNode || n(this, pe).container.after(n(this, Yt));
      return;
    }
    if (n(this, yn) || w(this, at, Sp).call(this), !n(this, yn))
      return;
    const {
      signal: e
    } = g(this, mn, new AbortController()), t = n(this, pe).hasOwnCommentButton, s = () => {
      n(this, ds).toggleCommentPopup(this, !0, void 0, !t);
    }, i = () => {
      n(this, ds).toggleCommentPopup(this, !1, !0, !t);
    }, r = () => {
      n(this, ds).toggleCommentPopup(this, !1, !1);
    };
    if (t) {
      g(this, Yt, n(this, pe).container);
      for (const a of this.trigger)
        a.ariaHasPopup = "dialog", a.ariaControls = "commentPopup", a.addEventListener("keydown", n(this, fr), {
          signal: e
        }), a.addEventListener("click", s, {
          signal: e
        }), a.addEventListener("pointerenter", i, {
          signal: e
        }), a.addEventListener("pointerleave", r, {
          signal: e
        }), a.classList.add("popupTriggerArea");
    } else {
      const a = g(this, Yt, document.createElement("button"));
      a.className = "annotationCommentButton";
      const o = n(this, pe).container;
      a.style.zIndex = o.style.zIndex + 1, a.tabIndex = 0, a.ariaHasPopup = "dialog", a.ariaControls = "commentPopup", a.setAttribute("data-l10n-id", "pdfjs-show-comment-button"), w(this, at, Tp).call(this), w(this, at, xp).call(this), a.addEventListener("keydown", n(this, fr), {
        signal: e
      }), a.addEventListener("click", s, {
        signal: e
      }), a.addEventListener("pointerenter", i, {
        signal: e
      }), a.addEventListener("pointerleave", r, {
        signal: e
      }), o.after(a);
    }
  }
  get commentButtonColor() {
    const {
      color: e,
      opacity: t
    } = n(this, pe).commentData;
    return e ? n(this, Rl)._commentManager.makeCommentColor(e, t) : null;
  }
  focusCommentButton() {
    setTimeout(() => {
      n(this, Yt)?.focus();
    }, 0);
  }
  getData() {
    const {
      richText: e,
      color: t,
      opacity: s,
      creationDate: i,
      modificationDate: r
    } = n(this, pe).commentData;
    return {
      contentsObj: {
        str: this.comment
      },
      richText: e,
      color: t,
      opacity: s,
      creationDate: i,
      modificationDate: r
    };
  }
  get elementBeforePopup() {
    return n(this, Yt);
  }
  get comment() {
    return n(this, vr) || g(this, vr, n(this, pe).commentText), n(this, vr);
  }
  set comment(e) {
    e !== this.comment && (n(this, pe).commentText = g(this, vr, e));
  }
  focus() {
    n(this, pe).container?.focus();
  }
  get parentBoundingClientRect() {
    return n(this, pe).layer.getBoundingClientRect();
  }
  setCommentButtonStates({
    selected: e,
    hasPopup: t
  }) {
    n(this, Yt) && (n(this, Yt).classList.toggle("selected", e), n(this, Yt).ariaExpanded = t);
  }
  setSelectedCommentButton(e) {
    n(this, Yt).classList.toggle("selected", e);
  }
  get commentPopupPosition() {
    if (n(this, gr))
      return n(this, gr);
    const {
      x: e,
      y: t,
      height: s
    } = n(this, Yt).getBoundingClientRect(), {
      x: i,
      y: r,
      width: a,
      height: o
    } = n(this, pe).layer.getBoundingClientRect();
    return [(e - i) / a, (t + s - r) / o];
  }
  set commentPopupPosition(e) {
    g(this, gr, e);
  }
  hasDefaultPopupPosition() {
    return n(this, gr) === null;
  }
  get commentButtonPosition() {
    return n(this, yn);
  }
  get commentButtonWidth() {
    return n(this, Yt).getBoundingClientRect().width / this.parentBoundingClientRect.width;
  }
  editComment(e) {
    const [t, s] = n(this, gr) || this.commentButtonPosition.map((h) => h / 100), i = this.parentBoundingClientRect, {
      x: r,
      y: a,
      width: o,
      height: l
    } = i;
    n(this, ds).showDialog(null, this, r + t * o, a + s * l, {
      ...e,
      parentDimensions: i
    });
  }
  render() {
    if (n(this, us))
      return;
    const e = g(this, us, document.createElement("div"));
    if (e.className = "popup", n(this, Pl)) {
      const s = e.style.outlineColor = j.makeHexColor(...n(this, Pl));
      e.style.backgroundColor = `color-mix(in srgb, ${s} 30%, white)`;
    }
    const t = document.createElement("span");
    if (t.className = "header", n(this, Ml)?.str) {
      const s = document.createElement("span");
      s.className = "title", t.append(s), {
        dir: s.dir,
        str: s.textContent
      } = n(this, Ml);
    }
    if (e.append(t), n(this, pr)) {
      const s = document.createElement("time");
      s.className = "popupDate", s.setAttribute("data-l10n-id", "pdfjs-annotation-date-time-string"), s.setAttribute("data-l10n-args", JSON.stringify({
        dateObj: n(this, pr).valueOf()
      })), s.dateTime = n(this, pr).toISOString(), t.append(s);
    }
    hm({
      html: n(this, at, ou) || n(this, Pi).str,
      dir: n(this, Pi)?.dir,
      className: "popupContent"
    }, e), n(this, Xt).append(e);
  }
  updateEdited({
    rect: e,
    popup: t,
    deleted: s
  }) {
    if (n(this, ds)) {
      s ? (this.remove(), g(this, vr, null)) : t && (t.deleted ? this.remove() : (w(this, at, Tp).call(this), g(this, vr, t.text))), e && (g(this, yn, null), w(this, at, Sp).call(this), w(this, at, xp).call(this));
      return;
    }
    if (s || t?.deleted) {
      this.remove();
      return;
    }
    w(this, at, au).call(this), n(this, Na) || g(this, Na, {
      contentsObj: n(this, Pi),
      richText: n(this, bn)
    }), e && g(this, vn, null), t && t.text && (g(this, bn, w(this, at, Mv).call(this, t.text)), g(this, pr, Iu.toDateObject(t.date)), g(this, Pi, null)), n(this, us)?.remove(), g(this, us, null);
  }
  resetEdited() {
    n(this, Na) && ({
      contentsObj: ee(this, Pi)._,
      richText: ee(this, bn)._
    } = n(this, Na), g(this, Na, null), n(this, us)?.remove(), g(this, us, null), g(this, vn, null));
  }
  remove() {
    if (n(this, mn)?.abort(), g(this, mn, null), n(this, us)?.remove(), g(this, us, null), g(this, mr, !1), g(this, Ri, !1), n(this, Yt)?.remove(), g(this, Yt, null), this.trigger)
      for (const e of this.trigger)
        e.classList.remove("popupTriggerArea");
  }
  forceHide() {
    g(this, mr, this.isVisible), n(this, mr) && (n(this, Xt).hidden = !0);
  }
  maybeShow() {
    n(this, ds) || (w(this, at, au).call(this), n(this, mr) && (n(this, us) || w(this, at, hu).call(this), g(this, mr, !1), n(this, Xt).hidden = !1));
  }
  get isVisible() {
    return n(this, ds) ? !1 : n(this, Xt).hidden === !1;
  }
}
ds = new WeakMap(), fr = new WeakMap(), Zu = new WeakMap(), qu = new WeakMap(), Il = new WeakMap(), Pl = new WeakMap(), Xt = new WeakMap(), Pi = new WeakMap(), pr = new WeakMap(), ka = new WeakMap(), Rl = new WeakMap(), Dl = new WeakMap(), Ri = new WeakMap(), us = new WeakMap(), mn = new WeakMap(), vn = new WeakMap(), Yt = new WeakMap(), yn = new WeakMap(), gr = new WeakMap(), Qc = new WeakMap(), bn = new WeakMap(), Ml = new WeakMap(), Na = new WeakMap(), mr = new WeakMap(), pe = new WeakMap(), vr = new WeakMap(), at = new WeakSet(), au = function() {
  if (n(this, mn))
    return;
  g(this, mn, new AbortController());
  const {
    signal: e
  } = n(this, mn);
  for (const t of this.trigger)
    t.addEventListener("click", n(this, Il), {
      signal: e
    }), t.addEventListener("pointerenter", n(this, qu), {
      signal: e
    }), t.addEventListener("pointerleave", n(this, Zu), {
      signal: e
    }), t.classList.add("popupTriggerArea");
  for (const t of n(this, ka))
    t.container?.addEventListener("keydown", n(this, fr), {
      signal: e
    });
}, Sp = function() {
  const e = n(this, ka).find((t) => t.hasCommentButton);
  e && g(this, yn, e._normalizePoint(e.commentButtonPosition));
}, xp = function() {
  if (n(this, pe).extraPopupElement && !n(this, pe).editor)
    return;
  n(this, Yt) || this.renderCommentButton();
  const [e, t] = n(this, yn), {
    style: s
  } = n(this, Yt);
  s.left = `calc(${e}%)`, s.top = `calc(${t}% - var(--comment-button-dim))`;
}, Tp = function() {
  n(this, pe).extraPopupElement || (n(this, Yt) || this.renderCommentButton(), n(this, Yt).style.backgroundColor = this.commentButtonColor || "");
}, ou = function() {
  const e = n(this, bn), t = n(this, Pi);
  return e?.str && (!t?.str || t.str === e.str) && n(this, bn).html || null;
}, Cp = function() {
  return n(this, at, ou)?.attributes?.style?.fontSize || 0;
}, Dv = function() {
  return n(this, at, ou)?.attributes?.style?.color || null;
}, Mv = function(e) {
  const t = [], s = {
    str: e,
    html: {
      name: "div",
      attributes: {
        dir: "auto"
      },
      children: [{
        name: "p",
        children: t
      }]
    }
  }, i = {
    style: {
      color: n(this, at, Dv),
      fontSize: n(this, at, Cp) ? `calc(${n(this, at, Cp)}px * var(--total-scale-factor))` : ""
    }
  };
  for (const r of e.split(`
`))
    t.push({
      name: "span",
      value: r,
      attributes: i
    });
  return s;
}, Ov = function(e) {
  e.altKey || e.shiftKey || e.ctrlKey || e.metaKey || (e.key === "Enter" || e.key === "Escape" && n(this, Ri)) && w(this, at, lu).call(this);
}, Lv = function() {
  if (n(this, vn) !== null)
    return;
  const {
    page: {
      view: e
    },
    viewport: {
      rawDims: {
        pageWidth: t,
        pageHeight: s,
        pageX: i,
        pageY: r
      }
    }
  } = n(this, Rl);
  let a = !!n(this, Dl), o = a ? n(this, Dl) : n(this, Qc);
  for (const m of n(this, ka))
    if (!o || j.intersect(m.data.rect, o) !== null) {
      o = m.data.rect, a = !0;
      break;
    }
  const l = j.normalizeRect([o[0], e[3] - o[1] + e[1], o[2], e[3] - o[3] + e[1]]), d = a ? o[2] - o[0] + 5 : 0, u = l[0] + d, f = l[1];
  g(this, vn, [100 * (u - i) / t, 100 * (f - r) / s]);
  const {
    style: p
  } = n(this, Xt);
  p.left = `${n(this, vn)[0]}%`, p.top = `${n(this, vn)[1]}%`;
}, lu = function() {
  if (n(this, ds)) {
    n(this, ds).toggleCommentPopup(this, !1);
    return;
  }
  g(this, Ri, !n(this, Ri)), n(this, Ri) ? (w(this, at, hu).call(this), n(this, Xt).addEventListener("click", n(this, Il)), n(this, Xt).addEventListener("keydown", n(this, fr))) : (w(this, at, Ip).call(this), n(this, Xt).removeEventListener("click", n(this, Il)), n(this, Xt).removeEventListener("keydown", n(this, fr)));
}, hu = function() {
  n(this, us) || this.render(), this.isVisible ? n(this, Ri) && n(this, Xt).classList.add("focused") : (w(this, at, Lv).call(this), n(this, Xt).hidden = !1, n(this, Xt).style.zIndex = parseInt(n(this, Xt).style.zIndex) + 1e3);
}, Ip = function() {
  n(this, Xt).classList.remove("focused"), !(n(this, Ri) || !this.isVisible) && (n(this, Xt).hidden = !0, n(this, Xt).style.zIndex = parseInt(n(this, Xt).style.zIndex) - 1e3);
};
class Fv extends _t {
  constructor(e) {
    super(e, {
      isRenderable: !0,
      ignoreBorder: !0
    }), this.textContent = e.data.textContent, this.textPosition = e.data.textPosition, this.annotationEditorType = tt.FREETEXT;
  }
  render() {
    if (this.container.classList.add("freeTextAnnotation"), this.textContent) {
      const e = this.contentElement = document.createElement("div");
      e.classList.add("annotationTextContent"), e.setAttribute("role", "comment");
      for (const t of this.textContent) {
        const s = document.createElement("span");
        s.textContent = t, e.append(s);
      }
      this.container.append(e);
    }
    return !this.data.popupRef && this.hasPopupData && (this.hasOwnCommentButton = !0, this._createPopup()), this._editOnDoubleClick(), this.container;
  }
}
var Zc;
class EA extends _t {
  constructor(t) {
    super(t, {
      isRenderable: !0,
      ignoreBorder: !0
    });
    y(this, Zc, null);
  }
  render() {
    this.container.classList.add("lineAnnotation");
    const {
      data: t,
      width: s,
      height: i
    } = this, r = this.svgFactory.create(s, i, !0), a = g(this, Zc, this.svgFactory.createElement("svg:line"));
    return a.setAttribute("x1", t.rect[2] - t.lineCoordinates[0]), a.setAttribute("y1", t.rect[3] - t.lineCoordinates[1]), a.setAttribute("x2", t.rect[2] - t.lineCoordinates[2]), a.setAttribute("y2", t.rect[3] - t.lineCoordinates[3]), a.setAttribute("stroke-width", t.borderStyle.width || 1), a.setAttribute("stroke", "transparent"), a.setAttribute("fill", "transparent"), r.append(a), this.container.append(r), !t.popupRef && this.hasPopupData && (this.hasOwnCommentButton = !0, this._createPopup()), this.container;
  }
  getElementsToTriggerPopup() {
    return n(this, Zc);
  }
  addHighlightArea() {
    this.container.classList.add("highlightArea");
  }
}
Zc = new WeakMap();
var qc;
class SA extends _t {
  constructor(t) {
    super(t, {
      isRenderable: !0,
      ignoreBorder: !0
    });
    y(this, qc, null);
  }
  render() {
    this.container.classList.add("squareAnnotation");
    const {
      data: t,
      width: s,
      height: i
    } = this, r = this.svgFactory.create(s, i, !0), a = t.borderStyle.width, o = g(this, qc, this.svgFactory.createElement("svg:rect"));
    return o.setAttribute("x", a / 2), o.setAttribute("y", a / 2), o.setAttribute("width", s - a), o.setAttribute("height", i - a), o.setAttribute("stroke-width", a || 1), o.setAttribute("stroke", "transparent"), o.setAttribute("fill", "transparent"), r.append(o), this.container.append(r), !t.popupRef && this.hasPopupData && (this.hasOwnCommentButton = !0, this._createPopup()), this.container;
  }
  getElementsToTriggerPopup() {
    return n(this, qc);
  }
  addHighlightArea() {
    this.container.classList.add("highlightArea");
  }
}
qc = new WeakMap();
var td;
class xA extends _t {
  constructor(t) {
    super(t, {
      isRenderable: !0,
      ignoreBorder: !0
    });
    y(this, td, null);
  }
  render() {
    this.container.classList.add("circleAnnotation");
    const {
      data: t,
      width: s,
      height: i
    } = this, r = this.svgFactory.create(s, i, !0), a = t.borderStyle.width, o = g(this, td, this.svgFactory.createElement("svg:ellipse"));
    return o.setAttribute("cx", s / 2), o.setAttribute("cy", i / 2), o.setAttribute("rx", s / 2 - a / 2), o.setAttribute("ry", i / 2 - a / 2), o.setAttribute("stroke-width", a || 1), o.setAttribute("stroke", "transparent"), o.setAttribute("fill", "transparent"), r.append(o), this.container.append(r), !t.popupRef && this.hasPopupData && (this.hasOwnCommentButton = !0, this._createPopup()), this.container;
  }
  getElementsToTriggerPopup() {
    return n(this, td);
  }
  addHighlightArea() {
    this.container.classList.add("highlightArea");
  }
}
td = new WeakMap();
var ed;
class kv extends _t {
  constructor(t) {
    super(t, {
      isRenderable: !0,
      ignoreBorder: !0
    });
    y(this, ed, null);
    this.containerClassName = "polylineAnnotation", this.svgElementName = "svg:polyline";
  }
  render() {
    this.container.classList.add(this.containerClassName);
    const {
      data: {
        rect: t,
        vertices: s,
        borderStyle: i,
        popupRef: r
      },
      width: a,
      height: o
    } = this;
    if (!s)
      return this.container;
    const l = this.svgFactory.create(a, o, !0);
    let h = [];
    for (let u = 0, f = s.length; u < f; u += 2) {
      const p = s[u] - t[0], m = t[3] - s[u + 1];
      h.push(`${p},${m}`);
    }
    h = h.join(" ");
    const d = g(this, ed, this.svgFactory.createElement(this.svgElementName));
    return d.setAttribute("points", h), d.setAttribute("stroke-width", i.width || 1), d.setAttribute("stroke", "transparent"), d.setAttribute("fill", "transparent"), l.append(d), this.container.append(l), !r && this.hasPopupData && (this.hasOwnCommentButton = !0, this._createPopup()), this.container;
  }
  getElementsToTriggerPopup() {
    return n(this, ed);
  }
  addHighlightArea() {
    this.container.classList.add("highlightArea");
  }
}
ed = new WeakMap();
class TA extends kv {
  constructor(e) {
    super(e), this.containerClassName = "polygonAnnotation", this.svgElementName = "svg:polygon";
  }
}
class CA extends _t {
  constructor(e) {
    super(e, {
      isRenderable: !0,
      ignoreBorder: !0
    });
  }
  render() {
    return this.container.classList.add("caretAnnotation"), !this.data.popupRef && this.hasPopupData && (this.hasOwnCommentButton = !0, this._createPopup()), this.container;
  }
}
var sd, Ba, id, Pp;
class mg extends _t {
  constructor(t) {
    super(t, {
      isRenderable: !0,
      ignoreBorder: !0
    });
    y(this, id);
    y(this, sd, null);
    y(this, Ba, []);
    this.containerClassName = "inkAnnotation", this.svgElementName = "svg:polyline", this.annotationEditorType = this.data.it === "InkHighlight" ? tt.HIGHLIGHT : tt.INK;
  }
  render() {
    this.container.classList.add(this.containerClassName);
    const {
      data: {
        rect: t,
        rotation: s,
        inkLists: i,
        borderStyle: r,
        popupRef: a
      }
    } = this, {
      transform: o,
      width: l,
      height: h
    } = w(this, id, Pp).call(this, s, t), d = this.svgFactory.create(l, h, !0), u = g(this, sd, this.svgFactory.createElement("svg:g"));
    d.append(u), u.setAttribute("stroke-width", r.width || 1), u.setAttribute("stroke-linecap", "round"), u.setAttribute("stroke-linejoin", "round"), u.setAttribute("stroke-miterlimit", 10), u.setAttribute("stroke", "transparent"), u.setAttribute("fill", "transparent"), u.setAttribute("transform", o);
    for (let f = 0, p = i.length; f < p; f++) {
      const m = this.svgFactory.createElement(this.svgElementName);
      n(this, Ba).push(m), m.setAttribute("points", i[f].join(",")), u.append(m);
    }
    return !a && this.hasPopupData && (this.hasOwnCommentButton = !0, this._createPopup()), this.container.append(d), this._editOnDoubleClick(), this.container;
  }
  updateEdited(t) {
    super.updateEdited(t);
    const {
      thickness: s,
      points: i,
      rect: r
    } = t, a = n(this, sd);
    if (s >= 0 && a.setAttribute("stroke-width", s || 1), i)
      for (let o = 0, l = n(this, Ba).length; o < l; o++)
        n(this, Ba)[o].setAttribute("points", i[o].join(","));
    if (r) {
      const {
        transform: o,
        width: l,
        height: h
      } = w(this, id, Pp).call(this, this.data.rotation, r);
      a.parentElement.setAttribute("viewBox", `0 0 ${l} ${h}`), a.setAttribute("transform", o);
    }
  }
  getElementsToTriggerPopup() {
    return n(this, Ba);
  }
  addHighlightArea() {
    this.container.classList.add("highlightArea");
  }
}
sd = new WeakMap(), Ba = new WeakMap(), id = new WeakSet(), Pp = function(t, s) {
  switch (t) {
    case 90:
      return {
        transform: `rotate(90) translate(${-s[0]},${s[1]}) scale(1,-1)`,
        width: s[3] - s[1],
        height: s[2] - s[0]
      };
    case 180:
      return {
        transform: `rotate(180) translate(${-s[2]},${s[1]}) scale(1,-1)`,
        width: s[2] - s[0],
        height: s[3] - s[1]
      };
    case 270:
      return {
        transform: `rotate(270) translate(${-s[2]},${s[3]}) scale(1,-1)`,
        width: s[3] - s[1],
        height: s[2] - s[0]
      };
    default:
      return {
        transform: `translate(${-s[0]},${s[3]}) scale(1,-1)`,
        width: s[2] - s[0],
        height: s[3] - s[1]
      };
  }
};
class Nv extends _t {
  constructor(e) {
    super(e, {
      isRenderable: !0,
      ignoreBorder: !0,
      createQuadrilaterals: !0
    }), this.annotationEditorType = tt.HIGHLIGHT;
  }
  render() {
    const {
      data: {
        overlaidText: e,
        popupRef: t
      }
    } = this;
    if (!t && this.hasPopupData && (this.hasOwnCommentButton = !0, this._createPopup()), this.container.classList.add("highlightAnnotation"), this._editOnDoubleClick(), e) {
      const s = document.createElement("mark");
      s.classList.add("overlaidText"), s.textContent = e, this.container.append(s);
    }
    return this.container;
  }
}
class IA extends _t {
  constructor(e) {
    super(e, {
      isRenderable: !0,
      ignoreBorder: !0,
      createQuadrilaterals: !0
    });
  }
  render() {
    const {
      data: {
        overlaidText: e,
        popupRef: t
      }
    } = this;
    if (!t && this.hasPopupData && (this.hasOwnCommentButton = !0, this._createPopup()), this.container.classList.add("underlineAnnotation"), e) {
      const s = document.createElement("u");
      s.classList.add("overlaidText"), s.textContent = e, this.container.append(s);
    }
    return this.container;
  }
}
class PA extends _t {
  constructor(e) {
    super(e, {
      isRenderable: !0,
      ignoreBorder: !0,
      createQuadrilaterals: !0
    });
  }
  render() {
    const {
      data: {
        overlaidText: e,
        popupRef: t
      }
    } = this;
    if (!t && this.hasPopupData && (this.hasOwnCommentButton = !0, this._createPopup()), this.container.classList.add("squigglyAnnotation"), e) {
      const s = document.createElement("u");
      s.classList.add("overlaidText"), s.textContent = e, this.container.append(s);
    }
    return this.container;
  }
}
class RA extends _t {
  constructor(e) {
    super(e, {
      isRenderable: !0,
      ignoreBorder: !0,
      createQuadrilaterals: !0
    });
  }
  render() {
    const {
      data: {
        overlaidText: e,
        popupRef: t
      }
    } = this;
    if (!t && this.hasPopupData && (this.hasOwnCommentButton = !0, this._createPopup()), this.container.classList.add("strikeoutAnnotation"), e) {
      const s = document.createElement("s");
      s.classList.add("overlaidText"), s.textContent = e, this.container.append(s);
    }
    return this.container;
  }
}
class Bv extends _t {
  constructor(e) {
    super(e, {
      isRenderable: !0,
      ignoreBorder: !0
    }), this.annotationEditorType = tt.STAMP;
  }
  render() {
    return this.container.classList.add("stampAnnotation"), this.container.setAttribute("role", "img"), !this.data.popupRef && this.hasPopupData && (this.hasOwnCommentButton = !0, this._createPopup()), this._editOnDoubleClick(), this.container;
  }
}
var nd, rd, Rp;
class DA extends _t {
  constructor(t) {
    super(t, {
      isRenderable: !0
    });
    y(this, rd);
    y(this, nd, null);
    const {
      file: s
    } = this.data;
    this.filename = s.filename, this.content = s.content, this.linkService.eventBus?.dispatch("fileattachmentannotation", {
      source: this,
      ...s
    });
  }
  render() {
    this.container.classList.add("fileAttachmentAnnotation");
    const {
      container: t,
      data: s
    } = this;
    let i;
    s.hasAppearance || s.fillAlpha === 0 ? i = document.createElement("div") : (i = document.createElement("img"), i.src = `${this.imageResourcesPath}annotation-${/paperclip/i.test(s.name) ? "paperclip" : "pushpin"}.svg`, s.fillAlpha && s.fillAlpha < 1 && (i.style = `filter: opacity(${Math.round(s.fillAlpha * 100)}%);`)), i.addEventListener("dblclick", w(this, rd, Rp).bind(this)), g(this, nd, i);
    const {
      isMac: r
    } = de.platform;
    return t.addEventListener("keydown", (a) => {
      a.key === "Enter" && (r ? a.metaKey : a.ctrlKey) && w(this, rd, Rp).call(this);
    }), !s.popupRef && this.hasPopupData ? (this.hasOwnCommentButton = !0, this._createPopup()) : i.classList.add("popupTriggerArea"), t.append(i), t;
  }
  getElementsToTriggerPopup() {
    return n(this, nd);
  }
  addHighlightArea() {
    this.container.classList.add("highlightArea");
  }
}
nd = new WeakMap(), rd = new WeakSet(), Rp = function() {
  this.downloadManager?.openOrDownloadData(this.content, this.filename);
};
var Ua, Ha, Ol, yr, ad, $a, fs, od, Dn, cu, Mp;
const Tg = class Tg {
  constructor({
    div: e,
    accessibilityManager: t,
    annotationCanvasMap: s,
    annotationEditorUIManager: i,
    page: r,
    viewport: a,
    structTreeLayer: o,
    commentManager: l,
    linkService: h,
    annotationStorage: d
  }) {
    y(this, Dn);
    y(this, Ua, null);
    y(this, Ha, null);
    y(this, Ol, null);
    y(this, yr, /* @__PURE__ */ new Map());
    y(this, ad, null);
    y(this, $a, null);
    y(this, fs, []);
    y(this, od, !1);
    this.div = e, g(this, Ua, t), g(this, Ha, s), g(this, ad, o || null), g(this, $a, h || null), g(this, Ol, d || new dg()), this.page = r, this.viewport = a, this.zIndex = 0, this._annotationEditorUIManager = i, this._commentManager = l || null;
  }
  hasEditableAnnotations() {
    return n(this, yr).size > 0;
  }
  async render(e) {
    const {
      annotations: t
    } = e, s = this.div;
    ao(s, this.viewport);
    const i = /* @__PURE__ */ new Map(), r = [], a = {
      data: null,
      layer: s,
      linkService: n(this, $a),
      downloadManager: e.downloadManager,
      imageResourcesPath: e.imageResourcesPath || "",
      renderForms: e.renderForms !== !1,
      svgFactory: new Lu(),
      annotationStorage: n(this, Ol),
      enableComment: e.enableComment === !0,
      enableScripting: e.enableScripting === !0,
      hasJSActions: e.hasJSActions,
      fieldObjects: e.fieldObjects,
      parent: this,
      elements: null
    };
    for (const o of t) {
      if (o.noHTML)
        continue;
      const l = o.annotationType === ie.POPUP;
      if (l) {
        const u = i.get(o.id);
        if (!u)
          continue;
        if (!this._commentManager) {
          r.push(o);
          continue;
        }
        a.elements = u;
      } else if (o.rect[2] === o.rect[0] || o.rect[3] === o.rect[1])
        continue;
      a.data = o;
      const h = Pf.create(a);
      if (!h.isRenderable)
        continue;
      l || (n(this, fs).push(h), o.popupRef && i.getOrInsertComputed(o.popupRef, ag).push(h));
      const d = h.render();
      o.hidden && (d.style.visibility = "hidden"), h._isEditable && (n(this, yr).set(h.data.id, h), this._annotationEditorUIManager?.renderAnnotationElement(h));
    }
    await w(this, Dn, cu).call(this);
    for (const o of r) {
      const l = a.elements = i.get(o.id);
      a.data = o;
      const h = Pf.create(a);
      if (!h.isRenderable)
        continue;
      const d = h.render();
      h.contentElement.id = `${Eo}${o.id}`, o.hidden && (d.style.visibility = "hidden"), l.at(-1).container.after(d);
    }
    w(this, Dn, Mp).call(this);
  }
  async addLinkAnnotations(e) {
    const t = {
      data: null,
      layer: this.div,
      linkService: n(this, $a),
      svgFactory: new Lu(),
      parent: this
    };
    for (const s of e) {
      s.borderStyle || (s.borderStyle = Tg._defaultBorderStyle), t.data = s;
      const i = Pf.create(t);
      i.isRenderable && (i.render(), i.contentElement.id = `${Eo}${s.id}`, n(this, fs).push(i));
    }
    await w(this, Dn, cu).call(this);
  }
  update({
    viewport: e
  }) {
    const t = this.div;
    this.viewport = e, ao(t, {
      rotation: e.rotation
    }), w(this, Dn, Mp).call(this), t.hidden = !1;
  }
  getEditableAnnotations() {
    return n(this, yr).values();
  }
  getEditableAnnotation(e) {
    return n(this, yr).get(e);
  }
  addFakeAnnotation(e) {
    const {
      div: t
    } = this, {
      id: s,
      rotation: i
    } = e, r = new pA({
      data: {
        id: s,
        rect: e.getPDFRect(),
        rotation: i
      },
      editor: e,
      layer: t,
      parent: this,
      enableComment: !!this._commentManager,
      linkService: n(this, $a),
      annotationStorage: n(this, Ol)
    });
    return r.render(), r.contentElement.id = `${Eo}${s}`, r.createOrUpdatePopup(), n(this, fs).push(r), r;
  }
  removeAnnotation(e) {
    const t = n(this, fs).findIndex((i) => i.data.id === e);
    if (t < 0)
      return;
    const [s] = n(this, fs).splice(t, 1);
    n(this, Ua)?.removePointerInTextLayer(s.contentElement);
  }
  updateFakeAnnotations(e) {
    if (e.length !== 0) {
      for (const t of e)
        t.updateFakeAnnotationElement(this);
      w(this, Dn, cu).call(this);
    }
  }
  togglePointerEvents(e = !1) {
    this.div.classList.toggle("disabled", !e);
  }
  static get _defaultBorderStyle() {
    return nt(this, "_defaultBorderStyle", Object.freeze({
      width: 1,
      rawWidth: 1,
      style: fo.SOLID,
      dashArray: [3],
      horizontalCornerRadius: 0,
      verticalCornerRadius: 0
    }));
  }
};
Ua = new WeakMap(), Ha = new WeakMap(), Ol = new WeakMap(), yr = new WeakMap(), ad = new WeakMap(), $a = new WeakMap(), fs = new WeakMap(), od = new WeakMap(), Dn = new WeakSet(), cu = async function() {
  if (n(this, fs).length === 0)
    return;
  this.div.replaceChildren();
  const e = [];
  if (!n(this, od)) {
    g(this, od, !0);
    for (const {
      contentElement: s,
      data: {
        id: i
      }
    } of n(this, fs)) {
      const r = s.id = `${Eo}${i}`;
      e.push(n(this, ad)?.getAriaAttributes(r).then((a) => {
        if (a)
          for (const [o, l] of a)
            s.setAttribute(o, l);
      }));
    }
  }
  n(this, fs).sort(({
    data: {
      rect: [s, i, r, a]
    }
  }, {
    data: {
      rect: [o, l, h, d]
    }
  }) => {
    if (s === r && i === a)
      return 1;
    if (o === h && l === d)
      return -1;
    const u = a, f = i, p = (i + a) / 2, m = d, v = l, A = (l + d) / 2;
    if (p >= m && A <= f)
      return -1;
    if (A >= u && p <= v)
      return 1;
    const b = (s + r) / 2, E = (o + h) / 2;
    return b - E;
  });
  const t = document.createDocumentFragment();
  for (const s of n(this, fs))
    t.append(s.container), this._commentManager ? (s.extraPopupElement?.popup || s.popup)?.renderCommentButton() : s.extraPopupElement && t.append(s.extraPopupElement.render());
  if (this.div.append(t), await Promise.all(e), n(this, Ua))
    for (const s of n(this, fs))
      n(this, Ua).addPointerInTextLayer(s.contentElement, !1);
}, Mp = function() {
  if (!n(this, Ha))
    return;
  const e = this.div;
  for (const [t, s] of n(this, Ha)) {
    const i = e.querySelector(`[data-annotation-id="${t}"]`);
    if (!i)
      continue;
    s.className = "annotationContent";
    const {
      firstChild: r
    } = i;
    r ? r.nodeName === "CANVAS" ? r.replaceWith(s) : r.classList.contains("annotationContent") ? r.after(s) : r.before(s) : i.append(s);
    const a = n(this, yr).get(t);
    a && (a._hasNoCanvas ? (this._annotationEditorUIManager?.setMissingCanvas(t, i.id, s), a._hasNoCanvas = !1) : a.canvas = s);
  }
  n(this, Ha).clear();
};
let Dp = Tg;
const Hd = /\r\n?|\n/g;
var ps, ld, ja, gs, re, Uv, Hv, $v, du, Mn, uu, fu, jv, Lp, Gv;
const Nt = class Nt extends kt {
  constructor(t) {
    super({
      ...t,
      name: "freeTextEditor"
    });
    y(this, re);
    y(this, ps, "");
    y(this, ld, `${this.id}-editor`);
    y(this, ja, null);
    y(this, gs);
    R(this, "_colorPicker", null);
    this.color = t.color || Nt._defaultColor || kt._defaultLineColor, g(this, gs, t.fontSize || Nt._defaultFontSize), this.annotationElementId || this._uiManager.a11yAlert("pdfjs-editor-freetext-added-alert"), this.canAddComment = !1;
  }
  static get _keyboardManager() {
    const t = Nt.prototype, s = (a) => a.isEmpty(), i = oo.TRANSLATE_SMALL, r = oo.TRANSLATE_BIG;
    return nt(this, "_keyboardManager", new Md([[["ctrl+s", "mac+meta+s", "ctrl+p", "mac+meta+p"], t.commitOrRemove, {
      bubbles: !0
    }], [["ctrl+Enter", "mac+meta+Enter", "Escape", "mac+Escape"], t.commitOrRemove], [["ArrowLeft", "mac+ArrowLeft"], t._translateEmpty, {
      args: [-i, 0],
      checker: s
    }], [["ctrl+ArrowLeft", "mac+shift+ArrowLeft"], t._translateEmpty, {
      args: [-r, 0],
      checker: s
    }], [["ArrowRight", "mac+ArrowRight"], t._translateEmpty, {
      args: [i, 0],
      checker: s
    }], [["ctrl+ArrowRight", "mac+shift+ArrowRight"], t._translateEmpty, {
      args: [r, 0],
      checker: s
    }], [["ArrowUp", "mac+ArrowUp"], t._translateEmpty, {
      args: [0, -i],
      checker: s
    }], [["ctrl+ArrowUp", "mac+shift+ArrowUp"], t._translateEmpty, {
      args: [0, -r],
      checker: s
    }], [["ArrowDown", "mac+ArrowDown"], t._translateEmpty, {
      args: [0, i],
      checker: s
    }], [["ctrl+ArrowDown", "mac+shift+ArrowDown"], t._translateEmpty, {
      args: [0, r],
      checker: s
    }]]));
  }
  static initialize(t, s) {
    kt.initialize(t, s);
    const i = getComputedStyle(document.documentElement);
    this._internalPadding = parseFloat(i.getPropertyValue("--freetext-padding"));
  }
  static updateDefaultParams(t, s) {
    switch (t) {
      case ut.FREETEXT_SIZE:
        Nt._defaultFontSize = s;
        break;
      case ut.FREETEXT_COLOR:
        Nt._defaultColor = s;
        break;
    }
  }
  updateParams(t, s) {
    switch (t) {
      case ut.FREETEXT_SIZE:
        w(this, re, Uv).call(this, s);
        break;
      case ut.FREETEXT_COLOR:
        w(this, re, Hv).call(this, s);
        break;
    }
  }
  static get defaultPropertiesToUpdate() {
    return [[ut.FREETEXT_SIZE, Nt._defaultFontSize], [ut.FREETEXT_COLOR, Nt._defaultColor || kt._defaultLineColor]];
  }
  get propertiesToUpdate() {
    return [[ut.FREETEXT_SIZE, n(this, gs)], [ut.FREETEXT_COLOR, this.color]];
  }
  get toolbarButtons() {
    return this._colorPicker || (this._colorPicker = new Ou(this)), [["colorPicker", this._colorPicker]];
  }
  get colorType() {
    return ut.FREETEXT_COLOR;
  }
  onUpdatedColor() {
    this.editorDiv.style.color = this.color, this._colorPicker?.update(this.color), super.onUpdatedColor();
  }
  _translateEmpty(t, s) {
    this._uiManager.translateSelectedEditors(t, s, !0);
  }
  getInitialTranslation() {
    const t = this.parentScale;
    return [-Nt._internalPadding * t, -(Nt._internalPadding + n(this, gs)) * t];
  }
  rebuild() {
    this.parent && (super.rebuild(), this.div !== null && (this.isAttachedToDOM || this.parent.add(this)));
  }
  enableEditMode() {
    if (!super.enableEditMode())
      return !1;
    this.overlayDiv.classList.remove("enabled"), this.editorDiv.contentEditable = !0, this._isDraggable = !1, this.div.removeAttribute("aria-activedescendant"), g(this, ja, new AbortController());
    const t = this._uiManager.combinedSignal(n(this, ja));
    return this.editorDiv.addEventListener("keydown", this.editorDivKeydown.bind(this), {
      signal: t
    }), this.editorDiv.addEventListener("focus", this.editorDivFocus.bind(this), {
      signal: t
    }), this.editorDiv.addEventListener("blur", this.editorDivBlur.bind(this), {
      signal: t
    }), this.editorDiv.addEventListener("input", this.editorDivInput.bind(this), {
      signal: t
    }), this.editorDiv.addEventListener("paste", this.editorDivPaste.bind(this), {
      signal: t
    }), !0;
  }
  disableEditMode() {
    return super.disableEditMode() ? (this.overlayDiv.classList.add("enabled"), this.editorDiv.contentEditable = !1, this.div.setAttribute("aria-activedescendant", n(this, ld)), this._isDraggable = !0, n(this, ja)?.abort(), g(this, ja, null), this.div.focus({
      preventScroll: !0
    }), this.isEditing = !1, this.parent.div.classList.add("freetextEditing"), !0) : !1;
  }
  focusin(t) {
    this._focusEventsAllowed && (super.focusin(t), t.target !== this.editorDiv && this.editorDiv.focus());
  }
  onceAdded(t) {
    this.width || (this.enableEditMode(), t && this.editorDiv.focus(), this._initialOptions?.isCentered && this.center(), this._initialOptions = null);
  }
  isEmpty() {
    return !this.editorDiv || this.editorDiv.innerText.trim() === "";
  }
  remove() {
    this.isEditing = !1, this.parent && (this.parent.setEditingState(!0), this.parent.div.classList.add("freetextEditing")), super.remove();
  }
  commit() {
    if (!this.isInEditMode())
      return;
    super.commit(), this.disableEditMode();
    const t = n(this, ps), s = g(this, ps, w(this, re, $v).call(this).trimEnd());
    if (t === s)
      return;
    const i = (r) => {
      if (g(this, ps, r), !r) {
        this.remove();
        return;
      }
      w(this, re, fu).call(this), this._uiManager.rebuild(this), w(this, re, du).call(this);
    };
    this.addCommands({
      cmd: () => {
        i(s);
      },
      undo: () => {
        i(t);
      },
      mustExec: !1
    }), w(this, re, du).call(this);
  }
  shouldGetKeyboardEvents() {
    return this.isInEditMode();
  }
  enterInEditMode() {
    this.enableEditMode(), this.editorDiv.focus();
  }
  keydown(t) {
    t.target === this.div && t.key === "Enter" && (this.enterInEditMode(), t.preventDefault());
  }
  editorDivKeydown(t) {
    Nt._keyboardManager.exec(this, t);
  }
  editorDivFocus(t) {
    this.isEditing = !0;
  }
  editorDivBlur(t) {
    this.isEditing = !1;
  }
  editorDivInput(t) {
    this.parent.div.classList.toggle("freetextEditing", this.isEmpty());
  }
  disableEditing() {
    this.editorDiv.setAttribute("role", "comment"), this.editorDiv.removeAttribute("aria-multiline");
  }
  enableEditing() {
    this.editorDiv.setAttribute("role", "textbox"), this.editorDiv.setAttribute("aria-multiline", !0);
  }
  get canChangeContent() {
    return !0;
  }
  render() {
    if (this.div)
      return this.div;
    let t, s;
    (this._isCopy || this.annotationElementId) && (t = this.x, s = this.y), super.render(), this.editorDiv = document.createElement("div"), this.editorDiv.className = "internal", this.editorDiv.setAttribute("id", n(this, ld)), this.editorDiv.setAttribute("data-l10n-id", "pdfjs-free-text2"), this.editorDiv.setAttribute("data-l10n-attrs", "default-content"), this.enableEditing(), this.editorDiv.contentEditable = !0;
    const {
      style: i
    } = this.editorDiv;
    if (i.fontSize = `calc(${n(this, gs)}px * var(--total-scale-factor))`, i.color = this.color, this.div.append(this.editorDiv), this.overlayDiv = document.createElement("div"), this.overlayDiv.classList.add("overlay", "enabled"), this.div.append(this.overlayDiv), this._isCopy || this.annotationElementId) {
      const [r, a] = this.parentDimensions;
      if (this.annotationElementId) {
        const {
          position: o
        } = this._initialData;
        let [l, h] = this.getInitialTranslation();
        [l, h] = this.pageTranslationToScreen(l, h);
        const [d, u] = this.pageDimensions, [f, p] = this.pageTranslation;
        let m, v;
        switch (this.rotation) {
          case 0:
            m = t + (o[0] - f) / d, v = s + this.height - (o[1] - p) / u;
            break;
          case 90:
            m = t + (o[0] - f) / d, v = s - (o[1] - p) / u, [l, h] = [h, -l];
            break;
          case 180:
            m = t - this.width + (o[0] - f) / d, v = s - (o[1] - p) / u, [l, h] = [-l, -h];
            break;
          case 270:
            m = t + (o[0] - f - this.height * u) / d, v = s + (o[1] - p - this.width * d) / u, [l, h] = [-h, l];
            break;
        }
        this.setAt(m * r, v * a, l, h);
      } else
        this._moveAfterPaste(t, s);
      w(this, re, fu).call(this), this._isDraggable = !0, this.editorDiv.contentEditable = !1;
    } else
      this._isDraggable = !1, this.editorDiv.contentEditable = !0;
    return this.div;
  }
  editorDivPaste(t) {
    var m, v, A;
    const s = t.clipboardData || window.clipboardData, {
      types: i
    } = s;
    if (i.length === 1 && i[0] === "text/plain")
      return;
    t.preventDefault();
    const r = w(m = Nt, Mn, Lp).call(m, s.getData("text") || "").replaceAll(Hd, `
`);
    if (!r)
      return;
    const a = window.getSelection();
    if (!a.rangeCount)
      return;
    this.editorDiv.normalize(), a.deleteFromDocument();
    const o = a.getRangeAt(0);
    if (!r.includes(`
`)) {
      o.insertNode(document.createTextNode(r)), this.editorDiv.normalize(), a.collapseToStart();
      return;
    }
    const {
      startContainer: l,
      startOffset: h
    } = o, d = [], u = [];
    if (l.nodeType === Node.TEXT_NODE) {
      const b = l.parentElement;
      if (u.push(l.nodeValue.slice(h).replaceAll(Hd, "")), b !== this.editorDiv) {
        let E = d;
        for (const S of this.editorDiv.childNodes) {
          if (S === b) {
            E = u;
            continue;
          }
          E.push(w(v = Nt, Mn, uu).call(v, S));
        }
      }
      d.push(l.nodeValue.slice(0, h).replaceAll(Hd, ""));
    } else if (l === this.editorDiv) {
      let b = d, E = 0;
      for (const S of this.editorDiv.childNodes)
        E++ === h && (b = u), b.push(w(A = Nt, Mn, uu).call(A, S));
    }
    g(this, ps, `${d.join(`
`)}${r}${u.join(`
`)}`), w(this, re, fu).call(this);
    const f = new Range();
    let p = Math.sumPrecise(d.map((b) => b.length));
    for (const {
      firstChild: b
    } of this.editorDiv.childNodes)
      if (b.nodeType === Node.TEXT_NODE) {
        const E = b.nodeValue.length;
        if (p <= E) {
          f.setStart(b, p), f.setEnd(b, p);
          break;
        }
        p -= E;
      }
    a.removeAllRanges(), a.addRange(f);
  }
  get contentDiv() {
    return this.editorDiv;
  }
  getPDFRect() {
    const t = Nt._internalPadding * this.parentScale;
    return this.getRect(t, t);
  }
  static async deserialize(t, s, i) {
    var o;
    let r = null;
    if (t instanceof Fv) {
      const {
        data: {
          defaultAppearanceData: {
            fontSize: l,
            fontColor: h
          },
          rect: d,
          rotation: u,
          id: f,
          popupRef: p,
          richText: m,
          contentsObj: v,
          creationDate: A,
          modificationDate: b
        },
        textContent: E,
        textPosition: S,
        parent: {
          page: {
            pageNumber: T
          }
        }
      } = t;
      if (!E || E.length === 0)
        return null;
      r = t = {
        annotationType: tt.FREETEXT,
        color: Array.from(h),
        fontSize: l,
        value: E.join(`
`),
        position: S,
        pageIndex: T - 1,
        rect: d.slice(0),
        rotation: u,
        annotationElementId: f,
        id: f,
        deleted: !1,
        popupRef: p,
        comment: v?.str || null,
        richText: m,
        creationDate: A,
        modificationDate: b
      };
    }
    const a = await super.deserialize(t, s, i);
    return g(a, gs, t.fontSize), a.color = j.makeHexColor(...t.color), g(a, ps, w(o = Nt, Mn, Lp).call(o, t.value)), a._initialData = r, t.comment && a.setCommentData(t), a;
  }
  serialize(t = !1) {
    if (this.isEmpty())
      return null;
    if (this.deleted)
      return this.serializeDeleted();
    const s = kt._colorManager.convert(this.isAttachedToDOM ? getComputedStyle(this.editorDiv).color : this.color), i = Object.assign(super.serialize(t), {
      color: s,
      fontSize: n(this, gs),
      value: w(this, re, jv).call(this)
    });
    return this.addComment(i), t ? (i.isCopy = !0, i) : this.annotationElementId && !w(this, re, Gv).call(this, i) ? null : (i.id = this.annotationElementId, i);
  }
  renderAnnotationElement(t) {
    const s = super.renderAnnotationElement(t);
    if (!s)
      return null;
    const {
      style: i
    } = s;
    i.fontSize = `calc(${n(this, gs)}px * var(--total-scale-factor))`, i.color = this.color, s.replaceChildren();
    for (const r of n(this, ps).split(`
`)) {
      const a = document.createElement("div");
      a.append(r ? document.createTextNode(r) : document.createElement("br")), s.append(a);
    }
    return t.updateEdited({
      rect: this.getPDFRect(),
      popup: this._uiManager.hasCommentManager() || this.hasEditedComment ? this.comment : {
        text: n(this, ps)
      }
    }), s;
  }
  resetAnnotationElement(t) {
    super.resetAnnotationElement(t), t.resetEdited();
  }
};
ps = new WeakMap(), ld = new WeakMap(), ja = new WeakMap(), gs = new WeakMap(), re = new WeakSet(), Uv = function(t) {
  const s = (r) => {
    this.editorDiv.style.fontSize = `calc(${r}px * var(--total-scale-factor))`, this.translate(0, -(r - n(this, gs)) * this.parentScale), g(this, gs, r), w(this, re, du).call(this);
  }, i = n(this, gs);
  this.addCommands({
    cmd: s.bind(this, t),
    undo: s.bind(this, i),
    post: this._uiManager.updateUI.bind(this._uiManager, this),
    mustExec: !0,
    type: ut.FREETEXT_SIZE,
    overwriteIfSameType: !0,
    keepUndo: !0
  });
}, Hv = function(t) {
  const s = (r) => {
    this.color = r, this.onUpdatedColor();
  }, i = this.color;
  this.addCommands({
    cmd: s.bind(this, t),
    undo: s.bind(this, i),
    post: this._uiManager.updateUI.bind(this._uiManager, this),
    mustExec: !0,
    type: ut.FREETEXT_COLOR,
    overwriteIfSameType: !0,
    keepUndo: !0
  });
}, $v = function() {
  var i;
  const t = [];
  this.editorDiv.normalize();
  let s = null;
  for (const r of this.editorDiv.childNodes)
    s?.nodeType === Node.TEXT_NODE && r.nodeName === "BR" || (t.push(w(i = Nt, Mn, uu).call(i, r)), s = r);
  return t.join(`
`);
}, du = function() {
  const [t, s] = this.parentDimensions;
  let i;
  if (this.isAttachedToDOM)
    i = this.div.getBoundingClientRect();
  else {
    const {
      currentLayer: r,
      div: a
    } = this, o = a.style.display, l = a.classList.contains("hidden");
    a.classList.remove("hidden"), a.style.display = "hidden", r.div.append(this.div), i = a.getBoundingClientRect(), a.remove(), a.style.display = o, a.classList.toggle("hidden", l);
  }
  this.rotation % 180 === this.parentRotation % 180 ? (this.width = i.width / t, this.height = i.height / s) : (this.width = i.height / t, this.height = i.width / s), this.fixAndSetPosition();
}, Mn = new WeakSet(), uu = function(t) {
  return (t.nodeType === Node.TEXT_NODE ? t.nodeValue : t.innerText).replaceAll(Hd, "");
}, fu = function() {
  if (this.editorDiv.replaceChildren(), !!n(this, ps))
    for (const t of n(this, ps).split(`
`)) {
      const s = document.createElement("div");
      s.append(t ? document.createTextNode(t) : document.createElement("br")), this.editorDiv.append(s);
    }
}, jv = function() {
  return n(this, ps).replaceAll(" ", " ");
}, Lp = function(t) {
  return t.replaceAll(" ", " ");
}, Gv = function(t) {
  const {
    value: s,
    fontSize: i,
    color: r,
    pageIndex: a
  } = this._initialData;
  return this.hasEditedComment || this._hasBeenMoved || t.value !== s || t.fontSize !== i || t.color.some((o, l) => o !== r[l]) || t.pageIndex !== a;
}, y(Nt, Mn), R(Nt, "_freeTextDefaultContent", ""), R(Nt, "_internalPadding", 0), R(Nt, "_defaultColor", null), R(Nt, "_defaultFontSize", 10), R(Nt, "_type", "freetext"), R(Nt, "_editorType", tt.FREETEXT);
let Op = Nt;
class V {
  toSVGPath() {
    bt("Abstract method `toSVGPath` must be implemented.");
  }
  get box() {
    bt("Abstract getter `box` must be implemented.");
  }
  serialize(e, t) {
    bt("Abstract method `serialize` must be implemented.");
  }
  static _rescale(e, t, s, i, r, a) {
    a || (a = new Float32Array(e.length));
    for (let o = 0, l = e.length; o < l; o += 2)
      a[o] = t + e[o] * i, a[o + 1] = s + e[o + 1] * r;
    return a;
  }
  static _rescaleAndSwap(e, t, s, i, r, a) {
    a || (a = new Float32Array(e.length));
    for (let o = 0, l = e.length; o < l; o += 2)
      a[o] = t + e[o + 1] * i, a[o + 1] = s + e[o] * r;
    return a;
  }
  static _translate(e, t, s, i) {
    i || (i = new Float32Array(e.length));
    for (let r = 0, a = e.length; r < a; r += 2)
      i[r] = t + e[r], i[r + 1] = s + e[r + 1];
    return i;
  }
  static svgRound(e) {
    return Math.round(e * 1e4);
  }
  static _normalizePoint(e, t, s, i, r) {
    switch (r) {
      case 90:
        return [1 - t / s, e / i];
      case 180:
        return [1 - e / s, 1 - t / i];
      case 270:
        return [t / s, 1 - e / i];
      default:
        return [e / s, t / i];
    }
  }
  static _normalizePagePoint(e, t, s) {
    switch (s) {
      case 90:
        return [1 - t, e];
      case 180:
        return [1 - e, 1 - t];
      case 270:
        return [t, 1 - e];
      default:
        return [e, t];
    }
  }
  static createBezierPoints(e, t, s, i, r, a) {
    return [(e + 5 * s) / 6, (t + 5 * i) / 6, (5 * s + r) / 6, (5 * i + a) / 6, (s + r) / 2, (i + a) / 2];
  }
}
R(V, "PRECISION", 1e-4);
var ms, ii, Ll, Fl, Di, ot, Ga, _a, hd, cd, kl, Nl, br, dd, tf, ef, ce, Ch, _v, Wv, Vv, zv, Xv, Yv;
const zi = class zi {
  constructor({
    x: e,
    y: t
  }, s, i, r, a, o = 0) {
    y(this, ce);
    y(this, ms);
    y(this, ii, []);
    y(this, Ll);
    y(this, Fl);
    y(this, Di, []);
    y(this, ot, new Float32Array(18));
    y(this, Ga);
    y(this, _a);
    y(this, hd);
    y(this, cd);
    y(this, kl);
    y(this, Nl);
    y(this, br, []);
    g(this, ms, s), g(this, Nl, r * i), g(this, Fl, a), n(this, ot).set([NaN, NaN, NaN, NaN, e, t], 6), g(this, Ll, o), g(this, cd, n(zi, dd) * i), g(this, hd, n(zi, ef) * i), g(this, kl, i), n(this, br).push(e, t);
  }
  isEmpty() {
    return isNaN(n(this, ot)[8]);
  }
  add({
    x: e,
    y: t
  }) {
    g(this, Ga, e), g(this, _a, t);
    const [s, i, r, a] = n(this, ms);
    let [o, l, h, d] = n(this, ot).subarray(8, 12);
    const u = e - h, f = t - d, p = Math.hypot(u, f);
    if (p < n(this, hd))
      return !1;
    const m = p - n(this, cd), v = m / p, A = v * u, b = v * f;
    let E = o, S = l;
    o = h, l = d, h += A, d += b, n(this, br)?.push(e, t);
    const T = -b / m, x = A / m, C = T * n(this, Nl), I = x * n(this, Nl);
    return n(this, ot).set(n(this, ot).subarray(2, 8), 0), n(this, ot).set([h + C, d + I], 4), n(this, ot).set(n(this, ot).subarray(14, 18), 12), n(this, ot).set([h - C, d - I], 16), isNaN(n(this, ot)[6]) ? (n(this, Di).length === 0 && (n(this, ot).set([o + C, l + I], 2), n(this, Di).push(NaN, NaN, NaN, NaN, (o + C - s) / r, (l + I - i) / a), n(this, ot).set([o - C, l - I], 14), n(this, ii).push(NaN, NaN, NaN, NaN, (o - C - s) / r, (l - I - i) / a)), n(this, ot).set([E, S, o, l, h, d], 6), !this.isEmpty()) : (n(this, ot).set([E, S, o, l, h, d], 6), Math.abs(Math.atan2(S - l, E - o) - Math.atan2(b, A)) < Math.PI / 2 ? ([o, l, h, d] = n(this, ot).subarray(2, 6), n(this, Di).push(NaN, NaN, NaN, NaN, ((o + h) / 2 - s) / r, ((l + d) / 2 - i) / a), [o, l, E, S] = n(this, ot).subarray(14, 18), n(this, ii).push(NaN, NaN, NaN, NaN, ((E + o) / 2 - s) / r, ((S + l) / 2 - i) / a), !0) : ([E, S, o, l, h, d] = n(this, ot).subarray(0, 6), n(this, Di).push(((E + 5 * o) / 6 - s) / r, ((S + 5 * l) / 6 - i) / a, ((5 * o + h) / 6 - s) / r, ((5 * l + d) / 6 - i) / a, ((o + h) / 2 - s) / r, ((l + d) / 2 - i) / a), [h, d, o, l, E, S] = n(this, ot).subarray(12, 18), n(this, ii).push(((E + 5 * o) / 6 - s) / r, ((S + 5 * l) / 6 - i) / a, ((5 * o + h) / 6 - s) / r, ((5 * l + d) / 6 - i) / a, ((o + h) / 2 - s) / r, ((l + d) / 2 - i) / a), !0));
  }
  toSVGPath() {
    if (this.isEmpty())
      return "";
    const e = n(this, Di), t = n(this, ii);
    if (isNaN(n(this, ot)[6]) && !this.isEmpty())
      return w(this, ce, _v).call(this);
    const s = [];
    s.push(`M${e[4]} ${e[5]}`);
    for (let i = 6; i < e.length; i += 6)
      isNaN(e[i]) ? s.push(`L${e[i + 4]} ${e[i + 5]}`) : s.push(`C${e[i]} ${e[i + 1]} ${e[i + 2]} ${e[i + 3]} ${e[i + 4]} ${e[i + 5]}`);
    w(this, ce, Vv).call(this, s);
    for (let i = t.length - 6; i >= 6; i -= 6)
      isNaN(t[i]) ? s.push(`L${t[i + 4]} ${t[i + 5]}`) : s.push(`C${t[i]} ${t[i + 1]} ${t[i + 2]} ${t[i + 3]} ${t[i + 4]} ${t[i + 5]}`);
    return w(this, ce, Wv).call(this, s), s.join(" ");
  }
  newFreeDrawOutline(e, t, s, i, r, a) {
    return new Kv(e, t, s, i, r, a);
  }
  getOutlines() {
    const e = n(this, Di), t = n(this, ii), s = n(this, ot), [i, r, a, o] = n(this, ms), l = new Float32Array((n(this, br)?.length ?? 0) + 2);
    for (let u = 0, f = l.length - 2; u < f; u += 2)
      l[u] = (n(this, br)[u] - i) / a, l[u + 1] = (n(this, br)[u + 1] - r) / o;
    if (l[l.length - 2] = (n(this, Ga) - i) / a, l[l.length - 1] = (n(this, _a) - r) / o, isNaN(s[6]) && !this.isEmpty())
      return w(this, ce, zv).call(this, l);
    const h = new Float32Array(n(this, Di).length + 24 + n(this, ii).length);
    let d = e.length;
    for (let u = 0; u < d; u += 2) {
      if (isNaN(e[u])) {
        h[u] = h[u + 1] = NaN;
        continue;
      }
      h[u] = e[u], h[u + 1] = e[u + 1];
    }
    d = w(this, ce, Yv).call(this, h, d);
    for (let u = t.length - 6; u >= 6; u -= 6)
      for (let f = 0; f < 6; f += 2) {
        if (isNaN(t[u + f])) {
          h[d] = h[d + 1] = NaN, d += 2;
          continue;
        }
        h[d] = t[u + f], h[d + 1] = t[u + f + 1], d += 2;
      }
    return w(this, ce, Xv).call(this, h, d), this.newFreeDrawOutline(h, l, n(this, ms), n(this, kl), n(this, Ll), n(this, Fl));
  }
};
ms = new WeakMap(), ii = new WeakMap(), Ll = new WeakMap(), Fl = new WeakMap(), Di = new WeakMap(), ot = new WeakMap(), Ga = new WeakMap(), _a = new WeakMap(), hd = new WeakMap(), cd = new WeakMap(), kl = new WeakMap(), Nl = new WeakMap(), br = new WeakMap(), dd = new WeakMap(), tf = new WeakMap(), ef = new WeakMap(), ce = new WeakSet(), Ch = function() {
  const e = n(this, ot).subarray(4, 6), t = n(this, ot).subarray(16, 18), [s, i, r, a] = n(this, ms);
  return [(n(this, Ga) + (e[0] - t[0]) / 2 - s) / r, (n(this, _a) + (e[1] - t[1]) / 2 - i) / a, (n(this, Ga) + (t[0] - e[0]) / 2 - s) / r, (n(this, _a) + (t[1] - e[1]) / 2 - i) / a];
}, _v = function() {
  const [e, t, s, i] = n(this, ms), [r, a, o, l] = w(this, ce, Ch).call(this);
  return `M${(n(this, ot)[2] - e) / s} ${(n(this, ot)[3] - t) / i} L${(n(this, ot)[4] - e) / s} ${(n(this, ot)[5] - t) / i} L${r} ${a} L${o} ${l} L${(n(this, ot)[16] - e) / s} ${(n(this, ot)[17] - t) / i} L${(n(this, ot)[14] - e) / s} ${(n(this, ot)[15] - t) / i} Z`;
}, Wv = function(e) {
  const t = n(this, ii);
  e.push(`L${t[4]} ${t[5]} Z`);
}, Vv = function(e) {
  const [t, s, i, r] = n(this, ms), a = n(this, ot).subarray(4, 6), o = n(this, ot).subarray(16, 18), [l, h, d, u] = w(this, ce, Ch).call(this);
  e.push(`L${(a[0] - t) / i} ${(a[1] - s) / r} L${l} ${h} L${d} ${u} L${(o[0] - t) / i} ${(o[1] - s) / r}`);
}, zv = function(e) {
  const t = n(this, ot), [s, i, r, a] = n(this, ms), [o, l, h, d] = w(this, ce, Ch).call(this), u = new Float32Array(36);
  return u.set([NaN, NaN, NaN, NaN, (t[2] - s) / r, (t[3] - i) / a, NaN, NaN, NaN, NaN, (t[4] - s) / r, (t[5] - i) / a, NaN, NaN, NaN, NaN, o, l, NaN, NaN, NaN, NaN, h, d, NaN, NaN, NaN, NaN, (t[16] - s) / r, (t[17] - i) / a, NaN, NaN, NaN, NaN, (t[14] - s) / r, (t[15] - i) / a], 0), this.newFreeDrawOutline(u, e, n(this, ms), n(this, kl), n(this, Ll), n(this, Fl));
}, Xv = function(e, t) {
  const s = n(this, ii);
  return e.set([NaN, NaN, NaN, NaN, s[4], s[5]], t), t += 6;
}, Yv = function(e, t) {
  const s = n(this, ot).subarray(4, 6), i = n(this, ot).subarray(16, 18), [r, a, o, l] = n(this, ms), [h, d, u, f] = w(this, ce, Ch).call(this);
  return e.set([NaN, NaN, NaN, NaN, (s[0] - r) / o, (s[1] - a) / l, NaN, NaN, NaN, NaN, h, d, NaN, NaN, NaN, NaN, u, f, NaN, NaN, NaN, NaN, (i[0] - r) / o, (i[1] - a) / l], t), t += 24;
}, y(zi, dd, 8), y(zi, tf, 2), y(zi, ef, n(zi, dd) + n(zi, tf));
let Fu = zi;
var Bl, Wa, An, ud, vs, fd, qt, sf, Jv;
class Kv extends V {
  constructor(t, s, i, r, a, o) {
    super();
    y(this, sf);
    y(this, Bl);
    y(this, Wa, new Float32Array(4));
    y(this, An);
    y(this, ud);
    y(this, vs);
    y(this, fd);
    y(this, qt);
    g(this, qt, t), g(this, vs, s), g(this, Bl, i), g(this, fd, r), g(this, An, a), g(this, ud, o), this.firstPoint = [NaN, NaN], this.lastPoint = [NaN, NaN], w(this, sf, Jv).call(this, o);
    const [l, h, d, u] = n(this, Wa);
    for (let f = 0, p = t.length; f < p; f += 2)
      t[f] = (t[f] - l) / d, t[f + 1] = (t[f + 1] - h) / u;
    for (let f = 0, p = s.length; f < p; f += 2)
      s[f] = (s[f] - l) / d, s[f + 1] = (s[f + 1] - h) / u;
  }
  toSVGPath() {
    const t = [`M${n(this, qt)[4]} ${n(this, qt)[5]}`];
    for (let s = 6, i = n(this, qt).length; s < i; s += 6) {
      if (isNaN(n(this, qt)[s])) {
        t.push(`L${n(this, qt)[s + 4]} ${n(this, qt)[s + 5]}`);
        continue;
      }
      t.push(`C${n(this, qt)[s]} ${n(this, qt)[s + 1]} ${n(this, qt)[s + 2]} ${n(this, qt)[s + 3]} ${n(this, qt)[s + 4]} ${n(this, qt)[s + 5]}`);
    }
    return t.push("Z"), t.join(" ");
  }
  serialize([t, s, i, r], a) {
    const o = i - t, l = r - s;
    let h, d;
    switch (a) {
      case 0:
        h = V._rescale(n(this, qt), t, r, o, -l), d = V._rescale(n(this, vs), t, r, o, -l);
        break;
      case 90:
        h = V._rescaleAndSwap(n(this, qt), t, s, o, l), d = V._rescaleAndSwap(n(this, vs), t, s, o, l);
        break;
      case 180:
        h = V._rescale(n(this, qt), i, s, -o, l), d = V._rescale(n(this, vs), i, s, -o, l);
        break;
      case 270:
        h = V._rescaleAndSwap(n(this, qt), i, r, -o, -l), d = V._rescaleAndSwap(n(this, vs), i, r, -o, -l);
        break;
    }
    return {
      outline: Array.from(h),
      points: [Array.from(d)]
    };
  }
  get box() {
    return n(this, Wa);
  }
  newOutliner(t, s, i, r, a, o = 0) {
    return new Fu(t, s, i, r, a, o);
  }
  getNewOutline(t, s) {
    const [i, r, a, o] = n(this, Wa), [l, h, d, u] = n(this, Bl), f = a * d, p = o * u, m = i * d + l, v = r * u + h, A = this.newOutliner({
      x: n(this, vs)[0] * f + m,
      y: n(this, vs)[1] * p + v
    }, n(this, Bl), n(this, fd), t, n(this, ud), s ?? n(this, An));
    for (let b = 2; b < n(this, vs).length; b += 2)
      A.add({
        x: n(this, vs)[b] * f + m,
        y: n(this, vs)[b + 1] * p + v
      });
    return A.getOutlines();
  }
}
Bl = new WeakMap(), Wa = new WeakMap(), An = new WeakMap(), ud = new WeakMap(), vs = new WeakMap(), fd = new WeakMap(), qt = new WeakMap(), sf = new WeakSet(), Jv = function(t) {
  const s = n(this, qt);
  let i = s[4], r = s[5];
  const a = [i, r, i, r];
  let o = i, l = r, h = i, d = r;
  const u = t ? Math.max : Math.min, f = new Float32Array(4);
  for (let m = 6, v = s.length; m < v; m += 6) {
    const A = s[m + 4], b = s[m + 5];
    isNaN(s[m]) ? (j.pointBoundingBox(A, b, a), l > b ? (o = A, l = b) : l === b && (o = u(o, A)), d < b ? (h = A, d = b) : d === b && (h = u(h, A))) : (f[0] = f[1] = 1 / 0, f[2] = f[3] = -1 / 0, j.bezierBoundingBox(i, r, ...s.slice(m, m + 6), f), j.rectBoundingBox(f[0], f[1], f[2], f[3], a), l > f[1] ? (o = f[0], l = f[1]) : l === f[1] && (o = u(o, f[0])), d < f[3] ? (h = f[2], d = f[3]) : d === f[3] && (h = u(h, f[2]))), i = A, r = b;
  }
  const p = n(this, Wa);
  p[0] = a[0] - n(this, An), p[1] = a[1] - n(this, An), p[2] = a[2] - a[0] + 2 * n(this, An), p[3] = a[3] - a[1] + 2 * n(this, An), this.firstPoint = [o, l], this.lastPoint = [h, d];
};
var pd, gd, md, Ar, ni, Ye, Qv, pu, Zv, qv, kp;
class Fp {
  constructor(e, t = 0, s = 0, i = !0) {
    y(this, Ye);
    y(this, pd);
    y(this, gd);
    y(this, md);
    y(this, Ar, []);
    y(this, ni, []);
    const r = [1 / 0, 1 / 0, -1 / 0, -1 / 0], a = 10 ** -4;
    for (const {
      x: v,
      y: A,
      width: b,
      height: E
    } of e) {
      const S = Math.floor((v - t) / a) * a, T = Math.ceil((v + b + t) / a) * a, x = Math.floor((A - t) / a) * a, C = Math.ceil((A + E + t) / a) * a, I = [S, x, C, !0], M = [T, x, C, !1];
      n(this, Ar).push(I, M), j.rectBoundingBox(S, x, T, C, r);
    }
    const o = r[2] - r[0] + 2 * s, l = r[3] - r[1] + 2 * s, h = r[0] - s, d = r[1] - s;
    let u = i ? -1 / 0 : 1 / 0, f = 1 / 0;
    const p = n(this, Ar).at(i ? -1 : -2), m = [p[0], p[2]];
    for (const v of n(this, Ar)) {
      const [A, b, E, S] = v;
      !S && i ? b < f ? (f = b, u = A) : b === f && (u = Math.max(u, A)) : S && !i && (b < f ? (f = b, u = A) : b === f && (u = Math.min(u, A))), v[0] = (A - h) / o, v[1] = (b - d) / l, v[2] = (E - d) / l;
    }
    g(this, pd, new Float32Array([h, d, o, l])), g(this, gd, [u, f]), g(this, md, m);
  }
  getOutlines() {
    n(this, Ar).sort((t, s) => t[0] - s[0] || t[1] - s[1] || t[2] - s[2]);
    const e = [];
    for (const t of n(this, Ar))
      t[3] ? (e.push(...w(this, Ye, kp).call(this, t)), w(this, Ye, Zv).call(this, t)) : (w(this, Ye, qv).call(this, t), e.push(...w(this, Ye, kp).call(this, t)));
    return w(this, Ye, Qv).call(this, e);
  }
}
pd = new WeakMap(), gd = new WeakMap(), md = new WeakMap(), Ar = new WeakMap(), ni = new WeakMap(), Ye = new WeakSet(), Qv = function(e) {
  const t = [], s = /* @__PURE__ */ new Set();
  for (const a of e) {
    const [o, l, h] = a;
    t.push([o, l, a], [o, h, a]);
  }
  t.sort((a, o) => a[1] - o[1] || a[0] - o[0]);
  for (let a = 0, o = t.length; a < o; a += 2) {
    const l = t[a][2], h = t[a + 1][2];
    l.push(h), h.push(l), s.add(l), s.add(h);
  }
  const i = [];
  let r;
  for (; s.size > 0; ) {
    const a = s.values().next().value;
    let [o, l, h, d, u] = a;
    s.delete(a);
    let f = o, p = l;
    for (r = [o, h], i.push(r); ; ) {
      let m;
      if (s.has(d))
        m = d;
      else if (s.has(u))
        m = u;
      else
        break;
      s.delete(m), [o, l, h, d, u] = m, f !== o && (r.push(f, p, o, p === l ? l : h), f = o), p = p === l ? h : l;
    }
    r.push(f, p);
  }
  return new MA(i, n(this, pd), n(this, gd), n(this, md));
}, pu = function(e) {
  const t = n(this, ni);
  let s = 0, i = t.length - 1;
  for (; s <= i; ) {
    const r = s + i >> 1, a = t[r][0];
    if (a === e)
      return r;
    a < e ? s = r + 1 : i = r - 1;
  }
  return i + 1;
}, Zv = function([, e, t]) {
  const s = w(this, Ye, pu).call(this, e);
  n(this, ni).splice(s, 0, [e, t]);
}, qv = function([, e, t]) {
  const s = w(this, Ye, pu).call(this, e);
  for (let i = s; i < n(this, ni).length; i++) {
    const [r, a] = n(this, ni)[i];
    if (r !== e)
      break;
    if (r === e && a === t) {
      n(this, ni).splice(i, 1);
      return;
    }
  }
  for (let i = s - 1; i >= 0; i--) {
    const [r, a] = n(this, ni)[i];
    if (r !== e)
      break;
    if (r === e && a === t) {
      n(this, ni).splice(i, 1);
      return;
    }
  }
}, kp = function(e) {
  const [t, s, i] = e, r = [[t, s, i]], a = w(this, Ye, pu).call(this, i);
  for (let o = 0; o < a; o++) {
    const [l, h] = n(this, ni)[o];
    for (let d = 0, u = r.length; d < u; d++) {
      const [, f, p] = r[d];
      if (!(h <= f || p <= l)) {
        if (f >= l) {
          if (p > h)
            r[d][1] = h;
          else {
            if (u === 1)
              return [];
            r.splice(d, 1), d--, u--;
          }
          continue;
        }
        r[d][2] = l, p > h && r.push([t, h, p]);
      }
    }
  }
  return r;
};
var vd, Ul;
class MA extends V {
  constructor(t, s, i, r) {
    super();
    y(this, vd);
    y(this, Ul);
    g(this, Ul, t), g(this, vd, s), this.firstPoint = i, this.lastPoint = r;
  }
  toSVGPath() {
    const t = [];
    for (const s of n(this, Ul)) {
      let [i, r] = s;
      t.push(`M${i} ${r}`);
      for (let a = 2; a < s.length; a += 2) {
        const o = s[a], l = s[a + 1];
        o === i ? (t.push(`V${l}`), r = l) : l === r && (t.push(`H${o}`), i = o);
      }
      t.push("Z");
    }
    return t.join(" ");
  }
  serialize([t, s, i, r], a) {
    const o = [], l = i - t, h = r - s;
    for (const d of n(this, Ul)) {
      const u = new Array(d.length);
      for (let f = 0; f < d.length; f += 2)
        u[f] = t + d[f] * l, u[f + 1] = r - d[f + 1] * h;
      o.push(u);
    }
    return o;
  }
  get box() {
    return n(this, vd);
  }
  get classNamesForOutlining() {
    return ["highlightOutline"];
  }
}
vd = new WeakMap(), Ul = new WeakMap();
class Np extends Fu {
  newFreeDrawOutline(e, t, s, i, r, a) {
    return new OA(e, t, s, i, r, a);
  }
}
class OA extends Kv {
  newOutliner(e, t, s, i, r, a = 0) {
    return new Np(e, t, s, i, r, a);
  }
}
var Hl, yd, wn, Va, bd, ts, Ad, wd, za, ys, bs, Ce, $l, jl, Be, Gl, js, Ed, rt, Bp, gu, ty, ey, sy, Up, Nr, _s, Ao, iy, mu, vu, ny, ry, ay, oy, ly;
const vt = class vt extends kt {
  constructor(t) {
    super({
      ...t,
      name: "highlightEditor"
    });
    y(this, rt);
    y(this, Hl, null);
    y(this, yd, 0);
    y(this, wn);
    y(this, Va, null);
    y(this, bd, null);
    y(this, ts, null);
    y(this, Ad, null);
    y(this, wd, 0);
    y(this, za, null);
    y(this, ys, null);
    y(this, bs, null);
    y(this, Ce, !1);
    y(this, $l, null);
    y(this, jl, null);
    y(this, Be, null);
    y(this, Gl, "");
    y(this, js);
    y(this, Ed, "");
    this.color = t.color || vt._defaultColor, g(this, js, t.thickness || vt._defaultThickness), this.opacity = t.opacity || vt._defaultOpacity, g(this, wn, t.boxes || null), g(this, Ed, t.methodOfCreation || ""), g(this, Gl, t.text || ""), this._isDraggable = !1, this.defaultL10nId = "pdfjs-editor-highlight-editor", t.highlightId > -1 ? (g(this, Ce, !0), w(this, rt, gu).call(this, t), w(this, rt, Nr).call(this)) : n(this, wn) && (g(this, Hl, t.anchorNode), g(this, yd, t.anchorOffset), g(this, Ad, t.focusNode), g(this, wd, t.focusOffset), w(this, rt, Bp).call(this), w(this, rt, Nr).call(this), this.rotate(this.rotation)), this.annotationElementId || this._uiManager.a11yAlert("pdfjs-editor-highlight-added-alert");
  }
  static get _keyboardManager() {
    const t = vt.prototype;
    return nt(this, "_keyboardManager", new Md([[["ArrowLeft", "mac+ArrowLeft"], t._moveCaret, {
      args: [0]
    }], [["ArrowRight", "mac+ArrowRight"], t._moveCaret, {
      args: [1]
    }], [["ArrowUp", "mac+ArrowUp"], t._moveCaret, {
      args: [2]
    }], [["ArrowDown", "mac+ArrowDown"], t._moveCaret, {
      args: [3]
    }]]));
  }
  get telemetryInitialData() {
    return {
      action: "added",
      type: n(this, Ce) ? "free_highlight" : "highlight",
      color: this._uiManager.getNonHCMColorName(this.color),
      thickness: n(this, js),
      methodOfCreation: n(this, Ed)
    };
  }
  get telemetryFinalData() {
    return {
      type: "highlight",
      color: this._uiManager.getNonHCMColorName(this.color)
    };
  }
  static computeTelemetryFinalData(t) {
    return {
      numberOfColors: t.get("color").size
    };
  }
  static initialize(t, s) {
    kt.initialize(t, s), vt._defaultColor || (vt._defaultColor = s.highlightColors?.values().next().value || "#fff066");
  }
  static updateDefaultParams(t, s) {
    switch (t) {
      case ut.HIGHLIGHT_COLOR:
        vt._defaultColor = s;
        break;
      case ut.HIGHLIGHT_THICKNESS:
        vt._defaultThickness = s;
        break;
    }
  }
  translateInPage(t, s) {
  }
  get toolbarPosition() {
    return n(this, jl);
  }
  get commentButtonPosition() {
    return n(this, $l);
  }
  updateParams(t, s) {
    switch (t) {
      case ut.HIGHLIGHT_COLOR:
        w(this, rt, ty).call(this, s);
        break;
      case ut.HIGHLIGHT_THICKNESS:
        w(this, rt, ey).call(this, s);
        break;
    }
  }
  static get defaultPropertiesToUpdate() {
    return [[ut.HIGHLIGHT_COLOR, vt._defaultColor], [ut.HIGHLIGHT_THICKNESS, vt._defaultThickness]];
  }
  get propertiesToUpdate() {
    return [[ut.HIGHLIGHT_COLOR, this.color || vt._defaultColor], [ut.HIGHLIGHT_THICKNESS, n(this, js) || vt._defaultThickness], [ut.HIGHLIGHT_FREE, n(this, Ce)]];
  }
  onUpdatedColor() {
    this.parent?.drawLayer.updateProperties(n(this, bs), {
      root: {
        fill: this.color,
        "fill-opacity": this.opacity
      }
    }), n(this, bd)?.updateColor(this.color), super.onUpdatedColor();
  }
  get toolbarButtons() {
    return this._uiManager.highlightColors ? [["colorPicker", g(this, bd, new Mu({
      editor: this
    }))]] : super.toolbarButtons;
  }
  disableEditing() {
    super.disableEditing(), this.div.classList.toggle("disabled", !0);
  }
  enableEditing() {
    super.enableEditing(), this.div.classList.toggle("disabled", !1);
  }
  fixAndSetPosition() {
    return super.fixAndSetPosition(w(this, rt, vu).call(this));
  }
  getBaseTranslation() {
    return [0, 0];
  }
  getRect(t, s) {
    return super.getRect(t, s, w(this, rt, vu).call(this));
  }
  onceAdded(t) {
    this.annotationElementId || this.parent.addUndoableEditor(this), t && this.div.focus();
  }
  remove() {
    w(this, rt, Up).call(this), this._reportTelemetry({
      action: "deleted"
    }), super.remove();
  }
  rebuild() {
    this.parent && (super.rebuild(), this.div !== null && (w(this, rt, Nr).call(this), this.isAttachedToDOM || this.parent.add(this)));
  }
  setParent(t) {
    let s = !1;
    this.parent && !t ? w(this, rt, Up).call(this) : t && (w(this, rt, Nr).call(this, t), s = !this.parent && this.div?.classList.contains("selectedEditor")), super.setParent(t), this.show(this._isVisible), s && this.select();
  }
  rotate(t) {
    var r, a, o;
    const {
      drawLayer: s
    } = this.parent;
    let i;
    n(this, Ce) ? (t = (t - this.rotation + 360) % 360, i = w(r = vt, _s, Ao).call(r, n(this, ys).box, t)) : i = w(a = vt, _s, Ao).call(a, [this.x, this.y, this.width, this.height], t), s.updateProperties(n(this, bs), {
      bbox: i,
      root: {
        "data-main-rotation": t
      }
    }), s.updateProperties(n(this, Be), {
      bbox: w(o = vt, _s, Ao).call(o, n(this, ts).box, t),
      root: {
        "data-main-rotation": t
      }
    });
  }
  render() {
    if (this.div)
      return this.div;
    const t = super.render();
    n(this, Gl) && (t.setAttribute("aria-label", n(this, Gl)), t.setAttribute("role", "mark")), n(this, Ce) ? t.classList.add("free") : this.div.addEventListener("keydown", w(this, rt, iy).bind(this), {
      signal: this._uiManager._signal
    });
    const s = g(this, za, document.createElement("div"));
    return t.append(s), s.setAttribute("aria-hidden", "true"), s.className = "internal", s.style.clipPath = n(this, Va), this.setDims(), mm(this, n(this, za), ["pointerover", "pointerleave"]), this.enableEditing(), t;
  }
  pointerover() {
    this.isSelected || this.parent?.drawLayer.updateProperties(n(this, Be), {
      rootClass: {
        hovered: !0
      }
    });
  }
  pointerleave() {
    this.isSelected || this.parent?.drawLayer.updateProperties(n(this, Be), {
      rootClass: {
        hovered: !1
      }
    });
  }
  _moveCaret(t) {
    switch (this.parent.unselect(this), t) {
      case 0:
      case 2:
        w(this, rt, mu).call(this, !0);
        break;
      case 1:
      case 3:
        w(this, rt, mu).call(this, !1);
        break;
    }
  }
  select() {
    super.select(), n(this, Be) && this.parent?.drawLayer.updateProperties(n(this, Be), {
      rootClass: {
        hovered: !1,
        selected: !0
      }
    });
  }
  unselect() {
    super.unselect(), n(this, Be) && (this.parent?.drawLayer.updateProperties(n(this, Be), {
      rootClass: {
        selected: !1
      }
    }), n(this, Ce) || w(this, rt, mu).call(this, !1));
  }
  get _mustFixPosition() {
    return !n(this, Ce);
  }
  show(t = this._isVisible) {
    super.show(t), this.parent && (this.parent.drawLayer.updateProperties(n(this, bs), {
      rootClass: {
        hidden: !t
      }
    }), this.parent.drawLayer.updateProperties(n(this, Be), {
      rootClass: {
        hidden: !t
      }
    }));
  }
  static startHighlighting(t, s, {
    target: i,
    x: r,
    y: a
  }) {
    const {
      x: o,
      y: l,
      width: h,
      height: d
    } = i.getBoundingClientRect(), u = new AbortController(), f = t.combinedSignal(u), p = (m) => {
      u.abort(), w(this, _s, oy).call(this, t, m);
    };
    window.addEventListener("blur", p, {
      signal: f
    }), window.addEventListener("pointerup", p, {
      signal: f
    }), window.addEventListener("pointerdown", Kt, {
      capture: !0,
      passive: !1,
      signal: f
    }), window.addEventListener("contextmenu", Vs, {
      signal: f
    }), i.addEventListener("pointermove", w(this, _s, ay).bind(this, t), {
      signal: f
    }), this._freeHighlight = new Np({
      x: r,
      y: a
    }, [o, l, h, d], t.scale, this._defaultThickness / 2, s, 1e-3), {
      id: this._freeHighlightId,
      clipPathId: this._freeHighlightClipId
    } = t.drawLayer.draw({
      bbox: [0, 0, 1, 1],
      root: {
        viewBox: "0 0 1 1",
        fill: this._defaultColor,
        "fill-opacity": this._defaultOpacity
      },
      rootClass: {
        highlight: !0,
        free: !0
      },
      path: {
        d: this._freeHighlight.toSVGPath()
      }
    }, !0, !0);
  }
  static async deserialize(t, s, i) {
    var A, b, E, S;
    let r = null;
    if (t instanceof Nv) {
      const {
        data: {
          quadPoints: T,
          rect: x,
          rotation: C,
          id: I,
          color: M,
          opacity: P,
          popupRef: O,
          richText: D,
          contentsObj: $,
          creationDate: F,
          modificationDate: N
        },
        parent: {
          page: {
            pageNumber: K
          }
        }
      } = t;
      r = t = {
        annotationType: tt.HIGHLIGHT,
        color: Array.from(M),
        opacity: P,
        quadPoints: T,
        boxes: null,
        pageIndex: K - 1,
        rect: x.slice(0),
        rotation: C,
        annotationElementId: I,
        id: I,
        deleted: !1,
        popupRef: O,
        richText: D,
        comment: $?.str || null,
        creationDate: F,
        modificationDate: N
      };
    } else if (t instanceof mg) {
      const {
        data: {
          inkLists: T,
          rect: x,
          rotation: C,
          id: I,
          color: M,
          borderStyle: {
            rawWidth: P
          },
          popupRef: O,
          richText: D,
          contentsObj: $,
          creationDate: F,
          modificationDate: N
        },
        parent: {
          page: {
            pageNumber: K
          }
        }
      } = t;
      r = t = {
        annotationType: tt.HIGHLIGHT,
        color: Array.from(M),
        thickness: P,
        inkLists: T,
        boxes: null,
        pageIndex: K - 1,
        rect: x.slice(0),
        rotation: C,
        annotationElementId: I,
        id: I,
        deleted: !1,
        popupRef: O,
        richText: D,
        comment: $?.str || null,
        creationDate: F,
        modificationDate: N
      };
    }
    const {
      color: a,
      quadPoints: o,
      inkLists: l,
      outlines: h,
      opacity: d
    } = t, u = await super.deserialize(t, s, i);
    u.color = j.makeHexColor(...a), u.opacity = d || 1, l && g(u, js, t.thickness), u._initialData = r, t.comment && u.setCommentData(t);
    const [f, p] = u.pageDimensions, [m, v] = u.pageTranslation;
    if (o) {
      const T = g(u, wn, []);
      for (let x = 0; x < o.length; x += 8)
        T.push({
          x: (o[x] - m) / f,
          y: 1 - (o[x + 1] - v) / p,
          width: (o[x + 2] - o[x]) / f,
          height: (o[x + 1] - o[x + 5]) / p
        });
      w(A = u, rt, Bp).call(A), w(b = u, rt, Nr).call(b), u.rotate(u.rotation);
    } else if (l || h) {
      g(u, Ce, !0);
      const T = (l || h.points)[0], x = {
        x: T[0] - m,
        y: p - (T[1] - v)
      }, C = new Np(x, [0, 0, f, p], 1, n(u, js) / 2, !0, 1e-3);
      for (let P = 0, O = T.length; P < O; P += 2)
        x.x = T[P] - m, x.y = p - (T[P + 1] - v), C.add(x);
      const {
        id: I,
        clipPathId: M
      } = s.drawLayer.draw({
        bbox: [0, 0, 1, 1],
        root: {
          viewBox: "0 0 1 1",
          fill: u.color,
          "fill-opacity": u._defaultOpacity
        },
        rootClass: {
          highlight: !0,
          free: !0
        },
        path: {
          d: C.toSVGPath()
        }
      }, !0, !0);
      w(E = u, rt, gu).call(E, {
        highlightOutlines: C.getOutlines(),
        highlightId: I,
        clipPathId: M
      }), w(S = u, rt, Nr).call(S), u.rotate(u.parentRotation);
    }
    return u;
  }
  serialize(t = !1) {
    if (this.isEmpty() || t)
      return null;
    if (this.deleted)
      return this.serializeDeleted();
    const s = kt._colorManager.convert(this._uiManager.getNonHCMColor(this.color)), i = super.serialize(t);
    return Object.assign(i, {
      color: s,
      opacity: this.opacity,
      thickness: n(this, js),
      quadPoints: w(this, rt, ny).call(this),
      outlines: w(this, rt, ry).call(this, i.rect)
    }), this.addComment(i), this.annotationElementId && !w(this, rt, ly).call(this, i) ? null : (i.id = this.annotationElementId, i);
  }
  renderAnnotationElement(t) {
    return this.deleted ? (t.hide(), null) : (t.updateEdited({
      rect: this.getPDFRect(),
      popup: this.comment
    }), null);
  }
  static canCreateNewEmptyEditor() {
    return !1;
  }
};
Hl = new WeakMap(), yd = new WeakMap(), wn = new WeakMap(), Va = new WeakMap(), bd = new WeakMap(), ts = new WeakMap(), Ad = new WeakMap(), wd = new WeakMap(), za = new WeakMap(), ys = new WeakMap(), bs = new WeakMap(), Ce = new WeakMap(), $l = new WeakMap(), jl = new WeakMap(), Be = new WeakMap(), Gl = new WeakMap(), js = new WeakMap(), Ed = new WeakMap(), rt = new WeakSet(), Bp = function() {
  const t = new Fp(n(this, wn), 1e-3);
  g(this, ys, t.getOutlines()), [this.x, this.y, this.width, this.height] = n(this, ys).box;
  const s = new Fp(n(this, wn), 25e-4, 1e-3, this._uiManager.direction === "ltr");
  g(this, ts, s.getOutlines());
  const {
    firstPoint: i
  } = n(this, ys);
  g(this, $l, [(i[0] - this.x) / this.width, (i[1] - this.y) / this.height]);
  const {
    lastPoint: r
  } = n(this, ts);
  g(this, jl, [(r[0] - this.x) / this.width, (r[1] - this.y) / this.height]);
}, gu = function({
  highlightOutlines: t,
  highlightId: s,
  clipPathId: i
}) {
  var f, p;
  if (g(this, ys, t), g(this, ts, t.getNewOutline(n(this, js) / 2 + 1.5, 25e-4)), s >= 0)
    g(this, bs, s), g(this, Va, i), this.parent.drawLayer.finalizeDraw(s, {
      bbox: t.box,
      path: {
        d: t.toSVGPath()
      }
    }), g(this, Be, this.parent.drawLayer.drawOutline({
      rootClass: {
        highlightOutline: !0,
        free: !0
      },
      bbox: n(this, ts).box,
      path: {
        d: n(this, ts).toSVGPath()
      }
    }, !0));
  else if (this.parent) {
    const m = this.parent.viewport.rotation;
    this.parent.drawLayer.updateProperties(n(this, bs), {
      bbox: w(f = vt, _s, Ao).call(f, n(this, ys).box, (m - this.rotation + 360) % 360),
      path: {
        d: t.toSVGPath()
      }
    }), this.parent.drawLayer.updateProperties(n(this, Be), {
      bbox: w(p = vt, _s, Ao).call(p, n(this, ts).box, m),
      path: {
        d: n(this, ts).toSVGPath()
      }
    });
  }
  const [a, o, l, h] = t.box;
  switch (this.rotation) {
    case 0:
      this.x = a, this.y = o, this.width = l, this.height = h;
      break;
    case 90: {
      const [m, v] = this.parentDimensions;
      this.x = o, this.y = 1 - a, this.width = l * v / m, this.height = h * m / v;
      break;
    }
    case 180:
      this.x = 1 - a, this.y = 1 - o, this.width = l, this.height = h;
      break;
    case 270: {
      const [m, v] = this.parentDimensions;
      this.x = 1 - o, this.y = a, this.width = l * v / m, this.height = h * m / v;
      break;
    }
  }
  const {
    firstPoint: d
  } = t;
  g(this, $l, [(d[0] - a) / l, (d[1] - o) / h]);
  const {
    lastPoint: u
  } = n(this, ts);
  g(this, jl, [(u[0] - a) / l, (u[1] - o) / h]);
}, ty = function(t) {
  const s = (a, o) => {
    this.color = a, this.opacity = o, this.onUpdatedColor();
  }, i = this.color, r = this.opacity;
  this.addCommands({
    cmd: s.bind(this, t, vt._defaultOpacity),
    undo: s.bind(this, i, r),
    post: this._uiManager.updateUI.bind(this._uiManager, this),
    mustExec: !0,
    type: ut.HIGHLIGHT_COLOR,
    overwriteIfSameType: !0,
    keepUndo: !0
  }), this._reportTelemetry({
    action: "color_changed",
    color: this._uiManager.getNonHCMColorName(t)
  }, !0);
}, ey = function(t) {
  const s = n(this, js), i = (r) => {
    g(this, js, r), w(this, rt, sy).call(this, r);
  };
  this.addCommands({
    cmd: i.bind(this, t),
    undo: i.bind(this, s),
    post: this._uiManager.updateUI.bind(this._uiManager, this),
    mustExec: !0,
    type: ut.INK_THICKNESS,
    overwriteIfSameType: !0,
    keepUndo: !0
  }), this._reportTelemetry({
    action: "thickness_changed",
    thickness: t
  }, !0);
}, sy = function(t) {
  n(this, Ce) && (w(this, rt, gu).call(this, {
    highlightOutlines: n(this, ys).getNewOutline(t / 2)
  }), this.fixAndSetPosition(), this.setDims());
}, Up = function() {
  n(this, bs) === null || !this.parent || (this.parent.drawLayer.remove(n(this, bs)), g(this, bs, null), this.parent.drawLayer.remove(n(this, Be)), g(this, Be, null));
}, Nr = function(t = this.parent) {
  n(this, bs) === null && ({
    id: ee(this, bs)._,
    clipPathId: ee(this, Va)._
  } = t.drawLayer.draw({
    bbox: n(this, ys).box,
    root: {
      viewBox: "0 0 1 1",
      fill: this.color,
      "fill-opacity": this.opacity
    },
    rootClass: {
      highlight: !0,
      free: n(this, Ce)
    },
    path: {
      d: n(this, ys).toSVGPath()
    }
  }, !1, !0), g(this, Be, t.drawLayer.drawOutline({
    rootClass: {
      highlightOutline: !0,
      free: n(this, Ce)
    },
    bbox: n(this, ts).box,
    path: {
      d: n(this, ts).toSVGPath()
    }
  }, n(this, Ce))), n(this, za) && (n(this, za).style.clipPath = n(this, Va)));
}, _s = new WeakSet(), Ao = function([t, s, i, r], a) {
  switch (a) {
    case 90:
      return [1 - s - r, t, r, i];
    case 180:
      return [1 - t - i, 1 - s - r, i, r];
    case 270:
      return [s, 1 - t - i, r, i];
  }
  return [t, s, i, r];
}, iy = function(t) {
  vt._keyboardManager.exec(this, t);
}, mu = function(t) {
  if (!n(this, Hl))
    return;
  const s = window.getSelection();
  t ? s.setPosition(n(this, Hl), n(this, yd)) : s.setPosition(n(this, Ad), n(this, wd));
}, vu = function() {
  return n(this, Ce) ? this.rotation : 0;
}, ny = function() {
  if (n(this, Ce))
    return null;
  const [t, s] = this.pageDimensions, [i, r] = this.pageTranslation, a = n(this, wn), o = new Float32Array(a.length * 8);
  let l = 0;
  for (const {
    x: h,
    y: d,
    width: u,
    height: f
  } of a) {
    const p = h * t + i, m = (1 - d) * s + r;
    o[l] = o[l + 4] = p, o[l + 1] = o[l + 3] = m, o[l + 2] = o[l + 6] = p + u * t, o[l + 5] = o[l + 7] = m - f * s, l += 8;
  }
  return o;
}, ry = function(t) {
  return n(this, ys).serialize(t, w(this, rt, vu).call(this));
}, ay = function(t, s) {
  this._freeHighlight.add(s) && t.drawLayer.updateProperties(this._freeHighlightId, {
    path: {
      d: this._freeHighlight.toSVGPath()
    }
  });
}, oy = function(t, s) {
  this._freeHighlight.isEmpty() ? t.drawLayer.remove(this._freeHighlightId) : t.createAndAddNewEditor(s, !1, {
    highlightId: this._freeHighlightId,
    highlightOutlines: this._freeHighlight.getOutlines(),
    clipPathId: this._freeHighlightClipId,
    methodOfCreation: "main_toolbar"
  }), this._freeHighlightId = -1, this._freeHighlight = null, this._freeHighlightClipId = "";
}, ly = function(t) {
  const {
    color: s
  } = this._initialData;
  return this.hasEditedComment || t.color.some((i, r) => i !== s[r]);
}, y(vt, _s), R(vt, "_defaultColor", null), R(vt, "_defaultOpacity", 1), R(vt, "_defaultThickness", 12), R(vt, "_type", "highlight"), R(vt, "_editorType", tt.HIGHLIGHT), R(vt, "_freeHighlightId", -1), R(vt, "_freeHighlight", null), R(vt, "_freeHighlightClipId", "");
let ku = vt;
var Xa;
class hy {
  constructor() {
    y(this, Xa, /* @__PURE__ */ Object.create(null));
  }
  updateProperty(e, t) {
    this[e] = t, this.updateSVGProperty(e, t);
  }
  updateProperties(e) {
    if (e)
      for (const [t, s] of Object.entries(e))
        t.startsWith("_") || this.updateProperty(t, s);
  }
  updateSVGProperty(e, t) {
    n(this, Xa)[e] = t;
  }
  toSVGProperties() {
    const e = n(this, Xa);
    return g(this, Xa, /* @__PURE__ */ Object.create(null)), {
      root: e
    };
  }
  reset() {
    g(this, Xa, /* @__PURE__ */ Object.create(null));
  }
  updateAll(e = this) {
    this.updateProperties(e);
  }
  clone() {
    bt("Not implemented");
  }
}
Xa = new WeakMap();
var As, _l, ge, Ya, Ka, pt, Hp, $p, jp, Ih, cy, yu, Ph, wo;
const ct = class ct extends kt {
  constructor(t) {
    super(t);
    y(this, pt);
    y(this, As, null);
    y(this, _l);
    R(this, "_colorPicker", null);
    R(this, "_drawId", null);
    g(this, _l, t.mustBeCommitted || !1), this._addOutlines(t);
  }
  onUpdatedColor() {
    this._colorPicker?.update(this.color), super.onUpdatedColor();
  }
  _addOutlines(t) {
    t.drawOutlines && (w(this, pt, Hp).call(this, t), w(this, pt, Ih).call(this));
  }
  static _mergeSVGProperties(t, s) {
    const i = new Set(Object.keys(t));
    for (const [r, a] of Object.entries(s))
      i.has(r) ? Object.assign(t[r], a) : t[r] = a;
    return t;
  }
  static getDefaultDrawingOptions(t) {
    bt("Not implemented");
  }
  static get typesMap() {
    bt("Not implemented");
  }
  static get isDrawer() {
    return !0;
  }
  static get supportMultipleDrawings() {
    return !1;
  }
  static updateDefaultParams(t, s) {
    const i = this.typesMap.get(t);
    i && this._defaultDrawingOptions.updateProperty(i, s), this._currentParent && (n(ct, ge).updateProperty(i, s), this._currentParent.drawLayer.updateProperties(this._currentDrawId, this._defaultDrawingOptions.toSVGProperties()));
  }
  updateParams(t, s) {
    const i = this.constructor.typesMap.get(t);
    i && this._updateProperty(t, i, s);
  }
  static get defaultPropertiesToUpdate() {
    const t = [], s = this._defaultDrawingOptions;
    for (const [i, r] of this.typesMap)
      t.push([i, s[r]]);
    return t;
  }
  get propertiesToUpdate() {
    const t = [], {
      _drawingOptions: s
    } = this;
    for (const [i, r] of this.constructor.typesMap)
      t.push([i, s[r]]);
    return t;
  }
  _updateProperty(t, s, i) {
    const r = this._drawingOptions, a = r[s], o = (l) => {
      r.updateProperty(s, l);
      const h = n(this, As).updateProperty(s, l);
      h && w(this, pt, Ph).call(this, h), this.parent?.drawLayer.updateProperties(this._drawId, r.toSVGProperties()), t === this.colorType && this.onUpdatedColor();
    };
    this.addCommands({
      cmd: o.bind(this, i),
      undo: o.bind(this, a),
      post: this._uiManager.updateUI.bind(this._uiManager, this),
      mustExec: !0,
      type: t,
      overwriteIfSameType: !0,
      keepUndo: !0
    });
  }
  _onResizing() {
    this.parent?.drawLayer.updateProperties(this._drawId, ct._mergeSVGProperties(n(this, As).getPathResizingSVGProperties(w(this, pt, yu).call(this)), {
      bbox: w(this, pt, wo).call(this)
    }));
  }
  _onResized() {
    this.parent?.drawLayer.updateProperties(this._drawId, ct._mergeSVGProperties(n(this, As).getPathResizedSVGProperties(w(this, pt, yu).call(this)), {
      bbox: w(this, pt, wo).call(this)
    }));
  }
  _onTranslating(t, s) {
    this.parent?.drawLayer.updateProperties(this._drawId, {
      bbox: w(this, pt, wo).call(this)
    });
  }
  _onTranslated() {
    this.parent?.drawLayer.updateProperties(this._drawId, ct._mergeSVGProperties(n(this, As).getPathTranslatedSVGProperties(w(this, pt, yu).call(this), this.parentDimensions), {
      bbox: w(this, pt, wo).call(this)
    }));
  }
  _onStartDragging() {
    this.parent?.drawLayer.updateProperties(this._drawId, {
      rootClass: {
        moving: !0
      }
    });
  }
  _onStopDragging() {
    this.parent?.drawLayer.updateProperties(this._drawId, {
      rootClass: {
        moving: !1
      }
    });
  }
  commit() {
    super.commit(), this.disableEditMode(), this.disableEditing();
  }
  disableEditing() {
    super.disableEditing(), this.div.classList.toggle("disabled", !0);
  }
  enableEditing() {
    super.enableEditing(), this.div.classList.toggle("disabled", !1);
  }
  getBaseTranslation() {
    return [0, 0];
  }
  get isResizable() {
    return !0;
  }
  onceAdded(t) {
    this.annotationElementId || this.parent.addUndoableEditor(this), this._isDraggable = !0, n(this, _l) && (g(this, _l, !1), this.commit(), this.parent.setSelected(this), t && this.isOnScreen && this.div.focus());
  }
  remove() {
    w(this, pt, jp).call(this), super.remove();
  }
  rebuild() {
    this.parent && (super.rebuild(), this.div !== null && (w(this, pt, Ih).call(this), w(this, pt, Ph).call(this, n(this, As).box), this.isAttachedToDOM || this.parent.add(this)));
  }
  setParent(t) {
    let s = !1;
    this.parent && !t ? (this._uiManager.removeShouldRescale(this), w(this, pt, jp).call(this)) : t && (this._uiManager.addShouldRescale(this), w(this, pt, Ih).call(this, t), s = !this.parent && this.div?.classList.contains("selectedEditor")), super.setParent(t), s && this.select();
  }
  rotate() {
    this.parent && this.parent.drawLayer.updateProperties(this._drawId, ct._mergeSVGProperties({
      bbox: w(this, pt, wo).call(this)
    }, n(this, As).updateRotation((this.parentRotation - this.rotation + 360) % 360)));
  }
  onScaleChanging() {
    this.parent && w(this, pt, Ph).call(this, n(this, As).updateParentDimensions(this.parentDimensions, this.parent.scale));
  }
  static onScaleChangingWhenDrawing() {
  }
  render() {
    if (this.div)
      return this.div;
    let t, s;
    this._isCopy && (t = this.x, s = this.y);
    const i = super.render();
    i.classList.add("draw");
    const r = document.createElement("div");
    return i.append(r), r.setAttribute("aria-hidden", "true"), r.className = "internal", this.setDims(), this._uiManager.addShouldRescale(this), this.disableEditing(), this._isCopy && this._moveAfterPaste(t, s), i;
  }
  static createDrawerInstance(t, s, i, r, a) {
    bt("Not implemented");
  }
  static startDrawing(t, s, i, r) {
    const {
      target: a,
      offsetX: o,
      offsetY: l,
      pointerId: h,
      pointerType: d
    } = r;
    if (Le.isInitializedAndDifferentPointerType(d))
      return;
    const {
      viewport: {
        rotation: u
      }
    } = t, {
      width: f,
      height: p
    } = a.getBoundingClientRect(), m = g(ct, Ya, new AbortController()), v = t.combinedSignal(m);
    if (Le.setPointer(d, h), window.addEventListener("pointerup", (A) => {
      Le.isSamePointerIdOrRemove(A.pointerId) && this._endDraw(A);
    }, {
      signal: v
    }), window.addEventListener("pointercancel", (A) => {
      Le.isSamePointerIdOrRemove(A.pointerId) && this._currentParent.endDrawingSession();
    }, {
      signal: v
    }), window.addEventListener("pointerdown", (A) => {
      Le.isSamePointerType(A.pointerType) && (Le.initializeAndAddPointerId(A.pointerId), n(ct, ge).isCancellable() && (n(ct, ge).removeLastElement(), n(ct, ge).isEmpty() ? this._currentParent.endDrawingSession(!0) : this._endDraw(null)));
    }, {
      capture: !0,
      passive: !1,
      signal: v
    }), window.addEventListener("contextmenu", Vs, {
      signal: v
    }), a.addEventListener("pointermove", this._drawMove.bind(this), {
      signal: v
    }), a.addEventListener("touchmove", (A) => {
      Le.isSameTimeStamp(A.timeStamp) && Kt(A);
    }, {
      signal: v
    }), t.toggleDrawing(), s._editorUndoBar?.hide(), n(ct, ge)) {
      t.drawLayer.updateProperties(this._currentDrawId, n(ct, ge).startNew(o, l, f, p, u));
      return;
    }
    s.updateUIForDefaultProperties(this), g(ct, ge, this.createDrawerInstance(o, l, f, p, u)), g(ct, Ka, this.getDefaultDrawingOptions()), this._currentParent = t, {
      id: this._currentDrawId
    } = t.drawLayer.draw(this._mergeSVGProperties(n(ct, Ka).toSVGProperties(), n(ct, ge).defaultSVGProperties), !0, !1);
  }
  static _drawMove(t) {
    if (Le.isSameTimeStamp(t.timeStamp), !n(ct, ge))
      return;
    const {
      offsetX: s,
      offsetY: i,
      pointerId: r
    } = t;
    if (Le.isSamePointerId(r)) {
      if (Le.isUsingMultiplePointers()) {
        this._endDraw(t);
        return;
      }
      this._currentParent.drawLayer.updateProperties(this._currentDrawId, n(ct, ge).add(s, i)), Le.setTimeStamp(t.timeStamp), Kt(t);
    }
  }
  static _cleanup(t) {
    t && (this._currentDrawId = -1, this._currentParent = null, g(ct, ge, null), g(ct, Ka, null), Le.clearTimeStamp()), n(ct, Ya) && (n(ct, Ya).abort(), g(ct, Ya, null), Le.clearPointerIds());
  }
  static _endDraw(t) {
    const s = this._currentParent;
    if (s) {
      if (s.toggleDrawing(!0), this._cleanup(!1), t?.target === s.div && s.drawLayer.updateProperties(this._currentDrawId, n(ct, ge).end(t.offsetX, t.offsetY)), this.supportMultipleDrawings) {
        const i = n(ct, ge), r = this._currentDrawId, a = i.getLastElement();
        s.addCommands({
          cmd: () => {
            s.drawLayer.updateProperties(r, i.setLastElement(a));
          },
          undo: () => {
            s.drawLayer.updateProperties(r, i.removeLastElement());
          },
          mustExec: !1,
          type: ut.DRAW_STEP
        });
        return;
      }
      this.endDrawing(!1);
    }
  }
  static endDrawing(t) {
    const s = this._currentParent;
    if (!s)
      return null;
    if (s.toggleDrawing(!0), s.cleanUndoStack(ut.DRAW_STEP), !n(ct, ge).isEmpty()) {
      const {
        pageDimensions: [i, r],
        scale: a
      } = s, o = s.createAndAddNewEditor({
        offsetX: 0,
        offsetY: 0
      }, !1, {
        drawId: this._currentDrawId,
        drawOutlines: n(ct, ge).getOutlines(i * a, r * a, a, this._INNER_MARGIN),
        drawingOptions: n(ct, Ka),
        mustBeCommitted: !t
      });
      return this._cleanup(!0), o;
    }
    return s.drawLayer.remove(this._currentDrawId), this._cleanup(!0), null;
  }
  createDrawingOptions(t) {
  }
  static deserializeDraw(t, s, i, r, a, o) {
    bt("Not implemented");
  }
  static async deserialize(t, s, i) {
    var u, f;
    const {
      rawDims: {
        pageWidth: r,
        pageHeight: a,
        pageX: o,
        pageY: l
      }
    } = s.viewport, h = this.deserializeDraw(o, l, r, a, this._INNER_MARGIN, t), d = await super.deserialize(t, s, i);
    return d.createDrawingOptions(t), w(u = d, pt, Hp).call(u, {
      drawOutlines: h
    }), w(f = d, pt, Ih).call(f), d.onScaleChanging(), d.rotate(), d;
  }
  serializeDraw(t) {
    const [s, i] = this.pageTranslation, [r, a] = this.pageDimensions;
    return n(this, As).serialize([s, i, r, a], t);
  }
  renderAnnotationElement(t) {
    return t.updateEdited({
      rect: this.getPDFRect()
    }), null;
  }
  static canCreateNewEmptyEditor() {
    return !1;
  }
};
As = new WeakMap(), _l = new WeakMap(), ge = new WeakMap(), Ya = new WeakMap(), Ka = new WeakMap(), pt = new WeakSet(), Hp = function({
  drawOutlines: t,
  drawId: s,
  drawingOptions: i
}) {
  g(this, As, t), this._drawingOptions || (this._drawingOptions = i), this.annotationElementId || this._uiManager.a11yAlert(`pdfjs-editor-${this.editorType}-added-alert`), s >= 0 ? (this._drawId = s, this.parent.drawLayer.finalizeDraw(s, t.defaultProperties)) : this._drawId = w(this, pt, $p).call(this, t, this.parent), w(this, pt, Ph).call(this, t.box);
}, $p = function(t, s) {
  const {
    id: i
  } = s.drawLayer.draw(ct._mergeSVGProperties(this._drawingOptions.toSVGProperties(), t.defaultSVGProperties), !1, !1);
  return i;
}, jp = function() {
  this._drawId === null || !this.parent || (this.parent.drawLayer.remove(this._drawId), this._drawId = null, this._drawingOptions.reset());
}, Ih = function(t = this.parent) {
  if (!(this._drawId !== null && this.parent === t)) {
    if (this._drawId !== null) {
      this.parent.drawLayer.updateParent(this._drawId, t.drawLayer);
      return;
    }
    this._drawingOptions.updateAll(), this._drawId = w(this, pt, $p).call(this, n(this, As), t);
  }
}, cy = function([t, s, i, r]) {
  const {
    parentDimensions: [a, o],
    rotation: l
  } = this;
  switch (l) {
    case 90:
      return [s, 1 - t, i * (o / a), r * (a / o)];
    case 180:
      return [1 - t, 1 - s, i, r];
    case 270:
      return [1 - s, t, i * (o / a), r * (a / o)];
    default:
      return [t, s, i, r];
  }
}, yu = function() {
  const {
    x: t,
    y: s,
    width: i,
    height: r,
    parentDimensions: [a, o],
    rotation: l
  } = this;
  switch (l) {
    case 90:
      return [1 - s, t, i * (a / o), r * (o / a)];
    case 180:
      return [1 - t, 1 - s, i, r];
    case 270:
      return [s, 1 - t, i * (a / o), r * (o / a)];
    default:
      return [t, s, i, r];
  }
}, Ph = function(t) {
  [this.x, this.y, this.width, this.height] = w(this, pt, cy).call(this, t), this.div && (this.fixAndSetPosition(), this.setDims()), this._onResized();
}, wo = function() {
  const {
    x: t,
    y: s,
    width: i,
    height: r,
    rotation: a,
    parentRotation: o,
    parentDimensions: [l, h]
  } = this;
  switch ((a * 4 + o) / 90) {
    case 1:
      return [1 - s - r, t, r, i];
    case 2:
      return [1 - t - i, 1 - s - r, i, r];
    case 3:
      return [s, 1 - t - i, r, i];
    case 4:
      return [t, s - i * (l / h), r * (h / l), i * (l / h)];
    case 5:
      return [1 - s, t, i * (l / h), r * (h / l)];
    case 6:
      return [1 - t - r * (h / l), 1 - s, r * (h / l), i * (l / h)];
    case 7:
      return [s - i * (l / h), 1 - t - r * (h / l), i * (l / h), r * (h / l)];
    case 8:
      return [t - i, s - r, i, r];
    case 9:
      return [1 - s, t - i, r, i];
    case 10:
      return [1 - t, 1 - s, i, r];
    case 11:
      return [s - r, 1 - t, r, i];
    case 12:
      return [t - r * (h / l), s, r * (h / l), i * (l / h)];
    case 13:
      return [1 - s - i * (l / h), t - r * (h / l), i * (l / h), r * (h / l)];
    case 14:
      return [1 - t, 1 - s - i * (l / h), r * (h / l), i * (l / h)];
    case 15:
      return [s, 1 - t, i * (l / h), r * (h / l)];
    default:
      return [t, s, i, r];
  }
}, R(ct, "_currentDrawId", -1), R(ct, "_currentParent", null), y(ct, ge, null), y(ct, Ya, null), y(ct, Ka, null), R(ct, "_INNER_MARGIN", 3);
let Nu = ct;
var Mi, me, ve, Ja, Wl, We, Ie, Gs, Qa, Za, qa, Vl, bu;
class LA {
  constructor(e, t, s, i, r, a) {
    y(this, Vl);
    y(this, Mi, new Float64Array(6));
    y(this, me);
    y(this, ve);
    y(this, Ja);
    y(this, Wl);
    y(this, We);
    y(this, Ie, "");
    y(this, Gs, 0);
    y(this, Qa, new Od());
    y(this, Za);
    y(this, qa);
    g(this, Za, s), g(this, qa, i), g(this, Ja, r), g(this, Wl, a), [e, t] = w(this, Vl, bu).call(this, e, t);
    const o = g(this, me, [NaN, NaN, NaN, NaN, e, t]);
    g(this, We, [e, t]), g(this, ve, [{
      line: o,
      points: n(this, We)
    }]), n(this, Mi).set(o, 0);
  }
  updateProperty(e, t) {
    e === "stroke-width" && g(this, Wl, t);
  }
  isEmpty() {
    return !n(this, ve) || n(this, ve).length === 0;
  }
  isCancellable() {
    return n(this, We).length <= 10;
  }
  add(e, t) {
    [e, t] = w(this, Vl, bu).call(this, e, t);
    const [s, i, r, a] = n(this, Mi).subarray(2, 6), o = e - r, l = t - a;
    return Math.hypot(n(this, Za) * o, n(this, qa) * l) <= 2 ? null : (n(this, We).push(e, t), isNaN(s) ? (n(this, Mi).set([r, a, e, t], 2), n(this, me).push(NaN, NaN, NaN, NaN, e, t), {
      path: {
        d: this.toSVGPath()
      }
    }) : (isNaN(n(this, Mi)[0]) && n(this, me).splice(6, 6), n(this, Mi).set([s, i, r, a, e, t], 0), n(this, me).push(...V.createBezierPoints(s, i, r, a, e, t)), {
      path: {
        d: this.toSVGPath()
      }
    }));
  }
  end(e, t) {
    const s = this.add(e, t);
    return s || (n(this, We).length === 2 ? {
      path: {
        d: this.toSVGPath()
      }
    } : null);
  }
  startNew(e, t, s, i, r) {
    g(this, Za, s), g(this, qa, i), g(this, Ja, r), [e, t] = w(this, Vl, bu).call(this, e, t);
    const a = g(this, me, [NaN, NaN, NaN, NaN, e, t]);
    g(this, We, [e, t]);
    const o = n(this, ve).at(-1);
    return o && (o.line = new Float32Array(o.line), o.points = new Float32Array(o.points)), n(this, ve).push({
      line: a,
      points: n(this, We)
    }), n(this, Mi).set(a, 0), g(this, Gs, 0), this.toSVGPath(), null;
  }
  getLastElement() {
    return n(this, ve).at(-1);
  }
  setLastElement(e) {
    return n(this, ve) ? (n(this, ve).push(e), g(this, me, e.line), g(this, We, e.points), g(this, Gs, 0), {
      path: {
        d: this.toSVGPath()
      }
    }) : n(this, Qa).setLastElement(e);
  }
  removeLastElement() {
    if (!n(this, ve))
      return n(this, Qa).removeLastElement();
    n(this, ve).pop(), g(this, Ie, "");
    for (let e = 0, t = n(this, ve).length; e < t; e++) {
      const {
        line: s,
        points: i
      } = n(this, ve)[e];
      g(this, me, s), g(this, We, i), g(this, Gs, 0), this.toSVGPath();
    }
    return {
      path: {
        d: n(this, Ie)
      }
    };
  }
  toSVGPath() {
    const e = V.svgRound(n(this, me)[4]), t = V.svgRound(n(this, me)[5]);
    if (n(this, We).length === 2)
      return g(this, Ie, `${n(this, Ie)} M ${e} ${t} Z`), n(this, Ie);
    if (n(this, We).length <= 6) {
      const i = n(this, Ie).lastIndexOf("M");
      g(this, Ie, `${n(this, Ie).slice(0, i)} M ${e} ${t}`), g(this, Gs, 6);
    }
    if (n(this, We).length === 4) {
      const i = V.svgRound(n(this, me)[10]), r = V.svgRound(n(this, me)[11]);
      return g(this, Ie, `${n(this, Ie)} L ${i} ${r}`), g(this, Gs, 12), n(this, Ie);
    }
    const s = [];
    n(this, Gs) === 0 && (s.push(`M ${e} ${t}`), g(this, Gs, 6));
    for (let i = n(this, Gs), r = n(this, me).length; i < r; i += 6) {
      const [a, o, l, h, d, u] = n(this, me).slice(i, i + 6).map(V.svgRound);
      s.push(`C${a} ${o} ${l} ${h} ${d} ${u}`);
    }
    return g(this, Ie, n(this, Ie) + s.join(" ")), g(this, Gs, n(this, me).length), n(this, Ie);
  }
  getOutlines(e, t, s, i) {
    const r = n(this, ve).at(-1);
    return r.line = new Float32Array(r.line), r.points = new Float32Array(r.points), n(this, Qa).build(n(this, ve), e, t, s, n(this, Ja), n(this, Wl), i), g(this, Mi, null), g(this, me, null), g(this, ve, null), g(this, Ie, null), n(this, Qa);
  }
  get defaultSVGProperties() {
    return {
      root: {
        viewBox: "0 0 10000 10000"
      },
      rootClass: {
        draw: !0
      },
      bbox: [0, 0, 1, 1]
    };
  }
}
Mi = new WeakMap(), me = new WeakMap(), ve = new WeakMap(), Ja = new WeakMap(), Wl = new WeakMap(), We = new WeakMap(), Ie = new WeakMap(), Gs = new WeakMap(), Qa = new WeakMap(), Za = new WeakMap(), qa = new WeakMap(), Vl = new WeakSet(), bu = function(e, t) {
  return V._normalizePoint(e, t, n(this, Za), n(this, qa), n(this, Ja));
};
var Ve, Sd, xd, ws, Oi, Li, zl, Xl, to, Re, Wi, dy, uy, fy;
class Od extends V {
  constructor() {
    super(...arguments);
    y(this, Re);
    y(this, Ve);
    y(this, Sd, 0);
    y(this, xd);
    y(this, ws);
    y(this, Oi);
    y(this, Li);
    y(this, zl);
    y(this, Xl);
    y(this, to);
  }
  build(t, s, i, r, a, o, l) {
    g(this, Oi, s), g(this, Li, i), g(this, zl, r), g(this, Xl, a), g(this, to, o), g(this, xd, l ?? 0), g(this, ws, t), w(this, Re, uy).call(this);
  }
  get thickness() {
    return n(this, to);
  }
  setLastElement(t) {
    return n(this, ws).push(t), {
      path: {
        d: this.toSVGPath()
      }
    };
  }
  removeLastElement() {
    return n(this, ws).pop(), {
      path: {
        d: this.toSVGPath()
      }
    };
  }
  toSVGPath() {
    const t = [];
    for (const {
      line: s
    } of n(this, ws)) {
      if (t.push(`M${V.svgRound(s[4])} ${V.svgRound(s[5])}`), s.length === 6) {
        t.push("Z");
        continue;
      }
      if (s.length === 12 && isNaN(s[6])) {
        t.push(`L${V.svgRound(s[10])} ${V.svgRound(s[11])}`);
        continue;
      }
      for (let i = 6, r = s.length; i < r; i += 6) {
        const [a, o, l, h, d, u] = s.subarray(i, i + 6).map(V.svgRound);
        t.push(`C${a} ${o} ${l} ${h} ${d} ${u}`);
      }
    }
    return t.join("");
  }
  serialize([t, s, i, r], a) {
    const o = [], l = [], [h, d, u, f] = w(this, Re, dy).call(this);
    let p, m, v, A, b, E, S, T, x;
    switch (n(this, Xl)) {
      case 0:
        x = V._rescale, p = t, m = s + r, v = i, A = -r, b = t + h * i, E = s + (1 - d - f) * r, S = t + (h + u) * i, T = s + (1 - d) * r;
        break;
      case 90:
        x = V._rescaleAndSwap, p = t, m = s, v = i, A = r, b = t + d * i, E = s + h * r, S = t + (d + f) * i, T = s + (h + u) * r;
        break;
      case 180:
        x = V._rescale, p = t + i, m = s, v = -i, A = r, b = t + (1 - h - u) * i, E = s + d * r, S = t + (1 - h) * i, T = s + (d + f) * r;
        break;
      case 270:
        x = V._rescaleAndSwap, p = t + i, m = s + r, v = -i, A = -r, b = t + (1 - d - f) * i, E = s + (1 - h - u) * r, S = t + (1 - d) * i, T = s + (1 - h) * r;
        break;
    }
    for (const {
      line: C,
      points: I
    } of n(this, ws))
      o.push(x(C, p, m, v, A, a ? new Array(C.length) : null)), l.push(x(I, p, m, v, A, a ? new Array(I.length) : null));
    return {
      lines: o,
      points: l,
      rect: [b, E, S, T]
    };
  }
  static deserialize(t, s, i, r, a, {
    paths: {
      lines: o,
      points: l
    },
    rotation: h,
    thickness: d
  }) {
    const u = [];
    let f, p, m, v, A;
    switch (h) {
      case 0:
        A = V._rescale, f = -t / i, p = s / r + 1, m = 1 / i, v = -1 / r;
        break;
      case 90:
        A = V._rescaleAndSwap, f = -s / r, p = -t / i, m = 1 / r, v = 1 / i;
        break;
      case 180:
        A = V._rescale, f = t / i + 1, p = -s / r, m = -1 / i, v = 1 / r;
        break;
      case 270:
        A = V._rescaleAndSwap, f = s / r + 1, p = t / i + 1, m = -1 / r, v = -1 / i;
        break;
    }
    if (!o) {
      o = [];
      for (const E of l) {
        const S = E.length;
        if (S === 2) {
          o.push(new Float32Array([NaN, NaN, NaN, NaN, E[0], E[1]]));
          continue;
        }
        if (S === 4) {
          o.push(new Float32Array([NaN, NaN, NaN, NaN, E[0], E[1], NaN, NaN, NaN, NaN, E[2], E[3]]));
          continue;
        }
        const T = new Float32Array(3 * (S - 2));
        o.push(T);
        let [x, C, I, M] = E.subarray(0, 4);
        T.set([NaN, NaN, NaN, NaN, x, C], 0);
        for (let P = 4; P < S; P += 2) {
          const O = E[P], D = E[P + 1];
          T.set(V.createBezierPoints(x, C, I, M, O, D), (P - 2) * 3), [x, C, I, M] = [I, M, O, D];
        }
      }
    }
    for (let E = 0, S = o.length; E < S; E++)
      u.push({
        line: A(o[E].map((T) => T ?? NaN), f, p, m, v),
        points: A(l[E].map((T) => T ?? NaN), f, p, m, v)
      });
    const b = new this.prototype.constructor();
    return b.build(u, i, r, 1, h, d, a), b;
  }
  get box() {
    return n(this, Ve);
  }
  updateProperty(t, s) {
    return t === "stroke-width" ? w(this, Re, fy).call(this, s) : null;
  }
  updateParentDimensions([t, s], i) {
    const [r, a] = w(this, Re, Wi).call(this);
    g(this, Oi, t), g(this, Li, s), g(this, zl, i);
    const [o, l] = w(this, Re, Wi).call(this), h = o - r, d = l - a, u = n(this, Ve);
    return u[0] -= h, u[1] -= d, u[2] += 2 * h, u[3] += 2 * d, u;
  }
  updateRotation(t) {
    return g(this, Sd, t), {
      path: {
        transform: this.rotationTransform
      }
    };
  }
  get viewBox() {
    return n(this, Ve).map(V.svgRound).join(" ");
  }
  get defaultProperties() {
    const [t, s] = n(this, Ve);
    return {
      root: {
        viewBox: this.viewBox
      },
      path: {
        "transform-origin": `${V.svgRound(t)} ${V.svgRound(s)}`
      }
    };
  }
  get rotationTransform() {
    const [, , t, s] = n(this, Ve);
    let i = 0, r = 0, a = 0, o = 0, l = 0, h = 0;
    switch (n(this, Sd)) {
      case 90:
        r = s / t, a = -t / s, l = t;
        break;
      case 180:
        i = -1, o = -1, l = t, h = s;
        break;
      case 270:
        r = -s / t, a = t / s, h = s;
        break;
      default:
        return "";
    }
    return `matrix(${i} ${r} ${a} ${o} ${V.svgRound(l)} ${V.svgRound(h)})`;
  }
  getPathResizingSVGProperties([t, s, i, r]) {
    const [a, o] = w(this, Re, Wi).call(this), [l, h, d, u] = n(this, Ve);
    if (Math.abs(d - a) <= V.PRECISION || Math.abs(u - o) <= V.PRECISION) {
      const A = t + i / 2 - (l + d / 2), b = s + r / 2 - (h + u / 2);
      return {
        path: {
          "transform-origin": `${V.svgRound(t)} ${V.svgRound(s)}`,
          transform: `${this.rotationTransform} translate(${A} ${b})`
        }
      };
    }
    const f = (i - 2 * a) / (d - 2 * a), p = (r - 2 * o) / (u - 2 * o), m = d / i, v = u / r;
    return {
      path: {
        "transform-origin": `${V.svgRound(l)} ${V.svgRound(h)}`,
        transform: `${this.rotationTransform} scale(${m} ${v}) translate(${V.svgRound(a)} ${V.svgRound(o)}) scale(${f} ${p}) translate(${V.svgRound(-a)} ${V.svgRound(-o)})`
      }
    };
  }
  getPathResizedSVGProperties([t, s, i, r]) {
    const [a, o] = w(this, Re, Wi).call(this), l = n(this, Ve), [h, d, u, f] = l;
    if (l[0] = t, l[1] = s, l[2] = i, l[3] = r, Math.abs(u - a) <= V.PRECISION || Math.abs(f - o) <= V.PRECISION) {
      const b = t + i / 2 - (h + u / 2), E = s + r / 2 - (d + f / 2);
      for (const {
        line: S,
        points: T
      } of n(this, ws))
        V._translate(S, b, E, S), V._translate(T, b, E, T);
      return {
        root: {
          viewBox: this.viewBox
        },
        path: {
          "transform-origin": `${V.svgRound(t)} ${V.svgRound(s)}`,
          transform: this.rotationTransform || null,
          d: this.toSVGPath()
        }
      };
    }
    const p = (i - 2 * a) / (u - 2 * a), m = (r - 2 * o) / (f - 2 * o), v = -p * (h + a) + t + a, A = -m * (d + o) + s + o;
    if (p !== 1 || m !== 1 || v !== 0 || A !== 0)
      for (const {
        line: b,
        points: E
      } of n(this, ws))
        V._rescale(b, v, A, p, m, b), V._rescale(E, v, A, p, m, E);
    return {
      root: {
        viewBox: this.viewBox
      },
      path: {
        "transform-origin": `${V.svgRound(t)} ${V.svgRound(s)}`,
        transform: this.rotationTransform || null,
        d: this.toSVGPath()
      }
    };
  }
  getPathTranslatedSVGProperties([t, s], i) {
    const [r, a] = i, o = n(this, Ve), l = t - o[0], h = s - o[1];
    if (n(this, Oi) === r && n(this, Li) === a)
      for (const {
        line: d,
        points: u
      } of n(this, ws))
        V._translate(d, l, h, d), V._translate(u, l, h, u);
    else {
      const d = n(this, Oi) / r, u = n(this, Li) / a;
      g(this, Oi, r), g(this, Li, a);
      for (const {
        line: f,
        points: p
      } of n(this, ws))
        V._rescale(f, l, h, d, u, f), V._rescale(p, l, h, d, u, p);
      o[2] *= d, o[3] *= u;
    }
    return o[0] = t, o[1] = s, {
      root: {
        viewBox: this.viewBox
      },
      path: {
        d: this.toSVGPath(),
        "transform-origin": `${V.svgRound(t)} ${V.svgRound(s)}`
      }
    };
  }
  get defaultSVGProperties() {
    const t = n(this, Ve);
    return {
      root: {
        viewBox: this.viewBox
      },
      rootClass: {
        draw: !0
      },
      path: {
        d: this.toSVGPath(),
        "transform-origin": `${V.svgRound(t[0])} ${V.svgRound(t[1])}`,
        transform: this.rotationTransform || null
      },
      bbox: t
    };
  }
}
Ve = new WeakMap(), Sd = new WeakMap(), xd = new WeakMap(), ws = new WeakMap(), Oi = new WeakMap(), Li = new WeakMap(), zl = new WeakMap(), Xl = new WeakMap(), to = new WeakMap(), Re = new WeakSet(), Wi = function(t = n(this, to)) {
  const s = n(this, xd) + t / 2 * n(this, zl);
  return n(this, Xl) % 180 === 0 ? [s / n(this, Oi), s / n(this, Li)] : [s / n(this, Li), s / n(this, Oi)];
}, dy = function() {
  const [t, s, i, r] = n(this, Ve), [a, o] = w(this, Re, Wi).call(this, 0);
  return [t + a, s + o, i - 2 * a, r - 2 * o];
}, uy = function() {
  const t = g(this, Ve, new Float32Array([1 / 0, 1 / 0, -1 / 0, -1 / 0]));
  for (const {
    line: r
  } of n(this, ws)) {
    if (r.length <= 12) {
      for (let l = 4, h = r.length; l < h; l += 6)
        j.pointBoundingBox(r[l], r[l + 1], t);
      continue;
    }
    let a = r[4], o = r[5];
    for (let l = 6, h = r.length; l < h; l += 6) {
      const [d, u, f, p, m, v] = r.subarray(l, l + 6);
      j.bezierBoundingBox(a, o, d, u, f, p, m, v, t), a = m, o = v;
    }
  }
  const [s, i] = w(this, Re, Wi).call(this);
  t[0] = Ae(t[0] - s, 0, 1), t[1] = Ae(t[1] - i, 0, 1), t[2] = Ae(t[2] + s, 0, 1), t[3] = Ae(t[3] + i, 0, 1), t[2] -= t[0], t[3] -= t[1];
}, fy = function(t) {
  const [s, i] = w(this, Re, Wi).call(this);
  g(this, to, t);
  const [r, a] = w(this, Re, Wi).call(this), [o, l] = [r - s, a - i], h = n(this, Ve);
  return h[0] -= o, h[1] -= l, h[2] += 2 * o, h[3] += 2 * l, h;
};
class bf extends hy {
  constructor(e) {
    super(), this._viewParameters = e, super.updateProperties({
      fill: "none",
      stroke: kt._defaultLineColor,
      "stroke-opacity": 1,
      "stroke-width": 1,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-miterlimit": 10
    });
  }
  updateSVGProperty(e, t) {
    e === "stroke-width" && (t ?? (t = this["stroke-width"]), t *= this._viewParameters.realScale), super.updateSVGProperty(e, t);
  }
  clone() {
    const e = new bf(this._viewParameters);
    return e.updateAll(this), e;
  }
}
var nf, py;
const Co = class Co extends Nu {
  constructor(t) {
    super({
      ...t,
      name: "inkEditor"
    });
    y(this, nf);
    this._willKeepAspectRatio = !0, this.defaultL10nId = "pdfjs-editor-ink-editor";
  }
  static initialize(t, s) {
    kt.initialize(t, s), this._defaultDrawingOptions = new bf(s.viewParameters);
  }
  static getDefaultDrawingOptions(t) {
    const s = this._defaultDrawingOptions.clone();
    return s.updateProperties(t), s;
  }
  static get supportMultipleDrawings() {
    return !0;
  }
  static get typesMap() {
    return nt(this, "typesMap", /* @__PURE__ */ new Map([[ut.INK_THICKNESS, "stroke-width"], [ut.INK_COLOR, "stroke"], [ut.INK_OPACITY, "stroke-opacity"]]));
  }
  static createDrawerInstance(t, s, i, r, a) {
    return new LA(t, s, i, r, a, this._defaultDrawingOptions["stroke-width"]);
  }
  static deserializeDraw(t, s, i, r, a, o) {
    return Od.deserialize(t, s, i, r, a, o);
  }
  static async deserialize(t, s, i) {
    let r = null;
    if (t instanceof mg) {
      const {
        data: {
          inkLists: o,
          rect: l,
          rotation: h,
          id: d,
          color: u,
          opacity: f,
          borderStyle: {
            rawWidth: p
          },
          popupRef: m,
          richText: v,
          contentsObj: A,
          creationDate: b,
          modificationDate: E
        },
        parent: {
          page: {
            pageNumber: S
          }
        }
      } = t;
      r = t = {
        annotationType: tt.INK,
        color: Array.from(u),
        thickness: p,
        opacity: f,
        paths: {
          points: o
        },
        boxes: null,
        pageIndex: S - 1,
        rect: l.slice(0),
        rotation: h,
        annotationElementId: d,
        id: d,
        deleted: !1,
        popupRef: m,
        richText: v,
        comment: A?.str || null,
        creationDate: b,
        modificationDate: E
      };
    }
    const a = await super.deserialize(t, s, i);
    return a._initialData = r, t.comment && a.setCommentData(t), a;
  }
  get toolbarButtons() {
    return this._colorPicker || (this._colorPicker = new Ou(this)), [["colorPicker", this._colorPicker]];
  }
  get colorType() {
    return ut.INK_COLOR;
  }
  get color() {
    return this._drawingOptions.stroke;
  }
  get opacity() {
    return this._drawingOptions["stroke-opacity"];
  }
  onScaleChanging() {
    if (!this.parent)
      return;
    super.onScaleChanging();
    const {
      _drawId: t,
      _drawingOptions: s,
      parent: i
    } = this;
    s.updateSVGProperty("stroke-width"), i.drawLayer.updateProperties(t, s.toSVGProperties());
  }
  static onScaleChangingWhenDrawing() {
    const t = this._currentParent;
    t && (super.onScaleChangingWhenDrawing(), this._defaultDrawingOptions.updateSVGProperty("stroke-width"), t.drawLayer.updateProperties(this._currentDrawId, this._defaultDrawingOptions.toSVGProperties()));
  }
  createDrawingOptions({
    color: t,
    thickness: s,
    opacity: i
  }) {
    this._drawingOptions = Co.getDefaultDrawingOptions({
      stroke: j.makeHexColor(...t),
      "stroke-width": s,
      "stroke-opacity": i
    });
  }
  serialize(t = !1) {
    if (this.isEmpty())
      return null;
    if (this.deleted)
      return this.serializeDeleted();
    const {
      lines: s,
      points: i
    } = this.serializeDraw(t), {
      _drawingOptions: {
        stroke: r,
        "stroke-opacity": a,
        "stroke-width": o
      }
    } = this, l = Object.assign(super.serialize(t), {
      color: kt._colorManager.convert(r),
      opacity: a,
      thickness: o,
      paths: {
        lines: s,
        points: i
      }
    });
    return this.addComment(l), t ? (l.isCopy = !0, l) : this.annotationElementId && !w(this, nf, py).call(this, l) ? null : (l.id = this.annotationElementId, l);
  }
  renderAnnotationElement(t) {
    if (this.deleted)
      return t.hide(), null;
    const {
      points: s,
      rect: i
    } = this.serializeDraw(!1);
    return t.updateEdited({
      rect: i,
      thickness: this._drawingOptions["stroke-width"],
      points: s,
      popup: this.comment
    }), null;
  }
};
nf = new WeakSet(), py = function(t) {
  const {
    color: s,
    thickness: i,
    opacity: r,
    pageIndex: a
  } = this._initialData;
  return this.hasEditedComment || this._hasBeenMoved || this._hasBeenResized || t.color.some((o, l) => o !== s[l]) || t.thickness !== i || t.opacity !== r || t.pageIndex !== a;
}, R(Co, "_type", "ink"), R(Co, "_editorType", tt.INK), R(Co, "_defaultDrawingOptions", null);
let Gp = Co;
class _p extends Od {
  toSVGPath() {
    let e = super.toSVGPath();
    return e.endsWith("Z") || (e += "Z"), e;
  }
}
q(5213);
const $d = 8, lh = 3;
var eo, At, Wp, ri, gy, my, Vp, Au, vy, yy, by, zp, Xp, Ay;
class Pn {
  static extractContoursFromText(e, {
    fontFamily: t,
    fontStyle: s,
    fontWeight: i
  }, r, a, o, l) {
    let h = new OffscreenCanvas(1, 1), d = h.getContext("2d", {
      alpha: !1
    });
    const u = 200, f = d.font = `${s} ${i} ${u}px ${t}`, {
      actualBoundingBoxLeft: p,
      actualBoundingBoxRight: m,
      actualBoundingBoxAscent: v,
      actualBoundingBoxDescent: A,
      fontBoundingBoxAscent: b,
      fontBoundingBoxDescent: E,
      width: S
    } = d.measureText(e), T = 1.5, x = Math.ceil(Math.max(Math.abs(p) + Math.abs(m) || 0, S) * T), C = Math.ceil(Math.max(Math.abs(v) + Math.abs(A) || u, Math.abs(b) + Math.abs(E) || u) * T);
    h = new OffscreenCanvas(x, C), d = h.getContext("2d", {
      alpha: !0,
      willReadFrequently: !0
    }), d.font = f, d.filter = "grayscale(1)", d.fillStyle = "white", d.fillRect(0, 0, x, C), d.fillStyle = "black", d.fillText(e, x * (T - 1) / 2, C * (3 - T) / 2);
    const I = w(this, At, zp).call(this, d.getImageData(0, 0, x, C).data), M = w(this, At, by).call(this, I), P = w(this, At, Xp).call(this, M), O = w(this, At, Vp).call(this, I, x, C, P);
    return this.processDrawnLines({
      lines: {
        curves: O,
        width: x,
        height: C
      },
      pageWidth: r,
      pageHeight: a,
      rotation: o,
      innerMargin: l,
      mustSmooth: !0,
      areContours: !0
    });
  }
  static process(e, t, s, i, r) {
    const [a, o, l] = w(this, At, Ay).call(this, e), [h, d] = w(this, At, yy).call(this, a, o, l, Math.hypot(o, l) * n(this, eo).sigmaSFactor, n(this, eo).sigmaR, n(this, eo).kernelSize), u = w(this, At, Xp).call(this, d), f = w(this, At, Vp).call(this, h, o, l, u);
    return this.processDrawnLines({
      lines: {
        curves: f,
        width: o,
        height: l
      },
      pageWidth: t,
      pageHeight: s,
      rotation: i,
      innerMargin: r,
      mustSmooth: !0,
      areContours: !0
    });
  }
  static processDrawnLines({
    lines: e,
    pageWidth: t,
    pageHeight: s,
    rotation: i,
    innerMargin: r,
    mustSmooth: a,
    areContours: o
  }) {
    i % 180 !== 0 && ([t, s] = [s, t]);
    const {
      curves: l,
      width: h,
      height: d
    } = e, u = e.thickness ?? 0, f = [], p = Math.min(t / h, s / d), m = p / t, v = p / s, A = [];
    for (const {
      points: E
    } of l) {
      const S = a ? w(this, At, vy).call(this, E) : E;
      if (!S)
        continue;
      A.push(S);
      const T = S.length, x = new Float32Array(T), C = new Float32Array(3 * (T === 2 ? 2 : T - 2));
      if (f.push({
        line: C,
        points: x
      }), T === 2) {
        x[0] = S[0] * m, x[1] = S[1] * v, C.set([NaN, NaN, NaN, NaN, x[0], x[1]], 0);
        continue;
      }
      let [I, M, P, O] = S;
      I *= m, M *= v, P *= m, O *= v, x.set([I, M, P, O], 0), C.set([NaN, NaN, NaN, NaN, I, M], 0);
      for (let D = 4; D < T; D += 2) {
        const $ = x[D] = S[D] * m, F = x[D + 1] = S[D + 1] * v;
        C.set(V.createBezierPoints(I, M, P, O, $, F), (D - 2) * 3), [I, M, P, O] = [P, O, $, F];
      }
    }
    if (f.length === 0)
      return null;
    const b = o ? new _p() : new Od();
    return b.build(f, t, s, 1, i, o ? 0 : u, r), {
      outline: b,
      newCurves: A,
      areContours: o,
      thickness: u,
      width: h,
      height: d
    };
  }
  static async compressSignature({
    outlines: e,
    areContours: t,
    thickness: s,
    width: i,
    height: r
  }) {
    let a = 1 / 0, o = -1 / 0, l = 0;
    for (const E of e) {
      l += E.length;
      for (let S = 2, T = E.length; S < T; S++) {
        const x = E[S] - E[S - 2];
        a = Math.min(a, x), o = Math.max(o, x);
      }
    }
    let h;
    a >= -128 && o <= 127 ? h = Int8Array : a >= -32768 && o <= 32767 ? h = Int16Array : h = Int32Array;
    const d = e.length, u = $d + lh * d, f = new Uint32Array(u);
    let p = 0;
    f[p++] = u * Uint32Array.BYTES_PER_ELEMENT + (l - 2 * d) * h.BYTES_PER_ELEMENT, f[p++] = 0, f[p++] = i, f[p++] = r, f[p++] = t ? 0 : 1, f[p++] = Math.max(0, Math.floor(s ?? 0)), f[p++] = d, f[p++] = h.BYTES_PER_ELEMENT;
    for (const E of e)
      f[p++] = E.length - 2, f[p++] = E[0], f[p++] = E[1];
    const m = new CompressionStream("deflate-raw"), v = m.writable.getWriter();
    await v.ready, v.write(f);
    const A = h.prototype.constructor;
    for (const E of e) {
      const S = new A(E.length - 2);
      for (let T = 2, x = E.length; T < x; T++)
        S[T - 2] = E[T] - E[T - 2];
      v.write(S);
    }
    return v.close(), (await new Response(m.readable).bytes()).toBase64();
  }
  static async decompressSignature(e) {
    try {
      const t = Uint8Array.fromBase64(e), {
        readable: s,
        writable: i
      } = new DecompressionStream("deflate-raw"), r = i.getWriter();
      await r.ready, r.write(t).then(async () => {
        await r.ready, await r.close();
      }).catch(() => {
      });
      let a = null, o = 0;
      for await (const S of s)
        a || (a = new Uint8Array(new Uint32Array(S.buffer, 0, 4)[0])), a.set(S, o), o += S.length;
      const l = new Uint32Array(a.buffer, 0, a.length >> 2), h = l[1];
      if (h !== 0)
        throw new Error(`Invalid version: ${h}`);
      const d = l[2], u = l[3], f = l[4] === 0, p = l[5], m = l[6], v = l[7], A = [], b = ($d + lh * m) * Uint32Array.BYTES_PER_ELEMENT;
      let E;
      switch (v) {
        case Int8Array.BYTES_PER_ELEMENT:
          E = new Int8Array(a.buffer, b);
          break;
        case Int16Array.BYTES_PER_ELEMENT:
          E = new Int16Array(a.buffer, b);
          break;
        case Int32Array.BYTES_PER_ELEMENT:
          E = new Int32Array(a.buffer, b);
          break;
      }
      o = 0;
      for (let S = 0; S < m; S++) {
        const T = l[lh * S + $d], x = new Float32Array(T + 2);
        A.push(x);
        for (let C = 0; C < lh - 1; C++)
          x[C] = l[lh * S + $d + C + 1];
        for (let C = 0; C < T; C++)
          x[C + 2] = x[C] + E[o++];
      }
      return {
        areContours: f,
        thickness: p,
        outlines: A,
        width: d,
        height: u
      };
    } catch (t) {
      return Z(`decompressSignature: ${t}`), null;
    }
  }
}
eo = new WeakMap(), At = new WeakSet(), Wp = function(e, t, s, i) {
  return s -= e, i -= t, s === 0 ? i > 0 ? 0 : 4 : s === 1 ? i + 6 : 2 - i;
}, ri = new WeakMap(), gy = function(e, t, s, i, r, a, o) {
  const l = w(this, At, Wp).call(this, s, i, r, a);
  for (let h = 0; h < 8; h++) {
    const d = (-h + l - o + 16) % 8, u = n(this, ri)[2 * d], f = n(this, ri)[2 * d + 1];
    if (e[(s + u) * t + (i + f)] !== 0)
      return d;
  }
  return -1;
}, my = function(e, t, s, i, r, a, o) {
  const l = w(this, At, Wp).call(this, s, i, r, a);
  for (let h = 0; h < 8; h++) {
    const d = (h + l + o + 16) % 8, u = n(this, ri)[2 * d], f = n(this, ri)[2 * d + 1];
    if (e[(s + u) * t + (i + f)] !== 0)
      return d;
  }
  return -1;
}, Vp = function(e, t, s, i) {
  const r = e.length, a = new Int32Array(r);
  for (let d = 0; d < r; d++)
    a[d] = e[d] <= i ? 1 : 0;
  for (let d = 1; d < s - 1; d++)
    a[d * t] = a[d * t + t - 1] = 0;
  for (let d = 0; d < t; d++)
    a[d] = a[t * s - 1 - d] = 0;
  let o = 1, l;
  const h = [];
  for (let d = 1; d < s - 1; d++) {
    l = 1;
    for (let u = 1; u < t - 1; u++) {
      const f = d * t + u, p = a[f];
      if (p === 0)
        continue;
      let m = d, v = u;
      if (p === 1 && a[f - 1] === 0)
        o += 1, v -= 1;
      else if (p >= 1 && a[f + 1] === 0)
        o += 1, v += 1, p > 1 && (l = p);
      else {
        p !== 1 && (l = Math.abs(p));
        continue;
      }
      const A = [u, d], b = v === u + 1, E = {
        isHole: b,
        points: A,
        id: o,
        parent: 0
      };
      h.push(E);
      let S;
      for (const D of h)
        if (D.id === l) {
          S = D;
          break;
        }
      S ? S.isHole ? E.parent = b ? S.parent : l : E.parent = b ? l : S.parent : E.parent = b ? l : 0;
      const T = w(this, At, gy).call(this, a, t, d, u, m, v, 0);
      if (T === -1) {
        a[f] = -o, a[f] !== 1 && (l = Math.abs(a[f]));
        continue;
      }
      let x = n(this, ri)[2 * T], C = n(this, ri)[2 * T + 1];
      const I = d + x, M = u + C;
      m = I, v = M;
      let P = d, O = u;
      for (; ; ) {
        const D = w(this, At, my).call(this, a, t, P, O, m, v, 1);
        x = n(this, ri)[2 * D], C = n(this, ri)[2 * D + 1];
        const $ = P + x, F = O + C;
        A.push(F, $);
        const N = P * t + O;
        if (a[N + 1] === 0 ? a[N] = -o : a[N] === 1 && (a[N] = o), $ === d && F === u && P === I && O === M) {
          a[f] !== 1 && (l = Math.abs(a[f]));
          break;
        } else
          m = P, v = O, P = $, O = F;
      }
    }
  }
  return h;
}, Au = function(e, t, s, i) {
  if (s - t <= 4) {
    for (let I = t; I < s - 2; I += 2)
      i.push(e[I], e[I + 1]);
    return;
  }
  const r = e[t], a = e[t + 1], o = e[s - 4] - r, l = e[s - 3] - a, h = Math.hypot(o, l), d = o / h, u = l / h, f = d * a - u * r, p = l / o, m = 1 / h, v = Math.atan(p), A = Math.cos(v), b = Math.sin(v), E = m * (Math.abs(A) + Math.abs(b)), S = m * (1 - E + E ** 2), T = Math.max(Math.atan(Math.abs(b + A) * S), Math.atan(Math.abs(b - A) * S));
  let x = 0, C = t;
  for (let I = t + 2; I < s - 2; I += 2) {
    const M = Math.abs(f - d * e[I + 1] + u * e[I]);
    M > x && (C = I, x = M);
  }
  x > (h * T) ** 2 ? (w(this, At, Au).call(this, e, t, C + 2, i), w(this, At, Au).call(this, e, C, s, i)) : i.push(r, a);
}, vy = function(e) {
  const t = [], s = e.length;
  return w(this, At, Au).call(this, e, 0, s, t), t.push(e[s - 2], e[s - 1]), t.length <= 4 ? null : t;
}, yy = function(e, t, s, i, r, a) {
  const o = new Float32Array(a ** 2), l = -2 * i ** 2, h = a >> 1;
  for (let v = 0; v < a; v++) {
    const A = (v - h) ** 2;
    for (let b = 0; b < a; b++)
      o[v * a + b] = Math.exp((A + (b - h) ** 2) / l);
  }
  const d = new Float32Array(256), u = -2 * r ** 2;
  for (let v = 0; v < 256; v++)
    d[v] = Math.exp(v ** 2 / u);
  const f = e.length, p = new Uint8Array(f), m = new Uint32Array(256);
  for (let v = 0; v < s; v++)
    for (let A = 0; A < t; A++) {
      const b = v * t + A, E = e[b];
      let S = 0, T = 0;
      for (let C = 0; C < a; C++) {
        const I = v + C - h;
        if (!(I < 0 || I >= s))
          for (let M = 0; M < a; M++) {
            const P = A + M - h;
            if (P < 0 || P >= t)
              continue;
            const O = e[I * t + P], D = o[C * a + M] * d[Math.abs(O - E)];
            S += O * D, T += D;
          }
      }
      const x = p[b] = Math.round(S / T);
      m[x]++;
    }
  return [p, m];
}, by = function(e) {
  const t = new Uint32Array(256);
  for (const s of e)
    t[s]++;
  return t;
}, zp = function(e) {
  const t = e.length, s = new Uint8ClampedArray(t >> 2);
  let i = -1 / 0, r = 1 / 0;
  for (let o = 0, l = s.length; o < l; o++) {
    const h = s[o] = e[o << 2];
    i = Math.max(i, h), r = Math.min(r, h);
  }
  const a = 255 / (i - r);
  for (let o = 0, l = s.length; o < l; o++)
    s[o] = (s[o] - r) * a;
  return s;
}, Xp = function(e) {
  let t, s = -1 / 0, i = -1 / 0;
  const r = e.findIndex((l) => l !== 0);
  let a = r, o = r;
  for (t = r; t < 256; t++) {
    const l = e[t];
    l > s && (t - a > i && (i = t - a, o = t - 1), s = l, a = t);
  }
  for (t = o - 1; t >= 0 && !(e[t] > e[t + 1]); t--)
    ;
  return t;
}, Ay = function(e) {
  const t = e, {
    width: s,
    height: i
  } = e, {
    maxDim: r
  } = n(this, eo);
  let a = s, o = i;
  if (s > r || i > r) {
    let f = s, p = i, m = Math.log2(Math.max(s, i) / r);
    const v = Math.floor(m);
    m = m === v ? v - 1 : v;
    for (let b = 0; b < m; b++) {
      a = Math.ceil(f / 2), o = Math.ceil(p / 2);
      const E = new OffscreenCanvas(a, o);
      E.getContext("2d").drawImage(e, 0, 0, f, p, 0, 0, a, o), f = a, p = o, e !== t && e.close(), e = E.transferToImageBitmap();
    }
    const A = Math.min(r / a, r / o);
    a = Math.round(a * A), o = Math.round(o * A);
  }
  const h = new OffscreenCanvas(a, o).getContext("2d", {
    willReadFrequently: !0
  });
  h.fillStyle = "white", h.fillRect(0, 0, a, o), h.filter = "grayscale(1)", h.drawImage(e, 0, 0, e.width, e.height, 0, 0, a, o);
  const d = h.getImageData(0, 0, a, o).data;
  return [w(this, At, zp).call(this, d), a, o];
}, y(Pn, At), y(Pn, eo, {
  maxDim: 512,
  sigmaSFactor: 0.02,
  sigmaR: 25,
  kernelSize: 16
}), y(Pn, ri, new Int32Array([0, 1, -1, 1, -1, 0, -1, -1, 0, -1, 1, -1, 1, 0, 1, 1]));
class vg extends hy {
  constructor() {
    super(), super.updateProperties({
      fill: kt._defaultLineColor,
      "stroke-width": 0
    });
  }
  clone() {
    const e = new vg();
    return e.updateAll(this), e;
  }
}
class yg extends bf {
  constructor(e) {
    super(e), super.updateProperties({
      stroke: kt._defaultLineColor,
      "stroke-width": 1
    });
  }
  clone() {
    const e = new yg(this._viewParameters);
    return e.updateAll(this), e;
  }
}
var wr, Fi, Er, so;
const rs = class rs extends Nu {
  constructor(t) {
    super({
      ...t,
      mustBeCommitted: !0,
      name: "signatureEditor"
    });
    y(this, wr, !1);
    y(this, Fi, null);
    y(this, Er, null);
    y(this, so, null);
    this._willKeepAspectRatio = !0, g(this, Er, t.signatureData || null), g(this, Fi, null), this.defaultL10nId = "pdfjs-editor-signature-editor1";
  }
  static initialize(t, s) {
    kt.initialize(t, s), this._defaultDrawingOptions = new vg(), this._defaultDrawnSignatureOptions = new yg(s.viewParameters);
  }
  static getDefaultDrawingOptions(t) {
    const s = this._defaultDrawingOptions.clone();
    return s.updateProperties(t), s;
  }
  static get supportMultipleDrawings() {
    return !1;
  }
  static get typesMap() {
    return nt(this, "typesMap", /* @__PURE__ */ new Map());
  }
  static get isDrawer() {
    return !1;
  }
  get telemetryFinalData() {
    return {
      type: "signature",
      hasDescription: !!n(this, Fi)
    };
  }
  static computeTelemetryFinalData(t) {
    const s = t.get("hasDescription");
    return {
      hasAltText: s.get(!0) ?? 0,
      hasNoAltText: s.get(!1) ?? 0
    };
  }
  get isResizable() {
    return !0;
  }
  onScaleChanging() {
    this._drawId !== null && super.onScaleChanging();
  }
  render() {
    if (this.div)
      return this.div;
    let t, s;
    const {
      _isCopy: i
    } = this;
    if (i && (this._isCopy = !1, t = this.x, s = this.y), super.render(), this._drawId === null)
      if (n(this, Er)) {
        const {
          lines: r,
          mustSmooth: a,
          areContours: o,
          description: l,
          uuid: h,
          heightInPage: d
        } = n(this, Er), {
          rawDims: {
            pageWidth: u,
            pageHeight: f
          },
          rotation: p
        } = this.parent.viewport, m = Pn.processDrawnLines({
          lines: r,
          pageWidth: u,
          pageHeight: f,
          rotation: p,
          innerMargin: rs._INNER_MARGIN,
          mustSmooth: a,
          areContours: o
        });
        this.addSignature(m, d, l, h);
      } else
        this.div.setAttribute("data-l10n-args", JSON.stringify({
          description: ""
        })), this.div.hidden = !0, this._uiManager.getSignature(this);
    else
      this.div.setAttribute("data-l10n-args", JSON.stringify({
        description: n(this, Fi) || ""
      }));
    return i && (this._isCopy = !0, this._moveAfterPaste(t, s)), this.div;
  }
  setUuid(t) {
    g(this, so, t), this.addEditToolbar();
  }
  getUuid() {
    return n(this, so);
  }
  get description() {
    return n(this, Fi);
  }
  set description(t) {
    g(this, Fi, t), this.div && (this.div.setAttribute("data-l10n-args", JSON.stringify({
      description: t
    })), super.addEditToolbar().then((s) => {
      s?.updateEditSignatureButton(t);
    }));
  }
  getSignaturePreview() {
    const {
      newCurves: t,
      areContours: s,
      thickness: i,
      width: r,
      height: a
    } = n(this, Er), o = Math.max(r, a), l = Pn.processDrawnLines({
      lines: {
        curves: t.map((h) => ({
          points: h
        })),
        thickness: i,
        width: r,
        height: a
      },
      pageWidth: o,
      pageHeight: o,
      rotation: 0,
      innerMargin: 0,
      mustSmooth: !1,
      areContours: s
    });
    return {
      areContours: s,
      outline: l.outline
    };
  }
  get toolbarButtons() {
    return this._uiManager.signatureManager ? [["editSignature", this._uiManager.signatureManager]] : super.toolbarButtons;
  }
  addSignature(t, s, i, r) {
    const {
      x: a,
      y: o
    } = this, {
      outline: l
    } = g(this, Er, t);
    g(this, wr, l instanceof _p), this.description = i;
    let h;
    n(this, wr) ? h = rs.getDefaultDrawingOptions() : (h = rs._defaultDrawnSignatureOptions.clone(), h.updateProperties({
      "stroke-width": l.thickness
    })), this._addOutlines({
      drawOutlines: l,
      drawingOptions: h
    });
    const [, d] = this.pageDimensions;
    let u = s / d;
    u = u >= 1 ? 0.5 : u, this.width *= u / this.height, this.width >= 1 && (u *= 0.9 / this.width, this.width = 0.9), this.height = u, this.setDims(), this.x = a, this.y = o, this.center(), this._onResized(), this.onScaleChanging(), this.rotate(), this._uiManager.addToAnnotationStorage(this), this.setUuid(r), this._reportTelemetry({
      action: "pdfjs.signature.inserted",
      data: {
        hasBeenSaved: !!r,
        hasDescription: !!i
      }
    }), this.div.hidden = !1;
  }
  getFromImage(t) {
    const {
      rawDims: {
        pageWidth: s,
        pageHeight: i
      },
      rotation: r
    } = this.parent.viewport;
    return Pn.process(t, s, i, r, rs._INNER_MARGIN);
  }
  getFromText(t, s) {
    const {
      rawDims: {
        pageWidth: i,
        pageHeight: r
      },
      rotation: a
    } = this.parent.viewport;
    return Pn.extractContoursFromText(t, s, i, r, a, rs._INNER_MARGIN);
  }
  getDrawnSignature(t) {
    const {
      rawDims: {
        pageWidth: s,
        pageHeight: i
      },
      rotation: r
    } = this.parent.viewport;
    return Pn.processDrawnLines({
      lines: t,
      pageWidth: s,
      pageHeight: i,
      rotation: r,
      innerMargin: rs._INNER_MARGIN,
      mustSmooth: !1,
      areContours: !1
    });
  }
  createDrawingOptions({
    areContours: t,
    thickness: s
  }) {
    t ? this._drawingOptions = rs.getDefaultDrawingOptions() : (this._drawingOptions = rs._defaultDrawnSignatureOptions.clone(), this._drawingOptions.updateProperties({
      "stroke-width": s
    }));
  }
  serialize(t = !1) {
    if (this.isEmpty())
      return null;
    const {
      lines: s,
      points: i
    } = this.serializeDraw(t), {
      _drawingOptions: {
        "stroke-width": r
      }
    } = this, a = Object.assign(super.serialize(t), {
      isSignature: !0,
      areContours: n(this, wr),
      color: [0, 0, 0],
      thickness: n(this, wr) ? 0 : r
    });
    return this.addComment(a), t ? (a.paths = {
      lines: s,
      points: i
    }, a.uuid = n(this, so), a.isCopy = !0) : a.lines = s, n(this, Fi) && (a.accessibilityData = {
      type: "Figure",
      alt: n(this, Fi)
    }), a;
  }
  static deserializeDraw(t, s, i, r, a, o) {
    return o.areContours ? _p.deserialize(t, s, i, r, a, o) : Od.deserialize(t, s, i, r, a, o);
  }
  static async deserialize(t, s, i) {
    const r = await super.deserialize(t, s, i);
    return g(r, wr, t.areContours), r.description = t.accessibilityData?.alt || "", g(r, so, t.uuid), r;
  }
};
wr = new WeakMap(), Fi = new WeakMap(), Er = new WeakMap(), so = new WeakMap(), R(rs, "_type", "signature"), R(rs, "_editorType", tt.SIGNATURE), R(rs, "_defaultDrawingOptions", null);
let Yp = rs;
var Ut, ye, Sr, En, xr, Yl, Sn, io, ki, Es, Kl, gt, Rh, Dh, wu, Eu, Su, Jp, xu, wy;
class Kp extends kt {
  constructor(t) {
    super({
      ...t,
      name: "stampEditor"
    });
    y(this, gt);
    y(this, Ut, null);
    y(this, ye, null);
    y(this, Sr, null);
    y(this, En, null);
    y(this, xr, null);
    y(this, Yl, "");
    y(this, Sn, null);
    y(this, io, !1);
    y(this, ki, null);
    y(this, Es, !1);
    y(this, Kl, !1);
    g(this, En, t.bitmapUrl), g(this, xr, t.bitmapFile), this.defaultL10nId = "pdfjs-editor-stamp-editor";
  }
  static initialize(t, s) {
    kt.initialize(t, s);
  }
  static isHandlingMimeForPasting(t) {
    return Ff.includes(t);
  }
  static paste(t, s) {
    s.pasteEditor({
      mode: tt.STAMP
    }, {
      bitmapFile: t.getAsFile()
    });
  }
  altTextFinish() {
    this._uiManager.useNewAltTextFlow && (this.div.hidden = !1), super.altTextFinish();
  }
  get telemetryFinalData() {
    return {
      type: "stamp",
      hasAltText: !!this.altTextData?.altText
    };
  }
  static computeTelemetryFinalData(t) {
    const s = t.get("hasAltText");
    return {
      hasAltText: s.get(!0) ?? 0,
      hasNoAltText: s.get(!1) ?? 0
    };
  }
  async mlGuessAltText(t = null, s = !0) {
    if (this.hasAltTextData())
      return null;
    const {
      mlManager: i
    } = this._uiManager;
    if (!i)
      throw new Error("No ML.");
    if (!await i.isEnabledFor("altText"))
      throw new Error("ML isn't enabled for alt text.");
    const {
      data: r,
      width: a,
      height: o
    } = t || this.copyCanvas(null, null, !0).imageData, l = await i.guess({
      name: "altText",
      request: {
        data: r,
        width: a,
        height: o,
        channels: r.length / (a * o)
      }
    });
    if (!l)
      throw new Error("No response from the AI service.");
    if (l.error)
      throw new Error("Error from the AI service.");
    if (l.cancel)
      return null;
    if (!l.output)
      throw new Error("No valid response from the AI service.");
    const h = l.output;
    return await this.setGuessedAltText(h), s && !this.hasAltTextData() && (this.altTextData = {
      alt: h,
      decorative: !1
    }), h;
  }
  remove() {
    n(this, ye) && (g(this, Ut, null), this._uiManager.imageManager.deleteId(n(this, ye)), n(this, Sn)?.remove(), g(this, Sn, null), n(this, ki) && (clearTimeout(n(this, ki)), g(this, ki, null))), super.remove();
  }
  rebuild() {
    if (!this.parent) {
      n(this, ye) && w(this, gt, wu).call(this);
      return;
    }
    super.rebuild(), this.div !== null && (n(this, ye) && n(this, Sn) === null && w(this, gt, wu).call(this), this.isAttachedToDOM || this.parent.add(this));
  }
  onceAdded(t) {
    this._isDraggable = !0, t && this.div.focus();
  }
  isEmpty() {
    return !(n(this, Sr) || n(this, Ut) || n(this, En) || n(this, xr) || n(this, ye) || n(this, io));
  }
  get toolbarButtons() {
    return [["altText", this.createAltText()]];
  }
  get isResizable() {
    return !0;
  }
  render() {
    if (this.div)
      return this.div;
    let t, s;
    return this._isCopy && (t = this.x, s = this.y), super.render(), this.div.hidden = !0, this.createAltText(), n(this, io) || (n(this, Ut) ? w(this, gt, Eu).call(this) : w(this, gt, wu).call(this)), this._isCopy && this._moveAfterPaste(t, s), this._uiManager.addShouldRescale(this), this.div;
  }
  setCanvas(t, s) {
    const {
      id: i,
      bitmap: r
    } = this._uiManager.imageManager.getFromCanvas(t, s);
    s.remove(), i && this._uiManager.imageManager.isValidId(i) && (g(this, ye, i), r && g(this, Ut, r), g(this, io, !1), w(this, gt, Eu).call(this));
  }
  _onResized() {
    this.onScaleChanging();
  }
  onScaleChanging() {
    if (!this.parent)
      return;
    n(this, ki) !== null && clearTimeout(n(this, ki)), g(this, ki, setTimeout(() => {
      g(this, ki, null), w(this, gt, Jp).call(this);
    }, 200));
  }
  copyCanvas(t, s, i = !1) {
    t || (t = 224);
    const {
      width: r,
      height: a
    } = n(this, Ut), o = new Ui();
    let l = n(this, Ut), h = r, d = a, u = null;
    if (s) {
      if (r > s || a > s) {
        const I = Math.min(s / r, s / a);
        h = Math.floor(r * I), d = Math.floor(a * I);
      }
      u = document.createElement("canvas");
      const p = u.width = Math.ceil(h * o.sx), m = u.height = Math.ceil(d * o.sy);
      n(this, Es) || (l = w(this, gt, Su).call(this, p, m));
      const v = u.getContext("2d");
      v.filter = this._uiManager.hcmFilter;
      let A = "white", b = "#cfcfd8";
      this._uiManager.hcmFilter !== "none" ? b = "black" : Yy.isDarkMode && (A = "#8f8f9d", b = "#42414d");
      const E = 15, S = E * o.sx, T = E * o.sy, x = new OffscreenCanvas(S * 2, T * 2), C = x.getContext("2d");
      C.fillStyle = A, C.fillRect(0, 0, S * 2, T * 2), C.fillStyle = b, C.fillRect(0, 0, S, T), C.fillRect(S, T, S, T), v.fillStyle = v.createPattern(x, "repeat"), v.fillRect(0, 0, p, m), v.drawImage(l, 0, 0, l.width, l.height, 0, 0, p, m);
    }
    let f = null;
    if (i) {
      let p, m;
      if (o.symmetric && l.width < t && l.height < t)
        p = l.width, m = l.height;
      else if (l = n(this, Ut), r > t || a > t) {
        const b = Math.min(t / r, t / a);
        p = Math.floor(r * b), m = Math.floor(a * b), n(this, Es) || (l = w(this, gt, Su).call(this, p, m));
      }
      const A = new OffscreenCanvas(p, m).getContext("2d", {
        willReadFrequently: !0
      });
      A.drawImage(l, 0, 0, l.width, l.height, 0, 0, p, m), f = {
        width: p,
        height: m,
        data: A.getImageData(0, 0, p, m).data
      };
    }
    return {
      canvas: u,
      width: h,
      height: d,
      imageData: f
    };
  }
  static async deserialize(t, s, i) {
    let r = null, a = !1;
    if (t instanceof Bv) {
      const {
        data: {
          rect: A,
          rotation: b,
          id: E,
          structParent: S,
          popupRef: T,
          richText: x,
          contentsObj: C,
          creationDate: I,
          modificationDate: M
        },
        container: P,
        parent: {
          page: {
            pageNumber: O
          }
        },
        canvas: D
      } = t;
      let $, F;
      D ? (delete t.canvas, {
        id: $,
        bitmap: F
      } = i.imageManager.getFromCanvas(P.id, D), D.remove()) : (a = !0, t._hasNoCanvas = !0);
      const N = (await s._structTree.getAriaAttributes(`${Eo}${E}`))?.get("aria-label") || "";
      r = t = {
        annotationType: tt.STAMP,
        bitmapId: $,
        bitmap: F,
        pageIndex: O - 1,
        rect: A.slice(0),
        rotation: b,
        annotationElementId: E,
        id: E,
        deleted: !1,
        accessibilityData: {
          decorative: !1,
          altText: N
        },
        isSvg: !1,
        structParent: S,
        popupRef: T,
        richText: x,
        comment: C?.str || null,
        creationDate: I,
        modificationDate: M
      };
    }
    const o = await super.deserialize(t, s, i), {
      rect: l,
      bitmap: h,
      bitmapUrl: d,
      bitmapId: u,
      isSvg: f,
      accessibilityData: p
    } = t;
    a ? (i.addMissingCanvas(t.id, o), g(o, io, !0)) : u && i.imageManager.isValidId(u) ? (g(o, ye, u), h && g(o, Ut, h)) : g(o, En, d), g(o, Es, f);
    const [m, v] = o.pageDimensions;
    return o.width = (l[2] - l[0]) / m, o.height = (l[3] - l[1]) / v, p && (o.altTextData = p), o._initialData = r, t.comment && o.setCommentData(t), g(o, Kl, !!r), o;
  }
  serialize(t = !1, s = null) {
    if (this.isEmpty())
      return null;
    if (this.deleted)
      return this.serializeDeleted();
    const i = Object.assign(super.serialize(t), {
      bitmapId: n(this, ye),
      isSvg: n(this, Es)
    });
    if (this.addComment(i), t)
      return i.bitmapUrl = w(this, gt, xu).call(this, !0), i.accessibilityData = this.serializeAltText(!0), i.isCopy = !0, i;
    const {
      decorative: r,
      altText: a
    } = this.serializeAltText(!1);
    if (!r && a && (i.accessibilityData = {
      type: "Figure",
      alt: a
    }), this.annotationElementId) {
      const l = w(this, gt, wy).call(this, i);
      return l.isSame ? null : (l.isSameAltText ? delete i.accessibilityData : i.accessibilityData.structParent = this._initialData.structParent ?? -1, i.id = this.annotationElementId, delete i.bitmapId, i);
    }
    if (s === null)
      return i;
    s.stamps || (s.stamps = /* @__PURE__ */ new Map());
    const o = n(this, Es) ? (i.rect[2] - i.rect[0]) * (i.rect[3] - i.rect[1]) : null;
    if (!s.stamps.has(n(this, ye)))
      s.stamps.set(n(this, ye), {
        area: o,
        serialized: i
      }), i.bitmap = w(this, gt, xu).call(this, !1);
    else if (n(this, Es)) {
      const l = s.stamps.get(n(this, ye));
      o > l.area && (l.area = o, l.serialized.bitmap.close(), l.serialized.bitmap = w(this, gt, xu).call(this, !1));
    }
    return i;
  }
  renderAnnotationElement(t) {
    return this.deleted ? (t.hide(), null) : (t.updateEdited({
      rect: this.getPDFRect(),
      popup: this.comment
    }), null);
  }
}
Ut = new WeakMap(), ye = new WeakMap(), Sr = new WeakMap(), En = new WeakMap(), xr = new WeakMap(), Yl = new WeakMap(), Sn = new WeakMap(), io = new WeakMap(), ki = new WeakMap(), Es = new WeakMap(), Kl = new WeakMap(), gt = new WeakSet(), Rh = function(t, s = !1) {
  if (!t) {
    this.remove();
    return;
  }
  g(this, Ut, t.bitmap), s || (g(this, ye, t.id), g(this, Es, t.isSvg)), t.file && g(this, Yl, t.file.name), w(this, gt, Eu).call(this);
}, Dh = function() {
  if (g(this, Sr, null), this._uiManager.enableWaiting(!1), !!n(this, Sn)) {
    if (this._uiManager.useNewAltTextWhenAddingImage && this._uiManager.useNewAltTextFlow && n(this, Ut)) {
      this.addEditToolbar().then(() => {
        this._editToolbar.hide(), this._uiManager.editAltText(this, !0);
      });
      return;
    }
    if (!this._uiManager.useNewAltTextWhenAddingImage && this._uiManager.useNewAltTextFlow && n(this, Ut)) {
      this._reportTelemetry({
        action: "pdfjs.image.image_added",
        data: {
          alt_text_modal: !1,
          alt_text_type: "empty"
        }
      });
      try {
        this.mlGuessAltText();
      } catch {
      }
    }
    this.div.focus();
  }
}, wu = function() {
  if (n(this, ye)) {
    this._uiManager.enableWaiting(!0), this._uiManager.imageManager.getFromId(n(this, ye)).then((i) => w(this, gt, Rh).call(this, i, !0)).finally(() => w(this, gt, Dh).call(this));
    return;
  }
  if (n(this, En)) {
    const i = n(this, En);
    g(this, En, null), this._uiManager.enableWaiting(!0), g(this, Sr, this._uiManager.imageManager.getFromUrl(i).then((r) => w(this, gt, Rh).call(this, r)).finally(() => w(this, gt, Dh).call(this)));
    return;
  }
  if (n(this, xr)) {
    const i = n(this, xr);
    g(this, xr, null), this._uiManager.enableWaiting(!0), g(this, Sr, this._uiManager.imageManager.getFromFile(i).then((r) => w(this, gt, Rh).call(this, r)).finally(() => w(this, gt, Dh).call(this)));
    return;
  }
  const t = document.createElement("input");
  t.type = "file", t.accept = Ff.join(",");
  const s = this._uiManager._signal;
  g(this, Sr, new Promise((i) => {
    t.addEventListener("change", async () => {
      if (!t.files || t.files.length === 0)
        this.remove();
      else {
        this._uiManager.enableWaiting(!0);
        const r = await this._uiManager.imageManager.getFromFile(t.files[0]);
        this._reportTelemetry({
          action: "pdfjs.image.image_selected",
          data: {
            alt_text_modal: this._uiManager.useNewAltTextFlow
          }
        }), w(this, gt, Rh).call(this, r);
      }
      i();
    }, {
      signal: s
    }), t.addEventListener("cancel", () => {
      this.remove(), i();
    }, {
      signal: s
    });
  }).finally(() => w(this, gt, Dh).call(this))), t.click();
}, Eu = function() {
  const {
    div: t
  } = this;
  let {
    width: s,
    height: i
  } = n(this, Ut);
  const [r, a] = this.pageDimensions, o = 0.75;
  if (this.width)
    s = this.width * r, i = this.height * a;
  else if (s > o * r || i > o * a) {
    const h = Math.min(o * r / s, o * a / i);
    s *= h, i *= h;
  }
  this._uiManager.enableWaiting(!1);
  const l = g(this, Sn, document.createElement("canvas"));
  l.setAttribute("role", "img"), this.addContainer(l), this.width = s / r, this.height = i / a, this.setDims(), this._initialOptions?.isCentered ? this.center() : this.fixAndSetPosition(), this._initialOptions = null, (!this._uiManager.useNewAltTextWhenAddingImage || !this._uiManager.useNewAltTextFlow || this.annotationElementId) && (t.hidden = !1), w(this, gt, Jp).call(this), n(this, Kl) || (this.parent.addUndoableEditor(this), g(this, Kl, !0)), this._reportTelemetry({
    action: "inserted_image"
  }), n(this, Yl) && this.div.setAttribute("aria-description", n(this, Yl)), this.annotationElementId || this._uiManager.a11yAlert("pdfjs-editor-stamp-added-alert");
}, Su = function(t, s) {
  const {
    width: i,
    height: r
  } = n(this, Ut);
  let a = i, o = r, l = n(this, Ut);
  for (; a > 2 * t || o > 2 * s; ) {
    const h = a, d = o;
    a > 2 * t && (a = a >= 16384 ? Math.floor(a / 2) - 1 : Math.ceil(a / 2)), o > 2 * s && (o = o >= 16384 ? Math.floor(o / 2) - 1 : Math.ceil(o / 2));
    const u = new OffscreenCanvas(a, o);
    u.getContext("2d").drawImage(l, 0, 0, h, d, 0, 0, a, o), l = u.transferToImageBitmap();
  }
  return l;
}, Jp = function() {
  const [t, s] = this.parentDimensions, {
    width: i,
    height: r
  } = this, a = new Ui(), o = Math.ceil(i * t * a.sx), l = Math.ceil(r * s * a.sy), h = n(this, Sn);
  if (!h || h.width === o && h.height === l)
    return;
  h.width = o, h.height = l;
  const d = n(this, Es) ? n(this, Ut) : w(this, gt, Su).call(this, o, l), u = h.getContext("2d");
  u.filter = this._uiManager.hcmFilter, u.drawImage(d, 0, 0, d.width, d.height, 0, 0, o, l);
}, xu = function(t) {
  if (t) {
    if (n(this, Es)) {
      const r = this._uiManager.imageManager.getSvgUrl(n(this, ye));
      if (r)
        return r;
    }
    const s = document.createElement("canvas");
    return {
      width: s.width,
      height: s.height
    } = n(this, Ut), s.getContext("2d").drawImage(n(this, Ut), 0, 0), s.toDataURL();
  }
  if (n(this, Es)) {
    const [s, i] = this.pageDimensions, r = Math.round(this.width * s * Mr.PDF_TO_CSS_UNITS), a = Math.round(this.height * i * Mr.PDF_TO_CSS_UNITS), o = new OffscreenCanvas(r, a);
    return o.getContext("2d").drawImage(n(this, Ut), 0, 0, n(this, Ut).width, n(this, Ut).height, 0, 0, r, a), o.transferToImageBitmap();
  }
  return structuredClone(n(this, Ut));
}, wy = function(t) {
  const {
    pageIndex: s,
    accessibilityData: {
      altText: i
    }
  } = this._initialData, r = t.pageIndex === s, a = (t.accessibilityData?.alt || "") === i;
  return {
    isSame: !this.hasEditedComment && !this._hasBeenMoved && !this._hasBeenResized && r && a,
    isSameAltText: a
  };
}, R(Kp, "_type", "stamp"), R(Kp, "_editorType", tt.STAMP);
var no, Jl, Tr, Cr, xn, es, Ir, Ql, Zl, ai, Tn, be, Cn, Pr, ql, z, Rr, Lt, Zp, Ey, pi, qp, tg, Tu;
const Xs = class Xs {
  constructor({
    uiManager: e,
    pageIndex: t,
    div: s,
    structTreeLayer: i,
    accessibilityManager: r,
    annotationLayer: a,
    drawLayer: o,
    textLayer: l,
    viewport: h,
    l10n: d
  }) {
    y(this, Lt);
    y(this, no);
    y(this, Jl, !1);
    y(this, Tr, null);
    y(this, Cr, null);
    y(this, xn, null);
    y(this, es, /* @__PURE__ */ new Map());
    y(this, Ir, !1);
    y(this, Ql, !1);
    y(this, Zl, !1);
    y(this, ai, null);
    y(this, Tn, null);
    y(this, be, null);
    y(this, Cn, null);
    y(this, Pr, null);
    y(this, ql, -1);
    y(this, z);
    const u = [...n(Xs, Rr).values()];
    if (!Xs._initialized) {
      Xs._initialized = !0;
      for (const f of u)
        f.initialize(d, e);
    }
    e.registerEditorTypes(u), g(this, z, e), this.pageIndex = t, this.div = s, g(this, no, r), g(this, Tr, a), this.viewport = h, g(this, be, l), this.drawLayer = o, this._structTree = i, n(this, z).addLayer(this);
  }
  get isEmpty() {
    return n(this, es).size === 0;
  }
  get isInvisible() {
    return this.isEmpty && n(this, z).getMode() === tt.NONE;
  }
  updateToolbar(e) {
    n(this, z).updateToolbar(e);
  }
  updateMode(e = n(this, z).getMode()) {
    switch (w(this, Lt, Tu).call(this), e) {
      case tt.NONE:
        this.div.classList.toggle("nonEditing", !0), this.disableTextSelection(), this.togglePointerEvents(!1), this.toggleAnnotationLayerPointerEvents(!0), this.disableClick();
        return;
      case tt.INK:
        this.disableTextSelection(), this.togglePointerEvents(!0), this.enableClick();
        break;
      case tt.HIGHLIGHT:
        this.enableTextSelection(), this.togglePointerEvents(!1), this.disableClick();
        break;
      default:
        this.disableTextSelection(), this.togglePointerEvents(!0), this.enableClick();
    }
    this.toggleAnnotationLayerPointerEvents(!1);
    const {
      classList: t
    } = this.div;
    if (t.toggle("nonEditing", !1), e === tt.POPUP)
      t.toggle("commentEditing", !0);
    else {
      t.toggle("commentEditing", !1);
      for (const s of n(Xs, Rr).values())
        t.toggle(`${s._type}Editing`, e === s._editorType);
    }
    this.div.hidden = !1;
  }
  hasTextLayer(e) {
    return e === n(this, be)?.div;
  }
  setEditingState(e) {
    n(this, z).setEditingState(e);
  }
  addCommands(e) {
    n(this, z).addCommands(e);
  }
  cleanUndoStack(e) {
    n(this, z).cleanUndoStack(e);
  }
  toggleDrawing(e = !1) {
    this.div.classList.toggle("drawing", !e);
  }
  togglePointerEvents(e = !1) {
    this.div.classList.toggle("disabled", !e);
  }
  toggleAnnotationLayerPointerEvents(e = !1) {
    n(this, Tr)?.togglePointerEvents(e);
  }
  async enable() {
    g(this, Zl, !0), this.div.tabIndex = 0, this.togglePointerEvents(!0), this.div.classList.toggle("nonEditing", !1), n(this, Pr)?.abort(), g(this, Pr, null);
    const e = /* @__PURE__ */ new Set();
    for (const s of n(this, Lt, Zp))
      s.enableEditing(), s.show(!0), s.annotationElementId && (n(this, z).removeChangedExistingAnnotation(s), e.add(s.annotationElementId));
    const t = n(this, Tr);
    if (t)
      for (const s of t.getEditableAnnotations()) {
        if (s.hide(), n(this, z).isDeletedAnnotationElement(s.data.id) || e.has(s.data.id))
          continue;
        const i = await this.deserialize(s);
        i && (this.addOrRebuild(i), i.enableEditing());
      }
    g(this, Zl, !1), n(this, z)._eventBus.dispatch("editorsrendered", {
      source: this,
      pageNumber: this.pageIndex + 1
    });
  }
  disable() {
    if (g(this, Ql, !0), this.div.tabIndex = -1, this.togglePointerEvents(!1), this.div.classList.toggle("nonEditing", !0), n(this, be) && !n(this, Pr)) {
      g(this, Pr, new AbortController());
      const i = n(this, z).combinedSignal(n(this, Pr));
      n(this, be).div.addEventListener("pointerdown", (r) => {
        const {
          clientX: o,
          clientY: l,
          timeStamp: h
        } = r, d = n(this, ql);
        if (h - d > 500) {
          g(this, ql, h);
          return;
        }
        g(this, ql, -1);
        const {
          classList: u
        } = this.div;
        u.toggle("getElements", !0);
        const f = document.elementsFromPoint(o, l);
        if (u.toggle("getElements", !1), !this.div.contains(f[0]))
          return;
        let p;
        const m = new RegExp(`^${Fh}[0-9]+$`);
        for (const A of f)
          if (m.test(A.id)) {
            p = A.id;
            break;
          }
        if (!p)
          return;
        const v = n(this, es).get(p);
        v?.annotationElementId === null && (r.stopPropagation(), r.preventDefault(), v.dblclick(r));
      }, {
        signal: i,
        capture: !0
      });
    }
    const e = n(this, Tr), t = [];
    if (e) {
      const i = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
      for (const a of n(this, Lt, Zp)) {
        if (a.disableEditing(), !a.annotationElementId) {
          t.push(a);
          continue;
        }
        if (a.serialize() !== null) {
          i.set(a.annotationElementId, a);
          continue;
        } else
          r.set(a.annotationElementId, a);
        this.getEditableAnnotation(a.annotationElementId)?.show(), a.remove();
      }
      for (const a of e.getEditableAnnotations()) {
        const {
          id: o
        } = a.data;
        if (n(this, z).isDeletedAnnotationElement(o)) {
          a.updateEdited({
            deleted: !0
          });
          continue;
        }
        let l = r.get(o);
        if (l) {
          l.resetAnnotationElement(a), l.show(!1), a.show();
          continue;
        }
        l = i.get(o), l && (n(this, z).addChangedExistingAnnotation(l), l.renderAnnotationElement(a) && l.show(!1)), a.show();
      }
    }
    w(this, Lt, Tu).call(this), this.isEmpty && (this.div.hidden = !0);
    const {
      classList: s
    } = this.div;
    for (const i of n(Xs, Rr).values())
      s.remove(`${i._type}Editing`);
    this.disableTextSelection(), this.toggleAnnotationLayerPointerEvents(!0), e?.updateFakeAnnotations(t), g(this, Ql, !1);
  }
  getEditableAnnotation(e) {
    return n(this, Tr)?.getEditableAnnotation(e) || null;
  }
  setActiveEditor(e) {
    n(this, z).getActive() !== e && n(this, z).setActiveEditor(e);
  }
  enableTextSelection() {
    if (this.div.tabIndex = -1, n(this, be)?.div && !n(this, Cn)) {
      g(this, Cn, new AbortController());
      const e = n(this, z).combinedSignal(n(this, Cn));
      n(this, be).div.addEventListener("pointerdown", w(this, Lt, Ey).bind(this), {
        signal: e
      }), n(this, be).div.classList.add("highlighting");
    }
  }
  disableTextSelection() {
    this.div.tabIndex = 0, n(this, be)?.div && n(this, Cn) && (n(this, Cn).abort(), g(this, Cn, null), n(this, be).div.classList.remove("highlighting"));
  }
  enableClick() {
    if (n(this, Cr))
      return;
    g(this, Cr, new AbortController());
    const e = n(this, z).combinedSignal(n(this, Cr));
    this.div.addEventListener("pointerdown", this.pointerdown.bind(this), {
      signal: e
    });
    const t = this.pointerup.bind(this);
    this.div.addEventListener("pointerup", t, {
      signal: e
    }), this.div.addEventListener("pointercancel", t, {
      signal: e
    });
  }
  disableClick() {
    n(this, Cr)?.abort(), g(this, Cr, null);
  }
  attach(e) {
    n(this, es).set(e.id, e);
    const {
      annotationElementId: t
    } = e;
    t && n(this, z).isDeletedAnnotationElement(t) && n(this, z).removeDeletedAnnotationElement(e);
  }
  detach(e) {
    n(this, es).delete(e.id), n(this, no)?.removePointerInTextLayer(e.contentDiv), !n(this, Ql) && e.annotationElementId && n(this, z).addDeletedAnnotationElement(e);
  }
  remove(e) {
    this.detach(e), n(this, z).removeEditor(e), e.div.remove(), e.isAttachedToDOM = !1;
  }
  changeParent(e) {
    e.parent !== this && (e.parent && e.annotationElementId && (n(this, z).addDeletedAnnotationElement(e), kt.deleteAnnotationElement(e), e.annotationElementId = null), this.attach(e), e.parent?.detach(e), e.setParent(this), e.div && e.isAttachedToDOM && (e.div.remove(), this.div.append(e.div)));
  }
  add(e) {
    if (!(e.parent === this && e.isAttachedToDOM)) {
      if (this.changeParent(e), n(this, z).addEditor(e), this.attach(e), !e.isAttachedToDOM) {
        const t = e.render();
        this.div.append(t), e.isAttachedToDOM = !0;
      }
      e.fixAndSetPosition(), e.onceAdded(!n(this, Zl)), n(this, z).addToAnnotationStorage(e), e._reportTelemetry(e.telemetryInitialData);
    }
  }
  moveEditorInDOM(e) {
    if (!e.isAttachedToDOM)
      return;
    const {
      activeElement: t
    } = document;
    e.div.contains(t) && !n(this, xn) && (e._focusEventsAllowed = !1, g(this, xn, setTimeout(() => {
      g(this, xn, null), e.div.contains(document.activeElement) ? e._focusEventsAllowed = !0 : (e.div.addEventListener("focusin", () => {
        e._focusEventsAllowed = !0;
      }, {
        once: !0,
        signal: n(this, z)._signal
      }), t.focus());
    }, 0))), e._structTreeParentId = n(this, no)?.moveElementInDOM(this.div, e.div, e.contentDiv, !0);
  }
  addOrRebuild(e) {
    e.needsToBeRebuilt() ? (e.parent || (e.parent = this), e.rebuild(), e.show()) : this.add(e);
  }
  addUndoableEditor(e) {
    const t = () => e._uiManager.rebuild(e), s = () => {
      e.remove();
    };
    this.addCommands({
      cmd: t,
      undo: s,
      mustExec: !1
    });
  }
  getEditorByUID(e) {
    for (const t of n(this, es).values())
      if (t.uid === e)
        return t;
    return null;
  }
  combinedSignal(e) {
    return n(this, z).combinedSignal(e);
  }
  canCreateNewEmptyEditor() {
    return n(this, Lt, pi)?.canCreateNewEmptyEditor();
  }
  async pasteEditor(e, t) {
    this.updateToolbar(e), await n(this, z).updateMode(e.mode);
    const {
      offsetX: s,
      offsetY: i
    } = w(this, Lt, tg).call(this), r = n(this, z).getId(), a = w(this, Lt, qp).call(this, {
      parent: this,
      id: r,
      x: s,
      y: i,
      uiManager: n(this, z),
      isCentered: !0,
      ...t
    });
    a && this.add(a);
  }
  async deserialize(e) {
    return await n(Xs, Rr).get(e.annotationType ?? e.annotationEditorType)?.deserialize(e, this, n(this, z)) || null;
  }
  createAndAddNewEditor(e, t, s = {}) {
    const i = n(this, z).getId(), r = w(this, Lt, qp).call(this, {
      parent: this,
      id: i,
      x: e.offsetX,
      y: e.offsetY,
      uiManager: n(this, z),
      isCentered: t,
      ...s
    });
    return r && this.add(r), r;
  }
  get boundingClientRect() {
    return this.div.getBoundingClientRect();
  }
  addNewEditor(e = {}) {
    this.createAndAddNewEditor(w(this, Lt, tg).call(this), !0, e);
  }
  setSelected(e) {
    n(this, z).setSelected(e);
  }
  toggleSelected(e) {
    n(this, z).toggleSelected(e);
  }
  unselect(e) {
    n(this, z).unselect(e);
  }
  pointerup(e) {
    const {
      isMac: t
    } = de.platform;
    if (e.button !== 0 || e.ctrlKey && t || e.target !== this.div || !n(this, Ir) || (g(this, Ir, !1), n(this, Lt, pi)?.isDrawer && n(this, Lt, pi).supportMultipleDrawings))
      return;
    if (!n(this, Jl)) {
      g(this, Jl, !0);
      return;
    }
    const s = n(this, z).getMode();
    if (s === tt.STAMP || s === tt.POPUP || s === tt.SIGNATURE) {
      n(this, z).unselectAll();
      return;
    }
    this.createAndAddNewEditor(e, !1);
  }
  pointerdown(e) {
    if (n(this, z).getMode() === tt.HIGHLIGHT && this.enableTextSelection(), n(this, Ir)) {
      g(this, Ir, !1);
      return;
    }
    const {
      isMac: t
    } = de.platform;
    if (e.button !== 0 || e.ctrlKey && t || e.target !== this.div)
      return;
    if (g(this, Ir, !0), n(this, Lt, pi)?.isDrawer) {
      this.startDrawingSession(e);
      return;
    }
    const s = n(this, z).getActive();
    g(this, Jl, !s || s.isEmpty());
  }
  startDrawingSession(e) {
    if (this.div.focus({
      preventScroll: !0
    }), n(this, ai)) {
      n(this, Lt, pi).startDrawing(this, n(this, z), !1, e);
      return;
    }
    n(this, z).setCurrentDrawingSession(this), g(this, ai, new AbortController());
    const t = n(this, z).combinedSignal(n(this, ai));
    this.div.addEventListener("blur", ({
      relatedTarget: s
    }) => {
      s && !this.div.contains(s) && (g(this, Tn, null), this.commitOrRemove());
    }, {
      signal: t
    }), n(this, Lt, pi).startDrawing(this, n(this, z), !1, e);
  }
  pause(e) {
    if (e) {
      const {
        activeElement: t
      } = document;
      this.div.contains(t) && g(this, Tn, t);
      return;
    }
    n(this, Tn) && setTimeout(() => {
      n(this, Tn)?.focus(), g(this, Tn, null);
    }, 0);
  }
  endDrawingSession(e = !1) {
    return n(this, ai) ? (n(this, z).setCurrentDrawingSession(null), n(this, ai).abort(), g(this, ai, null), g(this, Tn, null), n(this, Lt, pi).endDrawing(e)) : null;
  }
  findNewParent(e, t, s) {
    const i = n(this, z).findParent(t, s);
    return i === null || i === this ? !1 : (i.changeParent(e), !0);
  }
  commitOrRemove() {
    return n(this, ai) ? (this.endDrawingSession(), !0) : !1;
  }
  onScaleChanging() {
    n(this, ai) && n(this, Lt, pi).onScaleChangingWhenDrawing(this);
  }
  destroy() {
    this.commitOrRemove(), n(this, z).getActive()?.parent === this && (n(this, z).commitOrRemove(), n(this, z).setActiveEditor(null)), n(this, xn) && (clearTimeout(n(this, xn)), g(this, xn, null));
    for (const e of n(this, es).values())
      n(this, no)?.removePointerInTextLayer(e.contentDiv), e.setParent(null), e.isAttachedToDOM = !1, e.div.remove();
    this.div = null, n(this, es).clear(), n(this, z).removeLayer(this);
  }
  async render({
    viewport: e
  }) {
    this.viewport = e, ao(this.div, e);
    for (const t of n(this, z).getEditors(this.pageIndex))
      this.add(t), t.rebuild();
    await n(this, z).findClonesForPage(this), this.div.hidden = this.isEmpty, this.updateMode();
  }
  update({
    viewport: e
  }) {
    n(this, z).commitOrRemove(), w(this, Lt, Tu).call(this);
    const t = this.viewport.rotation, s = e.rotation;
    if (this.viewport = e, ao(this.div, {
      rotation: s
    }), t !== s)
      for (const i of n(this, es).values())
        i.rotate(s);
  }
  get pageDimensions() {
    const {
      pageWidth: e,
      pageHeight: t
    } = this.viewport.rawDims;
    return [e, t];
  }
  get scale() {
    return n(this, z).viewParameters.realScale;
  }
};
no = new WeakMap(), Jl = new WeakMap(), Tr = new WeakMap(), Cr = new WeakMap(), xn = new WeakMap(), es = new WeakMap(), Ir = new WeakMap(), Ql = new WeakMap(), Zl = new WeakMap(), ai = new WeakMap(), Tn = new WeakMap(), be = new WeakMap(), Cn = new WeakMap(), Pr = new WeakMap(), ql = new WeakMap(), z = new WeakMap(), Rr = new WeakMap(), Lt = new WeakSet(), Zp = function() {
  return n(this, es).size !== 0 ? n(this, es).values() : n(this, z).getEditors(this.pageIndex);
}, Ey = function(e) {
  n(this, z).unselectAll();
  const {
    target: t
  } = e;
  if (t === n(this, be).div || (t.getAttribute("role") === "img" || t.classList.contains("endOfContent")) && n(this, be).div.contains(t)) {
    const {
      isMac: s
    } = de.platform;
    if (e.button !== 0 || e.ctrlKey && s)
      return;
    n(this, z).showAllEditors("highlight", !0, !0), n(this, be).div.classList.add("free"), this.toggleDrawing(), ku.startHighlighting(this, n(this, z).direction === "ltr", {
      target: n(this, be).div,
      x: e.x,
      y: e.y
    }), n(this, be).div.addEventListener("pointerup", () => {
      n(this, be).div.classList.remove("free"), this.toggleDrawing(!0);
    }, {
      once: !0,
      signal: n(this, z)._signal
    }), e.preventDefault();
  }
}, pi = function() {
  return n(Xs, Rr).get(n(this, z).getMode());
}, qp = function(e) {
  const t = n(this, Lt, pi);
  return t ? new t.prototype.constructor(e) : null;
}, tg = function() {
  const {
    x: e,
    y: t,
    width: s,
    height: i
  } = this.boundingClientRect, r = Math.max(0, e), a = Math.max(0, t), o = Math.min(window.innerWidth, e + s), l = Math.min(window.innerHeight, t + i), h = (r + o) / 2 - e, d = (a + l) / 2 - t, [u, f] = this.viewport.rotation % 180 === 0 ? [h, d] : [d, h];
  return {
    offsetX: u,
    offsetY: f
  };
}, Tu = function() {
  for (const e of n(this, es).values())
    e.isEmpty() && e.remove();
}, R(Xs, "_initialized", !1), y(Xs, Rr, new Map([Op, Gp, Kp, ku, Yp].map((e) => [e._editorType, e])));
let Qp = Xs;
var oi, ze, ro, Td, rf, Sy, $i, sg, xy, ig;
const le = class le {
  constructor() {
    y(this, $i);
    y(this, oi, null);
    y(this, ze, /* @__PURE__ */ new Map());
    y(this, ro, /* @__PURE__ */ new Map());
  }
  setParent(e) {
    if (!n(this, oi)) {
      g(this, oi, e);
      return;
    }
    if (n(this, oi) !== e) {
      if (n(this, ze).size > 0)
        for (const t of n(this, ze).values())
          t.remove(), e.append(t);
      g(this, oi, e);
    }
  }
  static get _svgFactory() {
    return nt(this, "_svgFactory", new Lu());
  }
  draw(e, t = !1, s = !1) {
    const i = ee(le, Td)._++, r = w(this, $i, sg).call(this), a = le._svgFactory.createElement("defs");
    r.append(a);
    const o = le._svgFactory.createElement("path");
    a.append(o);
    const l = `path_${i}`;
    o.setAttribute("id", l), o.setAttribute("vector-effect", "non-scaling-stroke"), t && n(this, ro).set(i, o);
    const h = s ? w(this, $i, xy).call(this, a, l) : null, d = le._svgFactory.createElement("use");
    return r.append(d), d.setAttribute("href", `#${l}`), this.updateProperties(r, e), n(this, ze).set(i, r), {
      id: i,
      clipPathId: `url(#${h})`
    };
  }
  drawOutline(e, t) {
    const s = ee(le, Td)._++, i = w(this, $i, sg).call(this), r = le._svgFactory.createElement("defs");
    i.append(r);
    const a = le._svgFactory.createElement("path");
    r.append(a);
    const o = `path_${s}`;
    a.setAttribute("id", o), a.setAttribute("vector-effect", "non-scaling-stroke");
    let l;
    if (t) {
      const u = le._svgFactory.createElement("mask");
      r.append(u), l = `mask_${s}`, u.setAttribute("id", l), u.setAttribute("maskUnits", "objectBoundingBox");
      const f = le._svgFactory.createElement("rect");
      u.append(f), f.setAttribute("width", "1"), f.setAttribute("height", "1"), f.setAttribute("fill", "white");
      const p = le._svgFactory.createElement("use");
      u.append(p), p.setAttribute("href", `#${o}`), p.setAttribute("stroke", "none"), p.setAttribute("fill", "black"), p.setAttribute("fill-rule", "nonzero"), p.classList.add("mask");
    }
    const h = le._svgFactory.createElement("use");
    i.append(h), h.setAttribute("href", `#${o}`), l && h.setAttribute("mask", `url(#${l})`);
    const d = h.cloneNode();
    return i.append(d), h.classList.add("mainOutline"), d.classList.add("secondaryOutline"), this.updateProperties(i, e), n(this, ze).set(s, i), s;
  }
  finalizeDraw(e, t) {
    n(this, ro).delete(e), this.updateProperties(e, t);
  }
  updateProperties(e, t) {
    var l;
    if (!t)
      return;
    const {
      root: s,
      bbox: i,
      rootClass: r,
      path: a
    } = t, o = typeof e == "number" ? n(this, ze).get(e) : e;
    if (o) {
      if (s && w(this, $i, ig).call(this, o, s), i && w(l = le, rf, Sy).call(l, o, i), r) {
        const {
          classList: h
        } = o;
        for (const [d, u] of Object.entries(r))
          h.toggle(d, u);
      }
      if (a) {
        const d = o.firstElementChild.firstElementChild;
        w(this, $i, ig).call(this, d, a);
      }
    }
  }
  updateParent(e, t) {
    if (t === this)
      return;
    const s = n(this, ze).get(e);
    s && (n(t, oi).append(s), n(this, ze).delete(e), n(t, ze).set(e, s));
  }
  remove(e) {
    n(this, ro).delete(e), n(this, oi) !== null && (n(this, ze).get(e).remove(), n(this, ze).delete(e));
  }
  destroy() {
    g(this, oi, null);
    for (const e of n(this, ze).values())
      e.remove();
    n(this, ze).clear(), n(this, ro).clear();
  }
};
oi = new WeakMap(), ze = new WeakMap(), ro = new WeakMap(), Td = new WeakMap(), rf = new WeakSet(), Sy = function(e, [t, s, i, r]) {
  const {
    style: a
  } = e;
  a.top = `${100 * s}%`, a.left = `${100 * t}%`, a.width = `${100 * i}%`, a.height = `${100 * r}%`;
}, $i = new WeakSet(), sg = function() {
  const e = le._svgFactory.create(1, 1, !0);
  return n(this, oi).append(e), e.setAttribute("aria-hidden", !0), e;
}, xy = function(e, t) {
  const s = le._svgFactory.createElement("clipPath");
  e.append(s);
  const i = `clip_${t}`;
  s.setAttribute("id", i), s.setAttribute("clipPathUnits", "objectBoundingBox");
  const r = le._svgFactory.createElement("use");
  return s.append(r), r.setAttribute("href", `#${t}`), r.classList.add("clip"), i;
}, ig = function(e, t) {
  for (const [s, i] of Object.entries(t))
    i === null ? e.removeAttribute(s) : e.setAttribute(s, i);
}, y(le, rf), y(le, Td, 0);
let eg = le;
function jd(c) {
  return `${(c * 100).toFixed(2)}%`;
}
var th, Cd, Id, eh, Ni, Bi, Pd, af, Ty;
const Lh = class Lh {
  constructor(e, t, s, i) {
    y(this, af);
    y(this, th, []);
    y(this, Cd, /* @__PURE__ */ new Map());
    y(this, Id, null);
    y(this, eh, 0);
    y(this, Ni, 0);
    y(this, Bi, 0);
    g(this, eh, e), g(this, th, t), g(this, Ni, s.rawDims.pageWidth), g(this, Bi, s.rawDims.pageHeight), g(this, Id, i);
  }
  render() {
    const e = document.createElement("div");
    e.className = "textLayerImages";
    for (let t = 0; t < n(this, th).length; t += 6) {
      const s = w(this, af, Ty).call(this, n(this, th).subarray(t, t + 6));
      s && e.append(s);
    }
    return e.addEventListener("contextmenu", (t) => {
      if (!(t.target instanceof HTMLCanvasElement))
        return;
      const s = t.target, i = n(this, Cd).get(s);
      if (!i)
        return;
      const r = n(Lh, Pd)?.deref();
      if (r === s)
        return;
      r && (r.width = 0, r.height = 0), g(Lh, Pd, new WeakRef(s));
      const {
        inverseTransform: a,
        x1: o,
        y1: l,
        width: h,
        height: d
      } = i, u = n(this, Id).call(this), f = Math.ceil(o * u.width), p = Math.ceil(l * u.height), m = Math.floor((o + h / n(this, Ni)) * u.width), v = Math.floor((l + d / n(this, Bi)) * u.height);
      s.width = m - f, s.height = v - p;
      const A = s.getContext("2d");
      A.setTransform(...a), A.translate(-f, -p), A.drawImage(u, 0, 0);
    }), e;
  }
};
th = new WeakMap(), Cd = new WeakMap(), Id = new WeakMap(), eh = new WeakMap(), Ni = new WeakMap(), Bi = new WeakMap(), Pd = new WeakMap(), af = new WeakSet(), Ty = function([e, t, s, i, r, a]) {
  const o = Math.hypot((r - e) * n(this, Ni), (a - t) * n(this, Bi)), l = Math.hypot((s - e) * n(this, Ni), (i - t) * n(this, Bi));
  if (o < n(this, eh) || l < n(this, eh))
    return null;
  const h = [(r - e) * n(this, Ni) / o, (a - t) * n(this, Bi) / o, (s - e) * n(this, Ni) / l, (i - t) * n(this, Bi) / l, 0, 0], d = j.inverseTransform(h), u = document.createElement("canvas");
  return u.className = "textLayerImagePlaceholder", u.width = 0, u.height = 0, Object.assign(u.style, {
    opacity: 0,
    position: "absolute",
    left: jd(e),
    top: jd(t),
    width: jd(o / n(this, Ni)),
    height: jd(l / n(this, Bi)),
    transformOrigin: "0% 0%",
    transform: `matrix(${h.join(",")})`
  }), n(this, Cd).set(u, {
    inverseTransform: d,
    width: o,
    height: l,
    x1: e,
    y1: t
  }), u;
}, y(Lh, Pd, null);
let ng = Lh;
globalThis._pdfjsTestingUtils = {
  HighlightOutliner: Fp
};
globalThis.pdfjsLib = {
  AbortException: Dr,
  AnnotationEditorLayer: Qp,
  AnnotationEditorParamsType: ut,
  AnnotationEditorType: tt,
  AnnotationEditorUIManager: oo,
  AnnotationLayer: Dp,
  AnnotationMode: In,
  AnnotationType: ie,
  applyOpacity: Jy,
  build: cA,
  ColorPicker: Mu,
  createValidAbsoluteUrl: rm,
  CSSConstants: Ky,
  DOMSVGFactory: Lu,
  DrawLayer: eg,
  FeatureTest: de,
  fetchData: lg,
  findContrastColor: Qy,
  getDocument: Sv,
  getFilenameFromUrl: _y,
  getPdfFilenameFromUrl: Wy,
  getRGB: Dd,
  getUuid: om,
  getXfaPageViewport: zy,
  GlobalWorkerOptions: li,
  ImageKind: Gd,
  InvalidPDFException: Mf,
  isDataScheme: df,
  isPdfFile: cg,
  isValidExplicitDest: gb,
  makeArr: ag,
  makeMap: og,
  makeObj: Lf,
  MathClamp: Ae,
  noContextMenu: Vs,
  normalizeUnicode: jy,
  OPS: kh,
  OutputScale: Ui,
  PasswordResponses: nm,
  PDFDataRangeTransport: pg,
  PDFDateString: Iu,
  PDFWorker: sh,
  PermissionFlag: My,
  PixelsPerInch: Mr,
  RenderingCancelledException: hg,
  renderRichText: hm,
  ResponseException: Cu,
  setLayerDimensions: ao,
  shadow: nt,
  SignatureExtractor: Pn,
  stopEvent: Kt,
  SupportedImageMimeTypes: Ff,
  TextLayer: Uh,
  TextLayerImages: ng,
  TouchManager: Ru,
  updateUrlHash: am,
  Util: j,
  VerbosityLevel: of,
  version: hA,
  XfaLayer: lm
};
const Cy = typeof document > "u", FA = typeof OffscreenCanvas < "u";
function rg(c, e) {
  if (FA) return new OffscreenCanvas(c, e);
  const t = document.createElement("canvas");
  return t.width = c, t.height = e, t;
}
class kA {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(e) {
  }
  create(e, t) {
    if (e <= 0 || t <= 0) throw new Error("Invalid canvas size");
    const s = rg(e, t);
    return { canvas: s, context: s.getContext("2d", { willReadFrequently: !0 }) };
  }
  reset(e, t, s) {
    if (!e.canvas) throw new Error("Canvas is not specified");
    if (t <= 0 || s <= 0) throw new Error("Invalid canvas size");
    e.canvas.width = t, e.canvas.height = s;
  }
  destroy(e) {
    e.canvas && (e.canvas.width = 0, e.canvas.height = 0, e.canvas = null, e.context = null);
  }
}
class NA {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(e) {
  }
  addFilter() {
    return "none";
  }
  addHCMFilter() {
    return "none";
  }
  addAlphaFilter() {
    return "none";
  }
  addLuminosityFilter() {
    return "none";
  }
  addHighlightHCMFilter() {
    return "none";
  }
  destroy() {
  }
}
class BA extends pg {
  constructor(t, s, i) {
    super(t, null);
    R(this, "read");
    R(this, "onFailure");
    R(this, "aborted", !1);
    this.read = s, this.onFailure = i;
  }
  requestDataRange(t, s) {
    this.read(t, s).then(
      (i) => {
        this.aborted || this.onDataRange(t, i);
      },
      (i) => {
        this.aborted || this.onFailure(i);
      }
    );
  }
  abort() {
    this.aborted = !0;
  }
}
const UA = (c) => typeof c == "object" && c !== null ? String(c.name ?? "") : "";
function im(c, e) {
  if (typeof c == "object" && c !== null && "code" in c && "message" in c) {
    const i = c;
    if (typeof i.code == "string") return { code: i.code, message: String(i.message) };
  }
  const t = UA(c), s = c instanceof Error && c.message ? c.message : String(c);
  return t === "RenderingCancelledException" || t === "AbortException" || t === "AbortError" ? { code: "CANCELLED", message: "Cancelled" } : t === "PasswordException" ? { code: "PASSWORD_REQUIRED", message: "This PDF needs a password" } : t === "InvalidPDFException" ? { code: "LOAD_FAILED", message: "This file is not a readable PDF" } : t === "ResponseException" || t === "MissingPDFException" || t === "UnexpectedResponseException" ? { code: "NETWORK", message: s || "The PDF could not be downloaded" } : Cy && (t === "ReferenceError" || t === "TypeError" || t === "NotSupportedError") ? { code: "ENVIRONMENT", message: s } : e === "open" ? { code: "LOAD_FAILED", message: s || "The PDF could not be opened" } : { code: "RENDER_FAILED", message: s || "The page could not be drawn" };
}
function HA(c) {
  let e = () => {
  };
  const t = new Promise((s, i) => {
    e = i;
  });
  t.catch(() => {
  });
  try {
    const s = new Worker(c, { type: "module" }), i = (a) => {
      a.preventDefault?.(), e({ code: "ENVIRONMENT", message: "The PDF parser worker could not be started" });
    };
    s.addEventListener("error", i);
    const r = new sh({ port: s });
    return {
      worker: r,
      port: s,
      mode: "worker",
      failed: t,
      dispose() {
        s.removeEventListener("error", i);
        try {
          r.destroy();
        } catch {
        }
        s.terminate();
      }
    };
  } catch {
    return li.workerSrc = c, { mode: "same-thread", failed: t, dispose() {
    } };
  }
}
const xo = (c) => c < 0 ? 0 : c > 1 ? 1 : c;
class _A {
  constructor(e) {
    R(this, "callbacks");
    R(this, "task", null);
    R(this, "doc", null);
    R(this, "parser", null);
    R(this, "renders", /* @__PURE__ */ new Map());
    R(this, "destroyed", !1);
    this.callbacks = e;
  }
  async open(e) {
    try {
      return await this.openWith(e, HA(e.parserWorkerUrl));
    } catch (t) {
      if (im(t, "open").code === "ENVIRONMENT" && this.parser?.mode === "worker" && !this.destroyed) {
        await this.closeDocument(), li.workerSrc = e.parserWorkerUrl;
        const i = new Promise(() => {
        });
        return this.openWith(e, { mode: "same-thread", failed: i, dispose() {
        } });
      }
      throw t;
    }
  }
  async openWith(e, t) {
    this.parser = t;
    const s = {
      rangeChunkSize: Ry,
      isEvalSupported: !1,
      enableXfa: !1,
      verbosity: 0,
      worker: t.worker
    }, i = e.pdfAssets;
    if (i?.cMapUrl && (s.cMapUrl = i.cMapUrl, s.cMapPacked = !0), i?.standardFontDataUrl && (s.standardFontDataUrl = i.standardFontDataUrl), i?.wasmUrl && (s.wasmUrl = i.wasmUrl), i?.iccUrl && (s.iccUrl = i.iccUrl), Cy) {
      const v = globalThis;
      s.ownerDocument = {
        fonts: v.fonts,
        createElement: (A) => {
          if (A === "canvas") return rg(1, 1);
          throw new Error(`Cannot create <${A}> in a worker`);
        }
      }, s.CanvasFactory = kA, s.FilterFactory = NA, s.isOffscreenCanvasSupported = !0, s.useWorkerFetch = !0;
    }
    const r = e.transport;
    if (r.kind === "url")
      s.url = new URL(r.url), s.httpHeaders = r.headers, s.withCredentials = r.withCredentials;
    else {
      const v = r.kind === "blob" ? async (b, E) => new Uint8Array(await r.blob.slice(b, E).arrayBuffer()) : (b, E) => this.callbacks.readRange(b, E), A = r.kind === "blob" ? r.blob.size : r.length;
      s.range = new BA(A, v, (b) => this.fail(b)), s.length = A, s.disableStream = !0, s.disableAutoFetch = !0;
    }
    const a = Sv(s);
    this.task = a;
    let o = 0, l = () => {
    };
    const h = new Promise((v, A) => {
      l = A;
    });
    h.catch(() => {
    }), a.onPassword = (v, A) => {
      o++, this.callbacks.password(A === nm.INCORRECT_PASSWORD ? "incorrect" : "required", o).then((b) => {
        b === null ? l({ code: "PASSWORD_CANCELLED", message: "Password entry was cancelled" }) : v(b);
      }, l);
    }, a.onProgress = ({ loaded: v, total: A }) => {
      this.callbacks.progress(v, A > 0 ? A : null);
    };
    const d = await Promise.race([a.promise, t.failed, h]);
    this.doc = d;
    const f = (await d.getPage(1)).getViewport({ scale: 1 });
    let p = !1;
    try {
      p = (await d.getOutline() ?? []).length > 0;
    } catch {
      p = !1;
    }
    let m = null;
    try {
      const v = await d.getViewerPreferences();
      typeof v?.Direction == "string" && (m = v.Direction);
    } catch {
      m = null;
    }
    return {
      pageCount: d.numPages,
      firstPage: { width: f.width, height: f.height },
      parser: t.mode,
      hasOutline: p,
      viewerDirection: m
    };
  }
  fail(e) {
    this.destroyed || this.callbacks.fatal(im(e, "data"));
  }
  requireDoc() {
    if (!this.doc || this.destroyed) throw { code: "CANCELLED", message: "The document is closed" };
    return this.doc;
  }
  async render(e, t) {
    const i = await this.requireDoc().getPage(t.page), r = i.getViewport({ scale: 1 });
    let a = t.height / r.height;
    t.maxWidth && (a = Math.min(a, t.maxWidth / r.width)), a = Math.min(a, t.maxDimension / r.width, t.maxDimension / r.height);
    const o = Math.max(1, Math.round(r.width * a)), l = Math.max(1, Math.round(r.height * a)), h = i.getViewport({ scale: a }), d = rg(o, l), u = d.getContext("2d", { alpha: !1 });
    if (!u) throw { code: "RENDER_FAILED", message: "A drawing surface could not be created" };
    const f = i.render({
      canvas: null,
      canvasContext: u,
      viewport: h,
      intent: "display",
      annotationMode: In.ENABLE,
      transform: [o / h.width, 0, 0, l / h.height, 0, 0]
    });
    this.renders.set(e, f);
    try {
      await f.promise;
    } catch (m) {
      throw d.width = 0, d.height = 0, m;
    } finally {
      this.renders.delete(e), t.keepPageData || i.cleanup();
    }
    if (this.destroyed)
      throw d.width = 0, d.height = 0, { code: "CANCELLED", message: "The document is closed" };
    return { image: "transferToImageBitmap" in d ? d.transferToImageBitmap() : d, width: o, height: l };
  }
  cancelRender(e) {
    this.renders.get(e)?.cancel();
  }
  /**
   * Plain text in reading order with one positioned run per text item.
   * Rectangles are normalized to the final oriented page (crop box and
   * rotation applied), measured from its top-left corner.
   */
  async getText(e) {
    const t = await this.requireDoc().getPage(e), s = t.getViewport({ scale: 1 }), i = await t.getTextContent({ includeMarkedContent: !1 }), r = i.styles;
    let a = "";
    const o = [];
    for (const h of i.items) {
      const d = h;
      if (typeof d.str == "string") {
        if (d.str.length > 0 && d.transform) {
          const u = a.length;
          a += d.str;
          const f = $A(d, s, r[d.fontName ?? ""]);
          if (f && d.str.trim().length > 0) {
            const p = { start: u, end: a.length, rects: [f] };
            (d.dir === "rtl" || d.dir === "ltr") && (p.dir = d.dir), o.push(p);
          }
        }
        d.hasEOL && (a += `
`);
      }
    }
    const l = { text: a };
    return o.length > 0 && (l.runs = o), typeof i.lang == "string" && i.lang && (l.lang = i.lang), l;
  }
  async getLinks(e) {
    const s = await this.requireDoc().getPage(e), i = s.getViewport({ scale: 1 }), r = await s.getAnnotations({ intent: "display" }), a = [];
    for (const o of r) {
      if (o.subtype !== "Link" || !Array.isArray(o.rect)) continue;
      const [l, h, d, u] = i.convertToViewportRectangle(o.rect), f = {
        x: xo(Math.min(l, d) / i.width),
        y: xo(Math.min(h, u) / i.height),
        width: Math.abs(d - l) / i.width,
        height: Math.abs(u - h) / i.height
      };
      if (!(!(f.width > 0) || !(f.height > 0))) {
        if (typeof o.url == "string")
          a.push({ rect: f, url: o.url });
        else if (o.dest) {
          const p = await this.resolveDestination(o.dest);
          p !== null && a.push({ rect: f, page: p });
        }
      }
    }
    return a;
  }
  async resolveDestination(e) {
    const t = this.requireDoc();
    try {
      const s = typeof e == "string" ? await t.getDestination(e) : e;
      if (!Array.isArray(s) || s.length === 0) return null;
      const i = s[0];
      return Number.isInteger(i) ? i + 1 : i && typeof i == "object" ? await t.getPageIndex(i) + 1 : null;
    } catch {
      return null;
    }
  }
  async getOutline() {
    const t = await this.requireDoc().getOutline() ?? [];
    let s = 2e4;
    const i = async (r, a) => {
      const o = [];
      for (const l of r) {
        if (s-- <= 0) break;
        const h = a < 16 && Array.isArray(l.items) && l.items.length > 0 ? await i(l.items, a + 1) : [];
        let d = l.dest ? await this.resolveDestination(l.dest) : null;
        if (d === null && h.length > 0 && (d = h[0].page), d === null) continue;
        const u = { title: String(l.title ?? "").trim() || `Page ${d}`, page: d };
        h.length > 0 && (u.children = h), o.push(u);
      }
      return o;
    };
    return i(t, 0);
  }
  async getLabels() {
    try {
      return await this.requireDoc().getPageLabels();
    } catch {
      return null;
    }
  }
  async closeDocument() {
    for (const t of this.renders.values()) t.cancel();
    this.renders.clear();
    const e = this.task;
    this.task = null, this.doc = null;
    try {
      await e?.destroy();
    } catch {
    }
    this.parser?.dispose(), this.parser = null;
  }
  async destroy() {
    this.destroyed || (this.destroyed = !0, await this.closeDocument());
  }
}
function $A(c, e, t) {
  const s = j.transform(e.transform, c.transform), i = Math.hypot(s[2], s[3]);
  if (!(i > 0)) return null;
  const r = Math.atan2(s[1], s[0]), a = t?.ascent ?? 0.8, o = t?.descent ?? -0.2, l = t?.vertical ? c.height : c.width, h = Math.cos(r), d = Math.sin(r), u = i * a, f = i * o, p = [
    [0, -u],
    [l, -u],
    [l, -f],
    [0, -f]
  ];
  let m = 1 / 0, v = 1 / 0, A = -1 / 0, b = -1 / 0;
  for (const [C, I] of p) {
    const M = s[4] + C * h - I * d, P = s[5] + C * d + I * h;
    m = Math.min(m, M), A = Math.max(A, M), v = Math.min(v, P), b = Math.max(b, P);
  }
  const E = xo(m / e.width), S = xo(v / e.height), T = xo(A / e.width) - E, x = xo(b / e.height) - S;
  return !(T > 0) || !(x > 0) ? null : { x: E, y: S, width: T, height: x };
}
export {
  _A as PdfHost,
  im as describeHostError
};
