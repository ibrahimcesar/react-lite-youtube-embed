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
import { jsxs as b, Fragment as k, jsx as c } from "react/jsx-runtime";
import * as o from "react";
import { useState as G, useEffect as J } from "react";
const Q = {
  default: 120,
  mqdefault: 320,
  hqdefault: 480,
  sddefault: 640,
  maxresdefault: 1280
}, q = (e, a, u, s = "maxresdefault") => {
  const [t, m] = G("");
  return J(() => {
    const l = `https://img.youtube.com/${a}/${e}/${s}.${u}`, r = `https://img.youtube.com/${a}/${e}/hqdefault.${u}`, i = Q[s], d = new Image();
    d.onload = () => {
      d.width < i ? m(r) : m(l);
    }, d.onerror = () => m(r), d.src = l;
  }, [e, a, u, s]), t;
};
var z = /* @__PURE__ */ ((e) => (e[e.UNSTARTED = -1] = "UNSTARTED", e[e.ENDED = 0] = "ENDED", e[e.PLAYING = 1] = "PLAYING", e[e.PAUSED = 2] = "PAUSED", e[e.BUFFERING = 3] = "BUFFERING", e[e.CUED = 5] = "CUED", e))(z || {}), K = /* @__PURE__ */ ((e) => (e[e.INVALID_PARAM = 2] = "INVALID_PARAM", e[e.HTML5_ERROR = 5] = "HTML5_ERROR", e[e.VIDEO_NOT_FOUND = 100] = "VIDEO_NOT_FOUND", e[e.NOT_EMBEDDABLE = 101] = "NOT_EMBEDDABLE", e[e.NOT_EMBEDDABLE_DISGUISED = 150] = "NOT_EMBEDDABLE_DISGUISED", e))(K || {});
function X(e, a, u, s, t) {
  const m = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: t?.name || a,
    thumbnailUrl: [t?.thumbnailUrl || u],
    embedUrl: t?.embedUrl || `${s}/embed/${e}`,
    contentUrl: t?.contentUrl || `https://www.youtube.com/watch?v=${e}`,
    ...t?.description && { description: t.description },
    ...t?.uploadDate && { uploadDate: t.uploadDate },
    ...t?.duration && { duration: t.duration }
  };
  return JSON.stringify(m);
}
function Z(e, a) {
  const [u, s] = o.useState(!1), [t, m] = o.useState(e.alwaysLoadIframe || !1), l = encodeURIComponent(e.id), r = typeof e.playlistCoverId == "string" ? encodeURIComponent(e.playlistCoverId) : null, i = e.title, d = e.poster || "hqdefault", R = e.announce || "Watch", U = e.alwaysLoadIframe ? e.autoplay && e.muted : !0, C = o.useMemo(() => {
    const $ = new URLSearchParams({
      ...e.muted ? { mute: "1" } : {},
      ...U ? { autoplay: "1" } : {},
      ...e.enableJsApi ? { enablejsapi: "1" } : {},
      ...e.playlist ? { list: l } : {}
    });
    return e.params && new URLSearchParams(
      e.params.startsWith("&") ? e.params.slice(1) : e.params
    ).forEach((g, w) => {
      $.append(w, g);
    }), $;
  }, [
    e.muted,
    U,
    e.enableJsApi,
    e.playlist,
    l,
    e.params
  ]), f = o.useMemo(
    () => e.cookie ? "https://www.youtube.com" : "https://www.youtube-nocookie.com",
    [e.cookie]
  ), L = o.useMemo(
    () => e.playlist ? `${f}/embed/videoseries?${C.toString()}` : `${f}/embed/${l}?${C.toString()}`,
    [e.playlist, f, l, C]
  ), O = !e.thumbnail && !e.playlist && d === "maxresdefault", I = e.webp ? "webp" : "jpg", D = e.webp ? "vi_webp" : "vi", v = O ? q(e.id, D, I, d) : null, y = o.useMemo(
    () => e.thumbnail || v || `https://i.ytimg.com/${D}/${e.playlist ? r : l}/${d}.${I}`,
    [
      e.thumbnail,
      v,
      D,
      e.playlist,
      r,
      l,
      d,
      I
    ]
  ), S = e.activatedClass || "lyt-activated", _ = e.adNetwork || !1, M = e.aspectHeight || 9, B = e.aspectWidth || 16, W = e.iframeClass || "", x = e.playerClass || "lty-playbtn", P = e.wrapperClass || "yt-lite", T = o.useCallback(
    e.onIframeAdded || function() {
    },
    [e.onIframeAdded]
  ), F = e.rel ? "prefetch" : "preload", j = e.containerElement || "article", Y = e.noscriptFallback !== !1, H = () => {
    u || s(!0);
  }, A = () => {
    t || m(!0);
  };
  return o.useEffect(() => {
    t && (T(), e.focusOnLoad && typeof a == "object" && a?.current && a.current.focus());
  }, [t, T, e.focusOnLoad, a]), o.useEffect(() => {
    if (!t || !e.enableJsApi || !(e.onReady || e.onStateChange || e.onError || e.onPlay || e.onPause || e.onEnd || e.onBuffering || e.onPlaybackRateChange || e.onPlaybackQualityChange))
      return;
    let N = !1;
    const g = (h) => {
      if (h.origin !== "https://www.youtube.com" && h.origin !== "https://www.youtube-nocookie.com")
        return;
      let n;
      try {
        n = typeof h.data == "string" ? JSON.parse(h.data) : h.data;
      } catch {
        return;
      }
      switch (n.event) {
        case "onReady":
          N || (N = !0, e.onReady && e.onReady({
            videoId: e.id,
            title: i
          }));
          break;
        case "onStateChange":
          if (n.info?.playerState !== void 0) {
            const E = n.info.playerState;
            switch (e.onStateChange && e.onStateChange({
              state: E,
              currentTime: n.info.currentTime,
              duration: n.info.duration
            }), E) {
              case 1:
                e.onPlay?.();
                break;
              case 2:
                e.onPause?.();
                break;
              case 0:
                e.onEnd?.(), e.stopOnEnd && typeof a == "object" && a?.current?.contentWindow && a.current.contentWindow.postMessage(
                  '{"event":"command","func":"stopVideo","args":""}',
                  "*"
                );
                break;
              case 3:
                e.onBuffering?.();
                break;
            }
          }
          break;
        case "onError":
          if (n.info && "errorCode" in n.info) {
            const E = n.info.errorCode;
            e.onError && e.onError(E);
          }
          break;
        case "onPlaybackRateChange":
          n.info?.playbackRate !== void 0 && e.onPlaybackRateChange?.(n.info.playbackRate);
          break;
        case "onPlaybackQualityChange":
          n.info?.playbackQuality !== void 0 && e.onPlaybackQualityChange?.(n.info.playbackQuality);
          break;
      }
    };
    window.addEventListener("message", g);
    const w = () => {
      typeof a == "object" && a?.current?.contentWindow && a.current.contentWindow.postMessage(
        '{"event":"listening","id":"' + l + '"}',
        "*"
      );
    };
    w();
    const V = setTimeout(w, 100);
    return () => {
      window.removeEventListener("message", g), clearTimeout(V);
    };
  }, [
    t,
    e.enableJsApi,
    e.onReady,
    e.onStateChange,
    e.onError,
    e.onPlay,
    e.onPause,
    e.onEnd,
    e.onBuffering,
    e.onPlaybackRateChange,
    e.onPlaybackQualityChange,
    e.stopOnEnd,
    e.id,
    l,
    i,
    a
  ]), /* @__PURE__ */ b(k, { children: [
    !e.lazyLoad && /* @__PURE__ */ c("link", { rel: F, href: y, as: "image" }),
    /* @__PURE__ */ c(k, { children: u && /* @__PURE__ */ b(k, { children: [
      /* @__PURE__ */ c("link", { rel: "preconnect", href: f }),
      /* @__PURE__ */ c("link", { rel: "preconnect", href: "https://www.google.com" }),
      _ && /* @__PURE__ */ b(k, { children: [
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
    e.seo && !e.playlist && /* @__PURE__ */ c(
      "script",
      {
        type: "application/ld+json",
        dangerouslySetInnerHTML: {
          __html: X(
            e.id,
            i,
            y,
            f,
            e.seo
          )
        }
      }
    ),
    Y && !e.playlist && /* @__PURE__ */ c("noscript", { children: /* @__PURE__ */ b(
      "a",
      {
        href: `https://www.youtube.com/watch?v=${e.id}`,
        "aria-label": `Watch ${i} on YouTube`,
        children: [
          'Watch "',
          i,
          '" on YouTube'
        ]
      }
    ) }),
    /* @__PURE__ */ b(
      j,
      {
        onPointerOver: H,
        onClick: A,
        className: `${P} ${t ? S : ""}`,
        "data-title": i,
        role: t ? void 0 : "img",
        "aria-label": t ? void 0 : `${i} - YouTube video preview`,
        style: {
          ...!e.lazyLoad && { backgroundImage: `url(${y})` },
          "--aspect-ratio": `${M / B * 100}%`,
          ...e.style || {}
        },
        children: [
          e.lazyLoad && !t && /* @__PURE__ */ c(
            "img",
            {
              src: y,
              alt: `${i} - YouTube thumbnail`,
              className: "lty-thumbnail",
              loading: "lazy"
            }
          ),
          /* @__PURE__ */ c(
            "button",
            {
              type: "button",
              className: x,
              "aria-label": `${R} ${i}`,
              "aria-hidden": t || void 0,
              tabIndex: t ? -1 : 0,
              onClick: A,
              children: /* @__PURE__ */ c("span", { className: "lty-visually-hidden", children: R })
            }
          ),
          t && /* @__PURE__ */ c(
            "iframe",
            {
              ref: a,
              className: W,
              title: i,
              width: "560",
              height: "315",
              allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
              allowFullScreen: !0,
              src: L,
              referrerPolicy: e.referrerPolicy || "strict-origin-when-cross-origin"
            }
          )
        ]
      }
    )
  ] });
}
const te = o.forwardRef(
  Z
);
export {
  K as PlayerError,
  z as PlayerState,
  te as default
};
//# sourceMappingURL=index.es.js.map
