---
sidebar_position: 2
---

# Getting Started

This guide will help you install and use React Lite YouTube Embed in your project.

## Installation

Install the package using npm:

```bash title="npm"
npm install react-lite-youtube-embed
```

Or using yarn:

```bash title="yarn"
yarn add react-lite-youtube-embed
```

Or using pnpm:

```bash title="pnpm"
pnpm add react-lite-youtube-embed
```

## Basic Usage

Import the component and its CSS file:

```tsx title="App.tsx"
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

### Required Props

Only two props are required:

- **`id`** - The YouTube video ID (the part after `?v=` in YouTube URLs)
- **`title`** - Video title for accessibility (used in `aria-label`)

### Finding the Video ID

The video ID is in the YouTube URL:

```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
                                  └─ This is the video ID
```

For short URLs:

```
https://youtu.be/dQw4w9WgXcQ
                 └─ This is the video ID
```

## Next Steps

Now that you have the basics, explore:

- [API Reference](./api-reference) - All available props and options
- [Privacy Features](./privacy) - Learn about privacy-enhanced mode
- [Performance](./performance) - Optimize loading and rendering
- [Examples](./examples) - Common patterns and use cases
