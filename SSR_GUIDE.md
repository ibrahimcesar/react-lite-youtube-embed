# Server-Side Rendering (SSR) Guide

This guide addresses common SSR issues with `react-lite-youtube-embed`, particularly for Next.js users.

## Issue #46: Understanding the 2022 SSR Problem

### What Was Reported

Users experienced that clicking the YouTube thumbnail did not trigger video playback when using the component in Next.js with SSR.

### Root Cause

The component uses conditional rendering based on client-side state, which can cause React hydration mismatches:

```typescript
const [preconnected, setPreconnected] = React.useState(false);

// Later in render:
{preconnected && (
  <>
    <link rel="preconnect" href={ytUrl} />
    <link rel="preconnect" href="https://www.google.com" />
  </>
)}
```

**During SSR:**
1. Server renders HTML with `preconnected=false` (no preconnect links)
2. HTML is sent to client
3. React hydrates and expects same structure
4. User interaction changes state
5. Potential mismatch can cause React to bail out of hydration

### Current Status

✅ **The issue should be resolved** in current versions (2.5.7+) as long as you follow the setup instructions correctly.

## Setup for Next.js (App Router)

### 1. Install the Package

```bash
npm install react-lite-youtube-embed
```

### 2. Import CSS Globally

**app/layout.tsx** or **app/globals.css**:

```typescript
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
```

### 3. Use the Component

```typescript
import LiteYouTubeEmbed from 'react-lite-youtube-embed';

export default function Page() {
  return (
    <LiteYouTubeEmbed
      id="dQw4w9WgXcQ"
      title="Rick Astley - Never Gonna Give You Up"
    />
  );
}
```

## Setup for Next.js (Pages Router)

### 1. Import CSS in _app.js

```javascript
// pages/_app.js
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp;
```

### 2. Use the Component

```typescript
import LiteYouTubeEmbed from 'react-lite-youtube-embed';

export default function Home() {
  return (
    <LiteYouTubeEmbed
      id="dQw4w9WgXcQ"
      title="Rick Astley - Never Gonna Give You Up"
    />
  );
}
```

## Troubleshooting SSR Issues

### Issue: "Click doesn't work after SSR"

**Symptoms:**
- Thumbnail loads correctly
- Hover effects work
- Clicking does nothing

**Solutions:**

1. **Verify CSS is loaded:**
   ```typescript
   // Check in browser DevTools that styles are applied
   // The .yt-lite class should have proper styling
   ```

2. **Check for hydration warnings:**
   ```bash
   # Open browser console and look for warnings like:
   # "Warning: Text content did not match..."
   # "Warning: Prop `%s` did not match..."
   ```

3. **Use `suppressHydrationWarning` if needed:**
   ```typescript
   // Only if you see hydration warnings
   <LiteYouTubeEmbed
     id="dQw4w9WgXcQ"
     title="Video Title"
     // This is a last resort
   />
   ```

4. **Ensure client-side JavaScript is enabled:**
   ```typescript
   // The component requires JavaScript to work
   // Check that Next.js is properly hydrating
   ```

### Issue: "Missing preconnect links"

**This is by design!** The component intentionally delays preconnecting to YouTube/Google until user interaction (hover) for better performance.

**Why:**
- Reduces initial page load connections
- Only connects when user shows interest
- Privacy-focused (no early tracking)

**The preconnect links appear when:**
1. User hovers over the thumbnail (`onPointerOver`)
2. Before iframe loads

### Issue: "Styles not loading"

**Common causes:**

1. **CSS not imported globally:**
   ```typescript
   // ❌ Wrong - importing in component file
   import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

   // ✅ Correct - import in _app.js or layout.tsx
   ```

2. **CSS import order issues:**
   ```typescript
   // Make sure your global styles don't override the component styles
   ```

3. **Next.js CSS modules conflict:**
   ```typescript
   // If using CSS modules, ensure they don't conflict
   // with .yt-lite, .lty-playbtn classes
   ```

## Advanced SSR Patterns

### Pre-loading Iframe (Skip Click)

If you want the video iframe to load immediately on SSR:

```typescript
<LiteYouTubeEmbed
  id="dQw4w9WgXcQ"
  title="Video Title"
  alwaysLoadIframe={true}
  autoplay={true}
  muted={true}  // Required for autoplay to work
/>
```

### Custom Thumbnail for Better SSR

Provide a custom thumbnail URL to avoid dynamic thumbnail fetching:

```typescript
<LiteYouTubeEmbed
  id="dQw4w9WgXcQ"
  title="Video Title"
  thumbnail="https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
/>
```

### SEO Optimization for SSR

Add structured data for better SEO:

```typescript
<LiteYouTubeEmbed
  id="dQw4w9WgXcQ"
  title="Rick Astley - Never Gonna Give You Up"
  seo={{
    name: "Rick Astley - Never Gonna Give You Up (Official Video)",
    description: "The official video for Never Gonna Give You Up",
    uploadDate: "2009-10-25T07:00:00Z",
    duration: "PT3M33S"
  }}
/>
```

This ensures search engines can properly index your videos even with the lite embed.

## Testing SSR

### Test in Development

```bash
npm run dev
# Visit http://localhost:3000
# Disable JavaScript in browser DevTools
# Verify component renders (even without JS)
```

### Test Production Build

```bash
npm run build
npm run start
# Test with JavaScript enabled and disabled
```

### Verify Hydration

```javascript
// Add to your page component for debugging
useEffect(() => {
  console.log('Component hydrated and mounted');
}, []);
```

## Performance Best Practices

1. **Use appropriate thumbnail resolution:**
   ```typescript
   // For better performance, use lower resolution thumbnails
   <LiteYouTubeEmbed poster="hqdefault" /> // Default
   <LiteYouTubeEmbed poster="maxresdefault" /> // Higher quality, larger file
   ```

2. **Enable WebP format:**
   ```typescript
   <LiteYouTubeEmbed webp={true} />
   ```

3. **Lazy load below the fold:**
   ```typescript
   // Use Next.js native lazy loading for videos below fold
   import dynamic from 'next/dynamic';

   const LiteYouTubeEmbed = dynamic(
     () => import('react-lite-youtube-embed'),
     { ssr: false } // Skip SSR if needed
   );
   ```

## Common Mistakes

### ❌ Don't Do This

```typescript
// Don't import CSS in component files
import React from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'; // ❌ Wrong place

export default function VideoComponent() {
  return <LiteYouTubeEmbed id="..." title="..." />;
}
```

### ✅ Do This Instead

```typescript
// Import CSS once in _app.js or layout.tsx
// pages/_app.js
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'; // ✅ Correct

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```

## Still Having Issues?

1. **Check the demo app** - The `/demo` folder contains a working Next.js 14 implementation
2. **Enable verbose logging** - Check browser console for errors
3. **Test without SSR** - Use `ssr: false` to isolate the issue
4. **Report the bug** - Open an issue with:
   - Next.js version
   - React version
   - Browser console errors
   - Steps to reproduce

## Related Documentation

- [Next.js CSS Documentation](https://nextjs.org/docs/app/building-your-application/styling/css)
- [React Hydration Documentation](https://react.dev/reference/react-dom/client/hydrateRoot)
- [Component README](./README.md)
- [SEO Guide](./README.md#-seo--search-engine-optimization)
