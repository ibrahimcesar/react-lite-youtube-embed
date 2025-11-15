import { useRef, useState } from 'react'
import LiteYouTubeEmbed from "react-lite-youtube-embed"
import styles from '../../styles/Home.module.css'

export default function PlayerControlExample() {
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
        id="K4dx42YzQCE"
        title="The White Stripes - The Hardest Button To Button (Official Music Video)"
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
        id="K4dx42YzQCE"
        title="The White Stripes - The Hardest Button To Button (Official Music Video)"
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
