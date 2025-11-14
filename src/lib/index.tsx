import * as React from "react";
import useYoutubeThumbnail from "./useYoutubeThumbnail";
import { imgResolution } from "./useYoutubeThumbnail";

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
      <link rel={rel} href={posterUrl} as="image" />
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
      <ContainerElement
        onPointerOver={warmConnections}
        onClick={addIframe}
        className={`${wrapperClassImp} ${iframe ? activatedClassImp : ""}`}
        data-title={videoTitle}
        role={!iframe ? "img" : undefined}
        aria-label={!iframe ? `${videoTitle} - YouTube video preview` : undefined}
        style={{
          backgroundImage: `url(${posterUrl})`,
          "--aspect-ratio": `${(aspectHeight / aspectWidth) * 100}%`,
          ...(props.style || {}),
        } as React.CSSProperties}
      >
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
