# 🚀 Release Process

This project has two automated release workflows:

## 1. Automated Release (Recommended) ⚡

**Workflow:** `auto-release.yml`

This workflow fully automates the release process with version bumping, changelog generation, and NPM publishing.

### How to Use

1. Go to **Actions** → **Automated Release** in GitHub
2. Click **Run workflow**
3. Select the version bump type:
   - `patch` - Bug fixes and minor changes (1.0.0 → 1.0.1)
   - `minor` - New features, backward compatible (1.0.0 → 1.1.0)
   - `major` - Breaking changes (1.0.0 → 2.0.0)
4. Click **Run workflow**

### What It Does

✅ Runs all tests
✅ Builds the project
✅ Bumps version in `package.json`
✅ Generates changelog from commits
✅ Groups changes by type (features, fixes, docs, etc.)
✅ Lists all contributors
✅ Creates commit with version bump
✅ Creates and pushes git tag
✅ Creates GitHub release with changelog
✅ Publishes to NPM
✅ Provides detailed summary

### Commit Message Format

For best changelog generation, use conventional commits:

```
feat: add new feature
fix: resolve bug in component
docs: update README
perf: improve rendering performance
refactor: restructure code
test: add unit tests
chore: update dependencies
ci: improve workflow
a11y: improve accessibility
```

### Example Changelog Output

```markdown
## 🚀 What's Changed

### ✨ Features
- feat: add dark mode support by @username

### 🐛 Bug Fixes
- fix: resolve memory leak by @username

### ♿ Accessibility
- a11y: improve keyboard navigation by @username

### 📚 Documentation
- docs: update API reference by @username

## 👥 Contributors
- John Doe
- Jane Smith

**Full Changelog**: https://github.com/owner/repo/compare/v1.0.0...v1.1.0
```

---

## 2. Manual Release 📝

**Workflow:** `release.yml`

This workflow triggers when you manually create a release through GitHub's UI.

### How to Use

1. Go to **Releases** → **Draft a new release**
2. Choose/create a tag (e.g., `v2.5.7`)
3. Fill in release notes manually
4. Click **Publish release**
5. The workflow will:
   - Run tests
   - Build the project
   - Publish to NPM

### When to Use Manual Release

- When you need custom release notes
- For hotfixes with specific messaging
- When you want more control over the release content

---

## Release Checklist ✅

Before releasing:

1. **Code Quality**
   - [ ] All tests passing
   - [ ] No linting errors (`npm run lint`)
   - [ ] Code formatted (`npm run format`)
   - [ ] Build succeeds (`npm run build`)

2. **Documentation**
   - [ ] README updated
   - [ ] CHANGELOG.md updated (if maintained manually)
   - [ ] API changes documented

3. **Version Selection**
   - [ ] Choose correct bump type (patch/minor/major)
   - [ ] Breaking changes = major version
   - [ ] New features = minor version
   - [ ] Bug fixes = patch version

4. **Dependencies**
   - [ ] Dependencies up to date
   - [ ] No critical security vulnerabilities
   - [ ] Lock file committed

---

## Troubleshooting 🔧

### Release Failed

1. Check the workflow logs in Actions tab
2. Common issues:
   - NPM authentication token expired
   - Tests failing
   - Build errors
   - Git conflicts

### Version Bump Not Working

- Ensure you have write permissions to the repository
- Check that `GITHUB_TOKEN` has proper permissions
- Verify `NPM_TOKEN` is set in repository secrets

### Changelog Empty

- Ensure commits follow conventional commit format
- Check that there are commits since the last tag
- Verify git history is properly fetched (fetch-depth: 0)

---

## Secrets Required 🔐

Make sure these secrets are configured in repository settings:

1. **GITHUB_TOKEN** (automatic)
   - Provided automatically by GitHub Actions
   - Used for creating releases and tags

2. **NPM_TOKEN** (manual setup required)
   - Create at: https://www.npmjs.com/settings/[username]/tokens
   - Type: Automation token
   - Add to: Repository Settings → Secrets → Actions

---

## Best Practices 💡

1. **Regular Releases**
   - Release often to keep versions manageable
   - Don't accumulate too many changes

2. **Semantic Versioning**
   - Follow semver strictly: MAJOR.MINOR.PATCH
   - Communicate breaking changes clearly

3. **Good Commit Messages**
   - Use conventional commits for automatic changelog
   - Be descriptive about changes

4. **Test Before Release**
   - Run `npm test` locally
   - Check build artifacts
   - Test in demo application

5. **Communication**
   - Announce major releases
   - Provide migration guides for breaking changes
   - Update documentation promptly

---

## Emergency Procedures 🚨

### Rollback a Release

If a release has critical bugs:

```bash
# Unpublish from NPM (within 72 hours)
npm unpublish react-lite-youtube-embed@x.x.x

# Delete GitHub release and tag
gh release delete vx.x.x --yes
git push --delete origin vx.x.x

# Revert version bump commit
git revert <commit-hash>
git push origin main
```

### Hotfix Release

For urgent fixes:

1. Create hotfix branch from latest release tag
2. Apply fix and commit
3. Use automated release with `patch` bump
4. Verify fix before merging to main

---

## Support

For questions or issues with the release process:
- Open an issue on GitHub
- Check workflow logs in Actions tab
- Review this documentation
