# React Lite YouTube Embed - Demo

This is the [Next.js](https://nextjs.org/) demo for [React Lite YouTube Embed](https://github.com/ibrahimcesar/react-lite-youtube-embed).

**Live Demo:** https://ibrahimcesar.github.io/react-lite-youtube-embed

## About This Demo

This demo showcases all the features and use cases of the `react-lite-youtube-embed` component. It is automatically deployed to GitHub Pages whenever a new release is published, ensuring the demo always uses the latest version from npm.

### Features

- 📦 **Version Display**: Shows the current component version in use
- 🧪 **Beta Banner**: Visual indicator when using pre-release versions
- 📱 **Responsive Design**: Works on all device sizes
- 🎨 **Code Examples**: Each demo includes the corresponding code
- 🔗 **Quick Links**: Direct links to npm, GitHub, and documentation

## Getting Started

### Running Locally

```bash
cd demo
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the demo.

### Building for Production

```bash
npm run build
```

This creates a static export in the `out/` directory, which can be deployed to any static hosting service.

### Testing Production Build Locally

```bash
npm run build
npx serve out
```

## Configuration

The demo is configured for GitHub Pages deployment:

- **Static Export**: Uses Next.js `output: 'export'` for static site generation
- **Base Path**: Configured to work with GitHub Pages URL structure (`/react-lite-youtube-embed`)
- **Version Sync**: Automatically updates to use the latest published npm version

See [../.github/GITHUB_PAGES.md](../.github/GITHUB_PAGES.md) for detailed deployment documentation.

## Demo Examples

The demo includes examples of:

1. **Basic Usage** - Default video embed
2. **Thumbnail Quality** - Different poster resolutions (maxresdefault, mqdefault, hqdefault)
3. **WebP Format** - Using WebP images for better performance
4. **Playlists** - Embedding YouTube playlists
5. **Custom Parameters** - Passing URL parameters (start time, etc.)

## Automated Deployment

This demo is automatically deployed via GitHub Actions:

- **Trigger**: On every release (including pre-releases)
- **Process**: Updates package version → Build → Deploy to GitHub Pages
- **URL**: https://ibrahimcesar.github.io/react-lite-youtube-embed

## Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Syntax Highlighting**: [Prism.js](https://prismjs.com/)
- **Component**: [react-lite-youtube-embed](https://www.npmjs.com/package/react-lite-youtube-embed) (from npm)

## Project Structure

```
demo/
├── pages/
│   ├── _app.js          # Next.js app wrapper
│   └── index.js         # Main demo page (with version display)
├── styles/
│   ├── globals.css      # Global styles
│   └── Home.module.css  # Component-scoped styles (includes version badge & banner)
├── public/              # Static assets
├── next.config.js       # Next.js configuration (with GitHub Pages basePath)
├── package.json         # Dependencies (updated automatically by CI/CD)
└── out/                 # Build output (generated, not committed)
```

## Development Tips

- The demo uses the published npm package, not the local source code
- To test with local changes, temporarily use `npm link` or file path in package.json
- Always run `npm run build` to verify static export works before committing changes
- The `basePath` is only applied in production builds (GitHub Pages), not in development

## Contributing

To add new examples or improve the demo:

1. Make your changes in the `demo/` directory
2. Test locally with `npm run dev`
3. Ensure `npm run build` succeeds without errors
4. Submit a pull request

The demo will be automatically updated with the next release.

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Next.js Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports) - static site generation
- [React Lite YouTube Embed](https://github.com/ibrahimcesar/react-lite-youtube-embed) - the component documentation
- [GitHub Pages](https://docs.github.com/en/pages) - hosting documentation
