#!/bin/bash

# Script to add all historical code contributors from git history
# This will add everyone who has committed code to the repository

set -e

echo "🔍 Finding all historical code contributors..."
echo ""

# Get all unique commit authors (name and email)
contributors=$(git log --format='%an|%ae' | sort -u)

# Array to store GitHub usernames we've already processed
declare -A processed

echo "📋 Found the following contributors in git history:"
echo ""

while IFS='|' read -r name email; do
  # Skip if we've already processed this email
  if [[ -n "${processed[$email]}" ]]; then
    continue
  fi
  processed[$email]=1

  echo "  • $name <$email>"

  # Try to extract GitHub username from email
  username=""

  # Common GitHub email patterns:
  # 1. username@users.noreply.github.com
  # 2. 12345+username@users.noreply.github.com
  if [[ $email =~ ^([0-9]+\+)?([^@]+)@users\.noreply\.github\.com$ ]]; then
    username="${BASH_REMATCH[2]}"
    echo "    → Found GitHub username: $username"
  # 3. GitHub Actions bot
  elif [[ $email == "github-actions[bot]@users.noreply.github.com" ]]; then
    echo "    → Skipping GitHub Actions bot"
    continue
  # 4. Try to find GitHub username in git config or commit messages
  else
    echo "    ⚠️  Could not auto-detect GitHub username from email"
    echo "    ℹ️  You can manually add this contributor later with:"
    echo "       npm run contributors:add -- <username> code"
    continue
  fi

  # Add the contributor
  if [[ -n "$username" ]]; then
    echo "    ✅ Adding $username as code contributor..."
    npm run contributors:add -- "$username" code 2>/dev/null || {
      echo "    ⚠️  Failed to add $username (might already exist or invalid username)"
    }
    echo ""
  fi
done <<< "$contributors"

echo ""
echo "📝 Regenerating contributors list in README..."
npm run contributors:generate

echo ""
echo "✅ Done! Historical contributors have been added."
echo ""
echo "📌 Next steps:"
echo "   1. Review the changes in README.md"
echo "   2. Check .all-contributorsrc for the complete list"
echo "   3. Manually add any contributors who couldn't be auto-detected"
echo "   4. Commit the changes:"
echo "      git add .all-contributorsrc README.md"
echo "      git commit -m 'docs: Add historical code contributors'"
echo ""
