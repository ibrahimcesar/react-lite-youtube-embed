# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue,
email, or any other method with the owners of this repository before working on a change.

Please note we have a code of conduct, please follow it in all your interactions with the project.

## Development Setup

### Repository Structure

This is a monorepo containing:
- **Root** - The library package (`@ibrahimcesar/react-lite-youtube-embed`)
- **demo/** - Next.js demo application showcasing the library

### Local Development Workflow

The demo application uses the **local library** via npm's `file:..` protocol instead of the published npm version. This allows you to test library changes immediately in the demo without publishing.

```json
// demo/package.json
{
  "dependencies": {
    "@ibrahimcesar/react-lite-youtube-embed": "file:.."
  }
}
```

### Getting Started

1. **Install library dependencies:**
   ```bash
   npm install
   ```

2. **Build the library:**
   ```bash
   npm run build
   ```
   This creates the `dist/` folder with the built library files.

3. **Install demo dependencies:**
   ```bash
   cd demo
   npm install
   ```
   This will install the local library from `file:..` automatically.

4. **Run the demo:**
   ```bash
   npm run dev
   ```
   The demo will be available at `http://localhost:3000`

### Making Changes

When you modify the library source code (`src/lib/**`):

1. **Rebuild the library:**
   ```bash
   npm run build
   ```

2. **Restart the demo server:**
   ```bash
   cd demo
   npm run dev
   ```

The demo will pick up the new changes automatically because it references the local build via `file:..`.

### Testing Your Changes

Before submitting a PR:

1. **Run tests:**
   ```bash
   npm test
   ```

2. **Check coverage:**
   ```bash
   npm run coverage
   ```
   Coverage should be 100%.

3. **Build the library:**
   ```bash
   npm run build
   ```

4. **Test in the demo:**
   ```bash
   cd demo
   npm run build
   ```
   Ensure the demo builds successfully.

5. **Run linting:**
   ```bash
   npm run lint
   ```

### Important Notes

- The demo always uses the **local library build** (from `dist/`), not the published npm version
- After making library changes, you **must rebuild** (`npm run build`) for the demo to see them
- The `file:..` dependency creates a symlink to the parent directory
- This approach ensures you can test library changes before publishing

## Pull Request Guidelines

1. Please ensure your proposal will not radically change current functionality or bring along breaking changes.
2. PRs only consisting of typo fixes (or other automated contributions), will not be accepted.
3. Do not add any dependencies to the project.
4. Document your changes thoroughly.
5. Ensure coverage is complete (`npm run coverage` should show 100% coverage) and that none of the tests fail.
6. Be reactive to any comments, reviews or change requests entered in your pull request.
