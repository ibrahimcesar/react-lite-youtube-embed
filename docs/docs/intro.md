---
sidebar_position: 1
---

# Introduction

**React Lite YouTube Embed** is a private, performant YouTube embed component for React. Under 5KB gzipped.

## Why This Component?

YouTube's standard iframe embed can add **over 500KB** to your page and make **dozens of network requests** before the user even clicks play. This component fixes that:

- ✅ **Tiny** – Under 5KB gzipped total (JS + CSS)
- ✅ **Fast** – Loads only a thumbnail until the user clicks
- ✅ **Private** – No YouTube cookies or tracking by default
- ✅ **SEO-Friendly** – Structured data for search engines
- ✅ **Accessible** – Full keyboard navigation and screen reader support
- ✅ **TypeScript** – Complete type definitions included

**The result?** Faster page loads, better privacy, and a superior user experience.

## Key Benefits

### Performance

YouTube's standard iframe embed loads immediately, making dozens of network requests and adding over 500KB to your page. This component loads only a thumbnail (typically 10-50KB) until the user clicks play.

**Typical savings:**
- ~500KB reduced page weight
- ~30 fewer network requests
- 2-3s faster Time to Interactive

### Privacy

By default, videos load from `youtube-nocookie.com`, which doesn't set tracking cookies until the user explicitly clicks play. This means:

- No YouTube tracking pixels until user consent (click)
- GDPR/CCPA compliant by default
- Better user privacy without sacrificing functionality

### Developer Experience

- Modern React component with hooks
- Full TypeScript support with complete type definitions
- Simple, intuitive API
- Extensive customization options
- Zero dependencies beyond React

## Quick Example

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

## Next Steps

- [Getting Started](./getting-started) - Installation and basic usage
- [API Reference](./api-reference) - Complete props documentation
- [Examples](./examples) - Common use cases and patterns
