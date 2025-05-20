import * as React from 'react';

export type imgResolution = 'default' | 'mqdefault' | 'hqdefault' | 'sddefault' | 'maxresdefault';

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
  thumbnail?: string;
  rel?: string;
  containerElement?: keyof React.JSX.IntrinsicElements;
  style?: React.CSSProperties;
}

function LiteYouTubeEmbedComponent(props: LiteYouTubeProps, ref: React.Ref<HTMLIFrameElement>) {
  const [preconnected, setPreconnected] = React.useState(false);
  const [iframe, setIframe] = React.useState(props.alwaysLoadIframe || false);
  const videoId = encodeURIComponent(props.id);
  const videoPlaylistCoverId =
    typeof props.playlistCoverId === 'string' ? encodeURIComponent(props.playlistCoverId) : null;
  const videoTitle = props.title;
  const posterImp = props.poster || 'hqdefault';
  const announceWatch = props.announce || 'Watch';

  // Iframe Parameters
  const iframeParams = new URLSearchParams({
    ...(props.muted ? { mute: '1' } : {}),
    // When the iframe is not loaded immediately, the video should play as soon as its loaded (which happens when the button is clicked)
    ...(props.alwaysLoadIframe ? {} : { autoplay: '1', state: '1' }),
    ...(props.enableJsApi ? { enablejsapi: '1' } : {}),
    ...(props.playlist ? { list: videoId } : {}),
  });

  // parse props.params into individual search parameters and append them to iframeParams
  if (props.params) {
    const additionalParams = new URLSearchParams(props.params.startsWith('&') ? props.params.slice(1) : props.params);
    additionalParams.forEach((value, key) => {
      iframeParams.append(key, value);
    });
  }

  let ytUrl = props.noCookie ? 'https://www.youtube-nocookie.com' : 'https://www.youtube.com';
  ytUrl = props.cookie ? 'https://www.youtube.com' : 'https://www.youtube-nocookie.com';

  const iframeSrc = !props.playlist
    ? `${ytUrl}/embed/${videoId}?${iframeParams.toString()}`
    : `${ytUrl}/embed/videoseries?${iframeParams.toString()}`;

  const format = props.webp ? 'webp' : 'jpg';
  const vi = props.webp ? 'vi_webp' : 'vi';
  const posterUrl =
    props.thumbnail ||
    (!props.playlist
      ? `https://i.ytimg.com/${vi}/${videoId}/${posterImp}.${format}`
      : `https://i.ytimg.com/${vi}/${videoPlaylistCoverId}/${posterImp}.${format}`);

  const activatedClassImp = props.activatedClass || 'lyt-activated';
  const adNetworkImp = props.adNetwork || false;
  const aspectHeight = props.aspectHeight || 9;
  const aspectWidth = props.aspectWidth || 16;
  const iframeClassImp = props.iframeClass || '';
  const playerClassImp = props.playerClass || 'lty-playbtn';
  const wrapperClassImp = props.wrapperClass || 'yt-lite';
  const onIframeAdded = props.onIframeAdded || function () {};
  const rel = props.rel ? 'prefetch' : 'preload';
  const ContainerElement = props.containerElement || 'article';
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
                <link rel="preconnect" href="https://googleads.g.doubleclick.net" />
              </>
            )}
          </>
        )}
      </>
      <ContainerElement
        onPointerOver={warmConnections}
        onClick={addIframe}
        className={`${wrapperClassImp} ${iframe ? activatedClassImp : ''}`}
        data-title={videoTitle}
        style={{
          backgroundImage: `url(${posterUrl})`,
          ...({ '--aspect-ratio': `${(aspectHeight / aspectWidth) * 100}%` } as React.CSSProperties),
          ...style,
        }}
      >
        <button type="button" className={playerClassImp} aria-label={`${announceWatch} ${videoTitle}`} />
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

export default React.forwardRef<HTMLIFrameElement, LiteYouTubeProps>(LiteYouTubeEmbedComponent);
