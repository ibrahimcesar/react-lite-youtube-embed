# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue,
email, or any other method with the owners of this repository before working on a change.

Please note we have a code of conduct, please follow it in all your interactions with the project.

## Development Setup

### Repository Structure

This is a monorepo containing:
- **Root** - The library package (`react-lite-youtube-embed`)
- **demo/** - Next.js demo application showcasing the library

### Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ibrahimcesar/react-lite-youtube-embed.git
   cd react-lite-youtube-embed
   ```

2. **Install library dependencies:**
   ```bash
   npm install
   ```

3. **Build the library:**
   ```bash
   npm run build
   ```
   This creates the `dist/` folder with the built library files.

4. **Run tests:**
   ```bash
   npm test
   ```

5. **Check coverage:**
   ```bash
   npm run coverage
   ```

### Running the Demo

The demo application uses the **published npm package** by default:

```json
// demo/package.json
{
  "dependencies": {
    "react-lite-youtube-embed": "*"
  }
}
```

To run the demo:

```bash
cd demo
npm install
npm run dev
```

The demo will be available at `http://localhost:3000`

### Local Development Workflow

When you need to test library changes in the demo **before publishing**, switch to local development mode:

1. **Update demo/package.json:**
   ```json
   {
     "dependencies": {
       "react-lite-youtube-embed": "file:.."
     }
   }
   ```

2. **Reinstall demo dependencies:**
   ```bash
   cd demo
   rm -rf node_modules package-lock.json
   npm install
   ```
   This will automatically link to your local package (in the parent directory).

3. **Testing Workflow - Method 1: Build and Test (Recommended for Final Testing)**

   a. **Build the library** (from the root directory):
   ```bash
   npm run build
   ```

   b. **Start the demo app:**
   ```bash
   cd demo
   npm run dev
   ```

   c. **Make changes and rebuild:**
   - Make your changes to the library source files in `src/`
   - Run `npm run build` from the root directory
   - Refresh your browser to see the changes

4. **Testing Workflow - Method 2: Watch Mode (Recommended for Active Development)**

   For a faster development cycle, you can use Vite's build watch mode:

   a. **Start the build watcher** (from the root directory):
   ```bash
   npm run build -- --watch
   ```
   This rebuilds automatically whenever you save changes to source files.

   b. **In a separate terminal, start the demo app:**
   ```bash
   cd demo
   npm run dev
   ```

   c. **Develop with hot reload:**
   - Edit files in `src/`
   - Vite automatically rebuilds the library
   - Next.js may require a manual browser refresh to pick up changes

**Important:** Before committing, revert `demo/package.json` back to using the published package:
```json
{
  "dependencies": {
    "react-lite-youtube-embed": "*"
  }
}
```

### Verifying Your Changes

After making changes, always verify:

1. **Run tests:**
   ```bash
   npm test
   ```

2. **Check test coverage:**
   ```bash
   npm run coverage
   ```
   Ensure coverage remains at 100%.

3. **Build the library:**
   ```bash
   npm run build
   ```

4. **Run linting:**
   ```bash
   npm run lint
   ```

5. **Check formatting:**
   ```bash
   npm run format:check
   ```

6. **Type check:**
   ```bash
   npm run type-check
   ```

7. **Run all checks at once:**
   ```bash
   npm run ci
   ```
   This runs linting, type checking, tests, and builds the project—ensuring your changes will pass CI checks.

8. **Test the demo builds:**
   ```bash
   cd demo
   npm run build
   ```

### Working with CSS

If you modify styles in `src/lib/LiteYouTubeEmbed.css`:

1. Rebuild the library: `npm run build`
2. The CSS is automatically copied to `dist/LiteYouTubeEmbed.css`
3. Refresh the demo app to see style changes

### Troubleshooting

**Changes not appearing in the demo?**
- Ensure you switched to local development mode (`"file:.."` in demo/package.json)
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

### Development Tips

- **Library changes** require rebuilding (`npm run build`) to take effect in the demo
- **Always revert** `demo/package.json` to use the published package before committing
- The demo showcases the **published version** that users actually install
- Use `file:..` only temporarily for local testing during development
- Use watch mode (`npm run build -- --watch`) for faster iteration during active development

## Pull Request Guidelines

1. Please ensure your proposal will not radically change current functionality or bring along breaking changes.
2. PRs only consisting of typo fixes (or other automated contributions), will not be accepted.
3. Do not add any dependencies to the project.
4. Document your changes thoroughly.
5. Ensure coverage is complete (`npm run coverage` should show 100% coverage) and that none of the tests fail.
6. Be reactive to any comments, reviews or change requests entered in your pull request.
