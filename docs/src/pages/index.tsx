import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import CodeBlock from '@theme/CodeBlock';
import LiteYouTubeEmbed from '@ibrahimcesar/react-lite-youtube-embed';
import '@ibrahimcesar/react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>

        {/* Live Demo - Video First! */}
        <div className={styles.videoDemo}>
          <div className={styles.videoDemoContent}>
            <h2 className={styles.videoDemoTitle}>See it in Action</h2>
            <p className={styles.videoDemoDescription}>
              This embedded video below uses <strong>React Lite YouTube Embed</strong>.
              Notice how fast it loads compared to a standard YouTube iframe.
            </p>
            <div className={styles.videoWrapper}>
              <LiteYouTubeEmbed
                id="dQw4w9WgXcQ"
                title="Rick Astley - Never Gonna Give You Up (Official Video)"
                poster="hqdefault"
              />
            </div>
            <div className={styles.videoStats}>
              <div className={styles.statItem}>
                <strong>&lt; 5KB</strong>
                <span>Total Size</span>
              </div>
              <div className={styles.statItem}>
                <strong>~500KB</strong>
                <span>Saved vs iframe</span>
              </div>
              <div className={styles.statItem}>
                <strong>0 Cookies</strong>
                <span>Until user clicks</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/getting-started">
            Get Started →
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/examples">
            View Examples
          </Link>
        </div>
      </div>
    </header>
  );
}

function WhySection() {
  return (
    <section className={styles.whySection}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Why React Lite YouTube Embed?
        </Heading>
        <div className={styles.features}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>⚡</div>
            <h3>Blazing Fast</h3>
            <p>
              YouTube's standard iframe adds <strong>over 500KB</strong> and makes
              dozens of network requests before the user even clicks play. This
              component loads only a lightweight thumbnail (~10-30KB) until interaction.
            </p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🔒</div>
            <h3>Privacy First</h3>
            <p>
              Uses <code>youtube-nocookie.com</code> by default, blocking all YouTube
              cookies and tracking until the user explicitly clicks play. GDPR friendly.
            </p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>📦</div>
            <h3>Tiny Bundle</h3>
            <p>
              Under <strong>5KB gzipped</strong> for both JS and CSS combined.
              Tree-shakeable, zero dependencies, and works with all modern bundlers.
            </p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>♿</div>
            <h3>Accessible</h3>
            <p>
              Full keyboard navigation, screen reader support, ARIA attributes,
              and semantic HTML. WCAG 2.1 compliant.
            </p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🎬</div>
            <h3>Full Featured</h3>
            <p>
              Player events, programmatic control, playlists, custom thumbnails,
              SEO structured data, and more. Everything you need.
            </p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>📘</div>
            <h3>TypeScript Ready</h3>
            <p>
              Written in TypeScript with complete type definitions. IntelliSense
              support and type safety out of the box.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickStartSection() {
  return (
    <section className={styles.quickStartSection}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Quick Start
        </Heading>
        <div className={styles.codeExample}>
          <h3>1. Install</h3>
          <CodeBlock language="bash">
            npm install react-lite-youtube-embed
          </CodeBlock>

          <h3>2. Import and Use</h3>
          <CodeBlock language="tsx">
{`import LiteYouTubeEmbed from '@ibrahimcesar/react-lite-youtube-embed';
import '@ibrahimcesar/react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

export default function App() {
  return (
    <LiteYouTubeEmbed
      id="dQw4w9WgXcQ"
      title="Video Title"
    />
  );
}`}
          </CodeBlock>

          <p className={styles.quickStartFooter}>
            That's it! You now have a performant, private YouTube embed. 🎉
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description="Private, performant YouTube embeds for React. Under 5KB gzipped.">
      <HomepageHeader />
      <main>
        <WhySection />
        <QuickStartSection />
      </main>
    </Layout>
  );
}
