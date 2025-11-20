import Head from 'next/head'
import packageInfo from '../package.json'
import styles from '../styles/Home.module.css'

export default function Header() {
  // Get the component version from package.json
  const componentVersion = packageInfo.dependencies['react-lite-youtube-embed'];
  const isBetaVersion = componentVersion?.includes('beta') || componentVersion?.includes('alpha') || componentVersion?.includes('rc');

  return (
    <>
      <Head>
        <title>React Lite YouTube Embed Demo Page</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      {isBetaVersion && (
        <div className={styles.betaBanner}>
          🧪 <strong>Beta Version:</strong> This demo is using a pre-release version ({componentVersion}) of react-lite-youtube-embed
        </div>
      )}

      <h1 className={styles.title}>
        📺 React Lite YouTube Embed
      </h1>

      <p className={styles.description}>
        A private by default, faster and cleaner YouTube embed component for React applications
      </p>

      <div className={styles.versionBadge}>
        <a
          href={`https://www.npmjs.com/package/react-lite-youtube-embed/v/${componentVersion}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          v{componentVersion}
        </a>
        {' | '}
        <a
          href="https://github.com/ibrahimcesar/react-lite-youtube-embed"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        {' | '}
        <a
          href="https://www.npmjs.com/package/react-lite-youtube-embed"
          target="_blank"
          rel="noopener noreferrer"
        >
          npm
        </a>
      </div>
    </>
  )
} 