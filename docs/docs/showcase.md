---
sidebar_position: 8
---

# Showcase

Live examples of React Lite YouTube Embed in action with different configurations and use cases.

import LiteYouTubeEmbed from '@ibrahimcesar/react-lite-youtube-embed';
import '@ibrahimcesar/react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

## Basic Embed

Simple video with default settings using privacy-enhanced mode.

```tsx
<LiteYouTubeEmbed
  id="Y2b7FyaynC0"
  title="The Echo Friendly: Same Mistakes"
/>
```

<div style={{ margin: '2rem 0' }}>
  <LiteYouTubeEmbed
    id="Y2b7FyaynC0"
    title="The Echo Friendly: Same Mistakes (OFFICIAL VIDEO)"
  />
</div>

:::tip Privacy Enhanced
By default, uses `youtube-nocookie.com`, omits ad network preconnect, and uses `hqdefault` thumbnail quality.
:::

---

## High Quality Thumbnail

Using maximum resolution thumbnail for hero sections and featured content.

```tsx
<LiteYouTubeEmbed
  id="1RKqOmSkGgM"
  title="Chappell Roan - Good Luck, Babe!"
  poster="maxresdefault"
/>
```

<div style={{ margin: '2rem 0' }}>
  <LiteYouTubeEmbed
    id="1RKqOmSkGgM"
    title="Chappell Roan - Good Luck, Babe! (Official Lyric Video)"
    poster="maxresdefault"
  />
</div>

:::info MaxRes Thumbnail
The `maxresdefault` setting provides the highest quality thumbnail available. Will downgrade gracefully if not available for a particular video.
:::

---

## Custom Aspect Ratio (4:3)

Classic TV format for older video content.

```tsx
<LiteYouTubeEmbed
  id="Fk-4lXLM34g"
  title="Kate Bush - Wuthering Heights"
  aspectWidth={4}
  aspectHeight={3}
/>
```

<div style={{ margin: '2rem 0' }}>
  <LiteYouTubeEmbed
    id="Fk-4lXLM34g"
    title="Kate Bush - Wuthering Heights - Official Music Video - Version 2"
    aspectWidth={4}
    aspectHeight={3}
  />
</div>

---

## Playlist Mode

Embed entire YouTube playlists with custom cover image.

```tsx
<LiteYouTubeEmbed
  id="PLvFsG9gYFxY9zTBhcFmMcYa3zYfQz7P7F"
  title="Science SONGS"
  playlist={true}
  playlistCoverId="3HRkKznJoZA"
  poster="hqdefault"
/>
```

<div style={{ margin: '2rem 0' }}>
  <LiteYouTubeEmbed
    id="PLvFsG9gYFxY9zTBhcFmMcYa3zYfQz7P7F"
    title="Science SONGS"
    playlist={true}
    playlistCoverId="3HRkKznJoZA"
    poster="hqdefault"
  />
</div>

:::tip Playlist Cover
Playlists don't have standard cover imagery, so use `playlistCoverId` to specify which video's thumbnail appears as the visual representation.
:::

---

## Lazy Loading

Thumbnail loads only when scrolled into viewport for better performance.

```tsx
<LiteYouTubeEmbed
  id="RB-RcX5DS5A"
  title="Coldplay - The Scientist"
  lazyLoad={true}
/>
```

<div style={{ margin: '2rem 0' }}>
  <LiteYouTubeEmbed
    id="RB-RcX5DS5A"
    title="Coldplay - The Scientist (Official 4K Video)"
    lazyLoad={true}
  />
</div>

:::info Performance Tip
Lazy loading defers thumbnail loading until visible, ideal for pages with multiple videos or content below the fold.
:::

---

## WebP Format

Using WebP format for better compression and smaller file sizes.

```tsx
<LiteYouTubeEmbed
  id="8AHCfZTRGiI"
  title="Johnny Cash - Hurt"
  poster="hqdefault"
  webp={true}
/>
```

<div style={{ margin: '2rem 0' }}>
  <LiteYouTubeEmbed
    id="8AHCfZTRGiI"
    title="Johnny Cash - Hurt"
    poster="hqdefault"
    webp={true}
  />
</div>

:::tip WebP Support
Provides better compression with same visual quality. Has 97%+ browser support.
:::

---

## SEO Enhanced

Includes JSON-LD structured data for search engines and rich results.

<div style={{ margin: '2rem 0' }}>
  <LiteYouTubeEmbed
    id="CJ54eImz88w"
    title="Talking Heads - Psycho Killer (Official Video)"
    seo={{
      name: "Talking Heads - Psycho Killer",
      description: "Official video of Talking Heads performing Psycho Killer from the album Talking Heads: 77",
      uploadDate: "2018-12-05T08:00:00Z",
      duration: "PT4M36S"
    }}
  />
</div>

```tsx
<LiteYouTubeEmbed
  id="CJ54eImz88w"
  title="Talking Heads - Psycho Killer"
  seo={{
    name: "Talking Heads - Psycho Killer",
    description: "Official video of Talking Heads performing Psycho Killer from the album Talking Heads: 77",
    uploadDate: "2018-12-05T08:00:00Z",
    duration: "PT4M36S"
  }}
/>
```

