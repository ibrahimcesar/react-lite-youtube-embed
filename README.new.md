# React Lite YouTube Embed

<div align="center">

**Private, performant YouTube embeds for React. Under 5KB gzipped.**

[![npm version](https://img.shields.io/npm/v/react-lite-youtube-embed)](https://www.npmjs.com/package/react-lite-youtube-embed)
[![npm downloads](https://img.shields.io/npm/dt/react-lite-youtube-embed)](https://www.npmjs.com/package/react-lite-youtube-embed)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)

[![ES Module Size](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/ibrahimcesar/react-lite-youtube-embed/main/.github/badges/size-es.json)](https://github.com/ibrahimcesar/react-lite-youtube-embed/actions/workflows/size-badges.yml)
[![Coverage](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/ibrahimcesar/react-lite-youtube-embed/main/.github/badges/coverage-tests.json)](https://github.com/ibrahimcesar/react-lite-youtube-embed/actions/workflows/test-badge.yml)
[![CodeQL](https://github.com/ibrahimcesar/react-lite-youtube-embed/actions/workflows/codeql.yml/badge.svg)](https://github.com/ibrahimcesar/react-lite-youtube-embed/actions/workflows/codeql.yml)

### [🚀 **Try the Live Demo** →](https://ibrahimcesar.github.io/react-lite-youtube-embed)

> Interactive demo with all features and code examples • Updated with each release

[![Demo Preview](_example_lite.gif)](https://ibrahimcesar.github.io/react-lite-youtube-embed)

</div>

---

## Why This Component?

YouTube's standard iframe embed can add **over 500KB** to your page and make **dozens of network requests** before the user even clicks play. This component fixes that:

- ✅ **Tiny** – Under 5KB gzipped total (JS + CSS)
- ✅ **Fast** – Loads only a thumbnail until the user clicks
- ✅ **Private** – No YouTube cookies or tracking by default
- ✅ **SEO-Friendly** – Structured data for search engines
- ✅ **Accessible** – Full keyboard navigation and screen reader support
- ✅ **TypeScript** – Complete type definitions included

**The result?** Faster page loads, better privacy, and a superior user experience.

---

## Quick Start

### Install

```bash
npm install react-lite-youtube-embed
```

### Use

```tsx
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

export default function App() {
  return (
    <LiteYouTubeEmbed
      id="dQw4w9WgXcQ"
      title="Rick Astley - Never Gonna Give You Up"
    />
  );
}
```

That's it. You now have a performant, private YouTube embed.

---

## Core Features

### 🔒 Privacy First

**Privacy-Enhanced Mode is the default.** Videos load from `youtube-nocookie.com`, blocking YouTube cookies and tracking until the user explicitly clicks play.

```tsx
// Default: Privacy-Enhanced Mode (youtube-nocookie.com)
<LiteYouTubeEmbed id="VIDEO_ID" title="Video Title" />

// Opt into standard YouTube (with cookies)
<LiteYouTubeEmbed id="VIDEO_ID" title="Video Title" cookie={true} />
```

### ⚡ Performance Optimization

Enable lazy loading for images to defer offscreen thumbnails and boost Lighthouse scores:

```tsx
<LiteYouTubeEmbed
  id="VIDEO_ID"
  title="Video Title"
  lazyLoad={true}
/>
```

**Impact:** Defers loading offscreen images, reduces bandwidth, improves mobile performance.

### 🔍 SEO & Search Visibility

Help search engines discover your videos with structured data:

```tsx
<LiteYouTubeEmbed
  id="VIDEO_ID"
  title="Video Title"
  seo={{
    name: "Full Video Title",
    description: "Video description for search engines",
    uploadDate: "2024-01-15T08:00:00Z",
    duration: "PT3M33S"
  }}
/>
```

**Includes:**
- JSON-LD VideoObject structured data
- Noscript fallback for non-JS users
- Google Rich Results eligibility

**Fetch metadata automatically:**
```bash
./scripts/fetch-youtube-metadata.sh VIDEO_ID --format react
```

[→ Full SEO Documentation](#-seo--search-engine-optimization)

### 🎬 Player Events (New in v3)

React to player state changes, playback controls, and errors:

```tsx
import LiteYouTubeEmbed, { PlayerState, PlayerError } from 'react-lite-youtube-embed';

<LiteYouTubeEmbed
  id="VIDEO_ID"
  title="Video Title"
  enableJsApi

  // Simple handlers
  onPlay={() => console.log('Started')}
  onPause={() => console.log('Paused')}
  onEnd={() => console.log('Finished')}

  // Advanced handlers
  onStateChange={(e) => console.log('State:', e.state)}
  onError={(code) => console.error('Error:', code)}
  onPlaybackRateChange={(rate) => console.log('Speed:', rate)}
/>
```

[→ Full Event Documentation](#-player-events-new-in-v30)

### 🎮 Programmatic Control

Control the player via YouTube's iframe API using refs:

```tsx
function VideoPlayer() {
  const playerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  const handlePause = () => {
    playerRef.current?.contentWindow?.postMessage(
      '{"event":"command","func":"pauseVideo"}',
      '*'
    );
  };

  return (
    <>
      <LiteYouTubeEmbed
        id="VIDEO_ID"
        title="Video Title"
        ref={playerRef}
        enableJsApi
        onIframeAdded={() => setIsReady(true)}
      />
      {isReady && <button onClick={handlePause}>Pause</button>}
    </>
  );
}
```

[→ Full Control Documentation](#-controlling-the-player)

---

## Installation Options

### NPM (Recommended)

```bash
npm install react-lite-youtube-embed
```

### Yarn

```bash
yarn add react-lite-youtube-embed
```

### GitHub Packages

```bash
npm install @ibrahimcesar/react-lite-youtube-embed
```

See [GITHUB_PACKAGES.md](GITHUB_PACKAGES.md) for authentication details.

---

## API Reference

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| **id** | `string` | YouTube video or playlist ID |
| **title** | `string` | Video title for iframe (accessibility requirement) |

### Common Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| cookie | `boolean` | `false` | Use standard YouTube (true) or Privacy-Enhanced Mode (false) |
| lazyLoad | `boolean` | `false` | Enable native lazy loading for thumbnails |
| poster | `string` | `"hqdefault"` | Thumbnail quality: `"default"`, `"mqdefault"`, `"hqdefault"`, `"sddefault"`, `"maxresdefault"` |
| params | `string` | `""` | Additional URL parameters (e.g., `"start=90&end=120"`) |
| enableJsApi | `boolean` | `false` | Enable iframe API for programmatic control |
| playlist | `boolean` | `false` | Set to true if ID is a playlist |

### Event Props (require `enableJsApi={true}`)

| Prop | Type | Description |
|------|------|-------------|
| onReady | `(event) => void` | Player is ready to receive commands |
| onPlay | `() => void` | Video started playing |
| onPause | `() => void` | Video was paused |
| onEnd | `() => void` | Video finished playing |
| onBuffering | `() => void` | Video is buffering |
| onStateChange | `(event) => void` | Player state changed |
| onError | `(code) => void` | Player encountered an error |
| onPlaybackRateChange | `(rate) => void` | Playback speed changed |
| onPlaybackQualityChange | `(quality) => void` | Video quality changed |

### Advanced Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| adNetwork | `boolean` | `false` | Preconnect to Google's ad network |
| alwaysLoadIframe | `boolean` | `false` | Load iframe immediately (not recommended) |
| announce | `string` | `"Watch"` | Screen reader announcement text |
| aspectHeight | `number` | `9` | Custom aspect ratio height |
| aspectWidth | `number` | `16` | Custom aspect ratio width |
| autoplay | `boolean` | `false` | Autoplay video (requires `muted={true}`) |
| focusOnLoad | `boolean` | `false` | Focus iframe when loaded |
| muted | `boolean` | `false` | Mute video audio |
| noscriptFallback | `boolean` | `true` | Include noscript tag with YouTube link |
| onIframeAdded | `() => void` | - | Callback when iframe loads (use for ref availability) |
| playlistCoverId | `string` | - | Video ID for playlist cover image |
| referrerPolicy | `string` | `"strict-origin-when-cross-origin"` | Iframe referrer policy |
| seo | `VideoSEO` | - | SEO metadata object |
| stopOnEnd | `boolean` | `false` | Stop video when it ends to prevent related videos |
| style | `object` | `{}` | Custom container styles |
| thumbnail | `string` | - | Custom thumbnail image URL |
| webp | `boolean` | `false` | Use WebP format for thumbnails |

### Styling Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| wrapperClass | `string` | `"yt-lite"` | Main wrapper class |
| playerClass | `string` | `"lty-playbtn"` | Play button class |
| iframeClass | `string` | `""` | Iframe element class |
| activeClass | `string` | `"lyt-activated"` | Class when activated |
| containerElement | `string` | `"article"` | HTML element for container |

### Deprecated Props

| Prop | Replacement | Note |
|------|-------------|------|
| noCookie | Use `cookie` prop | Inverted logic for clarity |
| rel | Use `resourceHint` | Conflicted with YouTube's `rel` parameter |

[→ See all props with examples in the demo](https://ibrahimcesar.github.io/react-lite-youtube-embed)

---

## Styling

### Option 1: Import the CSS (Recommended)

```tsx
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
```

### Option 2: Copy to Global CSS

For Next.js, Remix, or other frameworks, copy the CSS to your global stylesheet. [See CSS source](https://github.com/ibrahimcesar/react-lite-youtube-embed/blob/main/src/lib/LiteYouTubeEmbed.css)

### Option 3: Custom Styles

Use CSS-in-JS or pass custom class names:

```tsx
<LiteYouTubeEmbed
  id="VIDEO_ID"
  title="Video Title"
  wrapperClass="my-custom-wrapper"
  playerClass="my-custom-button"
  activeClass="video-playing"
/>
```

---

## Common Use Cases

### Stop Video to Hide Related Videos

Automatically return to thumbnail when the video ends:

```tsx
<LiteYouTubeEmbed
  id="VIDEO_ID"
  title="Video Title"
  enableJsApi
  stopOnEnd={true}
  params="rel=0"
/>
```

### Video Gallery with Analytics

```tsx
function VideoGallery() {
  return videos.map(video => (
    <LiteYouTubeEmbed
      key={video.id}
      id={video.id}
      title={video.title}
      lazyLoad
      onPlay={() => analytics.track('video_play', { id: video.id })}
      onEnd={() => analytics.track('video_complete', { id: video.id })}
    />
  ));
}
```

### Auto-Advancing Playlist

```tsx
function Playlist() {
  const videos = ['video1', 'video2', 'video3'];
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <LiteYouTubeEmbed
      id={videos[currentIndex]}
      title={`Video ${currentIndex + 1}`}
      enableJsApi
      onEnd={() => {
        if (currentIndex < videos.length - 1) {
          setCurrentIndex(currentIndex + 1);
        }
      }}
    />
  );
}
```

### Custom Play/Pause Controls

```tsx
function CustomPlayer() {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    const command = isPlaying ? 'pauseVideo' : 'playVideo';
    playerRef.current?.contentWindow?.postMessage(
      `{"event":"command","func":"${command}"}`,
      '*'
    );
  };

  return (
    <>
      <LiteYouTubeEmbed
        id="VIDEO_ID"
        title="Video Title"
        ref={playerRef}
        enableJsApi
        alwaysLoadIframe
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <button onClick={togglePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </>
  );
}
```

---

## Framework Guides

### Next.js / SSR Setup

Using Next.js 13+ App Router or any server-side rendering framework? See the [SSR Guide](./SSR_GUIDE.md) for:
- Setup instructions
- Troubleshooting common issues
- Best practices
- TypeScript configuration

### TypeScript

Full TypeScript support is included. Import types as needed:

```tsx
import LiteYouTubeEmbed, {
  PlayerState,
  PlayerError,
  VideoSEO,
  PlayerReadyEvent,
  PlayerStateChangeEvent
} from 'react-lite-youtube-embed';
```

---

## 🔍 SEO & Search Engine Optimization

Improve your video discoverability in search engines with structured data and fallback links.

### Why SEO Matters

By default, search engine crawlers cannot discover videos embedded with lite embeds because:
- No followable links exist before user interaction
- No structured metadata for search engines to index
- The facade pattern is invisible to crawlers

This component now supports **JSON-LD structured data** and **noscript fallbacks** to solve these issues.

### Basic SEO Setup

```tsx
<LiteYouTubeEmbed
  id="L2vS_050c-M"
  title="What's new in Material Design"
  seo={{
    name: "What's new in Material Design for the web",
    description: "Learn about the latest Material Design updates presented at Chrome Dev Summit 2019",
    uploadDate: "2019-11-11T08:00:00Z",
    duration: "PT15M33S"
  }}
/>
```

This generates:
- ✅ **JSON-LD structured data** following [schema.org VideoObject](https://schema.org/VideoObject)
- ✅ **Noscript fallback** with direct YouTube link
- ✅ **Google rich results** eligibility (video carousels, thumbnails in search)

### Fetching Video Metadata

Use the included helper script to quickly fetch video metadata:

```bash
# Make the script executable (first time only)
chmod +x scripts/fetch-youtube-metadata.sh

# Fetch metadata in JSON format
./scripts/fetch-youtube-metadata.sh dQw4w9WgXcQ

# Get ready-to-use React component code
./scripts/fetch-youtube-metadata.sh dQw4w9WgXcQ --format react
```

**Requirements:** `curl` and `jq` must be installed.

### SEO Prop Reference

```typescript
interface VideoSEO {
  name?: string;           // Video title (falls back to title prop)
  description?: string;    // Video description (50-160 chars recommended)
  uploadDate?: string;     // ISO 8601 date (e.g., "2024-01-15T08:00:00Z")
  duration?: string;       // ISO 8601 duration (e.g., "PT3M33S")
  thumbnailUrl?: string;   // Custom thumbnail (auto-generated if omitted)
  contentUrl?: string;     // YouTube watch URL (auto-generated)
  embedUrl?: string;       // Embed URL (auto-generated)
}
```

### Duration Format Examples

ISO 8601 duration format: `PT#H#M#S`

- `"PT3M33S"` - 3 minutes 33 seconds
- `"PT15M"` - 15 minutes
- `"PT1H30M"` - 1 hour 30 minutes
- `"PT2H15M30S"` - 2 hours 15 minutes 30 seconds

### Verify Your SEO Setup

Test your structured data:
- [Rich Results Test](https://search.google.com/test/rich-results)
- [Schema Markup Validator](https://validator.schema.org/)

---

## 🎬 Player Events (New in v3.0)

Get real-time notifications when the YouTube player changes state, encounters errors, or when users interact with playback controls. All event handlers require `enableJsApi={true}` to work.

### Quick Start

```tsx
import LiteYouTubeEmbed, { PlayerState, PlayerError } from 'react-lite-youtube-embed';

function App() {
  return (
    <LiteYouTubeEmbed
      id="dQw4w9WgXcQ"
      title="Rick Astley - Never Gonna Give You Up"
      enableJsApi

      // Simple convenience handlers
      onPlay={() => console.log('Video started playing')}
      onPause={() => console.log('Video paused')}
      onEnd={() => console.log('Video ended')}

      // Advanced state change handler
      onStateChange={(event) => {
        console.log('State:', event.state);
        console.log('Current time:', event.currentTime);
      }}

      // Error handling
      onError={(errorCode) => {
        if (errorCode === PlayerError.VIDEO_NOT_FOUND) {
          alert('Video not available');
        }
      }}
    />
  );
}
```

### Core Events

**`onReady(event: PlayerReadyEvent)`**

Fires when the player is loaded and ready to receive commands.

```tsx
onReady={(event) => {
  console.log(`Player ready for: ${event.videoId}`);
}}
```

**`onStateChange(event: PlayerStateChangeEvent)`**

Fires whenever the player's state changes.

```tsx
onStateChange={(event) => {
  switch (event.state) {
    case PlayerState.PLAYING:
      console.log('Playing at', event.currentTime, 'seconds');
      break;
    case PlayerState.PAUSED:
      console.log('Paused');
      break;
    case PlayerState.ENDED:
      console.log('Video finished');
      break;
  }
}}
```

**PlayerState values:**
- `PlayerState.UNSTARTED` (-1)
- `PlayerState.ENDED` (0)
- `PlayerState.PLAYING` (1)
- `PlayerState.PAUSED` (2)
- `PlayerState.BUFFERING` (3)
- `PlayerState.CUED` (5)

**`onError(errorCode: PlayerError)`**

Fires when the player encounters an error.

```tsx
onError={(code) => {
  switch (code) {
    case PlayerError.INVALID_PARAM:
      console.error('Invalid video parameter');
      break;
    case PlayerError.VIDEO_NOT_FOUND:
      console.error('Video not found or removed');
      break;
    case PlayerError.NOT_EMBEDDABLE:
      console.error('Video cannot be embedded');
      break;
  }
}}
```

**PlayerError codes:**
- `PlayerError.INVALID_PARAM` (2)
- `PlayerError.HTML5_ERROR` (5)
- `PlayerError.VIDEO_NOT_FOUND` (100)
- `PlayerError.NOT_EMBEDDABLE` (101)
- `PlayerError.NOT_EMBEDDABLE_DISGUISED` (150)

### Convenience Events

Simple wrappers for common use cases:

```tsx
<LiteYouTubeEmbed
  id="VIDEO_ID"
  title="Video Title"
  enableJsApi
  onPlay={() => analytics.track('video_play')}
  onPause={() => analytics.track('video_pause')}
  onEnd={() => loadNextVideo()}
  onBuffering={() => showLoadingSpinner()}
/>
```

### Advanced Events

**`onPlaybackRateChange(playbackRate: number)`**

Fires when playback speed changes. Common values: `0.25`, `0.5`, `1`, `1.5`, `2`.

```tsx
onPlaybackRateChange={(rate) => {
  console.log(`Playback speed: ${rate}x`);
}}
```

**`onPlaybackQualityChange(quality: string)`**

Fires when video quality changes. Values: `"small"` (240p), `"medium"` (360p), `"large"` (480p), `"hd720"`, `"hd1080"`, etc.

```tsx
onPlaybackQualityChange={(quality) => {
  console.log(`Quality changed to: ${quality}`);
}}
```

### Real-World Examples

#### Analytics Tracking

```tsx
function VideoWithAnalytics() {
  const [playStartTime, setPlayStartTime] = useState(null);

  return (
    <LiteYouTubeEmbed
      id="dQw4w9WgXcQ"
      title="My Video"
      enableJsApi
      onReady={() => analytics.track('video_ready')}
      onPlay={() => {
        setPlayStartTime(Date.now());
        analytics.track('video_play');
      }}
      onEnd={() => {
        const watchTime = Date.now() - playStartTime;
        analytics.track('video_complete', { watchTime });
      }}
      onError={(code) => analytics.track('video_error', { errorCode: code })}
    />
  );
}
```

#### Video Playlist with Auto-Advance

```tsx
function VideoPlaylist() {
  const videos = ['dQw4w9WgXcQ', 'abc123def', 'xyz789uvw'];
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <LiteYouTubeEmbed
      id={videos[currentIndex]}
      title={`Video ${currentIndex + 1}`}
      enableJsApi
      onEnd={() => {
        if (currentIndex < videos.length - 1) {
          setCurrentIndex(currentIndex + 1);
        }
      }}
      onError={() => {
        // Skip to next video on error
        if (currentIndex < videos.length - 1) {
          setCurrentIndex(currentIndex + 1);
        }
      }}
    />
  );
}
```

### Important Notes

⚠️ **Events require `enableJsApi={true}`**

⚠️ **Lazy Loading Limitation** - By default, the iframe only loads after the user clicks. Events won't fire until after user interaction. Use `onIframeAdded` callback to know when ready, or use `alwaysLoadIframe={true}` (not recommended for privacy/performance).

⚠️ **Origin Validation** - The component automatically validates events from YouTube domains for security.

⚠️ **Cleanup** - Event listeners are automatically cleaned up on unmount.

---

## 🤖 Controlling the player

You can programmatically control the YouTube player via [YouTube's IFrame Player API](https://developers.google.com/youtube/iframe_api_reference) using refs and `postMessage`.

> **⚠️ Important:** This requires `enableJsApi={true}`. The ref is only available after the user clicks the poster (use `onIframeAdded` callback to know when ready).

```tsx
function VideoPlayer() {
  const ytRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div>
      <button
        onClick={() => {
          setIsPlaying((oldState) => !oldState);
          ytRef.current?.contentWindow?.postMessage(
            `{"event": "command", "func": "${isPlaying ? "pauseVideo" : "playVideo"}"}`,
            "*",
          );
        }}
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <LiteYouTubeEmbed
        title="My Video"
        id="L2vS_050c-M"
        ref={ytRef}
        enableJsApi
        alwaysLoadIframe
      />
    </div>
  );
}
```

### Using Refs with Lazy-Loaded Iframes

**Important:** The ref only becomes available **after** the user clicks the poster.

#### ✅ Correct: Use `onIframeAdded` Callback

```tsx
const videoRef = useRef(null);

const handleIframeAdded = () => {
  console.log("Iframe loaded and ready!");

  if (videoRef.current) {
    videoRef.current.contentWindow?.postMessage(
      '{"event":"command","func":"playVideo"}',
      '*'
    );
  }
};

return (
  <LiteYouTubeEmbed
    id="VIDEO_ID"
    title="My Video"
    ref={videoRef}
    onIframeAdded={handleIframeAdded}
    enableJsApi
  />
);
```

#### ❌ Wrong: Accessing Ref on Mount

```tsx
// This won't work - iframe doesn't exist yet!
useEffect(() => {
  if (videoRef.current) {
    console.log("This never runs");
  }
}, []); // Empty deps - runs before iframe exists
```

---

## FAQ

### Can I hide all related videos after my video ends?

**Short answer:** No, this is a YouTube platform limitation.

**What changed:** In September 2018, YouTube changed the `rel=0` parameter to only limit related videos to the same channel, not hide them completely.

**Best solution:** Use the built-in `stopOnEnd` prop:

```tsx
<LiteYouTubeEmbed
  id="VIDEO_ID"
  title="Video Title"
  enableJsApi
  stopOnEnd={true}
  params="rel=0"
/>
```

This automatically stops the video when it ends and returns to the thumbnail view, preventing related videos from showing.

[→ See more solutions in the docs](#can-i-completely-hide-suggestedrelated-videos-after-my-video-ends)

### How do I use this with Next.js?

See the [SSR Guide](./SSR_GUIDE.md) for detailed Next.js setup instructions and troubleshooting.

### Does this work with playlists?

Yes! Set `playlist={true}` and optionally provide a `playlistCoverId`:

```tsx
<LiteYouTubeEmbed
  id="PLAYLIST_ID"
  title="My Playlist"
  playlist={true}
  playlistCoverId="VIDEO_ID"
/>
```

### Can I customize the thumbnail?

Yes! Use the `thumbnail` prop to provide a custom image URL:

```tsx
<LiteYouTubeEmbed
  id="VIDEO_ID"
  title="Video Title"
  thumbnail="https://example.com/custom-thumbnail.jpg"
/>
```

Or choose a different YouTube thumbnail quality with `poster`:

```tsx
<LiteYouTubeEmbed
  id="VIDEO_ID"
  title="Video Title"
  poster="maxresdefault"
/>
```

---

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Build
npm run build

# Lint
npm run lint

# Format
npm run format
```

---

## Security

This package includes:

- ✅ **SLSA Build Level 3 Provenance** - Cryptographically signed build provenance
- ✅ **CodeQL Analysis** - Automated security scanning
- ✅ **Dependency Audits** - Regular security updates

Verify package authenticity:

```bash
npm audit signatures
```

See [.github/SLSA.md](.github/SLSA.md) for more details.

---

## License

MIT © [Ibrahim Cesar](https://ibrahimcesar.cloud)

See [LICENSE](LICENSE) for full details.

---

## Credits

- **Paul Irish** ([@paulirish](https://github.com/paulirish)) - Original [Lite YouTube Embed](https://github.com/paulirish/lite-youtube-embed)
- **Addy Osmani** ([@addyosmani](https://github.com/addyosmani)) - Adaptive Loading concepts
- **All contributors** - [View contributors](https://github.com/ibrahimcesar/react-lite-youtube-embed/graphs/contributors)

---

## Resources

- [📖 Documentation](https://github.com/ibrahimcesar/react-lite-youtube-embed)
- [🚀 Live Demo](https://ibrahimcesar.github.io/react-lite-youtube-embed)
- [📦 npm Package](https://www.npmjs.com/package/react-lite-youtube-embed)
- [🐛 Report Issues](https://github.com/ibrahimcesar/react-lite-youtube-embed/issues)
- [📝 Changelog](https://github.com/ibrahimcesar/react-lite-youtube-embed/releases)

---

<div align="center">

**[⬆ Back to Top](#react-lite-youtube-embed)**

Made with ❤️ in Brazil 🇧🇷

</div>
