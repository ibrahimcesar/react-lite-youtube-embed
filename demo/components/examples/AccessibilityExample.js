import LiteYouTubeEmbed from "react-lite-youtube-embed"
import styles from '../../styles/Home.module.css'

export default function AccessibilityExample() {
  return (
    <div id="accessibility" className={styles.example}>
      <h2>Enhanced Accessibility</h2>
      <p className={styles.exampleDescription}>
        Use <code>announce</code> for internationalization and <code>focusOnLoad</code> to
        improve keyboard navigation. Screen readers will announce "Assistir" (Portuguese for "Watch")
        instead of the default "Watch".
      </p>
      <LiteYouTubeEmbed
        id="aXJ_Ub1xbhw"
        title="Pitty - Admirável Chip Novo (Clipe Oficial)"
        announce="Assistir"
        focusOnLoad={true}
      />
      <details className={styles.codeToggle}>
        <summary>View Code</summary>
        <pre>
          <code className="language-jsx">
{`<LiteYouTubeEmbed
  id="aXJ_Ub1xbhw"
  title="Pitty - Admirável Chip Novo (Clipe Oficial)"
  announce="Assistir"  // Portuguese for "Watch"
  focusOnLoad={true}
/>`}
          </code>
        </pre>
      </details>
    </div>
  )
}
