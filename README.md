# React Lite YouTube Embed

> 📺 A faster and cleaner YouTube embed component for __React__: 1.4kB minified, 699B minified + gzipped

Port of Paul Irish's [Lite YouTube Embed](https://github.com/paulirish/lite-youtube-embed) to a React Component. Provide videos with a supercharged focus on visual performance. The gain is not the same as the web component of the original implementation but saves some requests and gives you more control of the embed visual. An ["Adaptive Loading"](https://www.youtube.com/watch?v=puUPpVrIRkc) way to handle iframes for YouTube.

![iFrame example](https://react-lite-youtube-embed.s3-sa-east-1.amazonaws.com/lite.gif)

## Installation

Use your favorite package manager:

```bash
yarn add react-lite-youtube-embed
```

```bash
npm install react-lite-youtube-embed -S
```

## Basic usage

```javascript
import React from "react";
import { render } from "react-dom";
import { LiteYouTubeEmbed } from "react-lite-youtube-embed";

const App = () => (
  <div>
    <LiteYouTubeEmbed 
      id="L2vS_050c-M"
      title="What’s new in Material Design for the web (Chrome Dev Summit 2019)"
    />
  </div>
);

render(<App />, document.getElementById("root"));
```
And that's it.

## Pro Usage

```javascript
const App = () => (
  <div>
    <LiteYouTubeEmbed
       id="L2vS_050c-M" // Default none, id of the video or playlist
       adNetwork={true} // Default true, to preconnect or not to doubleclick addresses called by YouTube iframe (the adnetwork from Google)
       playlist={false} // Use  true when your ID be from a playlist
       poster="hqdefault" // Defines the image size to call on first render as poster image. Possible values are "default","mqdefault",  "hqdefault", "sddefault" and "maxresdefault". Default value for this prop is "hqdefault". Please be aware that "sddefault" and "maxresdefault", high resolution images are not always avaialble for every video. See: https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api
       title="YouTube Embed" // a11y, always provide a title for iFrames: https://dequeuniversity.com/tips/provide-iframe-titles Help the web be accessible ;)
       noCookie={true} // Default false, connect to YouTube via the Privacy-Enhanced Mode using https://www.youtube-nocookie.com
       defaultPlay={false} // Default false, set defaultPlay as `true` will directly show youtube iframe.
    />
  </div>
);
```

## Bring Your Own Styles

React Lite YouTube Embed is packaged with all original styles from Paul Irish's [Lite YouTube Embed](https://github.com/paulirish/lite-youtube-embed) but you can customize them as you wish passing as a props.

```javascript
const App = () => (
  <div>
    <LiteYouTubeEmbed
       id="L2vS_050c-M"
       activeClass="lyt-activated" // Default as "lyt-activated", gives control to wrapper once clicked
       iframeClass="" // Default none, gives control to add a class to iframe element itself
       playerClass="lty-playbtn" // Default as "lty-playbtn" to control player button styles
       wrapperClass="yt-lite" // Default as "yt-lite" for the div wrapping the area, it is the most important class and needs extra attention, please refer to LiteYouTubeEmbed.css for a reference.
    />
  </div>
);
```
## Issues
Please feel free to open an issue!

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Contributors
Botho ([elbotho](https://github.com/elbotho))


### TO DO:
- Add tests
- More iframe control
- Webpack support

## Thanks

Paul Irish ([paulirish](https://github.com/paulirish)) for [Lite YouTube Embed](https://github.com/paulirish/lite-youtube-embed)  
Acauã Sperl de Faria ([acaua](https://github.com/acaua)) for code review  
Addy Osmani ([addyosmani](https://github.com/addyosmani)) for the Adaptive Loading ideas

## See Also

[React Quicklink](https://www.npmjs.com/package/react-quicklink): Faster subsequent page-loads by prefetching in-viewport links during idle time for __React__

## License
[MIT](https://choosealicense.com/licenses/mit/)
