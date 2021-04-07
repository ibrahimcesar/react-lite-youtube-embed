
    /**
* react-lite-youtube-embed v1.0.49
*  https://github.com/ibrahimcesar/react-lite-youtube-embed.git
*
*  Copyright (c) Ibrahim Cesar < email@ibrahimcesar.com > and project contributors.
*
*  This source code is licensed under the MIT license found in the
*  LICENSE file in the root directory of this source tree.
*
*  Author site: https://ibrahimcesar.cloud
*/
    'use strict';

var React = require('react');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

function LiteYouTubeEmbed(props) {
    var _a = React.useState(false), preconnected = _a[0], setPreconnected = _a[1];
    var _b = React.useState(false), iframe = _b[0], setIframe = _b[1];
    var videoId = encodeURIComponent(props.id);
    var videoTitle = props.title;
    var posterImp = props.poster || "hqdefault";
    var paramsImp = "&" + props.params || "";
    var posterUrl = "https://i.ytimg.com/vi/" + videoId + "/" + posterImp + ".jpg";
    var ytUrl = props.noCookie
        ? "https://www.youtube-nocookie.com"
        : "https://www.youtube.com";
    var iframeSrc = !props.playlist
        ? ytUrl + "/embed/" + videoId + "?autoplay=1" + paramsImp
        : ytUrl + "/embed/videoseries?list=" + videoId + paramsImp;
    var activatedClassImp = props.activatedClass || "lyt-activated";
    var adNetworkImp = props.adNetwork || false;
    var iframeClassImp = props.iframeClass || "";
    var playerClassImp = props.playerClass || "lty-playbtn";
    var wrapperClassImp = props.wrapperClass || "yt-lite";
    var warmConnections = function () {
        if (preconnected)
            return;
        setPreconnected(true);
    };
    var addIframe = function () {
        if (iframe)
            return;
        setIframe(true);
    };
    return (React__namespace.createElement(React__namespace.Fragment, null,
        React__namespace.createElement("link", { rel: "preload", href: posterUrl, as: "image" }),
        React__namespace.createElement(React__namespace.Fragment, null, preconnected && (React__namespace.createElement(React__namespace.Fragment, null,
            React__namespace.createElement("link", { rel: "preconnect", href: ytUrl }),
            React__namespace.createElement("link", { rel: "preconnect", href: "https://www.google.com" }),
            adNetworkImp && (React__namespace.createElement(React__namespace.Fragment, null,
                React__namespace.createElement("link", { rel: "preconnect", href: "https://static.doubleclick.net" }),
                React__namespace.createElement("link", { rel: "preconnect", href: "https://googleads.g.doubleclick.net" })))))),
        React__namespace.createElement("div", { onPointerOver: warmConnections, onClick: addIframe, className: wrapperClassImp + " " + (iframe && activatedClassImp), "data-title": videoTitle, style: { backgroundImage: "url(" + posterUrl + ")" } },
            React__namespace.createElement("div", { className: playerClassImp }),
            iframe && (React__namespace.createElement("iframe", { className: iframeClassImp, title: videoTitle, width: "560", height: "315", frameBorder: "0", allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true, src: iframeSrc })))));
}

module.exports = LiteYouTubeEmbed;
//# sourceMappingURL=index.jsx.map
