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
import { jsxs as b, Fragment as $, jsx as n } from "react/jsx-runtime";
import * as i from "react";
import { useState as z, useEffect as F } from "react";
const J = {
  default: 120,
  mqdefault: 320,
  hqdefault: 480,
  sddefault: 640,
  maxresdefault: 1280
}, R = (t, a, o, r = "maxresdefault") => {
  const [e, u] = z("");
  return F(() => {
    const c = `https://img.youtube.com/${a}/${t}/${r}.${o}`, m = `https://img.youtube.com/${a}/${t}/hqdefault.${o}`, l = J[r], d = new Image();
    d.onload = () => {
      d.width < l ? u(m) : u(c);
    }, d.onerror = () => u(m), d.src = c;
  }, [t, a, o, r]), e;
};
function V(t, a, o, r, e) {
  const u = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: (e == null ? void 0 : e.name) || a,
    thumbnailUrl: [(e == null ? void 0 : e.thumbnailUrl) || o],
    embedUrl: (e == null ? void 0 : e.embedUrl) || `${r}/embed/${t}`,
    contentUrl: (e == null ? void 0 : e.contentUrl) || `https://www.youtube.com/watch?v=${t}`,
    ...(e == null ? void 0 : e.description) && { description: e.description },
    ...(e == null ? void 0 : e.uploadDate) && { uploadDate: e.uploadDate },
    ...(e == null ? void 0 : e.duration) && { duration: e.duration }
  };
  return JSON.stringify(u);
}
function _(t, a) {
  const [o, r] = i.useState(!1), [e, u] = i.useState(t.alwaysLoadIframe || !1), c = encodeURIComponent(t.id), m = typeof t.playlistCoverId == "string" ? encodeURIComponent(t.playlistCoverId) : null, l = t.title, d = t.poster || "hqdefault", v = t.announce || "Watch", U = t.alwaysLoadIframe ? t.autoplay && t.muted : !0, k = i.useMemo(() => {
    const y = new URLSearchParams({
      ...t.muted ? { mute: "1" } : {},
      ...U ? { autoplay: "1" } : {},
      ...t.enableJsApi ? { enablejsapi: "1" } : {},
      ...t.playlist ? { list: c } : {}
    });
    return t.params && new URLSearchParams(
      t.params.startsWith("&") ? t.params.slice(1) : t.params
    ).forEach((g, f) => {
      y.append(f, g);
    }), y;
  }, [t.muted, U, t.enableJsApi, t.playlist, c, t.params]), h = i.useMemo(
    () => t.cookie ? "https://www.youtube.com" : "https://www.youtube-nocookie.com",
    [t.cookie]
  ), E = i.useMemo(
    () => t.playlist ? `${h}/embed/videoseries?${k.toString()}` : `${h}/embed/${c}?${k.toString()}`,
    [t.playlist, h, c, k]
  ), P = !t.thumbnail && !t.playlist && d === "maxresdefault", I = t.webp ? "webp" : "jpg", C = t.webp ? "vi_webp" : "vi", S = P ? R(t.id, C, I, d) : null, w = i.useMemo(
    () => t.thumbnail || S || `https://i.ytimg.com/${C}/${t.playlist ? m : c}/${d}.${I}`,
    [t.thumbnail, S, C, t.playlist, m, c, d, I]
  ), W = t.activatedClass || "lyt-activated", N = t.adNetwork || !1, T = t.aspectHeight || 9, j = t.aspectWidth || 16, O = t.iframeClass || "", A = t.playerClass || "lty-playbtn", M = t.wrapperClass || "yt-lite", L = i.useCallback(
    t.onIframeAdded || function() {
    },
    [t.onIframeAdded]
  ), D = t.resourceHint || (t.rel ? "prefetch" : "preload"), Y = t.containerElement || "article", H = t.noscriptFallback !== !1, q = () => {
    o || r(!0);
  }, x = () => {
    e || u(!0);
  };
  return i.useEffect(() => {
    e && (L(), t.focusOnLoad && typeof a == "object" && (a != null && a.current) && a.current.focus());
  }, [e, L, t.focusOnLoad, a]), i.useEffect(() => {
    if (!t.stopOnEnd || !e) return;
    const y = (s) => {
      var g;
      if (!(s.origin !== "https://www.youtube.com" && s.origin !== "https://www.youtube-nocookie.com"))
        try {
          const f = typeof s.data == "string" ? JSON.parse(s.data) : s.data;
          f.info && f.info.playerState === 0 && typeof a == "object" && (g = a == null ? void 0 : a.current) != null && g.contentWindow && a.current.contentWindow.postMessage(
            '{"event":"command","func":"stopVideo","args":""}',
            "*"
          );
        } catch {
        }
    };
    return window.addEventListener("message", y), () => window.removeEventListener("message", y);
  }, [t.stopOnEnd, e, a]), /* @__PURE__ */ b($, { children: [
    !t.lazyLoad && /* @__PURE__ */ n("link", { rel: D, href: w, as: "image" }),
    /* @__PURE__ */ n($, { children: o && /* @__PURE__ */ b($, { children: [
      /* @__PURE__ */ n("link", { rel: "preconnect", href: h }),
      /* @__PURE__ */ n("link", { rel: "preconnect", href: "https://www.google.com" }),
      N && /* @__PURE__ */ b($, { children: [
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
            l,
            w,
            h,
            t.seo
          )
        }
      }
    ),
    H && !t.playlist && /* @__PURE__ */ n("noscript", { children: /* @__PURE__ */ b(
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
    /* @__PURE__ */ b(
      Y,
      {
        onPointerOver: q,
        onClick: x,
        className: `${M} ${e ? W : ""}`,
        "data-title": l,
        role: e ? void 0 : "img",
        "aria-label": e ? void 0 : `${l} - YouTube video preview`,
        style: {
          ...!t.lazyLoad && { backgroundImage: `url(${w})` },
          "--aspect-ratio": `${T / j * 100}%`,
          ...t.style || {}
        },
        children: [
          t.lazyLoad && !e && /* @__PURE__ */ n(
            "img",
            {
              src: w,
              alt: `${l} - YouTube thumbnail`,
              className: "lty-thumbnail",
              loading: "lazy"
            }
          ),
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              className: A,
              "aria-label": `${v} ${l}`,
              "aria-hidden": e || void 0,
              tabIndex: e ? -1 : 0,
              onClick: x,
              children: /* @__PURE__ */ n("span", { className: "lty-visually-hidden", children: v })
            }
          ),
          e && /* @__PURE__ */ n(
            "iframe",
            {
              ref: a,
              className: O,
              title: l,
              width: "560",
              height: "315",
              style: { border: 0 },
              allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
              allowFullScreen: !0,
              src: E,
              referrerPolicy: t.referrerPolicy || "strict-origin-when-cross-origin"
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
