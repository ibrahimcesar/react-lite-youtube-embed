/**
* react-lite-youtube-embed v2.3.5
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

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function LiteYouTubeEmbed(props) {
    var _a = React__namespace.useState(false), preconnected = _a[0], setPreconnected = _a[1];
    var _b = React__namespace.useState(false), iframe = _b[0], setIframe = _b[1];
    var videoId = encodeURIComponent(props.id);
    var videoPlaylisCovertId = typeof props.playlistCoverId === 'string' ? encodeURIComponent(props.playlistCoverId) : null;
    var videoTitle = props.title;
    var posterImp = props.poster || "hqdefault";
    var paramsImp = "&" + props.params || "";
    var mutedImp = props.muted ? "&mute=1" : "";
    var announceWatch = props.announce || "Watch";
    var format = props.webp ? 'webp' : 'jpg';
    var vi = props.webp ? 'vi_webp' : 'vi';
    var posterUrl = props.thumbnail || (!props.playlist
        ? "https://i.ytimg.com/" + vi + "/" + videoId + "/" + posterImp + "." + format
        : "https://i.ytimg.com/" + vi + "/" + videoPlaylisCovertId + "/" + posterImp + "." + format);
    var ytUrl = props.noCookie
        ? "https://www.youtube-nocookie.com"
        : "https://www.youtube.com";
    ytUrl = props.cookie
        ? "https://www.youtube.com"
        : "https://www.youtube-nocookie.com";
    var iframeSrc = !props.playlist
        ? ytUrl + "/embed/" + videoId + "?autoplay=1&state=1" + mutedImp + paramsImp
        : ytUrl + "/embed/videoseries?autoplay=1" + mutedImp + "&list=" + videoId + paramsImp;
    var activatedClassImp = props.activatedClass || "lyt-activated";
    var adNetworkImp = props.adNetwork || false;
    var aspectHeight = props.aspectHeight || 9;
    var aspectWidth = props.aspectWidth || 16;
    var iframeClassImp = props.iframeClass || "";
    var playerClassImp = props.playerClass || "lty-playbtn";
    var wrapperClassImp = props.wrapperClass || "yt-lite";
    var onIframeAdded = props.onIframeAdded || function () { };
    var rel = props.rel ? 'prefetch' : 'preload';
    var ContainerElement = props.containerElement || 'article';
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
    React__namespace.useEffect(function () {
        if (iframe) {
            onIframeAdded();
        }
    }, [iframe]);
    return (React__namespace.createElement(React__namespace.Fragment, null,
        React__namespace.createElement("link", { rel: rel, href: posterUrl, as: "image" }),
        React__namespace.createElement(React__namespace.Fragment, null, preconnected && (React__namespace.createElement(React__namespace.Fragment, null,
            React__namespace.createElement("link", { rel: "preconnect", href: ytUrl }),
            React__namespace.createElement("link", { rel: "preconnect", href: "https://www.google.com" }),
            adNetworkImp && (React__namespace.createElement(React__namespace.Fragment, null,
                React__namespace.createElement("link", { rel: "preconnect", href: "https://static.doubleclick.net" }),
                React__namespace.createElement("link", { rel: "preconnect", href: "https://googleads.g.doubleclick.net" })))))),
        React__namespace.createElement(ContainerElement, { onPointerOver: warmConnections, onClick: addIframe, className: wrapperClassImp + " " + (iframe ? activatedClassImp : ""), "data-title": videoTitle, style: __assign({ backgroundImage: "url(" + posterUrl + ")" }, {
                '--aspect-ratio': (aspectHeight / aspectWidth) * 100 + "%",
            }) },
            React__namespace.createElement("button", { type: "button", className: playerClassImp, "aria-label": announceWatch + " " + videoTitle }),
            iframe && (React__namespace.createElement("iframe", { className: iframeClassImp, title: videoTitle, width: "560", height: "315", frameBorder: "0", allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true, src: iframeSrc })))));
}

module.exports = LiteYouTubeEmbed;
//# sourceMappingURL=index.jsx.map
