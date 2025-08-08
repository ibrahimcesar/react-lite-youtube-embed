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
  autoplay: boolean;
  thumbnail?: string;
  rel?: string;
  containerElement?: keyof React.JSX.IntrinsicElements;
  style?: React.CSSProperties;
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

  // Iframe Parameters
  const iframeParams = new URLSearchParams({
    ...(props.muted ? { mute: "1" } : {}),
    ...(shouldAddAutoplayParam ? { autoplay: "1" } : {}),
    ...(props.enableJsApi ? { enablejsapi: "1" } : {}),
    ...(props.playlist ? { list: videoId } : {}),
  });

  let ytUrl = props.noCookie
    ? "https://www.youtube-nocookie.com"
    : "https://www.youtube.com";
  ytUrl = props.cookie
    ? "https://www.youtube.com"
    : "https://www.youtube-nocookie.com";

  const iframeSrc = !props.playlist
    ? `${ytUrl}/embed/${videoId}?${iframeParams.toString()}`
    : `${ytUrl}/embed/videoseries?${iframeParams.toString()}`;

  const useDynamicThumbnail =
    !props.thumbnail && !props.playlist && posterImp === "maxresdefault";

  const format = props.webp ? "webp" : "jpg";
  const vi = props.webp ? "vi_webp" : "vi";

  const dynamicThumbnailUrl = useDynamicThumbnail
    ? useYoutubeThumbnail(props.id, vi, format, posterImp)
    : null;

  const posterUrl =
    props.thumbnail ||
    dynamicThumbnailUrl ||
    `https://i.ytimg.com/${vi}/${
      props.playlist ? videoPlaylistCoverId : videoId
    }/${posterImp}.${format}`;

  const activatedClassImp = props.activatedClass || "lyt-activated";
  const adNetworkImp = props.adNetwork || false;
  const aspectHeight = props.aspectHeight || 9;
  const aspectWidth = props.aspectWidth || 16;
  const iframeClassImp = props.iframeClass || "";
  const playerClassImp = props.playerClass || "lty-playbtn";
  const wrapperClassImp = props.wrapperClass || "yt-lite";
  const onIframeAdded = props.onIframeAdded || function () {};
  const rel = props.rel ? "prefetch" : "preload";
  const ContainerElement = props.containerElement || "article";
  const style = props.style || {};

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
    }
  }, [iframe]);

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
        style={{
          backgroundImage: `url(${posterUrl})`,
          ...({
            "--aspect-ratio": `${(aspectHeight / aspectWidth) * 100}%`,
          } as React.CSSProperties),
          ...style,
        }}
      >
        <button
          type="button"
          className={playerClassImp}
          aria-label={`${announceWatch} ${videoTitle}`}
        />
        {iframe && (
          <iframe
            ref={ref}
            className={iframeClassImp}
            title={videoTitle}
            width="560"
            height="315"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            src={iframeSrc}
          ></iframe>
        )}
      </ContainerElement>
    </>
  );
}

export default React.forwardRef<HTMLIFrameElement, LiteYouTubeProps>(
  LiteYouTubeEmbedComponent
);
