import LiteYouTubeEmbed from "react-lite-youtube-embed"
import styles from '../../styles/Home.module.css'

export default function SEOExample() {
  return (
    <div id="seo" className={styles.example}>
      <h2>SEO with Structured Data</h2>
      <p className={styles.exampleDescription}>
        Add <code>seo</code> prop to generate JSON-LD structured data for search engines.
        This enables rich results in Google search (video carousels, thumbnails).
        Includes automatic noscript fallback for crawlers.
      </p>
      <LiteYouTubeEmbed
        id="CJ54eImz88w"
        title="Talking Heads - Psycho Killer (Official Video)"
        seo={{
          name: "Talking Heads - Psycho Killer",
          description: "Talking Heads present a new music video for Psycho Killer starring Saoirse Ronan and directed by Mike Mills.",
          uploadDate: "2018-12-05T08:00:00Z",
          duration: "PT53M17S"
        }}
      />
      <details className={styles.codeToggle}>
        <summary>View Code</summary>
        <pre>
          <code className="language-jsx">
{`<LiteYouTubeEmbed
  id="CJ54eImz88w"
  title="Talking Heads - Psycho Killer (Official Video)"
  seo={{
    name: "Talking Heads - Psycho Killer (Official Video)",
    description: "Talking Heads present a new music video for Psycho Killer starring Saoirse Ronan and directed by Mike Mills.",
    uploadDate: "2025-06-05T08:00:00Z",
    duration: "PT53M17S"
  }}
/>`}
          </code>
        </pre>
      </details>
    </div>
  )
}
