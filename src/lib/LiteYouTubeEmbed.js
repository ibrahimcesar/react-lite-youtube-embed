import React, { Fragment, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./LiteYouTubeEmbed.css";

const LiteYouTubeEmbed = ({ adNetwork, id, playlist, poster, title, activatedClass, iframeClass, playerClass, wrapperClass
}) => {

  const [preconnected, setPreconnected] = useState(false);
  const [iframe, setIframe] = useState(false);
  const videoId = encodeURIComponent(id);
  const videoTitle = title;
  const posterUrl = `https://i.ytimg.com/vi/${videoId}/${poster}.jpg`;
  const iframeSrc = !playlist ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : `https://www.youtube.com/embed/videoseries?list=${videoId}`;
  const refVideo = useRef();

  const warmConnections = () => {
    if (preconnected) return;
    setPreconnected(true);
  };
  const addIframe = () => {
    if (iframe) return;
    setIframe(true);
  };

  useEffect(() => {
    const { current } = refVideo;
    current.style.backgroundImage = `url('${posterUrl}')`;
    current.addEventListener("pointerover", warmConnections, true);
    current.addEventListener("click", addIframe, true);

    return () => {
      current.removeEventListener("pointerover", warmConnections);
      current.removeEventListener("click", addIframe);
    };
  }, []);

  return (
    <Fragment>
      <link rel="preload" href={posterUrl} as="image" />
      <>
      {preconnected && (
        <>
          <link rel="preconnect" href="https://www.youtube.com" />
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
        className={`${wrapperClass} ${iframe && activatedClass}`}
        data-title={videoTitle}
        ref={refVideo}
      >
        <div className={playerClass}></div>
        {iframe && (
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
    </Fragment>
  );
};

LiteYouTubeEmbed.propTypes = {
  adNetwork: PropTypes.bool,
  id: PropTypes.string,
  playlist: PropTypes.bool,
  poster: PropTypes.string,
  title: PropTypes.string,
  activatedClass: PropTypes.string,
  iframeClass: PropTypes.string,
  playerClass: PropTypes.string,
  wrapperClass: PropTypes.string
};

LiteYouTubeEmbed.defaultProps = {
  adNetwork: true, 
  id: "",
  playlist: false,
  poster: "hqdefault",
  title: "YouTube Embed",
  activatedClass: "lyt-activated",
  iframeClass: "",
  playerClass: "lty-playbtn",
  wrapperClass: "yt-lite"
};

export default LiteYouTubeEmbed;