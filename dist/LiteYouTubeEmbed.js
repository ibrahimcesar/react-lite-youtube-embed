import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState } from "react";
import "./LiteYouTubeEmbed.css";

var LiteYouTubeEmbed = function LiteYouTubeEmbed(_ref) {
  var adNetwork = _ref.adNetwork,
      id = _ref.id,
      playlist = _ref.playlist,
      poster = _ref.poster,
      title = _ref.title,
      noCookie = _ref.noCookie,
      activatedClass = _ref.activatedClass,
      iframeClass = _ref.iframeClass,
      playerClass = _ref.playerClass,
      wrapperClass = _ref.wrapperClass,
      autoPlay = _ref.autoPlay;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      preconnected = _useState2[0],
      setPreconnected = _useState2[1];

  var _useState3 = useState(autoPlay),
      _useState4 = _slicedToArray(_useState3, 2),
      iframeLoaded = _useState4[0],
      setIframeLoaded = _useState4[1];

  var videoId = encodeURIComponent(id);
  var videoTitle = title;
  var posterUrl = "https://i.ytimg.com/vi/".concat(videoId, "/").concat(poster, ".jpg");
  var ytUrl = noCookie ? "https://www.youtube-nocookie.com" : "https://www.youtube.com";
  var iframeSrc = !playlist ? "".concat(ytUrl, "/embed/").concat(videoId, "?autoplay=1") : "".concat(ytUrl, "/embed/videoseries?list=").concat(videoId);

  var warmConnections = function warmConnections() {
    if (preconnected) return;
    setPreconnected(true);
  };

  var addIframe = function addIframe() {
    if (iframeLoaded) return;
    setIframeLoaded(true);
  };

  return React.createElement(React.Fragment, null, React.createElement("link", {
    rel: "preload",
    href: posterUrl,
    as: "image"
  }), React.createElement(React.Fragment, null, preconnected && React.createElement(React.Fragment, null, React.createElement("link", {
    rel: "preconnect",
    href: ytUrl
  }), React.createElement("link", {
    rel: "preconnect",
    href: "https://www.google.com"
  }), adNetwork && React.createElement(React.Fragment, null, React.createElement("link", {
    rel: "preconnect",
    href: "https://static.doubleclick.net"
  }), React.createElement("link", {
    rel: "preconnect",
    href: "https://googleads.g.doubleclick.net"
  })))), React.createElement("div", {
    onPointerOver: warmConnections,
    onClick: addIframe,
    className: "".concat(wrapperClass, " ").concat(iframeLoaded && activatedClass),
    "data-title": videoTitle,
    style: {
      backgroundImage: "url(".concat(posterUrl, ")")
    }
  }, React.createElement("div", {
    className: playerClass
  }), iframeLoaded && React.createElement("iframe", {
    className: iframeClass,
    title: videoTitle,
    width: "560",
    height: "315",
    frameBorder: "0",
    allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
    allowFullScreen: true,
    src: iframeSrc
  })));
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
  autoPlay: false
};
export default LiteYouTubeEmbed;