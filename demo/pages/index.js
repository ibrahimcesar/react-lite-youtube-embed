import Head from 'next/head'
import { useCallback, useEffect, useRef, useState } from 'react'
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

  // Navigation link styles
  const navLinkStyle = {
    display: 'block',
    padding: '0.65rem 1rem',
    background: 'rgba(255, 255, 255, 0.15)',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '6px',
    fontSize: '0.9rem',
    transition: 'all 0.2s ease',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)'
  };

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

        {/* Quick Navigation */}
        <nav style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '1.5rem',
          borderRadius: '12px',
          margin: '2rem 0',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{
            color: 'white',
            margin: '0 0 1rem 0',
            fontSize: '1.1rem',
            fontWeight: '600'
          }}>
            Quick Navigation
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '0.75rem'
          }}>
            <a href="#basic" style={navLinkStyle}>1. Basic Usage</a>
            <a href="#maxres" style={navLinkStyle}>2. Max Resolution</a>
            <a href="#webp" style={navLinkStyle}>3. WebP Format</a>
            <a href="#lazy" style={navLinkStyle}>4. Lazy Loading</a>
            <a href="#playlist" style={navLinkStyle}>5. Playlist</a>
            <a href="#start-time" style={navLinkStyle}>6. Start Time</a>
            <a href="#seo" style={navLinkStyle}>7. SEO & Structured Data</a>
            <a href="#aspect-ratio" style={navLinkStyle}>8. Custom Aspect Ratio</a>
            <a href="#player-control" style={navLinkStyle}>9. Player Control</a>
            <a href="#events" style={{...navLinkStyle, background: '#10b981', fontWeight: '600'}}>10. Events 🎉 NEW</a>
            <a href="#accessibility" style={navLinkStyle}>11. Accessibility</a>
          </div>
        </nav>

        <div className={styles.grid}>
          {/* Example 1: Basic */}
          <div id="basic" className={styles.example}>
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
          <div id="maxres" className={styles.example}>
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
          <div id="webp" className={styles.example}>
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
          <div id="lazy" className={styles.example}>
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
          <div id="playlist" className={styles.example}>
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
          <div id="start-time" className={styles.example}>
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
          <div id="seo" className={styles.example}>
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
          <div id="aspect-ratio" className={styles.example}>
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

          {/* Example 10: Interactive Events Demo (NEW in v3.0+) */}
          <EventsExample />

          {/* Example 11: Accessibility */}
          <div id="accessibility" className={styles.example}>
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
    <div id="player-control" className={styles.example}>
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

// Player state names for the Events Demo
const PLAYER_STATE_NAMES = {
  '-1': 'Unstarted',
  '0': 'Ended',
  '1': 'Playing',
  '2': 'Paused',
  '3': 'Buffering',
  '5': 'Cued'
};

