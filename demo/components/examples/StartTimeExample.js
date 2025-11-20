import LiteYouTubeEmbed from "react-lite-youtube-embed"
import styles from '../../styles/Home.module.css'

export default function StartTimeExample() {
  return (
    <div id="start-time" className={styles.example}>
      <h2>Start at Specific Time</h2>
      <p className={styles.exampleDescription}>
        Use the <code>params</code> prop to pass URL parameters like start time.
        Use <code>start=</code> (in seconds) instead of <code>t=</code>.
        You can pass any valid YouTube URL parameters this way.
      </p>
      <LiteYouTubeEmbed
        id="VdQY7BusJNU"
        title="Cyndi Lauper - Time After Time (Official HD Video)e"
        poster="maxresdefault"
        params="start=114"
      />
      <details className={styles.codeToggle}>
        <summary>View Code</summary>
        <pre>
          <code className="language-jsx">
{`<LiteYouTubeEmbed
  id="VdQY7BusJNU"
  title="Cyndi Lauper - Time After Time (Official HD Video)"
  params="start=114"
  poster="maxresdefault"
/>`}
          </code>
        </pre>
      </details>
    </div>
  )
}
