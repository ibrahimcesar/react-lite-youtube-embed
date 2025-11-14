/**
* react-lite-youtube-embed v2.5.6
*  git+https://github.com/ibrahimcesar/react-lite-youtube-embed.git
*
*  Copyright (c) Ibrahim Cesar <email@ibrahimcesar.com> and project contributors.
*
*  This source code is licensed under the MIT license found in the
*  LICENSE file in the root directory of this source tree.
*
*  Author site: https://ibrahimcesar.cloud
*/
import { jsxs as h, Fragment as f, jsx as c } from "react/jsx-runtime";
import * as i from "react";
import { useState as F, useEffect as H } from "react";
const J = {
  default: 120,
  mqdefault: 320,
  hqdefault: 480,
  sddefault: 640,
  maxresdefault: 1280
}, D = (e, t, s, r = "maxresdefault") => {
  const [a, d] = F("");
  return H(() => {
    const n = `https://img.youtube.com/${t}/${e}/${r}.${s}`, m = `https://img.youtube.com/${t}/${e}/hqdefault.${s}`, o = J[r], l = new Image();
    l.onload = () => {
      l.width < o ? d(m) : d(n);
    }, l.onerror = () => d(m), l.src = n;
  }, [e, t, s, r]), a;
};
function _(e, t) {
  const [s, r] = i.useState(!1), [a, d] = i.useState(e.alwaysLoadIframe || !1), n = encodeURIComponent(e.id), m = typeof e.playlistCoverId == "string" ? encodeURIComponent(e.playlistCoverId) : null, o = e.title, l = e.poster || "hqdefault", g = e.announce || "Watch", $ = e.alwaysLoadIframe ? e.autoplay && e.muted : !0, y = i.useMemo(() => {
    const v = new URLSearchParams({
      ...e.muted ? { mute: "1" } : {},
      ...$ ? { autoplay: "1" } : {},
      ...e.enableJsApi ? { enablejsapi: "1" } : {},
      ...e.playlist ? { list: n } : {}
    });
    return e.params && new URLSearchParams(
      e.params.startsWith("&") ? e.params.slice(1) : e.params
    ).forEach((O, Y) => {
      v.append(Y, O);
    }), v;
  }, [e.muted, $, e.enableJsApi, e.playlist, n, e.params]), u = i.useMemo(
    () => e.cookie ? "https://www.youtube.com" : "https://www.youtube-nocookie.com",
    [e.cookie]
  ), P = i.useMemo(
    () => e.playlist ? `${u}/embed/videoseries?${y.toString()}` : `${u}/embed/${n}?${y.toString()}`,
    [e.playlist, u, n, y]
  ), x = !e.thumbnail && !e.playlist && l === "maxresdefault", b = e.webp ? "webp" : "jpg", w = e.webp ? "vi_webp" : "vi", I = x ? D(e.id, w, b, l) : null, C = i.useMemo(
    () => e.thumbnail || I || `https://i.ytimg.com/${w}/${e.playlist ? m : n}/${l}.${b}`,
    [e.thumbnail, I, w, e.playlist, m, n, l, b]
  ), U = e.activatedClass || "lyt-activated", S = e.adNetwork || !1, A = e.aspectHeight || 9, L = e.aspectWidth || 16, W = e.iframeClass || "", E = e.playerClass || "lty-playbtn", N = e.wrapperClass || "yt-lite", k = i.useCallback(
    e.onIframeAdded || function() {
    },
    [e.onIframeAdded]
  ), T = e.rel ? "prefetch" : "preload", j = e.containerElement || "article", q = e.style || {}, M = () => {
    s || r(!0);
  }, R = () => {
    a || d(!0);
  };
  return i.useEffect(() => {
    a && (k(), e.focusOnLoad && typeof t == "object" && (t != null && t.current) && t.current.focus());
  }, [a, k, e.focusOnLoad, t]), /* @__PURE__ */ h(f, { children: [
    /* @__PURE__ */ c("link", { rel: T, href: C, as: "image" }),
    /* @__PURE__ */ c(f, { children: s && /* @__PURE__ */ h(f, { children: [
      /* @__PURE__ */ c("link", { rel: "preconnect", href: u }),
      /* @__PURE__ */ c("link", { rel: "preconnect", href: "https://www.google.com" }),
      S && /* @__PURE__ */ h(f, { children: [
        /* @__PURE__ */ c("link", { rel: "preconnect", href: "https://static.doubleclick.net" }),
        /* @__PURE__ */ c(
          "link",
          {
            rel: "preconnect",
            href: "https://googleads.g.doubleclick.net"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ h(
      j,
      {
        onPointerOver: M,
        onClick: R,
        className: `${N} ${a ? U : ""}`,
        "data-title": o,
        role: a ? void 0 : "img",
        "aria-label": a ? void 0 : `${o} - YouTube video preview`,
        style: {
          backgroundImage: `url(${C})`,
          "--aspect-ratio": `${A / L * 100}%`,
          ...q
        },
        children: [
          /* @__PURE__ */ c(
            "button",
            {
              type: "button",
              className: E,
              "aria-label": `${g} ${o}`,
              "aria-hidden": a || void 0,
              tabIndex: a ? -1 : 0,
              children: /* @__PURE__ */ c("span", { className: "lty-visually-hidden", children: g })
            }
          ),
          a && /* @__PURE__ */ c(
            "iframe",
            {
              ref: t,
              className: W,
              title: o,
              width: "560",
              height: "315",
              style: { border: 0 },
              allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
              allowFullScreen: !0,
              src: P,
              referrerPolicy: e.referrerPolicy || "strict-origin-when-cross-origin"
            }
          )
        ]
      }
    )
  ] });
}
const K = i.forwardRef(
  _
);
export {
  K as default
};
//# sourceMappingURL=index.es.js.map
