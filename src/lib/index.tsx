import * as React from "react";
import useYoutubeThumbnail from "./useYoutubeThumbnail";
import { imgResolution } from "./useYoutubeThumbnail";

// Re-export types for public API
export type { imgResolution };

/**
 * YouTube Player State constants
 * @see https://developers.google.com/youtube/iframe_api_reference#onStateChange
 */
export enum PlayerState {
  UNSTARTED = -1,
  ENDED = 0,
  PLAYING = 1,
  PAUSED = 2,
  BUFFERING = 3,
  CUED = 5,
}

/**
 * YouTube Player Error codes
 * @see https://developers.google.com/youtube/iframe_api_reference#onError
 */
export enum PlayerError {
  INVALID_PARAM = 2,
  HTML5_ERROR = 5,
  VIDEO_NOT_FOUND = 100,
  NOT_EMBEDDABLE = 101,
  NOT_EMBEDDABLE_DISGUISED = 150,
}

/**
 * YouTube Player Event data structure
 * Represents the data received from YouTube's postMessage API
 */
export interface YouTubeEvent {
  info?: {
    playerState?: PlayerState;
    currentTime?: number;
    duration?: number;
    videoData?: {
      video_id: string;
      title: string;
    };
    playbackRate?: number;
    playbackQuality?: string;
  };
}

/**
 * Event handler for player state changes
 */
export interface PlayerStateChangeEvent {
  state: PlayerState;
  currentTime?: number;
  duration?: number;
}

/**
 * Event handler for when player is ready
 */
export interface PlayerReadyEvent {
  videoId: string;
  title: string;
}

/**
 * SEO metadata for YouTube video following schema.org VideoObject structure.
 * See: https://developers.google.com/search/docs/appearance/structured-data/video
 *
 * All fields are optional but providing them improves search engine discoverability
 * and enables rich results (video carousels, thumbnails in search results).
 *
 * Use the provided `scripts/fetch-youtube-metadata.sh` helper to easily retrieve
 * this data from YouTube's API.
 */
export interface VideoSEO {
  /**
   * The title of the video. If not provided, falls back to the component's `title` prop.
   * @example "What's new in Material Design for the web"
   */
  name?: string;

  /**
   * A description of the video content.
   * Recommended: 50-160 characters for optimal search result display.
   * @example "Learn about the latest Material Design updates presented at Chrome Dev Summit 2019"
   */
  description?: string;

  /**
   * ISO 8601 date when the video was uploaded to YouTube.
   * @example "2019-11-11T08:00:00Z" or "2019-11-11"
   */
  uploadDate?: string;

  /**
   * ISO 8601 duration format. Required for video rich results.
   * Format: PT#H#M#S where # is the number of hours, minutes, seconds
   * @example "PT1M33S" (1 minute 33 seconds)
   * @example "PT15M" (15 minutes)
   * @example "PT1H30M" (1 hour 30 minutes)
   */
  duration?: string;

  /**
   * Custom thumbnail URL. If not provided, auto-generated from video ID.
   * Recommended: At least 1200px wide for best quality in search results.
   * @example "https://i.ytimg.com/vi/VIDEO_ID/maxresdefault.jpg"
   */
  thumbnailUrl?: string;

  /**
   * Direct URL to watch the video. Auto-generated if not provided.
   * @example "https://www.youtube.com/watch?v=L2vS_050c-M"
   */
  contentUrl?: string;

  /**
   * The embed URL. Auto-generated from video ID if not provided.
   * @example "https://www.youtube.com/embed/L2vS_050c-M"
   */
  embedUrl?: string;
}

