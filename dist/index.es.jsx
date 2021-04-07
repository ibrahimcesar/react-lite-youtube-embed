
    /**
* react-lite-youtube-embed v1.0.49
*  https://github.com/ibrahimcesar/react-lite-youtube-embed.git
*
*  Copyright (c) Ibrahim Cesar (https://twitter.com/ibrahimcesar) and project contributors.
*
*  This source code is licensed under the MIT license found in the
*  LICENSE file in the root directory of this source tree.
*/
    import * as React from 'react';
import { useState } from 'react';

function LiteYouTubeEmbed(props) {
    var _a = useState(false), preconnected = _a[0], setPreconnected = _a[1];
    var _b = useState(false), iframe = _b[0], setIframe = _b[1];
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
    return (React.createElement(React.Fragment, null,
        React.createElement("link", { rel: "preload", href: posterUrl, as: "image" }),
        React.createElement(React.Fragment, null, preconnected && (React.createElement(React.Fragment, null,
            React.createElement("link", { rel: "preconnect", href: ytUrl }),
            React.createElement("link", { rel: "preconnect", href: "https://www.google.com" }),
            adNetworkImp && (React.createElement(React.Fragment, null,
                React.createElement("link", { rel: "preconnect", href: "https://static.doubleclick.net" }),
                React.createElement("link", { rel: "preconnect", href: "https://googleads.g.doubleclick.net" })))))),
        React.createElement("div", { onPointerOver: warmConnections, onClick: addIframe, className: wrapperClassImp + " " + (iframe && activatedClassImp), "data-title": videoTitle, style: { backgroundImage: "url(" + posterUrl + ")" } },
            React.createElement("div", { className: playerClassImp }),
            iframe && (React.createElement("iframe", { className: iframeClassImp, title: videoTitle, width: "560", height: "315", frameBorder: "0", allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true, src: iframeSrc })))));
}

export default LiteYouTubeEmbed;
//# sourceMappingURL=index.es.jsx.map
