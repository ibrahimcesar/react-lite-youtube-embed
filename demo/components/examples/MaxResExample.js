import LiteYouTubeEmbed from "react-lite-youtube-embed"
import styles from '../../styles/Home.module.css'

export default function MaxResExample() {
  return (
    <div id="maxres" className={styles.example}>
      <h2>Maximum Resolution Thumbnail</h2>
      <p className={styles.exampleDescription}>
        Use <code>poster="maxresdefault"</code> for the highest quality thumbnail available.
        Note: maxresdefault isn't available for all videos. Falls back to lower quality if unavailable.
      </p>
      <LiteYouTubeEmbed
        id="1RKqOmSkGgM"
        title="Chappell Roan - Good Luck, Babe! (Official Lyric Video)"
        poster="maxresdefault"
      />
      <details className={styles.codeToggle}>
        <summary>View Code</summary>
        <pre>
          <code className="language-jsx">
{`<LiteYouTubeEmbed
  id="1RKqOmSkGgM"
  title="Chappell Roan - Good Luck, Babe! (Official Lyric Video)"
  poster="maxresdefault"
/>`}
          </code>
        </pre>
      </details>
    </div>
  )
}