export interface LiteYouTubeProps {
  announce?: string;
  id: string;
  title: string;
  activatedClass?: string;
  adNetwork?: boolean;
  aspectHeight?: number;
  aspectWidth?: number;
  iframeClass?: string;
  /** @deprecated Use cookie prop instead */
  noCookie?: boolean;
  cookie?: boolean;
  enableJsApi?: boolean;
  alwaysLoadIframe?: boolean;
  params?: string;
  playerClass?: string;
  playlist?: boolean;
  playlistCoverId?: string;
  poster?: imgResolution;
  webp?: boolean;
  wrapperClass?: string;
  onIframeAdded?: () => void;
  muted?: boolean;
  autoplay?: boolean;
  thumbnail?: string;
  rel?: string;
  containerElement?: keyof React.JSX.IntrinsicElements;
  style?: React.CSSProperties;
  focusOnLoad?: boolean;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  /**
   * Enable lazy loading for thumbnail image.
   * Uses native browser lazy loading to defer offscreen images.
   * Improves Lighthouse scores and reduces bandwidth for below-fold videos.
   * @default false
   */
  lazyLoad?: boolean;
  /**
   * Stop video and return to thumbnail when playback ends.
   * Prevents YouTube from showing related videos. Requires enableJsApi.
   * @default false
   */
  stopOnEnd?: boolean;
  /**
   * SEO metadata for search engines. Enables rich results and better discoverability.
   * Provides structured data following schema.org VideoObject specification.
   * @see https://developers.google.com/search/docs/appearance/structured-data/video
   */
  seo?: VideoSEO;
  /**
   * Include noscript fallback link for accessibility and search crawlers.
   * When true, adds a direct YouTube link inside <noscript> tags.
   * @default true
   */
  noscriptFallback?: boolean;

  // ==================== Player Event Handlers ====================

  /**
   * Fires when the player is ready and API is available.
   * This is the first event to fire and indicates it's safe to call player methods.
   * @param event - Contains video ID and title
   * @example
   * onReady={(event) => console.log('Player ready for:', event.videoId)}
   */
  onReady?: (event: PlayerReadyEvent) => void;

  /**
   * Fires when the player's state changes.
   * Use this for comprehensive state tracking (play, pause, end, buffering, etc.)
   * @param event - Contains state, current time, and duration
   * @example
   * onStateChange={(event) => {
   *   if (event.state === PlayerState.PLAYING) {
   *     analytics.track('video_play');
   *   }
   * }}
   */
  onStateChange?: (event: PlayerStateChangeEvent) => void;

  /**
   * Fires when the player encounters an error.
   * Use this for graceful error handling and user feedback.
   * @param errorCode - YouTube error code (see PlayerError enum)
   * @example
   * onError={(code) => {
   *   if (code === PlayerError.VIDEO_NOT_FOUND) {
   *     showErrorMessage('Video not available');
   *   }
   * }}
   */
  onError?: (errorCode: PlayerError) => void;

  // ==================== Convenience Event Handlers ====================

  /**
   * Fires when the video starts playing.
   * Convenience wrapper for onStateChange with PlayerState.PLAYING.
   * @example
   * onPlay={() => analytics.track('video_play')}
   */
  onPlay?: () => void;

  /**
   * Fires when the video is paused.
   * Convenience wrapper for onStateChange with PlayerState.PAUSED.
   * @example
   * onPause={() => analytics.track('video_pause')}
   */
  onPause?: () => void;

  /**
   * Fires when the video ends.
   * Convenience wrapper for onStateChange with PlayerState.ENDED.
   * Useful for loading next video in a playlist.
   * @example
   * onEnd={() => loadNextVideo()}
   */
  onEnd?: () => void;

  /**
   * Fires when the video is buffering.
   * Convenience wrapper for onStateChange with PlayerState.BUFFERING.
   * @example
   * onBuffering={() => showLoadingSpinner()}
   */
  onBuffering?: () => void;

  // ==================== Advanced Event Handlers ====================

  /**
   * Fires when the playback rate (speed) changes.
   * Common values: 0.25, 0.5, 1, 1.5, 2
   * @param playbackRate - The new playback rate
   * @example
   * onPlaybackRateChange={(rate) => console.log('Speed:', rate + 'x')}
   */
  onPlaybackRateChange?: (playbackRate: number) => void;

