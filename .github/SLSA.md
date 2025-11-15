# SLSA Provenance for react-lite-youtube-embed

## What is SLSA?

**SLSA** (Supply chain Levels for Software Artifacts) is a security framework that helps protect against supply chain attacks. It provides verifiable proof about how your software was built and where it came from.

### Why SLSA Matters for This Project

This package is distributed via NPM and installed by thousands of developers. SLSA provides:

- **🔒 Tamper-proof builds** - Cryptographic proof that packages weren't modified after building
- **🔍 Build transparency** - Verifiable evidence of the build environment and process
- **🛡️ Attack prevention** - Protection against compromised build systems and malicious injections
- **✅ Trust verification** - Users can verify packages came from official GitHub Actions

## SLSA Level

This project achieves **SLSA Build Level 3**:

- ✅ Build process is fully scripted/automated
- ✅ Provenance is generated automatically
- ✅ Build service is hardened (GitHub Actions)
- ✅ Provenance is non-forgeable (signed by GitHub)
- ✅ Build isolation (separate runners per build)

## How It Works

Every release automatically:

1. **Builds** the package in GitHub Actions
2. **Generates** a cryptographically signed provenance attestation
3. **Publishes** the attestation to the NPM registry alongside the package
4. **Links** the attestation to the GitHub release

### What's in the Provenance?

The provenance attestation includes:
- **Source repository** and commit SHA
- **Build workflow** and runner details
- **Build inputs** (branch, tag, environment variables)
- **Build outputs** (package tarball hash)
- **Digital signature** from GitHub's Sigstore

## Verifying SLSA Provenance

### For Package Users

#### Option 1: Using npm (Recommended)

```bash
# Install the package
npm install react-lite-youtube-embed

# Verify the provenance
npm audit signatures
```

This checks that:
- Package was published from the official GitHub repository
- Build came from a GitHub Actions workflow
- Package tarball matches the attested hash

#### Option 2: Using slsa-verifier

```bash
# Install slsa-verifier
npm install -g @sigstore/cli

# Download the package
npm pack react-lite-youtube-embed

# Verify the package (replace with actual version)
npx @sigstore/cli verify ibrahimcesar-react-lite-youtube-embed-3.0.5.tgz \
  --certificate-identity-regexp="^https://github.com/ibrahimcesar/react-lite-youtube-embed" \
  --certificate-oidc-issuer=https://token.actions.githubusercontent.com
```

#### Option 3: View Provenance on NPM

Visit the package page on npm:
https://www.npmjs.com/package/@ibrahimcesar/react-lite-youtube-embed

Look for the "Provenance" badge showing:
- Source repository
- Build workflow
- Commit SHA

### For Maintainers

#### Viewing Generated Attestations

After each release, you can find the provenance:

1. **On GitHub Releases**
   - Go to: https://github.com/ibrahimcesar/react-lite-youtube-embed/releases
   - Each release shows "Provenance" section
   - Click to view full attestation details

2. **In GitHub Actions Artifacts**
   - Navigate to the workflow run
   - Download `provenance-attestations` artifact
   - Contains `.jsonl` file with full attestation

3. **On NPM Registry**
   - Visit package page
   - Click on "Provenance" badge
   - Shows verified build information

## Implementation Details

### Workflows with SLSA

This project generates SLSA provenance in:

1. **Automated Release Workflow** (`.github/workflows/auto-release.yml`)
   - Manual dispatch workflow
   - Generates provenance before NPM publish
   - Publishes attestation automatically

2. **Manual Release Workflow** (`.github/workflows/release.yml`)
   - Triggered on GitHub release creation
   - Generates provenance before NPM publish
   - Publishes attestation automatically

### Technical Implementation

We use the official SLSA generator:
- **Generator**: `slsa-framework/slsa-github-generator`
- **Version**: Latest stable release
- **Provenance Level**: SLSA Build Level 3
- **Attestation Format**: In-toto provenance (v1.0)

### Permissions Required

The workflows require specific permissions:
```yaml
permissions:
  contents: read      # Read repository
  actions: read       # Read workflow info
  id-token: write     # Sign attestations
  packages: write     # Publish to GitHub Packages
  attestations: write # Write provenance
```

## Security Considerations

### What SLSA Protects Against

✅ **Build tampering** - Detects if build outputs were modified
✅ **Compromised dependencies** - Tracks build inputs
✅ **Malicious injections** - Verifies build process integrity
✅ **Account compromise** - Builds are isolated in GitHub Actions
✅ **Fake packages** - Cryptographic proof of authentic builds

### What SLSA Does NOT Protect Against

❌ **Vulnerabilities in source code** - Use security scanning
❌ **Compromised dependencies** - Use dependency scanning (npm audit)
❌ **Social engineering** - Use code review and access controls
❌ **Runtime attacks** - Use application security best practices

## Troubleshooting

### Verification Fails

If `npm audit signatures` fails:

1. **Check npm version** - Requires npm 8.x or higher
   ```bash
   npm --version
   npm install -g npm@latest
   ```

2. **Check registry** - Provenance only works with official npm registry
   ```bash
   npm config get registry
   # Should be: https://registry.npmjs.org/
   ```

3. **Check package version** - Ensure using a version with provenance (3.0.6+)

### Missing Provenance

If a release is missing provenance:

1. **Check workflow logs** - Look for provenance generation step
2. **Check permissions** - Ensure `id-token: write` and `attestations: write` are set
3. **Retry release** - Re-run the workflow

### SLSA Badge Not Showing on NPM

NPM may take a few minutes to process and display the provenance badge after publishing.

## Resources

- **SLSA Official Site**: https://slsa.dev
- **GitHub SLSA Generator**: https://github.com/slsa-framework/slsa-github-generator
- **NPM Provenance**: https://docs.npmjs.com/generating-provenance-statements
- **Sigstore**: https://www.sigstore.dev
- **In-toto Provenance**: https://in-toto.io/

## Questions?

- **General SLSA questions**: https://slsa.dev/community
- **This project**: Open an issue at https://github.com/ibrahimcesar/react-lite-youtube-embed/issues
- **NPM provenance**: https://docs.npmjs.com/about-registry-signatures

---

**Status**: ✅ SLSA Level 3 enabled for all releases starting from v3.0.6

**Last Updated**: November 15, 2025
