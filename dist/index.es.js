/**
* react-lite-youtube-embed v2.6.0
*  git+https://github.com/ibrahimcesar/react-lite-youtube-embed.git
*
*  Copyright (c) Ibrahim Cesar <email@ibrahimcesar.com> and project contributors.
*
*  This source code is licensed under the MIT license found in the
*  LICENSE file in the root directory of this source tree.
*
*  Author site: https://ibrahimcesar.cloud
*/
import { jsxs as h, Fragment as f, jsx as n } from "react/jsx-runtime";
import * as d from "react";
import { useState as z, useEffect as F } from "react";
const R = {
  default: 120,
  mqdefault: 320,
  hqdefault: 480,
  sddefault: 640,
  maxresdefault: 1280
}, H = (t, a, r, u = "maxresdefault") => {
  const [e, o] = z("");
  return F(() => {
    const c = `https://img.youtube.com/${a}/${t}/${u}.${r}`, m = `https://img.youtube.com/${a}/${t}/hqdefault.${r}`, l = R[u], i = new Image();
    i.onload = () => {
      i.width < l ? o(m) : o(c);
    }, i.onerror = () => o(m), i.src = c;
  }, [t, a, r, u]), e;
};
function J(t, a, r, u, e) {
  const o = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: (e == null ? void 0 : e.name) || a,
    thumbnailUrl: [(e == null ? void 0 : e.thumbnailUrl) || r],
    embedUrl: (e == null ? void 0 : e.embedUrl) || `${u}/embed/${t}`,
    contentUrl: (e == null ? void 0 : e.contentUrl) || `https://www.youtube.com/watch?v=${t}`,
    ...(e == null ? void 0 : e.description) && { description: e.description },
    ...(e == null ? void 0 : e.uploadDate) && { uploadDate: e.uploadDate },
    ...(e == null ? void 0 : e.duration) && { duration: e.duration }
  };
  return JSON.stringify(o);
}
function _(t, a) {
  const [r, u] = d.useState(!1), [e, o] = d.useState(t.alwaysLoadIframe || !1), c = encodeURIComponent(t.id), m = typeof t.playlistCoverId == "string" ? encodeURIComponent(t.playlistCoverId) : null, l = t.title, i = t.poster || "hqdefault", $ = t.announce || "Watch", I = t.alwaysLoadIframe ? t.autoplay && t.muted : !0, b = d.useMemo(() => {
    const U = new URLSearchParams({
      ...t.muted ? { mute: "1" } : {},
      ...I ? { autoplay: "1" } : {},
      ...t.enableJsApi ? { enablejsapi: "1" } : {},
      ...t.playlist ? { list: c } : {}
    });
    return t.params && new URLSearchParams(
      t.params.startsWith("&") ? t.params.slice(1) : t.params
    ).forEach((O, q) => {
      U.append(q, O);
    }), U;
  }, [t.muted, I, t.enableJsApi, t.playlist, c, t.params]), s = d.useMemo(
    () => t.cookie ? "https://www.youtube.com" : "https://www.youtube-nocookie.com",
    [t.cookie]
  ), S = d.useMemo(
    () => t.playlist ? `${s}/embed/videoseries?${b.toString()}` : `${s}/embed/${c}?${b.toString()}`,
    [t.playlist, s, c, b]
  ), x = !t.thumbnail && !t.playlist && i === "maxresdefault", w = t.webp ? "webp" : "jpg", g = t.webp ? "vi_webp" : "vi", k = x ? H(t.id, g, w, i) : null, y = d.useMemo(
    () => t.thumbnail || k || `https://i.ytimg.com/${g}/${t.playlist ? m : c}/${i}.${w}`,
    [t.thumbnail, k, g, t.playlist, m, c, i, w]
  ), L = t.activatedClass || "lyt-activated", P = t.adNetwork || !1, T = t.aspectHeight || 9, N = t.aspectWidth || 16, W = t.iframeClass || "", j = t.playerClass || "lty-playbtn", A = t.wrapperClass || "yt-lite", C = d.useCallback(
    t.onIframeAdded || function() {
    },
    [t.onIframeAdded]
  ), D = t.rel ? "prefetch" : "preload", E = t.containerElement || "article", Y = t.noscriptFallback !== !1, M = () => {
    r || u(!0);
  }, v = () => {
    e || o(!0);
  };
  return d.useEffect(() => {
    e && (C(), t.focusOnLoad && typeof a == "object" && (a != null && a.current) && a.current.focus());
  }, [e, C, t.focusOnLoad, a]), /* @__PURE__ */ h(f, { children: [
    !t.lazyLoad && /* @__PURE__ */ n("link", { rel: D, href: y, as: "image" }),
    /* @__PURE__ */ n(f, { children: r && /* @__PURE__ */ h(f, { children: [
      /* @__PURE__ */ n("link", { rel: "preconnect", href: s }),
      /* @__PURE__ */ n("link", { rel: "preconnect", href: "https://www.google.com" }),
      P && /* @__PURE__ */ h(f, { children: [
        /* @__PURE__ */ n("link", { rel: "preconnect", href: "https://static.doubleclick.net" }),
        /* @__PURE__ */ n(
          "link",
          {
            rel: "preconnect",
            href: "https://googleads.g.doubleclick.net"
          }
        )
      ] })
    ] }) }),
    t.seo && !t.playlist && /* @__PURE__ */ n(
      "script",
      {
        type: "application/ld+json",
        dangerouslySetInnerHTML: {
          __html: J(
            t.id,
            l,
            y,
            s,
            t.seo
          )
        }
      }
    ),
    Y && !t.playlist && /* @__PURE__ */ n("noscript", { children: /* @__PURE__ */ h(
      "a",
      {
        href: `https://www.youtube.com/watch?v=${t.id}`,
        "aria-label": `Watch ${l} on YouTube`,
        children: [
          'Watch "',
          l,
          '" on YouTube'
        ]
      }
    ) }),
    /* @__PURE__ */ h(
      E,
      {
        onPointerOver: M,
        onClick: v,
        className: `${A} ${e ? L : ""}`,
        "data-title": l,
        role: e ? void 0 : "img",
        "aria-label": e ? void 0 : `${l} - YouTube video preview`,
        style: {
          ...!t.lazyLoad && { backgroundImage: `url(${y})` },
          "--aspect-ratio": `${T / N * 100}%`,
          ...t.style || {}
        },
        children: [
          t.lazyLoad && !e && /* @__PURE__ */ n(
            "img",
            {
              src: y,
              alt: `${l} - YouTube thumbnail`,
              className: "lty-thumbnail",
              loading: "lazy"
            }
          ),
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              className: j,
              "aria-label": `${$} ${l}`,
              "aria-hidden": e || void 0,
              tabIndex: e ? -1 : 0,
              onClick: v,
              children: /* @__PURE__ */ n("span", { className: "lty-visually-hidden", children: $ })
            }
          ),
          e && /* @__PURE__ */ n(
            "iframe",
            {
              ref: a,
              className: W,
              title: l,
              width: "560",
              height: "315",
              style: { border: 0 },
              allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
              allowFullScreen: !0,
              src: S,
              referrerPolicy: t.referrerPolicy || "strict-origin-when-cross-origin"
            }
          )
        ]
      }
    )
  ] });
}
const K = d.forwardRef(
  _
);
export {
  K as default
};
//# sourceMappingURL=index.es.js.map
