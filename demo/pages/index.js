import { useEffect } from 'react'
import Prism from "prismjs"
import packageInfo from "../package.json"
import styles from '../styles/Home.module.css'

// Components
import Footer from '../components/Footer'
import Header from '../components/Header'
import Navigation from '../components/Navigation'

// Import all example components
import AccessibilityExample from '../components/examples/AccessibilityExample'
import AspectRatioExample from '../components/examples/AspectRatioExample'
import BasicExample from '../components/examples/BasicExample'
import EventsExample from '../components/examples/EventsExample'
import LazyLoadExample from '../components/examples/LazyLoadExample'
import MaxResExample from '../components/examples/MaxResExample'
import PlayerControlExample from '../components/examples/PlayerControlExample'
import PlaylistExample from '../components/examples/PlaylistExample'
import SEOExample from '../components/examples/SEOExample'
import StartTimeExample from '../components/examples/StartTimeExample'
import WebPExample from '../components/examples/WebPExample'


export default function Home() {
  useEffect(() => {
    if (typeof window !== 'undefined' && Prism) {
      try {
        Prism.highlightAll();
      } catch (error) {
        // Silently handle Prism errors
        console.debug('Prism highlighting error:', error);
      }
    }
  }, []);

  return (
    <div className={styles.container}>

      <Header />

      <main className={styles.main}>

        <Navigation/>

        <div className={styles.grid}>
          {/* Example 1: Basic */}
          <BasicExample />

          {/* Example 2: High Quality Thumbnail */}
          <MaxResExample />

          {/* Example 3: WebP Format */}
          <WebPExample />

          {/* Example 4: Lazy Loading */}
          <LazyLoadExample />

          {/* Example 5: Playlist */}
          <PlaylistExample />

          <hr className={styles.sectionDivider} />

          {/* Example 6: Start Time */}
          <StartTimeExample />

          {/* Example 7: SEO Optimized */}
          <SEOExample />

          {/* Example 8: Custom Aspect Ratio */}
          <AspectRatioExample />

          <hr className={styles.sectionDivider} />

          {/* Example 9: Player Control */}
          <PlayerControlExample />

          {/* Example 10: Interactive Events Demo (NEW in v3.0+) */}
          <EventsExample />

          {/* Example 11: Accessibility */}
          <AccessibilityExample />

        </div>
      </main>

      <Footer />

    </div>
  )
}
