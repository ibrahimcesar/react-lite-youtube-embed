import * as React from "react";
import useYoutubeThumbnail from "./useYoutubeThumbnail";
import { imgResolution } from "./useYoutubeThumbnail";

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
  seo?: VideoSEO,
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
  ref: React.Ref<HTMLIFrameElement>,
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
      ...(props.playlist ? { list: videoId } : {}),
    });

    // parse props.params into individual search parameters and append them to params
    if (props.params) {
      const additionalParams = new URLSearchParams(
        props.params.startsWith("&") ? props.params.slice(1) : props.params,
      );
      additionalParams.forEach((value, key) => {
        params.append(key, value);
      });
    }

    return params;
  }, [props.muted, shouldAddAutoplayParam, props.enableJsApi, props.playlist, videoId, props.params]);

  const ytUrl = React.useMemo(
    () => props.cookie
      ? "https://www.youtube.com"
      : "https://www.youtube-nocookie.com",
    [props.cookie]
  );

  const iframeSrc = React.useMemo(
    () => !props.playlist
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
    () => props.thumbnail ||
      dynamicThumbnailUrl ||
      `https://i.ytimg.com/${vi}/${
        props.playlist ? videoPlaylistCoverId : videoId
      }/${posterImp}.${format}`,
    [props.thumbnail, dynamicThumbnailUrl, vi, props.playlist, videoPlaylistCoverId, videoId, posterImp, format]
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
      if (props.focusOnLoad && typeof ref === 'object' && ref?.current) {
        ref.current.focus();
      }
    }
  }, [iframe, onIframeAdded, props.focusOnLoad, ref]);

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
        aria-label={!iframe ? `${videoTitle} - YouTube video preview` : undefined}
        style={{
          ...(!props.lazyLoad && { backgroundImage: `url(${posterUrl})` }),
          "--aspect-ratio": `${(aspectHeight / aspectWidth) * 100}%`,
          ...(props.style || {}),
        } as React.CSSProperties}
      >
        {props.lazyLoad && !iframe && (
          <img
            src={posterUrl}
            alt={`${videoTitle} - YouTube thumbnail`}
            className="lty-thumbnail"
            loading="lazy"
          />
        )}
        <button
          type="button"
          className={playerClassImp}
          aria-label={`${announceWatch} ${videoTitle}`}
          aria-hidden={iframe || undefined}
          tabIndex={iframe ? -1 : 0}
        >
          <span className="lty-visually-hidden">
            {announceWatch}
          </span>
        </button>
        {iframe && (
          <iframe
            ref={ref}
            className={iframeClassImp}
            title={videoTitle}
            width="560"
            height="315"
            style={{ border: 0 }}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            src={iframeSrc}
            referrerPolicy={(props.referrerPolicy || "strict-origin-when-cross-origin") as React.HTMLAttributeReferrerPolicy}
          ></iframe>
        )}
      </ContainerElement>
    </>
  );
}

export default React.forwardRef<HTMLIFrameElement, LiteYouTubeProps>(
  LiteYouTubeEmbedComponent,
);