// Separate component for Interactive Events Demo (NEW in v3.0+)
function EventsExample() {
  const ytRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [currentState, setCurrentState] = useState('Not Started');
  const [playerInfo, setPlayerInfo] = useState({});

  const addEvent = useCallback((eventName, data = null) => {
    const timestamp = new Date().toLocaleTimeString();
    setEvents(prev => [{
      name: eventName,
      data: data,
      timestamp: timestamp,
      id: Date.now() + Math.random()
    }, ...prev].slice(0, 12)); // Keep last 12 events
  }, []);

  const clearEvents = useCallback(() => {
    setEvents([]);
    setCurrentState('Not Started');
    setPlayerInfo({});
  }, []);

  // Memoize event handlers to prevent infinite loops
  const handleIframeAdded = useCallback(() => {
    addEvent('onIframeAdded');
  }, [addEvent]);

  const handleReady = useCallback((e) => {
    addEvent('onReady', e);
    setPlayerInfo(e);
  }, [addEvent]);

  const handleStateChange = useCallback((e) => {
    addEvent('onStateChange', e);
    setCurrentState(PLAYER_STATE_NAMES[e.state] || 'Unknown');
  }, [addEvent]);

  const handlePlay = useCallback(() => {
    addEvent('onPlay');
    setCurrentState('Playing');
  }, [addEvent]);

  const handlePause = useCallback(() => {
    addEvent('onPause');
    setCurrentState('Paused');
  }, [addEvent]);

  const handleEnd = useCallback(() => {
    addEvent('onEnd');
    setCurrentState('Ended');
  }, [addEvent]);

  const handleBuffering = useCallback(() => {
    addEvent('onBuffering');
    setCurrentState('Buffering');
  }, [addEvent]);

  const handleError = useCallback((errorCode) => {
    addEvent('onError', { errorCode });
    setCurrentState('Error');
  }, [addEvent]);

  const handlePlaybackRateChange = useCallback((rate) => {
    addEvent('onPlaybackRateChange', { rate });
  }, [addEvent]);

  const handlePlaybackQualityChange = useCallback((quality) => {
    addEvent('onPlaybackQualityChange', { quality });
  }, [addEvent]);

  return (
    <div id="events" className={styles.example}>
      <h2>Interactive Events Demo 🎉 <span style={{fontSize: '0.7em', background: '#0070f3', color: 'white', padding: '0.2em 0.6em', borderRadius: '4px', fontWeight: '600'}}>NEW in v3.0+</span></h2>
      <p className={styles.exampleDescription}>
        <strong>Events are first-class citizens in v3.0+!</strong> All event handlers require <code>enableJsApi={'{'}true{'}'}</code> and a <code>ref</code> prop.
        For the best experience with events, also set <code>alwaysLoadIframe={'{'}true{'}'}</code> to load the YouTube player immediately.
        Play the video below and watch the live event log to see all available events in action.
      </p>

      {/* Current State Display */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '1rem',
        flexWrap: 'wrap'
      }}>
        <div style={{
          flex: '1',
          minWidth: '200px',
          padding: '1rem',
          background: '#f0f9ff',
          border: '2px solid #0070f3',
          borderRadius: '8px'
        }}>
          <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.25rem' }}>Player State</div>
          <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0070f3' }}>{currentState}</div>
        </div>
        {playerInfo.videoId && (
          <div style={{
            flex: '1',
            minWidth: '200px',
            padding: '1rem',
            background: '#f0fdf4',
            border: '2px solid #10b981',
            borderRadius: '8px'
          }}>
            <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.25rem' }}>Video Info</div>
            <div style={{ fontSize: '0.9rem', fontFamily: 'monospace' }}>
              ID: {playerInfo.videoId}
              {playerInfo.duration && <><br/>Duration: {playerInfo.duration}s</>}
            </div>
          </div>
        )}
      </div>

      {/* Video Player */}
      <LiteYouTubeEmbed
        ref={ytRef}
        id="HaEPXoXVf2k"
        title="Interactive Events Demo Video"
        enableJsApi={true}
        alwaysLoadIframe={true}
        onIframeAdded={handleIframeAdded}
        onReady={handleReady}
        onStateChange={handleStateChange}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnd={handleEnd}
        onBuffering={handleBuffering}
        onError={handleError}
        onPlaybackRateChange={handlePlaybackRateChange}
        onPlaybackQualityChange={handlePlaybackQualityChange}
      />

      {/* Event Log */}
      <div style={{ marginTop: '1.5rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.75rem'
        }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Live Event Log</h3>
          <button
            onClick={clearEvents}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.85rem',
              background: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Clear Log
          </button>
        </div>
        <div style={{
          maxHeight: '300px',
          overflowY: 'auto',
          background: '#1e1e1e',
          padding: '1rem',
          borderRadius: '8px',
          fontFamily: 'monospace',
          fontSize: '0.85rem'
        }}>
          {events.length === 0 ? (
            <div style={{ color: '#888', textAlign: 'center', padding: '2rem' }}>
              No events yet. Click play on the video to start seeing events!
            </div>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                style={{
                  padding: '0.5rem',
                  marginBottom: '0.5rem',
                  background: '#2d2d2d',
                  borderLeft: '3px solid #0070f3',
                  borderRadius: '4px'
                }}
              >
                <div style={{ color: '#10b981', fontWeight: '600' }}>
                  {event.name}
                  <span style={{ color: '#888', fontSize: '0.8em', marginLeft: '0.5rem' }}>
                    {event.timestamp}
                  </span>
                </div>
                {event.data && (
                  <div style={{ color: '#60a5fa', marginTop: '0.25rem' }}>
                    {JSON.stringify(event.data, null, 2)}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <details className={styles.codeToggle} style={{ marginTop: '1.5rem' }}>
        <summary>View Code - All Event Handlers</summary>
        <pre>
          <code className="language-jsx">
{`import { useState, useRef } from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';

function EventsExample() {
  const ytRef = useRef(null);  // ⚠️ REQUIRED for events to work
  const [events, setEvents] = useState([]);
  const [currentState, setCurrentState] = useState('Not Started');

  const addEvent = (eventName, data = null) => {
    setEvents(prev => [{
      name: eventName,
      data: data,
      timestamp: new Date().toLocaleTimeString()
    }, ...prev]);
  };

  return (
    <>
      {/* Current State: {currentState} */}

      <LiteYouTubeEmbed
        ref={ytRef}  // ⚠️ REQUIRED for events to work
        id="HaEPXoXVf2k"
        title="Interactive Events Demo"
        enableJsApi={true}  // ⚠️ REQUIRED for all events
        alwaysLoadIframe={true}  // Load iframe immediately (recommended for events)

        // Lifecycle Events
        onIframeAdded={() => {
          addEvent('onIframeAdded');
        }}
        onReady={(event) => {
          // event: { videoId: string, title: string }
          addEvent('onReady', event);
        }}

        // State Change Events
        onStateChange={(event) => {
          // event: { state: number, currentTime?: number, duration?: number }
          // States: -1=Unstarted, 0=Ended, 1=Playing, 2=Paused, 3=Buffering, 5=Cued
          addEvent('onStateChange', event);
          setCurrentState(event.state);
        }}

        // Convenience Events (shortcuts for onStateChange)
        onPlay={() => {
          addEvent('onPlay');
        }}
        onPause={() => {
          addEvent('onPause');
        }}
        onEnd={() => {
          addEvent('onEnd');
        }}
        onBuffering={() => {
          addEvent('onBuffering');
        }}

        // Error Events
        onError={(errorCode) => {
          // Error codes: 2=Invalid param, 5=HTML5 error, 100=Not found,
          // 101/150=Not embeddable
          addEvent('onError', { errorCode });
        }}

        // Playback Events
        onPlaybackRateChange={(rate) => {
          // rate: 0.25, 0.5, 1, 1.5, 2
          addEvent('onPlaybackRateChange', { rate });
        }}
        onPlaybackQualityChange={(quality) => {
          // quality: "small", "medium", "large", "hd720", "hd1080"
          addEvent('onPlaybackQualityChange', { quality });
        }}
      />

      {/* Display event log */}
      <div>
        {events.map((event, i) => (
          <div key={i}>
            {event.name}: {JSON.stringify(event.data)}
          </div>
        ))}
      </div>
    </>
  );
}`}
          </code>
        </pre>
      </details>

      <details className={styles.codeToggle}>
        <summary>View Code - Type Definitions</summary>
        <pre>
          <code className="language-typescript">
{`// Player State enum
enum PlayerState {
  UNSTARTED = -1,
  ENDED = 0,
  PLAYING = 1,
  PAUSED = 2,
  BUFFERING = 3,
  CUED = 5
}

// Error codes enum
enum PlayerError {
  INVALID_PARAM = 2,
  HTML5_ERROR = 5,
  VIDEO_NOT_FOUND = 100,
  NOT_EMBEDDABLE = 101,
  NOT_EMBEDDABLE_DISGUISED = 150
}

// Event type definitions
interface PlayerReadyEvent {
  videoId: string;
  title: string;
}

interface PlayerStateChangeEvent {
  state: PlayerState;
  currentTime?: number;
  duration?: number;
}

// Component props
interface LiteYouTubeEmbedProps {
  // ... other props

  // Event handlers (all require enableJsApi={true})
  onIframeAdded?: () => void;
  onReady?: (event: PlayerReadyEvent) => void;
  onStateChange?: (event: PlayerStateChangeEvent) => void;
  onPlay?: () => void;
  onPause?: () => void;
  onEnd?: () => void;
  onBuffering?: () => void;
  onError?: (errorCode: PlayerError) => void;
  onPlaybackRateChange?: (playbackRate: number) => void;
  onPlaybackQualityChange?: (quality: string) => void;
}`}
          </code>
        </pre>
      </details>

    </div>
  );
}
