#!/usr/bin/env node

/**
 * Script to add all historical code contributors from git history
 *
 * This script:
 * 1. Parses git log to find all committers
 * 2. Extracts GitHub usernames from email addresses
 * 3. Adds them to all-contributors
 *
 * Usage:
 *   node scripts/add-historical-contributors.js
 *
 * Or with GitHub API token for better username detection:
 *   GITHUB_TOKEN=ghp_xxx node scripts/add-historical-contributors.js
 */

const { execSync } = require('child_process');
const https = require('https');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

/**
 * Extract GitHub username from common email patterns
 */
function extractUsernameFromEmail(email) {
  // Pattern 1: username@users.noreply.github.com
  const match1 = email.match(/^([^@]+)@users\.noreply\.github\.com$/);
  if (match1) return match1[1];

  // Pattern 2: 12345+username@users.noreply.github.com
  const match2 = email.match(/^\d+\+([^@]+)@users\.noreply\.github\.com$/);
  if (match2) return match2[1];

  return null;
}

/**
 * Search GitHub for a user by email (requires GITHUB_TOKEN)
 */
function searchGitHubByEmail(email) {
  return new Promise((resolve, reject) => {
    if (!GITHUB_TOKEN) {
      resolve(null);
      return;
    }

    const query = encodeURIComponent(`${email} in:email`);
    const options = {
      hostname: 'api.github.com',
      path: `/search/users?q=${query}`,
      headers: {
        'User-Agent': 'react-lite-youtube-embed-contributor-script',
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    };

    https.get(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.items && json.items.length > 0) {
            resolve(json.items[0].login);
          } else {
            resolve(null);
          }
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

/**
 * Get all unique contributors from git history
 */
function getGitContributors() {
  try {
    const output = execSync('git log --format="%an|%ae"', { encoding: 'utf8' });
    const lines = output.trim().split('\n');

    const contributors = new Map();

    for (const line of lines) {
      const [name, email] = line.split('|');
      if (!contributors.has(email)) {
        contributors.set(email, { name, email });
      }
    }

    return Array.from(contributors.values());
  } catch (error) {
    console.error('❌ Error getting git contributors:', error.message);
    process.exit(1);
  }
}

/**
 * Add a contributor using all-contributors CLI
 */
function addContributor(username) {
  try {
    execSync(`npm run contributors:add -- ${username} code`, {
      stdio: 'pipe',
      encoding: 'utf8'
    });
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🔍 Finding all historical code contributors...\n');

  if (!GITHUB_TOKEN) {
    console.log('ℹ️  No GITHUB_TOKEN provided. Username detection will be limited.');
    console.log('   Set GITHUB_TOKEN env var for better detection.\n');
  }

  const contributors = getGitContributors();

  console.log(`📋 Found ${contributors.length} unique contributors in git history:\n`);

  const results = {
    added: [],
    skipped: [],
    failed: [],
    needsManual: []
  };

  for (const { name, email } of contributors) {
    console.log(`  • ${name} <${email}>`);

    // Skip bots
    if (email.includes('github-actions[bot]') || email.includes('[bot]@')) {
      console.log('    → Skipping bot account\n');
      results.skipped.push({ name, email, reason: 'bot' });
      continue;
    }

    // Try to extract username from email
    let username = extractUsernameFromEmail(email);

    if (username) {
      console.log(`    → Found GitHub username: ${username}`);
    } else if (GITHUB_TOKEN) {
      console.log('    → Searching GitHub API for username...');
      username = await searchGitHubByEmail(email);
      if (username) {
        console.log(`    → Found via API: ${username}`);
      }
    }

    if (username) {
      console.log(`    ✅ Adding ${username} as code contributor...`);
      const success = addContributor(username);

      if (success) {
        results.added.push({ name, email, username });
        console.log(`    ✓ Successfully added\n`);
      } else {
        results.failed.push({ name, email, username });
        console.log(`    ⚠️  Failed to add (might already exist)\n`);
      }
    } else {
      console.log('    ⚠️  Could not detect GitHub username');
      console.log('    ℹ️  Add manually: npm run contributors:add -- <username> code\n');
      results.needsManual.push({ name, email });
    }
  }

  // Generate updated README
  console.log('📝 Regenerating contributors list in README...');
  try {
    execSync('npm run contributors:generate', { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Error generating contributors list');
  }

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Summary');
  console.log('='.repeat(60));
  console.log(`✅ Added: ${results.added.length}`);
  console.log(`⚠️  Failed: ${results.failed.length}`);
  console.log(`⏭️  Skipped (bots): ${results.skipped.length}`);
  console.log(`📌 Needs manual addition: ${results.needsManual.length}`);

  if (results.added.length > 0) {
    console.log('\n✅ Successfully added:');
    results.added.forEach(({ name, username }) => {
      console.log(`   • ${name} (@${username})`);
    });
  }

  if (results.needsManual.length > 0) {
    console.log('\n📌 Please manually add these contributors:');
    results.needsManual.forEach(({ name, email }) => {
      console.log(`   • ${name} <${email}>`);
      console.log(`     → Find their GitHub username and run:`);
      console.log(`       npm run contributors:add -- <username> code\n`);
    });
  }

  console.log('\n📌 Next steps:');
  console.log('   1. Review the changes in README.md');
  console.log('   2. Check .all-contributorsrc for the complete list');
  console.log('   3. Manually add any contributors listed above');
  console.log('   4. Commit the changes:');
  console.log('      git add .all-contributorsrc README.md');
  console.log('      git commit -m "docs: Add historical code contributors"');
  console.log('');
}

// Run the script
main().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
