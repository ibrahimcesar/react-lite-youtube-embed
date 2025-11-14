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
import { jsxs as h, Fragment as f, jsx as n } from "react/jsx-runtime";
import * as r from "react";
import { useState as R, useEffect as H } from "react";
const J = {
  default: 120,
  mqdefault: 320,
  hqdefault: 480,
  sddefault: 640,
  maxresdefault: 1280
}, _ = (t, a, d, u = "maxresdefault") => {
  const [e, o] = R("");
  return H(() => {
    const l = `https://img.youtube.com/${a}/${t}/${u}.${d}`, m = `https://img.youtube.com/${a}/${t}/hqdefault.${d}`, c = J[u], i = new Image();
    i.onload = () => {
      i.width < c ? o(m) : o(l);
    }, i.onerror = () => o(m), i.src = l;
  }, [t, a, d, u]), e;
};
function V(t, a, d, u, e) {
  const o = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: (e == null ? void 0 : e.name) || a,
    thumbnailUrl: [(e == null ? void 0 : e.thumbnailUrl) || d],
    embedUrl: (e == null ? void 0 : e.embedUrl) || `${u}/embed/${t}`,
    contentUrl: (e == null ? void 0 : e.contentUrl) || `https://www.youtube.com/watch?v=${t}`,
    ...(e == null ? void 0 : e.description) && { description: e.description },
    ...(e == null ? void 0 : e.uploadDate) && { uploadDate: e.uploadDate },
    ...(e == null ? void 0 : e.duration) && { duration: e.duration }
  };
  return JSON.stringify(o);
}
function z(t, a) {
  const [d, u] = r.useState(!1), [e, o] = r.useState(t.alwaysLoadIframe || !1), l = encodeURIComponent(t.id), m = typeof t.playlistCoverId == "string" ? encodeURIComponent(t.playlistCoverId) : null, c = t.title, i = t.poster || "hqdefault", g = t.announce || "Watch", I = t.alwaysLoadIframe ? t.autoplay && t.muted : !0, y = r.useMemo(() => {
    const v = new URLSearchParams({
      ...t.muted ? { mute: "1" } : {},
      ...I ? { autoplay: "1" } : {},
      ...t.enableJsApi ? { enablejsapi: "1" } : {},
      ...t.playlist ? { list: l } : {}
    });
    return t.params && new URLSearchParams(
      t.params.startsWith("&") ? t.params.slice(1) : t.params
    ).forEach((q, F) => {
      v.append(F, q);
    }), v;
  }, [t.muted, I, t.enableJsApi, t.playlist, l, t.params]), s = r.useMemo(
    () => t.cookie ? "https://www.youtube.com" : "https://www.youtube-nocookie.com",
    [t.cookie]
  ), U = r.useMemo(
    () => t.playlist ? `${s}/embed/videoseries?${y.toString()}` : `${s}/embed/${l}?${y.toString()}`,
    [t.playlist, s, l, y]
  ), S = !t.thumbnail && !t.playlist && i === "maxresdefault", b = t.webp ? "webp" : "jpg", w = t.webp ? "vi_webp" : "vi", k = S ? _(t.id, w, b, i) : null, $ = r.useMemo(
    () => t.thumbnail || k || `https://i.ytimg.com/${w}/${t.playlist ? m : l}/${i}.${b}`,
    [t.thumbnail, k, w, t.playlist, m, l, i, b]
  ), x = t.activatedClass || "lyt-activated", P = t.adNetwork || !1, T = t.aspectHeight || 9, W = t.aspectWidth || 16, L = t.iframeClass || "", N = t.playerClass || "lty-playbtn", j = t.wrapperClass || "yt-lite", C = r.useCallback(
    t.onIframeAdded || function() {
    },
    [t.onIframeAdded]
  ), A = t.rel ? "prefetch" : "preload", D = t.containerElement || "article", E = t.style || {}, M = t.noscriptFallback !== !1, O = () => {
    d || u(!0);
  }, Y = () => {
    e || o(!0);
  };
  return r.useEffect(() => {
    e && (C(), t.focusOnLoad && typeof a == "object" && (a != null && a.current) && a.current.focus());
  }, [e, C, t.focusOnLoad, a]), /* @__PURE__ */ h(f, { children: [
    /* @__PURE__ */ n("link", { rel: A, href: $, as: "image" }),
    /* @__PURE__ */ n(f, { children: d && /* @__PURE__ */ h(f, { children: [
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
          __html: V(
            t.id,
            c,
            $,
            s,
            t.seo
          )
        }
      }
    ),
    M && !t.playlist && /* @__PURE__ */ n("noscript", { children: /* @__PURE__ */ h(
      "a",
      {
        href: `https://www.youtube.com/watch?v=${t.id}`,
        "aria-label": `Watch ${c} on YouTube`,
        children: [
          'Watch "',
          c,
          '" on YouTube'
        ]
      }
    ) }),
    /* @__PURE__ */ h(
      D,
      {
        onPointerOver: O,
        onClick: Y,
        className: `${j} ${e ? x : ""}`,
        "data-title": c,
        role: e ? void 0 : "img",
        "aria-label": e ? void 0 : `${c} - YouTube video preview`,
        style: {
          backgroundImage: `url(${$})`,
          "--aspect-ratio": `${T / W * 100}%`,
          ...E
        },
        children: [
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              className: N,
              "aria-label": `${g} ${c}`,
              "aria-hidden": e || void 0,
              tabIndex: e ? -1 : 0,
              children: /* @__PURE__ */ n("span", { className: "lty-visually-hidden", children: g })
            }
          ),
          e && /* @__PURE__ */ n(
            "iframe",
            {
              ref: a,
              className: L,
              title: c,
              width: "560",
              height: "315",
              style: { border: 0 },
              allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
              allowFullScreen: !0,
              src: U,
              referrerPolicy: t.referrerPolicy || "strict-origin-when-cross-origin"
            }
          )
        ]
      }
    )
  ] });
}
const Q = r.forwardRef(
  z
);
export {
  Q as default
};
//# sourceMappingURL=index.es.js.map
