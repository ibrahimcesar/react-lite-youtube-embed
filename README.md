# React Lite YouTube Embed

<div align="center">

**Private, performant YouTube embeds for React. Under 5KB gzipped.**

[![npm version](https://img.shields.io/npm/v/react-lite-youtube-embed)](https://www.npmjs.com/package/react-lite-youtube-embed)
[![npm downloads](https://img.shields.io/npm/dt/react-lite-youtube-embed)](https://www.npmjs.com/package/react-lite-youtube-embed)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg)](#contributors)

[![ES Module Size](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/ibrahimcesar/react-lite-youtube-embed/main/.github/badges/size-es.json)](https://github.com/ibrahimcesar/react-lite-youtube-embed/actions/workflows/size-badges.yml)
[![Coverage](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/ibrahimcesar/react-lite-youtube-embed/main/.github/badges/coverage-tests.json)](https://github.com/ibrahimcesar/react-lite-youtube-embed/actions/workflows/test-badge.yml)
[![CodeQL](https://github.com/ibrahimcesar/react-lite-youtube-embed/actions/workflows/codeql.yml/badge.svg)](https://github.com/ibrahimcesar/react-lite-youtube-embed/actions/workflows/codeql.yml)

### [📚 **Full Documentation & demos** →](https://ibrahimcesar.github.io/react-lite-youtube-embed)

> Complete guides, live examples, and API reference

[![Demo Preview](_example_lite.gif)](https://ibrahimcesar.github.io/react-lite-youtube-embed)

</div>

---

## Why This Component?

YouTube's standard iframe embed adds **over 500KB** and makes **dozens of network requests** before the user even clicks play. This component fixes that:

- ✅ **Tiny** – Under 5KB gzipped (JS + CSS)
- ✅ **Fast** – Loads only a thumbnail until user clicks
- ✅ **Private** – No YouTube cookies or tracking by default
- ✅ **SEO-Friendly** – Structured data for search engines
- ✅ **Accessible** – Full keyboard navigation and screen readers
- ✅ **TypeScript** – Complete type definitions

---

## Basic Usage

### Install

```bash
npm install react-lite-youtube-embed
```

### Import and Use

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

That's it! You now have a performant, private YouTube embed.

---

## Pro Tips

### Lazy Loading for Better Performance

```tsx
<LiteYouTubeEmbed
  id="VIDEO_ID"
  title="Video Title"
  lazyLoad={true}
/>
```

Defers loading offscreen thumbnails, reducing bandwidth and improving mobile performance.

### SEO with Structured Data

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

Enables JSON-LD VideoObject structured data for Google Rich Results.

### Player Events

```tsx
<LiteYouTubeEmbed
  id="VIDEO_ID"
  title="Video Title"
  enableJsApi
  onPlay={() => console.log('Video started')}
  onPause={() => console.log('Video paused')}
  onEnd={() => console.log('Video finished')}
/>
```

React to player state changes for analytics, auto-advancing playlists, and more.

### High Quality Thumbnails

```tsx
<LiteYouTubeEmbed
  id="VIDEO_ID"
  title="Video Title"
  poster="maxresdefault"
/>
```

Use `maxresdefault` for hero sections and featured content.

---

## Documentation

**[📚 Visit the full documentation →](https://ibrahimcesar.github.io/react-lite-youtube-embed)**

- [Getting Started](https://ibrahimcesar.github.io/react-lite-youtube-embed/docs/getting-started)
- [API Reference](https://ibrahimcesar.github.io/react-lite-youtube-embed/docs/api-reference) - Complete props documentation
- [Live Examples](https://ibrahimcesar.github.io/react-lite-youtube-embed/examples) - Interactive demonstrations
- [Code Examples](https://ibrahimcesar.github.io/react-lite-youtube-embed/docs/code-examples) - Copy-paste patterns
- [Performance Guide](https://ibrahimcesar.github.io/react-lite-youtube-embed/docs/performance)
- [Events Documentation](https://ibrahimcesar.github.io/react-lite-youtube-embed/docs/events)

---

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build
npm run build
```

---

## Security

This package includes:

- ✅ **SLSA Build Level 3 Provenance** - Cryptographically signed builds
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

---

## Resources

- [📚 Full Documentation](https://ibrahimcesar.github.io/react-lite-youtube-embed)
- [📦 npm Package](https://www.npmjs.com/package/react-lite-youtube-embed)
- [🐛 Report Issues](https://github.com/ibrahimcesar/react-lite-youtube-embed/issues)
- [📝 Changelog](https://github.com/ibrahimcesar/react-lite-youtube-embed/releases)

---

<div align="center">

**[⬆ Back to Top](#react-lite-youtube-embed)**

Made with 🧩 in Brazil 🇧🇷

</div>
