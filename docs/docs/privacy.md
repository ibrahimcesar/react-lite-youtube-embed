---
sidebar_position: 4
---

# Privacy Features

React Lite YouTube Embed is **privacy-first by default**. This guide explains how privacy features work and how to configure them.

## Privacy-Enhanced Mode (Default)

By default, all videos load from `youtube-nocookie.com`, which:

- ✅ **Blocks tracking cookies** until the user clicks play
- ✅ **Prevents automatic data collection** by YouTube
- ✅ **GDPR/CCPA compliant** by default (user consent via click)
- ✅ **No performance impact** - works exactly like standard YouTube

```tsx title="Privacy-Enhanced Mode (default)"
<LiteYouTubeEmbed
  id="dQw4w9WgXcQ"
  title="Video Title"
/>
// Uses youtube-nocookie.com automatically
```

## Standard YouTube Mode

If you need personalized ads or analytics, you can opt into standard YouTube:

```tsx title="Standard YouTube with cookies"
<LiteYouTubeEmbed
  id="dQw4w9WgXcQ"
  title="Video Title"
  cookie={true}
/>
// Uses youtube.com with full tracking
```

:::warning Cookie Consent
When using `cookie={true}`, you should obtain user consent before rendering the component, as it may track users even before they click play (depending on your cookie consent implementation).
:::

## Ad Network Mode

Similar to `cookie` prop, but more explicit about enabling personalized ads:

```tsx title="Enable ad network"
<LiteYouTubeEmbed
  id="dQw4w9WgXcQ"
  title="Video Title"
  adNetwork={true}
/>
// Uses youtube.com for personalized ads
```

## Compliance

### GDPR (Europe)

**Privacy-enhanced mode (default) is GDPR-compliant** because:

1. No cookies are set until the user clicks play
2. The user action (clicking) serves as consent
3. No personal data is collected before interaction

```tsx title="GDPR-compliant by default"
<LiteYouTubeEmbed
  id="VIDEO_ID"
  title="Video Title"
  // No cookie prop needed - privacy mode is default
/>
```

### CCPA (California)

The same privacy-first approach satisfies CCPA requirements:

- No personal information is "sold" before user consent
- User has clear control (must click to activate)
- Data collection is transparent (only after iframe loads)

## Referrer Policy

Control what information is sent in the `Referer` header:

```tsx title="Strict referrer policy"
<LiteYouTubeEmbed
  id="VIDEO_ID"
  title="Video Title"
  referrerPolicy="no-referrer"
/>
```

**Options:**
- `no-referrer` - No referrer information sent
- `strict-origin` - Only send origin on HTTPS → HTTPS
- `strict-origin-when-cross-origin` - Default, balanced approach
- [All standard values](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy)

## Privacy Checklist

For maximum privacy:

```tsx title="Maximum privacy configuration"
<LiteYouTubeEmbed
  id="VIDEO_ID"
  title="Video Title"
  cookie={false}            // Default: privacy-enhanced mode
  adNetwork={false}         // Default: no ad network
  referrerPolicy="no-referrer"  // No referrer info
  lazyLoad={true}          // Don't load thumbnail until in viewport
/>
```

## Comparison Table

| Feature | Default (Privacy Mode) | `cookie={true}` |
|---------|----------------------|-----------------|
| Domain | `youtube-nocookie.com` | `youtube.com` |
| Cookies before click | ❌ No | ✅ Yes |
| Tracking before click | ❌ No | ✅ Yes |
| Personalized ads | ❌ No | ✅ Yes |
| GDPR compliant | ✅ Yes | ⚠️ Requires consent |
| Performance | ⚡ Same | ⚡ Same |

## Next Steps

- [Performance Optimization](./performance) - Optimize loading
- [API Reference](./api-reference) - All privacy-related props
- [Examples](./examples) - Privacy configuration examples
