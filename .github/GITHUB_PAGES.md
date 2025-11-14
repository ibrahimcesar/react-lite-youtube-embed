# GitHub Pages Demo Setup

This document explains how the automated GitHub Pages deployment works for the `react-lite-youtube-embed` demo.

## Overview

The project includes a Next.js demo application (`/demo`) that is automatically deployed to GitHub Pages whenever a new release is published. The demo always uses the latest published version of the component from npm.

**Live Demo:** https://ibrahimcesar.github.io/react-lite-youtube-embed

## How It Works

### 1. **Automatic Deployment on Releases**

When a release is published (via the Automated Release workflow or manual GitHub release), the `deploy-demo.yml` workflow is triggered automatically:

```yaml
on:
  release:
    types: [published]
```

This works for **both stable releases and pre-releases** (beta, alpha, etc.).

### 2. **Version Synchronization**

The workflow automatically updates the demo to use the exact version that was just released:

1. Extracts the version from the release tag (e.g., `v2.5.7` → `2.5.7`)
2. Updates `demo/package.json` to use that specific version
3. Runs `npm ci` to install dependencies
4. Builds the Next.js app with the new version

### 3. **Static Site Generation**

The Next.js demo is configured for static export (`output: 'export'` in `next.config.js`), which generates:
- Pure HTML/CSS/JS files
- No server-side rendering required
- Perfect for GitHub Pages hosting

The build output goes to `demo/out/` and includes:
- All HTML pages
- Optimized assets
- CSS and JavaScript bundles

### 4. **GitHub Pages Deployment**

The workflow uses GitHub's official Pages deployment action:

```yaml
- uses: actions/upload-pages-artifact@v3
  with:
    path: ./demo/out

- uses: actions/deploy-pages@v4
```

This deploys to: `https://ibrahimcesar.github.io/react-lite-youtube-embed`

## Configuration Details

### Next.js Configuration

The demo uses a special `basePath` configuration for GitHub Pages:

```javascript
// demo/next.config.js
basePath: process.env.NODE_ENV === 'production'
  ? '/react-lite-youtube-embed'
  : ''
```

**Why?** GitHub Pages serves repository projects at `/<repo-name>/`, not at the root. The `basePath` ensures all links and assets work correctly.

### Repository Settings

To enable GitHub Pages, configure in your repository settings:

1. Go to **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Save

No branch selection needed - the workflow handles everything!

## Manual Deployment

You can manually trigger a deployment without creating a release:

1. Go to **Actions** → **Deploy Demo to GitHub Pages**
2. Click **Run workflow**
3. (Optional) Enter a specific version number
4. Click **Run workflow**

If no version is specified, it uses the version from the main `package.json`.

## Demo Features

### Version Display

The demo automatically shows:
- Current component version in use
- Links to npm package and GitHub
- Direct link to the specific version on npm

```javascript
const componentVersion = packageInfo.dependencies['react-lite-youtube-embed'];
```

### Beta Version Banner

When using a pre-release version (beta, alpha, rc), a banner appears at the top:

```
🧪 Beta Version: This demo is using a pre-release version (2.5.7-beta.0)
```

This helps users understand they're viewing an unreleased version.

## Workflow Overview

### On Release Publication:

```
1. Release Published (v2.5.7)
   ↓
2. deploy-demo.yml triggered
   ↓
3. Extract version (2.5.7)
   ↓
4. Update demo/package.json
   npm install react-lite-youtube-embed@2.5.7
   ↓
5. Build demo (npm run build)
   ↓
6. Deploy to GitHub Pages
   ↓
7. Demo live at https://ibrahimcesar.github.io/react-lite-youtube-embed
```

### On Manual Trigger:

```
1. User runs workflow (optionally specifies version)
   ↓
2. Use specified version OR package.json version
   ↓
3. Update demo/package.json
   ↓
4. Build demo
   ↓
5. Deploy to GitHub Pages
```

## File Structure

