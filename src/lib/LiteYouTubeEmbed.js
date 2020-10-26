import React, { useState } from "react";
import PropTypes from "prop-types";

import "./LiteYouTubeEmbed.css";

const LiteYouTubeEmbed = ({ 
  adNetwork, 
  id, 
  playlist, 
  poster, 
  title, 
  noCookie, 
  activatedClass, 
  iframeClass, 
  playerClass, 
  wrapperClass, 
  defaultPlay
}) => {

  const [preconnected, setPreconnected] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(defaultPlay);
  const videoId = encodeURIComponent(id);
  const videoTitle = title;
  const posterUrl = `https://i.ytimg.com/vi/${videoId}/${poster}.jpg`;
  const ytUrl = noCookie
    ? "https://www.youtube-nocookie.com"
    : "https://www.youtube.com";
  const iframeSrc = !playlist
    ? `${ytUrl}/embed/${videoId}?autoplay=1`
    : `${ytUrl}/embed/videoseries?list=${videoId}`;

  const warmConnections = () => {
    if (preconnected) return;
    setPreconnected(true);
  };

  const addIframe = () => {
    if (iframeLoaded) return;
    setIframeLoaded(true);
  };

  return (
    <>
      <link rel="preload" href={posterUrl} as="image" />
      <>
      {preconnected && (
        <>
          <link rel="preconnect" href={ytUrl} />
          <link rel="preconnect" href="https://www.google.com" />
          {adNetwork && (
            <>
            <link rel="preconnect" href="https://static.doubleclick.net" />
            <link rel="preconnect" href="https://googleads.g.doubleclick.net" />
            </>
            ) 
          }
        </>
      )}
      </>
      <div
        onPointerOver={warmConnections}
        onClick={addIframe}
        className={`${wrapperClass} ${iframeLoaded && activatedClass}`}
        data-title={videoTitle}
        style={{ backgroundImage: `url(${posterUrl})` }}
      >
        <div className={playerClass}></div>
        {iframeLoaded && (
          <iframe
            className={iframeClass}
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
};

LiteYouTubeEmbed.propTypes = {
  adNetwork: PropTypes.bool,
  id: PropTypes.string,
  playlist: PropTypes.bool,
  poster: PropTypes.string,
  title: PropTypes.string,
  noCookie: PropTypes.bool,
  activatedClass: PropTypes.string,
  iframeClass: PropTypes.string,
  playerClass: PropTypes.string,
  wrapperClass: PropTypes.string,
  defaultPlay: PropTypes.bool
};

LiteYouTubeEmbed.defaultProps = {
  adNetwork: true,
  id: "",
  playlist: false,
  poster: "hqdefault",
  title: "YouTube Embed",
  noCookie: false,
  activatedClass: "lyt-activated",
  iframeClass: "",
  playerClass: "lty-playbtn",
  wrapperClass: "yt-lite",
  defaultPlay: false
};

export default LiteYouTubeEmbed;