import React from 'react';
import Layout from '@theme/Layout';
import LiteYouTubeEmbed from '@ibrahimcesar/react-lite-youtube-embed';
import '@ibrahimcesar/react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

export default function NotFound(): JSX.Element {
  return (
    <Layout title="404: Page Not Found">
      <main style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 60px)',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: 'clamp(3rem, 10vw, 6rem)',
          fontWeight: 'bold',
          margin: '0 0 1rem',
          background: 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          404
        </h1>

        <p style={{
          fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
          marginBottom: '2rem',
          maxWidth: '600px'
        }}>
          Oops! This page doesn't exist. But here's something that never disappoints...
        </p>

        <div style={{
          maxWidth: '640px',
          width: '100%',
          marginBottom: '2rem'
        }}>
          <LiteYouTubeEmbed
            id="dQw4w9WgXcQ"
            title="Rick Astley - Never Gonna Give You Up (Official Video)"
            poster="hqdefault"
          />
        </div>

        <p style={{
          fontSize: '1rem',
          color: 'var(--ifm-color-emphasis-600)',
          marginBottom: '1rem'
        }}>
          You've been Rick Rolled! 🎵
        </p>

        <p style={{
          fontSize: '0.875rem',
          color: 'var(--ifm-color-emphasis-600)',
          marginBottom: '2rem'
        }}>
          (And yes, this video was embedded using <strong>react-lite-youtube-embed</strong>)
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a
            href="/react-lite-youtube-embed/"
            style={{
              padding: '0.75rem 1.5rem',
              background: 'var(--ifm-color-primary)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '0.5rem',
              fontWeight: 'bold',
              transition: 'transform 0.2s',
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Go Home
          </a>
          <a
            href="/react-lite-youtube-embed/docs/examples"
            style={{
              padding: '0.75rem 1.5rem',
              background: 'transparent',
              color: 'var(--ifm-color-primary)',
              border: '2px solid var(--ifm-color-primary)',
              textDecoration: 'none',
              borderRadius: '0.5rem',
              fontWeight: 'bold',
              transition: 'transform 0.2s',
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            See Live Examples
          </a>
        </div>
      </main>
    </Layout>
  );
}
