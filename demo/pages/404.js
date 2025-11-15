import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Custom404() {
  return (
    <div className={styles.container}>
      <Head>
        <title>404 - Page Not Found | React Lite YouTube Embed</title>
        <meta name="description" content="The page you are looking for could not be found. Return to the React Lite YouTube Embed demo page." />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>404 - Page Not Found</h1>
        <p className={styles.description}>
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          style={{
            marginTop: '2rem',
            padding: '0.75rem 1.5rem',
            minHeight: '48px',
            minWidth: '120px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0070f3',
            color: 'white',
            borderRadius: '5px',
            textDecoration: 'none',
            fontWeight: '600',
            transition: 'all 0.2s ease'
          }}
        >
          Go back home
        </Link>
      </main>

      <footer className={styles.footer}>
        <Link href="/">
          Demo for <span role="img" aria-label="TV" style={{marginLeft: "5px", marginRight: "5px"}}>📺</span> React Lite YouTube Embed
        </Link>
      </footer>
    </div>
  )
}
