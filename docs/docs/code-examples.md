---
sidebar_position: 7
---

# Code Examples

Common patterns and use cases for React Lite YouTube Embed.

## Basic Usage

### Simple Embed

```tsx title="Simple video embed"
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

export default function SimpleVideo() {
  return (
    <LiteYouTubeEmbed
      id="dQw4w9WgXcQ"
      title="Rick Astley - Never Gonna Give You Up"
    />
  );
}
```

### With Event Callback

Track when users start watching:

```tsx title="Track video plays"
import { useState } from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

export default function TrackedVideo() {
  const [plays, setPlays] = useState(0);

  return (
    <div>
      <LiteYouTubeEmbed
        id="dQw4w9WgXcQ"
        title="Video"
        onIframeAdded={() => {
          setPlays(prev => prev + 1);
          // Send analytics event
          analytics.track('video_played', {
            video_id: 'dQw4w9WgXcQ'
          });
        }}
      />
      <p>This video has been played {plays} times</p>
    </div>
  );
}
```

## Performance Patterns

### Above the Fold (Hero Section)

```tsx title="Hero video (high priority)"
<LiteYouTubeEmbed
  id="HERO_VIDEO"
  title="Product Demo"
  poster="maxresdefault"  // High quality
  rel="preload"           // Load ASAP
  webp={true}             // WebP compression
  lazyLoad={false}        // Don't lazy load
/>
```

### Below the Fold (Grid)

```tsx title="Video grid (optimized)"
<div className="video-grid">
  {videos.map((video) => (
    <LiteYouTubeEmbed
      key={video.id}
      id={video.id}
      title={video.title}
      poster="mqdefault"    // Smaller thumbnails
      lazyLoad={true}       // Lazy load
      webp={true}           // WebP compression
    />
  ))}
</div>
```

### Video List

```tsx title="Video list with descriptions"
interface Video {
  id: string;
  title: string;
  description: string;
}

export default function VideoList({ videos }: { videos: Video[] }) {
  return (
    <div className="space-y-8">
      {videos.map((video) => (
        <article key={video.id} className="flex gap-4">
          <div className="w-80 flex-shrink-0">
            <LiteYouTubeEmbed
              id={video.id}
              title={video.title}
              lazyLoad={true}
              poster="hqdefault"
            />
          </div>
          <div>
            <h3>{video.title}</h3>
            <p>{video.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
```

## Privacy Patterns

### GDPR Compliant (Default)

```tsx title="GDPR compliant by default"
<LiteYouTubeEmbed
  id="VIDEO_ID"
  title="Video Title"
  // No cookie prop needed - privacy mode is default
/>
```

### With Cookie Consent

```tsx title="Conditional cookie consent"
import { useState } from 'react';

export default function ConsentVideo() {
  const [hasConsent, setHasConsent] = useState(false);

  return (
    <div>
      {!hasConsent ? (
        <div className="consent-banner">
          <p>This video requires cookies. Do you consent?</p>
          <button onClick={() => setHasConsent(true)}>
            Accept
          </button>
        </div>
      ) : (
        <LiteYouTubeEmbed
          id="VIDEO_ID"
          title="Video Title"
          cookie={true}
        />
      )}
    </div>
  );
}
```

### Maximum Privacy

```tsx title="Maximum privacy configuration"
<LiteYouTubeEmbed
  id="VIDEO_ID"
  title="Video Title"
  cookie={false}
  adNetwork={false}
  referrerPolicy="no-referrer"
  lazyLoad={true}
/>
```

## SEO Patterns

### With Structured Data

```tsx title="SEO-optimized video"
<LiteYouTubeEmbed
  id="VIDEO_ID"
  title="How to Build a React App"
  seo={{
    name: "How to Build a React App from Scratch",
    description: "Complete tutorial on building a React application with TypeScript, including setup, components, and deployment.",
    uploadDate: "2024-01-15T08:00:00Z",
    duration: "PT15M33S"  // 15 minutes 33 seconds
  }}
/>
```

### Tutorial Series

