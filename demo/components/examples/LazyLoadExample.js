import LiteYouTubeEmbed from "react-lite-youtube-embed"
import styles from '../../styles/Home.module.css'

export default function LazyLoadExample() {
  return (
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
        id="RB-RcX5DS5A"
        title="Coldplay - The Scientist (Official 4K Video)"
      />
      <details className={styles.codeToggle}>
        <summary>View Code</summary>
        <pre>
          <code className="language-jsx">
{`<LiteYouTubeEmbed
  id="RB-RcX5DS5A"
  title="Coldplay - The Scientist (Official 4K Video)"
  lazyLoad={true}
/>`}
          </code>
        </pre>
      </details>
    </div>
  )
}
