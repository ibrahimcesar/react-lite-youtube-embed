import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import LiteYouTubeEmbed from './index';

describe('LiteYouTubeEmbed', () => {
  const defaultProps = { id: 'dQw4w9WgXcQ', title: 'Rick Astley - Never Gonna Give You Up' };

  test('renders with default props', () => {
    const { container } = render(<LiteYouTubeEmbed {...defaultProps} />);

    // Check if the component renders with the correct title as data attribute
    const article = container.querySelector('article');
    expect(article).toHaveAttribute('data-title', defaultProps.title);

    // Check if the play button is rendered
    const playButton = screen.getByRole('button');
    expect(playButton).toBeInTheDocument();
    expect(playButton).toHaveAttribute('aria-label', `Watch ${defaultProps.title}`);

    // Check if iframe is not rendered initially
    const iframe = screen.queryByTitle(defaultProps.title);
    expect(iframe).not.toBeInTheDocument();
  });

  test('loads iframe when clicked', () => {
    const { container } = render(<LiteYouTubeEmbed {...defaultProps} />);

    // Click the play button
    const playButton = screen.getByRole('button');
    fireEvent.click(playButton);

    // Check if iframe is rendered after click
    const iframe = container.querySelector('iframe');
    expect(iframe).not.toBeNull();
    expect(iframe).toHaveAttribute('src', expect.stringContaining(defaultProps.id));
    expect(iframe).toHaveAttribute('src', expect.stringContaining('autoplay=1'));
  });

  test('preconnects when hovered', () => {
    const { container } = render(<LiteYouTubeEmbed {...defaultProps} />);

    // Hover over the container
    const article = container.querySelector('article');
    expect(article).not.toBeNull();
    if (article) {
      fireEvent.pointerOver(article);

      // Check if preconnect links are added
      const preconnectLinks = document.querySelectorAll('link[rel="preconnect"]');
      expect(preconnectLinks.length).toBeGreaterThan(0);

      // Check if YouTube domain is preconnected
      const ytPreconnect = document.querySelector('link[rel="preconnect"][href="https://www.youtube-nocookie.com"]');
      expect(ytPreconnect).toBeInTheDocument();
    }
  });

  test('renders with custom poster resolution', () => {
    const customProps = { ...defaultProps, poster: 'maxresdefault' as const };

    const { container } = render(<LiteYouTubeEmbed {...customProps} />);

    // Check if the background image URL contains the custom resolution
    const article = container.querySelector('article');
    expect(article).toHaveStyle({ backgroundImage: expect.stringContaining('maxresdefault.jpg') });
  });

  test('renders with webp format', () => {
    const webpProps = { ...defaultProps, webp: true };

    const { container } = render(<LiteYouTubeEmbed {...webpProps} />);

    // Check if the background image URL uses webp format
    const article = container.querySelector('article');
    expect(article).toHaveStyle({ backgroundImage: expect.stringContaining('.webp') });
  });

  test('renders with custom thumbnail', () => {
    const customThumbnailProps = { ...defaultProps, thumbnail: 'https://example.com/custom-thumbnail.jpg' };

    const { container } = render(<LiteYouTubeEmbed {...customThumbnailProps} />);

    // Check if the background image URL is the custom thumbnail
    const article = container.querySelector('article');
    expect(article).toHaveStyle({ backgroundImage: 'url(https://example.com/custom-thumbnail.jpg)' });
  });

  test('renders with custom classes', () => {
    const customClassProps = {
      ...defaultProps,
      wrapperClass: 'custom-wrapper',
      playerClass: 'custom-player',
      iframeClass: 'custom-iframe',
      activatedClass: 'custom-activated',
    };

    const { container } = render(<LiteYouTubeEmbed {...customClassProps} />);

    // Check if custom wrapper class is applied
    const wrapper = container.querySelector('.custom-wrapper');
    expect(wrapper).not.toBeNull();

    // Check if custom player class is applied
    const player = container.querySelector('.custom-player');
    expect(player).not.toBeNull();

    if (player) {
      // Click to load iframe
      fireEvent.click(player);

      // Check if custom iframe class is applied
      const iframe = container.querySelector('.custom-iframe');
      expect(iframe).not.toBeNull();

      // Check if activated class is applied after click
      expect(wrapper).toHaveClass('custom-activated');
    }
  });

  test('renders with custom aspect ratio', () => {
    const aspectRatioProps = { ...defaultProps, aspectHeight: 4, aspectWidth: 3 };

    const { container } = render(<LiteYouTubeEmbed {...aspectRatioProps} />);

    // Check if custom aspect ratio is applied
    const article = container.querySelector('article');
    expect(article).toHaveStyle({ '--aspect-ratio': '133.33333333333331%' });
  });

  test('renders with adNetwork enabled', () => {
    const { container } = render(<LiteYouTubeEmbed {...defaultProps} adNetwork />);

    // Trigger preconnect
    const article = container.querySelector('article');
    expect(article).not.toBeNull();
    if (article) {
      fireEvent.pointerOver(article);

      // Check if ad network domains are preconnected
      const doubleClickPreconnect = document.querySelector(
        'link[rel="preconnect"][href="https://static.doubleclick.net"]'
      );
      expect(doubleClickPreconnect).toBeInTheDocument();

      const googleAdsPreconnect = document.querySelector(
        'link[rel="preconnect"][href="https://googleads.g.doubleclick.net"]'
      );
      expect(googleAdsPreconnect).toBeInTheDocument();
    }
  });

  test('renders with playlist mode', () => {
    const playlistProps = { ...defaultProps, playlist: true, playlistCoverId: 'dQw4w9WgXcQ' };

    render(<LiteYouTubeEmbed {...playlistProps} />);

    // Click to load iframe
    const playButton = screen.getByRole('button');
    fireEvent.click(playButton);

    // Check if iframe src contains videoseries
    const iframe = screen.getByTitle(playlistProps.title);
    expect(iframe).toHaveAttribute('src', expect.stringContaining('videoseries'));
    expect(iframe).toHaveAttribute('src', expect.stringContaining('list=dQw4w9WgXcQ'));
  });

  test('renders with always load iframe', () => {
    render(<LiteYouTubeEmbed {...defaultProps} alwaysLoadIframe />);

    // Check if iframe is rendered initially without clicking
    const iframe = screen.getByTitle(defaultProps.title);
    expect(iframe).toBeInTheDocument();

    // Check that autoplay is not set when alwaysLoadIframe is true
    expect(iframe).toHaveAttribute('src', expect.not.stringContaining('autoplay=1'));
  });

  test('calls onIframeAdded callback when iframe is added', () => {
    const onIframeAdded = vi.fn();
    render(<LiteYouTubeEmbed {...defaultProps} onIframeAdded={onIframeAdded} />);

    // Click to load iframe
    const playButton = screen.getByRole('button');
    fireEvent.click(playButton);

    // Check if callback was called
    expect(onIframeAdded).toHaveBeenCalledTimes(1);
  });

  test('renders with custom container element', () => {
    const { container } = render(<LiteYouTubeEmbed {...defaultProps} containerElement="section" />);

    // Check if section element is used instead of default article
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  test('renders with custom style', () => {
    const customStyle = { border: '2px solid red', borderRadius: '10px' };

    const { container } = render(<LiteYouTubeEmbed {...defaultProps} style={customStyle} />);

    // Check if custom styles are applied
    const article = container.querySelector('article');
    expect(article).toHaveStyle({ border: '2px solid red', borderRadius: '10px' });
  });

  test('renders with muted parameter', () => {
    render(<LiteYouTubeEmbed {...defaultProps} muted />);

    // Click to load iframe
    const playButton = screen.getByRole('button');
    fireEvent.click(playButton);

    // Check if iframe src contains mute=1
    const iframe = screen.getByTitle(defaultProps.title);
    expect(iframe).toHaveAttribute('src', expect.stringContaining('mute=1'));
  });

  test('renders with enableJsApi parameter', () => {
    render(<LiteYouTubeEmbed {...defaultProps} enableJsApi />);

    // Click to load iframe
    const playButton = screen.getByRole('button');
    fireEvent.click(playButton);

    // Check if iframe src contains enablejsapi=1
    const iframe = screen.getByTitle(defaultProps.title);
    expect(iframe).toHaveAttribute('src', expect.stringContaining('enablejsapi=1'));
  });

  test('renders with cookie parameter', () => {
    render(<LiteYouTubeEmbed {...defaultProps} cookie />);

    // Click to load iframe
    const playButton = screen.getByRole('button');
    fireEvent.click(playButton);

    // Check if iframe src uses youtube.com instead of youtube-nocookie.com
    const iframe = screen.getByTitle(defaultProps.title);
    expect(iframe).toHaveAttribute('src', expect.stringContaining('https://www.youtube.com/embed/'));
  });

  test('renders with noCookie parameter', () => {
    render(<LiteYouTubeEmbed {...defaultProps} noCookie />);

    // Click to load iframe
    const playButton = screen.getByRole('button');
    fireEvent.click(playButton);

    // Check if iframe src uses youtube-nocookie.com
    const iframe = screen.getByTitle(defaultProps.title);
    expect(iframe).toHaveAttribute('src', expect.stringContaining('https://www.youtube-nocookie.com/embed/'));
  });

  test('renders with custom announce text', () => {
    render(<LiteYouTubeEmbed {...defaultProps} announce="Play" />);

    // Check if play button has custom announce text
    const playButton = screen.getByRole('button');
    expect(playButton).toHaveAttribute('aria-label', `Play ${defaultProps.title}`);
  });

  test('forwards ref to iframe element', () => {
    const ref = React.createRef<HTMLIFrameElement>();
    render(<LiteYouTubeEmbed {...defaultProps} ref={ref} />);
    // Initially ref should be null as iframe is not rendered
    expect(ref.current).toBeNull();

    // Click to load iframe
    const playButton = screen.getByRole('button');
    fireEvent.click(playButton);

    // Now ref should point to iframe
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('IFRAME');
  });

  test('renders iframe with params from props.params', () => {
    const props = { ...defaultProps, params: '&other=value&another=value' };
    const { container } = render(<LiteYouTubeEmbed {...props} />);

    // Click the play button to load the iframe
    const playButton = screen.getByRole('button');
    fireEvent.click(playButton);

    // Check if iframe is rendered
    const iframe = container.querySelector('iframe');
    expect(iframe).not.toBeNull();

    // Check if iframe src contains the params from props.params
    const iframeSrc = iframe?.getAttribute('src');
    expect(iframeSrc).toContain('other=value');
    expect(iframeSrc).toContain('another=value');
  });
});
