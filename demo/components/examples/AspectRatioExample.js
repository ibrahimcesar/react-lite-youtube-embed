import LiteYouTubeEmbed from "react-lite-youtube-embed"
import styles from '../../styles/Home.module.css'

export default function AspectRatioExample() {
  return (
    <div id="aspect-ratio" className={styles.example}>
      <h2>Custom Aspect Ratio</h2>
      <p className={styles.exampleDescription}>
        Change the aspect ratio from the default 16:9 using <code>aspectWidth</code> and <code>aspectHeight</code>.
        Useful for older videos in 4:3 format or custom video dimensions. This video has the 4:3 aspect ratio.
      </p>
      <LiteYouTubeEmbed
        id="Fk-4lXLM34g"
        title="Kate Bush - Wuthering Heights - Official Music Video - Version 2"
        aspectWidth={4}
        aspectHeight={3}
      />
      <details className={styles.codeToggle}>
        <summary>View Code</summary>
        <pre>
          <code className="language-jsx">
{`<LiteYouTubeEmbed
  id="Fk-4lXLM34g"
  title="Kate Bush - Wuthering Heights - Official Music Video - Version 2"
  aspectWidth={4}
  aspectHeight={3}
/>`}
          </code>
        </pre>
      </details>
    </div>
  )
}
