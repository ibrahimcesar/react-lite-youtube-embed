# GitHub Actions Workflows

This document provides an overview of all GitHub Actions workflows configured for this project.

## Table of Contents

- [Continuous Integration](#continuous-integration)
- [Security](#security)
- [Quality Checks](#quality-checks)
- [Automation](#automation)
- [Performance](#performance)
- [Release & Deployment](#release--deployment)
- [Configuration](#configuration)

---

## Continuous Integration

### CI Workflow (`ci.yml`)

**Trigger:** Pull requests and pushes to `main`

**Purpose:** Comprehensive quality checks for every PR

**Steps:**
1. ✅ Linting (ESLint)
2. ✅ Code formatting (Prettier)
3. ✅ Type checking (TypeScript)
4. ✅ Unit tests (Vitest)
5. ✅ Code coverage
6. ✅ Build verification
7. ✅ Upload coverage to Codecov
8. ✅ Create build artifacts

**Required:** Yes - PRs should not be merged if CI fails

**Secrets needed:**
- `CODECOV_TOKEN` (optional, for coverage reporting)

---

## Security

### CodeQL Security Scanning (`codeql.yml`)

**Trigger:**
- Pull requests
- Pushes to `main`
- Weekly on Mondays at 9:00 AM UTC
- Manual workflow dispatch

**Purpose:** Automated security vulnerability scanning

**Features:**
- Scans JavaScript/TypeScript code
- Uses security-extended and security-and-quality queries
- Results appear in the Security tab

**Required:** Highly recommended for security compliance

**Secrets needed:** None (uses `GITHUB_TOKEN`)

---

## Quality Checks

### Bundle Size Check (`bundle-size.yml`)

**Trigger:** Pull requests to `main`

**Purpose:** Track bundle size changes in PRs

**Configuration:** `package.json` → `size-limit` section

**Limits:**
- ES Module: 10 KB (gzipped)
- CommonJS: 10 KB (gzipped)
- CSS: 2 KB (gzipped)

**Features:**
- Comments on PRs with size comparison
- Fails if bundle exceeds limits
- Helps prevent bloat

**Required:** Recommended for performance-critical libraries

---

### PR Title Check (`pr-title.yml`)

**Trigger:** PR opened, edited, synchronized, or reopened

**Purpose:** Enforce Conventional Commits format

**Allowed types:**
- `feat` - New features
- `fix` - Bug fixes
- `docs` - Documentation changes
- `style` - Code style changes
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Test changes
- `build` - Build system changes
- `ci` - CI configuration changes
- `chore` - Maintenance tasks
- `revert` - Revert previous commits
- `a11y` - Accessibility improvements

**Example valid titles:**
- `feat: add autoplay control`
- `fix(thumbnail): resolve loading issue`
- `docs: update README examples`

**Required:** Recommended for clean changelog generation

**Exemptions:** PRs with `dependencies` or `automated` labels

---

### Link Checker (`links.yml`)

**Trigger:**
- PRs touching markdown/HTML files
- Pushes to `main` with markdown/HTML changes
- Weekly on Sundays at 9:00 AM UTC
- Manual workflow dispatch

**Purpose:** Ensure documentation links aren't broken

**Features:**
- Checks all `.md` and `.html` files
- Retries failed links (3 attempts)
- Creates report artifact
- Comments on PRs if broken links found

**Required:** Optional but helpful for documentation quality

---

## Automation

### Dependabot (`dependabot.yml`)

**Trigger:** Scheduled (weekly on Mondays at 9:00 AM UTC)

**Purpose:** Automated dependency updates

**Configuration:**

1. **Main package dependencies**
   - Weekly updates
   - Groups dev dependencies together
   - Groups production dependencies together
   - Max 5 PRs open at once

2. **Demo app dependencies**
   - Weekly updates
   - Max 3 PRs open at once

3. **GitHub Actions**
   - Monthly updates

**Labels applied:**
- `dependencies`
- `automated`
- `demo` (for demo app)
- `github-actions` (for Actions)

**Commit message format:** `chore: update dependencies`

---

### Stale Issues & PRs (`stale.yml`)

**Trigger:**
- Daily at 1:00 AM UTC
- Manual workflow dispatch

**Purpose:** Keep issue tracker organized

**Configuration:**

**Issues:**
- Marked stale after 60 days of inactivity
- Closed 14 days after marked stale
- Exempt labels: `pinned`, `security`, `bug`, `enhancement`, `good first issue`

**Pull Requests:**
- Marked stale after 30 days of inactivity
- Closed 7 days after marked stale
- Exempt labels: `work-in-progress`, `blocked`, `waiting-for-review`

**Features:**
- Automatically removes stale label if updated
- Friendly messages explaining the process

---

## Performance

### Lighthouse CI (`lighthouse.yml`)

**Trigger:**
- PRs touching source/demo files
- Manual workflow dispatch

**Purpose:** Track performance metrics for the demo page

**Metrics tested:**
- Performance score (min 90%)
- Accessibility (min 90%)
- Best Practices (min 90%)
- SEO (min 90%)
- Core Web Vitals:
  - First Contentful Paint (< 2s)
  - Largest Contentful Paint (< 2.5s)
  - Cumulative Layout Shift (< 0.1)
  - Total Blocking Time (< 300ms)
  - Time to Interactive (< 3.5s)

**Configuration:** `.github/lighthouse/lighthouserc.json`

**Features:**
- Runs 3 times and averages results
- Uploads reports as artifacts
- Desktop preset with moderate throttling

**Required:** Optional but highly recommended for web components

---

## Release & Deployment

### Automated Release (`auto-release.yml`)

**Trigger:** Manual workflow dispatch

**Purpose:** Automated version bumping, changelog, and NPM publishing

**Inputs:**
- Version bump type: `patch`, `minor`, `major`
- Is beta release: `true`/`false`

**Steps:**
1. Bump version in `package.json`
2. Generate changelog from commits
3. Create git tag
4. Create GitHub release
5. Publish to NPM
6. Create detailed summary

**Secrets needed:**
- `NPM_TOKEN` - NPM authentication token
- `GITHUB_TOKEN` - Automatic

**Features:**
- Groups commits by type (features, fixes, docs, etc.)
- Lists contributors
- Supports beta releases
- Full changelog link

---

### Release (`release.yml`)

**Trigger:**
- GitHub release published
- Manual workflow dispatch

**Purpose:** Publish to NPM when GitHub release is created

**Steps:**
1. Tag with `latest`
2. Run tests
3. Build project
4. Publish to NPM

**Secrets needed:**
- `NPM_TOKEN`

**Note:** Optimized with build artifact sharing

---

### Deploy Demo (`deploy-demo.yml`)

**Trigger:**
- Release published (including pre-releases)
- Manual workflow dispatch

**Purpose:** Deploy demo to GitHub Pages

**Features:**
- Updates demo to use published NPM version
- Builds and deploys to GitHub Pages
- Shows version in deployment summary
- Supports manual version override

**Required:** Automatic on releases

---

## Configuration

### New NPM Scripts

Added to `package.json`:

```json
{
  "type-check": "tsc --noEmit",
  "ci": "npm run lint && npm run type-check && npm run test && npm run build",
  "size": "size-limit"
}
```

**Usage:**
- `npm run type-check` - TypeScript type checking without emitting files
- `npm run ci` - Run all CI checks locally
- `npm run size` - Check bundle size limits

---

### Size Limit Configuration

Located in `package.json` → `size-limit`:

```json
{
  "size-limit": [
    {
      "name": "ES Module",
      "path": "dist/index.es.js",
      "limit": "10 KB",
      "gzip": true
    },
    {
      "name": "CommonJS",
      "path": "dist/index.js",
      "limit": "10 KB",
      "gzip": true
    },
    {
      "name": "CSS",
      "path": "dist/LiteYouTubeEmbed.css",
      "limit": "2 KB",
      "gzip": true
    }
  ]
}
```

---

## Required Secrets

Add these secrets in **Settings → Secrets and variables → Actions**:

| Secret | Required | Purpose |
|--------|----------|---------|
| `NPM_TOKEN` | Yes | Publishing to NPM |
| `CODECOV_TOKEN` | Optional | Coverage reporting on Codecov |
| `GITHUB_TOKEN` | Automatic | GitHub API access (auto-provided) |

---

## Repository Settings

### Enable GitHub Pages

**Settings → Pages:**
- Source: GitHub Actions
- This enables the demo deployment workflow

### Enable Security Features

**Settings → Security → Code security and analysis:**
- Enable Dependabot alerts
- Enable Dependabot security updates
- CodeQL analysis runs automatically

### Branch Protection (Recommended)

**Settings → Branches → Branch protection rules** for `main`:

- ✅ Require status checks to pass before merging
  - Required checks:
    - `Code Quality & Tests (CI)`
    - `Validate PR Title`
    - `Check Bundle Size`
- ✅ Require branches to be up to date before merging
- ✅ Require linear history
- ✅ Include administrators (optional)

---

## Workflow Dependencies

### Size Limit

Install size-limit packages (already added to `package.json`):

```bash
npm install --save-dev size-limit @size-limit/file @size-limit/preset-small-lib
```

---

## Testing Locally

Run all CI checks before pushing:

```bash
# Run all checks
npm run ci

# Individual checks
npm run lint
npm run type-check
npm run test
npm run build
npm run size
```

---

## Troubleshooting

### CI Workflow Failing

**Check:**
1. Linting errors: `npm run lint:fix`
2. Formatting errors: `npm run format`
3. Type errors: `npm run type-check`
4. Test failures: `npm run test`
5. Build errors: `npm run build`

### Bundle Size Exceeding Limit

**Solutions:**
1. Review recent changes for unnecessary imports
2. Use dynamic imports for large dependencies
3. Check for duplicate dependencies
4. Adjust limits in `package.json` if genuinely needed

### Dependabot PRs Failing

**Common causes:**
1. Breaking changes in dependencies
2. Type incompatibilities
3. Test failures due to behavior changes

**Fix:** Review and update code to be compatible with new versions

### Lighthouse Failures

**Common issues:**
1. Performance regression in code
2. Accessibility issues added
3. Missing alt text or ARIA labels
4. Large bundle increases

**Fix:** Review the Lighthouse report artifact for specific recommendations

---

## Best Practices

1. **Always run `npm run ci` locally** before pushing
2. **Keep PRs focused** - smaller PRs pass CI faster
3. **Write meaningful commit messages** - helps with changelog generation
4. **Update tests** when changing functionality
5. **Monitor bundle size** - keep the component lightweight
6. **Fix Dependabot PRs quickly** - avoid accumulating technical debt
7. **Use conventional commit format** - enables automated changelogs

---

## Future Enhancements

Potential additions:

- Visual regression testing (Percy, Chromatic)
- E2E testing (Playwright)
- Automated canary releases
- Performance benchmarking
- Automated security audits
- Contributor statistics

---

## Questions or Issues?

If you have questions about these workflows:

1. Check the workflow run logs in the Actions tab
2. Review this documentation
3. Open an issue for workflow-related problems

**Happy automating!** 🚀
