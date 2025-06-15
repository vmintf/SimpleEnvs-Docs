import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  // Main documentation sidebar
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'introduce',
      label: '📄 Introduce'
    },
    {
      type: 'doc',
      id: 'installation',
      label: '📦 Installation',
    },
    {
      type: 'doc',
      id: 'quickstart',
      label: '🚀 Quick Start',
    },
    {
      type: 'doc',
      id: 'api-reference',
      label: '📖 API Reference',
    },
    {
      type: 'doc',
      id: 'security',
      label: '🔒 Security Guide',
    },
  ],
};

export default sidebars;