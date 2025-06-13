import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  // Main documentation sidebar
  tutorialSidebar: [
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

    // 향후 확장 가능한 섹션들
    // {
    //   type: 'category',
    //   label: '🏗️ Advanced Usage',
    //   collapsed: false,
    //   items: [
    //     'performance',
    //     'best-practices',
    //     'troubleshooting',
    //   ],
    // },

    // {
    //   type: 'category',
    //   label: '🔧 Framework Integration',
    //   collapsed: true,
    //   items: [
    //     'examples/fastapi',
    //     'examples/django',
    //     'examples/flask',
    //   ],
    // },

    // {
    //   type: 'category',
    //   label: '🚀 v2.0.0 Beta',
    //   collapsed: true,
    //   items: [
    //     'beta/whats-new',
    //     'beta/migration-guide',
    //     'beta/testing',
    //   ],
    // },
  ],
};

export default sidebars;