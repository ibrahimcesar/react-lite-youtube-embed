import * as React from 'react'
import { useState } from 'react'
import 'LiteYouTubeEmbed.css'

interface LiteYouTube { 
  id: string
  title: string
  activatedClass?: string
  adNetwork?: boolean
  iframeClass?: string
  noCookie?: boolean
  params?: string
  playerClass?: string
  playlist?: boolean
  poster?: string
  wrapperClass?: string 
}

export default function LiteYouTubeEmbed(props: LiteYouTube) {
  
  const [preconnected, setPreconnected] = useState(false)
  const [iframe, setIframe] = useState(false)
  const videoId = encodeURIComponent(props.id)
  const videoTitle = props.title
  const posterImp = props.poster || 'hqdefault'
  const paramsImp = `&${props.params}` || ''
  const posterUrl = `https://i.ytimg.com/vi/${videoId}/${posterImp}.jpg`;
  const ytUrl = props.noCookie
    ? "https://www.youtube-nocookie.com"
    : "https://www.youtube.com";
  const iframeSrc = !props.playlist
    ? `${ytUrl}/embed/${videoId}?autoplay=1${paramsImp}`
    : `${ytUrl}/embed/videoseries?list=${videoId}${paramsImp}`
  
  const activatedClassImp = props.activatedClass || 'lyt-activated'
  const adNetworkImp = props.adNetwork || false
  const iframeClassImp = props.iframeClass || ''
  const playerClassImp = props.playerClass || 'lty-playbtn'
  const wrapperClassImp = props.wrapperClass || 'yt-lite'

  const warmConnections = () => {
    if (preconnected) return;
    setPreconnected(true);
  };

  const addIframe = () => {
    if (iframe) return;
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
        style={{ backgroundImage: `url(${posterUrl})` }}
      >
        <div className={playerClassImp}></div>
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
  )
}