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

### [📚 **Full Documentation** →](https://ibrahimcesar.github.io/react-lite-youtube-embed)

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

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/afzalsayed96"><img src="https://avatars.githubusercontent.com/u/14029371?v=4?s=100" width="100px;" alt="Afzal Sayed"/><br /><sub><b>Afzal Sayed</b></sub></a><br /><a href="https://github.com/ibrahimcesar/react-lite-youtube-embed/commits?author=afzalsayed96" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://agustinvaleriani.com/"><img src="https://avatars.githubusercontent.com/u/11182223?v=4?s=100" width="100px;" alt="Agu Valeriani"/><br /><sub><b>Agu Valeriani</b></sub></a><br /><a href="https://github.com/ibrahimcesar/react-lite-youtube-embed/commits?author=avaleriani" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://botho.cc/"><img src="https://avatars.githubusercontent.com/u/1258870?v=4?s=100" width="100px;" alt="Botho"/><br /><sub><b>Botho</b></sub></a><br /><a href="https://github.com/ibrahimcesar/react-lite-youtube-embed/commits?author=elbotho" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/FunctionDJ"><img src="https://avatars.githubusercontent.com/u/34871211?v=4?s=100" width="100px;" alt="FunctionDJ"/><br /><sub><b>FunctionDJ</b></sub></a><br /><a href="https://github.com/ibrahimcesar/react-lite-youtube-embed/commits?author=FunctionDJ" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://ibrahimcesar.cloud/"><img src="https://avatars.githubusercontent.com/u/509054?v=4?s=100" width="100px;" alt="Ibrahim Cesar"/><br /><sub><b>Ibrahim Cesar</b></sub></a><br /><a href="https://github.com/ibrahimcesar/react-lite-youtube-embed/commits?author=ibrahimcesar" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://lachlanjc.com/"><img src="https://avatars.githubusercontent.com/u/5074763?v=4?s=100" width="100px;" alt="Lachlan Campbell"/><br /><sub><b>Lachlan Campbell</b></sub></a><br /><a href="https://github.com/ibrahimcesar/react-lite-youtube-embed/commits?author=lachlanjc" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/LichLord91"><img src="https://avatars.githubusercontent.com/u/8435580?v=4?s=100" width="100px;" alt="LichLord91"/><br /><sub><b>LichLord91</b></sub></a><br /><a href="https://github.com/ibrahimcesar/react-lite-youtube-embed/commits?author=LichLord91" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/perbergland"><img src="https://avatars.githubusercontent.com/u/2690254?v=4?s=100" width="100px;" alt="Per Bergland"/><br /><sub><b>Per Bergland</b></sub></a><br /><a href="https://github.com/ibrahimcesar/react-lite-youtube-embed/commits?author=perbergland" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/humet"><img src="https://avatars.githubusercontent.com/u/3963951?v=4?s=100" width="100px;" alt="Rob Humar"/><br /><sub><b>Rob Humar</b></sub></a><br /><a href="https://github.com/ibrahimcesar/react-lite-youtube-embed/commits?author=humet" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://theodorusclarence.com/"><img src="https://avatars.githubusercontent.com/u/55318172?v=4?s=100" width="100px;" alt="Theodorus Clarence"/><br /><sub><b>Theodorus Clarence</b></sub></a><br /><a href="https://github.com/ibrahimcesar/react-lite-youtube-embed/commits?author=theodorusclarence" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://macwright.com/"><img src="https://avatars.githubusercontent.com/u/32314?v=4?s=100" width="100px;" alt="Tom MacWright"/><br /><sub><b>Tom MacWright</b></sub></a><br /><a href="https://github.com/ibrahimcesar/react-lite-youtube-embed/commits?author=tmcw" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

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
