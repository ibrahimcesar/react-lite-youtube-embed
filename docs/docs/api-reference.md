# API Reference

Complete reference for all props and options available in React Lite YouTube Embed.

## Props

### Required Props

#### `id`

- **Type:** `string`
- **Required:** Yes
- **Description:** The YouTube video ID (the alphanumeric code in the video URL)

```tsx
<LiteYouTubeEmbed id="dQw4w9WgXcQ" title="Video" />
```

#### `title`

- **Type:** `string`
- **Required:** Yes
- **Description:** Video title used for accessibility (aria-label) and SEO

```tsx
<LiteYouTubeEmbed
  id="dQw4w9WgXcQ"
  title="Rick Astley - Never Gonna Give You Up"
/>
```

---

### Optional Props

#### `adNetwork`

- **Type:** `boolean`
- **Default:** `false`
- **Description:** Allow personalized ads (uses `youtube.com` instead of `youtube-nocookie.com`)

```tsx
<LiteYouTubeEmbed id="VIDEO_ID" title="Video" adNetwork={true} />
```

#### `aspectHeight`

- **Type:** `number`
- **Default:** `9`
- **Description:** Aspect ratio height (used with `aspectWidth` for custom ratios)

```tsx
<LiteYouTubeEmbed
  id="VIDEO_ID"
  title="Video"
  aspectWidth={4}
  aspectHeight={3}
/>
```

#### `aspectWidth`

- **Type:** `number`
- **Default:** `16`
- **Description:** Aspect ratio width (16:9 by default)

```tsx
<LiteYouTubeEmbed
  id="VIDEO_ID"
  title="Video"
  aspectWidth={21}
  aspectHeight={9}
/>
```

#### `autoplay`

- **Type:** `boolean`
- **Default:** `false`
- **Description:** Automatically play video when iframe loads (after user clicks)

```tsx
<LiteYouTubeEmbed id="VIDEO_ID" title="Video" autoplay={true} />
```

#### `cookie`

- **Type:** `boolean`
- **Default:** `false`
- **Description:** Use standard YouTube with cookies (`youtube.com` instead of `youtube-nocookie.com`)

```tsx
<LiteYouTubeEmbed id="VIDEO_ID" title="Video" cookie={true} />
```

:::warning Deprecated
The `noCookie` prop is deprecated. Use `cookie` prop instead.
:::

#### `customThumbnail`

