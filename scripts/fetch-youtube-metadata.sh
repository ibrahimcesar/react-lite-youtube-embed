#!/bin/bash
# =============================================================================
# YouTube Metadata Fetcher for react-lite-youtube-embed SEO
# =============================================================================
#
# This script helps you fetch metadata for YouTube videos to use with the
# `seo` prop in react-lite-youtube-embed. It uses YouTube's oEmbed API which
# doesn't require authentication.
#
# USAGE:
#   ./scripts/fetch-youtube-metadata.sh VIDEO_ID [--format json|react]
#
# EXAMPLES:
#   ./scripts/fetch-youtube-metadata.sh dQw4w9WgXcQ
#   ./scripts/fetch-youtube-metadata.sh dQw4w9WgXcQ --format react
#   ./scripts/fetch-youtube-metadata.sh L2vS_050c-M --format json
#
# OUTPUT FORMATS:
#   json  - Outputs raw JSON data (default)
#   react - Outputs ready-to-use React component code
#
# REQUIREMENTS:
#   - curl (for making HTTP requests)
#   - jq (for parsing JSON) - Install: apt-get install jq / brew install jq
#
# NOTE:
#   The oEmbed API provides limited metadata (title, thumbnail, author).
#   For complete metadata including description, uploadDate, and duration,
#   you'll need to use the YouTube Data API v3 with an API key.
#   See: https://developers.google.com/youtube/v3/getting-started
#
# =============================================================================

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_error() {
    echo -e "${RED}Error: $1${NC}" >&2
}

print_success() {
    echo -e "${GREEN}$1${NC}"
}

print_info() {
    echo -e "${BLUE}$1${NC}"
}

print_warning() {
    echo -e "${YELLOW}$1${NC}"
}

print_usage() {
    cat << 'EOF'
Usage: ./scripts/fetch-youtube-metadata.sh VIDEO_ID [--format json|react]

Examples:
  ./scripts/fetch-youtube-metadata.sh dQw4w9WgXcQ
  ./scripts/fetch-youtube-metadata.sh dQw4w9WgXcQ --format react

Output formats:
  json  - Raw JSON data (default)
  react - Ready-to-use React component code
EOF
}

check_dependencies() {
    if ! command -v curl &> /dev/null; then
        print_error "curl is required but not installed."
        exit 1
    fi

    if ! command -v jq &> /dev/null; then
        print_error "jq is required but not installed."
        print_info "Install: apt-get install jq  OR  brew install jq"
        exit 1
    fi
}

fetch_oembed_data() {
    local video_id="$1"
    local url="https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${video_id}&format=json"

    local response
    response=$(curl -s -w "\n%{http_code}" "$url")
    local http_code=$(echo "$response" | tail -n1)
    local body=$(echo "$response" | sed '$d')

    if [ "$http_code" != "200" ]; then
        print_error "Failed to fetch video data (HTTP $http_code)"
        print_info "Please check that the video ID is correct and the video is publicly accessible."
        exit 1
    fi

    echo "$body"
}

output_json() {
    local video_id="$1"
    local oembed_data="$2"

    local title=$(echo "$oembed_data" | jq -r '.title')
    local thumbnail_url=$(echo "$oembed_data" | jq -r '.thumbnail_url')
    local author_name=$(echo "$oembed_data" | jq -r '.author_name')

    cat << EOF
{
  "id": "$video_id",
  "title": "$title",
  "author": "$author_name",
  "thumbnailUrl": "$thumbnail_url",
  "seo": {
    "name": "$title",
    "description": "TODO: Add video description",
    "uploadDate": "TODO: Add upload date (ISO 8601 format, e.g., 2024-01-15T08:00:00Z)",
    "duration": "TODO: Add video duration (ISO 8601 format, e.g., PT3M33S)",
    "thumbnailUrl": "$thumbnail_url"
  }
}
EOF
}

output_react() {
    local video_id="$1"
    local oembed_data="$2"

    local title=$(echo "$oembed_data" | jq -r '.title')
    local thumbnail_url=$(echo "$oembed_data" | jq -r '.thumbnail_url')

    # Escape quotes in title
    title=$(echo "$title" | sed 's/"/\\"/g')

    cat << EOF
<LiteYouTubeEmbed
  id="$video_id"
  title="$title"
  seo={{
    name: "$title",
    description: "TODO: Add video description",
    uploadDate: "TODO: Add upload date (e.g., 2024-01-15T08:00:00Z)",
    duration: "TODO: Add duration (e.g., PT3M33S for 3 minutes 33 seconds)",
    thumbnailUrl: "$thumbnail_url"
  }}
/>
EOF
}

show_additional_info() {
    cat << 'EOF'

ℹ️  Additional Information:

The oEmbed API provides basic metadata. For complete SEO data, you have options:

1. Manual approach (recommended for privacy):
   - Visit the YouTube video page
   - Copy the description, upload date, and duration manually
   - Convert duration to ISO 8601 format (PT#H#M#S)
     Examples: "PT3M33S" (3:33), "PT1H30M" (1:30:00)

2. YouTube Data API v3 (requires API key):
   - Get a free API key: https://console.cloud.google.com/apis/credentials
   - API endpoint: https://www.googleapis.com/youtube/v3/videos
   - Query: ?part=snippet,contentDetails&id=VIDEO_ID&key=YOUR_API_KEY
   - Free tier: 10,000 quota units/day (sufficient for most use cases)

3. Browser DevTools approach:
   - Open video page, inspect with DevTools
   - Search for "datePublished" and "duration" in HTML
   - Copy the values from meta tags

Duration conversion examples:
  - 3 minutes 33 seconds  → PT3M33S
  - 15 minutes           → PT15M
  - 1 hour 30 minutes    → PT1H30M
  - 2 hours 15 min 30s   → PT2H15M30S

EOF
}

# Main script
main() {
    local video_id=""
    local format="json"

    # Parse arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            --format)
                format="$2"
                shift 2
                ;;
            --help|-h)
                print_usage
                exit 0
                ;;
            *)
                if [ -z "$video_id" ]; then
                    video_id="$1"
                else
                    print_error "Unknown argument: $1"
                    print_usage
                    exit 1
                fi
                shift
                ;;
        esac
    done

    # Validate arguments
    if [ -z "$video_id" ]; then
        print_error "Video ID is required"
        print_usage
        exit 1
    fi

    if [[ ! "$format" =~ ^(json|react)$ ]]; then
        print_error "Invalid format: $format (must be 'json' or 'react')"
        exit 1
    fi

    # Check dependencies
    check_dependencies

    # Fetch data
    print_info "Fetching metadata for video: $video_id..." >&2
    local oembed_data
    oembed_data=$(fetch_oembed_data "$video_id")

    print_success "✓ Successfully fetched video metadata" >&2
    echo "" >&2

    # Output in requested format
    if [ "$format" = "json" ]; then
        output_json "$video_id" "$oembed_data"
    else
        output_react "$video_id" "$oembed_data"
    fi

    # Show additional info
    show_additional_info >&2
}

# Run main function
main "$@"
