---
sidebar_position: 5
---

# Performance Optimization

React Lite YouTube Embed is built for performance. This guide shows you how to maximize speed and efficiency.

## Performance Benefits

### Out of the Box

Without any configuration, you get:

- ✅ **< 5KB gzipped** - Tiny bundle size
- ✅ **~500KB saved** - vs standard YouTube iframe
- ✅ **~30 fewer requests** - Only thumbnail until click
- ✅ **2-3s faster TTI** - Time to Interactive improvement

### How It Works

```tsx
// Before user clicks:
// - Loads only thumbnail image (~10-50KB)
// - No YouTube iframe
// - No YouTube JavaScript
// - No tracking scripts

// After user clicks:
// - Replaces thumbnail with real iframe
// - YouTube takes over from there
```

## Lazy Loading

Enable lazy loading for offscreen videos to improve initial page load:

```tsx title="Lazy load thumbnails"
<LiteYouTubeEmbed
  id="VIDEO_ID"
  title="Video Title"
  lazyLoad={true}
/>
```

**Benefits:**
- Thumbnail doesn't load until video scrolls into viewport
- Reduces initial bandwidth
- Improves Lighthouse scores
- Better mobile performance

**Use when:**
- You have multiple videos on one page
- Videos are below the fold
- Mobile performance is critical

## Thumbnail Quality

Choose thumbnail quality based on your needs:

```tsx title="Optimize thumbnail size"
<LiteYouTubeEmbed
  id="VIDEO_ID"
  title="Video Title"
  poster="hqdefault"  // 480x360px - balanced (default)
/>
```

**Available options:**

| Quality | Size | File Size | Use Case |
|---------|------|-----------|----------|
| `default` | 120x90px | ~5KB | Mobile, small thumbnails |
| `mqdefault` | 320x180px | ~15KB | Balanced mobile |
| `hqdefault` | 480x360px | ~30KB | **Recommended** - best balance |
| `sddefault` | 640x480px | ~50KB | Desktop, large previews |
| `maxresdefault` | 1280x720px | ~100KB | Hero sections, critical images |

```tsx title="Mobile-optimized example"
<LiteYouTubeEmbed
  id="VIDEO_ID"
  title="Video Title"
  poster="mqdefault"  // Smaller for mobile
  lazyLoad={true}     // Lazy load offscreen
/>
```

## WebP Format

Use WebP for better compression (when available):

```tsx title="Use WebP thumbnails"
<LiteYouTubeEmbed
  id="VIDEO_ID"
  title="Video Title"
  webp={true}
/>
```

**Benefits:**
- ~30% smaller file size vs JPEG
- Same visual quality
- Better compression

**Limitations:**
- Not all videos have WebP thumbnails
- Falls back to JPEG automatically if unavailable

## Resource Hints

Use resource hints to prioritize critical videos:

```tsx title="Preload above-the-fold video"
<LiteYouTubeEmbed
  id="VIDEO_ID"
  title="Video Title"
  rel="preload"  // Prioritize this thumbnail
/>
```

**Options:**
- `preload` - High priority, loads ASAP
- `prefetch` - Low priority, loads when idle

**Use `preload` for:**
- Above-the-fold videos
- Hero section embeds
- Critical content

**Use `prefetch` for:**
- Below-the-fold videos
- Secondary content
- Optional videos

## Aspect Ratio

Set custom aspect ratios to prevent layout shift:

```tsx title="Custom aspect ratio"
<LiteYouTubeEmbed
  id="VIDEO_ID"
  title="Video Title"
  aspectWidth={21}
  aspectHeight={9}  // 21:9 ultrawide
/>
```

**Common ratios:**
- `16:9` - Default, standard video
- `4:3` - Classic video format
- `21:9` - Ultrawide
- `1:1` - Square (social media)

## Multiple Videos

Optimize pages with many videos:

```tsx title="Multiple videos optimization"
<div className="video-grid">
  {videos.map((video) => (
    <LiteYouTubeEmbed
      key={video.id}
      id={video.id}
      title={video.title}
      lazyLoad={true}        // Lazy load all
      poster="mqdefault"     // Smaller thumbnails
      webp={true}            // WebP compression
    />
  ))}
</div>
```

## Performance Checklist

For maximum performance:

```tsx title="Optimized configuration"
<LiteYouTubeEmbed
  id="VIDEO_ID"
  title="Video Title"
  lazyLoad={true}           // Lazy load if below fold
  poster="hqdefault"        // Balanced quality
  webp={true}               // WebP compression
  rel="preload"             // If above fold
/>
```

## Lighthouse Scores

Expected improvements with React Lite YouTube Embed:

| Metric | Standard YouTube | Lite Embed | Improvement |
|--------|-----------------|------------|-------------|
| **Performance** | 60-70 | 90-100 | +30-40 points |
| **LCP** | 3.5s | 1.5s | -2s |
| **TBT** | 500ms | 100ms | -400ms |
| **Bundle Size** | ~500KB | &lt;5KB | -495KB |

## Real-World Example

```tsx title="Hero section video (above fold)"
<LiteYouTubeEmbed
  id="HERO_VIDEO_ID"
  title="Hero Video"
  poster="maxresdefault"  // High quality for hero
  rel="preload"           // High priority
  webp={true}             // Better compression
  lazyLoad={false}        // Don't lazy load above fold
/>
```

```tsx title="Grid of videos (below fold)"
{videos.map((video) => (
  <LiteYouTubeEmbed
    key={video.id}
    id={video.id}
    title={video.title}
    poster="mqdefault"    // Smaller for grid
    lazyLoad={true}       // Lazy load below fold
    webp={true}           // WebP compression
  />
))}
```

## Monitoring Performance

Use browser DevTools to measure:

```bash
# Chrome DevTools
1. Open DevTools (F12)
2. Go to Network tab
3. Reload page
4. Compare "Before click" vs "After click"

# Lighthouse
1. Open DevTools
2. Go to Lighthouse tab
3. Run audit
4. Check Performance score
```

## Next Steps

- [API Reference](./api-reference) - All performance-related props
- [Privacy Features](./privacy) - Privacy + performance
- [Examples](./examples) - Performance patterns
