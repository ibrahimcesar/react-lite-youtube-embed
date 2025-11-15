# Publishing to GitHub Packages

This package is published to both NPM and GitHub Packages. This document explains how to set up and use GitHub Packages for this repository.

## What is GitHub Packages?

GitHub Packages is a package hosting service integrated with GitHub. It allows you to publish npm packages directly to your GitHub repository, making them available to anyone with access to your repository.

## Package Information

- **Package Name**: `@ibrahimcesar/react-lite-youtube-embed`
- **Registry**: `https://npm.pkg.github.com`
- **Scope**: `@ibrahimcesar`

## For Maintainers: Publishing to GitHub Packages

### Automated Publishing (Recommended)

GitHub Packages publishing is **fully automated** through GitHub Actions. When you create a release, the package is automatically published to both NPM and GitHub Packages.

#### Using Automated Release Workflow

1. Go to **Actions** tab in your repository
2. Select **Automated Release** workflow
3. Click **Run workflow**
4. Select version bump type (patch/minor/major)
5. Choose if it's a beta release
6. Click **Run workflow**

The workflow will:
- Run tests and build the project
- Bump the version in package.json
- Generate changelog from commits
- Create a git tag
- Create a GitHub release
- Publish to NPM
- Publish to GitHub Packages

#### Using Manual GitHub Release

1. Create a new release on GitHub
2. The `release.yml` workflow will automatically trigger
3. Package will be published to both NPM and GitHub Packages

### Manual Publishing (Advanced)

If you need to publish manually:

1. **Create `.npmrc` file** (from `.npmrc.example`):
   ```bash
   cp .npmrc.example .npmrc
   ```

2. **Get a GitHub Personal Access Token**:
   - Go to https://github.com/settings/tokens/new
   - Give it a descriptive name (e.g., "NPM Package Publishing")
   - Select scopes: `write:packages`, `read:packages`
   - Generate and copy the token

3. **Update `.npmrc`** with your token:
   ```
   @ibrahimcesar:registry=https://npm.pkg.github.com
   //npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
   ```

4. **Build and Publish**:
   ```bash
   npm run build
   npm publish
   ```

## For Users: Installing from GitHub Packages

### Option 1: Project-level Configuration (Recommended)

Create or update `.npmrc` in your project root:

```
@ibrahimcesar:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

Then install normally:

```bash
npm install @ibrahimcesar/react-lite-youtube-embed
```

### Option 2: One-time Install

```bash
npm install @ibrahimcesar/react-lite-youtube-embed --registry=https://npm.pkg.github.com
```

### Option 3: User-level Configuration

Configure npm globally (affects all projects):

```bash
npm config set @ibrahimcesar:registry https://npm.pkg.github.com
npm config set //npm.pkg.github.com/:_authToken YOUR_GITHUB_TOKEN
```

### Getting a Personal Access Token

GitHub requires authentication to install packages from GitHub Packages:

1. Go to https://github.com/settings/tokens/new
2. Give it a descriptive name (e.g., "Read GitHub Packages")
3. Select scope: `read:packages`
4. Generate and copy the token
5. Use it in your `.npmrc` file

## Usage in Your Project

Once installed, usage is identical regardless of whether you installed from NPM or GitHub Packages:

```tsx
import LiteYouTubeEmbed from '@ibrahimcesar/react-lite-youtube-embed';
import '@ibrahimcesar/react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

function App() {
  return (
    <LiteYouTubeEmbed
      id="dQw4w9WgXcQ"
      title="YouTube Video"
    />
  );
}
```

## Viewing Published Packages

You can view all published versions at:
- **GitHub Packages**: https://github.com/ibrahimcesar/react-lite-youtube-embed/packages
- **NPM Registry**: https://www.npmjs.com/package/react-lite-youtube-embed

## Troubleshooting

### Authentication Errors

If you see `401 Unauthorized` or `403 Forbidden`:

1. Verify your token has the correct permissions (`read:packages` or `write:packages`)
2. Ensure your token hasn't expired
3. Check that your `.npmrc` file is correctly formatted
4. Verify the scope matches: `@ibrahimcesar`

### Package Not Found

If you see `404 Not Found`:

1. Ensure you're using the scoped package name: `@ibrahimcesar/react-lite-youtube-embed`
2. Verify the registry URL in your `.npmrc`: `https://npm.pkg.github.com`
3. Check that the package has been published successfully

### Version Mismatch

If you see unexpected versions:

1. Clear npm cache: `npm cache clean --force`
2. Delete `node_modules` and `package-lock.json`
3. Run `npm install` again

## Security Best Practices

1. **Never commit `.npmrc` with tokens** - It's already in `.gitignore`
2. **Use environment variables in CI/CD** - GitHub Actions uses `GITHUB_TOKEN` automatically
3. **Rotate tokens regularly** - Delete old tokens when no longer needed
4. **Use minimal permissions** - Only grant `read:packages` for installing, `write:packages` for publishing
5. **Use organization tokens** - For team projects, use organization-level tokens

## Benefits of GitHub Packages

1. **Integrated with GitHub** - Package versions linked to releases and commits
2. **Access Control** - Use GitHub's permission system
3. **Free for public repositories** - Unlimited bandwidth and storage
4. **Version History** - View all versions in one place
5. **Dependency Graph** - See which projects depend on this package

## Additional Resources

- [GitHub Packages Documentation](https://docs.github.com/en/packages)
- [Working with npm registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry)
- [Managing PATs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)

## Questions?

If you have questions or issues with GitHub Packages publishing:

1. Check this documentation first
2. Review GitHub Packages documentation
3. Open an issue on this repository
4. Contact the maintainer

---

**Note**: This package is also available on the public NPM registry as `react-lite-youtube-embed` (without the `@ibrahimcesar` scope). You can use either registry based on your preference.
