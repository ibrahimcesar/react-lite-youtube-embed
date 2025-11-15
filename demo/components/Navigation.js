import styles from '../styles/Navigation.module.css'

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <h3 className={styles.title}>
        Quick Navigation
      </h3>
      <div className={styles.grid}>
        <a href="#basic" className={styles.navLink}>1. Basic Usage</a>
        <a href="#maxres" className={styles.navLink}>2. Max Resolution</a>
        <a href="#webp" className={styles.navLink}>3. WebP Format</a>
        <a href="#lazy" className={styles.navLink}>4. Lazy Loading</a>
        <a href="#playlist" className={styles.navLink}>5. Playlist</a>
        <a href="#start-time" className={styles.navLink}>6. Start Time</a>
        <a href="#seo" className={styles.navLink}>7. SEO & Structured Data</a>
        <a href="#aspect-ratio" className={styles.navLink}>8. Custom Aspect Ratio</a>
        <a href="#player-control" className={styles.navLink}>9. Player Control</a>
        <a href="#events" className={styles.navLinkHighlight}>10. Events 🎉 NEW</a>
        <a href="#accessibility" className={styles.navLink}>11. Accessibility</a>
      </div>
    </nav>
  )
}