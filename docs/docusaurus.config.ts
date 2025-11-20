import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'React Lite YouTube Embed',
  tagline: 'Private, performant YouTube embeds for React. Under 5KB gzipped.',
  favicon: 'img/favicon.ico',

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
          sidebarId: 'docsSidebar',
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
              to: '/docs/api',
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
            {
              label: 'GitHub Discussions',
              href: 'https://github.com/ibrahimcesar/react-lite-youtube-embed/discussions',
            },
            {
              label: 'Contributors',
              href: 'https://github.com/ibrahimcesar/react-lite-youtube-embed#contributors',
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
      copyright: `Copyright © ${new Date().getFullYear()} Ibrahim Cesar. Built with Docusaurus. MIT License.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
