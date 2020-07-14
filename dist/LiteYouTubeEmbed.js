import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { Fragment, useState, useRef, useEffect } from "react";
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
      wrapperClass = _ref.wrapperClass;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      preconnected = _useState2[0],
      setPreconnected = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      iframe = _useState4[0],
      setIframe = _useState4[1];

  var videoId = encodeURIComponent(id);
  var videoTitle = title;
  var posterUrl = "https://i.ytimg.com/vi/".concat(videoId, "/").concat(poster, ".jpg");
  var ytUrl = noCookie ? "https://www.youtube-nocookie.com" : "https://www.youtube.com";
  var iframeSrc = !playlist ? "".concat(ytUrl, "/embed/").concat(videoId, "?autoplay=1") : "".concat(ytUrl, "/embed/videoseries?list=").concat(videoId);
  var refVideo = useRef();

  var warmConnections = function warmConnections() {
    if (preconnected) return;
    setPreconnected(true);
  };

  var addIframe = function addIframe() {
    if (iframe) return;
    setIframe(true);
  };

  useEffect(function () {
    var current = refVideo.current;
    current.style.backgroundImage = "url('".concat(posterUrl, "')");
    current.addEventListener("pointerover", warmConnections, true);
    current.addEventListener("click", addIframe, true);
    return function () {
      current.removeEventListener("pointerover", warmConnections);
      current.removeEventListener("click", addIframe);
    };
  });
  return React.createElement(Fragment, null, React.createElement("link", {
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
    className: "".concat(wrapperClass, " ").concat(iframe && activatedClass),
    "data-title": videoTitle,
    ref: refVideo
  }, React.createElement("div", {
    className: playerClass
  }), iframe && React.createElement("iframe", {
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
  wrapperClass: "yt-lite"
};
export default LiteYouTubeEmbed;