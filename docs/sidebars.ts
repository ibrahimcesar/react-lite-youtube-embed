import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 * - create an ordered group of docs
 * - render a sidebar for each doc of that group
 * - provide next/previous navigation
 *
 * The sidebars can be generated from the filesystem, or explicitly defined here.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    'getting-started',
    'showcase',
    {
      type: 'category',
      label: 'Core Concepts',
      items: [
        'api-reference',
        'privacy',
        'performance',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'examples',
        'code-examples',
        'events',
      ],
    },
  ],
};

export default sidebars;
