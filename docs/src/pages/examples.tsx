import React from 'react';
import Layout from '@theme/Layout';
import LiteYouTubeEmbed from '@ibrahimcesar/react-lite-youtube-embed';
import '@ibrahimcesar/react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

export default function Examples(): JSX.Element {
  return (
    <Layout
      title="Live Examples"
      description="Interactive demonstrations of React Lite YouTube Embed with various configurations"
    >
      <main style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>
            Live Examples 📺
          </h1>
          <p style={{ textAlign: 'center', fontSize: '1.2rem', marginBottom: '3rem', color: 'var(--ifm-color-emphasis-700)' }}>
            Interactive demonstrations of React Lite YouTube Embed with various configurations
          </p>

          <section style={{ marginBottom: '4rem' }}>
            <h2>Basic Embed</h2>
            <p>Simple usage with privacy-enhanced mode and default settings.</p>
            <div style={{ marginBottom: '1rem' }}>
              <LiteYouTubeEmbed
                id="Y2b7FyaynC0"
                title="The Echo Friendly: Same Mistakes (OFFICIAL VIDEO)"
              />
            </div>
          </section>

          <section style={{ marginBottom: '4rem' }}>
            <h2>High Quality Thumbnail</h2>
            <p>Maximum resolution thumbnail for hero sections and featured content.</p>
            <div style={{ marginBottom: '1rem' }}>
              <LiteYouTubeEmbed
                id="1RKqOmSkGgM"
                title="Chappell Roan - Good Luck, Babe! (Official Lyric Video)"
                poster="maxresdefault"
              />
            </div>
          </section>

          <section style={{ marginBottom: '4rem' }}>
            <h2>Custom Aspect Ratio (4:3)</h2>
            <p>Classic TV format for older video content.</p>
            <div style={{ marginBottom: '1rem' }}>
              <LiteYouTubeEmbed
                id="Fk-4lXLM34g"
                title="Kate Bush - Wuthering Heights - Official Music Video - Version 2"
                aspectWidth={4}
                aspectHeight={3}
              />
            </div>
          </section>

          <section style={{ marginBottom: '4rem' }}>
            <h2>Playlist Mode</h2>
            <p>Embed entire YouTube playlists with custom cover image.</p>
            <div style={{ marginBottom: '1rem' }}>
              <LiteYouTubeEmbed
                id="PLvFsG9gYFxY9zTBhcFmMcYa3zYfQz7P7F"
                title="Science SONGS"
                playlist={true}
                playlistCoverId="3HRkKznJoZA"
                poster="hqdefault"
              />
            </div>
          </section>

          <section style={{ marginBottom: '4rem' }}>
            <h2>Lazy Loading</h2>
            <p>Thumbnail loads only when scrolled into viewport for better performance.</p>
            <div style={{ marginBottom: '1rem' }}>
              <LiteYouTubeEmbed
                id="RB-RcX5DS5A"
                title="Coldplay - The Scientist (Official 4K Video)"
                lazyLoad={true}
              />
            </div>
          </section>

          <section style={{ marginBottom: '4rem' }}>
            <h2>WebP Format</h2>
            <p>Using WebP format for better compression and smaller file sizes.</p>
            <div style={{ marginBottom: '1rem' }}>
              <LiteYouTubeEmbed
                id="8AHCfZTRGiI"
                title="Johnny Cash - Hurt"
                poster="hqdefault"
                webp={true}
              />
            </div>
          </section>

          <section style={{ marginBottom: '4rem' }}>
            <h2>SEO Enhanced</h2>
            <p>Includes JSON-LD structured data for search engines and rich results.</p>
            <div style={{ marginBottom: '1rem' }}>
              <LiteYouTubeEmbed
                id="CJ54eImz88w"
                title="Talking Heads - Psycho Killer (Official Video)"
                seo={{
                  name: "Talking Heads - Psycho Killer",
                  description: "Official video of Talking Heads performing Psycho Killer from the album Talking Heads: 77",
                  uploadDate: "2018-12-05T08:00:00Z",
                  duration: "PT4M36S"
                }}
              />
            </div>
          </section>

          <section style={{ marginBottom: '4rem' }}>
            <h2>Start Time Parameter</h2>
            <p>Start video at a specific time using the params prop.</p>
            <div style={{ marginBottom: '1rem' }}>
              <LiteYouTubeEmbed
                id="VdQY7BusJNU"
                title="Cyndi Lauper - Time After Time (Official HD Video)"
                poster="maxresdefault"
                params="start=114"
              />
            </div>
          </section>

          <section style={{ marginBottom: '4rem' }}>
            <h2>Player Control</h2>
            <p>Programmatic player control using the iframe's postMessage API.</p>
            <div style={{ marginBottom: '1rem' }}>
              <LiteYouTubeEmbed
                id="K4dx42YzQCE"
                title="The White Stripes - The Hardest Button To Button (Official Music Video)"
              />
            </div>
          </section>

          <section style={{ marginBottom: '4rem' }}>
            <h2>Enhanced Accessibility</h2>
            <p>Internationalization support and improved keyboard navigation.</p>
            <div style={{ marginBottom: '1rem' }}>
              <LiteYouTubeEmbed
                id="aXJ_Ub1xbhw"
                title="Pitty - Admirável Chip Novo (Clipe Oficial)"
              />
            </div>
          </section>

          <section style={{ marginBottom: '4rem' }}>
            <h2>Event Handling</h2>
            <p>Comprehensive event handling for player state changes.</p>
            <div style={{ marginBottom: '1rem' }}>
              <LiteYouTubeEmbed
                id="eBG7P-K-r1Y"
                title="Foo Fighters - Everlong (Official HD Video)"
              />
            </div>
          </section>

          <section style={{ marginBottom: '4rem' }}>
            <h2>Grid Layout</h2>
            <p>Multiple videos in a responsive grid with lazy loading.</p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
              marginTop: '1rem'
            }}>
              <div>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Classic Rock</h3>
                <LiteYouTubeEmbed
                  id="8AHCfZTRGiI"
                  title="Johnny Cash - Hurt"
                  poster="mqdefault"
                  lazyLoad={true}
                />
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>New Wave</h3>
                <LiteYouTubeEmbed
                  id="CJ54eImz88w"
                  title="Talking Heads - Psycho Killer"
                  poster="mqdefault"
                  lazyLoad={true}
                />
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Pop</h3>
                <LiteYouTubeEmbed
                  id="VdQY7BusJNU"
                  title="Cyndi Lauper - Time After Time"
                  poster="mqdefault"
                  lazyLoad={true}
                />
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Alternative</h3>
                <LiteYouTubeEmbed
                  id="RB-RcX5DS5A"
                  title="Coldplay - The Scientist"
                  poster="mqdefault"
                  lazyLoad={true}
                />
              </div>
            </div>
          </section>

          <div style={{
            background: 'var(--ifm-color-emphasis-100)',
            padding: '2rem',
            borderRadius: '0.5rem',
            marginTop: '3rem',
            textAlign: 'center'
          }}>
            <h3>Why So Fast?</h3>
            <p style={{ marginBottom: '1rem' }}>
              Each video above loaded only a thumbnail (~10-50KB) instead of a full YouTube iframe (~500KB+).
              Click any video to see the real player load instantly!
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="/react-lite-youtube-embed/docs/examples"
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'var(--ifm-color-primary)',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '0.5rem',
                  fontWeight: 'bold',
                }}
              >
                More Examples & Code
              </a>
              <a
                href="/react-lite-youtube-embed/docs/api-reference"
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'transparent',
                  color: 'var(--ifm-color-primary)',
                  border: '2px solid var(--ifm-color-primary)',
                  textDecoration: 'none',
                  borderRadius: '0.5rem',
                  fontWeight: 'bold',
                }}
              >
                API Reference
              </a>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
