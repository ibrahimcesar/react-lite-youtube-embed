import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'React Lite YouTube Embed',
  tagline: 'Private, performant YouTube embeds for React. Under 5KB gzipped.',
  favicon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📺</text></svg>',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://ibrahimcesar.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/react-lite-youtube-embed/',

  // GitHub pages deployment config.
  organizationName: 'ibrahimcesar',
  projectName: 'react-lite-youtube-embed',

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
          editUrl:
            'https://github.com/ibrahimcesar/react-lite-youtube-embed/tree/main/docs/',
        },
        blog: false, // Disable blog
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-W8FQXVE6F8',
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'React Lite YouTube Embed',
      logo: {
        alt: 'React Lite YouTube Embed Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/examples',
          label: 'Examples',
          position: 'left',
        },
        {
          href: 'https://www.npmjs.com/package/react-lite-youtube-embed',
          label: 'npm',
          position: 'right',
        },
        {
          href: 'https://github.com/ibrahimcesar/react-lite-youtube-embed',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started',
            },
            {
              label: 'API Reference',
              to: '/docs/api-reference',
            },
            {
              label: 'Examples',
              to: '/examples',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub Issues',
              href: 'https://github.com/ibrahimcesar/react-lite-youtube-embed/issues',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'npm Package',
              href: 'https://www.npmjs.com/package/react-lite-youtube-embed',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/ibrahimcesar/react-lite-youtube-embed',
            },
            {
              label: 'Changelog',
              href: 'https://github.com/ibrahimcesar/react-lite-youtube-embed/releases',
            },
          ],
        },
      ],
      copyright: `Copyright © 2021-${new Date().getFullYear()} <a href="https://ibrahimcesar.com" target="_blank" rel="noopener noreferrer">Ibrahim Cesar</a>. Built with <a href="https://docusaurus.io/" target="_blank" rel="noopener noreferrer">Docusaurus</a>. <a href="https://github.com/ibrahimcesar/react-lite-youtube-embed/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">MIT License</a>.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