```
react-lite-youtube-embed/
├── .github/
│   └── workflows/
│       ├── deploy-demo.yml       # GitHub Pages deployment
│       ├── auto-release.yml      # Automated releases
│       └── release.yml           # Manual releases
├── demo/
│   ├── pages/
│   │   ├── index.js             # Main demo page (with version display)
│   │   └── _app.js              # Next.js app wrapper
│   ├── styles/
│   │   └── Home.module.css      # Styles (includes version badge & banner)
│   ├── next.config.js           # Next.js config (basePath for GH Pages)
│   ├── package.json             # Demo dependencies (updated by workflow)
│   └── out/                     # Build output (generated, not committed)
└── src/                         # Main component source
```

## Troubleshooting

### Demo not updating after release

**Check:**
1. Did the workflow run? Go to **Actions** → **Deploy Demo to GitHub Pages**
2. Check workflow logs for errors
3. Verify the release was published (not just created as draft)

**Common issues:**
- Network errors during npm install → Workflow retries automatically
- Build failures → Check Next.js compatibility with new component version
- Permission errors → Ensure Pages write permission is granted

### Assets (images, CSS) not loading

**Cause:** Missing `basePath` configuration

**Fix:** Ensure `next.config.js` has:
```javascript
basePath: process.env.NODE_ENV === 'production' ? '/react-lite-youtube-embed' : ''
```

### Demo shows old version

**Cause:** Caching by GitHub Pages or browser

**Solutions:**
1. Wait 2-5 minutes for GitHub Pages cache to clear
2. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
3. Check `demo/package.json` in the deployed commit

### 404 errors on GitHub Pages

**Cause:** `.nojekyll` file missing

**Fix:** The workflow automatically creates this file. If missing, manually add:
```bash
touch demo/out/.nojekyll
```

The `.nojekyll` file tells GitHub Pages not to process files with Jekyll, which is important for Next.js static exports.

## Development Workflow

### Local Development

Run the demo locally:

```bash
cd demo
npm install
npm run dev
```

Visit: http://localhost:3000

**Note:** In development, `basePath` is empty, so you access the root directly.

### Testing Production Build

Test the production build locally:

```bash
cd demo
npm run build
npx serve out
```

This serves the static files from `demo/out/` just like GitHub Pages would.

## Best Practices

### Release Workflow

1. **Make changes** to the component in `src/`
2. **Run tests**: `npm test`
3. **Build**: `npm run build`
4. **Create release** using the Automated Release workflow
5. **Demo automatically deploys** with the new version
6. **Verify** the demo at the live URL

### Version Management

- Always use semantic versioning
- Beta releases automatically show the beta banner
- Each release triggers a fresh demo deployment
- Demo always reflects the published npm version

### Monitoring Deployments

Check deployment status:
1. **Actions** tab → **Deploy Demo to GitHub Pages**
2. Click on the latest run
3. View logs for each step
4. Check the deployment summary for the live URL

## Advanced Configuration

### Custom Domain

To use a custom domain:

1. Go to **Settings** → **Pages**
2. Enter your custom domain
3. Configure DNS with your provider:
   - Add CNAME record pointing to `ibrahimcesar.github.io`
   - Or A records for GitHub Pages IPs
4. Update `next.config.js` to remove `basePath` for custom domains

### Deploy from Different Branches

To deploy from feature branches:

1. Add `branches` trigger to workflow:
```yaml
on:
  push:
    branches: [feature-demo]
```

2. Modify version detection to use branch name or commit SHA

## Maintenance

### Updating Next.js

When updating Next.js in the demo:

1. Update `demo/package.json`
2. Test locally: `cd demo && npm run build`
3. Commit and push
4. Next release will use the updated version

### Updating Workflow

The workflow uses standard GitHub Actions:
- `actions/checkout@v4`
- `actions/setup-node@v4`
- `actions/upload-pages-artifact@v3`
- `actions/deploy-pages@v4`

Keep these up to date for security and features.

## Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Next.js Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Next.js basePath](https://nextjs.org/docs/app/api-reference/next-config-js/basePath)

## Summary

✅ **Automatic deployment** on every release
✅ **Always up-to-date** with published npm version
✅ **Beta/pre-release support** with visual indicators
✅ **Zero maintenance** - fully automated
✅ **Fast builds** - static site generation
✅ **Version transparency** - shows current version in demo

The GitHub Pages setup ensures users always have a live, up-to-date demo showcasing the latest published version of the component!