:::info SEO Benefits
The `seo` prop enables JSON-LD structured data for search engines, facilitating rich results. Includes automatic noscript fallback for crawlers.
:::

---

## Start Time Parameter

Start video at a specific time using the params prop.

```tsx
<LiteYouTubeEmbed
  id="VdQY7BusJNU"
  title="Cyndi Lauper - Time After Time"
  poster="maxresdefault"
  params="start=114"
/>
```

<div style={{ margin: '2rem 0' }}>
  <LiteYouTubeEmbed
    id="VdQY7BusJNU"
    title="Cyndi Lauper - Time After Time (Official HD Video)"
    poster="maxresdefault"
    params="start=114"
  />
</div>

:::tip URL Parameters
Use the `params` prop to pass YouTube URL parameters. Specify start time in seconds (e.g., `start=114` instead of `t=1m54s`).
:::

---

## Player Control

Programmatic player control using the iframe's postMessage API.

```tsx
<LiteYouTubeEmbed
  id="K4dx42YzQCE"
  title="The White Stripes - The Hardest Button To Button"
/>
```

<div style={{ margin: '2rem 0' }}>
  <LiteYouTubeEmbed
    id="K4dx42YzQCE"
    title="The White Stripes - The Hardest Button To Button (Official Music Video)"
  />
</div>

:::info JavaScript API
Enable `enableJsApi={true}` for programmatic control. Combine with `alwaysLoadIframe={true}` to load iframe without user interaction.
:::

---

## Enhanced Accessibility

Internationalization support and improved keyboard navigation.

```tsx
<LiteYouTubeEmbed
  id="aXJ_Ub1xbhw"
  title="Pitty - Admirável Chip Novo"
/>
```

<div style={{ margin: '2rem 0' }}>
  <LiteYouTubeEmbed
    id="aXJ_Ub1xbhw"
    title="Pitty - Admirável Chip Novo (Clipe Oficial)"
  />
</div>

:::tip Accessibility
Use `announce` prop for internationalization (e.g., "Assistir" for Portuguese) and `focusOnLoad` to improve keyboard navigation.
:::

---

## Event Handling

Comprehensive event handling for player state changes.

```tsx
<LiteYouTubeEmbed
  id="eBG7P-K-r1Y"
  title="Foo Fighters - Everlong"
/>
```

<div style={{ margin: '2rem 0' }}>
  <LiteYouTubeEmbed
    id="eBG7P-K-r1Y"
    title="Foo Fighters - Everlong (Official HD Video)"
  />
</div>

:::warning React Ref Required
A React ref is **REQUIRED** for events to work. Enable `enableJsApi={true}` and use event handlers like `onReady`, `onPlay`, `onPause`, `onEnd`.
:::

---

## Grid Layout

Multiple videos in a responsive grid with lazy loading.

<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '1.5rem',
  margin: '2rem 0'
}}>
  <div>
    <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Classic Rock</h4>
    <LiteYouTubeEmbed
      id="8AHCfZTRGiI"
      title="Johnny Cash - Hurt"
      poster="mqdefault"
      lazyLoad={true}
    />
  </div>
  <div>
    <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>New Wave</h4>
    <LiteYouTubeEmbed
      id="CJ54eImz88w"
      title="Talking Heads - Psycho Killer"
      poster="mqdefault"
      lazyLoad={true}
    />
  </div>
  <div>
    <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Pop</h4>
    <LiteYouTubeEmbed
      id="VdQY7BusJNU"
      title="Cyndi Lauper - Time After Time"
      poster="mqdefault"
      lazyLoad={true}
    />
  </div>
  <div>
    <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Alternative</h4>
    <LiteYouTubeEmbed
      id="RB-RcX5DS5A"
      title="Coldplay - The Scientist"
      poster="mqdefault"
      lazyLoad={true}
    />
  </div>
</div>

```tsx title="Grid layout code"
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '1.5rem'
}}>
  <LiteYouTubeEmbed id="..." title="..." poster="mqdefault" lazyLoad={true} />
  <LiteYouTubeEmbed id="..." title="..." poster="mqdefault" lazyLoad={true} />
  <LiteYouTubeEmbed id="..." title="..." poster="mqdefault" lazyLoad={true} />
  <LiteYouTubeEmbed id="..." title="..." poster="mqdefault" lazyLoad={true} />
</div>
```

---

## Performance Benefits

Try clicking the videos above and notice:

- ✅ **Instant load** - No delay before you can interact
- ✅ **Small initial size** - Only thumbnail loaded (10-50KB)
- ✅ **No tracking** - Privacy-enhanced mode by default
- ✅ **Smooth transition** - Seamless switch to real video
- ✅ **Works everywhere** - No framework-specific code

:::tip Why So Fast?
Each video above loaded only a thumbnail (~10-50KB) instead of a full YouTube iframe (~500KB+). Click any video to see the real player load instantly!
:::

---

## More Resources

All these examples use the same component with different props. Explore more:

- [API Reference](./api-reference) - Complete props documentation
- [Live Examples](./examples) - Interactive demonstrations
- [Code Examples](./code-examples) - Copy-paste code patterns
- [Performance Guide](./performance) - Optimization techniques