- **Type:** `string`
- **Description:** Custom thumbnail URL (overrides YouTube's default thumbnails)

```tsx
<LiteYouTubeEmbed
  id="VIDEO_ID"
  title="Video"
  customThumbnail="https://example.com/thumbnail.jpg"
/>
```

#### `enableJsApi`

- **Type:** `boolean`
- **Default:** `false`
- **Description:** Enable YouTube Player API for JavaScript control

```tsx
<LiteYouTubeEmbed id="VIDEO_ID" title="Video" enableJsApi={true} />
```

#### `focusOnLoad`

- **Type:** `boolean`
- **Default:** `false`
- **Description:** Automatically focus iframe when it loads (improves keyboard navigation)

```tsx
<LiteYouTubeEmbed id="VIDEO_ID" title="Video" focusOnLoad={true} />
```

#### `iframeClass`

- **Type:** `string`
- **Description:** Custom CSS class for the iframe element

```tsx
<LiteYouTubeEmbed
  id="VIDEO_ID"
  title="Video"
  iframeClass="custom-iframe"
/>
```

#### `lazyLoad`

- **Type:** `boolean`
- **Default:** `false`
- **Description:** Enable lazy loading for thumbnail image (improves performance for offscreen videos)

```tsx
<LiteYouTubeEmbed id="VIDEO_ID" title="Video" lazyLoad={true} />
```

#### `muted`

- **Type:** `boolean`
- **Default:** `false`
- **Description:** Mute video by default

```tsx
<LiteYouTubeEmbed id="VIDEO_ID" title="Video" muted={true} />
```

#### `onIframeAdded`

- **Type:** `() => void`
- **Description:** Callback function triggered when iframe is added to DOM (after user clicks)

```tsx
<LiteYouTubeEmbed
  id="VIDEO_ID"
  title="Video"
  onIframeAdded={() => console.log('Video started')}
/>
```

#### `params`

- **Type:** `Record<string, string | number>`
- **Description:** Additional YouTube player parameters ([full list](https://developers.google.com/youtube/player_parameters))

```tsx
<LiteYouTubeEmbed
  id="VIDEO_ID"
  title="Video"
  params={{
    color: 'white',
    controls: 0,
    modestbranding: 1
  }}
/>
```

#### `playerClass`

- **Type:** `string`
- **Default:** `'lty-playbtn'`
- **Description:** Custom CSS class for the play button

```tsx
<LiteYouTubeEmbed
  id="VIDEO_ID"
  title="Video"
  playerClass="custom-play-btn"
/>
```

#### `playlist`

- **Type:** `boolean`
- **Default:** `false`
- **Description:** Enable playlist mode (loops the video)

```tsx
<LiteYouTubeEmbed id="VIDEO_ID" title="Video" playlist={true} />
```

#### `playlistCoverId`

- **Type:** `string`
- **Description:** Use a different video's thumbnail for playlist cover

```tsx
<LiteYouTubeEmbed
  id="PLAYLIST_ID"
  title="Playlist"
  playlist={true}
  playlistCoverId="COVER_VIDEO_ID"
/>
```

#### `poster`

- **Type:** `'default' | 'hqdefault' | 'mqdefault' | 'sddefault' | 'maxresdefault'`
- **Default:** `'hqdefault'`
- **Description:** YouTube thumbnail quality

```tsx
<LiteYouTubeEmbed
  id="VIDEO_ID"
  title="Video"
  poster="maxresdefault"
/>
```

**Available qualities:**
- `default` - 120x90px
- `hqdefault` - 480x360px (recommended)
- `mqdefault` - 320x180px
- `sddefault` - 640x480px
- `maxresdefault` - 1280x720px (not available for all videos)

#### `referrerPolicy`

- **Type:** `string`
- **Default:** `'strict-origin-when-cross-origin'`
- **Description:** Referrer policy for iframe

```tsx
<LiteYouTubeEmbed
  id="VIDEO_ID"
  title="Video"
  referrerPolicy="no-referrer"
/>
```

#### `rel`

- **Type:** `'prefetch' | 'preload'`
- **Description:** Resource hint for thumbnail image

```tsx
<LiteYouTubeEmbed id="VIDEO_ID" title="Video" rel="preload" />
```

#### `seo`

- **Type:** `SEOData`
- **Description:** Structured data for SEO (adds JSON-LD VideoObject)

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

#### `thumbnail`

- **Type:** `string`
- **Description:** Custom thumbnail filename (advanced use)

```tsx
<LiteYouTubeEmbed
  id="VIDEO_ID"
  title="Video"
  thumbnail="custom-thumb.webp"
/>
```

#### `webp`

- **Type:** `boolean`
- **Default:** `false`
- **Description:** Use WebP format for thumbnails (better compression, not supported by all videos)

```tsx
<LiteYouTubeEmbed id="VIDEO_ID" title="Video" webp={true} />
```

#### `wrapperClass`

- **Type:** `string`
- **Default:** `'yt-lite'`
- **Description:** Custom CSS class for the wrapper element

```tsx
<LiteYouTubeEmbed
  id="VIDEO_ID"
  title="Video"
  wrapperClass="custom-wrapper"
/>
```

---

## SEOData Type

```typescript
interface SEOData {
  name: string;           // Video title
  description: string;    // Video description
  uploadDate?: string;    // ISO 8601 date (e.g., "2024-01-15T08:00:00Z")
  duration?: string;      // ISO 8601 duration (e.g., "PT3M33S" for 3min 33sec)
  thumbnailUrl?: string;  // Custom thumbnail URL
}
```

---

## Next Steps

- [Privacy Features](./privacy) - Learn about privacy-enhanced mode
- [Performance](./performance) - Optimize loading and rendering
- [Events & Callbacks](./events) - Handle video events
- [Examples](./examples) - See live examples
