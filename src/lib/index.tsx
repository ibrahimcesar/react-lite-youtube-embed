import * as React from "react";

type imgResolution =
  | "default"
  | "mqdefault"
  | "hqdefault"
  | "sddefault"
  | "maxresdefault";

interface LiteYouTube {
  announce: string;
  id: string;
  title: string;
  activatedClass?: string;
  adNetwork?: boolean;
  aspectHeight?: number;
  aspectWidth?: number;
  iframeClass?: string;
  noCookie?: boolean;
  cookie?: boolean;
  params?: string;
  playerClass?: string;
  playlist?: boolean;
  playlistCoverId?: string;
  poster?: imgResolution;
  wrapperClass?: string;
  onIframeAdded?: () => void
}

export default function LiteYouTubeEmbed(props: LiteYouTube) {
  const [preconnected, setPreconnected] = React.useState(false);
  const [iframe, setIframe] = React.useState(false);
  const videoId = encodeURIComponent(props.id);
  const videoPlaylisCovertId = typeof props.playlistCoverId === 'string' ? encodeURIComponent(props.playlistCoverId) : null;
  const videoTitle = props.title;
  const posterImp = props.poster || "hqdefault";
  const paramsImp = `&${props.params}` || "";
  const announceWatch = props.announce || "Watch";
  const posterUrl = !props.playlist ?
    `https://i.ytimg.com/vi/${videoId}/${posterImp}.jpg`:
    `https://i.ytimg.com/vi/${videoPlaylisCovertId}/${posterImp}.jpg`;
  let ytUrl = props.noCookie
    ? "https://www.youtube-nocookie.com"
    : "https://www.youtube.com";
  ytUrl = props.cookie
    ? "https://www.youtube.com"
    : "https://www.youtube-nocookie.com";
  const iframeSrc = !props.playlist
    ? `${ytUrl}/embed/${videoId}?autoplay=1${paramsImp}`
    : `${ytUrl}/embed/videoseries?autoplay=1&list=${videoId}${paramsImp}`;

  const activatedClassImp = props.activatedClass || "lyt-activated";
  const adNetworkImp = props.adNetwork || false;
  const aspectHeight = props.aspectHeight || 9;
  const aspectWidth = props.aspectWidth || 16;
  const iframeClassImp = props.iframeClass || "";
  const playerClassImp = props.playerClass || "lty-playbtn";
  const wrapperClassImp = props.wrapperClass || "yt-lite";
  const onIframeAdded = props.onIframeAdded || function() {};

  const warmConnections = () => {
    if (preconnected) return;
    setPreconnected(true);
  };

  const addIframe = () => {
    if (iframe) return;
    onIframeAdded()
    setIframe(true);
  };

  return (
    <>
      <link rel="preload" href={posterUrl} as="image" />
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
      <div
        onPointerOver={warmConnections}
        onClick={addIframe}
        className={`${wrapperClassImp} ${iframe && activatedClassImp}`}
        data-title={videoTitle}
        style={{
          backgroundImage: `url(${posterUrl})`,
          ...({
            '--aspect-ratio': `${(aspectHeight / aspectWidth) * 100}%`,
          } as React.CSSProperties),
        }}
      >
        <button
          className={playerClassImp}
          aria-label={`${announceWatch} ${videoTitle}`}></button>
        {iframe && (
          <iframe
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
      </div>
    </>
  );
}
