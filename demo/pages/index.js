import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import LiteYouTubeEmbed from "react-lite-youtube-embed"
import Prism from "prismjs"
import packageInfo from "../package.json"

import styles from '../styles/Home.module.css'

export default function Home() {
    useEffect(() => {
      if (typeof window !== 'undefined' && Prism) {
        try {
          Prism.highlightAll();
        } catch (error) {
          // Silently handle Prism errors
          console.debug('Prism highlighting error:', error);
        }
      }
    }, []);

  // Get the component version from package.json
  const componentVersion = packageInfo.dependencies['react-lite-youtube-embed'];
  const isBetaVersion = componentVersion.includes('beta') || componentVersion.includes('alpha') || componentVersion.includes('rc');

  return (
    <div className={styles.container}>
      <Head>
        <title>React Lite YouTube Embed Demo Page</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      {isBetaVersion && (
        <div className={styles.betaBanner}>
          🧪 <strong>Beta Version:</strong> This demo is using a pre-release version ({componentVersion}) of react-lite-youtube-embed
        </div>
      )}

      <main className={styles.main}>
        <h1 className={styles.title}>
          📺 React Lite YouTube Embed
        </h1>

        <p className={styles.description}>
          A private by default, faster and cleaner YouTube embed component for React applications
        </p>

        <div className={styles.versionBadge}>
          <a
            href={`https://www.npmjs.com/package/react-lite-youtube-embed/v/${componentVersion}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            v{componentVersion}
          </a>
          {' | '}
          <a
            href="https://github.com/ibrahimcesar/react-lite-youtube-embed"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          {' | '}
          <a
            href="https://www.npmjs.com/package/react-lite-youtube-embed"
            target="_blank"
            rel="noopener noreferrer"
          >
            npm
          </a>
        </div>

        <div className={styles.grid}>
          {/* Example 1: Basic */}
          <div className={styles.example}>
            <h2>Basic Usage</h2>
            <p className={styles.exampleDescription}>
              The simplest implementation requires only an <code>id</code> and <code>title</code>.
              This uses the default settings: privacy-enhanced mode (youtube-nocookie.com),
              no ad network preconnect, and hqdefault thumbnail quality.
            </p>
            <LiteYouTubeEmbed
              id="HaEPXoXVf2k"
              title="AWS re:Invent 2018: Amazon DynamoDB Deep Dive: Advanced Design Patterns for DynamoDB (DAT401)"
            />
            <details className={styles.codeToggle} open>
              <summary>View Code</summary>
              <pre>
                <code className="language-jsx">
{`<LiteYouTubeEmbed
  id="HaEPXoXVf2k"
  title="Amazon DynamoDB Deep Dive"
/>`}
                </code>
              </pre>
            </details>
          </div>

          {/* Example 2: High Quality Thumbnail */}
          <div className={styles.example}>
            <h2>Maximum Resolution Thumbnail</h2>
            <p className={styles.exampleDescription}>
              Use <code>poster="maxresdefault"</code> for the highest quality thumbnail available.
              Note: maxresdefault isn't available for all videos. Falls back to lower quality if unavailable.
            </p>
            <LiteYouTubeEmbed
              id="HaEPXoXVf2k"
              title="AWS re:Invent 2018: Amazon DynamoDB Deep Dive: Advanced Design Patterns for DynamoDB (DAT401)"
              poster="maxresdefault"
            />
            <details className={styles.codeToggle}>
              <summary>View Code</summary>
              <pre>
                <code className="language-jsx">
{`<LiteYouTubeEmbed
  id="HaEPXoXVf2k"
  title="Amazon DynamoDB Deep Dive"
  poster="maxresdefault"
/>`}
                </code>
              </pre>
            </details>
          </div>

          {/* Example 3: WebP Format */}
          <div className={styles.example}>
            <h2>WebP Image Format</h2>
            <p className={styles.exampleDescription}>
              Enable <code>webp={'{'}true{'}'}</code> to use WebP format for thumbnails.
              WebP provides better compression and smaller file sizes with the same visual quality.
              Supported by all modern browsers (97%+ coverage).
            </p>
            <LiteYouTubeEmbed
              id="HaEPXoXVf2k"
              title="Amazon DynamoDB Deep Dive"
              poster="hqdefault"
              webp
            />
            <details className={styles.codeToggle}>
              <summary>View Code</summary>
              <pre>
                <code className="language-jsx">
{`<LiteYouTubeEmbed
  id="HaEPXoXVf2k"
  title="Amazon DynamoDB Deep Dive"
  poster="hqdefault"
  webp
/>`}
                </code>
              </pre>
            </details>
          </div>

          {/* Example 4: Lazy Loading */}
          <div className={styles.example}>
            <h2>Lazy Loading for Better Performance</h2>
            <p className={styles.exampleDescription}>
              Enable <code>lazyLoad={'{'}true{'}'}</code> to defer loading of thumbnail images until they're visible.
              Perfect for pages with multiple videos or videos below the fold. Improves Lighthouse scores
              and reduces initial bandwidth usage.
            </p>
            <p className={styles.exampleDescription} style={{ fontSize: '0.9rem', fontStyle: 'italic', color: '#555' }}>
              <strong>Note:</strong> With lazy loading enabled, the thumbnail image loads only when it's near the viewport.
              On initial page load, you might notice a brief moment before the image appears - this is normal browser
              behavior and is the performance tradeoff that makes lazy loading valuable. The aspect ratio container
              ensures proper spacing is reserved.
            </p>
            <LiteYouTubeEmbed
              id="HaEPXoXVf2k"
              title="Amazon DynamoDB Deep Dive"
            />
            <details className={styles.codeToggle}>
              <summary>View Code</summary>
              <pre>
                <code className="language-jsx">
{`<LiteYouTubeEmbed
  id="HaEPXoXVf2k"
  title="Amazon DynamoDB Deep Dive"
  lazyLoad={true}
/>`}
                </code>
              </pre>
            </details>
          </div>

          {/* Example 5: Playlist */}
          <div className={styles.example}>
            <h2>YouTube Playlist</h2>
            <p className={styles.exampleDescription}>
              Embed an entire playlist using <code>playlist={'{'}true{'}'}</code>. Since playlists don't have
              a standard cover image, use <code>playlistCoverId</code> to specify a video ID for the thumbnail.
            </p>
            <LiteYouTubeEmbed
              id="PL0vfts4VzfNigohKr5sPrkcPFpuZmTe2C"
              playlist={true}
              playlistCoverId="Qhaz36TZG5Y"
              poster="hqdefault"
              title="Firebase YouTube Channel Playlist"
            />
            <details className={styles.codeToggle}>
              <summary>View Code</summary>
              <pre>
                <code className="language-jsx">
{`<LiteYouTubeEmbed
  id="PL0vfts4VzfNigohKr5sPrkcPFpuZmTe2C"
  title="Firebase YouTube Channel Playlist"
  playlist={true}
  playlistCoverId="Qhaz36TZG5Y"
  poster="hqdefault"
/>`}
                </code>
              </pre>
            </details>
          </div>

          <hr className={styles.sectionDivider} />

          {/* Example 6: Start Time */}
          <div className={styles.example}>
            <h2>Start at Specific Time</h2>
            <p className={styles.exampleDescription}>
              Use the <code>params</code> prop to pass URL parameters like start time.
              Use <code>start=</code> (in seconds) instead of <code>t=</code>.
              You can pass any valid YouTube URL parameters this way.
            </p>
            <LiteYouTubeEmbed
              id="L2vS_050c-M"
              title="YouTube Embed starting at specific time"
              poster="maxresdefault"
              params="start=1160"
            />
            <details className={styles.codeToggle}>
              <summary>View Code</summary>
              <pre>
                <code className="language-jsx">
{`<LiteYouTubeEmbed
  id="L2vS_050c-M"
  title="YouTube Embed starting at specific time"
  params="start=1160"
  poster="maxresdefault"
/>`}
                </code>
              </pre>
            </details>
          </div>

          {/* Example 7: SEO Optimized */}
          <div className={styles.example}>
            <h2>SEO with Structured Data</h2>
            <p className={styles.exampleDescription}>
              Add <code>seo</code> prop to generate JSON-LD structured data for search engines.
              This enables rich results in Google search (video carousels, thumbnails).
              Includes automatic noscript fallback for crawlers.
            </p>
            <LiteYouTubeEmbed
              id="HaEPXoXVf2k"
              title="DynamoDB Deep Dive"
              seo={{
                name: "Amazon DynamoDB Deep Dive: Advanced Design Patterns",
                description: "Learn advanced design patterns for DynamoDB presented at AWS re:Invent 2018",
                uploadDate: "2018-12-05T08:00:00Z",
                duration: "PT53M17S"
              }}
            />
            <details className={styles.codeToggle}>
              <summary>View Code</summary>
              <pre>
                <code className="language-jsx">
{`<LiteYouTubeEmbed
  id="HaEPXoXVf2k"
  title="DynamoDB Deep Dive"
  seo={{
    name: "Amazon DynamoDB Deep Dive: Advanced Design Patterns",
    description: "Learn advanced design patterns for DynamoDB",
    uploadDate: "2018-12-05T08:00:00Z",
    duration: "PT53M17S"
  }}
/>`}
                </code>
              </pre>
            </details>
          </div>

          {/* Example 8: Custom Aspect Ratio */}
          <div className={styles.example}>
            <h2>Custom Aspect Ratio</h2>
            <p className={styles.exampleDescription}>
              Change the aspect ratio from the default 16:9 using <code>aspectWidth</code> and <code>aspectHeight</code>.
              Useful for older videos in 4:3 format or custom video dimensions.
            </p>
            <LiteYouTubeEmbed
              id="HaEPXoXVf2k"
              title="Video with 4:3 aspect ratio"
              aspectWidth={4}
              aspectHeight={3}
            />
            <details className={styles.codeToggle}>
              <summary>View Code</summary>
              <pre>
                <code className="language-jsx">
{`<LiteYouTubeEmbed
  id="HaEPXoXVf2k"
  title="Video with 4:3 aspect ratio"
  aspectWidth={4}
  aspectHeight={3}
/>`}
                </code>
              </pre>
            </details>
          </div>

          {/* Example 9: Player Control */}
          <PlayerControlExample />

          {/* Example 10: Accessibility */}
          <div className={styles.example}>
            <h2>Enhanced Accessibility</h2>
            <p className={styles.exampleDescription}>
              Use <code>announce</code> for internationalization and <code>focusOnLoad</code> to
              improve keyboard navigation. Screen readers will announce "Assistir" (Portuguese for "Watch")
              instead of the default "Watch".
            </p>
            <LiteYouTubeEmbed
              id="HaEPXoXVf2k"
              title="Vídeo acessível"
              announce="Assistir"
              focusOnLoad={true}
            />
            <details className={styles.codeToggle}>
              <summary>View Code</summary>
              <pre>
                <code className="language-jsx">
{`<LiteYouTubeEmbed
  id="HaEPXoXVf2k"
  title="Vídeo acessível"
  announce="Assistir"  // Portuguese for "Watch"
  focusOnLoad={true}
/>`}
                </code>
              </pre>
            </details>
          </div>

        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/ibrahimcesar/react-lite-youtube-embed"
          target="_blank"
          rel="noopener noreferrer"
        >
          Demo for  <span role="img" aria-label="TV" style={{marginLeft: "5px", marginRight: "5px"}}>‏‏‎ ‎‏‏‎  📺 ‏‏‎ ‎‏‏‎ </span> React Lite YouTube Embed
        </a>
      </footer>
    </div>
  )
}

// Separate component for Player Control example
function PlayerControlExample() {
  const ytRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className={styles.example}>
      <h2>Programmatic Player Control</h2>
      <p className={styles.exampleDescription}>
        Control the player programmatically using the iframe's postMessage API.
        Set <code>enableJsApi={'{'}true{'}'}</code> and <code>alwaysLoadIframe={'{'}true{'}'}</code> to enable
        external controls. This example demonstrates play/pause functionality.
      </p>
      <button
        onClick={() => {
          setIsPlaying((prev) => !prev);
          ytRef.current?.contentWindow?.postMessage(
            `{"event": "command", "func": "${isPlaying ? "pauseVideo" : "playVideo"}"}`,
            "*"
          );
        }}
        style={{
          minWidth: '120px',
          minHeight: '48px',
          padding: '0.75rem 1.5rem',
          marginBottom: '1rem',
          fontSize: '1rem',
          fontWeight: '600',
          color: 'white',
          background: isPlaying ? '#dc2626' : '#0070f3',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
      >
        {isPlaying ? '⏸ Pause' : '▶ Play'}
      </button>
      <LiteYouTubeEmbed
        id="HaEPXoXVf2k"
        title="Controllable video"
        ref={ytRef}
        enableJsApi={true}
        alwaysLoadIframe={true}
      />
      <details className={styles.codeToggle}>
        <summary>View Code</summary>
        <pre>
          <code className="language-jsx">
{`function PlayerControlExample() {
  const ytRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setIsPlaying(prev => !prev);
          ytRef.current?.contentWindow?.postMessage(
            \`{"event": "command", "func": "\${isPlaying ? "pauseVideo" : "playVideo"}"}\`,
            "*"
          );
        }}
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <LiteYouTubeEmbed
        id="HaEPXoXVf2k"
        title="Controllable video"
        ref={ytRef}
        enableJsApi={true}
        alwaysLoadIframe={true}
      />
    </>
  );
}`}
          </code>
        </pre>
      </details>
    </div>
  );
}
