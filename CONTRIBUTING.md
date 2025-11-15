# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue,
email, or any other method with the owners of this repository before working on a change. 

Please note we have a code of conduct, please follow it in all your interactions with the project.

## Local Development and Testing

### Setting Up Your Development Environment

1. **Clone the repository and install dependencies:**
   ```bash
   npm install
   ```

2. **Build the library:**
   ```bash
   npm run build
   ```
   This creates the distributable files in the `dist/` directory.

### Testing Your Changes in the Demo App

The demo app is already configured to use the local package via `"file:.."` in its `package.json`. Here's how to test your changes:

#### One-Time Setup

1. **Navigate to the demo directory:**
   ```bash
   cd demo
   ```

2. **Install demo dependencies:**
   ```bash
   npm install
   ```
   This will automatically link to your local package (in the parent directory).

#### Testing Workflow

**Method 1: Build and Test (Recommended for Final Testing)**

1. **Build the library** (from the root directory):
   ```bash
   npm run build
   ```

2. **Start the demo app** (from the `demo/` directory):
   ```bash
   cd demo
   npm run dev
   ```

3. **View the demo:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Make changes and rebuild:**
   - Make your changes to the library source files in `src/`
   - Run `npm run build` from the root directory
   - Refresh your browser to see the changes

**Method 2: Watch Mode (Recommended for Active Development)**

For a faster development cycle, you can use Vite's build watch mode:

1. **Start the build watcher** (from the root directory):
   ```bash
   npm run build -- --watch
   ```
   This rebuilds automatically whenever you save changes to source files.

2. **In a separate terminal, start the demo app:**
   ```bash
   cd demo
   npm run dev
   ```

3. **Develop with hot reload:**
   - Edit files in `src/`
   - Vite automatically rebuilds the library
   - Next.js may require a manual browser refresh to pick up changes

#### Verifying Your Changes

After making changes, always verify:

1. **Run tests:**
   ```bash
   npm run test
   ```

2. **Check test coverage:**
   ```bash
   npm run coverage
   ```
   Ensure coverage remains at 100%.

3. **Run linting:**
   ```bash
   npm run lint
   ```

4. **Check formatting:**
   ```bash
   npm run format:check
   ```

5. **Type check:**
   ```bash
   npm run type-check
   ```

6. **Run all checks at once:**
   ```bash
   npm run ci
   ```

#### Troubleshooting

**Changes not appearing in the demo?**
- Ensure you ran `npm run build` after making changes
- Try clearing Next.js cache: `cd demo && rm -rf .next && npm run dev`
- Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)

**Demo app not starting?**
- Ensure you ran `npm install` in the demo directory
- Check that Node.js version is compatible (v20+ recommended)
- Delete `demo/node_modules` and `demo/package-lock.json`, then run `npm install` again

**Build errors?**
- Ensure all dependencies are installed: `npm install`
- Check TypeScript errors: `npm run type-check`
- Clear dist folder: `rm -rf dist && npm run build`

### Working with CSS

If you modify styles in `src/lib/LiteYouTubeEmbed.css`:

1. Rebuild the library: `npm run build`
2. The CSS is automatically copied to `dist/LiteYouTubeEmbed.css`
3. Refresh the demo app to see style changes

### Before Submitting Your PR

Make sure to run the full CI pipeline locally:

```bash
npm run ci
```

This runs linting, type checking, tests, and builds the project—ensuring your changes will pass CI checks.

## Pull Request Guidelines

1. Please ensure your proposal will not radically change current functionality or bring along breaking changes.
2. PRs only consisting of typo fixes (or other automated contributions), will not be accepted.
3. Do not add any dependencies to the project.
4. Document your changes thoroughly.
5. Ensure coverage is complete (`npm run coverage` should show 100% coverage) and that none of the tests fail.
6. Be reactive to any comments, reviews or change requests entered in your pull request.
