import LiteYouTubeEmbed from "react-lite-youtube-embed"
import styles from '../../styles/Home.module.css'

export default function WebPExample() {
  return (
    <div id="webp" className={styles.example}>
      <h2>WebP Image Format</h2>
      <p className={styles.exampleDescription}>
        Enable <code>webp={'{'}true{'}'}</code> to use WebP format for thumbnails.
        WebP provides better compression and smaller file sizes with the same visual quality.
        Supported by all modern browsers (97%+ coverage).
      </p>
      <LiteYouTubeEmbed
        id="8AHCfZTRGiI"
        title="Johnny Cash - Hurt"
        poster="hqdefault"
        webp
      />
      <details className={styles.codeToggle}>
        <summary>View Code</summary>
        <pre>
          <code className="language-jsx">
{`<LiteYouTubeEmbed
  id="8AHCfZTRGiI"
  title="Johnny Cash - Hurt"
  poster="hqdefault"
  webp
/>`}
          </code>
        </pre>
      </details>
    </div>
  )
}
