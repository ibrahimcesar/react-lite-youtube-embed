---
sidebar_position: 7
---

# Events & Callbacks

Learn how to handle video events and track user interactions with React Lite YouTube Embed.

## onIframeAdded Callback

The `onIframeAdded` callback is triggered when the user clicks the thumbnail and the real YouTube iframe is added to the DOM.

### Basic Usage

```tsx title="Track when video starts"
import LiteYouTubeEmbed from 'react-lite-youtube-embed';

export default function VideoWithCallback() {
  const handleIframeAdded = () => {
    console.log('User started watching video');
  };

  return (
    <LiteYouTubeEmbed
      id="dQw4w9WgXcQ"
      title="Video"
      onIframeAdded={handleIframeAdded}
    />
  );
}
```

## Analytics Integration

### Google Analytics

Track video plays with Google Analytics:

```tsx title="Google Analytics tracking"
import LiteYouTubeEmbed from 'react-lite-youtube-embed';

export default function TrackedVideo({ videoId, title }) {
  const handleVideoPlay = () => {
    // GA4
    gtag('event', 'video_start', {
      video_id: videoId,
      video_title: title
    });
  };

  return (
    <LiteYouTubeEmbed
      id={videoId}
      title={title}
      onIframeAdded={handleVideoPlay}
    />
  );
}
```

### Segment

```tsx title="Segment tracking"
import { useAnalytics } from '@segment/analytics-react';

export default function SegmentVideo({ videoId, title }) {
  const analytics = useAnalytics();

  const handleVideoPlay = () => {
    analytics.track('Video Played', {
      video_id: videoId,
      video_title: title,
      player_type: 'lite-youtube-embed'
    });
  };

  return (
    <LiteYouTubeEmbed
      id={videoId}
      title={title}
      onIframeAdded={handleVideoPlay}
    />
  );
}
```

### Plausible Analytics

```tsx title="Plausible tracking"
declare global {
  interface Window {
    plausible?: (event: string, options?: any) => void;
  }
}

export default function PlausibleVideo({ videoId, title }) {
  const handleVideoPlay = () => {
    window.plausible?.('Video Play', {
      props: {
        video_id: videoId,
        video_title: title
      }
    });
  };

  return (
    <LiteYouTubeEmbed
      id={videoId}
      title={title}
      onIframeAdded={handleVideoPlay}
    />
  );
}
```

## State Management

### Track Play Count

```tsx title="Count video plays"
import { useState } from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';

export default function PlayCountVideo() {
  const [playCount, setPlayCount] = useState(0);

  return (
    <div>
      <LiteYouTubeEmbed
        id="VIDEO_ID"
        title="Video"
        onIframeAdded={() => setPlayCount(prev => prev + 1)}
      />
      <p>Played {playCount} times</p>
    </div>
  );
}
```

### Track Multiple Videos

```tsx title="Track which videos are playing"
import { useState } from 'react';

export default function MultipleVideos() {
  const [playingVideos, setPlayingVideos] = useState<Set<string>>(new Set());

  const handleVideoPlay = (videoId: string) => {
    setPlayingVideos(prev => new Set(prev).add(videoId));
  };

  const videos = [
    { id: 'video1', title: 'Video 1' },
    { id: 'video2', title: 'Video 2' },
    { id: 'video3', title: 'Video 3' }
  ];

  return (
    <div>
      <p>{playingVideos.size} videos have been played</p>
      <div className="video-grid">
        {videos.map((video) => (
          <LiteYouTubeEmbed
            key={video.id}
            id={video.id}
            title={video.title}
            onIframeAdded={() => handleVideoPlay(video.id)}
          />
        ))}
      </div>
    </div>
  );
}
```

## Engagement Tracking

### Time-Based Tracking

Track when users engage with videos:

```tsx title="Engagement timestamp tracking"
import { useState } from 'react';

interface VideoEngagement {
  videoId: string;
  timestamp: Date;
}

export default function EngagementTracking() {
  const [engagements, setEngagements] = useState<VideoEngagement[]>([]);

  const handleVideoPlay = (videoId: string) => {
    const engagement: VideoEngagement = {
      videoId,
      timestamp: new Date()
    };

    setEngagements(prev => [...prev, engagement]);

    // Send to your backend
    fetch('/api/video-engagement', {
      method: 'POST',
      body: JSON.stringify(engagement)
    });
  };

  return (
    <LiteYouTubeEmbed
      id="VIDEO_ID"
      title="Video"
      onIframeAdded={() => handleVideoPlay('VIDEO_ID')}
    />
  );
}
```

### User Journey Tracking

