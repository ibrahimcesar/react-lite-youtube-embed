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

3. **Make your changes** to the library source (`src/lib/**`)

4. **Rebuild the library:**
   ```bash
   cd ..
   npm run build
   ```

5. **Restart the demo server:**
   ```bash
   cd demo
   npm run dev
   ```

The demo will now use your local library build. The `file:..` protocol creates a symlink to the parent directory, allowing you to test changes immediately.

**Important:** Before committing, revert `demo/package.json` back to using the published package:
```json
{
  "dependencies": {
    "react-lite-youtube-embed": "*"
  }
}
```

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

4. **Run linting:**
   ```bash
   npm run lint
   ```

5. **Test the demo builds:**
   ```bash
   cd demo
   npm run build
   ```

### Development Tips

- **Library changes** require rebuilding (`npm run build`) to take effect in the demo
- **Always revert** `demo/package.json` to use the published package before committing
- The demo showcases the **published version** that users actually install
- Use `file:..` only temporarily for local testing during development

## Pull Request Guidelines

1. Please ensure your proposal will not radically change current functionality or bring along breaking changes.
2. PRs only consisting of typo fixes (or other automated contributions), will not be accepted.
3. Do not add any dependencies to the project.
4. Document your changes thoroughly.
5. Ensure coverage is complete (`npm run coverage` should show 100% coverage) and that none of the tests fail.
6. Be reactive to any comments, reviews or change requests entered in your pull request.
