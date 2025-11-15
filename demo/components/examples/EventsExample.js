import { useCallback, useEffect, useRef, useState } from 'react'
import LiteYouTubeEmbed from "react-lite-youtube-embed"
import homeStyles from '../../styles/Home.module.css'
import styles from '../../styles/EventsExample.module.css'
import { PLAYER_STATE_NAMES } from './PLAYER_STATE_NAMES';

export default function EventsExample() {
  const ytEventRef = useRef(null);  // ⚠️ CRITICAL: ref is required for events to work!
  const [events, setEvents] = useState([]);
  const [currentState, setCurrentState] = useState('Not Started');
  const [playerInfo, setPlayerInfo] = useState({});
  const [debugMessages, setDebugMessages] = useState([]);

  // Track which events have fired at least once
  const [firedEvents, setFiredEvents] = useState({
    onIframeAdded: false,
    onReady: false,
    onStateChange: false,
    onPlay: false,
    onPause: false,
    onEnd: false,
    onBuffering: false,
    onError: false,
    onPlaybackRateChange: false,
    onPlaybackQualityChange: false,
  });

  // Helper to add debug console logs
  const logDebug = useCallback((category, message, data = null) => {
    const timestamp = new Date().toLocaleTimeString();
    const logMsg = `[${timestamp}] [${category}] ${message}`;

    console.group(`🎬 YouTube Event: ${category}`);
    console.log(message);
    if (data) {
      console.log('Event Data:', data);
    }
    console.trace('Call stack');
    console.groupEnd();

    setDebugMessages(prev => [{
      category,
      message,
      data,
      timestamp,
      id: Date.now() + Math.random()
    }, ...prev].slice(0, 20)); // Keep last 20 debug messages
  }, []);

  const addEvent = useCallback((eventName, data = null) => {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`✅ Event fired: ${eventName}`, data || '(no data)');

    // Mark this event as fired
    setFiredEvents(prev => ({ ...prev, [eventName]: true }));

    setEvents(prev => [{
      name: eventName,
      data: data,
      timestamp: timestamp,
      id: Date.now() + Math.random()
    }, ...prev].slice(0, 12)); // Keep last 12 events
  }, []);

  const clearEvents = useCallback(() => {
    console.clear();
    console.log('🧹 Event log cleared');
    setEvents([]);
    setCurrentState('Not Started');
    setPlayerInfo({});
    setDebugMessages([]);
  }, []);

  // Memoize event handlers to prevent infinite loops
  const handleIframeAdded = useCallback(() => {
    logDebug('LIFECYCLE', 'iframe element added to DOM');
    addEvent('onIframeAdded');
    console.log('🎯 CHECKPOINT 1: iframe has been added to the page. YouTube player should start initializing.');
  }, [addEvent, logDebug]);

  const handleReady = useCallback((e) => {
    logDebug('LIFECYCLE', 'YouTube player is ready', e);
    addEvent('onReady', e);
    setPlayerInfo(e);
    console.log('🎯 CHECKPOINT 2: Player is ready! Video ID:', e?.videoId, 'Title:', e?.title);
    console.log('💡 TIP: If you see this, events ARE working! Now try playing the video.');
  }, [addEvent, logDebug]);

  const handleStateChange = useCallback((e) => {
    const stateName = PLAYER_STATE_NAMES[e.state] || 'Unknown';
    logDebug('STATE_CHANGE', `Player state changed to: ${stateName}`, e);
    addEvent('onStateChange', e);
    setCurrentState(stateName);
    console.log(`🎯 CHECKPOINT 3: State changed to ${stateName} (code: ${e.state})`);

    // Enhanced debugging info
    if (e.currentTime !== undefined) {
      console.log(`⏱️  Current time: ${e.currentTime.toFixed(2)}s`);
    }
    if (e.duration !== undefined) {
      console.log(`📏 Duration: ${e.duration.toFixed(2)}s`);
    }
  }, [addEvent, logDebug]);

  const handlePlay = useCallback(() => {
    logDebug('PLAYBACK', 'Video started playing');
    addEvent('onPlay');
    setCurrentState('Playing');
    console.log('▶️  PLAY event fired');
  }, [addEvent, logDebug]);

  const handlePause = useCallback(() => {
    logDebug('PLAYBACK', 'Video paused');
    addEvent('onPause');
    setCurrentState('Paused');
    console.log('⏸️  PAUSE event fired');
  }, [addEvent, logDebug]);

  const handleEnd = useCallback(() => {
    logDebug('PLAYBACK', 'Video ended');
    addEvent('onEnd');
    setCurrentState('Ended');
    console.log('⏹️  END event fired - video playback completed');
  }, [addEvent, logDebug]);

  const handleBuffering = useCallback(() => {
    logDebug('PLAYBACK', 'Video is buffering');
    addEvent('onBuffering');
    setCurrentState('Buffering');
    console.log('⏳ BUFFERING event fired');
  }, [addEvent, logDebug]);

  const handleError = useCallback((errorCode) => {
    const errorMessages = {
      2: 'Invalid parameter value',
      5: 'HTML5 player error',
      100: 'Video not found or private',
      101: 'Video not embeddable (owner restriction)',
      150: 'Video not embeddable (same as 101)'
    };
    const errorMsg = errorMessages[errorCode] || 'Unknown error';

    logDebug('ERROR', `YouTube player error: ${errorMsg}`, { errorCode, description: errorMsg });
    addEvent('onError', { errorCode });
    setCurrentState('Error');
    console.error(`❌ ERROR event fired! Code: ${errorCode} - ${errorMsg}`);
    console.log('🔍 If you see error 101/150, the video owner has disabled embedding.');
  }, [addEvent, logDebug]);

  const handlePlaybackRateChange = useCallback((rate) => {
    logDebug('PLAYBACK_SETTINGS', `Playback rate changed to ${rate}x`, { rate });
    addEvent('onPlaybackRateChange', { rate });
    console.log(`⚡ Playback rate changed to ${rate}x speed`);
  }, [addEvent, logDebug]);

  const handlePlaybackQualityChange = useCallback((quality) => {
    logDebug('PLAYBACK_SETTINGS', `Playback quality changed to ${quality}`, { quality });
    addEvent('onPlaybackQualityChange', { quality });
    console.log(`📺 Playback quality changed to: ${quality}`);
  }, [addEvent, logDebug]);

  // Component mount/unmount logging
  useEffect(() => {
    console.log('🚀 EventsExample component mounted');
    console.log('📋 To debug events:');
    console.log('  1. Open this console (DevTools)');
    console.log('  2. Click the play button on the video below');
    console.log('  3. Watch for checkpoint messages');
    console.log('  4. If no events appear, check:');
    console.log('     - Is enableJsApi set to true?');
    console.log('     - Are you blocking YouTube iframes?');
    console.log('     - Check Network tab for failed requests');
    console.log('==========================================');

    return () => {
      console.log('👋 EventsExample component unmounted');
    };
  }, []);

  return (
    <div id="events" className={homeStyles.example}>
      <h2>Interactive Events Demo 🎉 <span className={styles.newBadge}>NEW in v3.0+</span></h2>
      <p className={homeStyles.exampleDescription}>
        <strong>Events are first-class citizens in v3.0+!</strong> All event handlers require:
      </p>
      <ol className={`${homeStyles.exampleDescription} ${styles.orderedList}`}>
        <li><code>enableJsApi={'{'}true{'}'}</code> - Enables YouTube's JavaScript API</li>
        <li><code>ref={'{'}yourRef{'}'}</code> - A React ref is <strong>REQUIRED</strong> for events to work (the component uses it to communicate with YouTube's iframe)</li>
      </ol>
      <p className={homeStyles.exampleDescription}>
        Play the video below and watch the live event log to see all available events in action.
        The event log below only captures events from <strong>this specific video embed</strong>.
      </p>

      {/* Debug Instructions Panel */}
      <div className={styles.debugPanel}>
        <h3 className={styles.debugTitle}>
          🔍 Debugging Instructions
        </h3>
        <ol className={styles.debugList}>
          <li><strong>Open your browser DevTools</strong> (F12 or right-click → Inspect)</li>
          <li><strong>Switch to the Console tab</strong></li>
          <li><strong>Click the play button</strong> on the video below</li>
          <li><strong>Watch for checkpoint messages</strong> in the console with emojis (🎯)</li>
          <li>Events will appear in <strong>BOTH</strong> the console AND the event log below</li>
        </ol>
        <div className={styles.troubleshootingBox}>
          <strong>⚠️ Troubleshooting:</strong> If you don't see ANY console messages after clicking play:
          <ul className={styles.troubleshootingList}>
            <li>Check if YouTube is blocked (network/firewall/ad blocker)</li>
            <li>Verify <code>enableJsApi={'{'}true{'}'}</code> is set</li>
            <li>Check Network tab for failed requests to youtube.com</li>
            <li>Try in an incognito window to rule out extensions</li>
          </ul>
        </div>
      </div>

      {/* Event Flow Checkpoint Tracker */}
      <div className={styles.checkpointPanel}>
        <h3 className={styles.checkpointTitle}>
          📊 Event Flow Checkpoints
        </h3>
        <div className={styles.checkpointGrid}>
          <div className={`${styles.checkpointBadge} ${events.some(e => e.name === 'onIframeAdded') ? styles.checkpointActive : styles.checkpointInactive}`}>
            {events.some(e => e.name === 'onIframeAdded') ? '✅' : '⏺️'} 1. iframe Added
          </div>
          <div className={`${styles.checkpointBadge} ${events.some(e => e.name === 'onReady') ? styles.checkpointActive : styles.checkpointInactive}`}>
            {events.some(e => e.name === 'onReady') ? '✅' : '⏺️'} 2. Player Ready
          </div>
          <div className={`${styles.checkpointBadge} ${events.some(e => e.name === 'onPlay') ? styles.checkpointActive : styles.checkpointInactive}`}>
            {events.some(e => e.name === 'onPlay') ? '✅' : '⏺️'} 3. Playing
          </div>
          <div className={`${styles.checkpointBadge} ${events.some(e => e.name === 'onStateChange') ? styles.checkpointBlue : styles.checkpointInactive}`}>
            {events.some(e => e.name === 'onStateChange') ? '✅' : '⏺️'} State Changes ({events.filter(e => e.name === 'onStateChange').length})
          </div>
        </div>
        <div className={styles.checkpointTip}>
          💡 <strong>Tip:</strong> If checkpoint 1 or 2 doesn't light up, events are NOT firing. Check the console for errors.
        </div>
      </div>

      {/* Current State Display */}
      <div className={styles.stateContainer}>
        <div className={`${styles.stateBox} ${styles.stateBoxBlue}`}>
          <div className={styles.stateLabel}>Player State</div>
          <div className={styles.stateValue}>{currentState}</div>
        </div>
        {playerInfo.videoId && (
          <div className={`${styles.stateBox} ${styles.stateBoxGreen}`}>
            <div className={styles.stateLabel}>Video Info</div>
            <div className={styles.videoInfo}>
              ID: {playerInfo.videoId}
              {playerInfo.title && <><br/>Title: {playerInfo.title}</>}
            </div>
          </div>
        )}
      </div>

      {/* Video Player */}
      <LiteYouTubeEmbed
        id="eBG7P-K-r1Y"
        title="Foo Fighters - Everlong (Official HD Video)"
        ref={ytEventRef}
        enableJsApi={true}
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

      {/* Event Status Tracker */}
      <div className={styles.statusTrackerPanel}>
        <h3 className={styles.statusTrackerTitle}>📋 Event Status Tracker</h3>
        <p className={styles.statusTrackerDescription}>
          Interact with the video to fire different events. Green checkmarks ✅ indicate events that have fired at least once.
        </p>
        <div className={styles.statusGrid}>
          {[
            { name: 'onIframeAdded', label: 'Iframe Added', description: 'Fires when iframe is added to DOM' },
            { name: 'onReady', label: 'Player Ready', description: 'Player initialized successfully' },
            { name: 'onStateChange', label: 'State Change', description: 'Player state changed' },
            { name: 'onPlay', label: 'Play', description: 'Video started playing' },
            { name: 'onPause', label: 'Pause', description: 'Video was paused' },
            { name: 'onEnd', label: 'End', description: 'Video finished playing' },
            { name: 'onBuffering', label: 'Buffering', description: 'Video is buffering' },
            { name: 'onError', label: 'Error', description: 'An error occurred' },
            { name: 'onPlaybackRateChange', label: 'Playback Rate', description: 'Speed changed (use ⚙️ settings)' },
            { name: 'onPlaybackQualityChange', label: 'Quality Change', description: 'Quality changed (use ⚙️ settings)' }
          ].map(event => (
            <div
              key={event.name}
              className={`${styles.eventCard} ${firedEvents[event.name] ? styles.eventCardActive : styles.eventCardInactive}`}
            >
              <div className={styles.eventCardHeader}>
                <span className={styles.eventIcon}>
                  {firedEvents[event.name] ? '✅' : '⏸️'}
                </span>
                <code className={`${styles.eventName} ${firedEvents[event.name] ? styles.eventNameActive : styles.eventNameInactive}`}>
                  {event.label}
                </code>
              </div>
              <div className={styles.eventDescription}>
                {event.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Log */}
      <div className={styles.eventLogContainer}>
        <div className={styles.eventLogHeader}>
          <h3 className={styles.eventLogTitle}>Live Event Log</h3>
          <button
            onClick={clearEvents}
            className={styles.clearButton}
          >
            Clear Log
          </button>
        </div>
        <div className={styles.eventLog}>
          {events.length === 0 ? (
            <div className={styles.eventLogEmpty}>
              No events yet. Click play on the video to start seeing events!
            </div>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className={styles.eventItem}
              >
                <div className={styles.eventItemName}>
                  {event.name}
                  <span className={styles.eventItemTimestamp}>
                    {event.timestamp}
                  </span>
                </div>
                {event.data && (
                  <div className={styles.eventItemData}>
                    {JSON.stringify(event.data, null, 2)}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <details className={`${homeStyles.codeToggle} ${styles.codeToggleSpacing}`}>
        <summary>View Code - All Event Handlers (with Console Debugging)</summary>
        <pre>
          <code className="language-jsx">
{`import { useState, useCallback, useRef } from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';

function EventsExample() {
  const ytRef = useRef(null);  // ⚠️ CRITICAL: ref is REQUIRED for events!
  const [events, setEvents] = useState([]);
  const [currentState, setCurrentState] = useState('Not Started');

  const addEvent = useCallback((eventName, data = null) => {
    // Console logging for debugging
    console.log(\`✅ Event fired: \${eventName}\`, data || '(no data)');

    setEvents(prev => [{
      name: eventName,
      data: data,
      timestamp: new Date().toLocaleTimeString()
    }, ...prev]);
  }, []);

  return (
    <>
      {/* Current State: {currentState} */}

      <LiteYouTubeEmbed
        id="eBG7P-K-r1Y"
        title="Foo Fighters - Everlong (Official HD Video)"
        ref={ytRef}             // ⚠️ CRITICAL: Must pass ref for events!
        enableJsApi={true}      // ⚠️ REQUIRED for all events

        // Lifecycle Events
        onIframeAdded={() => {
          console.log('🎯 CHECKPOINT 1: iframe added to DOM');
          addEvent('onIframeAdded');
        }}
        onReady={(event) => {
          // event: { videoId: string, title: string }
          console.log('🎯 CHECKPOINT 2: Player ready!', event);
          console.log('💡 TIP: If you see this, events ARE working!');
          addEvent('onReady', event);
        }}

        // State Change Events
        onStateChange={(event) => {
          // event: { state: number, currentTime?: number, duration?: number }
          // States: -1=Unstarted, 0=Ended, 1=Playing, 2=Paused, 3=Buffering, 5=Cued
          console.log('🎯 CHECKPOINT 3: State changed', event);
          addEvent('onStateChange', event);
          setCurrentState(event.state);
        }}

        // Convenience Events (shortcuts for onStateChange)
        onPlay={() => {
          console.log('▶️  PLAY event fired');
          addEvent('onPlay');
        }}
        onPause={() => {
          console.log('⏸️  PAUSE event fired');
          addEvent('onPause');
        }}
        onEnd={() => {
          console.log('⏹️  END event fired');
          addEvent('onEnd');
        }}
        onBuffering={() => {
          console.log('⏳ BUFFERING event fired');
          addEvent('onBuffering');
        }}

        // Error Events
        onError={(errorCode) => {
          // Error codes: 2=Invalid param, 5=HTML5 error, 100=Not found,
          // 101/150=Not embeddable
          console.error(\`❌ ERROR: Code \${errorCode}\`);
          addEvent('onError', { errorCode });
        }}

        // Playback Events
        onPlaybackRateChange={(rate) => {
          // rate: 0.25, 0.5, 1, 1.5, 2
          console.log(\`⚡ Playback rate: \${rate}x\`);
          addEvent('onPlaybackRateChange', { rate });
        }}
        onPlaybackQualityChange={(quality) => {
          // quality: "small", "medium", "large", "hd720", "hd1080"
          console.log(\`📺 Quality: \${quality}\`);
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

      {/* Common Issues & Troubleshooting */}
      <details className={`${homeStyles.codeToggle} ${styles.codeToggleSpacingSmall}`}>
        <summary>🔧 Common Issues & Solutions</summary>
        <div className={styles.troubleshootingSection}>
          <h4 className={styles.troubleshootingHeader}>Problem: Events are not firing at all</h4>
          <ul className={styles.troubleshootingUl}>
            <li><strong>🚨 MOST COMMON: Missing ref:</strong> You MUST pass a <code>ref</code> to the component! Without it, the component cannot communicate with YouTube. Example: <code>ref={'{'}useRef(null){'}'}</code></li>
            <li><strong>Forgot enableJsApi:</strong> Ensure <code>enableJsApi={'{'}true{'}'}</code> is set on the component</li>
            <li><strong>YouTube blocked:</strong> Check if ad blockers, firewalls, or network policies block YouTube</li>
            <li><strong>CORS/iframe restrictions:</strong> Some browsers block third-party iframes in certain contexts</li>
            <li><strong>Console errors:</strong> Open DevTools Console and look for red error messages</li>
          </ul>

          <h4 className={styles.troubleshootingHeaderSpacing}>Problem: onIframeAdded fires but onReady doesn't</h4>
          <ul className={styles.troubleshootingUl}>
            <li><strong>YouTube API slow to load:</strong> The component retries at [0, 100, 250, 500, 1000]ms intervals</li>
            <li><strong>Network latency:</strong> Slow connection may delay iframe initialization</li>
            <li><strong>Check Network tab:</strong> Look for failed requests to youtube.com or ytimg.com</li>
          </ul>

          <h4 className={styles.troubleshootingHeaderSpacing}>Problem: Events work in dev but not in production</h4>
          <ul className={styles.troubleshootingUl}>
            <li><strong>Content Security Policy (CSP):</strong> Production CSP headers might block YouTube iframes</li>
            <li><strong>Different domain:</strong> Some YouTube restrictions apply based on embedding domain</li>
            <li><strong>Minification issues:</strong> Check if build process strips event handlers (shouldn't happen)</li>
            <li><strong>Environment variables:</strong> Ensure production build has same props as dev</li>
          </ul>

          <h4 className={styles.troubleshootingHeaderSpacing}>Problem: onStateChange fires but convenience events don't</h4>
          <ul className={styles.troubleshootingUl}>
            <li><strong>Expected behavior:</strong> <code>onPlay</code>, <code>onPause</code>, etc. are triggered BY <code>onStateChange</code></li>
            <li><strong>Check state values:</strong> Log the state number in <code>onStateChange</code> to see what's happening</li>
            <li><strong>Handler not passed:</strong> Ensure you're passing the convenience handlers as props</li>
          </ul>

          <h4 className={styles.troubleshootingHeaderSpacing}>How to debug systematically:</h4>
          <ol className={styles.troubleshootingOl}>
            <li>Open DevTools Console (F12)</li>
            <li>Add <code>console.log</code> to EVERY event handler (see code example above)</li>
            <li>Click play on the video</li>
            <li>Look for checkpoint messages (🎯 CHECKPOINT 1, 2, 3...)</li>
            <li>If you see CHECKPOINT 1 but not 2: iframe loads but YouTube API fails</li>
            <li>If you see CHECKPOINT 2: Events ARE working! The issue is elsewhere</li>
            <li>Check Network tab for failed requests</li>
            <li>Try in incognito mode to rule out browser extensions</li>
          </ol>

          <div className={styles.proTipBox}>
            <strong>💡 Pro Tip:</strong> The component uses <code>window.addEventListener("message", ...)</code>
            to listen for YouTube's postMessage API. You can manually test this by opening the console and typing:
            <pre className={styles.proTipCode}>
{`window.addEventListener('message', (e) => {
  if (e.origin === 'https://www.youtube.com') {
    console.log('YouTube message:', e.data);
  }
});`}
            </pre>
            Click play and you should see raw YouTube messages in the console.
          </div>
        </div>
      </details>

      <details className={homeStyles.codeToggle}>
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
