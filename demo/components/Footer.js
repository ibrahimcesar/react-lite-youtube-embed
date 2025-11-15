import styles from '../styles/Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.resources}>
        <div className={styles.linksContainer}>
          <a
            href="https://www.npmjs.com/package/react-lite-youtube-embed"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            📦 npm Package
          </a>
          <a
            href="https://github.com/ibrahimcesar/react-lite-youtube-embed"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            📖 Documentation
          </a>
          <a
            href="https://github.com/ibrahimcesar/react-lite-youtube-embed/issues"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            🐛 Report Issues
          </a>
          <a
            href="https://github.com/ibrahimcesar/react-lite-youtube-embed/releases"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            📝 Changelog
          </a>
        </div>
      </div>

      <div className={styles.madeWidth}>
        Made with 🧩 in Brazil 🇧🇷
      </div>
    </footer>
  )
} 