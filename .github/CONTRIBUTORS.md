# Contributors Guide

This project recognizes **all types of contributions**, not just code! We follow the [all-contributors](https://allcontributors.org/) specification.

## How to Add Contributors

### Option 1: GitHub Actions (Recommended)

The easiest way to add contributors is through GitHub Actions:

1. **Go to Actions tab** in the GitHub repository
2. **Select "Add Contributor"** workflow from the left sidebar
3. **Click "Run workflow"** button (top right)
4. **Fill in the form:**
   - **Username:** GitHub username (without @)
   - **Contribution type:** Select from dropdown
   - **PR/Issue number:** Optional, e.g., `222` for issue #222
5. **Click "Run workflow"**

The workflow will automatically:
- Add the contributor to `.all-contributorsrc`
- Update the README with the new contributor
- Update the contributor count badge
- Create a Pull Request for you to review and merge

### Option 2: Command Line

If you prefer using the command line:

```bash
# Add a contributor
npm run contributors:add -- username contributionType

# Examples:
npm run contributors:add -- natesct bug
npm run contributors:add -- octocat code
npm run contributors:add -- alice doc

# Then regenerate the README
npm run contributors:generate

# Commit and push
git add .all-contributorsrc README.md
git commit -m "docs: Add @username as contributor"
git push
```

## Contribution Types

Here are all the contribution types recognized:

| Emoji | Type | Code | Description |
|-------|------|------|-------------|
| 🐛 | Bug reports | `bug` | Reported bugs/issues |
| 💻 | Code | `code` | Wrote code |
| 📖 | Documentation | `doc` | Wrote documentation |
| 🎨 | Design | `design` | Design assets |
| 🤔 | Ideas | `ideas` | Ideas and planning |
| 🚇 | Infrastructure | `infra` | CI/CD, build tools |
| 🚧 | Maintenance | `maintenance` | Repository maintenance |
| 👀 | Review | `review` | Reviewed pull requests |
| ⚠️ | Tests | `test` | Wrote tests |
| 🌍 | Translation | `translation` | Translated content |
| 💬 | Questions | `question` | Answered questions |
| ✅ | Tutorials | `tutorial` | Created tutorials |
| 📢 | Talks | `talk` | Gave talks |
| 📹 | Videos | `video` | Created videos |
| 💡 | Examples | `example` | Created examples |
| 📝 | Blog | `blog` | Wrote blog posts |
| 💵 | Financial | `financial` | Financial support |
| 🔍 | Funding | `fundingFinding` | Found funding |
| 🖋 | Content | `content` | Created content |
| 🔣 | Data | `data` | Contributed data |
| 📋 | Event Organizing | `eventOrganizing` | Organized events |
| 📦 | Platform | `platform` | Platform support |
| 🔌 | Plugin | `plugin` | Created plugins |
| 📆 | Project Management | `projectManagement` | Project management |
| 🔬 | Research | `research` | Research |
| 🛡️ | Security | `security` | Security |
| 🔧 | Tools | `tool` | Created tools |
| 📓 | User Testing | `userTesting` | User testing |

## Examples

### Adding a Bug Reporter

When someone reports a bug (like issue #222):

```bash
npm run contributors:add -- natesct bug
npm run contributors:generate
```

Or use GitHub Actions and select:
- Username: `natesct`
- Contribution: `bug`
- PR/Issue: `222`

### Adding a Code Contributor

When someone submits a PR:

```bash
npm run contributors:add -- octocat code
npm run contributors:generate
```

### Adding Multiple Contribution Types

A contributor can have multiple types! Just run the command multiple times:

```bash
npm run contributors:add -- alice code
npm run contributors:add -- alice doc
npm run contributors:add -- alice test
npm run contributors:generate
```

They'll appear with multiple emoji badges: 💻📖⚠️

## Best Practices

### When to Add Contributors

Add contributors immediately when:
- ✅ Someone reports a valuable bug/issue
- ✅ A PR is merged
- ✅ Someone answers questions in issues/discussions
- ✅ Someone writes documentation or tutorials
- ✅ Someone helps with design, testing, or reviews

Don't wait for releases - recognize contributions as they happen!

### Adding Yourself

It's okay to add yourself if you're a maintainer making significant changes. But it's better to have someone else add you.

### Updating the Release Notes

When creating releases, mention notable new contributors in the release notes:

```markdown
## 🎉 New Contributors

- @natesct made their first contribution in #222 - Thanks for reporting the playlist icon bug! 🐛
```

## Troubleshooting

### "User not found"

The all-contributors CLI will fetch user info from GitHub. If it fails:
- Check the username spelling
- Ensure the user exists on GitHub
- Check your internet connection

### Changes Not Showing in README

Make sure you ran both commands:
```bash
npm run contributors:add -- username type
npm run contributors:generate  # Don't forget this!
```

### Contributor Count Not Updated

The badge count in README is automatically updated when you run `npm run contributors:generate`.

## Resources

- [All Contributors Specification](https://allcontributors.org/)
- [All Contributors CLI](https://allcontributors.org/docs/en/cli/overview)
- [Emoji Key Reference](https://allcontributors.org/docs/en/emoji-key)

---

## Questions?

If you have questions about adding contributors, open an issue or ask in discussions!