```tsx title="Track video position in user journey"
import { useEffect, useState } from 'react';

export default function JourneyTracking() {
  const [videoOrder, setVideoOrder] = useState<string[]>([]);

  const handleVideoPlay = (videoId: string) => {
    setVideoOrder(prev => [...prev, videoId]);
  };

  useEffect(() => {
    // Log when user watches videos in sequence
    if (videoOrder.length > 0) {
      console.log('User journey:', videoOrder);
    }
  }, [videoOrder]);

  return (
    <div>
      <h2>Tutorial Series</h2>
      <LiteYouTubeEmbed
        id="tutorial-1"
        title="Part 1"
        onIframeAdded={() => handleVideoPlay('tutorial-1')}
      />
      <LiteYouTubeEmbed
        id="tutorial-2"
        title="Part 2"
        onIframeAdded={() => handleVideoPlay('tutorial-2')}
      />
      <LiteYouTubeEmbed
        id="tutorial-3"
        title="Part 3"
        onIframeAdded={() => handleVideoPlay('tutorial-3')}
      />
    </div>
  );
}
```

## A/B Testing

### Track Conversion by Video

```tsx title="A/B test video effectiveness"
import { useState, useEffect } from 'react';

export default function ABTestVideo() {
  const [variant, setVariant] = useState<'A' | 'B'>('A');
  const [conversions, setConversions] = useState({ A: 0, B: 0 });

  useEffect(() => {
    // Randomly assign variant
    setVariant(Math.random() > 0.5 ? 'A' : 'B');
  }, []);

  const handleVideoPlay = () => {
    // Track that user watched video in this variant
    analytics.track('Video Played', {
      variant,
      video_id: variant === 'A' ? 'VIDEO_A' : 'VIDEO_B'
    });
  };

  return (
    <LiteYouTubeEmbed
      id={variant === 'A' ? 'VIDEO_A' : 'VIDEO_B'}
      title={variant === 'A' ? 'Product Demo A' : 'Product Demo B'}
      onIframeAdded={handleVideoPlay}
    />
  );
}
```

## Performance Monitoring

### Load Time Tracking

```tsx title="Measure iframe load time"
import { useState } from 'react';

export default function PerformanceTracking() {
  const [loadTime, setLoadTime] = useState<number | null>(null);

  const handleVideoPlay = () => {
    const startTime = performance.now();

    // Track iframe load completion
    const checkIframe = setInterval(() => {
      const iframe = document.querySelector('iframe');
      if (iframe) {
        const endTime = performance.now();
        const duration = endTime - startTime;
        setLoadTime(duration);
        clearInterval(checkIframe);

        // Send to analytics
        analytics.track('Video Load Time', {
          duration_ms: duration
        });
      }
    }, 100);
  };

  return (
    <div>
      <LiteYouTubeEmbed
        id="VIDEO_ID"
        title="Video"
        onIframeAdded={handleVideoPlay}
      />
      {loadTime && <p>Loaded in {loadTime.toFixed(0)}ms</p>}
    </div>
  );
}
```

## Error Tracking

### Track Failed Loads

```tsx title="Track video load failures"
import { useState, useEffect } from 'react';

export default function ErrorTracking() {
  const [hasError, setHasError] = useState(false);

  const handleVideoPlay = () => {
    // Monitor for iframe errors
    setTimeout(() => {
      const iframe = document.querySelector('iframe');
      if (!iframe) {
        setHasError(true);

        // Report to error tracking service
        errorTracker.captureMessage('YouTube iframe failed to load', {
          video_id: 'VIDEO_ID'
        });
      }
    }, 5000);
  };

  return (
    <div>
      <LiteYouTubeEmbed
        id="VIDEO_ID"
        title="Video"
        onIframeAdded={handleVideoPlay}
      />
      {hasError && (
        <div className="error">
          Failed to load video. Please try again.
        </div>
      )}
    </div>
  );
}
```

## Callback Best Practices

### Use useCallback

Prevent unnecessary re-renders:

```tsx title="Memoize callback with useCallback"
import { useCallback } from 'react';

export default function OptimizedCallback() {
  const handleVideoPlay = useCallback(() => {
    analytics.track('Video Played');
  }, []); // Empty deps - callback never changes

  return (
    <LiteYouTubeEmbed
      id="VIDEO_ID"
      title="Video"
      onIframeAdded={handleVideoPlay}
    />
  );
}
```

### Debounce Multiple Calls

Prevent duplicate tracking if component re-renders:

```tsx title="Debounce callback"
import { useRef, useCallback } from 'react';

export default function DebouncedCallback() {
  const hasTracked = useRef(false);

  const handleVideoPlay = useCallback(() => {
    if (!hasTracked.current) {
      hasTracked.current = true;
      analytics.track('Video Played');
    }
  }, []);

  return (
    <LiteYouTubeEmbed
      id="VIDEO_ID"
      title="Video"
      onIframeAdded={handleVideoPlay}
    />
  );
}
```

## What onIframeAdded Does NOT Track

The `onIframeAdded` callback fires when:
- ✅ User clicks the thumbnail
- ✅ iframe is added to DOM

It does NOT fire for:
- ❌ When video actually starts playing
- ❌ When video is paused
- ❌ When video ends
- ❌ Video progress/time updates

:::tip YouTube Player API
For detailed playback events (play, pause, end, etc.), use the [YouTube Player API](https://developers.google.com/youtube/iframe_api_reference) with `enableJsApi={true}`.
:::

## Next Steps

- [API Reference](./api-reference) - Complete props documentation
- [Examples](./examples) - More callback patterns
- [Performance](./performance) - Optimize with callbacks
