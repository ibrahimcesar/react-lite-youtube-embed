# Changelog

All notable changes to `react-lite-youtube-embed` are documented in this file. From v3.7.0 on, each release prepends its section automatically via the release workflow. For older releases, see the [GitHub releases page](https://github.com/ibrahimcesar/react-lite-youtube-embed/releases).

## [3.7.0] - 2026-09-06

### Changed

- Toolchain migrated to **TypeScript 7** (the native compiler), with `@typescript/typescript6` as the official JS-API bridge for declaration generation — published typings are unchanged (#322)
- Lint and format migrated from ESLint + Prettier to **Biome**; same style, same rules, one tool (#321)
- Build tooling bumped to **Vite 8** with `@vitejs/plugin-react` 6 (#319)
- All npm publishing now flows through a single hardened workflow (`release.yml`) with SLSA provenance, ready for npm Trusted Publishers (#297, #299, #300)

### Fixed

- Docs: corrected the code example to use the `thumbnail` prop (was showing the nonexistent `customThumbnail`) — thanks @deeplypixelating (#311)

### Security

- Cleared dependency advisories across the root and docs lockfiles; Dependabot now also monitors `docs/` (#302, #305, #318, #320)

**Full changelog**: [v3.6.2...v3.7.0](https://github.com/ibrahimcesar/react-lite-youtube-embed/compare/v3.6.2...v3.7.0)

## [3.6.2] - 2026-08-09

### Fixed

- The npm package now ships only the built output: 10 files / ~119 kB unpacked, down from 50 files / ~1.1 MB — `docs/`, `scripts/`, and repo config files no longer end up in `node_modules` (#298)

**Full changelog**: [v3.6.1...v3.6.2](https://github.com/ibrahimcesar/react-lite-youtube-embed/compare/v3.6.1...v3.6.2)

## [3.6.1] - 2026-08-09

### Fixed

- `TypeError: Cannot use 'in' operator to search for 'errorCode' in 150` when YouTube reported a player error: the postMessage protocol delivers the error code as a bare number, which the handler now accepts — the `onError` callback receives the code as documented (#293, fixes #287)

**Full changelog**: [v3.6.0...v3.6.1](https://github.com/ibrahimcesar/react-lite-youtube-embed/compare/v3.6.0...v3.6.1)

## [3.6.0] - 2026-06-07

### Changed

- Autoplay behavior fixes, `params` typing improvements, and npm release provenance — see the [v3.6.0 release](https://github.com/ibrahimcesar/react-lite-youtube-embed/releases/tag/v3.6.0)
