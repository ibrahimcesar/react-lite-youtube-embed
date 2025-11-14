import Head from 'next/head'
import { useEffect} from 'react'
import LiteYouTubeEmbed from "react-lite-youtube-embed"
import Prism from "prismjs"
import packageInfo from "../package.json"

import styles from '../styles/Home.module.css'

export default function Home() {
    useEffect(() => {
      Prism.highlightAll();
    }, []);

  // Get the component version from package.json
  const componentVersion = packageInfo.dependencies['react-lite-youtube-embed'];
  const isBetaVersion = componentVersion.includes('beta') || componentVersion.includes('alpha') || componentVersion.includes('rc');

  return (
    <div className={styles.container}>
      <Head>
        <title>React Lite YouTube Embed Demo Page</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      {isBetaVersion && (
        <div className={styles.betaBanner}>
          🧪 <strong>Beta Version:</strong> This demo is using a pre-release version ({componentVersion}) of react-lite-youtube-embed
        </div>
      )}

      <main className={styles.main}>
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

        <div className={styles.grid}>
          <div>
            <h2>The basic</h2>
          <LiteYouTubeEmbed
            id="HaEPXoXVf2k"
            title="AWS re:Invent 2018: Amazon DynamoDB Deep Dive: Advanced Design Patterns for DynamoDB (DAT401)"
            />
            <pre>
              <code className="language-jsx">
                {`
<LiteYouTubeEmbed
  id="HaEPXoXVf2k"
  title="Amazon DynamoDB Deep Dive"
/>
                  `
                  }
                </code>
              </pre>
          </div>

                    <div>
            <h2>The basic with maxresdefault</h2>
          <LiteYouTubeEmbed
            id="HaEPXoXVf2k"
              title="AWS re:Invent 2018: Amazon DynamoDB Deep Dive: Advanced Design Patterns for DynamoDB (DAT401)"
              poster="maxresdefault"
            />
            <pre>
              <code className="language-jsx">
                {`
<LiteYouTubeEmbed
  id="HaEPXoXVf2k"
  title="Amazon DynamoDB Deep Dive"
  poster="maxresdefault"
/>
                  `
                  }
                </code>
              </pre>
          </div>
          <div>
            <h2>The basic with mqdefault</h2>
          <LiteYouTubeEmbed
              id="HaEPXoXVf2k"
              title="Amazon DynamoDB Deep Dive"
              poster="mqdefault"
            />
            <pre>
              <code className="language-jsx">
                {`
<LiteYouTubeEmbed
  id="HaEPXoXVf2k"
  title="Amazon DynamoDB Deep Dive"
  poster="mqdefault"
/>
                  `
                  }
                </code>
              </pre>
          </div>
          <div>
            <h2>Using the Webp image format</h2>
          <LiteYouTubeEmbed
              id="HaEPXoXVf2k"
              title="Amazon DynamoDB Deep Dive"
              poster="hqdefault"
              webp
            />
            <pre>
              <code className="language-jsx">
                {`
<LiteYouTubeEmbed
  id="HaEPXoXVf2k"
  title="Amazon DynamoDB Deep Dive"
  poster="hqdefault"
  webp
/>
                  `
                  }
                </code>
              </pre>
          </div>
          <div>
          <h2>A playlist</h2>
          <LiteYouTubeEmbed
          id="PL0vfts4VzfNigohKr5sPrkcPFpuZmTe2C" // Default none, id of the video or playlist
          playlist={true} // Use  true when your ID be from a playlist
          playlistCoverId="Qhaz36TZG5Y"
          poster="hqdefault"
          title="Example of an embed playlist"
            />
                        <pre>
              <code className="language-jsx">
                {`
<LiteYouTubeEmbed
  id="PL0vfts4VzfNigohKr5sPrkcPFpuZmTe2C"
  title="This is a playlist from Firebase YouTube channel"
  playlist={true}
  playlistCoverId="Qhaz36TZG5Y" // Choose an id from any video to be the cover
  poster="hqdefault"
/>
                  `
                  }
                </code>
              </pre>
          </div>
          <hr/>
        <div>
            <h2>Passing params like time and any other to the iFrame url</h2>
          <LiteYouTubeEmbed
            id="rdpReYuxI5M"
            title="YouTube Embed"
            poster="maxresdefault"
            params="start=1160"
          />
            <pre>
              <code className="language-jsx">
                {`
<LiteYouTubeEmbed
  id="L2vS_050c-M"
  title="Nexo de código aberto"
  params="start=1160"
  poster="maxresdefault"
/>
                  `
                  }
                </code>
              </pre>
          </div>
        </div>
        {/* <LiteYouTubeEmbed
            id="jB20NKw3c6I"
            title="YouTube Embed"
          poster="maxresdefault"
          validatePoster
        /> */}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/ibrahimcesar/react-lite-youtube-embed"
          target="_blank"
          rel="noopener noreferrer"
        >
          Demo for  <span role="img" aria-label="TV" style={{marginLeft: "5px", marginRight: "5px"}}>‏‏‎ ‎‏‏‎  📺 ‏‏‎ ‎‏‏‎ </span> React Lite YouTube Embed
        </a>
      </footer>
    </div>
  )
}