  /**
   * Fires when the video quality changes.
   * Common values: "small" (240p), "medium" (360p), "large" (480p), "hd720", "hd1080"
   * @param quality - The new quality level
   * @example
   * onPlaybackQualityChange={(quality) => {
   *   analytics.track('quality_change', { quality });
   * }}
   */
  onPlaybackQualityChange?: (quality: string) => void;
}

/**
 * Generates JSON-LD structured data for VideoObject schema.
 * @see https://schema.org/VideoObject
 * @see https://developers.google.com/search/docs/appearance/structured-data/video
 */
function generateVideoStructuredData(
  videoId: string,
  title: string,
  posterUrl: string,
  ytUrl: string,
  seo?: VideoSEO
): string {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: seo?.name || title,
    thumbnailUrl: [seo?.thumbnailUrl || posterUrl],
    embedUrl: seo?.embedUrl || `${ytUrl}/embed/${videoId}`,
    contentUrl: seo?.contentUrl || `https://www.youtube.com/watch?v=${videoId}`,
    ...(seo?.description && { description: seo.description }),
    ...(seo?.uploadDate && { uploadDate: seo.uploadDate }),
    ...(seo?.duration && { duration: seo.duration }),
  };

  return JSON.stringify(structuredData);
}

function LiteYouTubeEmbedComponent(
  props: LiteYouTubeProps,
  ref: React.Ref<HTMLIFrameElement>
) {
  const [preconnected, setPreconnected] = React.useState(false);
  const [iframe, setIframe] = React.useState(props.alwaysLoadIframe || false);
  const videoId = encodeURIComponent(props.id);
  const videoPlaylistCoverId =
    typeof props.playlistCoverId === "string"
      ? encodeURIComponent(props.playlistCoverId)
      : null;
  const videoTitle = props.title;
  const posterImp = props.poster || "hqdefault";
  const announceWatch = props.announce || "Watch";

  const shouldAddAutoplayParam = props.alwaysLoadIframe
    ? props.autoplay && props.muted
    : true; // When the iframe is not loaded immediately, the video should play as soon as its loaded (which happens when the button is clicked)

  // Iframe Parameters - memoized to avoid recreating URLSearchParams on every render
  const iframeParams = React.useMemo(() => {
    const params = new URLSearchParams({
      ...(props.muted ? { mute: "1" } : {}),
      ...(shouldAddAutoplayParam ? { autoplay: "1" } : {}),
      ...(props.enableJsApi ? { enablejsapi: "1" } : {}),
      ...(props.enableJsApi && typeof window !== 'undefined' ? { origin: window.location.origin } : {}),
      ...(props.playlist ? { list: videoId } : {}),
    });

    // parse props.params into individual search parameters and append them to params
    if (props.params) {
      const additionalParams = new URLSearchParams(
        props.params.startsWith("&") ? props.params.slice(1) : props.params
      );
      additionalParams.forEach((value, key) => {
        params.append(key, value);
      });
    }

    return params;
  }, [
    props.muted,
    shouldAddAutoplayParam,
    props.enableJsApi,
    props.playlist,
    videoId,
    props.params,
  ]);

  const ytUrl = React.useMemo(
    () =>
      props.cookie
        ? "https://www.youtube.com"
        : "https://www.youtube-nocookie.com",
    [props.cookie]
  );

  const iframeSrc = React.useMemo(
    () =>
      !props.playlist
        ? `${ytUrl}/embed/${videoId}?${iframeParams.toString()}`
        : `${ytUrl}/embed/videoseries?${iframeParams.toString()}`,
    [props.playlist, ytUrl, videoId, iframeParams]
  );

  const useDynamicThumbnail =
    !props.thumbnail && !props.playlist && posterImp === "maxresdefault";

  const format = props.webp ? "webp" : "jpg";
  const vi = props.webp ? "vi_webp" : "vi";

  const dynamicThumbnailUrl = useDynamicThumbnail
    ? useYoutubeThumbnail(props.id, vi, format, posterImp)
    : null;

  const posterUrl = React.useMemo(
    () =>
      props.thumbnail ||
      dynamicThumbnailUrl ||
      `https://i.ytimg.com/${vi}/${
        props.playlist ? videoPlaylistCoverId : videoId
      }/${posterImp}.${format}`,
    [
      props.thumbnail,
      dynamicThumbnailUrl,
      vi,
      props.playlist,
      videoPlaylistCoverId,
      videoId,
      posterImp,
      format,
    ]
  );

  const activatedClassImp = props.activatedClass || "lyt-activated";
  const adNetworkImp = props.adNetwork || false;
  const aspectHeight = props.aspectHeight || 9;
  const aspectWidth = props.aspectWidth || 16;
  const iframeClassImp = props.iframeClass || "";
  const playerClassImp = props.playerClass || "lty-playbtn";
  const wrapperClassImp = props.wrapperClass || "yt-lite";
  const onIframeAdded = React.useCallback(
    props.onIframeAdded || function () {},
    [props.onIframeAdded]
  );
  const rel = props.rel ? "prefetch" : "preload";
  const ContainerElement = props.containerElement || "article";
  const includeNoscriptFallback = props.noscriptFallback !== false; // Default to true

  const warmConnections = () => {
    if (preconnected) return;
    setPreconnected(true);
  };

  const addIframe = () => {
    if (iframe) return;
    setIframe(true);
  };

  React.useEffect(() => {
    if (iframe) {
      onIframeAdded();

      // Focus iframe if focusOnLoad is enabled and ref is available
      if (props.focusOnLoad && typeof ref === "object" && ref?.current) {
        ref.current.focus();
      }
    }
  }, [iframe, onIframeAdded, props.focusOnLoad, ref]);

  // Set up postMessage listener for YouTube player events
  React.useEffect(() => {
    // Only set up listener if iframe is loaded and we have event handlers
    if (!iframe || !props.enableJsApi) {
      return;
    }

    const hasEventHandlers =
      props.onReady ||
      props.onStateChange ||
      props.onError ||
      props.onPlay ||
      props.onPause ||
      props.onEnd ||
      props.onBuffering ||
      props.onPlaybackRateChange ||
      props.onPlaybackQualityChange;

    if (!hasEventHandlers) {
      return;
    }

    let isReady = false;
    let iframeLoaded = false;

    const handleMessage = (event: MessageEvent) => {
      // Verify origin is from YouTube
      if (
        event.origin !== "https://www.youtube.com" &&
        event.origin !== "https://www.youtube-nocookie.com"
      ) {
        return;
      }

      let data: { event?: string; info?: YouTubeEvent["info"] };
      try {
        data =
          typeof event.data === "string" ? JSON.parse(event.data) : event.data;
      } catch {
        return; // Invalid JSON, ignore
      }

      // Handle different YouTube events
      switch (data.event) {
        case "onReady":
          if (!isReady) {
            isReady = true;
            if (props.onReady) {
              props.onReady({
                videoId: props.id,
                title: videoTitle,
              });
            }
          }
          break;

        case "infoDelivery":
          // YouTube's postMessage API sends state changes via infoDelivery events
          // This is the primary mechanism for receiving state change notifications
          if (data.info?.playerState !== undefined) {
            const state = data.info.playerState as PlayerState;

            // Call main onStateChange handler
            if (props.onStateChange) {
              props.onStateChange({
                state,
                currentTime: data.info.currentTime,
                duration: data.info.duration,
              });
            }

            // Call convenience handlers
            switch (state) {
              case PlayerState.PLAYING:
                props.onPlay?.();
                break;
              case PlayerState.PAUSED:
                props.onPause?.();
                break;
              case PlayerState.ENDED:
                props.onEnd?.();
                // Stop video to return to thumbnail and prevent related videos
                if (
                  props.stopOnEnd &&
                  typeof ref === "object" &&
                  ref?.current?.contentWindow
                ) {
                  ref.current.contentWindow.postMessage(
                    '{"event":"command","func":"stopVideo","args":""}',
                    "*"
                  );
                }
                break;
              case PlayerState.BUFFERING:
                props.onBuffering?.();
                break;
            }
          }

          // Handle playback rate changes
          if (data.info?.playbackRate !== undefined) {
            props.onPlaybackRateChange?.(data.info.playbackRate);
          }

          // Handle playback quality changes
          if (data.info?.playbackQuality !== undefined) {
            props.onPlaybackQualityChange?.(data.info.playbackQuality);
          }
          break;

        case "onStateChange":
          // Fallback: YouTube may send dedicated onStateChange events in some cases
          // However, infoDelivery (above) is the primary mechanism observed
          if (data.info?.playerState !== undefined) {
            const state = data.info.playerState as PlayerState;

            // Call main onStateChange handler
            if (props.onStateChange) {
              props.onStateChange({
                state,
                currentTime: data.info.currentTime,
                duration: data.info.duration,
              });
            }

            // Call convenience handlers
            switch (state) {
              case PlayerState.PLAYING:
                props.onPlay?.();
                break;
              case PlayerState.PAUSED:
                props.onPause?.();
                break;
              case PlayerState.ENDED:
                props.onEnd?.();
                // Stop video to return to thumbnail and prevent related videos
                if (
                  props.stopOnEnd &&
                  typeof ref === "object" &&
                  ref?.current?.contentWindow
                ) {
                  ref.current.contentWindow.postMessage(
                    '{"event":"command","func":"stopVideo","args":""}',
                    "*"
                  );
                }
                break;
              case PlayerState.BUFFERING:
                props.onBuffering?.();
                break;
            }
          }
          break;

        case "onError":
          if (data.info && "errorCode" in data.info) {
            const errorCode = (data.info as { errorCode: number }).errorCode;
            if (props.onError) {
              props.onError(errorCode as PlayerError);
            }
          }
          break;

        case "onPlaybackRateChange":
          if (data.info?.playbackRate !== undefined) {
            props.onPlaybackRateChange?.(data.info.playbackRate);
          }
          break;

        case "onPlaybackQualityChange":
          if (data.info?.playbackQuality !== undefined) {
            props.onPlaybackQualityChange?.(data.info.playbackQuality);
          }
          break;
      }
    };

    window.addEventListener("message", handleMessage);

    // Request iframe to send events by posting "listening" message
    // This tells YouTube player to start sending events
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const attemptListen = () => {
      if (typeof ref === "object" && ref?.current?.contentWindow) {
        ref.current.contentWindow.postMessage(
          '{"event":"listening","id":"' + videoId + '"}',
          "*"
        );
      }
    };

    // Strategy: Wait for iframe load event, then send listening message
    // This is more reliable than arbitrary delays
    const handleIframeLoad = () => {
      if (iframeLoaded) {
        return;
      }
      iframeLoaded = true;

      // Send initial listening message immediately when iframe loads
      attemptListen();

      // Also retry with delays as fallback for slower YouTube API initialization
      // YouTube's player API needs additional time to initialize even after iframe loads
      const delays = [100, 300, 600, 1200, 2400];
      delays.forEach((delay) => {
        timeouts.push(setTimeout(attemptListen, delay));
      });
    };

    // Attach load event listener to iframe
    if (typeof ref === "object" && ref?.current) {
      ref.current.addEventListener("load", handleIframeLoad);

      // If iframe is already loaded, trigger immediately
      // This handles race condition where load event fired before listener attached
      if (ref.current.contentDocument?.readyState === "complete") {
        handleIframeLoad();
      }
    } else {
      // Fallback: If ref not ready, use longer delays
      const fallbackDelays = [200, 500, 1000, 2000, 3000];
      fallbackDelays.forEach((delay) => {
        timeouts.push(setTimeout(attemptListen, delay));
      });
    }

    return () => {
      window.removeEventListener("message", handleMessage);
      timeouts.forEach(clearTimeout);

      // Clean up iframe load listener
      if (typeof ref === "object" && ref?.current) {
        ref.current.removeEventListener("load", handleIframeLoad);
      }
    };
  }, [
    iframe,
    props.enableJsApi,
    props.onReady,
    props.onStateChange,
    props.onError,
    props.onPlay,
    props.onPause,
    props.onEnd,
    props.onBuffering,
    props.onPlaybackRateChange,
    props.onPlaybackQualityChange,
    props.stopOnEnd,
    props.id,
    videoId,
    videoTitle,
    ref,
  ]);

  return (
    <>
      {!props.lazyLoad && <link rel={rel} href={posterUrl} as="image" />}
      <>
        {preconnected && (
          <>
            <link rel="preconnect" href={ytUrl} />
            <link rel="preconnect" href="https://www.google.com" />
            {adNetworkImp && (
              <>
                <link rel="preconnect" href="https://static.doubleclick.net" />
                <link
                  rel="preconnect"
                  href="https://googleads.g.doubleclick.net"
                />
              </>
            )}
          </>
        )}
      </>
      {/* SEO: JSON-LD Structured Data for VideoObject */}
      {props.seo && !props.playlist && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: generateVideoStructuredData(
              props.id,
              videoTitle,
              posterUrl,
              ytUrl,
              props.seo
            ),
          }}
        />
      )}
      {/* SEO: Noscript fallback for accessibility and crawlers */}
      {includeNoscriptFallback && !props.playlist && (
        <noscript>
          <a
            href={`https://www.youtube.com/watch?v=${props.id}`}
            aria-label={`Watch ${videoTitle} on YouTube`}
          >
            Watch &quot;{videoTitle}&quot; on YouTube
          </a>
        </noscript>
      )}
      <ContainerElement
        onPointerOver={warmConnections}
        onClick={addIframe}
        className={`${wrapperClassImp} ${iframe ? activatedClassImp : ""}`}
        data-title={videoTitle}
        role={!iframe ? "img" : undefined}
        aria-label={
          !iframe ? `${videoTitle} - YouTube video preview` : undefined
        }
        style={
          {
            ...(!props.lazyLoad && { backgroundImage: `url(${posterUrl})` }),
            "--aspect-ratio": `${(aspectHeight / aspectWidth) * 100}%`,
            ...(props.style || {}),
          } as React.CSSProperties
        }
      >
        {props.lazyLoad && !iframe && (
          <img
            src={posterUrl}
            alt={`${videoTitle} - YouTube thumbnail`}
            className="lty-thumbnail"
            loading="lazy"
          />
        )}
        {props.playlist && !iframe && (
          <div className="lty-playlist-icon" aria-hidden="true"></div>
        )}
        <button
          type="button"
          className={playerClassImp}
          aria-label={`${announceWatch} ${videoTitle}`}
          aria-hidden={iframe || undefined}
          tabIndex={iframe ? -1 : 0}
          onClick={addIframe}
        >
          <span className="lty-visually-hidden">{announceWatch}</span>
        </button>
        {iframe && (
          <iframe
            ref={ref}
            className={iframeClassImp}
            title={videoTitle}
            width="560"
            height="315"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            src={iframeSrc}
            referrerPolicy={
              (props.referrerPolicy ||
                "strict-origin-when-cross-origin") as React.HTMLAttributeReferrerPolicy
            }
          ></iframe>
        )}
      </ContainerElement>
    </>
  );
}

export default React.forwardRef<HTMLIFrameElement, LiteYouTubeProps>(
  LiteYouTubeEmbedComponent
);
