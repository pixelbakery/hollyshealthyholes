function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function ($) {
  var $ = jQuery = $;
  var define = null;
  /*! lazysizes - v4.0.1 */

  !function (a, b) {
    var c = b(a, a.document);
    a.lazySizes = c, "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports && (module.exports = c);
  }(window, function (a, b) {
    "use strict";

    if (b.getElementsByClassName) {
      var c,
          d,
          e = b.documentElement,
          f = a.Date,
          g = a.HTMLPictureElement,
          h = "addEventListener",
          i = "getAttribute",
          j = a[h],
          k = a.setTimeout,
          l = a.requestAnimationFrame || k,
          m = a.requestIdleCallback,
          n = /^picture$/i,
          o = ["load", "error", "lazyincluded", "_lazyloaded"],
          p = {},
          q = Array.prototype.forEach,
          r = function r(a, b) {
        return p[b] || (p[b] = new RegExp("(\\s|^)" + b + "(\\s|$)")), p[b].test(a[i]("class") || "") && p[b];
      },
          s = function s(a, b) {
        r(a, b) || a.setAttribute("class", (a[i]("class") || "").trim() + " " + b);
      },
          t = function t(a, b) {
        var c;
        (c = r(a, b)) && a.setAttribute("class", (a[i]("class") || "").replace(c, " "));
      },
          u = function u(a, b, c) {
        var d = c ? h : "removeEventListener";
        c && u(a, b), o.forEach(function (c) {
          a[d](c, b);
        });
      },
          v = function v(a, d, e, f, g) {
        var h = b.createEvent("CustomEvent");
        return e || (e = {}), e.instance = c, h.initCustomEvent(d, !f, !g, e), a.dispatchEvent(h), h;
      },
          w = function w(b, c) {
        var e;
        !g && (e = a.picturefill || d.pf) ? e({
          reevaluate: !0,
          elements: [b]
        }) : c && c.src && (b.src = c.src);
      },
          x = function x(a, b) {
        return (getComputedStyle(a, null) || {})[b];
      },
          y = function y(a, b, c) {
        for (c = c || a.offsetWidth; c < d.minSize && b && !a._lazysizesWidth;) {
          c = b.offsetWidth, b = b.parentNode;
        }

        return c;
      },
          z = function () {
        var a,
            c,
            d = [],
            e = [],
            f = d,
            g = function g() {
          var b = f;

          for (f = d.length ? e : d, a = !0, c = !1; b.length;) {
            b.shift()();
          }

          a = !1;
        },
            h = function h(d, e) {
          a && !e ? d.apply(this, arguments) : (f.push(d), c || (c = !0, (b.hidden ? k : l)(g)));
        };

        return h._lsFlush = g, h;
      }(),
          A = function A(a, b) {
        return b ? function () {
          z(a);
        } : function () {
          var b = this,
              c = arguments;
          z(function () {
            a.apply(b, c);
          });
        };
      },
          B = function B(a) {
        var b,
            c = 0,
            e = 125,
            g = d.ricTimeout,
            h = function h() {
          b = !1, c = f.now(), a();
        },
            i = m && d.ricTimeout ? function () {
          m(h, {
            timeout: g
          }), g !== d.ricTimeout && (g = d.ricTimeout);
        } : A(function () {
          k(h);
        }, !0);

        return function (a) {
          var d;
          (a = a === !0) && (g = 33), b || (b = !0, d = e - (f.now() - c), 0 > d && (d = 0), a || 9 > d && m ? i() : k(i, d));
        };
      },
          C = function C(a) {
        var b,
            c,
            d = 99,
            e = function e() {
          b = null, a();
        },
            g = function g() {
          var a = f.now() - c;
          d > a ? k(g, d - a) : (m || e)(e);
        };

        return function () {
          c = f.now(), b || (b = k(g, d));
        };
      };

      !function () {
        var b,
            c = {
          lazyClass: "lazyload",
          loadedClass: "lazyloaded",
          loadingClass: "lazyloading",
          preloadClass: "lazypreload",
          errorClass: "lazyerror",
          autosizesClass: "lazyautosizes",
          srcAttr: "data-src",
          srcsetAttr: "data-srcset",
          sizesAttr: "data-sizes",
          minSize: 40,
          customMedia: {},
          init: !0,
          expFactor: 1.5,
          hFac: .8,
          loadMode: 2,
          loadHidden: !0,
          ricTimeout: 300
        };
        d = a.lazySizesConfig || a.lazysizesConfig || {};

        for (b in c) {
          b in d || (d[b] = c[b]);
        }

        a.lazySizesConfig = d, k(function () {
          d.init && F();
        });
      }();

      var D = function () {
        var g,
            l,
            m,
            o,
            p,
            y,
            D,
            F,
            G,
            H,
            I,
            J,
            K,
            L,
            M = /^img$/i,
            N = /^iframe$/i,
            O = "onscroll" in a && !/glebot/.test(navigator.userAgent),
            P = 0,
            Q = 0,
            R = 0,
            S = -1,
            T = function T(a) {
          R--, a && a.target && u(a.target, T), (!a || 0 > R || !a.target) && (R = 0);
        },
            U = function U(a, c) {
          var d,
              f = a,
              g = "hidden" == x(b.body, "visibility") || "hidden" != x(a, "visibility");

          for (F -= c, I += c, G -= c, H += c; g && (f = f.offsetParent) && f != b.body && f != e;) {
            g = (x(f, "opacity") || 1) > 0, g && "visible" != x(f, "overflow") && (d = f.getBoundingClientRect(), g = H > d.left && G < d.right && I > d.top - 1 && F < d.bottom + 1);
          }

          return g;
        },
            V = function V() {
          var a,
              f,
              h,
              j,
              k,
              m,
              n,
              p,
              q,
              r = c.elements;

          if ((o = d.loadMode) && 8 > R && (a = r.length)) {
            f = 0, S++, null == K && ("expand" in d || (d.expand = e.clientHeight > 500 && e.clientWidth > 500 ? 500 : 370), J = d.expand, K = J * d.expFactor), K > Q && 1 > R && S > 2 && o > 2 && !b.hidden ? (Q = K, S = 0) : Q = o > 1 && S > 1 && 6 > R ? J : P;

            for (; a > f; f++) {
              if (r[f] && !r[f]._lazyRace) if (O) {
                if ((p = r[f][i]("data-expand")) && (m = 1 * p) || (m = Q), q !== m && (y = innerWidth + m * L, D = innerHeight + m, n = -1 * m, q = m), h = r[f].getBoundingClientRect(), (I = h.bottom) >= n && (F = h.top) <= D && (H = h.right) >= n * L && (G = h.left) <= y && (I || H || G || F) && (d.loadHidden || "hidden" != x(r[f], "visibility")) && (l && 3 > R && !p && (3 > o || 4 > S) || U(r[f], m))) {
                  if (ba(r[f]), k = !0, R > 9) break;
                } else !k && l && !j && 4 > R && 4 > S && o > 2 && (g[0] || d.preloadAfterLoad) && (g[0] || !p && (I || H || G || F || "auto" != r[f][i](d.sizesAttr))) && (j = g[0] || r[f]);
              } else ba(r[f]);
            }

            j && !k && ba(j);
          }
        },
            W = B(V),
            X = function X(a) {
          s(a.target, d.loadedClass), t(a.target, d.loadingClass), u(a.target, Z), v(a.target, "lazyloaded");
        },
            Y = A(X),
            Z = function Z(a) {
          Y({
            target: a.target
          });
        },
            $ = function $(a, b) {
          try {
            a.contentWindow.location.replace(b);
          } catch (c) {
            a.src = b;
          }
        },
            _ = function _(a) {
          var b,
              c = a[i](d.srcsetAttr);
          (b = d.customMedia[a[i]("data-media") || a[i]("media")]) && a.setAttribute("media", b), c && a.setAttribute("srcset", c);
        },
            aa = A(function (a, b, c, e, f) {
          var g, h, j, l, o, p;
          (o = v(a, "lazybeforeunveil", b)).defaultPrevented || (e && (c ? s(a, d.autosizesClass) : a.setAttribute("sizes", e)), h = a[i](d.srcsetAttr), g = a[i](d.srcAttr), f && (j = a.parentNode, l = j && n.test(j.nodeName || "")), p = b.firesLoad || "src" in a && (h || g || l), o = {
            target: a
          }, p && (u(a, T, !0), clearTimeout(m), m = k(T, 2500), s(a, d.loadingClass), u(a, Z, !0)), l && q.call(j.getElementsByTagName("source"), _), h ? a.setAttribute("srcset", h) : g && !l && (N.test(a.nodeName) ? $(a, g) : a.src = g), f && (h || l) && w(a, {
            src: g
          })), a._lazyRace && delete a._lazyRace, t(a, d.lazyClass), z(function () {
            (!p || a.complete && a.naturalWidth > 1) && (p ? T(o) : R--, X(o));
          }, !0);
        }),
            ba = function ba(a) {
          var b,
              c = M.test(a.nodeName),
              e = c && (a[i](d.sizesAttr) || a[i]("sizes")),
              f = "auto" == e;
          (!f && l || !c || !a[i]("src") && !a.srcset || a.complete || r(a, d.errorClass) || !r(a, d.lazyClass)) && (b = v(a, "lazyunveilread").detail, f && E.updateElem(a, !0, a.offsetWidth), a._lazyRace = !0, R++, aa(a, b, f, e, c));
        },
            ca = function ca() {
          if (!l) {
            if (f.now() - p < 999) return void k(ca, 999);
            var a = C(function () {
              d.loadMode = 3, W();
            });
            l = !0, d.loadMode = 3, W(), j("scroll", function () {
              3 == d.loadMode && (d.loadMode = 2), a();
            }, !0);
          }
        };

        return {
          _: function _() {
            p = f.now(), c.elements = b.getElementsByClassName(d.lazyClass), g = b.getElementsByClassName(d.lazyClass + " " + d.preloadClass), L = d.hFac, j("scroll", W, !0), j("resize", W, !0), a.MutationObserver ? new MutationObserver(W).observe(e, {
              childList: !0,
              subtree: !0,
              attributes: !0
            }) : (e[h]("DOMNodeInserted", W, !0), e[h]("DOMAttrModified", W, !0), setInterval(W, 999)), j("hashchange", W, !0), ["focus", "mouseover", "click", "load", "transitionend", "animationend", "webkitAnimationEnd"].forEach(function (a) {
              b[h](a, W, !0);
            }), /d$|^c/.test(b.readyState) ? ca() : (j("load", ca), b[h]("DOMContentLoaded", W), k(ca, 2e4)), c.elements.length ? (V(), z._lsFlush()) : W();
          },
          checkElems: W,
          unveil: ba
        };
      }(),
          E = function () {
        var a,
            c = A(function (a, b, c, d) {
          var e, f, g;
          if (a._lazysizesWidth = d, d += "px", a.setAttribute("sizes", d), n.test(b.nodeName || "")) for (e = b.getElementsByTagName("source"), f = 0, g = e.length; g > f; f++) {
            e[f].setAttribute("sizes", d);
          }
          c.detail.dataAttr || w(a, c.detail);
        }),
            e = function e(a, b, d) {
          var e,
              f = a.parentNode;
          f && (d = y(a, f, d), e = v(a, "lazybeforesizes", {
            width: d,
            dataAttr: !!b
          }), e.defaultPrevented || (d = e.detail.width, d && d !== a._lazysizesWidth && c(a, f, e, d)));
        },
            f = function f() {
          var b,
              c = a.length;
          if (c) for (b = 0; c > b; b++) {
            e(a[b]);
          }
        },
            g = C(f);

        return {
          _: function _() {
            a = b.getElementsByClassName(d.autosizesClass), j("resize", g);
          },
          checkElems: g,
          updateElem: e
        };
      }(),
          F = function F() {
        F.i || (F.i = !0, E._(), D._());
      };

      return c = {
        cfg: d,
        autoSizer: E,
        loader: D,
        init: F,
        uP: w,
        aC: s,
        rC: t,
        hC: r,
        fire: v,
        gW: y,
        rAF: z
      };
    }
  });
  /*! lazysizes - rias */

  !function (a, b) {
    var c = function c() {
      b(a.lazySizes), a.removeEventListener("lazyunveilread", c, !0);
    };

    b = b.bind(null, a, a.document), "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? b(require("lazysizes")) : a.lazySizes ? c() : a.addEventListener("lazyunveilread", c, !0);
  }(window, function (a, b, c) {
    "use strict";

    function d(b, c) {
      var d,
          e,
          f,
          g,
          h = a.getComputedStyle(b);
      e = b.parentNode, g = {
        isPicture: !(!e || !m.test(e.nodeName || ""))
      }, f = function f(a, c) {
        var d = b.getAttribute("data-" + a);

        if (!d) {
          var e = h.getPropertyValue("--ls-" + a);
          e && (d = e.trim());
        }

        if (d) {
          if ("true" == d) d = !0;else if ("false" == d) d = !1;else if (l.test(d)) d = parseFloat(d);else if ("function" == typeof j[a]) d = j[a](b, d);else if (q.test(d)) try {
            d = JSON.parse(d);
          } catch (f) {}
          g[a] = d;
        } else a in j && "function" != typeof j[a] ? g[a] = j[a] : c && "function" == typeof j[a] && (g[a] = j[a](b, d));
      };

      for (d in j) {
        f(d);
      }

      return c.replace(p, function (a, b) {
        b in g || f(b, !0);
      }), g;
    }

    function e(a, b) {
      var c = [],
          d = function d(a, c) {
        return k[_typeof(b[c])] ? b[c] : a;
      };

      return c.srcset = [], b.absUrl && (s.setAttribute("href", a), a = s.href), a = ((b.prefix || "") + a + (b.postfix || "")).replace(p, d), b.widths.forEach(function (d) {
        var e = b.widthmap[d] || d,
            f = {
          u: a.replace(n, e).replace(o, b.ratio ? Math.round(d * b.ratio) : ""),
          w: d
        };
        c.push(f), c.srcset.push(f.c = f.u + " " + d + "w");
      }), c;
    }

    function f(a, c, d) {
      var f = 0,
          g = 0,
          h = d;

      if (a) {
        if ("container" === c.ratio) {
          for (f = h.scrollWidth, g = h.scrollHeight; !(f && g || h === b);) {
            h = h.parentNode, f = h.scrollWidth, g = h.scrollHeight;
          }

          f && g && (c.ratio = g / f);
        }

        a = e(a, c), a.isPicture = c.isPicture, u && "IMG" == d.nodeName.toUpperCase() ? d.removeAttribute(i.srcsetAttr) : d.setAttribute(i.srcsetAttr, a.srcset.join(", ")), Object.defineProperty(d, "_lazyrias", {
          value: a,
          writable: !0
        });
      }
    }

    function g(a, b) {
      var e = d(a, b);
      return j.modifyOptions.call(a, {
        target: a,
        details: e,
        detail: e
      }), c.fire(a, "lazyriasmodifyoptions", e), e;
    }

    function h(a) {
      return a.getAttribute(a.getAttribute("data-srcattr") || j.srcAttr) || a.getAttribute(i.srcsetAttr) || a.getAttribute(i.srcAttr) || a.getAttribute("data-pfsrcset") || "";
    }

    var i,
        j,
        k = {
      string: 1,
      number: 1
    },
        l = /^\-*\+*\d+\.*\d*$/,
        m = /^picture$/i,
        n = /\s*\{\s*width\s*\}\s*/i,
        o = /\s*\{\s*height\s*\}\s*/i,
        p = /\s*\{\s*([a-z0-9]+)\s*\}\s*/gi,
        q = /^\[.*\]|\{.*\}$/,
        r = /^(?:auto|\d+(px)?)$/,
        s = b.createElement("a"),
        t = b.createElement("img"),
        u = "srcset" in t && !("sizes" in t),
        v = !!a.HTMLPictureElement && !u;
    !function () {
      var b,
          d = function d() {},
          e = {
        prefix: "",
        postfix: "",
        srcAttr: "data-src",
        absUrl: !1,
        modifyOptions: d,
        widthmap: {},
        ratio: !1
      };

      i = c && c.cfg || a.lazySizesConfig, i || (i = {}, a.lazySizesConfig = i), i.supportsType || (i.supportsType = function (a) {
        return !a;
      }), i.rias || (i.rias = {}), j = i.rias, "widths" in j || (j.widths = [], function (a) {
        for (var b, c = 0; !b || 3e3 > b;) {
          c += 5, c > 30 && (c += 1), b = 36 * c, a.push(b);
        }
      }(j.widths));

      for (b in e) {
        b in j || (j[b] = e[b]);
      }
    }(), addEventListener("lazybeforesizes", function (a) {
      if (a.detail.instance == c) {
        var b, d, e, k, l, m, o, p, q, s, t, u, x;

        if (b = a.target, a.detail.dataAttr && !a.defaultPrevented && !j.disabled && (q = b.getAttribute(i.sizesAttr) || b.getAttribute("sizes")) && r.test(q)) {
          if (d = h(b), e = g(b, d), t = n.test(e.prefix) || n.test(e.postfix), e.isPicture && (k = b.parentNode)) for (l = k.getElementsByTagName("source"), m = 0, o = l.length; o > m; m++) {
            (t || n.test(p = h(l[m]))) && (f(p, e, l[m]), u = !0);
          }
          t || n.test(d) ? (f(d, e, b), u = !0) : u && (x = [], x.srcset = [], x.isPicture = !0, Object.defineProperty(b, "_lazyrias", {
            value: x,
            writable: !0
          })), u && (v ? b.removeAttribute(i.srcAttr) : "auto" != q && (s = {
            width: parseInt(q, 10)
          }, w({
            target: b,
            detail: s
          })));
        }
      }
    }, !0);

    var w = function () {
      var d = function d(a, b) {
        return a.w - b.w;
      },
          e = function e(a) {
        var b,
            c,
            d = a.length,
            e = a[d - 1],
            f = 0;

        for (f; d > f; f++) {
          if (e = a[f], e.d = e.w / a.w, e.d >= a.d) {
            !e.cached && (b = a[f - 1]) && b.d > a.d - .13 * Math.pow(a.d, 2.2) && (c = Math.pow(b.d - .6, 1.6), b.cached && (b.d += .15 * c), b.d + (e.d - a.d) * c > a.d && (e = b));
            break;
          }
        }

        return e;
      },
          f = function f(a, b) {
        var d;
        return !a._lazyrias && c.pWS && (d = c.pWS(a.getAttribute(i.srcsetAttr || ""))).length && (Object.defineProperty(a, "_lazyrias", {
          value: d,
          writable: !0
        }), b && a.parentNode && (d.isPicture = "PICTURE" == a.parentNode.nodeName.toUpperCase())), a._lazyrias;
      },
          g = function g(b) {
        var d = a.devicePixelRatio || 1,
            e = c.getX && c.getX(b);
        return Math.min(e || d, 2.4, d);
      },
          h = function h(b, c) {
        var h, i, j, k, l, m;
        if (l = b._lazyrias, l.isPicture && a.matchMedia) for (i = 0, h = b.parentNode.getElementsByTagName("source"), j = h.length; j > i; i++) {
          if (f(h[i]) && !h[i].getAttribute("type") && (!(k = h[i].getAttribute("media")) || (matchMedia(k) || {}).matches)) {
            l = h[i]._lazyrias;
            break;
          }
        }
        return (!l.w || l.w < c) && (l.w = c, l.d = g(b), m = e(l.sort(d))), m;
      },
          _j = function j(d) {
        if (d.detail.instance == c) {
          var e,
              g = d.target;
          return !u && (a.respimage || a.picturefill || lazySizesConfig.pf) ? void b.removeEventListener("lazybeforesizes", _j) : void (("_lazyrias" in g || d.detail.dataAttr && f(g, !0)) && (e = h(g, d.detail.width), e && e.u && g._lazyrias.cur != e.u && (g._lazyrias.cur = e.u, e.cached = !0, c.rAF(function () {
            g.setAttribute(i.srcAttr, e.u), g.setAttribute("src", e.u);
          }))));
        }
      };

      return v ? _j = function _j() {} : addEventListener("lazybeforesizes", _j), _j;
    }();
  });
  /* lazysizes - optimumx */

  !function (a, b, c) {
    "use strict";

    if (a.addEventListener) {
      var d,
          e = /^picture$/i,
          f = b.documentElement,
          g = function () {
        var a,
            b = /(([^,\s].[^\s]+)\s+(\d+)(w|h)(\s+(\d+)(w|h))?)/g,
            c = function c(b, _c, d, e, f, g, h, i) {
          a.push({
            c: _c,
            u: d,
            w: 1 * ("w" == i ? h : e)
          });
        };

        return function (d) {
          return a = [], d.replace(b, c), a;
        };
      }(),
          h = function () {
        var a = function a(_a, b) {
          return _a.w - b.w;
        },
            b = function b(_b, c) {
          var d = {
            srcset: _b.getAttribute(lazySizes.cfg.srcsetAttr) || ""
          },
              e = g(d.srcset);
          return Object.defineProperty(_b, c, {
            value: d,
            writable: !0
          }), d.cands = e, d.index = 0, d.dirty = !1, e[0] && e[0].w ? (e.sort(a), d.cSrcset = [e[d.index].c]) : (d.cSrcset = d.srcset ? [d.srcset] : [], d.cands = []), d;
        };

        return function (a, c) {
          var d, f, g, h;
          if (!a[c] && (h = a.parentNode || {}, a[c] = b(a, c), a[c].isImg = !0, e.test(h.nodeName || ""))) for (a[c].picture = !0, d = h.getElementsByTagName("source"), f = 0, g = d.length; g > f; f++) {
            b(d[f], c).isImg = !1;
          }
          return a[c];
        };
      }(),
          i = {
        _lazyOptimumx: function () {
          var a = function a(_a2, b, c) {
            var d, e, f;
            return _a2 && _a2.d ? (f = c > .7 ? .6 : .4, _a2.d >= c ? !1 : (e = Math.pow(_a2.d - f, 1.6) || .1, .1 > e ? e = .1 : e > 3 && (e = 3), d = _a2.d + (b - c) * e, c > d)) : !0;
          };

          return function (b, c, d) {
            var e, f;

            for (e = 0; e < b.cands.length; e++) {
              if (f = b.cands[e], f.d = (f.w || 1) / c, !(b.index >= e)) {
                if (!(f.d <= d || a(b.cands[e - 1], f.d, d))) break;
                b.cSrcset.push(f.c), b.index = e;
              }
            }
          };
        }()
      },
          j = function () {
        var a = function a(_a3, b, c, d, e) {
          var f,
              g = _a3[e];
          g && (f = g.index, i[e](g, b, c), g.dirty && f == g.index || (g.cSrcset.join(", "), _a3.setAttribute(d, g.cSrcset.join(", ")), g.dirty = !0));
        };

        return function (b, c, d, e, f) {
          var g,
              h,
              i,
              j,
              k = b[f];
          if (k.width = c, k.picture && (h = b.parentNode)) for (g = h.getElementsByTagName("source"), j = 0, i = g.length; i > j; j++) {
            a(g[j], c, d, e, f);
          }
          a(b, c, d, e, f);
        };
      }(),
          k = function k(a) {
        var b = a.getAttribute("data-optimumx") || a.getAttribute("data-maxdpr");
        return !b && d.constrainPixelDensity && (b = "auto"), b && (b = "auto" == b ? d.getOptimumX(a) : parseFloat(b, 10)), b;
      },
          l = function l() {
        a.lazySizes && !a.lazySizes.getOptimumX && (lazySizes.getX = k, lazySizes.pWS = g, f.removeEventListener("lazybeforeunveil", l));
      };

      f.addEventListener("lazybeforeunveil", l), setTimeout(l), d = a.lazySizes && lazySizes.cfg || a.lazySizesConfig, d || (d = {}, a.lazySizesConfig = d), "function" != typeof d.getOptimumX && (d.getOptimumX = function () {
        var b = a.devicePixelRatio || 1;
        return b > 2.6 ? b *= .6 : b > 1.9 ? b *= .8 : b -= .01, Math.min(Math.round(100 * b) / 100, 2);
      }), a.devicePixelRatio && addEventListener("lazybeforesizes", function (a) {
        var b,
            c,
            e,
            f,
            g = a.target,
            i = a.detail,
            l = i.dataAttr;
        a.defaultPrevented || !(b = k(g)) || b >= devicePixelRatio || (!l || !g._lazyOptimumx || i.reloaded || d.unloadedClass && lazySizes.hC(g, d.unloadedClass) || (g._lazyOptimumx = null), c = h(g, "_lazyOptimumx"), e = i.width, e && (c.width || 0) < e && (f = l ? lazySizes.cfg.srcsetAttr : "srcset", lazySizes.rAF(function () {
          j(g, e, b, f, "_lazyOptimumx");
        })));
      });
    }
  }(window, document);
  /* lazysizes - progressive */

  !function (a, b) {
    var c = function c() {
      b(a.lazySizes), a.removeEventListener("lazyunveilread", c, !0);
    };

    b = b.bind(null, a, a.document), "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? b(require("lazysizes")) : a.lazySizes ? c() : a.addEventListener("lazyunveilread", c, !0);
  }(window, function (a, b, c) {
    "use strict";

    var d, _e;

    "srcset" in b.createElement("img") && (d = /^img$/i, _e = function e(a) {
      a.target.style.backgroundSize = "", a.target.style.backgroundImage = "", a.target.removeEventListener(a.type, _e);
    }, b.addEventListener("lazybeforeunveil", function (a) {
      if (a.detail.instance == c) {
        var b = a.target;

        if (d.test(b.nodeName)) {
          var f = b.getAttribute("src");
          f && (b.style.backgroundSize = "100% 100%", b.style.backgroundImage = "url(" + f + ")", b.removeAttribute("src"), b.addEventListener("load", _e));
        }
      }
    }, !1));
  });
  /* lazysizes - parent-fit */

  !function (a, b) {
    var c = function c() {
      b(a.lazySizes), a.removeEventListener("lazyunveilread", c, !0);
    };

    b = b.bind(null, a, a.document), "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? b(require("lazysizes")) : a.lazySizes ? c() : a.addEventListener("lazyunveilread", c, !0);
  }(window, function (a, b, c) {
    "use strict";

    if (a.addEventListener) {
      var d = /\s+(\d+)(w|h)\s+(\d+)(w|h)/,
          e = /parent-fit["']*\s*:\s*["']*(contain|cover|width)/,
          f = /parent-container["']*\s*:\s*["']*(.+?)(?=(\s|$|,|'|"|;))/,
          g = /^picture$/i,
          h = function h(a) {
        return getComputedStyle(a, null) || {};
      },
          i = {
        getParent: function getParent(b, c) {
          var d = b,
              e = b.parentNode;
          return c && "prev" != c || !e || !g.test(e.nodeName || "") || (e = e.parentNode), "self" != c && (d = "prev" == c ? b.previousElementSibling : c && (e.closest || a.jQuery) ? (e.closest ? e.closest(c) : jQuery(e).closest(c)[0]) || e : e), d;
        },
        getFit: function getFit(a) {
          var b,
              c,
              d = h(a),
              g = d.content || d.fontFamily,
              j = {
            fit: a._lazysizesParentFit || a.getAttribute("data-parent-fit")
          };
          return !j.fit && g && (b = g.match(e)) && (j.fit = b[1]), j.fit ? (c = a._lazysizesParentContainer || a.getAttribute("data-parent-container"), !c && g && (b = g.match(f)) && (c = b[1]), j.parent = i.getParent(a, c)) : j.fit = d.objectFit, j;
        },
        getImageRatio: function getImageRatio(b) {
          var c,
              e,
              f,
              h,
              i = b.parentNode,
              j = i && g.test(i.nodeName || "") ? i.querySelectorAll("source, img") : [b];

          for (c = 0; c < j.length; c++) {
            if (b = j[c], e = b.getAttribute(lazySizesConfig.srcsetAttr) || b.getAttribute("srcset") || b.getAttribute("data-pfsrcset") || b.getAttribute("data-risrcset") || "", f = b._lsMedia || b.getAttribute("media"), f = lazySizesConfig.customMedia[b.getAttribute("data-media") || f] || f, e && (!f || (a.matchMedia && matchMedia(f) || {}).matches)) {
              h = parseFloat(b.getAttribute("data-aspectratio")), !h && e.match(d) && (h = "w" == RegExp.$2 ? RegExp.$1 / RegExp.$3 : RegExp.$3 / RegExp.$1);
              break;
            }
          }

          return h;
        },
        calculateSize: function calculateSize(a, b) {
          var c,
              d,
              e,
              f,
              g = this.getFit(a),
              h = g.fit,
              i = g.parent;
          return "width" == h || ("contain" == h || "cover" == h) && (e = this.getImageRatio(a)) ? (i ? b = i.clientWidth : i = a, f = b, "width" == h ? f = b : (d = i.clientHeight, d > 40 && (c = b / d) && ("cover" == h && e > c || "contain" == h && c > e) && (f = b * (e / c))), f) : b;
        }
      };

      c.parentFit = i, b.addEventListener("lazybeforesizes", function (a) {
        if (!a.defaultPrevented && a.detail.instance == c) {
          var b = a.target;
          a.detail.width = i.calculateSize(b, a.detail.width);
        }
      });
    }
  });
  /*! lazysizes - respimg */

  !function (a, b) {
    var c = function c() {
      b(a.lazySizes), a.removeEventListener("lazyunveilread", c, !0);
    };

    b = b.bind(null, a, a.document), "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? b(require("lazysizes"), require("../fix-ios-sizes/fix-ios-sizes")) : a.lazySizes ? c() : a.addEventListener("lazyunveilread", c, !0);
  }(window, function (a, b, c) {
    "use strict";

    var d,
        e = c && c.cfg || a.lazySizesConfig,
        f = b.createElement("img"),
        g = "sizes" in f && "srcset" in f,
        h = /\s+\d+h/g,
        i = function () {
      var a = /\s+(\d+)(w|h)\s+(\d+)(w|h)/,
          c = Array.prototype.forEach;
      return function (d) {
        var e = b.createElement("img"),
            f = function f(b) {
          var c,
              d,
              e = b.getAttribute(lazySizesConfig.srcsetAttr);
          e && ((d = e.match(a)) && (c = "w" == d[2] ? d[1] / d[3] : d[3] / d[1], c && b.setAttribute("data-aspectratio", c)), b.setAttribute(lazySizesConfig.srcsetAttr, e.replace(h, "")));
        },
            g = function g(a) {
          var b = a.target.parentNode;
          b && "PICTURE" == b.nodeName && c.call(b.getElementsByTagName("source"), f), f(a.target);
        },
            i = function i() {
          e.currentSrc && b.removeEventListener("lazybeforeunveil", g);
        };

        d[1] && (b.addEventListener("lazybeforeunveil", g), e.onload = i, e.onerror = i, e.srcset = "data:,a 1w 1h", e.complete && i());
      };
    }();

    if (e || (e = {}, a.lazySizesConfig = e), e.supportsType || (e.supportsType = function (a) {
      return !a;
    }), !a.picturefill && !e.pf) {
      if (a.HTMLPictureElement && g) return b.msElementsFromPoint && i(navigator.userAgent.match(/Edge\/(\d+)/)), void (e.pf = function () {});
      e.pf = function (b) {
        var c, e;
        if (!a.picturefill) for (c = 0, e = b.elements.length; e > c; c++) {
          d(b.elements[c]);
        }
      }, d = function () {
        var f = function f(a, b) {
          return a.w - b.w;
        },
            i = /^\s*\d+\.*\d*px\s*$/,
            j = function j(a) {
          var b,
              c,
              d = a.length,
              e = a[d - 1],
              f = 0;

          for (f; d > f; f++) {
            if (e = a[f], e.d = e.w / a.w, e.d >= a.d) {
              !e.cached && (b = a[f - 1]) && b.d > a.d - .13 * Math.pow(a.d, 2.2) && (c = Math.pow(b.d - .6, 1.6), b.cached && (b.d += .15 * c), b.d + (e.d - a.d) * c > a.d && (e = b));
              break;
            }
          }

          return e;
        },
            k = function () {
          var a,
              b = /(([^,\s].[^\s]+)\s+(\d+)w)/g,
              c = /\s/,
              d = function d(b, c, _d, e) {
            a.push({
              c: c,
              u: _d,
              w: 1 * e
            });
          };

          return function (e) {
            return a = [], e = e.trim(), e.replace(h, "").replace(b, d), a.length || !e || c.test(e) || a.push({
              c: e,
              u: e,
              w: 99
            }), a;
          };
        }(),
            l = function l() {
          l.init || (l.init = !0, addEventListener("resize", function () {
            var a,
                c = b.getElementsByClassName("lazymatchmedia"),
                e = function e() {
              var a, b;

              for (a = 0, b = c.length; b > a; a++) {
                d(c[a]);
              }
            };

            return function () {
              clearTimeout(a), a = setTimeout(e, 66);
            };
          }()));
        },
            m = function m(b, d) {
          var f,
              g = b.getAttribute("srcset") || b.getAttribute(e.srcsetAttr);
          !g && d && (g = b._lazypolyfill ? b._lazypolyfill._set : b.getAttribute(e.srcAttr) || b.getAttribute("src")), b._lazypolyfill && b._lazypolyfill._set == g || (f = k(g || ""), d && b.parentNode && (f.isPicture = "PICTURE" == b.parentNode.nodeName.toUpperCase(), f.isPicture && a.matchMedia && (c.aC(b, "lazymatchmedia"), l())), f._set = g, Object.defineProperty(b, "_lazypolyfill", {
            value: f,
            writable: !0
          }));
        },
            n = function n(b) {
          var d = a.devicePixelRatio || 1,
              e = c.getX && c.getX(b);
          return Math.min(e || d, 2.5, d);
        },
            _o = function o(b) {
          return a.matchMedia ? (_o = function o(a) {
            return !a || (matchMedia(a) || {}).matches;
          })(b) : !b;
        },
            p = function p(a) {
          var b, d, g, h, k, l, p;
          if (h = a, m(h, !0), k = h._lazypolyfill, k.isPicture) for (d = 0, b = a.parentNode.getElementsByTagName("source"), g = b.length; g > d; d++) {
            if (e.supportsType(b[d].getAttribute("type"), a) && _o(b[d].getAttribute("media"))) {
              h = b[d], m(h), k = h._lazypolyfill;
              break;
            }
          }
          return k.length > 1 ? (p = h.getAttribute("sizes") || "", p = i.test(p) && parseInt(p, 10) || c.gW(a, a.parentNode), k.d = n(a), !k.src || !k.w || k.w < p ? (k.w = p, l = j(k.sort(f)), k.src = l) : l = k.src) : l = k[0], l;
        },
            q = function q(a) {
          if (!g || !a.parentNode || "PICTURE" == a.parentNode.nodeName.toUpperCase()) {
            var b = p(a);
            b && b.u && a._lazypolyfill.cur != b.u && (a._lazypolyfill.cur = b.u, b.cached = !0, a.setAttribute(e.srcAttr, b.u), a.setAttribute("src", b.u));
          }
        };

        return q.parse = k, q;
      }(), e.loadedClass && e.loadingClass && !function () {
        var a = [];
        ['img[sizes$="px"][srcset].', "picture > img:not([srcset])."].forEach(function (b) {
          a.push(b + e.loadedClass), a.push(b + e.loadingClass);
        }), e.pf({
          elements: b.querySelectorAll(a.join(", "))
        });
      }();
    }
  });
  /*! lazysizes - bgset */

  !function (a, b) {
    var c = function c() {
      b(a.lazySizes), a.removeEventListener("lazyunveilread", c, !0);
    };

    b = b.bind(null, a, a.document), "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? b(require("lazysizes")) : a.lazySizes ? c() : a.addEventListener("lazyunveilread", c, !0);
  }(window, function (a, b, c) {
    "use strict";

    if (a.addEventListener) {
      var d = /\s+/g,
          e = /\s*\|\s+|\s+\|\s*/g,
          f = /^(.+?)(?:\s+\[\s*(.+?)\s*\])?$/,
          g = /\(|\)|'/,
          h = {
        contain: 1,
        cover: 1
      },
          i = function i(a) {
        var b = c.gW(a, a.parentNode);
        return (!a._lazysizesWidth || b > a._lazysizesWidth) && (a._lazysizesWidth = b), a._lazysizesWidth;
      },
          j = function j(a) {
        var b;
        return b = (getComputedStyle(a) || {
          getPropertyValue: function getPropertyValue() {}
        }).getPropertyValue("background-size"), !h[b] && h[a.style.backgroundSize] && (b = a.style.backgroundSize), b;
      },
          k = function k(a, c, g) {
        var h = b.createElement("picture"),
            i = c.getAttribute(lazySizesConfig.sizesAttr),
            j = c.getAttribute("data-ratio"),
            k = c.getAttribute("data-optimumx");
        c._lazybgset && c._lazybgset.parentNode == c && c.removeChild(c._lazybgset), Object.defineProperty(g, "_lazybgset", {
          value: c,
          writable: !0
        }), Object.defineProperty(c, "_lazybgset", {
          value: h,
          writable: !0
        }), a = a.replace(d, " ").split(e), h.style.display = "none", g.className = lazySizesConfig.lazyClass, 1 != a.length || i || (i = "auto"), a.forEach(function (a) {
          var c = b.createElement("source");
          i && "auto" != i && c.setAttribute("sizes", i), a.match(f) && (c.setAttribute(lazySizesConfig.srcsetAttr, RegExp.$1), RegExp.$2 && c.setAttribute("media", lazySizesConfig.customMedia[RegExp.$2] || RegExp.$2)), h.appendChild(c);
        }), i && (g.setAttribute(lazySizesConfig.sizesAttr, i), c.removeAttribute(lazySizesConfig.sizesAttr), c.removeAttribute("sizes")), k && g.setAttribute("data-optimumx", k), j && g.setAttribute("data-ratio", j), h.appendChild(g), c.appendChild(h);
      },
          l = function l(a) {
        if (a.target._lazybgset) {
          var b = a.target,
              d = b._lazybgset,
              e = b.currentSrc || b.src;
          e && (d.style.backgroundImage = "url(" + (g.test(e) ? JSON.stringify(e) : e) + ")"), b._lazybgsetLoading && (c.fire(d, "_lazyloaded", {}, !1, !0), delete b._lazybgsetLoading);
        }
      };

      addEventListener("lazybeforeunveil", function (a) {
        var d, e, f;
        !a.defaultPrevented && (d = a.target.getAttribute("data-bgset")) && (f = a.target, e = b.createElement("img"), e.alt = "", e._lazybgsetLoading = !0, a.detail.firesLoad = !0, k(d, f, e), setTimeout(function () {
          c.loader.unveil(e), c.rAF(function () {
            c.fire(e, "_lazyloaded", {}, !0, !0), e.complete && l({
              target: e
            });
          });
        }));
      }), b.addEventListener("load", l, !0), a.addEventListener("lazybeforesizes", function (a) {
        if (a.detail.instance == c && a.target._lazybgset && a.detail.dataAttr) {
          var b = a.target._lazybgset,
              d = j(b);
          h[d] && (a.target._lazysizesParentFit = d, c.rAF(function () {
            a.target.setAttribute("data-parent-fit", d), a.target._lazysizesParentFit && delete a.target._lazysizesParentFit;
          }));
        }
      }, !0), b.documentElement.addEventListener("lazybeforesizes", function (a) {
        !a.defaultPrevented && a.target._lazybgset && a.detail.instance == c && (a.detail.width = i(a.target._lazybgset));
      });
    }
  });
  /* lazysizes placeholder removal */

  document.addEventListener('lazyloaded', function (e) {
    e.target.parentElement.className = e.target.parentElement.className.replace('lazyload--placeholder', '');
  });
  /*!
    Colorbox 1.6.4
    license: MIT
    http://www.jacklmoore.com/colorbox
  
    Modified by Clean Canvas to add aria-labels
  */

  (function (t, e, i) {
    function n(i, n, o) {
      var r = e.createElement(i);
      return n && (r.id = Z + n), o && (r.style.cssText = o), t(r);
    }

    function o() {
      return i.innerHeight ? i.innerHeight : t(i).height();
    }

    function r(e, i) {
      i !== Object(i) && (i = {}), this.cache = {}, this.el = e, this.value = function (e) {
        var n;
        return void 0 === this.cache[e] && (n = t(this.el).attr("data-cbox-" + e), void 0 !== n ? this.cache[e] = n : void 0 !== i[e] ? this.cache[e] = i[e] : void 0 !== X[e] && (this.cache[e] = X[e])), this.cache[e];
      }, this.get = function (e) {
        var i = this.value(e);
        return t.isFunction(i) ? i.call(this.el, this) : i;
      };
    }

    function h(t) {
      var e = W.length,
          i = (A + t) % e;
      return 0 > i ? e + i : i;
    }

    function a(t, e) {
      return Math.round((/%/.test(t) ? ("x" === e ? E.width() : o()) / 100 : 1) * parseInt(t, 10));
    }

    function s(t, e) {
      return t.get("photo") || t.get("photoRegex").test(e);
    }

    function l(t, e) {
      return t.get("retinaUrl") && i.devicePixelRatio > 1 ? e.replace(t.get("photoRegex"), t.get("retinaSuffix")) : e;
    }

    function d(t) {
      "contains" in x[0] && !x[0].contains(t.target) && t.target !== v[0] && (t.stopPropagation(), x.focus());
    }

    function c(t) {
      c.str !== t && (x.add(v).removeClass(c.str).addClass(t), c.str = t);
    }

    function g(e) {
      A = 0, e && e !== !1 && "nofollow" !== e ? (W = t("." + te).filter(function () {
        var i = t.data(this, Y),
            n = new r(this, i);
        return n.get("rel") === e;
      }), A = W.index(_.el), -1 === A && (W = W.add(_.el), A = W.length - 1)) : W = t(_.el);
    }

    function u(i) {
      t(e).trigger(i), ae.triggerHandler(i);
    }

    function f(i) {
      var o;

      if (!G) {
        if (o = t(i).data(Y), _ = new r(i, o), g(_.get("rel")), !U) {
          U = $ = !0, c(_.get("className")), x.css({
            visibility: "hidden",
            display: "block",
            opacity: ""
          }), I = n(se, "LoadedContent", "width:0; height:0; overflow:hidden; visibility:hidden"), b.css({
            width: "",
            height: ""
          }).append(I), j = T.height() + k.height() + b.outerHeight(!0) - b.height(), D = C.width() + H.width() + b.outerWidth(!0) - b.width(), N = I.outerHeight(!0), z = I.outerWidth(!0);

          var h = a(_.get("initialWidth"), "x"),
              s = a(_.get("initialHeight"), "y"),
              l = _.get("maxWidth"),
              f = _.get("maxHeight");

          _.w = Math.max((l !== !1 ? Math.min(h, a(l, "x")) : h) - z - D, 0), _.h = Math.max((f !== !1 ? Math.min(s, a(f, "y")) : s) - N - j, 0), I.css({
            width: "",
            height: _.h
          }), J.position(), u(ee), _.get("onOpen"), O.add(F).hide(), x.focus(), _.get("trapFocus") && e.addEventListener && (e.addEventListener("focus", d, !0), ae.one(re, function () {
            e.removeEventListener("focus", d, !0);
          })), _.get("returnFocus") && ae.one(re, function () {
            t(_.el).focus();
          });
        }

        var p = parseFloat(_.get("opacity"));
        v.css({
          opacity: p === p ? p : "",
          cursor: _.get("overlayClose") ? "pointer" : "",
          visibility: "visible"
        }).show(), _.get("closeButton") ? B.html(_.get("close")).appendTo(b) : B.appendTo("<div/>"), w();
      }
    }

    function p() {
      x || (V = !1, E = t(i), x = n(se).attr({
        id: Y,
        "class": t.support.opacity === !1 ? Z + "IE" : "",
        role: "dialog",
        tabindex: "-1"
      }).hide(), v = n(se, "Overlay").hide(), L = t([n(se, "LoadingOverlay")[0], n(se, "LoadingGraphic")[0]]), y = n(se, "Wrapper"), b = n(se, "Content").append(F = n(se, "Title"), R = n(se, "Current"), P = t('<button type="button" aria-label="' + theme.strings.previous + '"/>').attr({
        id: Z + "Previous"
      }), K = t('<button type="button" aria-label="' + theme.strings.next + '"/>').attr({
        id: Z + "Next"
      }), S = t('<button type="button" aria-label="' + theme.strings.slideshow + '"/>').attr({
        id: Z + "Slideshow"
      }), L), B = t('<button type="button" aria-label="' + theme.strings.close + '"/>').attr({
        id: Z + "Close"
      }), y.append(n(se).append(n(se, "TopLeft"), T = n(se, "TopCenter"), n(se, "TopRight")), n(se, !1, "clear:left").append(C = n(se, "MiddleLeft"), b, H = n(se, "MiddleRight")), n(se, !1, "clear:left").append(n(se, "BottomLeft"), k = n(se, "BottomCenter"), n(se, "BottomRight"))).find("div div").css({
        "float": "left"
      }), M = n(se, !1, "position:absolute; width:9999px; visibility:hidden; display:none; max-width:none;"), O = K.add(P).add(R).add(S)), e.body && !x.parent().length && t(e.body).append(v, x.append(y, M));
    }

    function m() {
      function i(t) {
        t.which > 1 || t.shiftKey || t.altKey || t.metaKey || t.ctrlKey || (t.preventDefault(), f(this));
      }

      return x ? (V || (V = !0, K.click(function () {
        J.next();
      }), P.click(function () {
        J.prev();
      }), B.click(function () {
        J.close();
      }), v.click(function () {
        _.get("overlayClose") && J.close();
      }), t(e).bind("keydown." + Z, function (t) {
        var e = t.keyCode;
        U && _.get("escKey") && 27 === e && (t.preventDefault(), J.close()), U && _.get("arrowKey") && W[1] && !t.altKey && (37 === e ? (t.preventDefault(), P.click()) : 39 === e && (t.preventDefault(), K.click()));
      }), t.isFunction(t.fn.on) ? t(e).on("click." + Z, "." + te, i) : t("." + te).live("click." + Z, i)), !0) : !1;
    }

    function w() {
      var e,
          o,
          r,
          h = J.prep,
          d = ++le;

      if ($ = !0, q = !1, u(he), u(ie), _.get("onLoad"), _.h = _.get("height") ? a(_.get("height"), "y") - N - j : _.get("innerHeight") && a(_.get("innerHeight"), "y"), _.w = _.get("width") ? a(_.get("width"), "x") - z - D : _.get("innerWidth") && a(_.get("innerWidth"), "x"), _.mw = _.w, _.mh = _.h, _.get("maxWidth") && (_.mw = a(_.get("maxWidth"), "x") - z - D, _.mw = _.w && _.w < _.mw ? _.w : _.mw), _.get("maxHeight") && (_.mh = a(_.get("maxHeight"), "y") - N - j, _.mh = _.h && _.h < _.mh ? _.h : _.mh), e = _.get("href"), Q = setTimeout(function () {
        L.show();
      }, 100), _.get("inline")) {
        var c = t(e).eq(0);
        r = t("<div>").hide().insertBefore(c), ae.one(he, function () {
          r.replaceWith(c);
        }), h(c);
      } else _.get("iframe") ? h(" ") : _.get("html") ? h(_.get("html")) : s(_, e) ? (e = l(_, e), q = _.get("createImg"), t(q).addClass(Z + "Photo").bind("error." + Z, function () {
        h(n(se, "Error").html(_.get("imgError")));
      }).one("load", function () {
        d === le && setTimeout(function () {
          var e;
          _.get("retinaImage") && i.devicePixelRatio > 1 && (q.height = q.height / i.devicePixelRatio, q.width = q.width / i.devicePixelRatio), _.get("scalePhotos") && (o = function o() {
            q.height -= q.height * e, q.width -= q.width * e;
          }, _.mw && q.width > _.mw && (e = (q.width - _.mw) / q.width, o()), _.mh && q.height > _.mh && (e = (q.height - _.mh) / q.height, o())), _.h && (q.style.marginTop = Math.max(_.mh - q.height, 0) / 2 + "px"), W[1] && (_.get("loop") || W[A + 1]) && (q.style.cursor = "pointer", t(q).bind("click." + Z, function () {
            J.next();
          })), q.style.width = q.width + "px", q.style.height = q.height + "px", h(q);
        }, 1);
      }), q.src = e) : e && M.load(e, _.get("data"), function (e, i) {
        d === le && h("error" === i ? n(se, "Error").html(_.get("xhrError")) : t(this).contents());
      });
    }

    var v,
        x,
        y,
        b,
        T,
        C,
        H,
        k,
        W,
        E,
        I,
        M,
        L,
        F,
        R,
        S,
        K,
        P,
        B,
        O,
        _,
        j,
        D,
        N,
        z,
        A,
        q,
        U,
        $,
        G,
        Q,
        J,
        V,
        X = {
      html: !1,
      photo: !1,
      iframe: !1,
      inline: !1,
      transition: "elastic",
      speed: 300,
      fadeOut: 300,
      width: !1,
      initialWidth: "600",
      innerWidth: !1,
      maxWidth: !1,
      height: !1,
      initialHeight: "450",
      innerHeight: !1,
      maxHeight: !1,
      scalePhotos: !0,
      scrolling: !0,
      opacity: .9,
      preloading: !0,
      className: !1,
      overlayClose: !0,
      escKey: !0,
      arrowKey: !0,
      top: !1,
      bottom: !1,
      left: !1,
      right: !1,
      fixed: !1,
      data: void 0,
      closeButton: !0,
      fastIframe: !0,
      open: !1,
      reposition: !0,
      loop: !0,
      slideshow: !1,
      slideshowAuto: !0,
      slideshowSpeed: 2500,
      slideshowStart: "start slideshow",
      slideshowStop: "stop slideshow",
      photoRegex: /\.(gif|png|jp(e|g|eg)|bmp|ico|webp|jxr|svg)((#|\?).*)?$/i,
      retinaImage: !1,
      retinaUrl: !1,
      retinaSuffix: "@2x.$1",
      current: "image {current} of {total}",
      previous: "previous",
      next: "next",
      close: "close",
      xhrError: "This content failed to load.",
      imgError: "This image failed to load.",
      returnFocus: !0,
      trapFocus: !0,
      onOpen: !1,
      onLoad: !1,
      onComplete: !1,
      onCleanup: !1,
      onClosed: !1,
      rel: function rel() {
        return this.rel;
      },
      href: function href() {
        return t(this).attr("href");
      },
      title: function title() {
        return this.title;
      },
      createImg: function createImg() {
        var e = new Image(),
            i = t(this).data("cbox-img-attrs");
        return "object" == _typeof(i) && t.each(i, function (t, i) {
          e[t] = i;
        }), e;
      },
      createIframe: function createIframe() {
        var i = e.createElement("iframe"),
            n = t(this).data("cbox-iframe-attrs");
        return "object" == _typeof(n) && t.each(n, function (t, e) {
          i[t] = e;
        }), "frameBorder" in i && (i.frameBorder = 0), "allowTransparency" in i && (i.allowTransparency = "true"), i.name = new Date().getTime(), i.allowFullscreen = !0, i;
      }
    },
        Y = "colorbox",
        Z = "cbox",
        te = Z + "Element",
        ee = Z + "_open",
        ie = Z + "_load",
        ne = Z + "_complete",
        oe = Z + "_cleanup",
        re = Z + "_closed",
        he = Z + "_purge",
        ae = t("<a/>"),
        se = "div",
        le = 0,
        de = {},
        ce = function () {
      function t() {
        clearTimeout(h);
      }

      function e() {
        (_.get("loop") || W[A + 1]) && (t(), h = setTimeout(J.next, _.get("slideshowSpeed")));
      }

      function i() {
        S.html(_.get("slideshowStop")).unbind(s).one(s, n), ae.bind(ne, e).bind(ie, t), x.removeClass(a + "off").addClass(a + "on");
      }

      function n() {
        t(), ae.unbind(ne, e).unbind(ie, t), S.html(_.get("slideshowStart")).unbind(s).one(s, function () {
          J.next(), i();
        }), x.removeClass(a + "on").addClass(a + "off");
      }

      function o() {
        r = !1, S.hide(), t(), ae.unbind(ne, e).unbind(ie, t), x.removeClass(a + "off " + a + "on");
      }

      var r,
          h,
          a = Z + "Slideshow_",
          s = "click." + Z;
      return function () {
        r ? _.get("slideshow") || (ae.unbind(oe, o), o()) : _.get("slideshow") && W[1] && (r = !0, ae.one(oe, o), _.get("slideshowAuto") ? i() : n(), S.show());
      };
    }();

    t[Y] || (t(p), J = t.fn[Y] = t[Y] = function (e, i) {
      var n,
          o = this;
      return e = e || {}, t.isFunction(o) && (o = t("<a/>"), e.open = !0), o[0] ? (p(), m() && (i && (e.onComplete = i), o.each(function () {
        var i = t.data(this, Y) || {};
        t.data(this, Y, t.extend(i, e));
      }).addClass(te), n = new r(o[0], e), n.get("open") && f(o[0])), o) : o;
    }, J.position = function (e, i) {
      function n() {
        T[0].style.width = k[0].style.width = b[0].style.width = parseInt(x[0].style.width, 10) - D + "px", b[0].style.height = C[0].style.height = H[0].style.height = parseInt(x[0].style.height, 10) - j + "px";
      }

      var r,
          h,
          s,
          l = 0,
          d = 0,
          c = x.offset();

      if (E.unbind("resize." + Z), x.css({
        top: -9e4,
        left: -9e4
      }), h = E.scrollTop(), s = E.scrollLeft(), _.get("fixed") ? (c.top -= h, c.left -= s, x.css({
        position: "fixed"
      })) : (l = h, d = s, x.css({
        position: "absolute"
      })), d += _.get("right") !== !1 ? Math.max(E.width() - _.w - z - D - a(_.get("right"), "x"), 0) : _.get("left") !== !1 ? a(_.get("left"), "x") : Math.round(Math.max(E.width() - _.w - z - D, 0) / 2), l += _.get("bottom") !== !1 ? Math.max(o() - _.h - N - j - a(_.get("bottom"), "y"), 0) : _.get("top") !== !1 ? a(_.get("top"), "y") : Math.round(Math.max(o() - _.h - N - j, 0) / 2), x.css({
        top: c.top,
        left: c.left,
        visibility: "visible"
      }), y[0].style.width = y[0].style.height = "9999px", r = {
        width: _.w + z + D,
        height: _.h + N + j,
        top: l,
        left: d
      }, e) {
        var g = 0;
        t.each(r, function (t) {
          return r[t] !== de[t] ? (g = e, void 0) : void 0;
        }), e = g;
      }

      de = r, e || x.css(r), x.dequeue().animate(r, {
        duration: e || 0,
        complete: function complete() {
          n(), $ = !1, y[0].style.width = _.w + z + D + "px", y[0].style.height = _.h + N + j + "px", _.get("reposition") && setTimeout(function () {
            E.bind("resize." + Z, J.position);
          }, 1), t.isFunction(i) && i();
        },
        step: n
      });
    }, J.resize = function (t) {
      var e;
      U && (t = t || {}, t.width && (_.w = a(t.width, "x") - z - D), t.innerWidth && (_.w = a(t.innerWidth, "x")), I.css({
        width: _.w
      }), t.height && (_.h = a(t.height, "y") - N - j), t.innerHeight && (_.h = a(t.innerHeight, "y")), t.innerHeight || t.height || (e = I.scrollTop(), I.css({
        height: "auto"
      }), _.h = I.height()), I.css({
        height: _.h
      }), e && I.scrollTop(e), J.position("none" === _.get("transition") ? 0 : _.get("speed")));
    }, J.prep = function (i) {
      function o() {
        return _.w = _.w || I.width(), _.w = _.mw && _.mw < _.w ? _.mw : _.w, _.w;
      }

      function a() {
        return _.h = _.h || I.height(), _.h = _.mh && _.mh < _.h ? _.mh : _.h, _.h;
      }

      if (U) {
        var d,
            g = "none" === _.get("transition") ? 0 : _.get("speed");
        I.remove(), I = n(se, "LoadedContent").append(i), I.hide().appendTo(M.show()).css({
          width: o(),
          overflow: _.get("scrolling") ? "auto" : "hidden"
        }).css({
          height: a()
        }).prependTo(b), M.hide(), t(q).css({
          "float": "none"
        }), c(_.get("className")), d = function d() {
          function i() {
            t.support.opacity === !1 && x[0].style.removeAttribute("filter");
          }

          var n,
              o,
              a = W.length;
          U && (o = function o() {
            clearTimeout(Q), L.hide(), u(ne), _.get("onComplete");
          }, F.html(_.get("title")).show(), I.show(), a > 1 ? ("string" == typeof _.get("current") && R.html(_.get("current").replace("{current}", A + 1).replace("{total}", a)).show(), K[_.get("loop") || a - 1 > A ? "show" : "hide"]().html(_.get("next")), P[_.get("loop") || A ? "show" : "hide"]().html(_.get("previous")), ce(), _.get("preloading") && t.each([h(-1), h(1)], function () {
            var i,
                n = W[this],
                o = new r(n, t.data(n, Y)),
                h = o.get("href");
            h && s(o, h) && (h = l(o, h), i = e.createElement("img"), i.src = h);
          })) : O.hide(), _.get("iframe") ? (n = _.get("createIframe"), _.get("scrolling") || (n.scrolling = "no"), t(n).attr({
            src: _.get("href"),
            "class": Z + "Iframe"
          }).one("load", o).appendTo(I), ae.one(he, function () {
            n.src = "//about:blank";
          }), _.get("fastIframe") && t(n).trigger("load")) : o(), "fade" === _.get("transition") ? x.fadeTo(g, 1, i) : i());
        }, "fade" === _.get("transition") ? x.fadeTo(g, 0, function () {
          J.position(0, d);
        }) : J.position(g, d);
      }
    }, J.next = function () {
      !$ && W[1] && (_.get("loop") || W[A + 1]) && (A = h(1), f(W[A]));
    }, J.prev = function () {
      !$ && W[1] && (_.get("loop") || A) && (A = h(-1), f(W[A]));
    }, J.close = function () {
      U && !G && (G = !0, U = !1, u(oe), _.get("onCleanup"), E.unbind("." + Z), v.fadeTo(_.get("fadeOut") || 0, 0), x.stop().fadeTo(_.get("fadeOut") || 0, 0, function () {
        x.hide(), v.hide(), u(he), I.remove(), setTimeout(function () {
          G = !1, u(re), _.get("onClosed");
        }, 1);
      }));
    }, J.remove = function () {
      x && (x.stop(), t[Y].close(), x.stop(!1, !0).remove(), v.remove(), G = !1, x = null, t("." + te).removeData(Y).removeClass(te), t(e).unbind("click." + Z).unbind("keydown." + Z));
    }, J.element = function () {
      return t(_.el);
    }, J.settings = X);
  })(jQuery, document, window);
  /**
   * Swiper 4.3.3
   * Most modern mobile touch slider and framework with hardware accelerated transitions
   * http://www.idangero.us/swiper/
   *
   * Copyright 2014-2018 Vladimir Kharlampidi
   *
   * Released under the MIT License
   *
   * Released on: June 5, 2018
   */


  !function (e, t) {
    "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Swiper = t();
  }(this, function () {
    "use strict";

    var e = "undefined" == typeof document ? {
      body: {},
      addEventListener: function addEventListener() {},
      removeEventListener: function removeEventListener() {},
      activeElement: {
        blur: function blur() {},
        nodeName: ""
      },
      querySelector: function querySelector() {
        return null;
      },
      querySelectorAll: function querySelectorAll() {
        return [];
      },
      getElementById: function getElementById() {
        return null;
      },
      createEvent: function createEvent() {
        return {
          initEvent: function initEvent() {}
        };
      },
      createElement: function createElement() {
        return {
          children: [],
          childNodes: [],
          style: {},
          setAttribute: function setAttribute() {},
          getElementsByTagName: function getElementsByTagName() {
            return [];
          }
        };
      },
      location: {
        hash: ""
      }
    } : document,
        t = "undefined" == typeof window ? {
      document: e,
      navigator: {
        userAgent: ""
      },
      location: {},
      history: {},
      CustomEvent: function CustomEvent() {
        return this;
      },
      addEventListener: function addEventListener() {},
      removeEventListener: function removeEventListener() {},
      getComputedStyle: function getComputedStyle() {
        return {
          getPropertyValue: function getPropertyValue() {
            return "";
          }
        };
      },
      Image: function Image() {},
      Date: function Date() {},
      screen: {},
      setTimeout: function setTimeout() {},
      clearTimeout: function clearTimeout() {}
    } : window,
        i = function i(e) {
      for (var t = 0; t < e.length; t += 1) {
        this[t] = e[t];
      }

      return this.length = e.length, this;
    };

    function s(s, a) {
      var r = [],
          n = 0;
      if (s && !a && s instanceof i) return s;
      if (s) if ("string" == typeof s) {
        var o,
            l,
            d = s.trim();

        if (d.indexOf("<") >= 0 && d.indexOf(">") >= 0) {
          var h = "div";

          for (0 === d.indexOf("<li") && (h = "ul"), 0 === d.indexOf("<tr") && (h = "tbody"), 0 !== d.indexOf("<td") && 0 !== d.indexOf("<th") || (h = "tr"), 0 === d.indexOf("<tbody") && (h = "table"), 0 === d.indexOf("<option") && (h = "select"), (l = e.createElement(h)).innerHTML = d, n = 0; n < l.childNodes.length; n += 1) {
            r.push(l.childNodes[n]);
          }
        } else for (o = a || "#" !== s[0] || s.match(/[ .<>:~]/) ? (a || e).querySelectorAll(s.trim()) : [e.getElementById(s.trim().split("#")[1])], n = 0; n < o.length; n += 1) {
          o[n] && r.push(o[n]);
        }
      } else if (s.nodeType || s === t || s === e) r.push(s);else if (s.length > 0 && s[0].nodeType) for (n = 0; n < s.length; n += 1) {
        r.push(s[n]);
      }
      return new i(r);
    }

    function a(e) {
      for (var t = [], i = 0; i < e.length; i += 1) {
        -1 === t.indexOf(e[i]) && t.push(e[i]);
      }

      return t;
    }

    s.fn = i.prototype, s.Class = i, s.Dom7 = i;
    var r = {
      addClass: function addClass(e) {
        if (void 0 === e) return this;

        for (var t = e.split(" "), i = 0; i < t.length; i += 1) {
          for (var s = 0; s < this.length; s += 1) {
            void 0 !== this[s].classList && this[s].classList.add(t[i]);
          }
        }

        return this;
      },
      removeClass: function removeClass(e) {
        for (var t = e.split(" "), i = 0; i < t.length; i += 1) {
          for (var s = 0; s < this.length; s += 1) {
            void 0 !== this[s].classList && this[s].classList.remove(t[i]);
          }
        }

        return this;
      },
      hasClass: function hasClass(e) {
        return !!this[0] && this[0].classList.contains(e);
      },
      toggleClass: function toggleClass(e) {
        for (var t = e.split(" "), i = 0; i < t.length; i += 1) {
          for (var s = 0; s < this.length; s += 1) {
            void 0 !== this[s].classList && this[s].classList.toggle(t[i]);
          }
        }

        return this;
      },
      attr: function attr(e, t) {
        var i = arguments;
        if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;

        for (var s = 0; s < this.length; s += 1) {
          if (2 === i.length) this[s].setAttribute(e, t);else for (var a in e) {
            this[s][a] = e[a], this[s].setAttribute(a, e[a]);
          }
        }

        return this;
      },
      removeAttr: function removeAttr(e) {
        for (var t = 0; t < this.length; t += 1) {
          this[t].removeAttribute(e);
        }

        return this;
      },
      data: function data(e, t) {
        var i;

        if (void 0 !== t) {
          for (var s = 0; s < this.length; s += 1) {
            (i = this[s]).dom7ElementDataStorage || (i.dom7ElementDataStorage = {}), i.dom7ElementDataStorage[e] = t;
          }

          return this;
        }

        if (i = this[0]) {
          if (i.dom7ElementDataStorage && e in i.dom7ElementDataStorage) return i.dom7ElementDataStorage[e];
          var a = i.getAttribute("data-" + e);
          return a || void 0;
        }
      },
      transform: function transform(e) {
        for (var t = 0; t < this.length; t += 1) {
          var i = this[t].style;
          i.webkitTransform = e, i.transform = e;
        }

        return this;
      },
      transition: function transition(e) {
        "string" != typeof e && (e += "ms");

        for (var t = 0; t < this.length; t += 1) {
          var i = this[t].style;
          i.webkitTransitionDuration = e, i.transitionDuration = e;
        }

        return this;
      },
      on: function on() {
        for (var e, t = [], i = arguments.length; i--;) {
          t[i] = arguments[i];
        }

        var a = t[0],
            r = t[1],
            n = t[2],
            o = t[3];

        function l(e) {
          var t = e.target;

          if (t) {
            var i = e.target.dom7EventData || [];
            if (i.indexOf(e) < 0 && i.unshift(e), s(t).is(r)) n.apply(t, i);else for (var a = s(t).parents(), o = 0; o < a.length; o += 1) {
              s(a[o]).is(r) && n.apply(a[o], i);
            }
          }
        }

        function d(e) {
          var t = e && e.target ? e.target.dom7EventData || [] : [];
          t.indexOf(e) < 0 && t.unshift(e), n.apply(this, t);
        }

        "function" == typeof t[1] && (a = (e = t)[0], n = e[1], o = e[2], r = void 0), o || (o = !1);

        for (var h, p = a.split(" "), c = 0; c < this.length; c += 1) {
          var u = this[c];
          if (r) for (h = 0; h < p.length; h += 1) {
            var v = p[h];
            u.dom7LiveListeners || (u.dom7LiveListeners = {}), u.dom7LiveListeners[v] || (u.dom7LiveListeners[v] = []), u.dom7LiveListeners[v].push({
              listener: n,
              proxyListener: l
            }), u.addEventListener(v, l, o);
          } else for (h = 0; h < p.length; h += 1) {
            var f = p[h];
            u.dom7Listeners || (u.dom7Listeners = {}), u.dom7Listeners[f] || (u.dom7Listeners[f] = []), u.dom7Listeners[f].push({
              listener: n,
              proxyListener: d
            }), u.addEventListener(f, d, o);
          }
        }

        return this;
      },
      off: function off() {
        for (var e, t = [], i = arguments.length; i--;) {
          t[i] = arguments[i];
        }

        var s = t[0],
            a = t[1],
            r = t[2],
            n = t[3];
        "function" == typeof t[1] && (s = (e = t)[0], r = e[1], n = e[2], a = void 0), n || (n = !1);

        for (var o = s.split(" "), l = 0; l < o.length; l += 1) {
          for (var d = o[l], h = 0; h < this.length; h += 1) {
            var p = this[h],
                c = void 0;
            if (!a && p.dom7Listeners ? c = p.dom7Listeners[d] : a && p.dom7LiveListeners && (c = p.dom7LiveListeners[d]), c && c.length) for (var u = c.length - 1; u >= 0; u -= 1) {
              var v = c[u];
              r && v.listener === r ? (p.removeEventListener(d, v.proxyListener, n), c.splice(u, 1)) : r || (p.removeEventListener(d, v.proxyListener, n), c.splice(u, 1));
            }
          }
        }

        return this;
      },
      trigger: function trigger() {
        for (var i = [], s = arguments.length; s--;) {
          i[s] = arguments[s];
        }

        for (var a = i[0].split(" "), r = i[1], n = 0; n < a.length; n += 1) {
          for (var o = a[n], l = 0; l < this.length; l += 1) {
            var d = this[l],
                h = void 0;

            try {
              h = new t.CustomEvent(o, {
                detail: r,
                bubbles: !0,
                cancelable: !0
              });
            } catch (t) {
              (h = e.createEvent("Event")).initEvent(o, !0, !0), h.detail = r;
            }

            d.dom7EventData = i.filter(function (e, t) {
              return t > 0;
            }), d.dispatchEvent(h), d.dom7EventData = [], delete d.dom7EventData;
          }
        }

        return this;
      },
      transitionEnd: function transitionEnd(e) {
        var t,
            i = ["webkitTransitionEnd", "transitionend"],
            s = this;

        function a(r) {
          if (r.target === this) for (e.call(this, r), t = 0; t < i.length; t += 1) {
            s.off(i[t], a);
          }
        }

        if (e) for (t = 0; t < i.length; t += 1) {
          s.on(i[t], a);
        }
        return this;
      },
      outerWidth: function outerWidth(e) {
        if (this.length > 0) {
          if (e) {
            var t = this.styles();
            return this[0].offsetWidth + parseFloat(t.getPropertyValue("margin-right")) + parseFloat(t.getPropertyValue("margin-left"));
          }

          return this[0].offsetWidth;
        }

        return null;
      },
      outerHeight: function outerHeight(e) {
        if (this.length > 0) {
          if (e) {
            var t = this.styles();
            return this[0].offsetHeight + parseFloat(t.getPropertyValue("margin-top")) + parseFloat(t.getPropertyValue("margin-bottom"));
          }

          return this[0].offsetHeight;
        }

        return null;
      },
      offset: function offset() {
        if (this.length > 0) {
          var i = this[0],
              s = i.getBoundingClientRect(),
              a = e.body,
              r = i.clientTop || a.clientTop || 0,
              n = i.clientLeft || a.clientLeft || 0,
              o = i === t ? t.scrollY : i.scrollTop,
              l = i === t ? t.scrollX : i.scrollLeft;
          return {
            top: s.top + o - r,
            left: s.left + l - n
          };
        }

        return null;
      },
      css: function css(e, i) {
        var s;

        if (1 === arguments.length) {
          if ("string" != typeof e) {
            for (s = 0; s < this.length; s += 1) {
              for (var a in e) {
                this[s].style[a] = e[a];
              }
            }

            return this;
          }

          if (this[0]) return t.getComputedStyle(this[0], null).getPropertyValue(e);
        }

        if (2 === arguments.length && "string" == typeof e) {
          for (s = 0; s < this.length; s += 1) {
            this[s].style[e] = i;
          }

          return this;
        }

        return this;
      },
      each: function each(e) {
        if (!e) return this;

        for (var t = 0; t < this.length; t += 1) {
          if (!1 === e.call(this[t], t, this[t])) return this;
        }

        return this;
      },
      html: function html(e) {
        if (void 0 === e) return this[0] ? this[0].innerHTML : void 0;

        for (var t = 0; t < this.length; t += 1) {
          this[t].innerHTML = e;
        }

        return this;
      },
      text: function text(e) {
        if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;

        for (var t = 0; t < this.length; t += 1) {
          this[t].textContent = e;
        }

        return this;
      },
      is: function is(a) {
        var r,
            n,
            o = this[0];
        if (!o || void 0 === a) return !1;

        if ("string" == typeof a) {
          if (o.matches) return o.matches(a);
          if (o.webkitMatchesSelector) return o.webkitMatchesSelector(a);
          if (o.msMatchesSelector) return o.msMatchesSelector(a);

          for (r = s(a), n = 0; n < r.length; n += 1) {
            if (r[n] === o) return !0;
          }

          return !1;
        }

        if (a === e) return o === e;
        if (a === t) return o === t;

        if (a.nodeType || a instanceof i) {
          for (r = a.nodeType ? [a] : a, n = 0; n < r.length; n += 1) {
            if (r[n] === o) return !0;
          }

          return !1;
        }

        return !1;
      },
      index: function index() {
        var e,
            t = this[0];

        if (t) {
          for (e = 0; null !== (t = t.previousSibling);) {
            1 === t.nodeType && (e += 1);
          }

          return e;
        }
      },
      eq: function eq(e) {
        if (void 0 === e) return this;
        var t,
            s = this.length;
        return new i(e > s - 1 ? [] : e < 0 ? (t = s + e) < 0 ? [] : [this[t]] : [this[e]]);
      },
      append: function append() {
        for (var t, s = [], a = arguments.length; a--;) {
          s[a] = arguments[a];
        }

        for (var r = 0; r < s.length; r += 1) {
          t = s[r];

          for (var n = 0; n < this.length; n += 1) {
            if ("string" == typeof t) {
              var o = e.createElement("div");

              for (o.innerHTML = t; o.firstChild;) {
                this[n].appendChild(o.firstChild);
              }
            } else if (t instanceof i) for (var l = 0; l < t.length; l += 1) {
              this[n].appendChild(t[l]);
            } else this[n].appendChild(t);
          }
        }

        return this;
      },
      prepend: function prepend(t) {
        var s, a;

        for (s = 0; s < this.length; s += 1) {
          if ("string" == typeof t) {
            var r = e.createElement("div");

            for (r.innerHTML = t, a = r.childNodes.length - 1; a >= 0; a -= 1) {
              this[s].insertBefore(r.childNodes[a], this[s].childNodes[0]);
            }
          } else if (t instanceof i) for (a = 0; a < t.length; a += 1) {
            this[s].insertBefore(t[a], this[s].childNodes[0]);
          } else this[s].insertBefore(t, this[s].childNodes[0]);
        }

        return this;
      },
      next: function next(e) {
        return this.length > 0 ? e ? this[0].nextElementSibling && s(this[0].nextElementSibling).is(e) ? new i([this[0].nextElementSibling]) : new i([]) : this[0].nextElementSibling ? new i([this[0].nextElementSibling]) : new i([]) : new i([]);
      },
      nextAll: function nextAll(e) {
        var t = [],
            a = this[0];
        if (!a) return new i([]);

        for (; a.nextElementSibling;) {
          var r = a.nextElementSibling;
          e ? s(r).is(e) && t.push(r) : t.push(r), a = r;
        }

        return new i(t);
      },
      prev: function prev(e) {
        if (this.length > 0) {
          var t = this[0];
          return e ? t.previousElementSibling && s(t.previousElementSibling).is(e) ? new i([t.previousElementSibling]) : new i([]) : t.previousElementSibling ? new i([t.previousElementSibling]) : new i([]);
        }

        return new i([]);
      },
      prevAll: function prevAll(e) {
        var t = [],
            a = this[0];
        if (!a) return new i([]);

        for (; a.previousElementSibling;) {
          var r = a.previousElementSibling;
          e ? s(r).is(e) && t.push(r) : t.push(r), a = r;
        }

        return new i(t);
      },
      parent: function parent(e) {
        for (var t = [], i = 0; i < this.length; i += 1) {
          null !== this[i].parentNode && (e ? s(this[i].parentNode).is(e) && t.push(this[i].parentNode) : t.push(this[i].parentNode));
        }

        return s(a(t));
      },
      parents: function parents(e) {
        for (var t = [], i = 0; i < this.length; i += 1) {
          for (var r = this[i].parentNode; r;) {
            e ? s(r).is(e) && t.push(r) : t.push(r), r = r.parentNode;
          }
        }

        return s(a(t));
      },
      closest: function closest(e) {
        var t = this;
        return void 0 === e ? new i([]) : (t.is(e) || (t = t.parents(e).eq(0)), t);
      },
      find: function find(e) {
        for (var t = [], s = 0; s < this.length; s += 1) {
          for (var a = this[s].querySelectorAll(e), r = 0; r < a.length; r += 1) {
            t.push(a[r]);
          }
        }

        return new i(t);
      },
      children: function children(e) {
        for (var t = [], r = 0; r < this.length; r += 1) {
          for (var n = this[r].childNodes, o = 0; o < n.length; o += 1) {
            e ? 1 === n[o].nodeType && s(n[o]).is(e) && t.push(n[o]) : 1 === n[o].nodeType && t.push(n[o]);
          }
        }

        return new i(a(t));
      },
      remove: function remove() {
        for (var e = 0; e < this.length; e += 1) {
          this[e].parentNode && this[e].parentNode.removeChild(this[e]);
        }

        return this;
      },
      add: function add() {
        for (var e = [], t = arguments.length; t--;) {
          e[t] = arguments[t];
        }

        var i, a;

        for (i = 0; i < e.length; i += 1) {
          var r = s(e[i]);

          for (a = 0; a < r.length; a += 1) {
            this[this.length] = r[a], this.length += 1;
          }
        }

        return this;
      },
      styles: function styles() {
        return this[0] ? t.getComputedStyle(this[0], null) : {};
      }
    };
    Object.keys(r).forEach(function (e) {
      s.fn[e] = r[e];
    });

    var n,
        o,
        l,
        d = {
      deleteProps: function deleteProps(e) {
        var t = e;
        Object.keys(t).forEach(function (e) {
          try {
            t[e] = null;
          } catch (e) {}

          try {
            delete t[e];
          } catch (e) {}
        });
      },
      nextTick: function nextTick(e, t) {
        return void 0 === t && (t = 0), setTimeout(e, t);
      },
      now: function now() {
        return Date.now();
      },
      getTranslate: function getTranslate(e, i) {
        var s, a, r;
        void 0 === i && (i = "x");
        var n = t.getComputedStyle(e, null);
        return t.WebKitCSSMatrix ? ((a = n.transform || n.webkitTransform).split(",").length > 6 && (a = a.split(", ").map(function (e) {
          return e.replace(",", ".");
        }).join(", ")), r = new t.WebKitCSSMatrix("none" === a ? "" : a)) : s = (r = n.MozTransform || n.OTransform || n.MsTransform || n.msTransform || n.transform || n.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","), "x" === i && (a = t.WebKitCSSMatrix ? r.m41 : 16 === s.length ? parseFloat(s[12]) : parseFloat(s[4])), "y" === i && (a = t.WebKitCSSMatrix ? r.m42 : 16 === s.length ? parseFloat(s[13]) : parseFloat(s[5])), a || 0;
      },
      parseUrlQuery: function parseUrlQuery(e) {
        var i,
            s,
            a,
            r,
            n = {},
            o = e || t.location.href;
        if ("string" == typeof o && o.length) for (r = (s = (o = o.indexOf("?") > -1 ? o.replace(/\S*\?/, "") : "").split("&").filter(function (e) {
          return "" !== e;
        })).length, i = 0; i < r; i += 1) {
          a = s[i].replace(/#\S+/g, "").split("="), n[decodeURIComponent(a[0])] = void 0 === a[1] ? void 0 : decodeURIComponent(a[1]) || "";
        }
        return n;
      },
      isObject: function isObject(e) {
        return "object" == _typeof(e) && null !== e && e.constructor && e.constructor === Object;
      },
      extend: function extend() {
        for (var e = [], t = arguments.length; t--;) {
          e[t] = arguments[t];
        }

        for (var i = Object(e[0]), s = 1; s < e.length; s += 1) {
          var a = e[s];
          if (void 0 !== a && null !== a) for (var r = Object.keys(Object(a)), n = 0, o = r.length; n < o; n += 1) {
            var l = r[n],
                h = Object.getOwnPropertyDescriptor(a, l);
            void 0 !== h && h.enumerable && (d.isObject(i[l]) && d.isObject(a[l]) ? d.extend(i[l], a[l]) : !d.isObject(i[l]) && d.isObject(a[l]) ? (i[l] = {}, d.extend(i[l], a[l])) : i[l] = a[l]);
          }
        }

        return i;
      }
    },
        h = (l = e.createElement("div"), {
      touch: t.Modernizr && !0 === t.Modernizr.touch || !!("ontouchstart" in t || t.DocumentTouch && e instanceof t.DocumentTouch),
      pointerEvents: !(!t.navigator.pointerEnabled && !t.PointerEvent),
      prefixedPointerEvents: !!t.navigator.msPointerEnabled,
      transition: (o = l.style, "transition" in o || "webkitTransition" in o || "MozTransition" in o),
      transforms3d: t.Modernizr && !0 === t.Modernizr.csstransforms3d || (n = l.style, "webkitPerspective" in n || "MozPerspective" in n || "OPerspective" in n || "MsPerspective" in n || "perspective" in n),
      flexbox: function () {
        for (var e = l.style, t = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), i = 0; i < t.length; i += 1) {
          if (t[i] in e) return !0;
        }

        return !1;
      }(),
      observer: "MutationObserver" in t || "WebkitMutationObserver" in t,
      passiveListener: function () {
        var e = !1;

        try {
          var i = Object.defineProperty({}, "passive", {
            get: function get() {
              e = !0;
            }
          });
          t.addEventListener("testPassiveListener", null, i);
        } catch (e) {}

        return e;
      }(),
      gestures: "ongesturestart" in t
    }),
        p = function p(e) {
      void 0 === e && (e = {});
      var t = this;
      t.params = e, t.eventsListeners = {}, t.params && t.params.on && Object.keys(t.params.on).forEach(function (e) {
        t.on(e, t.params.on[e]);
      });
    },
        c = {
      components: {
        configurable: !0
      }
    };

    p.prototype.on = function (e, t, i) {
      var s = this;
      if ("function" != typeof t) return s;
      var a = i ? "unshift" : "push";
      return e.split(" ").forEach(function (e) {
        s.eventsListeners[e] || (s.eventsListeners[e] = []), s.eventsListeners[e][a](t);
      }), s;
    }, p.prototype.once = function (e, t, i) {
      var s = this;
      if ("function" != typeof t) return s;
      return s.on(e, function i() {
        for (var a = [], r = arguments.length; r--;) {
          a[r] = arguments[r];
        }

        t.apply(s, a), s.off(e, i);
      }, i);
    }, p.prototype.off = function (e, t) {
      var i = this;
      return i.eventsListeners ? (e.split(" ").forEach(function (e) {
        void 0 === t ? i.eventsListeners[e] = [] : i.eventsListeners[e].forEach(function (s, a) {
          s === t && i.eventsListeners[e].splice(a, 1);
        });
      }), i) : i;
    }, p.prototype.emit = function () {
      for (var e = [], t = arguments.length; t--;) {
        e[t] = arguments[t];
      }

      var i,
          s,
          a,
          r = this;
      return r.eventsListeners ? ("string" == typeof e[0] || Array.isArray(e[0]) ? (i = e[0], s = e.slice(1, e.length), a = r) : (i = e[0].events, s = e[0].data, a = e[0].context || r), (Array.isArray(i) ? i : i.split(" ")).forEach(function (e) {
        if (r.eventsListeners && r.eventsListeners[e]) {
          var t = [];
          r.eventsListeners[e].forEach(function (e) {
            t.push(e);
          }), t.forEach(function (e) {
            e.apply(a, s);
          });
        }
      }), r) : r;
    }, p.prototype.useModulesParams = function (e) {
      var t = this;
      t.modules && Object.keys(t.modules).forEach(function (i) {
        var s = t.modules[i];
        s.params && d.extend(e, s.params);
      });
    }, p.prototype.useModules = function (e) {
      void 0 === e && (e = {});
      var t = this;
      t.modules && Object.keys(t.modules).forEach(function (i) {
        var s = t.modules[i],
            a = e[i] || {};
        s.instance && Object.keys(s.instance).forEach(function (e) {
          var i = s.instance[e];
          t[e] = "function" == typeof i ? i.bind(t) : i;
        }), s.on && t.on && Object.keys(s.on).forEach(function (e) {
          t.on(e, s.on[e]);
        }), s.create && s.create.bind(t)(a);
      });
    }, c.components.set = function (e) {
      this.use && this.use(e);
    }, p.installModule = function (e) {
      for (var t = [], i = arguments.length - 1; i-- > 0;) {
        t[i] = arguments[i + 1];
      }

      var s = this;
      s.prototype.modules || (s.prototype.modules = {});
      var a = e.name || Object.keys(s.prototype.modules).length + "_" + d.now();
      return s.prototype.modules[a] = e, e.proto && Object.keys(e.proto).forEach(function (t) {
        s.prototype[t] = e.proto[t];
      }), e["static"] && Object.keys(e["static"]).forEach(function (t) {
        s[t] = e["static"][t];
      }), e.install && e.install.apply(s, t), s;
    }, p.use = function (e) {
      for (var t = [], i = arguments.length - 1; i-- > 0;) {
        t[i] = arguments[i + 1];
      }

      var s = this;
      return Array.isArray(e) ? (e.forEach(function (e) {
        return s.installModule(e);
      }), s) : s.installModule.apply(s, [e].concat(t));
    }, Object.defineProperties(p, c);
    var u = {
      updateSize: function updateSize() {
        var e,
            t,
            i = this.$el;
        e = void 0 !== this.params.width ? this.params.width : i[0].clientWidth, t = void 0 !== this.params.height ? this.params.height : i[0].clientHeight, 0 === e && this.isHorizontal() || 0 === t && this.isVertical() || (e = e - parseInt(i.css("padding-left"), 10) - parseInt(i.css("padding-right"), 10), t = t - parseInt(i.css("padding-top"), 10) - parseInt(i.css("padding-bottom"), 10), d.extend(this, {
          width: e,
          height: t,
          size: this.isHorizontal() ? e : t
        }));
      },
      updateSlides: function updateSlides() {
        var e = this.params,
            i = this.$wrapperEl,
            s = this.size,
            a = this.rtlTranslate,
            r = this.wrongRTL,
            n = this.virtual && e.virtual.enabled,
            o = n ? this.virtual.slides.length : this.slides.length,
            l = i.children("." + this.params.slideClass),
            p = n ? this.virtual.slides.length : l.length,
            c = [],
            u = [],
            v = [],
            f = e.slidesOffsetBefore;
        "function" == typeof f && (f = e.slidesOffsetBefore.call(this));
        var m = e.slidesOffsetAfter;
        "function" == typeof m && (m = e.slidesOffsetAfter.call(this));
        var g = this.snapGrid.length,
            b = this.snapGrid.length,
            w = e.spaceBetween,
            y = -f,
            x = 0,
            E = 0;

        if (void 0 !== s) {
          var T, S;
          "string" == typeof w && w.indexOf("%") >= 0 && (w = parseFloat(w.replace("%", "")) / 100 * s), this.virtualSize = -w, a ? l.css({
            marginLeft: "",
            marginTop: ""
          }) : l.css({
            marginRight: "",
            marginBottom: ""
          }), e.slidesPerColumn > 1 && (T = Math.floor(p / e.slidesPerColumn) === p / this.params.slidesPerColumn ? p : Math.ceil(p / e.slidesPerColumn) * e.slidesPerColumn, "auto" !== e.slidesPerView && "row" === e.slidesPerColumnFill && (T = Math.max(T, e.slidesPerView * e.slidesPerColumn)));

          for (var C, M = e.slidesPerColumn, z = T / M, k = z - (e.slidesPerColumn * z - p), P = 0; P < p; P += 1) {
            S = 0;
            var $ = l.eq(P);

            if (e.slidesPerColumn > 1) {
              var L = void 0,
                  I = void 0,
                  D = void 0;
              "column" === e.slidesPerColumnFill ? (D = P - (I = Math.floor(P / M)) * M, (I > k || I === k && D === M - 1) && (D += 1) >= M && (D = 0, I += 1), L = I + D * T / M, $.css({
                "-webkit-box-ordinal-group": L,
                "-moz-box-ordinal-group": L,
                "-ms-flex-order": L,
                "-webkit-order": L,
                order: L
              })) : I = P - (D = Math.floor(P / z)) * z, $.css("margin-" + (this.isHorizontal() ? "top" : "left"), 0 !== D && e.spaceBetween && e.spaceBetween + "px").attr("data-swiper-column", I).attr("data-swiper-row", D);
            }

            if ("none" !== $.css("display")) {
              if ("auto" === e.slidesPerView) {
                var O = t.getComputedStyle($[0], null),
                    A = $[0].style.transform,
                    G = $[0].style.webkitTransform;
                A && ($[0].style.transform = "none"), G && ($[0].style.webkitTransform = "none"), S = this.isHorizontal() ? $[0].getBoundingClientRect().width + parseFloat(O.getPropertyValue("margin-left")) + parseFloat(O.getPropertyValue("margin-right")) : $[0].getBoundingClientRect().height + parseFloat(O.getPropertyValue("margin-top")) + parseFloat(O.getPropertyValue("margin-bottom")), A && ($[0].style.transform = A), G && ($[0].style.webkitTransform = G), e.roundLengths && (S = Math.floor(S));
              } else S = (s - (e.slidesPerView - 1) * w) / e.slidesPerView, e.roundLengths && (S = Math.floor(S)), l[P] && (this.isHorizontal() ? l[P].style.width = S + "px" : l[P].style.height = S + "px");

              l[P] && (l[P].swiperSlideSize = S), v.push(S), e.centeredSlides ? (y = y + S / 2 + x / 2 + w, 0 === x && 0 !== P && (y = y - s / 2 - w), 0 === P && (y = y - s / 2 - w), Math.abs(y) < .001 && (y = 0), e.roundLengths && (y = Math.floor(y)), E % e.slidesPerGroup == 0 && c.push(y), u.push(y)) : (e.roundLengths && (y = Math.floor(y)), E % e.slidesPerGroup == 0 && c.push(y), u.push(y), y = y + S + w), this.virtualSize += S + w, x = S, E += 1;
            }
          }

          if (this.virtualSize = Math.max(this.virtualSize, s) + m, a && r && ("slide" === e.effect || "coverflow" === e.effect) && i.css({
            width: this.virtualSize + e.spaceBetween + "px"
          }), h.flexbox && !e.setWrapperSize || (this.isHorizontal() ? i.css({
            width: this.virtualSize + e.spaceBetween + "px"
          }) : i.css({
            height: this.virtualSize + e.spaceBetween + "px"
          })), e.slidesPerColumn > 1 && (this.virtualSize = (S + e.spaceBetween) * T, this.virtualSize = Math.ceil(this.virtualSize / e.slidesPerColumn) - e.spaceBetween, this.isHorizontal() ? i.css({
            width: this.virtualSize + e.spaceBetween + "px"
          }) : i.css({
            height: this.virtualSize + e.spaceBetween + "px"
          }), e.centeredSlides)) {
            C = [];

            for (var H = 0; H < c.length; H += 1) {
              var N = c[H];
              e.roundLengths && (N = Math.floor(N)), c[H] < this.virtualSize + c[0] && C.push(N);
            }

            c = C;
          }

          if (!e.centeredSlides) {
            C = [];

            for (var B = 0; B < c.length; B += 1) {
              var X = c[B];
              e.roundLengths && (X = Math.floor(X)), c[B] <= this.virtualSize - s && C.push(X);
            }

            c = C, Math.floor(this.virtualSize - s) - Math.floor(c[c.length - 1]) > 1 && c.push(this.virtualSize - s);
          }

          0 === c.length && (c = [0]), 0 !== e.spaceBetween && (this.isHorizontal() ? a ? l.css({
            marginLeft: w + "px"
          }) : l.css({
            marginRight: w + "px"
          }) : l.css({
            marginBottom: w + "px"
          })), d.extend(this, {
            slides: l,
            snapGrid: c,
            slidesGrid: u,
            slidesSizesGrid: v
          }), p !== o && this.emit("slidesLengthChange"), c.length !== g && (this.params.watchOverflow && this.checkOverflow(), this.emit("snapGridLengthChange")), u.length !== b && this.emit("slidesGridLengthChange"), (e.watchSlidesProgress || e.watchSlidesVisibility) && this.updateSlidesOffset();
        }
      },
      updateAutoHeight: function updateAutoHeight(e) {
        var t,
            i = [],
            s = 0;
        if ("number" == typeof e ? this.setTransition(e) : !0 === e && this.setTransition(this.params.speed), "auto" !== this.params.slidesPerView && this.params.slidesPerView > 1) for (t = 0; t < Math.ceil(this.params.slidesPerView); t += 1) {
          var a = this.activeIndex + t;
          if (a > this.slides.length) break;
          i.push(this.slides.eq(a)[0]);
        } else i.push(this.slides.eq(this.activeIndex)[0]);

        for (t = 0; t < i.length; t += 1) {
          if (void 0 !== i[t]) {
            var r = i[t].offsetHeight;
            s = r > s ? r : s;
          }
        }

        s && this.$wrapperEl.css("height", s + "px");
      },
      updateSlidesOffset: function updateSlidesOffset() {
        for (var e = this.slides, t = 0; t < e.length; t += 1) {
          e[t].swiperSlideOffset = this.isHorizontal() ? e[t].offsetLeft : e[t].offsetTop;
        }
      },
      updateSlidesProgress: function updateSlidesProgress(e) {
        void 0 === e && (e = this && this.translate || 0);
        var t = this.params,
            i = this.slides,
            s = this.rtlTranslate;

        if (0 !== i.length) {
          void 0 === i[0].swiperSlideOffset && this.updateSlidesOffset();
          var a = -e;
          s && (a = e), i.removeClass(t.slideVisibleClass);

          for (var r = 0; r < i.length; r += 1) {
            var n = i[r],
                o = (a + (t.centeredSlides ? this.minTranslate() : 0) - n.swiperSlideOffset) / (n.swiperSlideSize + t.spaceBetween);

            if (t.watchSlidesVisibility) {
              var l = -(a - n.swiperSlideOffset),
                  d = l + this.slidesSizesGrid[r];
              (l >= 0 && l < this.size || d > 0 && d <= this.size || l <= 0 && d >= this.size) && i.eq(r).addClass(t.slideVisibleClass);
            }

            n.progress = s ? -o : o;
          }
        }
      },
      updateProgress: function updateProgress(e) {
        void 0 === e && (e = this && this.translate || 0);
        var t = this.params,
            i = this.maxTranslate() - this.minTranslate(),
            s = this.progress,
            a = this.isBeginning,
            r = this.isEnd,
            n = a,
            o = r;
        0 === i ? (s = 0, a = !0, r = !0) : (a = (s = (e - this.minTranslate()) / i) <= 0, r = s >= 1), d.extend(this, {
          progress: s,
          isBeginning: a,
          isEnd: r
        }), (t.watchSlidesProgress || t.watchSlidesVisibility) && this.updateSlidesProgress(e), a && !n && this.emit("reachBeginning toEdge"), r && !o && this.emit("reachEnd toEdge"), (n && !a || o && !r) && this.emit("fromEdge"), this.emit("progress", s);
      },
      updateSlidesClasses: function updateSlidesClasses() {
        var e,
            t = this.slides,
            i = this.params,
            s = this.$wrapperEl,
            a = this.activeIndex,
            r = this.realIndex,
            n = this.virtual && i.virtual.enabled;
        t.removeClass(i.slideActiveClass + " " + i.slideNextClass + " " + i.slidePrevClass + " " + i.slideDuplicateActiveClass + " " + i.slideDuplicateNextClass + " " + i.slideDuplicatePrevClass), (e = n ? this.$wrapperEl.find("." + i.slideClass + '[data-swiper-slide-index="' + a + '"]') : t.eq(a)).addClass(i.slideActiveClass), i.loop && (e.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + r + '"]').addClass(i.slideDuplicateActiveClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + r + '"]').addClass(i.slideDuplicateActiveClass));
        var o = e.nextAll("." + i.slideClass).eq(0).addClass(i.slideNextClass);
        i.loop && 0 === o.length && (o = t.eq(0)).addClass(i.slideNextClass);
        var l = e.prevAll("." + i.slideClass).eq(0).addClass(i.slidePrevClass);
        i.loop && 0 === l.length && (l = t.eq(-1)).addClass(i.slidePrevClass), i.loop && (o.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + o.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + o.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass), l.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass));
      },
      updateActiveIndex: function updateActiveIndex(e) {
        var t,
            i = this.rtlTranslate ? this.translate : -this.translate,
            s = this.slidesGrid,
            a = this.snapGrid,
            r = this.params,
            n = this.activeIndex,
            o = this.realIndex,
            l = this.snapIndex,
            h = e;

        if (void 0 === h) {
          for (var p = 0; p < s.length; p += 1) {
            void 0 !== s[p + 1] ? i >= s[p] && i < s[p + 1] - (s[p + 1] - s[p]) / 2 ? h = p : i >= s[p] && i < s[p + 1] && (h = p + 1) : i >= s[p] && (h = p);
          }

          r.normalizeSlideIndex && (h < 0 || void 0 === h) && (h = 0);
        }

        if ((t = a.indexOf(i) >= 0 ? a.indexOf(i) : Math.floor(h / r.slidesPerGroup)) >= a.length && (t = a.length - 1), h !== n) {
          var c = parseInt(this.slides.eq(h).attr("data-swiper-slide-index") || h, 10);
          d.extend(this, {
            snapIndex: t,
            realIndex: c,
            previousIndex: n,
            activeIndex: h
          }), this.emit("activeIndexChange"), this.emit("snapIndexChange"), o !== c && this.emit("realIndexChange"), this.emit("slideChange");
        } else t !== l && (this.snapIndex = t, this.emit("snapIndexChange"));
      },
      updateClickedSlide: function updateClickedSlide(e) {
        var t = this.params,
            i = s(e.target).closest("." + t.slideClass)[0],
            a = !1;
        if (i) for (var r = 0; r < this.slides.length; r += 1) {
          this.slides[r] === i && (a = !0);
        }
        if (!i || !a) return this.clickedSlide = void 0, void (this.clickedIndex = void 0);
        this.clickedSlide = i, this.virtual && this.params.virtual.enabled ? this.clickedIndex = parseInt(s(i).attr("data-swiper-slide-index"), 10) : this.clickedIndex = s(i).index(), t.slideToClickedSlide && void 0 !== this.clickedIndex && this.clickedIndex !== this.activeIndex && this.slideToClickedSlide();
      }
    };
    var v = {
      getTranslate: function getTranslate(e) {
        void 0 === e && (e = this.isHorizontal() ? "x" : "y");
        var t = this.params,
            i = this.rtlTranslate,
            s = this.translate,
            a = this.$wrapperEl;
        if (t.virtualTranslate) return i ? -s : s;
        var r = d.getTranslate(a[0], e);
        return i && (r = -r), r || 0;
      },
      setTranslate: function setTranslate(e, t) {
        var i = this.rtlTranslate,
            s = this.params,
            a = this.$wrapperEl,
            r = this.progress,
            n = 0,
            o = 0;
        this.isHorizontal() ? n = i ? -e : e : o = e, s.roundLengths && (n = Math.floor(n), o = Math.floor(o)), s.virtualTranslate || (h.transforms3d ? a.transform("translate3d(" + n + "px, " + o + "px, 0px)") : a.transform("translate(" + n + "px, " + o + "px)")), this.previousTranslate = this.translate, this.translate = this.isHorizontal() ? n : o;
        var l = this.maxTranslate() - this.minTranslate();
        (0 === l ? 0 : (e - this.minTranslate()) / l) !== r && this.updateProgress(e), this.emit("setTranslate", this.translate, t);
      },
      minTranslate: function minTranslate() {
        return -this.snapGrid[0];
      },
      maxTranslate: function maxTranslate() {
        return -this.snapGrid[this.snapGrid.length - 1];
      }
    };
    var f = {
      setTransition: function setTransition(e, t) {
        this.$wrapperEl.transition(e), this.emit("setTransition", e, t);
      },
      transitionStart: function transitionStart(e, t) {
        void 0 === e && (e = !0);
        var i = this.activeIndex,
            s = this.params,
            a = this.previousIndex;
        s.autoHeight && this.updateAutoHeight();
        var r = t;

        if (r || (r = i > a ? "next" : i < a ? "prev" : "reset"), this.emit("transitionStart"), e && i !== a) {
          if ("reset" === r) return void this.emit("slideResetTransitionStart");
          this.emit("slideChangeTransitionStart"), "next" === r ? this.emit("slideNextTransitionStart") : this.emit("slidePrevTransitionStart");
        }
      },
      transitionEnd: function transitionEnd(e, t) {
        void 0 === e && (e = !0);
        var i = this.activeIndex,
            s = this.previousIndex;
        this.animating = !1, this.setTransition(0);
        var a = t;

        if (a || (a = i > s ? "next" : i < s ? "prev" : "reset"), this.emit("transitionEnd"), e && i !== s) {
          if ("reset" === a) return void this.emit("slideResetTransitionEnd");
          this.emit("slideChangeTransitionEnd"), "next" === a ? this.emit("slideNextTransitionEnd") : this.emit("slidePrevTransitionEnd");
        }
      }
    };
    var m = {
      slideTo: function slideTo(e, t, i, s) {
        void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0);
        var a = this,
            r = e;
        r < 0 && (r = 0);
        var n = a.params,
            o = a.snapGrid,
            l = a.slidesGrid,
            d = a.previousIndex,
            p = a.activeIndex,
            c = a.rtlTranslate;
        if (a.animating && n.preventIntercationOnTransition) return !1;
        var u = Math.floor(r / n.slidesPerGroup);
        u >= o.length && (u = o.length - 1), (p || n.initialSlide || 0) === (d || 0) && i && a.emit("beforeSlideChangeStart");
        var v,
            f = -o[u];
        if (a.updateProgress(f), n.normalizeSlideIndex) for (var m = 0; m < l.length; m += 1) {
          -Math.floor(100 * f) >= Math.floor(100 * l[m]) && (r = m);
        }

        if (a.initialized && r !== p) {
          if (!a.allowSlideNext && f < a.translate && f < a.minTranslate()) return !1;
          if (!a.allowSlidePrev && f > a.translate && f > a.maxTranslate() && (p || 0) !== r) return !1;
        }

        return v = r > p ? "next" : r < p ? "prev" : "reset", c && -f === a.translate || !c && f === a.translate ? (a.updateActiveIndex(r), n.autoHeight && a.updateAutoHeight(), a.updateSlidesClasses(), "slide" !== n.effect && a.setTranslate(f), "reset" !== v && (a.transitionStart(i, v), a.transitionEnd(i, v)), !1) : (0 !== t && h.transition ? (a.setTransition(t), a.setTranslate(f), a.updateActiveIndex(r), a.updateSlidesClasses(), a.emit("beforeTransitionStart", t, s), a.transitionStart(i, v), a.animating || (a.animating = !0, a.onSlideToWrapperTransitionEnd || (a.onSlideToWrapperTransitionEnd = function (e) {
          a && !a.destroyed && e.target === this && (a.$wrapperEl[0].removeEventListener("transitionend", a.onSlideToWrapperTransitionEnd), a.$wrapperEl[0].removeEventListener("webkitTransitionEnd", a.onSlideToWrapperTransitionEnd), a.transitionEnd(i, v));
        }), a.$wrapperEl[0].addEventListener("transitionend", a.onSlideToWrapperTransitionEnd), a.$wrapperEl[0].addEventListener("webkitTransitionEnd", a.onSlideToWrapperTransitionEnd))) : (a.setTransition(0), a.setTranslate(f), a.updateActiveIndex(r), a.updateSlidesClasses(), a.emit("beforeTransitionStart", t, s), a.transitionStart(i, v), a.transitionEnd(i, v)), !0);
      },
      slideToLoop: function slideToLoop(e, t, i, s) {
        void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0);
        var a = e;
        return this.params.loop && (a += this.loopedSlides), this.slideTo(a, t, i, s);
      },
      slideNext: function slideNext(e, t, i) {
        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
        var s = this.params,
            a = this.animating;
        return s.loop ? !a && (this.loopFix(), this._clientLeft = this.$wrapperEl[0].clientLeft, this.slideTo(this.activeIndex + s.slidesPerGroup, e, t, i)) : this.slideTo(this.activeIndex + s.slidesPerGroup, e, t, i);
      },
      slidePrev: function slidePrev(e, t, i) {
        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
        var s = this.params,
            a = this.animating,
            r = this.snapGrid,
            n = this.slidesGrid,
            o = this.rtlTranslate;

        if (s.loop) {
          if (a) return !1;
          this.loopFix(), this._clientLeft = this.$wrapperEl[0].clientLeft;
        }

        function l(e) {
          return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
        }

        var d,
            h = l(o ? this.translate : -this.translate),
            p = r.map(function (e) {
          return l(e);
        }),
            c = (n.map(function (e) {
          return l(e);
        }), r[p.indexOf(h)], r[p.indexOf(h) - 1]);
        return void 0 !== c && (d = n.indexOf(c)) < 0 && (d = this.activeIndex - 1), this.slideTo(d, e, t, i);
      },
      slideReset: function slideReset(e, t, i) {
        return void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), this.slideTo(this.activeIndex, e, t, i);
      },
      slideToClosest: function slideToClosest(e, t, i) {
        void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
        var s = this.activeIndex,
            a = Math.floor(s / this.params.slidesPerGroup);

        if (a < this.snapGrid.length - 1) {
          var r = this.rtlTranslate ? this.translate : -this.translate,
              n = this.snapGrid[a];
          r - n > (this.snapGrid[a + 1] - n) / 2 && (s = this.params.slidesPerGroup);
        }

        return this.slideTo(s, e, t, i);
      },
      slideToClickedSlide: function slideToClickedSlide() {
        var e,
            t = this,
            i = t.params,
            a = t.$wrapperEl,
            r = "auto" === i.slidesPerView ? t.slidesPerViewDynamic() : i.slidesPerView,
            n = t.clickedIndex;

        if (i.loop) {
          if (t.animating) return;
          e = parseInt(s(t.clickedSlide).attr("data-swiper-slide-index"), 10), i.centeredSlides ? n < t.loopedSlides - r / 2 || n > t.slides.length - t.loopedSlides + r / 2 ? (t.loopFix(), n = a.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")").eq(0).index(), d.nextTick(function () {
            t.slideTo(n);
          })) : t.slideTo(n) : n > t.slides.length - r ? (t.loopFix(), n = a.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")").eq(0).index(), d.nextTick(function () {
            t.slideTo(n);
          })) : t.slideTo(n);
        } else t.slideTo(n);
      }
    };
    var g = {
      loopCreate: function loopCreate() {
        var t = this,
            i = t.params,
            a = t.$wrapperEl;
        a.children("." + i.slideClass + "." + i.slideDuplicateClass).remove();
        var r = a.children("." + i.slideClass);

        if (i.loopFillGroupWithBlank) {
          var n = i.slidesPerGroup - r.length % i.slidesPerGroup;

          if (n !== i.slidesPerGroup) {
            for (var o = 0; o < n; o += 1) {
              var l = s(e.createElement("div")).addClass(i.slideClass + " " + i.slideBlankClass);
              a.append(l);
            }

            r = a.children("." + i.slideClass);
          }
        }

        "auto" !== i.slidesPerView || i.loopedSlides || (i.loopedSlides = r.length), t.loopedSlides = parseInt(i.loopedSlides || i.slidesPerView, 10), t.loopedSlides += i.loopAdditionalSlides, t.loopedSlides > r.length && (t.loopedSlides = r.length);
        var d = [],
            h = [];
        r.each(function (e, i) {
          var a = s(i);
          e < t.loopedSlides && h.push(i), e < r.length && e >= r.length - t.loopedSlides && d.push(i), a.attr("data-swiper-slide-index", e);
        });

        for (var p = 0; p < h.length; p += 1) {
          a.append(s(h[p].cloneNode(!0)).addClass(i.slideDuplicateClass));
        }

        for (var c = d.length - 1; c >= 0; c -= 1) {
          a.prepend(s(d[c].cloneNode(!0)).addClass(i.slideDuplicateClass));
        }
      },
      loopFix: function loopFix() {
        var e,
            t = this.params,
            i = this.activeIndex,
            s = this.slides,
            a = this.loopedSlides,
            r = this.allowSlidePrev,
            n = this.allowSlideNext,
            o = this.snapGrid,
            l = this.rtlTranslate;
        this.allowSlidePrev = !0, this.allowSlideNext = !0;
        var d = -o[i] - this.getTranslate();
        i < a ? (e = s.length - 3 * a + i, e += a, this.slideTo(e, 0, !1, !0) && 0 !== d && this.setTranslate((l ? -this.translate : this.translate) - d)) : ("auto" === t.slidesPerView && i >= 2 * a || i >= s.length - a) && (e = -s.length + i + a, e += a, this.slideTo(e, 0, !1, !0) && 0 !== d && this.setTranslate((l ? -this.translate : this.translate) - d));
        this.allowSlidePrev = r, this.allowSlideNext = n;
      },
      loopDestroy: function loopDestroy() {
        var e = this.$wrapperEl,
            t = this.params,
            i = this.slides;
        e.children("." + t.slideClass + "." + t.slideDuplicateClass).remove(), i.removeAttr("data-swiper-slide-index");
      }
    };
    var b = {
      setGrabCursor: function setGrabCursor(e) {
        if (!(h.touch || !this.params.simulateTouch || this.params.watchOverflow && this.isLocked)) {
          var t = this.el;
          t.style.cursor = "move", t.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", t.style.cursor = e ? "-moz-grabbin" : "-moz-grab", t.style.cursor = e ? "grabbing" : "grab";
        }
      },
      unsetGrabCursor: function unsetGrabCursor() {
        h.touch || this.params.watchOverflow && this.isLocked || (this.el.style.cursor = "");
      }
    };

    var w = {
      appendSlide: function appendSlide(e) {
        var t = this.$wrapperEl,
            i = this.params;
        if (i.loop && this.loopDestroy(), "object" == _typeof(e) && "length" in e) for (var s = 0; s < e.length; s += 1) {
          e[s] && t.append(e[s]);
        } else t.append(e);
        i.loop && this.loopCreate(), i.observer && h.observer || this.update();
      },
      prependSlide: function prependSlide(e) {
        var t = this.params,
            i = this.$wrapperEl,
            s = this.activeIndex;
        t.loop && this.loopDestroy();
        var a = s + 1;

        if ("object" == _typeof(e) && "length" in e) {
          for (var r = 0; r < e.length; r += 1) {
            e[r] && i.prepend(e[r]);
          }

          a = s + e.length;
        } else i.prepend(e);

        t.loop && this.loopCreate(), t.observer && h.observer || this.update(), this.slideTo(a, 0, !1);
      },
      addSlide: function addSlide(e, t) {
        var i = this.$wrapperEl,
            s = this.params,
            a = this.activeIndex;
        s.loop && (a -= this.loopedSlides, this.loopDestroy(), this.slides = i.children("." + s.slideClass));
        var r = this.slides.length;
        if (e <= 0) this.prependSlide(t);else if (e >= r) this.appendSlide(t);else {
          for (var n = a > e ? a + 1 : a, o = [], l = r - 1; l >= e; l -= 1) {
            var d = this.slides.eq(l);
            d.remove(), o.unshift(d);
          }

          if ("object" == _typeof(t) && "length" in t) {
            for (var p = 0; p < t.length; p += 1) {
              t[p] && i.append(t[p]);
            }

            n = a > e ? a + t.length : a;
          } else i.append(t);

          for (var c = 0; c < o.length; c += 1) {
            i.append(o[c]);
          }

          s.loop && this.loopCreate(), s.observer && h.observer || this.update(), s.loop ? this.slideTo(n + this.loopedSlides, 0, !1) : this.slideTo(n, 0, !1);
        }
      },
      removeSlide: function removeSlide(e) {
        var t = this.params,
            i = this.$wrapperEl,
            s = this.activeIndex;
        t.loop && (s -= this.loopedSlides, this.loopDestroy(), this.slides = i.children("." + t.slideClass));
        var a,
            r = s;

        if ("object" == _typeof(e) && "length" in e) {
          for (var n = 0; n < e.length; n += 1) {
            a = e[n], this.slides[a] && this.slides.eq(a).remove(), a < r && (r -= 1);
          }

          r = Math.max(r, 0);
        } else a = e, this.slides[a] && this.slides.eq(a).remove(), a < r && (r -= 1), r = Math.max(r, 0);

        t.loop && this.loopCreate(), t.observer && h.observer || this.update(), t.loop ? this.slideTo(r + this.loopedSlides, 0, !1) : this.slideTo(r, 0, !1);
      },
      removeAllSlides: function removeAllSlides() {
        for (var e = [], t = 0; t < this.slides.length; t += 1) {
          e.push(t);
        }

        this.removeSlide(e);
      }
    },
        y = function () {
      var i = t.navigator.userAgent,
          s = {
        ios: !1,
        android: !1,
        androidChrome: !1,
        desktop: !1,
        windows: !1,
        iphone: !1,
        ipod: !1,
        ipad: !1,
        cordova: t.cordova || t.phonegap,
        phonegap: t.cordova || t.phonegap
      },
          a = i.match(/(Windows Phone);?[\s\/]+([\d.]+)?/),
          r = i.match(/(Android);?[\s\/]+([\d.]+)?/),
          n = i.match(/(iPad).*OS\s([\d_]+)/),
          o = i.match(/(iPod)(.*OS\s([\d_]+))?/),
          l = !n && i.match(/(iPhone\sOS|iOS)\s([\d_]+)/);

      if (a && (s.os = "windows", s.osVersion = a[2], s.windows = !0), r && !a && (s.os = "android", s.osVersion = r[2], s.android = !0, s.androidChrome = i.toLowerCase().indexOf("chrome") >= 0), (n || l || o) && (s.os = "ios", s.ios = !0), l && !o && (s.osVersion = l[2].replace(/_/g, "."), s.iphone = !0), n && (s.osVersion = n[2].replace(/_/g, "."), s.ipad = !0), o && (s.osVersion = o[3] ? o[3].replace(/_/g, ".") : null, s.iphone = !0), s.ios && s.osVersion && i.indexOf("Version/") >= 0 && "10" === s.osVersion.split(".")[0] && (s.osVersion = i.toLowerCase().split("version/")[1].split(" ")[0]), s.desktop = !(s.os || s.android || s.webView), s.webView = (l || n || o) && i.match(/.*AppleWebKit(?!.*Safari)/i), s.os && "ios" === s.os) {
        var d = s.osVersion.split("."),
            h = e.querySelector('meta[name="viewport"]');
        s.minimalUi = !s.webView && (o || l) && (1 * d[0] == 7 ? 1 * d[1] >= 1 : 1 * d[0] > 7) && h && h.getAttribute("content").indexOf("minimal-ui") >= 0;
      }

      return s.pixelRatio = t.devicePixelRatio || 1, s;
    }();

    function x() {
      var e = this.params,
          t = this.el;

      if (!t || 0 !== t.offsetWidth) {
        e.breakpoints && this.setBreakpoint();
        var i = this.allowSlideNext,
            s = this.allowSlidePrev,
            a = this.snapGrid;

        if (this.allowSlideNext = !0, this.allowSlidePrev = !0, this.updateSize(), this.updateSlides(), e.freeMode) {
          var r = Math.min(Math.max(this.translate, this.maxTranslate()), this.minTranslate());
          this.setTranslate(r), this.updateActiveIndex(), this.updateSlidesClasses(), e.autoHeight && this.updateAutoHeight();
        } else this.updateSlidesClasses(), ("auto" === e.slidesPerView || e.slidesPerView > 1) && this.isEnd && !this.params.centeredSlides ? this.slideTo(this.slides.length - 1, 0, !1, !0) : this.slideTo(this.activeIndex, 0, !1, !0);

        this.allowSlidePrev = s, this.allowSlideNext = i, this.params.watchOverflow && a !== this.snapGrid && this.checkOverflow();
      }
    }

    var E = {
      attachEvents: function attachEvents() {
        var i = this.params,
            a = this.touchEvents,
            r = this.el,
            n = this.wrapperEl;
        this.onTouchStart = function (i) {
          var a = this.touchEventsData,
              r = this.params,
              n = this.touches;

          if (!this.animating || !r.preventIntercationOnTransition) {
            var o = i;
            if (o.originalEvent && (o = o.originalEvent), a.isTouchEvent = "touchstart" === o.type, (a.isTouchEvent || !("which" in o) || 3 !== o.which) && (!a.isTouched || !a.isMoved)) if (r.noSwiping && s(o.target).closest(r.noSwipingSelector ? r.noSwipingSelector : "." + r.noSwipingClass)[0]) this.allowClick = !0;else if (!r.swipeHandler || s(o).closest(r.swipeHandler)[0]) {
              n.currentX = "touchstart" === o.type ? o.targetTouches[0].pageX : o.pageX, n.currentY = "touchstart" === o.type ? o.targetTouches[0].pageY : o.pageY;
              var l = n.currentX,
                  h = n.currentY;

              if (!y.ios || y.cordova || !r.iOSEdgeSwipeDetection || !(l <= r.iOSEdgeSwipeThreshold || l >= t.screen.width - r.iOSEdgeSwipeThreshold)) {
                if (d.extend(a, {
                  isTouched: !0,
                  isMoved: !1,
                  allowTouchCallbacks: !0,
                  isScrolling: void 0,
                  startMoving: void 0
                }), n.startX = l, n.startY = h, a.touchStartTime = d.now(), this.allowClick = !0, this.updateSize(), this.swipeDirection = void 0, r.threshold > 0 && (a.allowThresholdMove = !1), "touchstart" !== o.type) {
                  var p = !0;
                  s(o.target).is(a.formElements) && (p = !1), e.activeElement && s(e.activeElement).is(a.formElements) && e.activeElement !== o.target && e.activeElement.blur(), p && this.allowTouchMove && o.preventDefault();
                }

                this.emit("touchStart", o);
              }
            }
          }
        }.bind(this), this.onTouchMove = function (t) {
          var i = this.touchEventsData,
              a = this.params,
              r = this.touches,
              n = this.rtlTranslate,
              o = t;

          if (o.originalEvent && (o = o.originalEvent), i.isTouched) {
            if (!i.isTouchEvent || "mousemove" !== o.type) {
              var l = "touchmove" === o.type ? o.targetTouches[0].pageX : o.pageX,
                  h = "touchmove" === o.type ? o.targetTouches[0].pageY : o.pageY;
              if (o.preventedByNestedSwiper) return r.startX = l, void (r.startY = h);
              if (!this.allowTouchMove) return this.allowClick = !1, void (i.isTouched && (d.extend(r, {
                startX: l,
                startY: h,
                currentX: l,
                currentY: h
              }), i.touchStartTime = d.now()));
              if (i.isTouchEvent && a.touchReleaseOnEdges && !a.loop) if (this.isVertical()) {
                if (h < r.startY && this.translate <= this.maxTranslate() || h > r.startY && this.translate >= this.minTranslate()) return i.isTouched = !1, void (i.isMoved = !1);
              } else if (l < r.startX && this.translate <= this.maxTranslate() || l > r.startX && this.translate >= this.minTranslate()) return;
              if (i.isTouchEvent && e.activeElement && o.target === e.activeElement && s(o.target).is(i.formElements)) return i.isMoved = !0, void (this.allowClick = !1);

              if (i.allowTouchCallbacks && this.emit("touchMove", o), !(o.targetTouches && o.targetTouches.length > 1)) {
                r.currentX = l, r.currentY = h;
                var p,
                    c = r.currentX - r.startX,
                    u = r.currentY - r.startY;
                if (void 0 === i.isScrolling && (this.isHorizontal() && r.currentY === r.startY || this.isVertical() && r.currentX === r.startX ? i.isScrolling = !1 : c * c + u * u >= 25 && (p = 180 * Math.atan2(Math.abs(u), Math.abs(c)) / Math.PI, i.isScrolling = this.isHorizontal() ? p > a.touchAngle : 90 - p > a.touchAngle)), i.isScrolling && this.emit("touchMoveOpposite", o), "undefined" == typeof startMoving && (r.currentX === r.startX && r.currentY === r.startY || (i.startMoving = !0)), i.isScrolling) i.isTouched = !1;else if (i.startMoving) {
                  this.allowClick = !1, o.preventDefault(), a.touchMoveStopPropagation && !a.nested && o.stopPropagation(), i.isMoved || (a.loop && this.loopFix(), i.startTranslate = this.getTranslate(), this.setTransition(0), this.animating && this.$wrapperEl.trigger("webkitTransitionEnd transitionend"), i.allowMomentumBounce = !1, !a.grabCursor || !0 !== this.allowSlideNext && !0 !== this.allowSlidePrev || this.setGrabCursor(!0), this.emit("sliderFirstMove", o)), this.emit("sliderMove", o), i.isMoved = !0;
                  var v = this.isHorizontal() ? c : u;
                  r.diff = v, v *= a.touchRatio, n && (v = -v), this.swipeDirection = v > 0 ? "prev" : "next", i.currentTranslate = v + i.startTranslate;
                  var f = !0,
                      m = a.resistanceRatio;

                  if (a.touchReleaseOnEdges && (m = 0), v > 0 && i.currentTranslate > this.minTranslate() ? (f = !1, a.resistance && (i.currentTranslate = this.minTranslate() - 1 + Math.pow(-this.minTranslate() + i.startTranslate + v, m))) : v < 0 && i.currentTranslate < this.maxTranslate() && (f = !1, a.resistance && (i.currentTranslate = this.maxTranslate() + 1 - Math.pow(this.maxTranslate() - i.startTranslate - v, m))), f && (o.preventedByNestedSwiper = !0), !this.allowSlideNext && "next" === this.swipeDirection && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate), !this.allowSlidePrev && "prev" === this.swipeDirection && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate), a.threshold > 0) {
                    if (!(Math.abs(v) > a.threshold || i.allowThresholdMove)) return void (i.currentTranslate = i.startTranslate);
                    if (!i.allowThresholdMove) return i.allowThresholdMove = !0, r.startX = r.currentX, r.startY = r.currentY, i.currentTranslate = i.startTranslate, void (r.diff = this.isHorizontal() ? r.currentX - r.startX : r.currentY - r.startY);
                  }

                  a.followFinger && ((a.freeMode || a.watchSlidesProgress || a.watchSlidesVisibility) && (this.updateActiveIndex(), this.updateSlidesClasses()), a.freeMode && (0 === i.velocities.length && i.velocities.push({
                    position: r[this.isHorizontal() ? "startX" : "startY"],
                    time: i.touchStartTime
                  }), i.velocities.push({
                    position: r[this.isHorizontal() ? "currentX" : "currentY"],
                    time: d.now()
                  })), this.updateProgress(i.currentTranslate), this.setTranslate(i.currentTranslate));
                }
              }
            }
          } else i.startMoving && i.isScrolling && this.emit("touchMoveOpposite", o);
        }.bind(this), this.onTouchEnd = function (e) {
          var t = this,
              i = t.touchEventsData,
              s = t.params,
              a = t.touches,
              r = t.rtlTranslate,
              n = t.$wrapperEl,
              o = t.slidesGrid,
              l = t.snapGrid,
              h = e;
          if (h.originalEvent && (h = h.originalEvent), i.allowTouchCallbacks && t.emit("touchEnd", h), i.allowTouchCallbacks = !1, !i.isTouched) return i.isMoved && s.grabCursor && t.setGrabCursor(!1), i.isMoved = !1, void (i.startMoving = !1);
          s.grabCursor && i.isMoved && i.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
          var p,
              c = d.now(),
              u = c - i.touchStartTime;
          if (t.allowClick && (t.updateClickedSlide(h), t.emit("tap", h), u < 300 && c - i.lastClickTime > 300 && (i.clickTimeout && clearTimeout(i.clickTimeout), i.clickTimeout = d.nextTick(function () {
            t && !t.destroyed && t.emit("click", h);
          }, 300)), u < 300 && c - i.lastClickTime < 300 && (i.clickTimeout && clearTimeout(i.clickTimeout), t.emit("doubleTap", h))), i.lastClickTime = d.now(), d.nextTick(function () {
            t.destroyed || (t.allowClick = !0);
          }), !i.isTouched || !i.isMoved || !t.swipeDirection || 0 === a.diff || i.currentTranslate === i.startTranslate) return i.isTouched = !1, i.isMoved = !1, void (i.startMoving = !1);

          if (i.isTouched = !1, i.isMoved = !1, i.startMoving = !1, p = s.followFinger ? r ? t.translate : -t.translate : -i.currentTranslate, s.freeMode) {
            if (p < -t.minTranslate()) return void t.slideTo(t.activeIndex);
            if (p > -t.maxTranslate()) return void (t.slides.length < l.length ? t.slideTo(l.length - 1) : t.slideTo(t.slides.length - 1));

            if (s.freeModeMomentum) {
              if (i.velocities.length > 1) {
                var v = i.velocities.pop(),
                    f = i.velocities.pop(),
                    m = v.position - f.position,
                    g = v.time - f.time;
                t.velocity = m / g, t.velocity /= 2, Math.abs(t.velocity) < s.freeModeMinimumVelocity && (t.velocity = 0), (g > 150 || d.now() - v.time > 300) && (t.velocity = 0);
              } else t.velocity = 0;

              t.velocity *= s.freeModeMomentumVelocityRatio, i.velocities.length = 0;
              var b = 1e3 * s.freeModeMomentumRatio,
                  w = t.velocity * b,
                  y = t.translate + w;
              r && (y = -y);
              var x,
                  E,
                  T = !1,
                  S = 20 * Math.abs(t.velocity) * s.freeModeMomentumBounceRatio;
              if (y < t.maxTranslate()) s.freeModeMomentumBounce ? (y + t.maxTranslate() < -S && (y = t.maxTranslate() - S), x = t.maxTranslate(), T = !0, i.allowMomentumBounce = !0) : y = t.maxTranslate(), s.loop && s.centeredSlides && (E = !0);else if (y > t.minTranslate()) s.freeModeMomentumBounce ? (y - t.minTranslate() > S && (y = t.minTranslate() + S), x = t.minTranslate(), T = !0, i.allowMomentumBounce = !0) : y = t.minTranslate(), s.loop && s.centeredSlides && (E = !0);else if (s.freeModeSticky) {
                for (var C, M = 0; M < l.length; M += 1) {
                  if (l[M] > -y) {
                    C = M;
                    break;
                  }
                }

                y = -(y = Math.abs(l[C] - y) < Math.abs(l[C - 1] - y) || "next" === t.swipeDirection ? l[C] : l[C - 1]);
              }
              if (E && t.once("transitionEnd", function () {
                t.loopFix();
              }), 0 !== t.velocity) b = r ? Math.abs((-y - t.translate) / t.velocity) : Math.abs((y - t.translate) / t.velocity);else if (s.freeModeSticky) return void t.slideToClosest();
              s.freeModeMomentumBounce && T ? (t.updateProgress(x), t.setTransition(b), t.setTranslate(y), t.transitionStart(!0, t.swipeDirection), t.animating = !0, n.transitionEnd(function () {
                t && !t.destroyed && i.allowMomentumBounce && (t.emit("momentumBounce"), t.setTransition(s.speed), t.setTranslate(x), n.transitionEnd(function () {
                  t && !t.destroyed && t.transitionEnd();
                }));
              })) : t.velocity ? (t.updateProgress(y), t.setTransition(b), t.setTranslate(y), t.transitionStart(!0, t.swipeDirection), t.animating || (t.animating = !0, n.transitionEnd(function () {
                t && !t.destroyed && t.transitionEnd();
              }))) : t.updateProgress(y), t.updateActiveIndex(), t.updateSlidesClasses();
            } else if (s.freeModeSticky) return void t.slideToClosest();

            (!s.freeModeMomentum || u >= s.longSwipesMs) && (t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses());
          } else {
            for (var z = 0, k = t.slidesSizesGrid[0], P = 0; P < o.length; P += s.slidesPerGroup) {
              void 0 !== o[P + s.slidesPerGroup] ? p >= o[P] && p < o[P + s.slidesPerGroup] && (z = P, k = o[P + s.slidesPerGroup] - o[P]) : p >= o[P] && (z = P, k = o[o.length - 1] - o[o.length - 2]);
            }

            var $ = (p - o[z]) / k;

            if (u > s.longSwipesMs) {
              if (!s.longSwipes) return void t.slideTo(t.activeIndex);
              "next" === t.swipeDirection && ($ >= s.longSwipesRatio ? t.slideTo(z + s.slidesPerGroup) : t.slideTo(z)), "prev" === t.swipeDirection && ($ > 1 - s.longSwipesRatio ? t.slideTo(z + s.slidesPerGroup) : t.slideTo(z));
            } else {
              if (!s.shortSwipes) return void t.slideTo(t.activeIndex);
              "next" === t.swipeDirection && t.slideTo(z + s.slidesPerGroup), "prev" === t.swipeDirection && t.slideTo(z);
            }
          }
        }.bind(this), this.onClick = function (e) {
          this.allowClick || (this.params.preventClicks && e.preventDefault(), this.params.preventClicksPropagation && this.animating && (e.stopPropagation(), e.stopImmediatePropagation()));
        }.bind(this);
        var o = "container" === i.touchEventsTarget ? r : n,
            l = !!i.nested;

        if (h.touch || !h.pointerEvents && !h.prefixedPointerEvents) {
          if (h.touch) {
            var p = !("touchstart" !== a.start || !h.passiveListener || !i.passiveListeners) && {
              passive: !0,
              capture: !1
            };
            o.addEventListener(a.start, this.onTouchStart, p), o.addEventListener(a.move, this.onTouchMove, h.passiveListener ? {
              passive: !1,
              capture: l
            } : l), o.addEventListener(a.end, this.onTouchEnd, p);
          }

          (i.simulateTouch && !y.ios && !y.android || i.simulateTouch && !h.touch && y.ios) && (o.addEventListener("mousedown", this.onTouchStart, !1), e.addEventListener("mousemove", this.onTouchMove, l), e.addEventListener("mouseup", this.onTouchEnd, !1));
        } else o.addEventListener(a.start, this.onTouchStart, !1), e.addEventListener(a.move, this.onTouchMove, l), e.addEventListener(a.end, this.onTouchEnd, !1);

        (i.preventClicks || i.preventClicksPropagation) && o.addEventListener("click", this.onClick, !0), this.on(y.ios || y.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", x, !0);
      },
      detachEvents: function detachEvents() {
        var t = this.params,
            i = this.touchEvents,
            s = this.el,
            a = this.wrapperEl,
            r = "container" === t.touchEventsTarget ? s : a,
            n = !!t.nested;

        if (h.touch || !h.pointerEvents && !h.prefixedPointerEvents) {
          if (h.touch) {
            var o = !("onTouchStart" !== i.start || !h.passiveListener || !t.passiveListeners) && {
              passive: !0,
              capture: !1
            };
            r.removeEventListener(i.start, this.onTouchStart, o), r.removeEventListener(i.move, this.onTouchMove, n), r.removeEventListener(i.end, this.onTouchEnd, o);
          }

          (t.simulateTouch && !y.ios && !y.android || t.simulateTouch && !h.touch && y.ios) && (r.removeEventListener("mousedown", this.onTouchStart, !1), e.removeEventListener("mousemove", this.onTouchMove, n), e.removeEventListener("mouseup", this.onTouchEnd, !1));
        } else r.removeEventListener(i.start, this.onTouchStart, !1), e.removeEventListener(i.move, this.onTouchMove, n), e.removeEventListener(i.end, this.onTouchEnd, !1);

        (t.preventClicks || t.preventClicksPropagation) && r.removeEventListener("click", this.onClick, !0), this.off(y.ios || y.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", x);
      }
    };

    var T = {
      setBreakpoint: function setBreakpoint() {
        var e = this.activeIndex,
            t = this.initialized,
            i = this.loopedSlides;
        void 0 === i && (i = 0);
        var s = this.params,
            a = s.breakpoints;

        if (a && (!a || 0 !== Object.keys(a).length)) {
          var r = this.getBreakpoint(a);

          if (r && this.currentBreakpoint !== r) {
            var n = r in a ? a[r] : this.originalParams,
                o = s.loop && n.slidesPerView !== s.slidesPerView;
            d.extend(this.params, n), d.extend(this, {
              allowTouchMove: this.params.allowTouchMove,
              allowSlideNext: this.params.allowSlideNext,
              allowSlidePrev: this.params.allowSlidePrev
            }), this.currentBreakpoint = r, o && t && (this.loopDestroy(), this.loopCreate(), this.updateSlides(), this.slideTo(e - i + this.loopedSlides, 0, !1)), this.emit("breakpoint", n);
          }
        }
      },
      getBreakpoint: function getBreakpoint(e) {
        if (e) {
          var i = !1,
              s = [];
          Object.keys(e).forEach(function (e) {
            s.push(e);
          }), s.sort(function (e, t) {
            return parseInt(e, 10) - parseInt(t, 10);
          });

          for (var a = 0; a < s.length; a += 1) {
            var r = s[a];
            r >= t.innerWidth && !i && (i = r);
          }

          return i || "max";
        }
      }
    },
        S = function () {
      return {
        isIE: !!t.navigator.userAgent.match(/Trident/g) || !!t.navigator.userAgent.match(/MSIE/g),
        isSafari: (e = t.navigator.userAgent.toLowerCase(), e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(t.navigator.userAgent)
      };
      var e;
    }();

    var C = {
      init: !0,
      direction: "horizontal",
      touchEventsTarget: "container",
      initialSlide: 0,
      speed: 300,
      preventIntercationOnTransition: !1,
      iOSEdgeSwipeDetection: !1,
      iOSEdgeSwipeThreshold: 20,
      freeMode: !1,
      freeModeMomentum: !0,
      freeModeMomentumRatio: 1,
      freeModeMomentumBounce: !0,
      freeModeMomentumBounceRatio: 1,
      freeModeMomentumVelocityRatio: 1,
      freeModeSticky: !1,
      freeModeMinimumVelocity: .02,
      autoHeight: !1,
      setWrapperSize: !1,
      virtualTranslate: !1,
      effect: "slide",
      breakpoints: void 0,
      spaceBetween: 0,
      slidesPerView: 1,
      slidesPerColumn: 1,
      slidesPerColumnFill: "column",
      slidesPerGroup: 1,
      centeredSlides: !1,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      normalizeSlideIndex: !0,
      watchOverflow: !1,
      roundLengths: !1,
      touchRatio: 1,
      touchAngle: 45,
      simulateTouch: !0,
      shortSwipes: !0,
      longSwipes: !0,
      longSwipesRatio: .5,
      longSwipesMs: 300,
      followFinger: !0,
      allowTouchMove: !0,
      threshold: 0,
      touchMoveStopPropagation: !0,
      touchReleaseOnEdges: !1,
      uniqueNavElements: !0,
      resistance: !0,
      resistanceRatio: .85,
      watchSlidesProgress: !1,
      watchSlidesVisibility: !1,
      grabCursor: !1,
      preventClicks: !0,
      preventClicksPropagation: !0,
      slideToClickedSlide: !1,
      preloadImages: !0,
      updateOnImagesReady: !0,
      loop: !1,
      loopAdditionalSlides: 0,
      loopedSlides: null,
      loopFillGroupWithBlank: !1,
      allowSlidePrev: !0,
      allowSlideNext: !0,
      swipeHandler: null,
      noSwiping: !0,
      noSwipingClass: "swiper-no-swiping",
      noSwipingSelector: null,
      passiveListeners: !0,
      containerModifierClass: "swiper-container-",
      slideClass: "swiper-slide",
      slideBlankClass: "swiper-slide-invisible-blank",
      slideActiveClass: "swiper-slide-active",
      slideDuplicateActiveClass: "swiper-slide-duplicate-active",
      slideVisibleClass: "swiper-slide-visible",
      slideDuplicateClass: "swiper-slide-duplicate",
      slideNextClass: "swiper-slide-next",
      slideDuplicateNextClass: "swiper-slide-duplicate-next",
      slidePrevClass: "swiper-slide-prev",
      slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
      wrapperClass: "swiper-wrapper",
      runCallbacksOnInit: !0
    },
        M = {
      update: u,
      translate: v,
      transition: f,
      slide: m,
      loop: g,
      grabCursor: b,
      manipulation: w,
      events: E,
      breakpoints: T,
      checkOverflow: {
        checkOverflow: function checkOverflow() {
          var e = this.isLocked;
          this.isLocked = 1 === this.snapGrid.length, this.allowSlideNext = !this.isLocked, this.allowSlidePrev = !this.isLocked, e !== this.isLocked && this.emit(this.isLocked ? "lock" : "unlock"), e && e !== this.isLocked && (this.isEnd = !1, this.navigation.update());
        }
      },
      classes: {
        addClasses: function addClasses() {
          var e = this.classNames,
              t = this.params,
              i = this.rtl,
              s = this.$el,
              a = [];
          a.push(t.direction), t.freeMode && a.push("free-mode"), h.flexbox || a.push("no-flexbox"), t.autoHeight && a.push("autoheight"), i && a.push("rtl"), t.slidesPerColumn > 1 && a.push("multirow"), y.android && a.push("android"), y.ios && a.push("ios"), S.isIE && (h.pointerEvents || h.prefixedPointerEvents) && a.push("wp8-" + t.direction), a.forEach(function (i) {
            e.push(t.containerModifierClass + i);
          }), s.addClass(e.join(" "));
        },
        removeClasses: function removeClasses() {
          var e = this.$el,
              t = this.classNames;
          e.removeClass(t.join(" "));
        }
      },
      images: {
        loadImage: function loadImage(e, i, s, a, r, n) {
          var o;

          function l() {
            n && n();
          }

          e.complete && r ? l() : i ? ((o = new t.Image()).onload = l, o.onerror = l, a && (o.sizes = a), s && (o.srcset = s), i && (o.src = i)) : l();
        },
        preloadImages: function preloadImages() {
          var e = this;

          function t() {
            void 0 !== e && null !== e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1), e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(), e.emit("imagesReady")));
          }

          e.imagesToLoad = e.$el.find("img");

          for (var i = 0; i < e.imagesToLoad.length; i += 1) {
            var s = e.imagesToLoad[i];
            e.loadImage(s, s.currentSrc || s.getAttribute("src"), s.srcset || s.getAttribute("srcset"), s.sizes || s.getAttribute("sizes"), !0, t);
          }
        }
      }
    },
        z = {},
        k = function (e) {
      function t() {
        for (var i, a, r, n = [], o = arguments.length; o--;) {
          n[o] = arguments[o];
        }

        1 === n.length && n[0].constructor && n[0].constructor === Object ? r = n[0] : (a = (i = n)[0], r = i[1]), r || (r = {}), r = d.extend({}, r), a && !r.el && (r.el = a), e.call(this, r), Object.keys(M).forEach(function (e) {
          Object.keys(M[e]).forEach(function (i) {
            t.prototype[i] || (t.prototype[i] = M[e][i]);
          });
        });
        var l = this;
        void 0 === l.modules && (l.modules = {}), Object.keys(l.modules).forEach(function (e) {
          var t = l.modules[e];

          if (t.params) {
            var i = Object.keys(t.params)[0],
                s = t.params[i];
            if ("object" != _typeof(s)) return;
            if (!(i in r && "enabled" in s)) return;
            !0 === r[i] && (r[i] = {
              enabled: !0
            }), "object" != _typeof(r[i]) || "enabled" in r[i] || (r[i].enabled = !0), r[i] || (r[i] = {
              enabled: !1
            });
          }
        });
        var p = d.extend({}, C);
        l.useModulesParams(p), l.params = d.extend({}, p, z, r), l.originalParams = d.extend({}, l.params), l.passedParams = d.extend({}, r), l.$ = s;
        var c = s(l.params.el);

        if (a = c[0]) {
          if (c.length > 1) {
            var u = [];
            return c.each(function (e, i) {
              var s = d.extend({}, r, {
                el: i
              });
              u.push(new t(s));
            }), u;
          }

          a.swiper = l, c.data("swiper", l);
          var v,
              f,
              m = c.children("." + l.params.wrapperClass);
          return d.extend(l, {
            $el: c,
            el: a,
            $wrapperEl: m,
            wrapperEl: m[0],
            classNames: [],
            slides: s(),
            slidesGrid: [],
            snapGrid: [],
            slidesSizesGrid: [],
            isHorizontal: function isHorizontal() {
              return "horizontal" === l.params.direction;
            },
            isVertical: function isVertical() {
              return "vertical" === l.params.direction;
            },
            rtl: "rtl" === a.dir.toLowerCase() || "rtl" === c.css("direction"),
            rtlTranslate: "horizontal" === l.params.direction && ("rtl" === a.dir.toLowerCase() || "rtl" === c.css("direction")),
            wrongRTL: "-webkit-box" === m.css("display"),
            activeIndex: 0,
            realIndex: 0,
            isBeginning: !0,
            isEnd: !1,
            translate: 0,
            previousTranslate: 0,
            progress: 0,
            velocity: 0,
            animating: !1,
            allowSlideNext: l.params.allowSlideNext,
            allowSlidePrev: l.params.allowSlidePrev,
            touchEvents: (v = ["touchstart", "touchmove", "touchend"], f = ["mousedown", "mousemove", "mouseup"], h.pointerEvents ? f = ["pointerdown", "pointermove", "pointerup"] : h.prefixedPointerEvents && (f = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]), l.touchEventsTouch = {
              start: v[0],
              move: v[1],
              end: v[2]
            }, l.touchEventsDesktop = {
              start: f[0],
              move: f[1],
              end: f[2]
            }, h.touch || !l.params.simulateTouch ? l.touchEventsTouch : l.touchEventsDesktop),
            touchEventsData: {
              isTouched: void 0,
              isMoved: void 0,
              allowTouchCallbacks: void 0,
              touchStartTime: void 0,
              isScrolling: void 0,
              currentTranslate: void 0,
              startTranslate: void 0,
              allowThresholdMove: void 0,
              formElements: "input, select, option, textarea, button, video",
              lastClickTime: d.now(),
              clickTimeout: void 0,
              velocities: [],
              allowMomentumBounce: void 0,
              isTouchEvent: void 0,
              startMoving: void 0
            },
            allowClick: !0,
            allowTouchMove: l.params.allowTouchMove,
            touches: {
              startX: 0,
              startY: 0,
              currentX: 0,
              currentY: 0,
              diff: 0
            },
            imagesToLoad: [],
            imagesLoaded: 0
          }), l.useModules(), l.params.init && l.init(), l;
        }
      }

      e && (t.__proto__ = e), t.prototype = Object.create(e && e.prototype), t.prototype.constructor = t;
      var i = {
        extendedDefaults: {
          configurable: !0
        },
        defaults: {
          configurable: !0
        },
        Class: {
          configurable: !0
        },
        $: {
          configurable: !0
        }
      };
      return t.prototype.slidesPerViewDynamic = function () {
        var e = this.params,
            t = this.slides,
            i = this.slidesGrid,
            s = this.size,
            a = this.activeIndex,
            r = 1;

        if (e.centeredSlides) {
          for (var n, o = t[a].swiperSlideSize, l = a + 1; l < t.length; l += 1) {
            t[l] && !n && (r += 1, (o += t[l].swiperSlideSize) > s && (n = !0));
          }

          for (var d = a - 1; d >= 0; d -= 1) {
            t[d] && !n && (r += 1, (o += t[d].swiperSlideSize) > s && (n = !0));
          }
        } else for (var h = a + 1; h < t.length; h += 1) {
          i[h] - i[a] < s && (r += 1);
        }

        return r;
      }, t.prototype.update = function () {
        var e = this;

        if (e && !e.destroyed) {
          var t = e.snapGrid,
              i = e.params;
          i.breakpoints && e.setBreakpoint(), e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses(), e.params.freeMode ? (s(), e.params.autoHeight && e.updateAutoHeight()) : (("auto" === e.params.slidesPerView || e.params.slidesPerView > 1) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0)) || s(), i.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit("update");
        }

        function s() {
          var t = e.rtlTranslate ? -1 * e.translate : e.translate,
              i = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
          e.setTranslate(i), e.updateActiveIndex(), e.updateSlidesClasses();
        }
      }, t.prototype.init = function () {
        this.initialized || (this.emit("beforeInit"), this.params.breakpoints && this.setBreakpoint(), this.addClasses(), this.params.loop && this.loopCreate(), this.updateSize(), this.updateSlides(), this.params.watchOverflow && this.checkOverflow(), this.params.grabCursor && this.setGrabCursor(), this.params.preloadImages && this.preloadImages(), this.params.loop ? this.slideTo(this.params.initialSlide + this.loopedSlides, 0, this.params.runCallbacksOnInit) : this.slideTo(this.params.initialSlide, 0, this.params.runCallbacksOnInit), this.attachEvents(), this.initialized = !0, this.emit("init"));
      }, t.prototype.destroy = function (e, t) {
        void 0 === e && (e = !0), void 0 === t && (t = !0);
        var i = this,
            s = i.params,
            a = i.$el,
            r = i.$wrapperEl,
            n = i.slides;
        return void 0 === i.params || i.destroyed ? null : (i.emit("beforeDestroy"), i.initialized = !1, i.detachEvents(), s.loop && i.loopDestroy(), t && (i.removeClasses(), a.removeAttr("style"), r.removeAttr("style"), n && n.length && n.removeClass([s.slideVisibleClass, s.slideActiveClass, s.slideNextClass, s.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index").removeAttr("data-swiper-column").removeAttr("data-swiper-row")), i.emit("destroy"), Object.keys(i.eventsListeners).forEach(function (e) {
          i.off(e);
        }), !1 !== e && (i.$el[0].swiper = null, i.$el.data("swiper", null), d.deleteProps(i)), i.destroyed = !0, null);
      }, t.extendDefaults = function (e) {
        d.extend(z, e);
      }, i.extendedDefaults.get = function () {
        return z;
      }, i.defaults.get = function () {
        return C;
      }, i.Class.get = function () {
        return e;
      }, i.$.get = function () {
        return s;
      }, Object.defineProperties(t, i), t;
    }(p),
        P = {
      name: "device",
      proto: {
        device: y
      },
      "static": {
        device: y
      }
    },
        $ = {
      name: "support",
      proto: {
        support: h
      },
      "static": {
        support: h
      }
    },
        L = {
      name: "browser",
      proto: {
        browser: S
      },
      "static": {
        browser: S
      }
    },
        I = {
      name: "resize",
      create: function create() {
        var e = this;
        d.extend(e, {
          resize: {
            resizeHandler: function resizeHandler() {
              e && !e.destroyed && e.initialized && (e.emit("beforeResize"), e.emit("resize"));
            },
            orientationChangeHandler: function orientationChangeHandler() {
              e && !e.destroyed && e.initialized && e.emit("orientationchange");
            }
          }
        });
      },
      on: {
        init: function init() {
          t.addEventListener("resize", this.resize.resizeHandler), t.addEventListener("orientationchange", this.resize.orientationChangeHandler);
        },
        destroy: function destroy() {
          t.removeEventListener("resize", this.resize.resizeHandler), t.removeEventListener("orientationchange", this.resize.orientationChangeHandler);
        }
      }
    },
        D = {
      func: t.MutationObserver || t.WebkitMutationObserver,
      attach: function attach(e, t) {
        void 0 === t && (t = {});
        var i = this,
            s = new (0, D.func)(function (e) {
          e.forEach(function (e) {
            i.emit("observerUpdate", e);
          });
        });
        s.observe(e, {
          attributes: void 0 === t.attributes || t.attributes,
          childList: void 0 === t.childList || t.childList,
          characterData: void 0 === t.characterData || t.characterData
        }), i.observer.observers.push(s);
      },
      init: function init() {
        if (h.observer && this.params.observer) {
          if (this.params.observeParents) for (var e = this.$el.parents(), t = 0; t < e.length; t += 1) {
            this.observer.attach(e[t]);
          }
          this.observer.attach(this.$el[0], {
            childList: !1
          }), this.observer.attach(this.$wrapperEl[0], {
            attributes: !1
          });
        }
      },
      destroy: function destroy() {
        this.observer.observers.forEach(function (e) {
          e.disconnect();
        }), this.observer.observers = [];
      }
    },
        O = {
      name: "observer",
      params: {
        observer: !1,
        observeParents: !1
      },
      create: function create() {
        d.extend(this, {
          observer: {
            init: D.init.bind(this),
            attach: D.attach.bind(this),
            destroy: D.destroy.bind(this),
            observers: []
          }
        });
      },
      on: {
        init: function init() {
          this.observer.init();
        },
        destroy: function destroy() {
          this.observer.destroy();
        }
      }
    },
        A = {
      update: function update(e) {
        var t = this,
            i = t.params,
            s = i.slidesPerView,
            a = i.slidesPerGroup,
            r = i.centeredSlides,
            n = t.virtual,
            o = n.from,
            l = n.to,
            h = n.slides,
            p = n.slidesGrid,
            c = n.renderSlide,
            u = n.offset;
        t.updateActiveIndex();
        var v,
            f,
            m,
            g = t.activeIndex || 0;
        v = t.rtlTranslate ? "right" : t.isHorizontal() ? "left" : "top", r ? (f = Math.floor(s / 2) + a, m = Math.floor(s / 2) + a) : (f = s + (a - 1), m = a);
        var b = Math.max((g || 0) - m, 0),
            w = Math.min((g || 0) + f, h.length - 1),
            y = (t.slidesGrid[b] || 0) - (t.slidesGrid[0] || 0);

        function x() {
          t.updateSlides(), t.updateProgress(), t.updateSlidesClasses(), t.lazy && t.params.lazy.enabled && t.lazy.load();
        }

        if (d.extend(t.virtual, {
          from: b,
          to: w,
          offset: y,
          slidesGrid: t.slidesGrid
        }), o === b && l === w && !e) return t.slidesGrid !== p && y !== u && t.slides.css(v, y + "px"), void t.updateProgress();
        if (t.params.virtual.renderExternal) return t.params.virtual.renderExternal.call(t, {
          offset: y,
          from: b,
          to: w,
          slides: function () {
            for (var e = [], t = b; t <= w; t += 1) {
              e.push(h[t]);
            }

            return e;
          }()
        }), void x();
        var E = [],
            T = [];
        if (e) t.$wrapperEl.find("." + t.params.slideClass).remove();else for (var S = o; S <= l; S += 1) {
          (S < b || S > w) && t.$wrapperEl.find("." + t.params.slideClass + '[data-swiper-slide-index="' + S + '"]').remove();
        }

        for (var C = 0; C < h.length; C += 1) {
          C >= b && C <= w && (void 0 === l || e ? T.push(C) : (C > l && T.push(C), C < o && E.push(C)));
        }

        T.forEach(function (e) {
          t.$wrapperEl.append(c(h[e], e));
        }), E.sort(function (e, t) {
          return e < t;
        }).forEach(function (e) {
          t.$wrapperEl.prepend(c(h[e], e));
        }), t.$wrapperEl.children(".swiper-slide").css(v, y + "px"), x();
      },
      renderSlide: function renderSlide(e, t) {
        var i = this.params.virtual;
        if (i.cache && this.virtual.cache[t]) return this.virtual.cache[t];
        var a = i.renderSlide ? s(i.renderSlide.call(this, e, t)) : s('<div class="' + this.params.slideClass + '" data-swiper-slide-index="' + t + '">' + e + "</div>");
        return a.attr("data-swiper-slide-index") || a.attr("data-swiper-slide-index", t), i.cache && (this.virtual.cache[t] = a), a;
      },
      appendSlide: function appendSlide(e) {
        this.virtual.slides.push(e), this.virtual.update(!0);
      },
      prependSlide: function prependSlide(e) {
        if (this.virtual.slides.unshift(e), this.params.virtual.cache) {
          var t = this.virtual.cache,
              i = {};
          Object.keys(t).forEach(function (e) {
            i[e + 1] = t[e];
          }), this.virtual.cache = i;
        }

        this.virtual.update(!0), this.slideNext(0);
      }
    },
        G = {
      name: "virtual",
      params: {
        virtual: {
          enabled: !1,
          slides: [],
          cache: !0,
          renderSlide: null,
          renderExternal: null
        }
      },
      create: function create() {
        d.extend(this, {
          virtual: {
            update: A.update.bind(this),
            appendSlide: A.appendSlide.bind(this),
            prependSlide: A.prependSlide.bind(this),
            renderSlide: A.renderSlide.bind(this),
            slides: this.params.virtual.slides,
            cache: {}
          }
        });
      },
      on: {
        beforeInit: function beforeInit() {
          if (this.params.virtual.enabled) {
            this.classNames.push(this.params.containerModifierClass + "virtual");
            var e = {
              watchSlidesProgress: !0
            };
            d.extend(this.params, e), d.extend(this.originalParams, e), this.virtual.update();
          }
        },
        setTranslate: function setTranslate() {
          this.params.virtual.enabled && this.virtual.update();
        }
      }
    },
        H = {
      handle: function handle(i) {
        var s = this.rtlTranslate,
            a = i;
        a.originalEvent && (a = a.originalEvent);
        var r = a.keyCode || a.charCode;
        if (!this.allowSlideNext && (this.isHorizontal() && 39 === r || this.isVertical() && 40 === r)) return !1;
        if (!this.allowSlidePrev && (this.isHorizontal() && 37 === r || this.isVertical() && 38 === r)) return !1;

        if (!(a.shiftKey || a.altKey || a.ctrlKey || a.metaKey || e.activeElement && e.activeElement.nodeName && ("input" === e.activeElement.nodeName.toLowerCase() || "textarea" === e.activeElement.nodeName.toLowerCase()))) {
          if (this.params.keyboard.onlyInViewport && (37 === r || 39 === r || 38 === r || 40 === r)) {
            var n = !1;
            if (this.$el.parents("." + this.params.slideClass).length > 0 && 0 === this.$el.parents("." + this.params.slideActiveClass).length) return;
            var o = t.innerWidth,
                l = t.innerHeight,
                d = this.$el.offset();
            s && (d.left -= this.$el[0].scrollLeft);

            for (var h = [[d.left, d.top], [d.left + this.width, d.top], [d.left, d.top + this.height], [d.left + this.width, d.top + this.height]], p = 0; p < h.length; p += 1) {
              var c = h[p];
              c[0] >= 0 && c[0] <= o && c[1] >= 0 && c[1] <= l && (n = !0);
            }

            if (!n) return;
          }

          this.isHorizontal() ? (37 !== r && 39 !== r || (a.preventDefault ? a.preventDefault() : a.returnValue = !1), (39 === r && !s || 37 === r && s) && this.slideNext(), (37 === r && !s || 39 === r && s) && this.slidePrev()) : (38 !== r && 40 !== r || (a.preventDefault ? a.preventDefault() : a.returnValue = !1), 40 === r && this.slideNext(), 38 === r && this.slidePrev()), this.emit("keyPress", r);
        }
      },
      enable: function enable() {
        this.keyboard.enabled || (s(e).on("keydown", this.keyboard.handle), this.keyboard.enabled = !0);
      },
      disable: function disable() {
        this.keyboard.enabled && (s(e).off("keydown", this.keyboard.handle), this.keyboard.enabled = !1);
      }
    },
        N = {
      name: "keyboard",
      params: {
        keyboard: {
          enabled: !1,
          onlyInViewport: !0
        }
      },
      create: function create() {
        d.extend(this, {
          keyboard: {
            enabled: !1,
            enable: H.enable.bind(this),
            disable: H.disable.bind(this),
            handle: H.handle.bind(this)
          }
        });
      },
      on: {
        init: function init() {
          this.params.keyboard.enabled && this.keyboard.enable();
        },
        destroy: function destroy() {
          this.keyboard.enabled && this.keyboard.disable();
        }
      }
    };

    var B = {
      lastScrollTime: d.now(),
      event: t.navigator.userAgent.indexOf("firefox") > -1 ? "DOMMouseScroll" : function () {
        var t = ("onwheel" in e);

        if (!t) {
          var i = e.createElement("div");
          i.setAttribute("onwheel", "return;"), t = "function" == typeof i.onwheel;
        }

        return !t && e.implementation && e.implementation.hasFeature && !0 !== e.implementation.hasFeature("", "") && (t = e.implementation.hasFeature("Events.wheel", "3.0")), t;
      }() ? "wheel" : "mousewheel",
      normalize: function normalize(e) {
        var t = 0,
            i = 0,
            s = 0,
            a = 0;
        return "detail" in e && (i = e.detail), "wheelDelta" in e && (i = -e.wheelDelta / 120), "wheelDeltaY" in e && (i = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = i, i = 0), s = 10 * t, a = 10 * i, "deltaY" in e && (a = e.deltaY), "deltaX" in e && (s = e.deltaX), (s || a) && e.deltaMode && (1 === e.deltaMode ? (s *= 40, a *= 40) : (s *= 800, a *= 800)), s && !t && (t = s < 1 ? -1 : 1), a && !i && (i = a < 1 ? -1 : 1), {
          spinX: t,
          spinY: i,
          pixelX: s,
          pixelY: a
        };
      },
      handleMouseEnter: function handleMouseEnter() {
        this.mouseEntered = !0;
      },
      handleMouseLeave: function handleMouseLeave() {
        this.mouseEntered = !1;
      },
      handle: function handle(e) {
        var i = e,
            s = this,
            a = s.params.mousewheel;
        if (!s.mouseEntered && !a.releaseOnEdges) return !0;
        i.originalEvent && (i = i.originalEvent);
        var r = 0,
            n = s.rtlTranslate ? -1 : 1,
            o = B.normalize(i);
        if (a.forceToAxis) {
          if (s.isHorizontal()) {
            if (!(Math.abs(o.pixelX) > Math.abs(o.pixelY))) return !0;
            r = o.pixelX * n;
          } else {
            if (!(Math.abs(o.pixelY) > Math.abs(o.pixelX))) return !0;
            r = o.pixelY;
          }
        } else r = Math.abs(o.pixelX) > Math.abs(o.pixelY) ? -o.pixelX * n : -o.pixelY;
        if (0 === r) return !0;

        if (a.invert && (r = -r), s.params.freeMode) {
          s.params.loop && s.loopFix();
          var l = s.getTranslate() + r * a.sensitivity,
              h = s.isBeginning,
              p = s.isEnd;
          if (l >= s.minTranslate() && (l = s.minTranslate()), l <= s.maxTranslate() && (l = s.maxTranslate()), s.setTransition(0), s.setTranslate(l), s.updateProgress(), s.updateActiveIndex(), s.updateSlidesClasses(), (!h && s.isBeginning || !p && s.isEnd) && s.updateSlidesClasses(), s.params.freeModeSticky && (clearTimeout(s.mousewheel.timeout), s.mousewheel.timeout = d.nextTick(function () {
            s.slideToClosest();
          }, 300)), s.emit("scroll", i), s.params.autoplay && s.params.autoplayDisableOnInteraction && s.autoplay.stop(), l === s.minTranslate() || l === s.maxTranslate()) return !0;
        } else {
          if (d.now() - s.mousewheel.lastScrollTime > 60) if (r < 0) {
            if (s.isEnd && !s.params.loop || s.animating) {
              if (a.releaseOnEdges) return !0;
            } else s.slideNext(), s.emit("scroll", i);
          } else if (s.isBeginning && !s.params.loop || s.animating) {
            if (a.releaseOnEdges) return !0;
          } else s.slidePrev(), s.emit("scroll", i);
          s.mousewheel.lastScrollTime = new t.Date().getTime();
        }

        return i.preventDefault ? i.preventDefault() : i.returnValue = !1, !1;
      },
      enable: function enable() {
        if (!B.event) return !1;
        if (this.mousewheel.enabled) return !1;
        var e = this.$el;
        return "container" !== this.params.mousewheel.eventsTarged && (e = s(this.params.mousewheel.eventsTarged)), e.on("mouseenter", this.mousewheel.handleMouseEnter), e.on("mouseleave", this.mousewheel.handleMouseLeave), e.on(B.event, this.mousewheel.handle), this.mousewheel.enabled = !0, !0;
      },
      disable: function disable() {
        if (!B.event) return !1;
        if (!this.mousewheel.enabled) return !1;
        var e = this.$el;
        return "container" !== this.params.mousewheel.eventsTarged && (e = s(this.params.mousewheel.eventsTarged)), e.off(B.event, this.mousewheel.handle), this.mousewheel.enabled = !1, !0;
      }
    },
        X = {
      update: function update() {
        var e = this.params.navigation;

        if (!this.params.loop) {
          var t = this.navigation,
              i = t.$nextEl,
              s = t.$prevEl;
          s && s.length > 0 && (this.isBeginning ? s.addClass(e.disabledClass) : s.removeClass(e.disabledClass), s[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](e.lockClass)), i && i.length > 0 && (this.isEnd ? i.addClass(e.disabledClass) : i.removeClass(e.disabledClass), i[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](e.lockClass));
        }
      },
      init: function init() {
        var e,
            t,
            i = this,
            a = i.params.navigation;
        (a.nextEl || a.prevEl) && (a.nextEl && (e = s(a.nextEl), i.params.uniqueNavElements && "string" == typeof a.nextEl && e.length > 1 && 1 === i.$el.find(a.nextEl).length && (e = i.$el.find(a.nextEl))), a.prevEl && (t = s(a.prevEl), i.params.uniqueNavElements && "string" == typeof a.prevEl && t.length > 1 && 1 === i.$el.find(a.prevEl).length && (t = i.$el.find(a.prevEl))), e && e.length > 0 && e.on("click", function (e) {
          e.preventDefault(), i.isEnd && !i.params.loop || i.slideNext();
        }), t && t.length > 0 && t.on("click", function (e) {
          e.preventDefault(), i.isBeginning && !i.params.loop || i.slidePrev();
        }), d.extend(i.navigation, {
          $nextEl: e,
          nextEl: e && e[0],
          $prevEl: t,
          prevEl: t && t[0]
        }));
      },
      destroy: function destroy() {
        var e = this.navigation,
            t = e.$nextEl,
            i = e.$prevEl;
        t && t.length && (t.off("click"), t.removeClass(this.params.navigation.disabledClass)), i && i.length && (i.off("click"), i.removeClass(this.params.navigation.disabledClass));
      }
    },
        Y = {
      update: function update() {
        var e = this.rtl,
            t = this.params.pagination;

        if (t.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
          var i,
              a = this.virtual && this.params.virtual.enabled ? this.virtual.slides.length : this.slides.length,
              r = this.pagination.$el,
              n = this.params.loop ? Math.ceil((a - 2 * this.loopedSlides) / this.params.slidesPerGroup) : this.snapGrid.length;

          if (this.params.loop ? ((i = Math.ceil((this.activeIndex - this.loopedSlides) / this.params.slidesPerGroup)) > a - 1 - 2 * this.loopedSlides && (i -= a - 2 * this.loopedSlides), i > n - 1 && (i -= n), i < 0 && "bullets" !== this.params.paginationType && (i = n + i)) : i = void 0 !== this.snapIndex ? this.snapIndex : this.activeIndex || 0, "bullets" === t.type && this.pagination.bullets && this.pagination.bullets.length > 0) {
            var o,
                l,
                d,
                h = this.pagination.bullets;
            if (t.dynamicBullets && (this.pagination.bulletSize = h.eq(0)[this.isHorizontal() ? "outerWidth" : "outerHeight"](!0), r.css(this.isHorizontal() ? "width" : "height", this.pagination.bulletSize * (t.dynamicMainBullets + 4) + "px"), t.dynamicMainBullets > 1 && void 0 !== this.previousIndex && (this.pagination.dynamicBulletIndex += i - this.previousIndex, this.pagination.dynamicBulletIndex > t.dynamicMainBullets - 1 ? this.pagination.dynamicBulletIndex = t.dynamicMainBullets - 1 : this.pagination.dynamicBulletIndex < 0 && (this.pagination.dynamicBulletIndex = 0)), o = i - this.pagination.dynamicBulletIndex, d = ((l = o + (Math.min(h.length, t.dynamicMainBullets) - 1)) + o) / 2), h.removeClass(t.bulletActiveClass + " " + t.bulletActiveClass + "-next " + t.bulletActiveClass + "-next-next " + t.bulletActiveClass + "-prev " + t.bulletActiveClass + "-prev-prev " + t.bulletActiveClass + "-main"), r.length > 1) h.each(function (e, a) {
              var r = s(a),
                  n = r.index();
              n === i && r.addClass(t.bulletActiveClass), t.dynamicBullets && (n >= o && n <= l && r.addClass(t.bulletActiveClass + "-main"), n === o && r.prev().addClass(t.bulletActiveClass + "-prev").prev().addClass(t.bulletActiveClass + "-prev-prev"), n === l && r.next().addClass(t.bulletActiveClass + "-next").next().addClass(t.bulletActiveClass + "-next-next"));
            });else if (h.eq(i).addClass(t.bulletActiveClass), t.dynamicBullets) {
              for (var p = h.eq(o), c = h.eq(l), u = o; u <= l; u += 1) {
                h.eq(u).addClass(t.bulletActiveClass + "-main");
              }

              p.prev().addClass(t.bulletActiveClass + "-prev").prev().addClass(t.bulletActiveClass + "-prev-prev"), c.next().addClass(t.bulletActiveClass + "-next").next().addClass(t.bulletActiveClass + "-next-next");
            }

            if (t.dynamicBullets) {
              var v = Math.min(h.length, t.dynamicMainBullets + 4),
                  f = (this.pagination.bulletSize * v - this.pagination.bulletSize) / 2 - d * this.pagination.bulletSize,
                  m = e ? "right" : "left";
              h.css(this.isHorizontal() ? m : "top", f + "px");
            }
          }

          if ("fraction" === t.type && (r.find("." + t.currentClass).text(t.formatFractionCurrent(i + 1)), r.find("." + t.totalClass).text(t.formatFractionTotal(n))), "progressbar" === t.type) {
            var g;
            g = t.progressbarOpposite ? this.isHorizontal() ? "vertical" : "horizontal" : this.isHorizontal() ? "horizontal" : "vertical";
            var b = (i + 1) / n,
                w = 1,
                y = 1;
            "horizontal" === g ? w = b : y = b, r.find("." + t.progressbarFillClass).transform("translate3d(0,0,0) scaleX(" + w + ") scaleY(" + y + ")").transition(this.params.speed);
          }

          "custom" === t.type && t.renderCustom ? (r.html(t.renderCustom(this, i + 1, n)), this.emit("paginationRender", this, r[0])) : this.emit("paginationUpdate", this, r[0]), r[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](t.lockClass);
        }
      },
      render: function render() {
        var e = this.params.pagination;

        if (e.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
          var t = this.virtual && this.params.virtual.enabled ? this.virtual.slides.length : this.slides.length,
              i = this.pagination.$el,
              s = "";

          if ("bullets" === e.type) {
            for (var a = this.params.loop ? Math.ceil((t - 2 * this.loopedSlides) / this.params.slidesPerGroup) : this.snapGrid.length, r = 0; r < a; r += 1) {
              e.renderBullet ? s += e.renderBullet.call(this, r, e.bulletClass) : s += "<" + e.bulletElement + ' class="' + e.bulletClass + '"></' + e.bulletElement + ">";
            }

            i.html(s), this.pagination.bullets = i.find("." + e.bulletClass);
          }

          "fraction" === e.type && (s = e.renderFraction ? e.renderFraction.call(this, e.currentClass, e.totalClass) : '<span class="' + e.currentClass + '"></span> / <span class="' + e.totalClass + '"></span>', i.html(s)), "progressbar" === e.type && (s = e.renderProgressbar ? e.renderProgressbar.call(this, e.progressbarFillClass) : '<span class="' + e.progressbarFillClass + '"></span>', i.html(s)), "custom" !== e.type && this.emit("paginationRender", this.pagination.$el[0]);
        }
      },
      init: function init() {
        var e = this,
            t = e.params.pagination;

        if (t.el) {
          var i = s(t.el);
          0 !== i.length && (e.params.uniqueNavElements && "string" == typeof t.el && i.length > 1 && 1 === e.$el.find(t.el).length && (i = e.$el.find(t.el)), "bullets" === t.type && t.clickable && i.addClass(t.clickableClass), i.addClass(t.modifierClass + t.type), "bullets" === t.type && t.dynamicBullets && (i.addClass("" + t.modifierClass + t.type + "-dynamic"), e.pagination.dynamicBulletIndex = 0, t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)), "progressbar" === t.type && t.progressbarOpposite && i.addClass(t.progressbarOppositeClass), t.clickable && i.on("click", "." + t.bulletClass, function (t) {
            t.preventDefault();
            var i = s(this).index() * e.params.slidesPerGroup;
            e.params.loop && (i += e.loopedSlides), e.slideTo(i);
          }), d.extend(e.pagination, {
            $el: i,
            el: i[0]
          }));
        }
      },
      destroy: function destroy() {
        var e = this.params.pagination;

        if (e.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
          var t = this.pagination.$el;
          t.removeClass(e.hiddenClass), t.removeClass(e.modifierClass + e.type), this.pagination.bullets && this.pagination.bullets.removeClass(e.bulletActiveClass), e.clickable && t.off("click", "." + e.bulletClass);
        }
      }
    },
        V = {
      setTranslate: function setTranslate() {
        if (this.params.scrollbar.el && this.scrollbar.el) {
          var e = this.scrollbar,
              t = this.rtlTranslate,
              i = this.progress,
              s = e.dragSize,
              a = e.trackSize,
              r = e.$dragEl,
              n = e.$el,
              o = this.params.scrollbar,
              l = s,
              d = (a - s) * i;
          t ? (d = -d) > 0 ? (l = s - d, d = 0) : -d + s > a && (l = a + d) : d < 0 ? (l = s + d, d = 0) : d + s > a && (l = a - d), this.isHorizontal() ? (h.transforms3d ? r.transform("translate3d(" + d + "px, 0, 0)") : r.transform("translateX(" + d + "px)"), r[0].style.width = l + "px") : (h.transforms3d ? r.transform("translate3d(0px, " + d + "px, 0)") : r.transform("translateY(" + d + "px)"), r[0].style.height = l + "px"), o.hide && (clearTimeout(this.scrollbar.timeout), n[0].style.opacity = 1, this.scrollbar.timeout = setTimeout(function () {
            n[0].style.opacity = 0, n.transition(400);
          }, 1e3));
        }
      },
      setTransition: function setTransition(e) {
        this.params.scrollbar.el && this.scrollbar.el && this.scrollbar.$dragEl.transition(e);
      },
      updateSize: function updateSize() {
        if (this.params.scrollbar.el && this.scrollbar.el) {
          var e = this.scrollbar,
              t = e.$dragEl,
              i = e.$el;
          t[0].style.width = "", t[0].style.height = "";
          var s,
              a = this.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight,
              r = this.size / this.virtualSize,
              n = r * (a / this.size);
          s = "auto" === this.params.scrollbar.dragSize ? a * r : parseInt(this.params.scrollbar.dragSize, 10), this.isHorizontal() ? t[0].style.width = s + "px" : t[0].style.height = s + "px", i[0].style.display = r >= 1 ? "none" : "", this.params.scrollbarHide && (i[0].style.opacity = 0), d.extend(e, {
            trackSize: a,
            divider: r,
            moveDivider: n,
            dragSize: s
          }), e.$el[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](this.params.scrollbar.lockClass);
        }
      },
      setDragPosition: function setDragPosition(e) {
        var t,
            i = this.scrollbar,
            s = this.rtlTranslate,
            a = i.$el,
            r = i.dragSize,
            n = i.trackSize;
        t = ((this.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY) - a.offset()[this.isHorizontal() ? "left" : "top"] - r / 2) / (n - r), t = Math.max(Math.min(t, 1), 0), s && (t = 1 - t);
        var o = this.minTranslate() + (this.maxTranslate() - this.minTranslate()) * t;
        this.updateProgress(o), this.setTranslate(o), this.updateActiveIndex(), this.updateSlidesClasses();
      },
      onDragStart: function onDragStart(e) {
        var t = this.params.scrollbar,
            i = this.scrollbar,
            s = this.$wrapperEl,
            a = i.$el,
            r = i.$dragEl;
        this.scrollbar.isTouched = !0, e.preventDefault(), e.stopPropagation(), s.transition(100), r.transition(100), i.setDragPosition(e), clearTimeout(this.scrollbar.dragTimeout), a.transition(0), t.hide && a.css("opacity", 1), this.emit("scrollbarDragStart", e);
      },
      onDragMove: function onDragMove(e) {
        var t = this.scrollbar,
            i = this.$wrapperEl,
            s = t.$el,
            a = t.$dragEl;
        this.scrollbar.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, t.setDragPosition(e), i.transition(0), s.transition(0), a.transition(0), this.emit("scrollbarDragMove", e));
      },
      onDragEnd: function onDragEnd(e) {
        var t = this.params.scrollbar,
            i = this.scrollbar.$el;
        this.scrollbar.isTouched && (this.scrollbar.isTouched = !1, t.hide && (clearTimeout(this.scrollbar.dragTimeout), this.scrollbar.dragTimeout = d.nextTick(function () {
          i.css("opacity", 0), i.transition(400);
        }, 1e3)), this.emit("scrollbarDragEnd", e), t.snapOnRelease && this.slideToClosest());
      },
      enableDraggable: function enableDraggable() {
        if (this.params.scrollbar.el) {
          var t = this.scrollbar,
              i = this.touchEvents,
              s = this.touchEventsDesktop,
              a = this.params,
              r = t.$el[0],
              n = !(!h.passiveListener || !a.passiveListener) && {
            passive: !1,
            capture: !1
          },
              o = !(!h.passiveListener || !a.passiveListener) && {
            passive: !0,
            capture: !1
          };
          h.touch || !h.pointerEvents && !h.prefixedPointerEvents ? (h.touch && (r.addEventListener(i.start, this.scrollbar.onDragStart, n), r.addEventListener(i.move, this.scrollbar.onDragMove, n), r.addEventListener(i.end, this.scrollbar.onDragEnd, o)), (a.simulateTouch && !y.ios && !y.android || a.simulateTouch && !h.touch && y.ios) && (r.addEventListener("mousedown", this.scrollbar.onDragStart, n), e.addEventListener("mousemove", this.scrollbar.onDragMove, n), e.addEventListener("mouseup", this.scrollbar.onDragEnd, o))) : (r.addEventListener(s.start, this.scrollbar.onDragStart, n), e.addEventListener(s.move, this.scrollbar.onDragMove, n), e.addEventListener(s.end, this.scrollbar.onDragEnd, o));
        }
      },
      disableDraggable: function disableDraggable() {
        if (this.params.scrollbar.el) {
          var t = this.scrollbar,
              i = this.touchEvents,
              s = this.touchEventsDesktop,
              a = this.params,
              r = t.$el[0],
              n = !(!h.passiveListener || !a.passiveListener) && {
            passive: !1,
            capture: !1
          },
              o = !(!h.passiveListener || !a.passiveListener) && {
            passive: !0,
            capture: !1
          };
          h.touch || !h.pointerEvents && !h.prefixedPointerEvents ? (h.touch && (r.removeEventListener(i.start, this.scrollbar.onDragStart, n), r.removeEventListener(i.move, this.scrollbar.onDragMove, n), r.removeEventListener(i.end, this.scrollbar.onDragEnd, o)), (a.simulateTouch && !y.ios && !y.android || a.simulateTouch && !h.touch && y.ios) && (r.removeEventListener("mousedown", this.scrollbar.onDragStart, n), e.removeEventListener("mousemove", this.scrollbar.onDragMove, n), e.removeEventListener("mouseup", this.scrollbar.onDragEnd, o))) : (r.removeEventListener(s.start, this.scrollbar.onDragStart, n), e.removeEventListener(s.move, this.scrollbar.onDragMove, n), e.removeEventListener(s.end, this.scrollbar.onDragEnd, o));
        }
      },
      init: function init() {
        if (this.params.scrollbar.el) {
          var e = this.scrollbar,
              t = this.$el,
              i = this.params.scrollbar,
              a = s(i.el);
          this.params.uniqueNavElements && "string" == typeof i.el && a.length > 1 && 1 === t.find(i.el).length && (a = t.find(i.el));
          var r = a.find("." + this.params.scrollbar.dragClass);
          0 === r.length && (r = s('<div class="' + this.params.scrollbar.dragClass + '"></div>'), a.append(r)), d.extend(e, {
            $el: a,
            el: a[0],
            $dragEl: r,
            dragEl: r[0]
          }), i.draggable && e.enableDraggable();
        }
      },
      destroy: function destroy() {
        this.scrollbar.disableDraggable();
      }
    },
        R = {
      setTransform: function setTransform(e, t) {
        var i = this.rtl,
            a = s(e),
            r = i ? -1 : 1,
            n = a.attr("data-swiper-parallax") || "0",
            o = a.attr("data-swiper-parallax-x"),
            l = a.attr("data-swiper-parallax-y"),
            d = a.attr("data-swiper-parallax-scale"),
            h = a.attr("data-swiper-parallax-opacity");

        if (o || l ? (o = o || "0", l = l || "0") : this.isHorizontal() ? (o = n, l = "0") : (l = n, o = "0"), o = o.indexOf("%") >= 0 ? parseInt(o, 10) * t * r + "%" : o * t * r + "px", l = l.indexOf("%") >= 0 ? parseInt(l, 10) * t + "%" : l * t + "px", void 0 !== h && null !== h) {
          var p = h - (h - 1) * (1 - Math.abs(t));
          a[0].style.opacity = p;
        }

        if (void 0 === d || null === d) a.transform("translate3d(" + o + ", " + l + ", 0px)");else {
          var c = d - (d - 1) * (1 - Math.abs(t));
          a.transform("translate3d(" + o + ", " + l + ", 0px) scale(" + c + ")");
        }
      },
      setTranslate: function setTranslate() {
        var e = this,
            t = e.$el,
            i = e.slides,
            a = e.progress,
            r = e.snapGrid;
        t.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function (t, i) {
          e.parallax.setTransform(i, a);
        }), i.each(function (t, i) {
          var n = i.progress;
          e.params.slidesPerGroup > 1 && "auto" !== e.params.slidesPerView && (n += Math.ceil(t / 2) - a * (r.length - 1)), n = Math.min(Math.max(n, -1), 1), s(i).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function (t, i) {
            e.parallax.setTransform(i, n);
          });
        });
      },
      setTransition: function setTransition(e) {
        void 0 === e && (e = this.params.speed);
        this.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function (t, i) {
          var a = s(i),
              r = parseInt(a.attr("data-swiper-parallax-duration"), 10) || e;
          0 === e && (r = 0), a.transition(r);
        });
      }
    },
        F = {
      getDistanceBetweenTouches: function getDistanceBetweenTouches(e) {
        if (e.targetTouches.length < 2) return 1;
        var t = e.targetTouches[0].pageX,
            i = e.targetTouches[0].pageY,
            s = e.targetTouches[1].pageX,
            a = e.targetTouches[1].pageY;
        return Math.sqrt(Math.pow(s - t, 2) + Math.pow(a - i, 2));
      },
      onGestureStart: function onGestureStart(e) {
        var t = this.params.zoom,
            i = this.zoom,
            a = i.gesture;

        if (i.fakeGestureTouched = !1, i.fakeGestureMoved = !1, !h.gestures) {
          if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2) return;
          i.fakeGestureTouched = !0, a.scaleStart = F.getDistanceBetweenTouches(e);
        }

        a.$slideEl && a.$slideEl.length || (a.$slideEl = s(e.target).closest(".swiper-slide"), 0 === a.$slideEl.length && (a.$slideEl = this.slides.eq(this.activeIndex)), a.$imageEl = a.$slideEl.find("img, svg, canvas"), a.$imageWrapEl = a.$imageEl.parent("." + t.containerClass), a.maxRatio = a.$imageWrapEl.attr("data-swiper-zoom") || t.maxRatio, 0 !== a.$imageWrapEl.length) ? (a.$imageEl.transition(0), this.zoom.isScaling = !0) : a.$imageEl = void 0;
      },
      onGestureChange: function onGestureChange(e) {
        var t = this.params.zoom,
            i = this.zoom,
            s = i.gesture;

        if (!h.gestures) {
          if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
          i.fakeGestureMoved = !0, s.scaleMove = F.getDistanceBetweenTouches(e);
        }

        s.$imageEl && 0 !== s.$imageEl.length && (h.gestures ? this.zoom.scale = e.scale * i.currentScale : i.scale = s.scaleMove / s.scaleStart * i.currentScale, i.scale > s.maxRatio && (i.scale = s.maxRatio - 1 + Math.pow(i.scale - s.maxRatio + 1, .5)), i.scale < t.minRatio && (i.scale = t.minRatio + 1 - Math.pow(t.minRatio - i.scale + 1, .5)), s.$imageEl.transform("translate3d(0,0,0) scale(" + i.scale + ")"));
      },
      onGestureEnd: function onGestureEnd(e) {
        var t = this.params.zoom,
            i = this.zoom,
            s = i.gesture;

        if (!h.gestures) {
          if (!i.fakeGestureTouched || !i.fakeGestureMoved) return;
          if ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2 && !y.android) return;
          i.fakeGestureTouched = !1, i.fakeGestureMoved = !1;
        }

        s.$imageEl && 0 !== s.$imageEl.length && (i.scale = Math.max(Math.min(i.scale, s.maxRatio), t.minRatio), s.$imageEl.transition(this.params.speed).transform("translate3d(0,0,0) scale(" + i.scale + ")"), i.currentScale = i.scale, i.isScaling = !1, 1 === i.scale && (s.$slideEl = void 0));
      },
      onTouchStart: function onTouchStart(e) {
        var t = this.zoom,
            i = t.gesture,
            s = t.image;
        i.$imageEl && 0 !== i.$imageEl.length && (s.isTouched || (y.android && e.preventDefault(), s.isTouched = !0, s.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX, s.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY));
      },
      onTouchMove: function onTouchMove(e) {
        var t = this.zoom,
            i = t.gesture,
            s = t.image,
            a = t.velocity;

        if (i.$imageEl && 0 !== i.$imageEl.length && (this.allowClick = !1, s.isTouched && i.$slideEl)) {
          s.isMoved || (s.width = i.$imageEl[0].offsetWidth, s.height = i.$imageEl[0].offsetHeight, s.startX = d.getTranslate(i.$imageWrapEl[0], "x") || 0, s.startY = d.getTranslate(i.$imageWrapEl[0], "y") || 0, i.slideWidth = i.$slideEl[0].offsetWidth, i.slideHeight = i.$slideEl[0].offsetHeight, i.$imageWrapEl.transition(0), this.rtl && (s.startX = -s.startX, s.startY = -s.startY));
          var r = s.width * t.scale,
              n = s.height * t.scale;

          if (!(r < i.slideWidth && n < i.slideHeight)) {
            if (s.minX = Math.min(i.slideWidth / 2 - r / 2, 0), s.maxX = -s.minX, s.minY = Math.min(i.slideHeight / 2 - n / 2, 0), s.maxY = -s.minY, s.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, s.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !s.isMoved && !t.isScaling) {
              if (this.isHorizontal() && (Math.floor(s.minX) === Math.floor(s.startX) && s.touchesCurrent.x < s.touchesStart.x || Math.floor(s.maxX) === Math.floor(s.startX) && s.touchesCurrent.x > s.touchesStart.x)) return void (s.isTouched = !1);
              if (!this.isHorizontal() && (Math.floor(s.minY) === Math.floor(s.startY) && s.touchesCurrent.y < s.touchesStart.y || Math.floor(s.maxY) === Math.floor(s.startY) && s.touchesCurrent.y > s.touchesStart.y)) return void (s.isTouched = !1);
            }

            e.preventDefault(), e.stopPropagation(), s.isMoved = !0, s.currentX = s.touchesCurrent.x - s.touchesStart.x + s.startX, s.currentY = s.touchesCurrent.y - s.touchesStart.y + s.startY, s.currentX < s.minX && (s.currentX = s.minX + 1 - Math.pow(s.minX - s.currentX + 1, .8)), s.currentX > s.maxX && (s.currentX = s.maxX - 1 + Math.pow(s.currentX - s.maxX + 1, .8)), s.currentY < s.minY && (s.currentY = s.minY + 1 - Math.pow(s.minY - s.currentY + 1, .8)), s.currentY > s.maxY && (s.currentY = s.maxY - 1 + Math.pow(s.currentY - s.maxY + 1, .8)), a.prevPositionX || (a.prevPositionX = s.touchesCurrent.x), a.prevPositionY || (a.prevPositionY = s.touchesCurrent.y), a.prevTime || (a.prevTime = Date.now()), a.x = (s.touchesCurrent.x - a.prevPositionX) / (Date.now() - a.prevTime) / 2, a.y = (s.touchesCurrent.y - a.prevPositionY) / (Date.now() - a.prevTime) / 2, Math.abs(s.touchesCurrent.x - a.prevPositionX) < 2 && (a.x = 0), Math.abs(s.touchesCurrent.y - a.prevPositionY) < 2 && (a.y = 0), a.prevPositionX = s.touchesCurrent.x, a.prevPositionY = s.touchesCurrent.y, a.prevTime = Date.now(), i.$imageWrapEl.transform("translate3d(" + s.currentX + "px, " + s.currentY + "px,0)");
          }
        }
      },
      onTouchEnd: function onTouchEnd() {
        var e = this.zoom,
            t = e.gesture,
            i = e.image,
            s = e.velocity;

        if (t.$imageEl && 0 !== t.$imageEl.length) {
          if (!i.isTouched || !i.isMoved) return i.isTouched = !1, void (i.isMoved = !1);
          i.isTouched = !1, i.isMoved = !1;
          var a = 300,
              r = 300,
              n = s.x * a,
              o = i.currentX + n,
              l = s.y * r,
              d = i.currentY + l;
          0 !== s.x && (a = Math.abs((o - i.currentX) / s.x)), 0 !== s.y && (r = Math.abs((d - i.currentY) / s.y));
          var h = Math.max(a, r);
          i.currentX = o, i.currentY = d;
          var p = i.width * e.scale,
              c = i.height * e.scale;
          i.minX = Math.min(t.slideWidth / 2 - p / 2, 0), i.maxX = -i.minX, i.minY = Math.min(t.slideHeight / 2 - c / 2, 0), i.maxY = -i.minY, i.currentX = Math.max(Math.min(i.currentX, i.maxX), i.minX), i.currentY = Math.max(Math.min(i.currentY, i.maxY), i.minY), t.$imageWrapEl.transition(h).transform("translate3d(" + i.currentX + "px, " + i.currentY + "px,0)");
        }
      },
      onTransitionEnd: function onTransitionEnd() {
        var e = this.zoom,
            t = e.gesture;
        t.$slideEl && this.previousIndex !== this.activeIndex && (t.$imageEl.transform("translate3d(0,0,0) scale(1)"), t.$imageWrapEl.transform("translate3d(0,0,0)"), t.$slideEl = void 0, t.$imageEl = void 0, t.$imageWrapEl = void 0, e.scale = 1, e.currentScale = 1);
      },
      toggle: function toggle(e) {
        var t = this.zoom;
        t.scale && 1 !== t.scale ? t.out() : t["in"](e);
      },
      "in": function _in(e) {
        var t,
            i,
            a,
            r,
            n,
            o,
            l,
            d,
            h,
            p,
            c,
            u,
            v,
            f,
            m,
            g,
            b = this.zoom,
            w = this.params.zoom,
            y = b.gesture,
            x = b.image;
        (y.$slideEl || (y.$slideEl = this.clickedSlide ? s(this.clickedSlide) : this.slides.eq(this.activeIndex), y.$imageEl = y.$slideEl.find("img, svg, canvas"), y.$imageWrapEl = y.$imageEl.parent("." + w.containerClass)), y.$imageEl && 0 !== y.$imageEl.length) && (y.$slideEl.addClass("" + w.zoomedSlideClass), void 0 === x.touchesStart.x && e ? (t = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX, i = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY) : (t = x.touchesStart.x, i = x.touchesStart.y), b.scale = y.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio, b.currentScale = y.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio, e ? (m = y.$slideEl[0].offsetWidth, g = y.$slideEl[0].offsetHeight, a = y.$slideEl.offset().left + m / 2 - t, r = y.$slideEl.offset().top + g / 2 - i, l = y.$imageEl[0].offsetWidth, d = y.$imageEl[0].offsetHeight, h = l * b.scale, p = d * b.scale, v = -(c = Math.min(m / 2 - h / 2, 0)), f = -(u = Math.min(g / 2 - p / 2, 0)), n = a * b.scale, o = r * b.scale, n < c && (n = c), n > v && (n = v), o < u && (o = u), o > f && (o = f)) : (n = 0, o = 0), y.$imageWrapEl.transition(300).transform("translate3d(" + n + "px, " + o + "px,0)"), y.$imageEl.transition(300).transform("translate3d(0,0,0) scale(" + b.scale + ")"));
      },
      out: function out() {
        var e = this.zoom,
            t = this.params.zoom,
            i = e.gesture;
        i.$slideEl || (i.$slideEl = this.clickedSlide ? s(this.clickedSlide) : this.slides.eq(this.activeIndex), i.$imageEl = i.$slideEl.find("img, svg, canvas"), i.$imageWrapEl = i.$imageEl.parent("." + t.containerClass)), i.$imageEl && 0 !== i.$imageEl.length && (e.scale = 1, e.currentScale = 1, i.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"), i.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"), i.$slideEl.removeClass("" + t.zoomedSlideClass), i.$slideEl = void 0);
      },
      enable: function enable() {
        var e = this.zoom;

        if (!e.enabled) {
          e.enabled = !0;
          var t = !("touchstart" !== this.touchEvents.start || !h.passiveListener || !this.params.passiveListeners) && {
            passive: !0,
            capture: !1
          };
          h.gestures ? (this.$wrapperEl.on("gesturestart", ".swiper-slide", e.onGestureStart, t), this.$wrapperEl.on("gesturechange", ".swiper-slide", e.onGestureChange, t), this.$wrapperEl.on("gestureend", ".swiper-slide", e.onGestureEnd, t)) : "touchstart" === this.touchEvents.start && (this.$wrapperEl.on(this.touchEvents.start, ".swiper-slide", e.onGestureStart, t), this.$wrapperEl.on(this.touchEvents.move, ".swiper-slide", e.onGestureChange, t), this.$wrapperEl.on(this.touchEvents.end, ".swiper-slide", e.onGestureEnd, t)), this.$wrapperEl.on(this.touchEvents.move, "." + this.params.zoom.containerClass, e.onTouchMove);
        }
      },
      disable: function disable() {
        var e = this.zoom;

        if (e.enabled) {
          this.zoom.enabled = !1;
          var t = !("touchstart" !== this.touchEvents.start || !h.passiveListener || !this.params.passiveListeners) && {
            passive: !0,
            capture: !1
          };
          h.gestures ? (this.$wrapperEl.off("gesturestart", ".swiper-slide", e.onGestureStart, t), this.$wrapperEl.off("gesturechange", ".swiper-slide", e.onGestureChange, t), this.$wrapperEl.off("gestureend", ".swiper-slide", e.onGestureEnd, t)) : "touchstart" === this.touchEvents.start && (this.$wrapperEl.off(this.touchEvents.start, ".swiper-slide", e.onGestureStart, t), this.$wrapperEl.off(this.touchEvents.move, ".swiper-slide", e.onGestureChange, t), this.$wrapperEl.off(this.touchEvents.end, ".swiper-slide", e.onGestureEnd, t)), this.$wrapperEl.off(this.touchEvents.move, "." + this.params.zoom.containerClass, e.onTouchMove);
        }
      }
    },
        W = {
      loadInSlide: function loadInSlide(e, t) {
        void 0 === t && (t = !0);
        var i = this,
            a = i.params.lazy;

        if (void 0 !== e && 0 !== i.slides.length) {
          var r = i.virtual && i.params.virtual.enabled ? i.$wrapperEl.children("." + i.params.slideClass + '[data-swiper-slide-index="' + e + '"]') : i.slides.eq(e),
              n = r.find("." + a.elementClass + ":not(." + a.loadedClass + "):not(." + a.loadingClass + ")");
          !r.hasClass(a.elementClass) || r.hasClass(a.loadedClass) || r.hasClass(a.loadingClass) || (n = n.add(r[0])), 0 !== n.length && n.each(function (e, n) {
            var o = s(n);
            o.addClass(a.loadingClass);
            var l = o.attr("data-background"),
                d = o.attr("data-src"),
                h = o.attr("data-srcset"),
                p = o.attr("data-sizes");
            i.loadImage(o[0], d || l, h, p, !1, function () {
              if (void 0 !== i && null !== i && i && (!i || i.params) && !i.destroyed) {
                if (l ? (o.css("background-image", 'url("' + l + '")'), o.removeAttr("data-background")) : (h && (o.attr("srcset", h), o.removeAttr("data-srcset")), p && (o.attr("sizes", p), o.removeAttr("data-sizes")), d && (o.attr("src", d), o.removeAttr("data-src"))), o.addClass(a.loadedClass).removeClass(a.loadingClass), r.find("." + a.preloaderClass).remove(), i.params.loop && t) {
                  var e = r.attr("data-swiper-slide-index");

                  if (r.hasClass(i.params.slideDuplicateClass)) {
                    var s = i.$wrapperEl.children('[data-swiper-slide-index="' + e + '"]:not(.' + i.params.slideDuplicateClass + ")");
                    i.lazy.loadInSlide(s.index(), !1);
                  } else {
                    var n = i.$wrapperEl.children("." + i.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
                    i.lazy.loadInSlide(n.index(), !1);
                  }
                }

                i.emit("lazyImageReady", r[0], o[0]);
              }
            }), i.emit("lazyImageLoad", r[0], o[0]);
          });
        }
      },
      load: function load() {
        var e = this,
            t = e.$wrapperEl,
            i = e.params,
            a = e.slides,
            r = e.activeIndex,
            n = e.virtual && i.virtual.enabled,
            o = i.lazy,
            l = i.slidesPerView;

        function d(e) {
          if (n) {
            if (t.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]').length) return !0;
          } else if (a[e]) return !0;

          return !1;
        }

        function h(e) {
          return n ? s(e).attr("data-swiper-slide-index") : s(e).index();
        }

        if ("auto" === l && (l = 0), e.lazy.initialImageLoaded || (e.lazy.initialImageLoaded = !0), e.params.watchSlidesVisibility) t.children("." + i.slideVisibleClass).each(function (t, i) {
          var a = n ? s(i).attr("data-swiper-slide-index") : s(i).index();
          e.lazy.loadInSlide(a);
        });else if (l > 1) for (var p = r; p < r + l; p += 1) {
          d(p) && e.lazy.loadInSlide(p);
        } else e.lazy.loadInSlide(r);
        if (o.loadPrevNext) if (l > 1 || o.loadPrevNextAmount && o.loadPrevNextAmount > 1) {
          for (var c = o.loadPrevNextAmount, u = l, v = Math.min(r + u + Math.max(c, u), a.length), f = Math.max(r - Math.max(u, c), 0), m = r + l; m < v; m += 1) {
            d(m) && e.lazy.loadInSlide(m);
          }

          for (var g = f; g < r; g += 1) {
            d(g) && e.lazy.loadInSlide(g);
          }
        } else {
          var b = t.children("." + i.slideNextClass);
          b.length > 0 && e.lazy.loadInSlide(h(b));
          var w = t.children("." + i.slidePrevClass);
          w.length > 0 && e.lazy.loadInSlide(h(w));
        }
      }
    },
        q = {
      LinearSpline: function LinearSpline(e, t) {
        var i,
            s,
            a,
            r,
            n,
            o = function o(e, t) {
          for (s = -1, i = e.length; i - s > 1;) {
            e[a = i + s >> 1] <= t ? s = a : i = a;
          }

          return i;
        };

        return this.x = e, this.y = t, this.lastIndex = e.length - 1, this.interpolate = function (e) {
          return e ? (n = o(this.x, e), r = n - 1, (e - this.x[r]) * (this.y[n] - this.y[r]) / (this.x[n] - this.x[r]) + this.y[r]) : 0;
        }, this;
      },
      getInterpolateFunction: function getInterpolateFunction(e) {
        this.controller.spline || (this.controller.spline = this.params.loop ? new q.LinearSpline(this.slidesGrid, e.slidesGrid) : new q.LinearSpline(this.snapGrid, e.snapGrid));
      },
      setTranslate: function setTranslate(e, t) {
        var i,
            s,
            a = this,
            r = a.controller.control;

        function n(e) {
          var t = a.rtlTranslate ? -a.translate : a.translate;
          "slide" === a.params.controller.by && (a.controller.getInterpolateFunction(e), s = -a.controller.spline.interpolate(-t)), s && "container" !== a.params.controller.by || (i = (e.maxTranslate() - e.minTranslate()) / (a.maxTranslate() - a.minTranslate()), s = (t - a.minTranslate()) * i + e.minTranslate()), a.params.controller.inverse && (s = e.maxTranslate() - s), e.updateProgress(s), e.setTranslate(s, a), e.updateActiveIndex(), e.updateSlidesClasses();
        }

        if (Array.isArray(r)) for (var o = 0; o < r.length; o += 1) {
          r[o] !== t && r[o] instanceof k && n(r[o]);
        } else r instanceof k && t !== r && n(r);
      },
      setTransition: function setTransition(e, t) {
        var i,
            s = this,
            a = s.controller.control;

        function r(t) {
          t.setTransition(e, s), 0 !== e && (t.transitionStart(), t.$wrapperEl.transitionEnd(function () {
            a && (t.params.loop && "slide" === s.params.controller.by && t.loopFix(), t.transitionEnd());
          }));
        }

        if (Array.isArray(a)) for (i = 0; i < a.length; i += 1) {
          a[i] !== t && a[i] instanceof k && r(a[i]);
        } else a instanceof k && t !== a && r(a);
      }
    },
        j = {
      makeElFocusable: function makeElFocusable(e) {
        return e.attr("tabIndex", "0"), e;
      },
      addElRole: function addElRole(e, t) {
        return e.attr("role", t), e;
      },
      addElLabel: function addElLabel(e, t) {
        return e.attr("aria-label", t), e;
      },
      disableEl: function disableEl(e) {
        return e.attr("aria-disabled", !0), e;
      },
      enableEl: function enableEl(e) {
        return e.attr("aria-disabled", !1), e;
      },
      onEnterKey: function onEnterKey(e) {
        var t = this.params.a11y;

        if (13 === e.keyCode) {
          var i = s(e.target);
          this.navigation && this.navigation.$nextEl && i.is(this.navigation.$nextEl) && (this.isEnd && !this.params.loop || this.slideNext(), this.isEnd ? this.a11y.notify(t.lastSlideMessage) : this.a11y.notify(t.nextSlideMessage)), this.navigation && this.navigation.$prevEl && i.is(this.navigation.$prevEl) && (this.isBeginning && !this.params.loop || this.slidePrev(), this.isBeginning ? this.a11y.notify(t.firstSlideMessage) : this.a11y.notify(t.prevSlideMessage)), this.pagination && i.is("." + this.params.pagination.bulletClass) && i[0].click();
        }
      },
      notify: function notify(e) {
        var t = this.a11y.liveRegion;
        0 !== t.length && (t.html(""), t.html(e));
      },
      updateNavigation: function updateNavigation() {
        if (!this.params.loop) {
          var e = this.navigation,
              t = e.$nextEl,
              i = e.$prevEl;
          i && i.length > 0 && (this.isBeginning ? this.a11y.disableEl(i) : this.a11y.enableEl(i)), t && t.length > 0 && (this.isEnd ? this.a11y.disableEl(t) : this.a11y.enableEl(t));
        }
      },
      updatePagination: function updatePagination() {
        var e = this,
            t = e.params.a11y;
        e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.bullets.each(function (i, a) {
          var r = s(a);
          e.a11y.makeElFocusable(r), e.a11y.addElRole(r, "button"), e.a11y.addElLabel(r, t.paginationBulletMessage.replace(/{{index}}/, r.index() + 1));
        });
      },
      init: function init() {
        this.$el.append(this.a11y.liveRegion);
        var e,
            t,
            i = this.params.a11y;
        this.navigation && this.navigation.$nextEl && (e = this.navigation.$nextEl), this.navigation && this.navigation.$prevEl && (t = this.navigation.$prevEl), e && (this.a11y.makeElFocusable(e), this.a11y.addElRole(e, "button"), this.a11y.addElLabel(e, i.nextSlideMessage), e.on("keydown", this.a11y.onEnterKey)), t && (this.a11y.makeElFocusable(t), this.a11y.addElRole(t, "button"), this.a11y.addElLabel(t, i.prevSlideMessage), t.on("keydown", this.a11y.onEnterKey)), this.pagination && this.params.pagination.clickable && this.pagination.bullets && this.pagination.bullets.length && this.pagination.$el.on("keydown", "." + this.params.pagination.bulletClass, this.a11y.onEnterKey);
      },
      destroy: function destroy() {
        var e, t;
        this.a11y.liveRegion && this.a11y.liveRegion.length > 0 && this.a11y.liveRegion.remove(), this.navigation && this.navigation.$nextEl && (e = this.navigation.$nextEl), this.navigation && this.navigation.$prevEl && (t = this.navigation.$prevEl), e && e.off("keydown", this.a11y.onEnterKey), t && t.off("keydown", this.a11y.onEnterKey), this.pagination && this.params.pagination.clickable && this.pagination.bullets && this.pagination.bullets.length && this.pagination.$el.off("keydown", "." + this.params.pagination.bulletClass, this.a11y.onEnterKey);
      }
    },
        K = {
      init: function init() {
        if (this.params.history) {
          if (!t.history || !t.history.pushState) return this.params.history.enabled = !1, void (this.params.hashNavigation.enabled = !0);
          var e = this.history;
          e.initialized = !0, e.paths = K.getPathValues(), (e.paths.key || e.paths.value) && (e.scrollToSlide(0, e.paths.value, this.params.runCallbacksOnInit), this.params.history.replaceState || t.addEventListener("popstate", this.history.setHistoryPopState));
        }
      },
      destroy: function destroy() {
        this.params.history.replaceState || t.removeEventListener("popstate", this.history.setHistoryPopState);
      },
      setHistoryPopState: function setHistoryPopState() {
        this.history.paths = K.getPathValues(), this.history.scrollToSlide(this.params.speed, this.history.paths.value, !1);
      },
      getPathValues: function getPathValues() {
        var e = t.location.pathname.slice(1).split("/").filter(function (e) {
          return "" !== e;
        }),
            i = e.length;
        return {
          key: e[i - 2],
          value: e[i - 1]
        };
      },
      setHistory: function setHistory(e, i) {
        if (this.history.initialized && this.params.history.enabled) {
          var s = this.slides.eq(i),
              a = K.slugify(s.attr("data-history"));
          t.location.pathname.includes(e) || (a = e + "/" + a);
          var r = t.history.state;
          r && r.value === a || (this.params.history.replaceState ? t.history.replaceState({
            value: a
          }, null, a) : t.history.pushState({
            value: a
          }, null, a));
        }
      },
      slugify: function slugify(e) {
        return e.toString().toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
      },
      scrollToSlide: function scrollToSlide(e, t, i) {
        if (t) for (var s = 0, a = this.slides.length; s < a; s += 1) {
          var r = this.slides.eq(s);

          if (K.slugify(r.attr("data-history")) === t && !r.hasClass(this.params.slideDuplicateClass)) {
            var n = r.index();
            this.slideTo(n, e, i);
          }
        } else this.slideTo(0, e, i);
      }
    },
        U = {
      onHashCange: function onHashCange() {
        var t = e.location.hash.replace("#", "");
        t !== this.slides.eq(this.activeIndex).attr("data-hash") && this.slideTo(this.$wrapperEl.children("." + this.params.slideClass + '[data-hash="' + t + '"]').index());
      },
      setHash: function setHash() {
        if (this.hashNavigation.initialized && this.params.hashNavigation.enabled) if (this.params.hashNavigation.replaceState && t.history && t.history.replaceState) t.history.replaceState(null, null, "#" + this.slides.eq(this.activeIndex).attr("data-hash") || "");else {
          var i = this.slides.eq(this.activeIndex),
              s = i.attr("data-hash") || i.attr("data-history");
          e.location.hash = s || "";
        }
      },
      init: function init() {
        if (!(!this.params.hashNavigation.enabled || this.params.history && this.params.history.enabled)) {
          this.hashNavigation.initialized = !0;
          var i = e.location.hash.replace("#", "");
          if (i) for (var a = 0, r = this.slides.length; a < r; a += 1) {
            var n = this.slides.eq(a);

            if ((n.attr("data-hash") || n.attr("data-history")) === i && !n.hasClass(this.params.slideDuplicateClass)) {
              var o = n.index();
              this.slideTo(o, 0, this.params.runCallbacksOnInit, !0);
            }
          }
          this.params.hashNavigation.watchState && s(t).on("hashchange", this.hashNavigation.onHashCange);
        }
      },
      destroy: function destroy() {
        this.params.hashNavigation.watchState && s(t).off("hashchange", this.hashNavigation.onHashCange);
      }
    },
        _ = {
      run: function run() {
        var e = this,
            t = e.slides.eq(e.activeIndex),
            i = e.params.autoplay.delay;
        t.attr("data-swiper-autoplay") && (i = t.attr("data-swiper-autoplay") || e.params.autoplay.delay), e.autoplay.timeout = d.nextTick(function () {
          e.params.autoplay.reverseDirection ? e.params.loop ? (e.loopFix(), e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.isBeginning ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(e.slides.length - 1, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.params.loop ? (e.loopFix(), e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(0, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slideNext(e.params.speed, !0, !0), e.emit("autoplay"));
        }, i);
      },
      start: function start() {
        return void 0 === this.autoplay.timeout && !this.autoplay.running && (this.autoplay.running = !0, this.emit("autoplayStart"), this.autoplay.run(), !0);
      },
      stop: function stop() {
        return !!this.autoplay.running && void 0 !== this.autoplay.timeout && (this.autoplay.timeout && (clearTimeout(this.autoplay.timeout), this.autoplay.timeout = void 0), this.autoplay.running = !1, this.emit("autoplayStop"), !0);
      },
      pause: function pause(e) {
        this.autoplay.running && (this.autoplay.paused || (this.autoplay.timeout && clearTimeout(this.autoplay.timeout), this.autoplay.paused = !0, 0 !== e && this.params.autoplay.waitForTransition ? (this.$wrapperEl[0].addEventListener("transitionend", this.autoplay.onTransitionEnd), this.$wrapperEl[0].addEventListener("webkitTransitionEnd", this.autoplay.onTransitionEnd)) : (this.autoplay.paused = !1, this.autoplay.run())));
      }
    },
        Z = {
      setTranslate: function setTranslate() {
        for (var e = this.slides, t = 0; t < e.length; t += 1) {
          var i = this.slides.eq(t),
              s = -i[0].swiperSlideOffset;
          this.params.virtualTranslate || (s -= this.translate);
          var a = 0;
          this.isHorizontal() || (a = s, s = 0);
          var r = this.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(i[0].progress), 0) : 1 + Math.min(Math.max(i[0].progress, -1), 0);
          i.css({
            opacity: r
          }).transform("translate3d(" + s + "px, " + a + "px, 0px)");
        }
      },
      setTransition: function setTransition(e) {
        var t = this,
            i = t.slides,
            s = t.$wrapperEl;

        if (i.transition(e), t.params.virtualTranslate && 0 !== e) {
          var a = !1;
          i.transitionEnd(function () {
            if (!a && t && !t.destroyed) {
              a = !0, t.animating = !1;

              for (var e = ["webkitTransitionEnd", "transitionend"], i = 0; i < e.length; i += 1) {
                s.trigger(e[i]);
              }
            }
          });
        }
      }
    },
        Q = {
      setTranslate: function setTranslate() {
        var e,
            t = this.$el,
            i = this.$wrapperEl,
            a = this.slides,
            r = this.width,
            n = this.height,
            o = this.rtlTranslate,
            l = this.size,
            d = this.params.cubeEffect,
            h = this.isHorizontal(),
            p = this.virtual && this.params.virtual.enabled,
            c = 0;
        d.shadow && (h ? (0 === (e = i.find(".swiper-cube-shadow")).length && (e = s('<div class="swiper-cube-shadow"></div>'), i.append(e)), e.css({
          height: r + "px"
        })) : 0 === (e = t.find(".swiper-cube-shadow")).length && (e = s('<div class="swiper-cube-shadow"></div>'), t.append(e)));

        for (var u = 0; u < a.length; u += 1) {
          var v = a.eq(u),
              f = u;
          p && (f = parseInt(v.attr("data-swiper-slide-index"), 10));
          var m = 90 * f,
              g = Math.floor(m / 360);
          o && (m = -m, g = Math.floor(-m / 360));
          var b = Math.max(Math.min(v[0].progress, 1), -1),
              w = 0,
              y = 0,
              x = 0;
          f % 4 == 0 ? (w = 4 * -g * l, x = 0) : (f - 1) % 4 == 0 ? (w = 0, x = 4 * -g * l) : (f - 2) % 4 == 0 ? (w = l + 4 * g * l, x = l) : (f - 3) % 4 == 0 && (w = -l, x = 3 * l + 4 * l * g), o && (w = -w), h || (y = w, w = 0);
          var E = "rotateX(" + (h ? 0 : -m) + "deg) rotateY(" + (h ? m : 0) + "deg) translate3d(" + w + "px, " + y + "px, " + x + "px)";

          if (b <= 1 && b > -1 && (c = 90 * f + 90 * b, o && (c = 90 * -f - 90 * b)), v.transform(E), d.slideShadows) {
            var T = h ? v.find(".swiper-slide-shadow-left") : v.find(".swiper-slide-shadow-top"),
                C = h ? v.find(".swiper-slide-shadow-right") : v.find(".swiper-slide-shadow-bottom");
            0 === T.length && (T = s('<div class="swiper-slide-shadow-' + (h ? "left" : "top") + '"></div>'), v.append(T)), 0 === C.length && (C = s('<div class="swiper-slide-shadow-' + (h ? "right" : "bottom") + '"></div>'), v.append(C)), T.length && (T[0].style.opacity = Math.max(-b, 0)), C.length && (C[0].style.opacity = Math.max(b, 0));
          }
        }

        if (i.css({
          "-webkit-transform-origin": "50% 50% -" + l / 2 + "px",
          "-moz-transform-origin": "50% 50% -" + l / 2 + "px",
          "-ms-transform-origin": "50% 50% -" + l / 2 + "px",
          "transform-origin": "50% 50% -" + l / 2 + "px"
        }), d.shadow) if (h) e.transform("translate3d(0px, " + (r / 2 + d.shadowOffset) + "px, " + -r / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + d.shadowScale + ")");else {
          var M = Math.abs(c) - 90 * Math.floor(Math.abs(c) / 90),
              z = 1.5 - (Math.sin(2 * M * Math.PI / 360) / 2 + Math.cos(2 * M * Math.PI / 360) / 2),
              k = d.shadowScale,
              P = d.shadowScale / z,
              $ = d.shadowOffset;
          e.transform("scale3d(" + k + ", 1, " + P + ") translate3d(0px, " + (n / 2 + $) + "px, " + -n / 2 / P + "px) rotateX(-90deg)");
        }
        var L = S.isSafari || S.isUiWebView ? -l / 2 : 0;
        i.transform("translate3d(0px,0," + L + "px) rotateX(" + (this.isHorizontal() ? 0 : c) + "deg) rotateY(" + (this.isHorizontal() ? -c : 0) + "deg)");
      },
      setTransition: function setTransition(e) {
        var t = this.$el;
        this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), this.params.cubeEffect.shadow && !this.isHorizontal() && t.find(".swiper-cube-shadow").transition(e);
      }
    },
        J = {
      setTranslate: function setTranslate() {
        for (var e = this.slides, t = this.rtlTranslate, i = 0; i < e.length; i += 1) {
          var a = e.eq(i),
              r = a[0].progress;
          this.params.flipEffect.limitRotation && (r = Math.max(Math.min(a[0].progress, 1), -1));
          var n = -180 * r,
              o = 0,
              l = -a[0].swiperSlideOffset,
              d = 0;

          if (this.isHorizontal() ? t && (n = -n) : (d = l, l = 0, o = -n, n = 0), a[0].style.zIndex = -Math.abs(Math.round(r)) + e.length, this.params.flipEffect.slideShadows) {
            var h = this.isHorizontal() ? a.find(".swiper-slide-shadow-left") : a.find(".swiper-slide-shadow-top"),
                p = this.isHorizontal() ? a.find(".swiper-slide-shadow-right") : a.find(".swiper-slide-shadow-bottom");
            0 === h.length && (h = s('<div class="swiper-slide-shadow-' + (this.isHorizontal() ? "left" : "top") + '"></div>'), a.append(h)), 0 === p.length && (p = s('<div class="swiper-slide-shadow-' + (this.isHorizontal() ? "right" : "bottom") + '"></div>'), a.append(p)), h.length && (h[0].style.opacity = Math.max(-r, 0)), p.length && (p[0].style.opacity = Math.max(r, 0));
          }

          a.transform("translate3d(" + l + "px, " + d + "px, 0px) rotateX(" + o + "deg) rotateY(" + n + "deg)");
        }
      },
      setTransition: function setTransition(e) {
        var t = this,
            i = t.slides,
            s = t.activeIndex,
            a = t.$wrapperEl;

        if (i.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), t.params.virtualTranslate && 0 !== e) {
          var r = !1;
          i.eq(s).transitionEnd(function () {
            if (!r && t && !t.destroyed) {
              r = !0, t.animating = !1;

              for (var e = ["webkitTransitionEnd", "transitionend"], i = 0; i < e.length; i += 1) {
                a.trigger(e[i]);
              }
            }
          });
        }
      }
    },
        ee = {
      setTranslate: function setTranslate() {
        for (var e = this.width, t = this.height, i = this.slides, a = this.$wrapperEl, r = this.slidesSizesGrid, n = this.params.coverflowEffect, o = this.isHorizontal(), l = this.translate, d = o ? e / 2 - l : t / 2 - l, p = o ? n.rotate : -n.rotate, c = n.depth, u = 0, v = i.length; u < v; u += 1) {
          var f = i.eq(u),
              m = r[u],
              g = (d - f[0].swiperSlideOffset - m / 2) / m * n.modifier,
              b = o ? p * g : 0,
              w = o ? 0 : p * g,
              y = -c * Math.abs(g),
              x = o ? 0 : n.stretch * g,
              E = o ? n.stretch * g : 0;
          Math.abs(E) < .001 && (E = 0), Math.abs(x) < .001 && (x = 0), Math.abs(y) < .001 && (y = 0), Math.abs(b) < .001 && (b = 0), Math.abs(w) < .001 && (w = 0);
          var T = "translate3d(" + E + "px," + x + "px," + y + "px)  rotateX(" + w + "deg) rotateY(" + b + "deg)";

          if (f.transform(T), f[0].style.zIndex = 1 - Math.abs(Math.round(g)), n.slideShadows) {
            var S = o ? f.find(".swiper-slide-shadow-left") : f.find(".swiper-slide-shadow-top"),
                C = o ? f.find(".swiper-slide-shadow-right") : f.find(".swiper-slide-shadow-bottom");
            0 === S.length && (S = s('<div class="swiper-slide-shadow-' + (o ? "left" : "top") + '"></div>'), f.append(S)), 0 === C.length && (C = s('<div class="swiper-slide-shadow-' + (o ? "right" : "bottom") + '"></div>'), f.append(C)), S.length && (S[0].style.opacity = g > 0 ? g : 0), C.length && (C[0].style.opacity = -g > 0 ? -g : 0);
          }
        }

        (h.pointerEvents || h.prefixedPointerEvents) && (a[0].style.perspectiveOrigin = d + "px 50%");
      },
      setTransition: function setTransition(e) {
        this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e);
      }
    },
        te = [P, $, L, I, O, G, N, {
      name: "mousewheel",
      params: {
        mousewheel: {
          enabled: !1,
          releaseOnEdges: !1,
          invert: !1,
          forceToAxis: !1,
          sensitivity: 1,
          eventsTarged: "container"
        }
      },
      create: function create() {
        d.extend(this, {
          mousewheel: {
            enabled: !1,
            enable: B.enable.bind(this),
            disable: B.disable.bind(this),
            handle: B.handle.bind(this),
            handleMouseEnter: B.handleMouseEnter.bind(this),
            handleMouseLeave: B.handleMouseLeave.bind(this),
            lastScrollTime: d.now()
          }
        });
      },
      on: {
        init: function init() {
          this.params.mousewheel.enabled && this.mousewheel.enable();
        },
        destroy: function destroy() {
          this.mousewheel.enabled && this.mousewheel.disable();
        }
      }
    }, {
      name: "navigation",
      params: {
        navigation: {
          nextEl: null,
          prevEl: null,
          hideOnClick: !1,
          disabledClass: "swiper-button-disabled",
          hiddenClass: "swiper-button-hidden",
          lockClass: "swiper-button-lock"
        }
      },
      create: function create() {
        d.extend(this, {
          navigation: {
            init: X.init.bind(this),
            update: X.update.bind(this),
            destroy: X.destroy.bind(this)
          }
        });
      },
      on: {
        init: function init() {
          this.navigation.init(), this.navigation.update();
        },
        toEdge: function toEdge() {
          this.navigation.update();
        },
        fromEdge: function fromEdge() {
          this.navigation.update();
        },
        destroy: function destroy() {
          this.navigation.destroy();
        },
        click: function click(e) {
          var t = this.navigation,
              i = t.$nextEl,
              a = t.$prevEl;
          !this.params.navigation.hideOnClick || s(e.target).is(a) || s(e.target).is(i) || (i && i.toggleClass(this.params.navigation.hiddenClass), a && a.toggleClass(this.params.navigation.hiddenClass));
        }
      }
    }, {
      name: "pagination",
      params: {
        pagination: {
          el: null,
          bulletElement: "span",
          clickable: !1,
          hideOnClick: !1,
          renderBullet: null,
          renderProgressbar: null,
          renderFraction: null,
          renderCustom: null,
          progressbarOpposite: !1,
          type: "bullets",
          dynamicBullets: !1,
          dynamicMainBullets: 1,
          formatFractionCurrent: function formatFractionCurrent(e) {
            return e;
          },
          formatFractionTotal: function formatFractionTotal(e) {
            return e;
          },
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
          modifierClass: "swiper-pagination-",
          currentClass: "swiper-pagination-current",
          totalClass: "swiper-pagination-total",
          hiddenClass: "swiper-pagination-hidden",
          progressbarFillClass: "swiper-pagination-progressbar-fill",
          progressbarOppositeClass: "swiper-pagination-progressbar-opposite",
          clickableClass: "swiper-pagination-clickable",
          lockClass: "swiper-pagination-lock"
        }
      },
      create: function create() {
        d.extend(this, {
          pagination: {
            init: Y.init.bind(this),
            render: Y.render.bind(this),
            update: Y.update.bind(this),
            destroy: Y.destroy.bind(this),
            dynamicBulletIndex: 0
          }
        });
      },
      on: {
        init: function init() {
          this.pagination.init(), this.pagination.render(), this.pagination.update();
        },
        activeIndexChange: function activeIndexChange() {
          this.params.loop ? this.pagination.update() : void 0 === this.snapIndex && this.pagination.update();
        },
        snapIndexChange: function snapIndexChange() {
          this.params.loop || this.pagination.update();
        },
        slidesLengthChange: function slidesLengthChange() {
          this.params.loop && (this.pagination.render(), this.pagination.update());
        },
        snapGridLengthChange: function snapGridLengthChange() {
          this.params.loop || (this.pagination.render(), this.pagination.update());
        },
        destroy: function destroy() {
          this.pagination.destroy();
        },
        click: function click(e) {
          this.params.pagination.el && this.params.pagination.hideOnClick && this.pagination.$el.length > 0 && !s(e.target).hasClass(this.params.pagination.bulletClass) && this.pagination.$el.toggleClass(this.params.pagination.hiddenClass);
        }
      }
    }, {
      name: "scrollbar",
      params: {
        scrollbar: {
          el: null,
          dragSize: "auto",
          hide: !1,
          draggable: !1,
          snapOnRelease: !0,
          lockClass: "swiper-scrollbar-lock",
          dragClass: "swiper-scrollbar-drag"
        }
      },
      create: function create() {
        d.extend(this, {
          scrollbar: {
            init: V.init.bind(this),
            destroy: V.destroy.bind(this),
            updateSize: V.updateSize.bind(this),
            setTranslate: V.setTranslate.bind(this),
            setTransition: V.setTransition.bind(this),
            enableDraggable: V.enableDraggable.bind(this),
            disableDraggable: V.disableDraggable.bind(this),
            setDragPosition: V.setDragPosition.bind(this),
            onDragStart: V.onDragStart.bind(this),
            onDragMove: V.onDragMove.bind(this),
            onDragEnd: V.onDragEnd.bind(this),
            isTouched: !1,
            timeout: null,
            dragTimeout: null
          }
        });
      },
      on: {
        init: function init() {
          this.scrollbar.init(), this.scrollbar.updateSize(), this.scrollbar.setTranslate();
        },
        update: function update() {
          this.scrollbar.updateSize();
        },
        resize: function resize() {
          this.scrollbar.updateSize();
        },
        observerUpdate: function observerUpdate() {
          this.scrollbar.updateSize();
        },
        setTranslate: function setTranslate() {
          this.scrollbar.setTranslate();
        },
        setTransition: function setTransition(e) {
          this.scrollbar.setTransition(e);
        },
        destroy: function destroy() {
          this.scrollbar.destroy();
        }
      }
    }, {
      name: "parallax",
      params: {
        parallax: {
          enabled: !1
        }
      },
      create: function create() {
        d.extend(this, {
          parallax: {
            setTransform: R.setTransform.bind(this),
            setTranslate: R.setTranslate.bind(this),
            setTransition: R.setTransition.bind(this)
          }
        });
      },
      on: {
        beforeInit: function beforeInit() {
          this.params.parallax.enabled && (this.params.watchSlidesProgress = !0);
        },
        init: function init() {
          this.params.parallax && this.parallax.setTranslate();
        },
        setTranslate: function setTranslate() {
          this.params.parallax && this.parallax.setTranslate();
        },
        setTransition: function setTransition(e) {
          this.params.parallax && this.parallax.setTransition(e);
        }
      }
    }, {
      name: "zoom",
      params: {
        zoom: {
          enabled: !1,
          maxRatio: 3,
          minRatio: 1,
          toggle: !0,
          containerClass: "swiper-zoom-container",
          zoomedSlideClass: "swiper-slide-zoomed"
        }
      },
      create: function create() {
        var e = this,
            t = {
          enabled: !1,
          scale: 1,
          currentScale: 1,
          isScaling: !1,
          gesture: {
            $slideEl: void 0,
            slideWidth: void 0,
            slideHeight: void 0,
            $imageEl: void 0,
            $imageWrapEl: void 0,
            maxRatio: 3
          },
          image: {
            isTouched: void 0,
            isMoved: void 0,
            currentX: void 0,
            currentY: void 0,
            minX: void 0,
            minY: void 0,
            maxX: void 0,
            maxY: void 0,
            width: void 0,
            height: void 0,
            startX: void 0,
            startY: void 0,
            touchesStart: {},
            touchesCurrent: {}
          },
          velocity: {
            x: void 0,
            y: void 0,
            prevPositionX: void 0,
            prevPositionY: void 0,
            prevTime: void 0
          }
        };
        "onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out".split(" ").forEach(function (i) {
          t[i] = F[i].bind(e);
        }), d.extend(e, {
          zoom: t
        });
      },
      on: {
        init: function init() {
          this.params.zoom.enabled && this.zoom.enable();
        },
        destroy: function destroy() {
          this.zoom.disable();
        },
        touchStart: function touchStart(e) {
          this.zoom.enabled && this.zoom.onTouchStart(e);
        },
        touchEnd: function touchEnd(e) {
          this.zoom.enabled && this.zoom.onTouchEnd(e);
        },
        doubleTap: function doubleTap(e) {
          this.params.zoom.enabled && this.zoom.enabled && this.params.zoom.toggle && this.zoom.toggle(e);
        },
        transitionEnd: function transitionEnd() {
          this.zoom.enabled && this.params.zoom.enabled && this.zoom.onTransitionEnd();
        }
      }
    }, {
      name: "lazy",
      params: {
        lazy: {
          enabled: !1,
          loadPrevNext: !1,
          loadPrevNextAmount: 1,
          loadOnTransitionStart: !1,
          elementClass: "swiper-lazy",
          loadingClass: "swiper-lazy-loading",
          loadedClass: "swiper-lazy-loaded",
          preloaderClass: "swiper-lazy-preloader"
        }
      },
      create: function create() {
        d.extend(this, {
          lazy: {
            initialImageLoaded: !1,
            load: W.load.bind(this),
            loadInSlide: W.loadInSlide.bind(this)
          }
        });
      },
      on: {
        beforeInit: function beforeInit() {
          this.params.lazy.enabled && this.params.preloadImages && (this.params.preloadImages = !1);
        },
        init: function init() {
          this.params.lazy.enabled && !this.params.loop && 0 === this.params.initialSlide && this.lazy.load();
        },
        scroll: function scroll() {
          this.params.freeMode && !this.params.freeModeSticky && this.lazy.load();
        },
        resize: function resize() {
          this.params.lazy.enabled && this.lazy.load();
        },
        scrollbarDragMove: function scrollbarDragMove() {
          this.params.lazy.enabled && this.lazy.load();
        },
        transitionStart: function transitionStart() {
          this.params.lazy.enabled && (this.params.lazy.loadOnTransitionStart || !this.params.lazy.loadOnTransitionStart && !this.lazy.initialImageLoaded) && this.lazy.load();
        },
        transitionEnd: function transitionEnd() {
          this.params.lazy.enabled && !this.params.lazy.loadOnTransitionStart && this.lazy.load();
        }
      }
    }, {
      name: "controller",
      params: {
        controller: {
          control: void 0,
          inverse: !1,
          by: "slide"
        }
      },
      create: function create() {
        d.extend(this, {
          controller: {
            control: this.params.controller.control,
            getInterpolateFunction: q.getInterpolateFunction.bind(this),
            setTranslate: q.setTranslate.bind(this),
            setTransition: q.setTransition.bind(this)
          }
        });
      },
      on: {
        update: function update() {
          this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline);
        },
        resize: function resize() {
          this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline);
        },
        observerUpdate: function observerUpdate() {
          this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline);
        },
        setTranslate: function setTranslate(e, t) {
          this.controller.control && this.controller.setTranslate(e, t);
        },
        setTransition: function setTransition(e, t) {
          this.controller.control && this.controller.setTransition(e, t);
        }
      }
    }, {
      name: "a11y",
      params: {
        a11y: {
          enabled: !0,
          notificationClass: "swiper-notification",
          prevSlideMessage: "Previous slide",
          nextSlideMessage: "Next slide",
          firstSlideMessage: "This is the first slide",
          lastSlideMessage: "This is the last slide",
          paginationBulletMessage: "Go to slide {{index}}"
        }
      },
      create: function create() {
        var e = this;
        d.extend(e, {
          a11y: {
            liveRegion: s('<span class="' + e.params.a11y.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>')
          }
        }), Object.keys(j).forEach(function (t) {
          e.a11y[t] = j[t].bind(e);
        });
      },
      on: {
        init: function init() {
          this.params.a11y.enabled && (this.a11y.init(), this.a11y.updateNavigation());
        },
        toEdge: function toEdge() {
          this.params.a11y.enabled && this.a11y.updateNavigation();
        },
        fromEdge: function fromEdge() {
          this.params.a11y.enabled && this.a11y.updateNavigation();
        },
        paginationUpdate: function paginationUpdate() {
          this.params.a11y.enabled && this.a11y.updatePagination();
        },
        destroy: function destroy() {
          this.params.a11y.enabled && this.a11y.destroy();
        }
      }
    }, {
      name: "history",
      params: {
        history: {
          enabled: !1,
          replaceState: !1,
          key: "slides"
        }
      },
      create: function create() {
        d.extend(this, {
          history: {
            init: K.init.bind(this),
            setHistory: K.setHistory.bind(this),
            setHistoryPopState: K.setHistoryPopState.bind(this),
            scrollToSlide: K.scrollToSlide.bind(this),
            destroy: K.destroy.bind(this)
          }
        });
      },
      on: {
        init: function init() {
          this.params.history.enabled && this.history.init();
        },
        destroy: function destroy() {
          this.params.history.enabled && this.history.destroy();
        },
        transitionEnd: function transitionEnd() {
          this.history.initialized && this.history.setHistory(this.params.history.key, this.activeIndex);
        }
      }
    }, {
      name: "hash-navigation",
      params: {
        hashNavigation: {
          enabled: !1,
          replaceState: !1,
          watchState: !1
        }
      },
      create: function create() {
        d.extend(this, {
          hashNavigation: {
            initialized: !1,
            init: U.init.bind(this),
            destroy: U.destroy.bind(this),
            setHash: U.setHash.bind(this),
            onHashCange: U.onHashCange.bind(this)
          }
        });
      },
      on: {
        init: function init() {
          this.params.hashNavigation.enabled && this.hashNavigation.init();
        },
        destroy: function destroy() {
          this.params.hashNavigation.enabled && this.hashNavigation.destroy();
        },
        transitionEnd: function transitionEnd() {
          this.hashNavigation.initialized && this.hashNavigation.setHash();
        }
      }
    }, {
      name: "autoplay",
      params: {
        autoplay: {
          enabled: !1,
          delay: 3e3,
          waitForTransition: !0,
          disableOnInteraction: !0,
          stopOnLastSlide: !1,
          reverseDirection: !1
        }
      },
      create: function create() {
        var e = this;
        d.extend(e, {
          autoplay: {
            running: !1,
            paused: !1,
            run: _.run.bind(e),
            start: _.start.bind(e),
            stop: _.stop.bind(e),
            pause: _.pause.bind(e),
            onTransitionEnd: function onTransitionEnd(t) {
              e && !e.destroyed && e.$wrapperEl && t.target === this && (e.$wrapperEl[0].removeEventListener("transitionend", e.autoplay.onTransitionEnd), e.$wrapperEl[0].removeEventListener("webkitTransitionEnd", e.autoplay.onTransitionEnd), e.autoplay.paused = !1, e.autoplay.running ? e.autoplay.run() : e.autoplay.stop());
            }
          }
        });
      },
      on: {
        init: function init() {
          this.params.autoplay.enabled && this.autoplay.start();
        },
        beforeTransitionStart: function beforeTransitionStart(e, t) {
          this.autoplay.running && (t || !this.params.autoplay.disableOnInteraction ? this.autoplay.pause(e) : this.autoplay.stop());
        },
        sliderFirstMove: function sliderFirstMove() {
          this.autoplay.running && (this.params.autoplay.disableOnInteraction ? this.autoplay.stop() : this.autoplay.pause());
        },
        destroy: function destroy() {
          this.autoplay.running && this.autoplay.stop();
        }
      }
    }, {
      name: "effect-fade",
      params: {
        fadeEffect: {
          crossFade: !1
        }
      },
      create: function create() {
        d.extend(this, {
          fadeEffect: {
            setTranslate: Z.setTranslate.bind(this),
            setTransition: Z.setTransition.bind(this)
          }
        });
      },
      on: {
        beforeInit: function beforeInit() {
          if ("fade" === this.params.effect) {
            this.classNames.push(this.params.containerModifierClass + "fade");
            var e = {
              slidesPerView: 1,
              slidesPerColumn: 1,
              slidesPerGroup: 1,
              watchSlidesProgress: !0,
              spaceBetween: 0,
              virtualTranslate: !0
            };
            d.extend(this.params, e), d.extend(this.originalParams, e);
          }
        },
        setTranslate: function setTranslate() {
          "fade" === this.params.effect && this.fadeEffect.setTranslate();
        },
        setTransition: function setTransition(e) {
          "fade" === this.params.effect && this.fadeEffect.setTransition(e);
        }
      }
    }, {
      name: "effect-cube",
      params: {
        cubeEffect: {
          slideShadows: !0,
          shadow: !0,
          shadowOffset: 20,
          shadowScale: .94
        }
      },
      create: function create() {
        d.extend(this, {
          cubeEffect: {
            setTranslate: Q.setTranslate.bind(this),
            setTransition: Q.setTransition.bind(this)
          }
        });
      },
      on: {
        beforeInit: function beforeInit() {
          if ("cube" === this.params.effect) {
            this.classNames.push(this.params.containerModifierClass + "cube"), this.classNames.push(this.params.containerModifierClass + "3d");
            var e = {
              slidesPerView: 1,
              slidesPerColumn: 1,
              slidesPerGroup: 1,
              watchSlidesProgress: !0,
              resistanceRatio: 0,
              spaceBetween: 0,
              centeredSlides: !1,
              virtualTranslate: !0
            };
            d.extend(this.params, e), d.extend(this.originalParams, e);
          }
        },
        setTranslate: function setTranslate() {
          "cube" === this.params.effect && this.cubeEffect.setTranslate();
        },
        setTransition: function setTransition(e) {
          "cube" === this.params.effect && this.cubeEffect.setTransition(e);
        }
      }
    }, {
      name: "effect-flip",
      params: {
        flipEffect: {
          slideShadows: !0,
          limitRotation: !0
        }
      },
      create: function create() {
        d.extend(this, {
          flipEffect: {
            setTranslate: J.setTranslate.bind(this),
            setTransition: J.setTransition.bind(this)
          }
        });
      },
      on: {
        beforeInit: function beforeInit() {
          if ("flip" === this.params.effect) {
            this.classNames.push(this.params.containerModifierClass + "flip"), this.classNames.push(this.params.containerModifierClass + "3d");
            var e = {
              slidesPerView: 1,
              slidesPerColumn: 1,
              slidesPerGroup: 1,
              watchSlidesProgress: !0,
              spaceBetween: 0,
              virtualTranslate: !0
            };
            d.extend(this.params, e), d.extend(this.originalParams, e);
          }
        },
        setTranslate: function setTranslate() {
          "flip" === this.params.effect && this.flipEffect.setTranslate();
        },
        setTransition: function setTransition(e) {
          "flip" === this.params.effect && this.flipEffect.setTransition(e);
        }
      }
    }, {
      name: "effect-coverflow",
      params: {
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: !0
        }
      },
      create: function create() {
        d.extend(this, {
          coverflowEffect: {
            setTranslate: ee.setTranslate.bind(this),
            setTransition: ee.setTransition.bind(this)
          }
        });
      },
      on: {
        beforeInit: function beforeInit() {
          "coverflow" === this.params.effect && (this.classNames.push(this.params.containerModifierClass + "coverflow"), this.classNames.push(this.params.containerModifierClass + "3d"), this.params.watchSlidesProgress = !0, this.originalParams.watchSlidesProgress = !0);
        },
        setTranslate: function setTranslate() {
          "coverflow" === this.params.effect && this.coverflowEffect.setTranslate();
        },
        setTransition: function setTransition(e) {
          "coverflow" === this.params.effect && this.coverflowEffect.setTransition(e);
        }
      }
    }];
    return void 0 === k.use && (k.use = k.Class.use, k.installModule = k.Class.installModule), k.use(te), k;
  });
  /*
       _ _      _       _
   ___| (_) ___| | __  (_)___
  / __| | |/ __| |/ /  | / __|
  \__ \ | | (__|   < _ | \__ \
  |___/_|_|\___|_|\_(_)/ |___/
                     |__/
  
   Version: 1.6.0
    Author: Ken Wheeler
   Website: http://kenwheeler.github.io
      Docs: http://kenwheeler.github.io/slick
      Repo: http://github.com/kenwheeler/slick
    Issues: http://github.com/kenwheeler/slick/issues
  
    Modified by Clean Canvas - removed 'aria-describedby', translating labels
   */

  !function (a) {
    "use strict";

    "function" == typeof define && define.amd ? define(["jquery"], a) : "undefined" != typeof exports ? module.exports = a(require("jquery")) : a(jQuery);
  }(function (a) {
    "use strict";

    var b = window.Slick || {};
    b = function () {
      function c(c, d) {
        var f,
            e = this;
        e.defaults = {
          accessibility: !0,
          adaptiveHeight: !1,
          appendArrows: a(c),
          appendDots: a(c),
          arrows: !0,
          asNavFor: null,
          prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="' + theme.strings.previous + '" tabindex="0" role="button">' + theme.strings.previous + '</button>',
          nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="' + theme.strings.next + '" tabindex="0" role="button">' + theme.strings.next + '</button>',
          autoplay: !1,
          autoplaySpeed: 3e3,
          centerMode: !1,
          centerPadding: "50px",
          cssEase: "ease",
          customPaging: function customPaging(b, c) {
            return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c + 1);
          },
          dots: !1,
          dotsClass: "slick-dots",
          draggable: !0,
          easing: "linear",
          edgeFriction: .35,
          fade: !1,
          focusOnSelect: !1,
          infinite: !0,
          initialSlide: 0,
          lazyLoad: "ondemand",
          mobileFirst: !1,
          pauseOnHover: !0,
          pauseOnFocus: !0,
          pauseOnDotsHover: !1,
          respondTo: "window",
          responsive: null,
          rows: 1,
          rtl: !1,
          slide: "",
          slidesPerRow: 1,
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 500,
          swipe: !0,
          swipeToSlide: !1,
          touchMove: !0,
          touchThreshold: 5,
          useCSS: !0,
          useTransform: !0,
          variableWidth: !1,
          vertical: !1,
          verticalSwiping: !1,
          waitForAnimate: !0,
          zIndex: 1e3
        }, e.initials = {
          animating: !1,
          dragging: !1,
          autoPlayTimer: null,
          currentDirection: 0,
          currentLeft: null,
          currentSlide: 0,
          direction: 1,
          $dots: null,
          listWidth: null,
          listHeight: null,
          loadIndex: 0,
          $nextArrow: null,
          $prevArrow: null,
          slideCount: null,
          slideWidth: null,
          $slideTrack: null,
          $slides: null,
          sliding: !1,
          slideOffset: 0,
          swipeLeft: null,
          $list: null,
          touchObject: {},
          transformsEnabled: !1,
          unslicked: !1
        }, a.extend(e, e.initials), e.activeBreakpoint = null, e.animType = null, e.animProp = null, e.breakpoints = [], e.breakpointSettings = [], e.cssTransitions = !1, e.focussed = !1, e.interrupted = !1, e.hidden = "hidden", e.paused = !0, e.positionProp = null, e.respondTo = null, e.rowCount = 1, e.shouldClick = !0, e.$slider = a(c), e.$slidesCache = null, e.transformType = null, e.transitionType = null, e.visibilityChange = "visibilitychange", e.windowWidth = 0, e.windowTimer = null, f = a(c).data("slick") || {}, e.options = a.extend({}, e.defaults, d, f), e.currentSlide = e.options.initialSlide, e.originalSettings = e.options, "undefined" != typeof document.mozHidden ? (e.hidden = "mozHidden", e.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (e.hidden = "webkitHidden", e.visibilityChange = "webkitvisibilitychange"), e.autoPlay = a.proxy(e.autoPlay, e), e.autoPlayClear = a.proxy(e.autoPlayClear, e), e.autoPlayIterator = a.proxy(e.autoPlayIterator, e), e.changeSlide = a.proxy(e.changeSlide, e), e.clickHandler = a.proxy(e.clickHandler, e), e.selectHandler = a.proxy(e.selectHandler, e), e.setPosition = a.proxy(e.setPosition, e), e.swipeHandler = a.proxy(e.swipeHandler, e), e.dragHandler = a.proxy(e.dragHandler, e), e.keyHandler = a.proxy(e.keyHandler, e), e.instanceUid = b++, e.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, e.registerBreakpoints(), e.init(!0);
      }

      var b = 0;
      return c;
    }(), b.prototype.activateADA = function () {
      var a = this;
      a.$slideTrack.find(".slick-active").attr({
        "aria-hidden": "false"
      }).find("a, input, button, select").attr({
        tabindex: "0"
      });
    }, b.prototype.addSlide = b.prototype.slickAdd = function (b, c, d) {
      var e = this;
      if ("boolean" == typeof c) d = c, c = null;else if (0 > c || c >= e.slideCount) return !1;
      e.unload(), "number" == typeof c ? 0 === c && 0 === e.$slides.length ? a(b).appendTo(e.$slideTrack) : d ? a(b).insertBefore(e.$slides.eq(c)) : a(b).insertAfter(e.$slides.eq(c)) : d === !0 ? a(b).prependTo(e.$slideTrack) : a(b).appendTo(e.$slideTrack), e.$slides = e.$slideTrack.children(this.options.slide), e.$slideTrack.children(this.options.slide).detach(), e.$slideTrack.append(e.$slides), e.$slides.each(function (b, c) {
        a(c).attr("data-slick-index", b);
      }), e.$slidesCache = e.$slides, e.reinit();
    }, b.prototype.animateHeight = function () {
      var a = this;

      if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
        var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
        a.$list.animate({
          height: b
        }, a.options.speed);
      }
    }, b.prototype.animateSlide = function (b, c) {
      var d = {},
          e = this;
      e.animateHeight(), e.options.rtl === !0 && e.options.vertical === !1 && (b = -b), e.transformsEnabled === !1 ? e.options.vertical === !1 ? e.$slideTrack.animate({
        left: b
      }, e.options.speed, e.options.easing, c) : e.$slideTrack.animate({
        top: b
      }, e.options.speed, e.options.easing, c) : e.cssTransitions === !1 ? (e.options.rtl === !0 && (e.currentLeft = -e.currentLeft), a({
        animStart: e.currentLeft
      }).animate({
        animStart: b
      }, {
        duration: e.options.speed,
        easing: e.options.easing,
        step: function step(a) {
          a = Math.ceil(a), e.options.vertical === !1 ? (d[e.animType] = "translate(" + a + "px, 0px)", e.$slideTrack.css(d)) : (d[e.animType] = "translate(0px," + a + "px)", e.$slideTrack.css(d));
        },
        complete: function complete() {
          c && c.call();
        }
      })) : (e.applyTransition(), b = Math.ceil(b), e.options.vertical === !1 ? d[e.animType] = "translate3d(" + b + "px, 0px, 0px)" : d[e.animType] = "translate3d(0px," + b + "px, 0px)", e.$slideTrack.css(d), c && setTimeout(function () {
        e.disableTransition(), c.call();
      }, e.options.speed));
    }, b.prototype.getNavTarget = function () {
      var b = this,
          c = b.options.asNavFor;
      return c && null !== c && (c = a(c).not(b.$slider)), c;
    }, b.prototype.asNavFor = function (b) {
      var c = this,
          d = c.getNavTarget();
      null !== d && "object" == _typeof(d) && d.each(function () {
        var c = a(this).slick("getSlick");
        c.unslicked || c.slideHandler(b, !0);
      });
    }, b.prototype.applyTransition = function (a) {
      var b = this,
          c = {};
      b.options.fade === !1 ? c[b.transitionType] = b.transformType + " " + b.options.speed + "ms " + b.options.cssEase : c[b.transitionType] = "opacity " + b.options.speed + "ms " + b.options.cssEase, b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c);
    }, b.prototype.autoPlay = function () {
      var a = this;
      a.autoPlayClear(), a.slideCount > a.options.slidesToShow && (a.autoPlayTimer = setInterval(a.autoPlayIterator, a.options.autoplaySpeed));
    }, b.prototype.autoPlayClear = function () {
      var a = this;
      a.autoPlayTimer && clearInterval(a.autoPlayTimer);
    }, b.prototype.autoPlayIterator = function () {
      var a = this,
          b = a.currentSlide + a.options.slidesToScroll;
      a.paused || a.interrupted || a.focussed || (a.options.infinite === !1 && (1 === a.direction && a.currentSlide + 1 === a.slideCount - 1 ? a.direction = 0 : 0 === a.direction && (b = a.currentSlide - a.options.slidesToScroll, a.currentSlide - 1 === 0 && (a.direction = 1))), a.slideHandler(b));
    }, b.prototype.buildArrows = function () {
      var b = this;
      b.options.arrows === !0 && (b.$prevArrow = a(b.options.prevArrow).addClass("slick-arrow"), b.$nextArrow = a(b.options.nextArrow).addClass("slick-arrow"), b.slideCount > b.options.slidesToShow ? (b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.prependTo(b.options.appendArrows), b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.appendTo(b.options.appendArrows), b.options.infinite !== !0 && b.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({
        "aria-disabled": "true",
        tabindex: "-1"
      }));
    }, b.prototype.buildDots = function () {
      var c,
          d,
          b = this;

      if (b.options.dots === !0 && b.slideCount > b.options.slidesToShow) {
        for (b.$slider.addClass("slick-dotted"), d = a("<ul />").addClass(b.options.dotsClass), c = 0; c <= b.getDotCount(); c += 1) {
          d.append(a("<li />").append(b.options.customPaging.call(this, b, c)));
        }

        b.$dots = d.appendTo(b.options.appendDots), b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false");
      }
    }, b.prototype.buildOut = function () {
      var b = this;
      b.$slides = b.$slider.children(b.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), b.slideCount = b.$slides.length, b.$slides.each(function (b, c) {
        a(c).attr("data-slick-index", b).data("originalStyling", a(c).attr("style") || "");
      }), b.$slider.addClass("slick-slider"), b.$slideTrack = 0 === b.slideCount ? a('<div class="slick-track"/>').appendTo(b.$slider) : b.$slides.wrapAll('<div class="slick-track"/>').parent(), b.$list = b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), b.$slideTrack.css("opacity", 0), (b.options.centerMode === !0 || b.options.swipeToSlide === !0) && (b.options.slidesToScroll = 1), a("img[data-lazy]", b.$slider).not("[src]").addClass("slick-loading"), b.setupInfinite(), b.buildArrows(), b.buildDots(), b.updateDots(), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), b.options.draggable === !0 && b.$list.addClass("draggable");
    }, b.prototype.buildRows = function () {
      var b,
          c,
          d,
          e,
          f,
          g,
          h,
          a = this;

      if (e = document.createDocumentFragment(), g = a.$slider.children(), a.options.rows > 1) {
        for (h = a.options.slidesPerRow * a.options.rows, f = Math.ceil(g.length / h), b = 0; f > b; b++) {
          var i = document.createElement("div");

          for (c = 0; c < a.options.rows; c++) {
            var j = document.createElement("div");

            for (d = 0; d < a.options.slidesPerRow; d++) {
              var k = b * h + (c * a.options.slidesPerRow + d);
              g.get(k) && j.appendChild(g.get(k));
            }

            i.appendChild(j);
          }

          e.appendChild(i);
        }

        a.$slider.empty().append(e), a.$slider.children().children().children().css({
          width: 100 / a.options.slidesPerRow + "%",
          display: "inline-block"
        });
      }
    }, b.prototype.checkResponsive = function (b, c) {
      var e,
          f,
          g,
          d = this,
          h = !1,
          i = d.$slider.width(),
          j = window.innerWidth || a(window).width();

      if ("window" === d.respondTo ? g = j : "slider" === d.respondTo ? g = i : "min" === d.respondTo && (g = Math.min(j, i)), d.options.responsive && d.options.responsive.length && null !== d.options.responsive) {
        f = null;

        for (e in d.breakpoints) {
          d.breakpoints.hasOwnProperty(e) && (d.originalSettings.mobileFirst === !1 ? g < d.breakpoints[e] && (f = d.breakpoints[e]) : g > d.breakpoints[e] && (f = d.breakpoints[e]));
        }

        null !== f ? null !== d.activeBreakpoint ? (f !== d.activeBreakpoint || c) && (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : null !== d.activeBreakpoint && (d.activeBreakpoint = null, d.options = d.originalSettings, b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b), h = f), b || h === !1 || d.$slider.trigger("breakpoint", [d, h]);
      }
    }, b.prototype.changeSlide = function (b, c) {
      var f,
          g,
          h,
          d = this,
          e = a(b.currentTarget);

      switch (e.is("a") && b.preventDefault(), e.is("li") || (e = e.closest("li")), h = d.slideCount % d.options.slidesToScroll !== 0, f = h ? 0 : (d.slideCount - d.currentSlide) % d.options.slidesToScroll, b.data.message) {
        case "previous":
          g = 0 === f ? d.options.slidesToScroll : d.options.slidesToShow - f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide - g, !1, c);
          break;

        case "next":
          g = 0 === f ? d.options.slidesToScroll : f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide + g, !1, c);
          break;

        case "index":
          var i = 0 === b.data.index ? 0 : b.data.index || e.index() * d.options.slidesToScroll;
          d.slideHandler(d.checkNavigable(i), !1, c), e.children().trigger("focus");
          break;

        default:
          return;
      }
    }, b.prototype.checkNavigable = function (a) {
      var c,
          d,
          b = this;
      if (c = b.getNavigableIndexes(), d = 0, a > c[c.length - 1]) a = c[c.length - 1];else for (var e in c) {
        if (a < c[e]) {
          a = d;
          break;
        }

        d = c[e];
      }
      return a;
    }, b.prototype.cleanUpEvents = function () {
      var b = this;
      b.options.dots && null !== b.$dots && a("li", b.$dots).off("click.slick", b.changeSlide).off("mouseenter.slick", a.proxy(b.interrupt, b, !0)).off("mouseleave.slick", a.proxy(b.interrupt, b, !1)), b.$slider.off("focus.slick blur.slick"), b.options.arrows === !0 && b.slideCount > b.options.slidesToShow && (b.$prevArrow && b.$prevArrow.off("click.slick", b.changeSlide), b.$nextArrow && b.$nextArrow.off("click.slick", b.changeSlide)), b.$list.off("touchstart.slick mousedown.slick", b.swipeHandler), b.$list.off("touchmove.slick mousemove.slick", b.swipeHandler), b.$list.off("touchend.slick mouseup.slick", b.swipeHandler), b.$list.off("touchcancel.slick mouseleave.slick", b.swipeHandler), b.$list.off("click.slick", b.clickHandler), a(document).off(b.visibilityChange, b.visibility), b.cleanUpSlideEvents(), b.options.accessibility === !0 && b.$list.off("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().off("click.slick", b.selectHandler), a(window).off("orientationchange.slick.slick-" + b.instanceUid, b.orientationChange), a(window).off("resize.slick.slick-" + b.instanceUid, b.resize), a("[draggable!=true]", b.$slideTrack).off("dragstart", b.preventDefault), a(window).off("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).off("ready.slick.slick-" + b.instanceUid, b.setPosition);
    }, b.prototype.cleanUpSlideEvents = function () {
      var b = this;
      b.$list.off("mouseenter.slick", a.proxy(b.interrupt, b, !0)), b.$list.off("mouseleave.slick", a.proxy(b.interrupt, b, !1));
    }, b.prototype.cleanUpRows = function () {
      var b,
          a = this;
      a.options.rows > 1 && (b = a.$slides.children().children(), b.removeAttr("style"), a.$slider.empty().append(b));
    }, b.prototype.clickHandler = function (a) {
      var b = this;
      b.shouldClick === !1 && (a.stopImmediatePropagation(), a.stopPropagation(), a.preventDefault());
    }, b.prototype.destroy = function (b) {
      var c = this;
      c.autoPlayClear(), c.touchObject = {}, c.cleanUpEvents(), a(".slick-cloned", c.$slider).detach(), c.$dots && c.$dots.remove(), c.$prevArrow && c.$prevArrow.length && (c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.prevArrow) && c.$prevArrow.remove()), c.$nextArrow && c.$nextArrow.length && (c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.nextArrow) && c.$nextArrow.remove()), c.$slides && (c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () {
        a(this).attr("style", a(this).data("originalStyling"));
      }), c.$slideTrack.children(this.options.slide).detach(), c.$slideTrack.detach(), c.$list.detach(), c.$slider.append(c.$slides)), c.cleanUpRows(), c.$slider.removeClass("slick-slider"), c.$slider.removeClass("slick-initialized"), c.$slider.removeClass("slick-dotted"), c.unslicked = !0, b || c.$slider.trigger("destroy", [c]);
    }, b.prototype.disableTransition = function (a) {
      var b = this,
          c = {};
      c[b.transitionType] = "", b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c);
    }, b.prototype.fadeSlide = function (a, b) {
      var c = this;
      c.cssTransitions === !1 ? (c.$slides.eq(a).css({
        zIndex: c.options.zIndex
      }), c.$slides.eq(a).animate({
        opacity: 1
      }, c.options.speed, c.options.easing, b)) : (c.applyTransition(a), c.$slides.eq(a).css({
        opacity: 1,
        zIndex: c.options.zIndex
      }), b && setTimeout(function () {
        c.disableTransition(a), b.call();
      }, c.options.speed));
    }, b.prototype.fadeSlideOut = function (a) {
      var b = this;
      b.cssTransitions === !1 ? b.$slides.eq(a).animate({
        opacity: 0,
        zIndex: b.options.zIndex - 2
      }, b.options.speed, b.options.easing) : (b.applyTransition(a), b.$slides.eq(a).css({
        opacity: 0,
        zIndex: b.options.zIndex - 2
      }));
    }, b.prototype.filterSlides = b.prototype.slickFilter = function (a) {
      var b = this;
      null !== a && (b.$slidesCache = b.$slides, b.unload(), b.$slideTrack.children(this.options.slide).detach(), b.$slidesCache.filter(a).appendTo(b.$slideTrack), b.reinit());
    }, b.prototype.focusHandler = function () {
      var b = this;
      b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function (c) {
        var d = a(this);
        setTimeout(function () {
          b.options.pauseOnFocus && (b.focussed = d.is(":focus"), b.autoPlay());
        }, 0);
      });
    }, b.prototype.getCurrent = b.prototype.slickCurrentSlide = function () {
      var a = this;
      return a.currentSlide;
    }, b.prototype.getDotCount = function () {
      var a = this,
          b = 0,
          c = 0,
          d = 0;
      if (a.options.infinite === !0) for (; b < a.slideCount;) {
        ++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
      } else if (a.options.centerMode === !0) d = a.slideCount;else if (a.options.asNavFor) for (; b < a.slideCount;) {
        ++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
      } else d = 1 + Math.ceil((a.slideCount - a.options.slidesToShow) / a.options.slidesToScroll);
      return d - 1;
    }, b.prototype.getLeft = function (a) {
      var c,
          d,
          f,
          b = this,
          e = 0;
      return b.slideOffset = 0, d = b.$slides.first().outerHeight(!0), b.options.infinite === !0 ? (b.slideCount > b.options.slidesToShow && (b.slideOffset = b.slideWidth * b.options.slidesToShow * -1, e = d * b.options.slidesToShow * -1), b.slideCount % b.options.slidesToScroll !== 0 && a + b.options.slidesToScroll > b.slideCount && b.slideCount > b.options.slidesToShow && (a > b.slideCount ? (b.slideOffset = (b.options.slidesToShow - (a - b.slideCount)) * b.slideWidth * -1, e = (b.options.slidesToShow - (a - b.slideCount)) * d * -1) : (b.slideOffset = b.slideCount % b.options.slidesToScroll * b.slideWidth * -1, e = b.slideCount % b.options.slidesToScroll * d * -1))) : a + b.options.slidesToShow > b.slideCount && (b.slideOffset = (a + b.options.slidesToShow - b.slideCount) * b.slideWidth, e = (a + b.options.slidesToShow - b.slideCount) * d), b.slideCount <= b.options.slidesToShow && (b.slideOffset = 0, e = 0), b.options.centerMode === !0 && b.options.infinite === !0 ? b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2) - b.slideWidth : b.options.centerMode === !0 && (b.slideOffset = 0, b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2)), c = b.options.vertical === !1 ? a * b.slideWidth * -1 + b.slideOffset : a * d * -1 + e, b.options.variableWidth === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow), c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0, b.options.centerMode === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow + 1), c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0, c += (b.$list.width() - f.outerWidth()) / 2)), c;
    }, b.prototype.getOption = b.prototype.slickGetOption = function (a) {
      var b = this;
      return b.options[a];
    }, b.prototype.getNavigableIndexes = function () {
      var e,
          a = this,
          b = 0,
          c = 0,
          d = [];

      for (a.options.infinite === !1 ? e = a.slideCount : (b = -1 * a.options.slidesToScroll, c = -1 * a.options.slidesToScroll, e = 2 * a.slideCount); e > b;) {
        d.push(b), b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
      }

      return d;
    }, b.prototype.getSlick = function () {
      return this;
    }, b.prototype.getSlideCount = function () {
      var c,
          d,
          e,
          b = this;
      return e = b.options.centerMode === !0 ? b.slideWidth * Math.floor(b.options.slidesToShow / 2) : 0, b.options.swipeToSlide === !0 ? (b.$slideTrack.find(".slick-slide").each(function (c, f) {
        return f.offsetLeft - e + a(f).outerWidth() / 2 > -1 * b.swipeLeft ? (d = f, !1) : void 0;
      }), c = Math.abs(a(d).attr("data-slick-index") - b.currentSlide) || 1) : b.options.slidesToScroll;
    }, b.prototype.goTo = b.prototype.slickGoTo = function (a, b) {
      var c = this;
      c.changeSlide({
        data: {
          message: "index",
          index: parseInt(a)
        }
      }, b);
    }, b.prototype.init = function (b) {
      var c = this;
      a(c.$slider).hasClass("slick-initialized") || (a(c.$slider).addClass("slick-initialized"), c.buildRows(), c.buildOut(), c.setProps(), c.startLoad(), c.loadSlider(), c.initializeEvents(), c.updateArrows(), c.updateDots(), c.checkResponsive(!0), c.focusHandler()), b && c.$slider.trigger("init", [c]), c.options.accessibility === !0 && c.initADA(), c.options.autoplay && (c.paused = !1, c.autoPlay());
    }, b.prototype.initADA = function () {
      var b = this;
      b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({
        "aria-hidden": "true",
        tabindex: "-1"
      }).find("a, input, button, select").attr({
        tabindex: "-1"
      }), b.$slideTrack.attr("role", "listbox"), b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function (c) {
        a(this).attr({
          role: "option"
        });
      }), null !== b.$dots && b.$dots.attr("aria-hidden", "true").find("li").each(function (c) {
        a(this).attr({
          role: "presentation",
          "aria-selected": "false",
          "aria-controls": "navigation" + b.instanceUid + c,
          id: "slick-slide" + b.instanceUid + c
        });
      }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), b.activateADA();
    }, b.prototype.initArrowEvents = function () {
      var a = this;
      a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.off("click.slick").on("click.slick", {
        message: "previous"
      }, a.changeSlide), a.$nextArrow.off("click.slick").on("click.slick", {
        message: "next"
      }, a.changeSlide));
    }, b.prototype.initDotEvents = function () {
      var b = this;
      b.options.dots === !0 && b.slideCount > b.options.slidesToShow && a("li", b.$dots).on("click.slick", {
        message: "index"
      }, b.changeSlide), b.options.dots === !0 && b.options.pauseOnDotsHover === !0 && a("li", b.$dots).on("mouseenter.slick", a.proxy(b.interrupt, b, !0)).on("mouseleave.slick", a.proxy(b.interrupt, b, !1));
    }, b.prototype.initSlideEvents = function () {
      var b = this;
      b.options.pauseOnHover && (b.$list.on("mouseenter.slick", a.proxy(b.interrupt, b, !0)), b.$list.on("mouseleave.slick", a.proxy(b.interrupt, b, !1)));
    }, b.prototype.initializeEvents = function () {
      var b = this;
      b.initArrowEvents(), b.initDotEvents(), b.initSlideEvents(), b.$list.on("touchstart.slick mousedown.slick", {
        action: "start"
      }, b.swipeHandler), b.$list.on("touchmove.slick mousemove.slick", {
        action: "move"
      }, b.swipeHandler), b.$list.on("touchend.slick mouseup.slick", {
        action: "end"
      }, b.swipeHandler), b.$list.on("touchcancel.slick mouseleave.slick", {
        action: "end"
      }, b.swipeHandler), b.$list.on("click.slick", b.clickHandler), a(document).on(b.visibilityChange, a.proxy(b.visibility, b)), b.options.accessibility === !0 && b.$list.on("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), a(window).on("orientationchange.slick.slick-" + b.instanceUid, a.proxy(b.orientationChange, b)), a(window).on("resize.slick.slick-" + b.instanceUid, a.proxy(b.resize, b)), a("[draggable!=true]", b.$slideTrack).on("dragstart", b.preventDefault), a(window).on("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).on("ready.slick.slick-" + b.instanceUid, b.setPosition);
    }, b.prototype.initUI = function () {
      var a = this;
      a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.show(), a.$nextArrow.show()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.show();
    }, b.prototype.keyHandler = function (a) {
      var b = this;
      a.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === a.keyCode && b.options.accessibility === !0 ? b.changeSlide({
        data: {
          message: b.options.rtl === !0 ? "next" : "previous"
        }
      }) : 39 === a.keyCode && b.options.accessibility === !0 && b.changeSlide({
        data: {
          message: b.options.rtl === !0 ? "previous" : "next"
        }
      }));
    }, b.prototype.lazyLoad = function () {
      function g(c) {
        a("img[data-lazy]", c).each(function () {
          var c = a(this),
              d = a(this).attr("data-lazy"),
              e = document.createElement("img");
          e.onload = function () {
            c.animate({
              opacity: 0
            }, 100, function () {
              c.attr("src", d).animate({
                opacity: 1
              }, 200, function () {
                c.removeAttr("data-lazy").removeClass("slick-loading");
              }), b.$slider.trigger("lazyLoaded", [b, c, d]);
            });
          }, e.onerror = function () {
            c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), b.$slider.trigger("lazyLoadError", [b, c, d]);
          }, e.src = d;
        });
      }

      var c,
          d,
          e,
          f,
          b = this;
      b.options.centerMode === !0 ? b.options.infinite === !0 ? (e = b.currentSlide + (b.options.slidesToShow / 2 + 1), f = e + b.options.slidesToShow + 2) : (e = Math.max(0, b.currentSlide - (b.options.slidesToShow / 2 + 1)), f = 2 + (b.options.slidesToShow / 2 + 1) + b.currentSlide) : (e = b.options.infinite ? b.options.slidesToShow + b.currentSlide : b.currentSlide, f = Math.ceil(e + b.options.slidesToShow), b.options.fade === !0 && (e > 0 && e--, f <= b.slideCount && f++)), c = b.$slider.find(".slick-slide").slice(e, f), g(c), b.slideCount <= b.options.slidesToShow ? (d = b.$slider.find(".slick-slide"), g(d)) : b.currentSlide >= b.slideCount - b.options.slidesToShow ? (d = b.$slider.find(".slick-cloned").slice(0, b.options.slidesToShow), g(d)) : 0 === b.currentSlide && (d = b.$slider.find(".slick-cloned").slice(-1 * b.options.slidesToShow), g(d));
    }, b.prototype.loadSlider = function () {
      var a = this;
      a.setPosition(), a.$slideTrack.css({
        opacity: 1
      }), a.$slider.removeClass("slick-loading"), a.initUI(), "progressive" === a.options.lazyLoad && a.progressiveLazyLoad();
    }, b.prototype.next = b.prototype.slickNext = function () {
      var a = this;
      a.changeSlide({
        data: {
          message: "next"
        }
      });
    }, b.prototype.orientationChange = function () {
      var a = this;
      a.checkResponsive(), a.setPosition();
    }, b.prototype.pause = b.prototype.slickPause = function () {
      var a = this;
      a.autoPlayClear(), a.paused = !0;
    }, b.prototype.play = b.prototype.slickPlay = function () {
      var a = this;
      a.autoPlay(), a.options.autoplay = !0, a.paused = !1, a.focussed = !1, a.interrupted = !1;
    }, b.prototype.postSlide = function (a) {
      var b = this;
      b.unslicked || (b.$slider.trigger("afterChange", [b, a]), b.animating = !1, b.setPosition(), b.swipeLeft = null, b.options.autoplay && b.autoPlay(), b.options.accessibility === !0 && b.initADA());
    }, b.prototype.prev = b.prototype.slickPrev = function () {
      var a = this;
      a.changeSlide({
        data: {
          message: "previous"
        }
      });
    }, b.prototype.preventDefault = function (a) {
      a.preventDefault();
    }, b.prototype.progressiveLazyLoad = function (b) {
      b = b || 1;
      var e,
          f,
          g,
          c = this,
          d = a("img[data-lazy]", c.$slider);
      d.length ? (e = d.first(), f = e.attr("data-lazy"), g = document.createElement("img"), g.onload = function () {
        e.attr("src", f).removeAttr("data-lazy").removeClass("slick-loading"), c.options.adaptiveHeight === !0 && c.setPosition(), c.$slider.trigger("lazyLoaded", [c, e, f]), c.progressiveLazyLoad();
      }, g.onerror = function () {
        3 > b ? setTimeout(function () {
          c.progressiveLazyLoad(b + 1);
        }, 500) : (e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), c.$slider.trigger("lazyLoadError", [c, e, f]), c.progressiveLazyLoad());
      }, g.src = f) : c.$slider.trigger("allImagesLoaded", [c]);
    }, b.prototype.refresh = function (b) {
      var d,
          e,
          c = this;
      e = c.slideCount - c.options.slidesToShow, !c.options.infinite && c.currentSlide > e && (c.currentSlide = e), c.slideCount <= c.options.slidesToShow && (c.currentSlide = 0), d = c.currentSlide, c.destroy(!0), a.extend(c, c.initials, {
        currentSlide: d
      }), c.init(), b || c.changeSlide({
        data: {
          message: "index",
          index: d
        }
      }, !1);
    }, b.prototype.registerBreakpoints = function () {
      var c,
          d,
          e,
          b = this,
          f = b.options.responsive || null;

      if ("array" === a.type(f) && f.length) {
        b.respondTo = b.options.respondTo || "window";

        for (c in f) {
          if (e = b.breakpoints.length - 1, d = f[c].breakpoint, f.hasOwnProperty(c)) {
            for (; e >= 0;) {
              b.breakpoints[e] && b.breakpoints[e] === d && b.breakpoints.splice(e, 1), e--;
            }

            b.breakpoints.push(d), b.breakpointSettings[d] = f[c].settings;
          }
        }

        b.breakpoints.sort(function (a, c) {
          return b.options.mobileFirst ? a - c : c - a;
        });
      }
    }, b.prototype.reinit = function () {
      var b = this;
      b.$slides = b.$slideTrack.children(b.options.slide).addClass("slick-slide"), b.slideCount = b.$slides.length, b.currentSlide >= b.slideCount && 0 !== b.currentSlide && (b.currentSlide = b.currentSlide - b.options.slidesToScroll), b.slideCount <= b.options.slidesToShow && (b.currentSlide = 0), b.registerBreakpoints(), b.setProps(), b.setupInfinite(), b.buildArrows(), b.updateArrows(), b.initArrowEvents(), b.buildDots(), b.updateDots(), b.initDotEvents(), b.cleanUpSlideEvents(), b.initSlideEvents(), b.checkResponsive(!1, !0), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), b.setPosition(), b.focusHandler(), b.paused = !b.options.autoplay, b.autoPlay(), b.$slider.trigger("reInit", [b]);
    }, b.prototype.resize = function () {
      var b = this;
      a(window).width() !== b.windowWidth && (clearTimeout(b.windowDelay), b.windowDelay = window.setTimeout(function () {
        b.windowWidth = a(window).width(), b.checkResponsive(), b.unslicked || b.setPosition();
      }, 50));
    }, b.prototype.removeSlide = b.prototype.slickRemove = function (a, b, c) {
      var d = this;
      return "boolean" == typeof a ? (b = a, a = b === !0 ? 0 : d.slideCount - 1) : a = b === !0 ? --a : a, d.slideCount < 1 || 0 > a || a > d.slideCount - 1 ? !1 : (d.unload(), c === !0 ? d.$slideTrack.children().remove() : d.$slideTrack.children(this.options.slide).eq(a).remove(), d.$slides = d.$slideTrack.children(this.options.slide), d.$slideTrack.children(this.options.slide).detach(), d.$slideTrack.append(d.$slides), d.$slidesCache = d.$slides, void d.reinit());
    }, b.prototype.setCSS = function (a) {
      var d,
          e,
          b = this,
          c = {};
      b.options.rtl === !0 && (a = -a), d = "left" == b.positionProp ? Math.ceil(a) + "px" : "0px", e = "top" == b.positionProp ? Math.ceil(a) + "px" : "0px", c[b.positionProp] = a, b.transformsEnabled === !1 ? b.$slideTrack.css(c) : (c = {}, b.cssTransitions === !1 ? (c[b.animType] = "translate(" + d + ", " + e + ")", b.$slideTrack.css(c)) : (c[b.animType] = "translate3d(" + d + ", " + e + ", 0px)", b.$slideTrack.css(c)));
    }, b.prototype.setDimensions = function () {
      var a = this;
      a.options.vertical === !1 ? a.options.centerMode === !0 && a.$list.css({
        padding: "0px " + a.options.centerPadding
      }) : (a.$list.height(a.$slides.first().outerHeight(!0) * a.options.slidesToShow), a.options.centerMode === !0 && a.$list.css({
        padding: a.options.centerPadding + " 0px"
      })), a.listWidth = a.$list.width(), a.listHeight = a.$list.height(), a.options.vertical === !1 && a.options.variableWidth === !1 ? (a.slideWidth = Math.ceil(a.listWidth / a.options.slidesToShow), a.$slideTrack.width(Math.ceil(a.slideWidth * a.$slideTrack.children(".slick-slide").length))) : a.options.variableWidth === !0 ? a.$slideTrack.width(5e3 * a.slideCount) : (a.slideWidth = Math.ceil(a.listWidth), a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0) * a.$slideTrack.children(".slick-slide").length)));
      var b = a.$slides.first().outerWidth(!0) - a.$slides.first().width();
      a.options.variableWidth === !1 && a.$slideTrack.children(".slick-slide").width(a.slideWidth - b);
    }, b.prototype.setFade = function () {
      var c,
          b = this;
      b.$slides.each(function (d, e) {
        c = b.slideWidth * d * -1, b.options.rtl === !0 ? a(e).css({
          position: "relative",
          right: c,
          top: 0,
          zIndex: b.options.zIndex - 2,
          opacity: 0
        }) : a(e).css({
          position: "relative",
          left: c,
          top: 0,
          zIndex: b.options.zIndex - 2,
          opacity: 0
        });
      }), b.$slides.eq(b.currentSlide).css({
        zIndex: b.options.zIndex - 1,
        opacity: 1
      });
    }, b.prototype.setHeight = function () {
      var a = this;

      if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
        var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
        a.$list.css("height", b);
      }
    }, b.prototype.setOption = b.prototype.slickSetOption = function () {
      var c,
          d,
          e,
          f,
          h,
          b = this,
          g = !1;
      if ("object" === a.type(arguments[0]) ? (e = arguments[0], g = arguments[1], h = "multiple") : "string" === a.type(arguments[0]) && (e = arguments[0], f = arguments[1], g = arguments[2], "responsive" === arguments[0] && "array" === a.type(arguments[1]) ? h = "responsive" : "undefined" != typeof arguments[1] && (h = "single")), "single" === h) b.options[e] = f;else if ("multiple" === h) a.each(e, function (a, c) {
        b.options[a] = c;
      });else if ("responsive" === h) for (d in f) {
        if ("array" !== a.type(b.options.responsive)) b.options.responsive = [f[d]];else {
          for (c = b.options.responsive.length - 1; c >= 0;) {
            b.options.responsive[c].breakpoint === f[d].breakpoint && b.options.responsive.splice(c, 1), c--;
          }

          b.options.responsive.push(f[d]);
        }
      }
      g && (b.unload(), b.reinit());
    }, b.prototype.setPosition = function () {
      var a = this;
      a.setDimensions(), a.setHeight(), a.options.fade === !1 ? a.setCSS(a.getLeft(a.currentSlide)) : a.setFade(), a.$slider.trigger("setPosition", [a]);
    }, b.prototype.setProps = function () {
      var a = this,
          b = document.body.style;
      a.positionProp = a.options.vertical === !0 ? "top" : "left", "top" === a.positionProp ? a.$slider.addClass("slick-vertical") : a.$slider.removeClass("slick-vertical"), (void 0 !== b.WebkitTransition || void 0 !== b.MozTransition || void 0 !== b.msTransition) && a.options.useCSS === !0 && (a.cssTransitions = !0), a.options.fade && ("number" == typeof a.options.zIndex ? a.options.zIndex < 3 && (a.options.zIndex = 3) : a.options.zIndex = a.defaults.zIndex), void 0 !== b.OTransform && (a.animType = "OTransform", a.transformType = "-o-transform", a.transitionType = "OTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.MozTransform && (a.animType = "MozTransform", a.transformType = "-moz-transform", a.transitionType = "MozTransition", void 0 === b.perspectiveProperty && void 0 === b.MozPerspective && (a.animType = !1)), void 0 !== b.webkitTransform && (a.animType = "webkitTransform", a.transformType = "-webkit-transform", a.transitionType = "webkitTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.msTransform && (a.animType = "msTransform", a.transformType = "-ms-transform", a.transitionType = "msTransition", void 0 === b.msTransform && (a.animType = !1)), void 0 !== b.transform && a.animType !== !1 && (a.animType = "transform", a.transformType = "transform", a.transitionType = "transition"), a.transformsEnabled = a.options.useTransform && null !== a.animType && a.animType !== !1;
    }, b.prototype.setSlideClasses = function (a) {
      var c,
          d,
          e,
          f,
          b = this;
      d = b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), b.$slides.eq(a).addClass("slick-current"), b.options.centerMode === !0 ? (c = Math.floor(b.options.slidesToShow / 2), b.options.infinite === !0 && (a >= c && a <= b.slideCount - 1 - c ? b.$slides.slice(a - c, a + c + 1).addClass("slick-active").attr("aria-hidden", "false") : (e = b.options.slidesToShow + a, d.slice(e - c + 1, e + c + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === a ? d.eq(d.length - 1 - b.options.slidesToShow).addClass("slick-center") : a === b.slideCount - 1 && d.eq(b.options.slidesToShow).addClass("slick-center")), b.$slides.eq(a).addClass("slick-center")) : a >= 0 && a <= b.slideCount - b.options.slidesToShow ? b.$slides.slice(a, a + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : d.length <= b.options.slidesToShow ? d.addClass("slick-active").attr("aria-hidden", "false") : (f = b.slideCount % b.options.slidesToShow, e = b.options.infinite === !0 ? b.options.slidesToShow + a : a, b.options.slidesToShow == b.options.slidesToScroll && b.slideCount - a < b.options.slidesToShow ? d.slice(e - (b.options.slidesToShow - f), e + f).addClass("slick-active").attr("aria-hidden", "false") : d.slice(e, e + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === b.options.lazyLoad && b.lazyLoad();
    }, b.prototype.setupInfinite = function () {
      var c,
          d,
          e,
          b = this;

      if (b.options.fade === !0 && (b.options.centerMode = !1), b.options.infinite === !0 && b.options.fade === !1 && (d = null, b.slideCount > b.options.slidesToShow)) {
        for (e = b.options.centerMode === !0 ? b.options.slidesToShow + 1 : b.options.slidesToShow, c = b.slideCount; c > b.slideCount - e; c -= 1) {
          d = c - 1, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d - b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");
        }

        for (c = 0; e > c; c += 1) {
          d = c, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d + b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");
        }

        b.$slideTrack.find(".slick-cloned").find("[id]").each(function () {
          a(this).attr("id", "");
        });
      }
    }, b.prototype.interrupt = function (a) {
      var b = this;
      a || b.autoPlay(), b.interrupted = a;
    }, b.prototype.selectHandler = function (b) {
      var c = this,
          d = a(b.target).is(".slick-slide") ? a(b.target) : a(b.target).parents(".slick-slide"),
          e = parseInt(d.attr("data-slick-index"));
      return e || (e = 0), c.slideCount <= c.options.slidesToShow ? (c.setSlideClasses(e), void c.asNavFor(e)) : void c.slideHandler(e);
    }, b.prototype.slideHandler = function (a, b, c) {
      var d,
          e,
          f,
          g,
          j,
          h = null,
          i = this;
      return b = b || !1, i.animating === !0 && i.options.waitForAnimate === !0 || i.options.fade === !0 && i.currentSlide === a || i.slideCount <= i.options.slidesToShow ? void 0 : (b === !1 && i.asNavFor(a), d = a, h = i.getLeft(d), g = i.getLeft(i.currentSlide), i.currentLeft = null === i.swipeLeft ? g : i.swipeLeft, i.options.infinite === !1 && i.options.centerMode === !1 && (0 > a || a > i.getDotCount() * i.options.slidesToScroll) ? void (i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function () {
        i.postSlide(d);
      }) : i.postSlide(d))) : i.options.infinite === !1 && i.options.centerMode === !0 && (0 > a || a > i.slideCount - i.options.slidesToScroll) ? void (i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function () {
        i.postSlide(d);
      }) : i.postSlide(d))) : (i.options.autoplay && clearInterval(i.autoPlayTimer), e = 0 > d ? i.slideCount % i.options.slidesToScroll !== 0 ? i.slideCount - i.slideCount % i.options.slidesToScroll : i.slideCount + d : d >= i.slideCount ? i.slideCount % i.options.slidesToScroll !== 0 ? 0 : d - i.slideCount : d, i.animating = !0, i.$slider.trigger("beforeChange", [i, i.currentSlide, e]), f = i.currentSlide, i.currentSlide = e, i.setSlideClasses(i.currentSlide), i.options.asNavFor && (j = i.getNavTarget(), j = j.slick("getSlick"), j.slideCount <= j.options.slidesToShow && j.setSlideClasses(i.currentSlide)), i.updateDots(), i.updateArrows(), i.options.fade === !0 ? (c !== !0 ? (i.fadeSlideOut(f), i.fadeSlide(e, function () {
        i.postSlide(e);
      })) : i.postSlide(e), void i.animateHeight()) : void (c !== !0 ? i.animateSlide(h, function () {
        i.postSlide(e);
      }) : i.postSlide(e))));
    }, b.prototype.startLoad = function () {
      var a = this;
      a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.hide(), a.$nextArrow.hide()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.hide(), a.$slider.addClass("slick-loading");
    }, b.prototype.swipeDirection = function () {
      var a,
          b,
          c,
          d,
          e = this;
      return a = e.touchObject.startX - e.touchObject.curX, b = e.touchObject.startY - e.touchObject.curY, c = Math.atan2(b, a), d = Math.round(180 * c / Math.PI), 0 > d && (d = 360 - Math.abs(d)), 45 >= d && d >= 0 ? e.options.rtl === !1 ? "left" : "right" : 360 >= d && d >= 315 ? e.options.rtl === !1 ? "left" : "right" : d >= 135 && 225 >= d ? e.options.rtl === !1 ? "right" : "left" : e.options.verticalSwiping === !0 ? d >= 35 && 135 >= d ? "down" : "up" : "vertical";
    }, b.prototype.swipeEnd = function (a) {
      var c,
          d,
          b = this;
      if (b.dragging = !1, b.interrupted = !1, b.shouldClick = b.touchObject.swipeLength > 10 ? !1 : !0, void 0 === b.touchObject.curX) return !1;

      if (b.touchObject.edgeHit === !0 && b.$slider.trigger("edge", [b, b.swipeDirection()]), b.touchObject.swipeLength >= b.touchObject.minSwipe) {
        switch (d = b.swipeDirection()) {
          case "left":
          case "down":
            c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide + b.getSlideCount()) : b.currentSlide + b.getSlideCount(), b.currentDirection = 0;
            break;

          case "right":
          case "up":
            c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide - b.getSlideCount()) : b.currentSlide - b.getSlideCount(), b.currentDirection = 1;
        }

        "vertical" != d && (b.slideHandler(c), b.touchObject = {}, b.$slider.trigger("swipe", [b, d]));
      } else b.touchObject.startX !== b.touchObject.curX && (b.slideHandler(b.currentSlide), b.touchObject = {});
    }, b.prototype.swipeHandler = function (a) {
      var b = this;
      if (!(b.options.swipe === !1 || "ontouchend" in document && b.options.swipe === !1 || b.options.draggable === !1 && -1 !== a.type.indexOf("mouse"))) switch (b.touchObject.fingerCount = a.originalEvent && void 0 !== a.originalEvent.touches ? a.originalEvent.touches.length : 1, b.touchObject.minSwipe = b.listWidth / b.options.touchThreshold, b.options.verticalSwiping === !0 && (b.touchObject.minSwipe = b.listHeight / b.options.touchThreshold), a.data.action) {
        case "start":
          b.swipeStart(a);
          break;

        case "move":
          b.swipeMove(a);
          break;

        case "end":
          b.swipeEnd(a);
      }
    }, b.prototype.swipeMove = function (a) {
      var d,
          e,
          f,
          g,
          h,
          b = this;
      return h = void 0 !== a.originalEvent ? a.originalEvent.touches : null, !b.dragging || h && 1 !== h.length ? !1 : (d = b.getLeft(b.currentSlide), b.touchObject.curX = void 0 !== h ? h[0].pageX : a.clientX, b.touchObject.curY = void 0 !== h ? h[0].pageY : a.clientY, b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curX - b.touchObject.startX, 2))), b.options.verticalSwiping === !0 && (b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curY - b.touchObject.startY, 2)))), e = b.swipeDirection(), "vertical" !== e ? (void 0 !== a.originalEvent && b.touchObject.swipeLength > 4 && a.preventDefault(), g = (b.options.rtl === !1 ? 1 : -1) * (b.touchObject.curX > b.touchObject.startX ? 1 : -1), b.options.verticalSwiping === !0 && (g = b.touchObject.curY > b.touchObject.startY ? 1 : -1), f = b.touchObject.swipeLength, b.touchObject.edgeHit = !1, b.options.infinite === !1 && (0 === b.currentSlide && "right" === e || b.currentSlide >= b.getDotCount() && "left" === e) && (f = b.touchObject.swipeLength * b.options.edgeFriction, b.touchObject.edgeHit = !0), b.options.vertical === !1 ? b.swipeLeft = d + f * g : b.swipeLeft = d + f * (b.$list.height() / b.listWidth) * g, b.options.verticalSwiping === !0 && (b.swipeLeft = d + f * g), b.options.fade === !0 || b.options.touchMove === !1 ? !1 : b.animating === !0 ? (b.swipeLeft = null, !1) : void b.setCSS(b.swipeLeft)) : void 0);
    }, b.prototype.swipeStart = function (a) {
      var c,
          b = this;
      return b.interrupted = !0, 1 !== b.touchObject.fingerCount || b.slideCount <= b.options.slidesToShow ? (b.touchObject = {}, !1) : (void 0 !== a.originalEvent && void 0 !== a.originalEvent.touches && (c = a.originalEvent.touches[0]), b.touchObject.startX = b.touchObject.curX = void 0 !== c ? c.pageX : a.clientX, b.touchObject.startY = b.touchObject.curY = void 0 !== c ? c.pageY : a.clientY, void (b.dragging = !0));
    }, b.prototype.unfilterSlides = b.prototype.slickUnfilter = function () {
      var a = this;
      null !== a.$slidesCache && (a.unload(), a.$slideTrack.children(this.options.slide).detach(), a.$slidesCache.appendTo(a.$slideTrack), a.reinit());
    }, b.prototype.unload = function () {
      var b = this;
      a(".slick-cloned", b.$slider).remove(), b.$dots && b.$dots.remove(), b.$prevArrow && b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.remove(), b.$nextArrow && b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.remove(), b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "");
    }, b.prototype.unslick = function (a) {
      var b = this;
      b.$slider.trigger("unslick", [b, a]), b.destroy();
    }, b.prototype.updateArrows = function () {
      var b,
          a = this;
      b = Math.floor(a.options.slidesToShow / 2), a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && !a.options.infinite && (a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === a.currentSlide ? (a.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - a.options.slidesToShow && a.options.centerMode === !1 ? (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - 1 && a.options.centerMode === !0 && (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")));
    }, b.prototype.updateDots = function () {
      var a = this;
      null !== a.$dots && (a.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), a.$dots.find("li").eq(Math.floor(a.currentSlide / a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"));
    }, b.prototype.visibility = function () {
      var a = this;
      a.options.autoplay && (document[a.hidden] ? a.interrupted = !0 : a.interrupted = !1);
    }, a.fn.slick = function () {
      var f,
          g,
          a = this,
          c = arguments[0],
          d = Array.prototype.slice.call(arguments, 1),
          e = a.length;

      for (f = 0; e > f; f++) {
        if ("object" == _typeof(c) || "undefined" == typeof c ? a[f].slick = new b(a[f], c) : g = a[f].slick[c].apply(a[f].slick, d), "undefined" != typeof g) return g;
      }

      return a;
    };
  });
  /*
  v1.0
  autogrow.js - Copyright (C) 2013, Jason Edelman <edelman.jason@gmail.com>
  
  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
  associated documentation files (the "Software"), to deal in the Software without restriction, including
  without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
  sell copies of the Software, and to permit persons to whom the Software is furnished to
  do so, subject to the following conditions:
  
  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
  LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
  CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
  DEALINGS IN THE SOFTWARE.
  */

  ;

  (function (e) {
    e.fn.autogrow = function (t) {
      function s(n) {
        var r = e(this),
            i = r.innerHeight(),
            s = this.scrollHeight,
            o = r.data("autogrow-start-height") || 0,
            u;

        if (i < s) {
          this.scrollTop = 0;
          t.animate ? r.stop().animate({
            height: s
          }, t.speed) : r.innerHeight(s);
        } else if (!n || n.which == 8 || n.which == 46 || n.ctrlKey && n.which == 88) {
          if (i > o) {
            u = r.clone().addClass(t.cloneClass).css({
              position: "absolute",
              zIndex: -10
            }).val(r.val());
            r.after(u);

            do {
              s = u[0].scrollHeight - 1;
              u.innerHeight(s);
            } while (s === u[0].scrollHeight);

            s++;
            u.remove();
            s < o && (s = o);
            i > s && t.animate ? r.stop().animate({
              height: s
            }, t.speed) : r.innerHeight(s);
          } else {
            r.innerHeight(o);
          }
        }
      }

      var n = e(this).css({
        overflow: "hidden",
        resize: "none"
      }),
          r = n.selector,
          i = {
        context: e(document),
        animate: true,
        speed: 200,
        fixMinHeight: true,
        cloneClass: "autogrowclone",
        onInitialize: false
      };
      t = e.isPlainObject(t) ? t : {
        context: t ? t : e(document)
      };
      t = e.extend({}, i, t);
      n.each(function (n, r) {
        var i, o;
        r = e(r);

        if (r.is(":visible") || parseInt(r.css("height"), 10) > 0) {
          i = parseInt(r.css("height"), 10) || r.innerHeight();
        } else {
          o = r.clone().addClass(t.cloneClass).val(r.val()).css({
            position: "absolute",
            visibility: "hidden",
            display: "block"
          });
          e("body").append(o);
          i = o.innerHeight();
          o.remove();
        }

        if (t.fixMinHeight) {
          r.data("autogrow-start-height", i);
        }

        r.css("height", i);

        if (t.onInitialize) {
          s.call(r);
        }
      });
      t.context.on("keyup paste", r, s);
      return n;
    };
  })(jQuery);
  /*
     v1.0
  
     Licensed under the Apache License, Version 2.0 (the "License");
     you may not use this file except in compliance with the License.
     You may obtain a copy of the License at
  
         http://www.apache.org/licenses/LICENSE-2.0
  
     Unless required by applicable law or agreed to in writing, software
     distributed under the License is distributed on an "AS IS" BASIS,
     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     See the License for the specific language governing permissions and
     limitations under the License.
  */


  (function () {
    var defaultDiacriticsRemovalMap = [{
      'base': 'A',
      'letters': "A\u24B6\uFF21\xC0\xC1\xC2\u1EA6\u1EA4\u1EAA\u1EA8\xC3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\xC4\u01DE\u1EA2\xC5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F"
    }, {
      'base': 'AA',
      'letters': "\uA732"
    }, {
      'base': 'AE',
      'letters': "\xC6\u01FC\u01E2"
    }, {
      'base': 'AO',
      'letters': "\uA734"
    }, {
      'base': 'AU',
      'letters': "\uA736"
    }, {
      'base': 'AV',
      'letters': "\uA738\uA73A"
    }, {
      'base': 'AY',
      'letters': "\uA73C"
    }, {
      'base': 'B',
      'letters': "B\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181"
    }, {
      'base': 'C',
      'letters': "C\u24B8\uFF23\u0106\u0108\u010A\u010C\xC7\u1E08\u0187\u023B\uA73E"
    }, {
      'base': 'D',
      'letters': "D\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779\xD0"
    }, {
      'base': 'DZ',
      'letters': "\u01F1\u01C4"
    }, {
      'base': 'Dz',
      'letters': "\u01F2\u01C5"
    }, {
      'base': 'E',
      'letters': "E\u24BA\uFF25\xC8\xC9\xCA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\xCB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E"
    }, {
      'base': 'F',
      'letters': "F\u24BB\uFF26\u1E1E\u0191\uA77B"
    }, {
      'base': 'G',
      'letters': "G\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E"
    }, {
      'base': 'H',
      'letters': "H\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D"
    }, {
      'base': 'I',
      'letters': "I\u24BE\uFF29\xCC\xCD\xCE\u0128\u012A\u012C\u0130\xCF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197"
    }, {
      'base': 'J',
      'letters': "J\u24BF\uFF2A\u0134\u0248"
    }, {
      'base': 'K',
      'letters': "K\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2"
    }, {
      'base': 'L',
      'letters': "L\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780"
    }, {
      'base': 'LJ',
      'letters': "\u01C7"
    }, {
      'base': 'Lj',
      'letters': "\u01C8"
    }, {
      'base': 'M',
      'letters': "M\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C"
    }, {
      'base': 'N',
      'letters': "N\u24C3\uFF2E\u01F8\u0143\xD1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4"
    }, {
      'base': 'NJ',
      'letters': "\u01CA"
    }, {
      'base': 'Nj',
      'letters': "\u01CB"
    }, {
      'base': 'O',
      'letters': "O\u24C4\uFF2F\xD2\xD3\xD4\u1ED2\u1ED0\u1ED6\u1ED4\xD5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\xD6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\xD8\u01FE\u0186\u019F\uA74A\uA74C"
    }, {
      'base': 'OI',
      'letters': "\u01A2"
    }, {
      'base': 'OO',
      'letters': "\uA74E"
    }, {
      'base': 'OU',
      'letters': "\u0222"
    }, {
      'base': 'OE',
      'letters': "\x8C\u0152"
    }, {
      'base': 'oe',
      'letters': "\x9C\u0153"
    }, {
      'base': 'P',
      'letters': "P\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754"
    }, {
      'base': 'Q',
      'letters': "Q\u24C6\uFF31\uA756\uA758\u024A"
    }, {
      'base': 'R',
      'letters': "R\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782"
    }, {
      'base': 'S',
      'letters': "S\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784"
    }, {
      'base': 'T',
      'letters': "T\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786"
    }, {
      'base': 'TZ',
      'letters': "\uA728"
    }, {
      'base': 'U',
      'letters': "U\u24CA\uFF35\xD9\xDA\xDB\u0168\u1E78\u016A\u1E7A\u016C\xDC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244"
    }, {
      'base': 'V',
      'letters': "V\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245"
    }, {
      'base': 'VY',
      'letters': "\uA760"
    }, {
      'base': 'W',
      'letters': "W\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72"
    }, {
      'base': 'X',
      'letters': "X\u24CD\uFF38\u1E8A\u1E8C"
    }, {
      'base': 'Y',
      'letters': "Y\u24CE\uFF39\u1EF2\xDD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE"
    }, {
      'base': 'Z',
      'letters': "Z\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762"
    }, {
      'base': 'a',
      'letters': "a\u24D0\uFF41\u1E9A\xE0\xE1\xE2\u1EA7\u1EA5\u1EAB\u1EA9\xE3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\xE4\u01DF\u1EA3\xE5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250"
    }, {
      'base': 'aa',
      'letters': "\uA733"
    }, {
      'base': 'ae',
      'letters': "\xE6\u01FD\u01E3"
    }, {
      'base': 'ao',
      'letters': "\uA735"
    }, {
      'base': 'au',
      'letters': "\uA737"
    }, {
      'base': 'av',
      'letters': "\uA739\uA73B"
    }, {
      'base': 'ay',
      'letters': "\uA73D"
    }, {
      'base': 'b',
      'letters': "b\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253"
    }, {
      'base': 'c',
      'letters': "c\u24D2\uFF43\u0107\u0109\u010B\u010D\xE7\u1E09\u0188\u023C\uA73F\u2184"
    }, {
      'base': 'd',
      'letters': "d\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A"
    }, {
      'base': 'dz',
      'letters': "\u01F3\u01C6"
    }, {
      'base': 'e',
      'letters': "e\u24D4\uFF45\xE8\xE9\xEA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\xEB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD"
    }, {
      'base': 'f',
      'letters': "f\u24D5\uFF46\u1E1F\u0192\uA77C"
    }, {
      'base': 'g',
      'letters': "g\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F"
    }, {
      'base': 'h',
      'letters': "h\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265"
    }, {
      'base': 'hv',
      'letters': "\u0195"
    }, {
      'base': 'i',
      'letters': "i\u24D8\uFF49\xEC\xED\xEE\u0129\u012B\u012D\xEF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131"
    }, {
      'base': 'j',
      'letters': "j\u24D9\uFF4A\u0135\u01F0\u0249"
    }, {
      'base': 'k',
      'letters': "k\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3"
    }, {
      'base': 'l',
      'letters': "l\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747"
    }, {
      'base': 'lj',
      'letters': "\u01C9"
    }, {
      'base': 'm',
      'letters': "m\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F"
    }, {
      'base': 'n',
      'letters': "n\u24DD\uFF4E\u01F9\u0144\xF1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5"
    }, {
      'base': 'nj',
      'letters': "\u01CC"
    }, {
      'base': 'o',
      'letters': "o\u24DE\uFF4F\xF2\xF3\xF4\u1ED3\u1ED1\u1ED7\u1ED5\xF5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\xF6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\xF8\u01FF\u0254\uA74B\uA74D\u0275"
    }, {
      'base': 'oi',
      'letters': "\u01A3"
    }, {
      'base': 'ou',
      'letters': "\u0223"
    }, {
      'base': 'oo',
      'letters': "\uA74F"
    }, {
      'base': 'p',
      'letters': "p\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755"
    }, {
      'base': 'q',
      'letters': "q\u24E0\uFF51\u024B\uA757\uA759"
    }, {
      'base': 'r',
      'letters': "r\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783"
    }, {
      'base': 's',
      'letters': "s\u24E2\uFF53\xDF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B"
    }, {
      'base': 't',
      'letters': "t\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787"
    }, {
      'base': 'tz',
      'letters': "\uA729"
    }, {
      'base': 'u',
      'letters': "u\u24E4\uFF55\xF9\xFA\xFB\u0169\u1E79\u016B\u1E7B\u016D\xFC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289"
    }, {
      'base': 'v',
      'letters': "v\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C"
    }, {
      'base': 'vy',
      'letters': "\uA761"
    }, {
      'base': 'w',
      'letters': "w\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73"
    }, {
      'base': 'x',
      'letters': "x\u24E7\uFF58\u1E8B\u1E8D"
    }, {
      'base': 'y',
      'letters': "y\u24E8\uFF59\u1EF3\xFD\u0177\u1EF9\u0233\u1E8F\xFF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF"
    }, {
      'base': 'z',
      'letters': "z\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763"
    }];
    var diacriticsMap = {};

    for (var i = 0; i < defaultDiacriticsRemovalMap.length; i++) {
      var letters = defaultDiacriticsRemovalMap[i].letters;

      for (var j = 0; j < letters.length; j++) {
        diacriticsMap[letters[j]] = defaultDiacriticsRemovalMap[i].base;
      }
    } // "what?" version ... http://jsperf.com/diacritics/12


    window.removeDiacritics = function (str) {
      if (typeof str !== "string") {
        console.warn("Invalid parameter passed to window.removeDiacritics (".concat(_typeof(str), ")"), str);
        return str;
      }

      return str.replace(/[^\u0000-\u007E]/g, function (a) {
        return diacriticsMap[a] || a;
      });
    };
  })();
  /*
   * v.1.0
   *
   * debouncedresize: special jQuery event that happens once after a window resize
   *
   * latest version and complete README available on Github:
   * https://github.com/louisremi/jquery-smartresize
   *
   * Copyright 2012 @louis_remi
   * Licensed under the MIT license.
   *
   * This saved you an hour of work?
   * Send me music http://www.amazon.co.uk/wishlist/HNTU0468LQON
   */


  (function () {
    var $event = $.event,
        $special,
        resizeTimeout;
    $special = $event.special.debouncedresize = {
      setup: function setup() {
        $(this).on("resize", $special.handler);
      },
      teardown: function teardown() {
        $(this).off("resize", $special.handler);
      },
      handler: function handler(event, execAsap) {
        // Save the context
        var context = this,
            args = arguments,
            dispatch = function dispatch() {
          // set correct event type
          event.type = "debouncedresize";
          $event.dispatch.apply(context, args);
        };

        if (resizeTimeout) {
          clearTimeout(resizeTimeout);
        }

        execAsap ? dispatch() : resizeTimeout = setTimeout(dispatch, $special.threshold);
      },
      threshold: 150
    };
  })();
})(theme.jQuery);