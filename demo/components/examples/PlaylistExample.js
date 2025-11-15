import LiteYouTubeEmbed from "react-lite-youtube-embed"
import styles from '../../styles/Home.module.css'

export default function PlaylistExample() {
  return (
    <div id="playlist" className={styles.example}>
      <h2>YouTube Playlist</h2>
      <p className={styles.exampleDescription}>
        Embed an entire playlist using <code>playlist={'{'}true{'}'}</code>. Since playlists don't have
        a standard cover image, use <code>playlistCoverId</code> to specify a video ID for the thumbnail.
      </p>
      <LiteYouTubeEmbed
        id="PLvFsG9gYFxY9zTBhcFmMcYa3zYfQz7P7F"
        playlist={true}
        playlistCoverId="3HRkKznJoZA"
        poster="hqdefault"
        title="Science SONGS"
      />
      <details className={styles.codeToggle}>
        <summary>View Code</summary>
        <pre>
          <code className="language-jsx">
{`<LiteYouTubeEmbed
  id="PLvFsG9gYFxY9zTBhcFmMcYa3zYfQz7P7F"
  title="Science SONGS"
  playlist={true}
  playlistCoverId="3HRkKznJoZA"
  poster="hqdefault"
/>`}
          </code>
        </pre>
      </details>
    </div>
  )
}
