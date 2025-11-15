# Bundle Size Badges

This document explains the automated bundle size badge system for `react-lite-youtube-embed`.

## Overview

The project uses GitHub Actions to automatically generate and update bundle size badges that display in the README. These badges show the gzipped sizes of the JavaScript and CSS files, providing transparency about the package's bundle size.

## How It Works

### Workflow: `size-badges.yml`

The workflow runs on:
- **Push to main**: Updates badges after merges
- **Pull requests**: Generates size report (without committing)
- **Manual trigger**: Via workflow_dispatch

### Process

1. **Build**: Builds the project using `npm run build`
2. **Calculate**: Measures raw and gzipped sizes of:
   - `dist/index.es.js` (ES Module)
   - `dist/index.js` (CommonJS)
   - `dist/LiteYouTubeEmbed.css` (CSS)
3. **Generate**: Creates badge JSON files in `.github/badges/`
4. **Commit**: Commits badge updates to main branch (only on push to main)
5. **Display**: Shields.io endpoint badges render in README

### Badge Files

The workflow generates 5 badge JSON files:

| File | Label | Shows | Limit |
|------|-------|-------|-------|
| `size-es.json` | ES Module (gzip) | Gzipped ES module size | 10KB |
| `size-cjs.json` | CommonJS (gzip) | Gzipped CommonJS size | 10KB |
| `size-css.json` | CSS (gzip) | Gzipped CSS size | 2KB |
| `size-js.json` | JavaScript | Raw + gzipped ES module | 10KB |
| `size-total.json` | Bundle Size | Combined JS + CSS | N/A |

### Color Coding

Badges automatically change color based on size relative to limits:

- **Bright Green** (≤70%): Excellent
- **Green** (71-85%): Good
- **Yellow** (86-95%): Warning
- **Orange** (96-100%): Near limit
- **Red** (>100%): Over limit

## Badge URLs

Badges use the shields.io endpoint badge format:

```markdown
![ES Module Size](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/ibrahimcesar/react-lite-youtube-embed/main/.github/badges/size-es.json)
```

The JSON file contains:
```json
{
  "schemaVersion": 1,
  "label": "ES Module (gzip)",
  "message": "4.5KB",
  "color": "brightgreen"
}
```

## README Integration

Badges are displayed in the README header section:

```markdown
[![ES Module Size](https://img.shields.io/endpoint?url=...)](link-to-workflow)
[![CommonJS Size](https://img.shields.io/endpoint?url=...)](link-to-workflow)
[![CSS Size](https://img.shields.io/endpoint?url=...)](link-to-workflow)
```

## Size Limits

Limits are configured in two places:

### 1. package.json (size-limit)
```json
{
  "size-limit": [
    {
      "name": "ES Module",
      "path": "dist/index.es.js",
      "limit": "10 KB",
      "gzip": true
    }
  ]
}
```

### 2. Workflow (badge colors)
```bash
ES_COLOR=$(get_color $ES_GZIP 10240)  # 10KB = 10240 bytes
CSS_COLOR=$(get_color $CSS_GZIP 2048)  # 2KB = 2048 bytes
```

## Pull Request Workflow

On pull requests:
1. Workflow runs and calculates sizes
2. Displays size report in workflow summary
3. Creates comparison table showing all bundle sizes
4. **Does NOT commit** badge changes (only on main branch)

Reviewers can check the workflow summary to see size impact.

## Manual Trigger

To manually update badges:

1. Go to **Actions** → **Bundle Size Badges**
2. Click **Run workflow**
3. Select branch (usually `main`)
4. Click **Run workflow**

The workflow will:
- Build the project
- Calculate all sizes
- Update badge JSON files
- Commit to the branch

## Troubleshooting

### Badges Not Updating

**Issue**: Badges show old sizes after a release

**Solutions**:
1. Check if workflow ran: Actions → Bundle Size Badges
2. Verify badge JSON files updated in `.github/badges/`
3. Clear shields.io cache: Add `?v=TIMESTAMP` to badge URL temporarily
4. Manually trigger workflow if needed

### Badges Show Error

**Issue**: Badges display "invalid" or "error"

**Causes**:
1. Badge JSON file doesn't exist
2. Invalid JSON format
3. GitHub raw content not accessible

**Solutions**:
1. Verify files exist: `.github/badges/size-*.json`
2. Validate JSON syntax
3. Check GitHub repo is public or badge URL is correct
4. Run workflow to regenerate badges

### Wrong Size Calculation

**Issue**: Badge shows incorrect size

**Causes**:
1. Build artifacts outdated
2. Size calculation script error

**Solutions**:
1. Run `npm run build` locally and verify sizes:
   ```bash
   ls -lh dist/
   gzip -c dist/index.es.js | wc -c
   ```
2. Check workflow logs for calculation errors
3. Verify `stat` command compatibility (macOS vs Linux)

## Maintenance

### Updating Size Limits

To change size thresholds:

1. Update `package.json` → `size-limit` array
2. Update workflow color calculation:
   ```bash
   ES_COLOR=$(get_color $ES_GZIP NEW_LIMIT_IN_BYTES)
   ```
3. Commit and push changes

### Adding New Badge Types

To add additional badges:

1. Add size calculation in workflow
2. Create badge JSON file generation
3. Add badge URL to README
4. Update this documentation

## Best Practices

1. **Monitor on PRs**: Check size report before merging
2. **Set Realistic Limits**: Based on actual usage and performance needs
3. **Investigate Increases**: Large size jumps may indicate issues:
   - Unnecessary dependencies
   - Large assets bundled
   - Missing tree-shaking
4. **Keep Limits Current**: Update as package evolves

## Related Workflows

- **bundle-size.yml**: Checks bundle size on PRs (uses size-limit action)
- **ci.yml**: Runs linting, type-checking, tests, and build
- **coverage.yml**: Similar badge system for test coverage

## Resources

- [Shields.io Endpoint Badges](https://shields.io/endpoint)
- [size-limit](https://github.com/ai/size-limit)
- [Bundle Size Analysis](https://bundlephobia.com/)

## Questions?

For issues or questions about the size badge system:
1. Check GitHub Actions workflow logs
2. Review this documentation
3. Open an issue with the `documentation` or `ci/cd` label
