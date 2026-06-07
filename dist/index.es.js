/**
* react-lite-youtube-embed v3.6.0
*  git+https://github.com/ibrahimcesar/react-lite-youtube-embed.git
*
*  Copyright (c) Ibrahim Cesar <email@ibrahimcesar.com> and project contributors.
*
*  This source code is licensed under the MIT license found in the
*  LICENSE file in the root directory of this source tree.
*
*  Author site: https://ibrahimcesar.cloud
*/
import { jsxs as w, Fragment as D, jsx as i } from "react/jsx-runtime";
import * as l from "react";
import { useState as G, useEffect as z } from "react";
const q = {
  default: 120,
  mqdefault: 320,
  hqdefault: 480,
  sddefault: 640,
  maxresdefault: 1280
}, K = (e, t, u, s = "maxresdefault") => {
  const [a, r] = G("");
  return z(() => {
    const o = `https://img.youtube.com/${t}/${e}/${s}.${u}`, y = `https://img.youtube.com/${t}/${e}/hqdefault.${u}`, c = q[s], d = new Image();
    d.onload = () => {
      d.width < c ? r(y) : r(o);
    }, d.onerror = () => r(y), d.src = o;
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
  const [u, s] = l.useState(!1), [a, r] = l.useState(
    e.alwaysLoadIframe || e.autoplay || !1
  ), o = encodeURIComponent(e.id), y = typeof e.playlistCoverId == "string" ? encodeURIComponent(e.playlistCoverId) : null, c = e.title, d = e.poster || "hqdefault", $ = e.announce || "Watch", U = e.alwaysLoadIframe || e.autoplay ? e.autoplay && e.muted : !0, v = l.useMemo(() => {
    const E = new URLSearchParams({
      ...e.muted ? { mute: "1" } : {},
      ...U ? { autoplay: "1" } : {},
      ...e.enableJsApi ? { enablejsapi: "1" } : {},
      ...e.enableJsApi && typeof window < "u" ? { origin: window.location.origin } : {},
      ...e.playlist ? { list: o } : {}
    });
    return e.params && (typeof e.params == "string" ? new URLSearchParams(
      e.params.startsWith("&") ? e.params.slice(1) : e.params
    ).forEach((h, C) => {
      E.append(C, h);
    }) : Object.entries(e.params).forEach(([g, h]) => {
      E.append(g, String(h));
    })), E;
  }, [
    e.muted,
    U,
    e.enableJsApi,
    e.playlist,
    o,
    e.params
  ]), b = l.useMemo(
    () => e.cookie ? "https://www.youtube.com" : "https://www.youtube-nocookie.com",
    [e.cookie]
  ), M = l.useMemo(
    () => e.playlist ? `${b}/embed/videoseries?${v.toString()}` : `${b}/embed/${o}?${v.toString()}`,
    [e.playlist, b, o, v]
  ), _ = !e.thumbnail && !e.playlist && d === "maxresdefault", I = e.webp ? "webp" : "jpg", R = e.webp ? "vi_webp" : "vi", A = _ ? K(e.id, R, I, d) : null, k = l.useMemo(
    () => e.thumbnail || A || `https://i.ytimg.com/${R}/${e.playlist ? y : o}/${d}.${I}`,
    [
      e.thumbnail,
      A,
      R,
      e.playlist,
      y,
      o,
      d,
      I
    ]
  ), B = e.activatedClass || "lyt-activated", P = e.adNetwork || !1, W = e.aspectHeight || 9, j = e.aspectWidth || 16, x = e.iframeClass || "", F = e.playerClass || "lty-playbtn", Q = e.wrapperClass || "yt-lite", O = l.useCallback(
    e.onIframeAdded || function() {
    },
    [e.onIframeAdded]
  ), V = e.rel ? "prefetch" : "preload", Y = e.containerElement || "article", H = e.noscriptFallback !== !1, J = () => {
    u || s(!0);
  }, S = () => {
    a || r(!0);
  };
  return l.useEffect(() => {
    a && (O(), e.focusOnLoad && typeof t == "object" && t?.current && t.current.focus());
  }, [a, O, e.focusOnLoad, t]), l.useEffect(() => {
    if (!a || !e.enableJsApi || !(e.onReady || e.onStateChange || e.onError || e.onPlay || e.onPause || e.onEnd || e.onBuffering || e.onPlaybackRateChange || e.onPlaybackQualityChange))
      return;
    let g = !1, h = !1;
    const C = (m) => {
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
          g || (g = !0, e.onReady && e.onReady({
            videoId: e.id,
            title: c
          }));
          break;
        case "infoDelivery":
          if (n.info?.playerState !== void 0) {
            const f = n.info.playerState;
            switch (e.onStateChange && e.onStateChange({
              state: f,
              currentTime: n.info.currentTime,
              duration: n.info.duration
            }), f) {
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
          n.info?.playbackRate !== void 0 && e.onPlaybackRateChange?.(n.info.playbackRate), n.info?.playbackQuality !== void 0 && e.onPlaybackQualityChange?.(n.info.playbackQuality);
          break;
        case "onStateChange":
          if (n.info?.playerState !== void 0) {
            const f = n.info.playerState;
            switch (e.onStateChange && e.onStateChange({
              state: f,
              currentTime: n.info.currentTime,
              duration: n.info.duration
            }), f) {
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
            const f = n.info.errorCode;
            e.onError && e.onError(f);
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
    window.addEventListener("message", C);
    const L = [], N = () => {
      typeof t == "object" && t?.current?.contentWindow && t.current.contentWindow.postMessage(
        '{"event":"listening","id":"' + o + '"}',
        "*"
      );
    }, T = () => {
      if (h)
        return;
      h = !0, N(), [100, 300, 600, 1200, 2400].forEach((n) => {
        L.push(setTimeout(N, n));
      });
    };
    return typeof t == "object" && t?.current ? (t.current.addEventListener("load", T), t.current.contentDocument?.readyState === "complete" && T()) : [200, 500, 1e3, 2e3, 3e3].forEach((n) => {
      L.push(setTimeout(N, n));
    }), () => {
      window.removeEventListener("message", C), L.forEach(clearTimeout), typeof t == "object" && t?.current && t.current.removeEventListener("load", T);
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
    o,
    c,
    t
  ]), /* @__PURE__ */ w(D, { children: [
    !e.lazyLoad && /* @__PURE__ */ i("link", { rel: V, href: k, as: "image" }),
    /* @__PURE__ */ i(D, { children: u && /* @__PURE__ */ w(D, { children: [
      /* @__PURE__ */ i("link", { rel: "preconnect", href: b }),
      /* @__PURE__ */ i("link", { rel: "preconnect", href: "https://www.google.com" }),
      P && /* @__PURE__ */ w(D, { children: [
        /* @__PURE__ */ i("link", { rel: "preconnect", href: "https://static.doubleclick.net" }),
        /* @__PURE__ */ i(
          "link",
          {
            rel: "preconnect",
            href: "https://googleads.g.doubleclick.net"
          }
        )
      ] })
    ] }) }),
    e.seo && !e.playlist && /* @__PURE__ */ i(
      "script",
      {
        type: "application/ld+json",
        dangerouslySetInnerHTML: {
          __html: p(
            e.id,
            c,
            k,
            b,
            e.seo
          )
        }
      }
    ),
    H && !e.playlist && /* @__PURE__ */ i("noscript", { children: /* @__PURE__ */ w(
      "a",
      {
        href: `https://www.youtube.com/watch?v=${e.id}`,
        "aria-label": `Watch ${c} on YouTube`,
        children: [
          'Watch "',
          c,
          '" on YouTube'
        ]
      }
    ) }),
    /* @__PURE__ */ w(
      Y,
      {
        onPointerOver: J,
        onClick: S,
        className: `${Q} ${a ? B : ""}`,
        "data-title": c,
        role: !a && !e.lazyLoad ? "img" : void 0,
        "aria-label": a ? void 0 : `${c} - YouTube video preview`,
        style: {
          ...!e.lazyLoad && { backgroundImage: `url(${k})` },
          "--aspect-ratio": `${W / j * 100}%`,
          ...e.style || {}
        },
        children: [
          e.lazyLoad && !a && /* @__PURE__ */ i(
            "img",
            {
              src: k,
              alt: `${c} - YouTube thumbnail`,
              className: "lty-thumbnail",
              loading: "lazy"
            }
          ),
          e.playlist && !a && /* @__PURE__ */ i("div", { className: "lty-playlist-icon", "aria-hidden": "true" }),
          !(e.hideButtonOnActivate && a) && /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              className: F,
              "aria-label": `${$} ${c}`,
              "aria-hidden": a || void 0,
              tabIndex: a ? -1 : 0,
              onClick: S,
              children: /* @__PURE__ */ i("span", { className: "lty-visually-hidden", children: $ })
            }
          ),
          a && /* @__PURE__ */ i(
            "iframe",
            {
              ref: t,
              className: x,
              title: c,
              width: "560",
              height: "315",
              allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
              allowFullScreen: !0,
              src: M,
              referrerPolicy: e.referrerPolicy || "strict-origin-when-cross-origin"
            }
          )
        ]
      }
    )
  ] });
}
const ne = l.forwardRef(
  ee
);
export {
  Z as PlayerError,
  X as PlayerState,
  ne as default
};
//# sourceMappingURL=index.es.js.map
