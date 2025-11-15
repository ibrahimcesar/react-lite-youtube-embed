import LiteYouTubeEmbed from "react-lite-youtube-embed"
import styles from '../../styles/Home.module.css'

export default function BasicExample() {
  return (
    <div id="basic" className={styles.example}>
      <h2>Basic Usage</h2>
      <p className={styles.exampleDescription}>
        The simplest implementation requires only an <code>id</code> and <code>title</code>.
        This uses the default settings: privacy-enhanced mode (youtube-nocookie.com),
        no ad network preconnect, and hqdefault thumbnail quality.
      </p>
      <LiteYouTubeEmbed
        id="Y2b7FyaynC0"
        title="The Echo Friendly: Same Mistakes (OFFICIAL VIDEO)"
      />
      <details className={styles.codeToggle} open>
        <summary>View Code</summary>
        <pre>
          <code className="language-jsx">
{`<LiteYouTubeEmbed
  id="Y2b7FyaynC0"
  title="The Echo Friendly: Same Mistakes (OFFICIAL VIDEO)"
/>`}
          </code>
        </pre>
      </details>
    </div>
  )
}
