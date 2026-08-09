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
import { jsxs as w, Fragment as D, jsx as c } from "react/jsx-runtime";
import * as d from "react";
import { useState as q, useEffect as K } from "react";
const X = {
  default: 120,
  mqdefault: 320,
  hqdefault: 480,
  sddefault: 640,
  maxresdefault: 1280
}, Z = (e, t, s, r = "maxresdefault") => {
  const [a, m] = q("");
  return K(() => {
    const l = `https://img.youtube.com/${t}/${e}/${r}.${s}`, b = `https://img.youtube.com/${t}/${e}/hqdefault.${s}`, o = X[r], u = new Image();
    u.onload = () => {
      u.width < o ? m(b) : m(l);
    }, u.onerror = () => m(b), u.src = l;
  }, [e, t, s, r]), a;
};
var p = /* @__PURE__ */ ((e) => (e[e.UNSTARTED = -1] = "UNSTARTED", e[e.ENDED = 0] = "ENDED", e[e.PLAYING = 1] = "PLAYING", e[e.PAUSED = 2] = "PAUSED", e[e.BUFFERING = 3] = "BUFFERING", e[e.CUED = 5] = "CUED", e))(p || {}), ee = /* @__PURE__ */ ((e) => (e[e.INVALID_PARAM = 2] = "INVALID_PARAM", e[e.HTML5_ERROR = 5] = "HTML5_ERROR", e[e.VIDEO_NOT_FOUND = 100] = "VIDEO_NOT_FOUND", e[e.NOT_EMBEDDABLE = 101] = "NOT_EMBEDDABLE", e[e.NOT_EMBEDDABLE_DISGUISED = 150] = "NOT_EMBEDDABLE_DISGUISED", e))(ee || {});
function te(e, t, s, r, a) {
  const m = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: a?.name || t,
    thumbnailUrl: [a?.thumbnailUrl || s],
    embedUrl: a?.embedUrl || `${r}/embed/${e}`,
    contentUrl: a?.contentUrl || `https://www.youtube.com/watch?v=${e}`,
    ...a?.description && { description: a.description },
    ...a?.uploadDate && { uploadDate: a.uploadDate },
    ...a?.duration && { duration: a.duration }
  };
  return JSON.stringify(m);
}
function ae(e, t) {
  const [s, r] = d.useState(!1), [a, m] = d.useState(
    e.alwaysLoadIframe || e.autoplay || !1
  ), l = encodeURIComponent(e.id), b = typeof e.playlistCoverId == "string" ? encodeURIComponent(e.playlistCoverId) : null, o = e.title, u = e.poster || "hqdefault", U = e.announce || "Watch", A = e.alwaysLoadIframe || e.autoplay ? e.autoplay && e.muted : !0, I = d.useMemo(() => {
    const E = new URLSearchParams({
      ...e.muted ? { mute: "1" } : {},
      ...A ? { autoplay: "1" } : {},
      ...e.enableJsApi ? { enablejsapi: "1" } : {},
      ...e.enableJsApi && typeof window < "u" ? { origin: window.location.origin } : {},
      ...e.playlist ? { list: l } : {}
    });
    return e.params && (typeof e.params == "string" ? new URLSearchParams(
      e.params.startsWith("&") ? e.params.slice(1) : e.params
    ).forEach((y, C) => {
      E.append(C, y);
    }) : Object.entries(e.params).forEach(([g, y]) => {
      E.append(g, String(y));
    })), E;
  }, [
    e.muted,
    A,
    e.enableJsApi,
    e.playlist,
    l,
    e.params
  ]), h = d.useMemo(
    () => e.cookie ? "https://www.youtube.com" : "https://www.youtube-nocookie.com",
    [e.cookie]
  ), B = d.useMemo(
    () => e.playlist ? `${h}/embed/videoseries?${I.toString()}` : `${h}/embed/${l}?${I.toString()}`,
    [e.playlist, h, l, I]
  ), P = !e.thumbnail && !e.playlist && u === "maxresdefault", N = e.webp ? "webp" : "jpg", R = e.webp ? "vi_webp" : "vi", O = P ? Z(e.id, R, N, u) : null, k = d.useMemo(
    () => e.thumbnail || O || `https://i.ytimg.com/${R}/${e.playlist ? b : l}/${u}.${N}`,
    [
      e.thumbnail,
      O,
      R,
      e.playlist,
      b,
      l,
      u,
      N
    ]
  ), W = e.activatedClass || "lyt-activated", j = e.adNetwork || !1, x = e.aspectHeight || 9, F = e.aspectWidth || 16, Q = e.iframeClass || "", V = e.playerClass || "lty-playbtn", Y = e.wrapperClass || "yt-lite", S = d.useCallback(
    e.onIframeAdded || function() {
    },
    [e.onIframeAdded]
  ), H = e.rel ? "prefetch" : "preload", J = e.containerElement || "article", G = e.noscriptFallback !== !1, z = () => {
    s || r(!0);
  }, M = () => {
    a || m(!0);
  };
  return d.useEffect(() => {
    a && (S(), e.focusOnLoad && typeof t == "object" && t?.current && t.current.focus());
  }, [a, S, e.focusOnLoad, t]), d.useEffect(() => {
    if (!a || !e.enableJsApi || !(e.onReady || e.onStateChange || e.onError || e.onPlay || e.onPause || e.onEnd || e.onBuffering || e.onPlaybackRateChange || e.onPlaybackQualityChange))
      return;
    let g = !1, y = !1;
    const C = (f) => {
      if (f.origin !== "https://www.youtube.com" && f.origin !== "https://www.youtube-nocookie.com")
        return;
      let n;
      try {
        n = typeof f.data == "string" ? JSON.parse(f.data) : f.data;
      } catch {
        return;
      }
      switch (n.event) {
        case "onReady":
          g || (g = !0, e.onReady && e.onReady({
            videoId: e.id,
            title: o
          }));
          break;
        case "infoDelivery":
          if (n.info?.playerState !== void 0) {
            const i = n.info.playerState;
            switch (e.onStateChange && e.onStateChange({
              state: i,
              currentTime: n.info.currentTime,
              duration: n.info.duration
            }), i) {
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
            const i = n.info.playerState;
            switch (e.onStateChange && e.onStateChange({
              state: i,
              currentTime: n.info.currentTime,
              duration: n.info.duration
            }), i) {
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
        case "onError": {
          const i = n.info;
          let v;
          if (typeof i == "number" || typeof i == "string") {
            const _ = Number(i);
            Number.isNaN(_) || (v = _);
          } else i !== null && typeof i == "object" && "errorCode" in i && typeof i.errorCode == "number" && (v = i.errorCode);
          v !== void 0 && e.onError && e.onError(v);
          break;
        }
        case "onPlaybackRateChange":
          n.info?.playbackRate !== void 0 && e.onPlaybackRateChange?.(n.info.playbackRate);
          break;
        case "onPlaybackQualityChange":
          n.info?.playbackQuality !== void 0 && e.onPlaybackQualityChange?.(n.info.playbackQuality);
          break;
      }
    };
    window.addEventListener("message", C);
    const L = [], T = () => {
      typeof t == "object" && t?.current?.contentWindow && t.current.contentWindow.postMessage(
        '{"event":"listening","id":"' + l + '"}',
        "*"
      );
    }, $ = () => {
      if (y)
        return;
      y = !0, T(), [100, 300, 600, 1200, 2400].forEach((n) => {
        L.push(setTimeout(T, n));
      });
    };
    return typeof t == "object" && t?.current ? (t.current.addEventListener("load", $), t.current.contentDocument?.readyState === "complete" && $()) : [200, 500, 1e3, 2e3, 3e3].forEach((n) => {
      L.push(setTimeout(T, n));
    }), () => {
      window.removeEventListener("message", C), L.forEach(clearTimeout), typeof t == "object" && t?.current && t.current.removeEventListener("load", $);
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
    o,
    t
  ]), /* @__PURE__ */ w(D, { children: [
    !e.lazyLoad && /* @__PURE__ */ c("link", { rel: H, href: k, as: "image" }),
    /* @__PURE__ */ c(D, { children: s && /* @__PURE__ */ w(D, { children: [
      /* @__PURE__ */ c("link", { rel: "preconnect", href: h }),
      /* @__PURE__ */ c("link", { rel: "preconnect", href: "https://www.google.com" }),
      j && /* @__PURE__ */ w(D, { children: [
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
          __html: te(
            e.id,
            o,
            k,
            h,
            e.seo
          )
        }
      }
    ),
    G && !e.playlist && /* @__PURE__ */ c("noscript", { children: /* @__PURE__ */ w(
      "a",
      {
        href: `https://www.youtube.com/watch?v=${e.id}`,
        "aria-label": `Watch ${o} on YouTube`,
        children: [
          'Watch "',
          o,
          '" on YouTube'
        ]
      }
    ) }),
    /* @__PURE__ */ w(
      J,
      {
        onPointerOver: z,
        onClick: M,
        className: `${Y} ${a ? W : ""}`,
        "data-title": o,
        role: !a && !e.lazyLoad ? "img" : void 0,
        "aria-label": a ? void 0 : `${o} - YouTube video preview`,
        style: {
          ...!e.lazyLoad && { backgroundImage: `url(${k})` },
          "--aspect-ratio": `${x / F * 100}%`,
          ...e.style || {}
        },
        children: [
          e.lazyLoad && !a && /* @__PURE__ */ c(
            "img",
            {
              src: k,
              alt: `${o} - YouTube thumbnail`,
              className: "lty-thumbnail",
              loading: "lazy"
            }
          ),
          e.playlist && !a && /* @__PURE__ */ c("div", { className: "lty-playlist-icon", "aria-hidden": "true" }),
          !(e.hideButtonOnActivate && a) && /* @__PURE__ */ c(
            "button",
            {
              type: "button",
              className: V,
              "aria-label": `${U} ${o}`,
              "aria-hidden": a || void 0,
              tabIndex: a ? -1 : 0,
              onClick: M,
              children: /* @__PURE__ */ c("span", { className: "lty-visually-hidden", children: U })
            }
          ),
          a && /* @__PURE__ */ c(
            "iframe",
            {
              ref: t,
              className: Q,
              title: o,
              width: "560",
              height: "315",
              allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
              allowFullScreen: !0,
              src: B,
              referrerPolicy: e.referrerPolicy || "strict-origin-when-cross-origin"
            }
          )
        ]
      }
    )
  ] });
}
const ce = d.forwardRef(
  ae
);
export {
  ee as PlayerError,
  p as PlayerState,
  ce as default
};
//# sourceMappingURL=index.es.js.map
