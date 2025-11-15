/**
* @ibrahimcesar/react-lite-youtube-embed v3.1.0
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
import { useState as Q, useEffect as q } from "react";
const z = {
  default: 120,
  mqdefault: 320,
  hqdefault: 480,
  sddefault: 640,
  maxresdefault: 1280
}, K = (e, t, u, s = "maxresdefault") => {
  const [a, r] = Q("");
  return q(() => {
    const l = `https://img.youtube.com/${t}/${e}/${s}.${u}`, f = `https://img.youtube.com/${t}/${e}/hqdefault.${u}`, i = z[s], d = new Image();
    d.onload = () => {
      d.width < i ? r(f) : r(l);
    }, d.onerror = () => r(f), d.src = l;
  }, [e, t, u, s]), a;
};
var X = /* @__PURE__ */ ((e) => (e[e.UNSTARTED = -1] = "UNSTARTED", e[e.ENDED = 0] = "ENDED", e[e.PLAYING = 1] = "PLAYING", e[e.PAUSED = 2] = "PAUSED", e[e.BUFFERING = 3] = "BUFFERING", e[e.CUED = 5] = "CUED", e))(X || {}), Z = /* @__PURE__ */ ((e) => (e[e.INVALID_PARAM = 2] = "INVALID_PARAM", e[e.HTML5_ERROR = 5] = "HTML5_ERROR", e[e.VIDEO_NOT_FOUND = 100] = "VIDEO_NOT_FOUND", e[e.NOT_EMBEDDABLE = 101] = "NOT_EMBEDDABLE", e[e.NOT_EMBEDDABLE_DISGUISED = 150] = "NOT_EMBEDDABLE_DISGUISED", e))(Z || {});
function p(e, t, u, s, a) {
  const r = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: a?.name || t,
    thumbnailUrl: [a?.thumbnailUrl || u],
    embedUrl: a?.embedUrl || `${s}/embed/${e}`,
    contentUrl: a?.contentUrl || `https://www.youtube.com/watch?v=${e}`,
    ...a?.description && { description: a.description },
    ...a?.uploadDate && { uploadDate: a.uploadDate },
    ...a?.duration && { duration: a.duration }
  };
  return JSON.stringify(r);
}
function ee(e, t) {
  const [u, s] = o.useState(!1), [a, r] = o.useState(e.alwaysLoadIframe || !1), l = encodeURIComponent(e.id), f = typeof e.playlistCoverId == "string" ? encodeURIComponent(e.playlistCoverId) : null, i = e.title, d = e.poster || "hqdefault", U = e.announce || "Watch", T = e.alwaysLoadIframe ? e.autoplay && e.muted : !0, C = o.useMemo(() => {
    const v = new URLSearchParams({
      ...e.muted ? { mute: "1" } : {},
      ...T ? { autoplay: "1" } : {},
      ...e.enableJsApi ? { enablejsapi: "1" } : {},
      ...e.playlist ? { list: l } : {}
    });
    return e.params && new URLSearchParams(
      e.params.startsWith("&") ? e.params.slice(1) : e.params
    ).forEach((g, w) => {
      v.append(w, g);
    }), v;
  }, [
    e.muted,
    T,
    e.enableJsApi,
    e.playlist,
    l,
    e.params
  ]), h = o.useMemo(
    () => e.cookie ? "https://www.youtube.com" : "https://www.youtube-nocookie.com",
    [e.cookie]
  ), _ = o.useMemo(
    () => e.playlist ? `${h}/embed/videoseries?${C.toString()}` : `${h}/embed/${l}?${C.toString()}`,
    [e.playlist, h, l, C]
  ), M = !e.thumbnail && !e.playlist && d === "maxresdefault", D = e.webp ? "webp" : "jpg", I = e.webp ? "vi_webp" : "vi", A = M ? K(e.id, I, D, d) : null, y = o.useMemo(
    () => e.thumbnail || A || `https://i.ytimg.com/${I}/${e.playlist ? f : l}/${d}.${D}`,
    [
      e.thumbnail,
      A,
      I,
      e.playlist,
      f,
      l,
      d,
      D
    ]
  ), B = e.activatedClass || "lyt-activated", W = e.adNetwork || !1, j = e.aspectHeight || 9, x = e.aspectWidth || 16, P = e.iframeClass || "", F = e.playerClass || "lty-playbtn", Y = e.wrapperClass || "yt-lite", O = o.useCallback(
    e.onIframeAdded || function() {
    },
    [e.onIframeAdded]
  ), H = e.rel ? "prefetch" : "preload", V = e.containerElement || "article", G = e.noscriptFallback !== !1, J = () => {
    u || s(!0);
  }, S = () => {
    a || r(!0);
  };
  return o.useEffect(() => {
    a && (O(), e.focusOnLoad && typeof t == "object" && t?.current && t.current.focus());
  }, [a, O, e.focusOnLoad, t]), o.useEffect(() => {
    if (!a || !e.enableJsApi || !(e.onReady || e.onStateChange || e.onError || e.onPlay || e.onPause || e.onEnd || e.onBuffering || e.onPlaybackRateChange || e.onPlaybackQualityChange))
      return;
    let $ = !1, g = !1;
    const w = (m) => {
      if (m.origin !== "https://www.youtube.com" && m.origin !== "https://www.youtube-nocookie.com")
        return;
      let n;
      try {
        n = typeof m.data == "string" ? JSON.parse(m.data) : m.data;
      } catch {
        return;
      }
      switch (n.event) {
        case "onReady":
          $ || ($ = !0, e.onReady && e.onReady({
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
                e.onEnd?.(), e.stopOnEnd && typeof t == "object" && t?.current?.contentWindow && t.current.contentWindow.postMessage(
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
    window.addEventListener("message", w);
    const L = [], N = () => {
      typeof t == "object" && t?.current?.contentWindow && t.current.contentWindow.postMessage(
        '{"event":"listening","id":"' + l + '"}',
        "*"
      );
    }, R = () => {
      if (g) return;
      g = !0, N(), [100, 300, 600, 1200, 2400].forEach((n) => {
        L.push(setTimeout(N, n));
      });
    };
    return typeof t == "object" && t?.current ? (t.current.addEventListener("load", R), t.current.contentDocument?.readyState === "complete" && R()) : [200, 500, 1e3, 2e3, 3e3].forEach((n) => {
      L.push(setTimeout(N, n));
    }), () => {
      window.removeEventListener("message", w), L.forEach(clearTimeout), typeof t == "object" && t?.current && t.current.removeEventListener("load", R);
    };
  }, [
    a,
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
    t
  ]), /* @__PURE__ */ b(k, { children: [
    !e.lazyLoad && /* @__PURE__ */ c("link", { rel: H, href: y, as: "image" }),
    /* @__PURE__ */ c(k, { children: u && /* @__PURE__ */ b(k, { children: [
      /* @__PURE__ */ c("link", { rel: "preconnect", href: h }),
      /* @__PURE__ */ c("link", { rel: "preconnect", href: "https://www.google.com" }),
      W && /* @__PURE__ */ b(k, { children: [
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
          __html: p(
            e.id,
            i,
            y,
            h,
            e.seo
          )
        }
      }
    ),
    G && !e.playlist && /* @__PURE__ */ c("noscript", { children: /* @__PURE__ */ b(
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
      V,
      {
        onPointerOver: J,
        onClick: S,
        className: `${Y} ${a ? B : ""}`,
        "data-title": i,
        role: a ? void 0 : "img",
        "aria-label": a ? void 0 : `${i} - YouTube video preview`,
        style: {
          ...!e.lazyLoad && { backgroundImage: `url(${y})` },
          "--aspect-ratio": `${j / x * 100}%`,
          ...e.style || {}
        },
        children: [
          e.lazyLoad && !a && /* @__PURE__ */ c(
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
              className: F,
              "aria-label": `${U} ${i}`,
              "aria-hidden": a || void 0,
              tabIndex: a ? -1 : 0,
              onClick: S,
              children: /* @__PURE__ */ c("span", { className: "lty-visually-hidden", children: U })
            }
          ),
          a && /* @__PURE__ */ c(
            "iframe",
            {
              ref: t,
              className: P,
              title: i,
              width: "560",
              height: "315",
              allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
              allowFullScreen: !0,
              src: _,
              referrerPolicy: e.referrerPolicy || "strict-origin-when-cross-origin"
            }
          )
        ]
      }
    )
  ] });
}
const ne = o.forwardRef(
  ee
);
export {
  Z as PlayerError,
  X as PlayerState,
  ne as default
};
//# sourceMappingURL=index.es.js.map