```tsx title="Video tutorial series"
const tutorials = [
  {
    id: "video1",
    title: "Part 1: Setup",
    description: "Setting up your development environment",
    uploadDate: "2024-01-01T08:00:00Z",
    duration: "PT10M30S"
  },
  {
    id: "video2",
    title: "Part 2: Components",
    description: "Building reusable components",
    uploadDate: "2024-01-08T08:00:00Z",
    duration: "PT15M45S"
  }
];

export default function TutorialSeries() {
  return (
    <div>
      <h1>React Tutorial Series</h1>
      {tutorials.map((tutorial) => (
        <section key={tutorial.id}>
          <h2>{tutorial.title}</h2>
          <LiteYouTubeEmbed
            id={tutorial.id}
            title={tutorial.title}
            seo={{
              name: tutorial.title,
              description: tutorial.description,
              uploadDate: tutorial.uploadDate,
              duration: tutorial.duration
            }}
          />
        </section>
      ))}
    </div>
  );
}
```

## Custom Styling

### Custom Play Button

```tsx title="Custom play button"
<LiteYouTubeEmbed
  id="VIDEO_ID"
  title="Video Title"
  playerClass="custom-play-button"
/>
```

```css title="styles.css"
.custom-play-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  width: 80px;
  height: 80px;
}

.custom-play-button:hover {
  transform: scale(1.1);
  transition: transform 0.2s;
}
```

### Custom Wrapper

```tsx title="Custom wrapper styling"
<LiteYouTubeEmbed
  id="VIDEO_ID"
  title="Video Title"
  wrapperClass="custom-video-wrapper"
/>
```

```css title="styles.css"
.custom-video-wrapper {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.custom-video-wrapper:hover {
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.3s;
}
```

## Advanced Patterns

### Playlist Mode

```tsx title="Playlist embed"
<LiteYouTubeEmbed
  id="PLAYLIST_ID"
  title="My Playlist"
  playlist={true}
  playlistCoverId="COVER_VIDEO_ID"  // Use specific video as thumbnail
/>
```

### Autoplay After Click

```tsx title="Autoplay when iframe loads"
<LiteYouTubeEmbed
  id="VIDEO_ID"
  title="Video Title"
  autoplay={true}  // Plays immediately after user clicks
  muted={true}     // Recommended with autoplay
/>
```

### Custom Thumbnail

```tsx title="Custom thumbnail image"
<LiteYouTubeEmbed
  id="VIDEO_ID"
  title="Video Title"
  customThumbnail="https://example.com/custom-thumbnail.jpg"
/>
```

### Responsive Aspect Ratios

```tsx title="Mobile vs desktop aspect ratios"
import { useState, useEffect } from 'react';

export default function ResponsiveVideo() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <LiteYouTubeEmbed
      id="VIDEO_ID"
      title="Video Title"
      aspectWidth={isMobile ? 1 : 16}
      aspectHeight={isMobile ? 1 : 9}
    />
  );
}
```

### Conditional Loading

```tsx title="Load video based on viewport"
import { useEffect, useRef, useState } from 'react';

export default function ViewportVideo() {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {isInView && (
        <LiteYouTubeEmbed
          id="VIDEO_ID"
          title="Video Title"
        />
      )}
    </div>
  );
}
```

## Framework Integration

### Next.js

```tsx title="pages/video.tsx (Next.js)"
import dynamic from 'next/dynamic';

const LiteYouTubeEmbed = dynamic(
  () => import('react-lite-youtube-embed'),
  { ssr: false }
);

export default function VideoPage() {
  return (
    <div>
      <h1>Video Page</h1>
      <LiteYouTubeEmbed
        id="VIDEO_ID"
        title="Video Title"
      />
    </div>
  );
}
```

### Remix

```tsx title="app/routes/video.tsx (Remix)"
import { ClientOnly } from 'remix-utils/client-only';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';

export default function VideoRoute() {
  return (
    <ClientOnly>
      {() => (
        <LiteYouTubeEmbed
          id="VIDEO_ID"
          title="Video Title"
        />
      )}
    </ClientOnly>
  );
}
```

### Gatsby

```tsx title="src/pages/video.tsx (Gatsby)"
import React from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

export default function VideoPage() {
  return (
    <div>
      <h1>Video Page</h1>
      <LiteYouTubeEmbed
        id="VIDEO_ID"
        title="Video Title"
      />
    </div>
  );
}
```

## Next Steps

- [API Reference](./api-reference) - Complete props documentation
- [Privacy Features](./privacy) - Privacy configuration
- [Performance](./performance) - Performance optimization
