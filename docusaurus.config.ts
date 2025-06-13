import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type {Options, ThemeConfig} from '@docusaurus/preset-classic';

const config: Config = {
  title: 'SimpleEnvs Python',
  tagline: 'Ultra-secure, high-performance .env file loader for Python',
  favicon: 'img/favicon.ico',

  url: 'https://simpleenvs.skystarry.xyz',
  baseUrl: '/',

  organizationName: 'vmintf',
  projectName: 'SimpleEnvs-Docs',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

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
          editUrl: 'https://github.com/vmintf/SimpleEnvs-Docs/tree/main/',

          // 버전 관리 설정
          includeCurrentVersion: true,
          versions: {
            current: {
              label: '1.1.4 (Stable)',
              path: '/',
              banner: 'none',
            },
            '2.0.0-beta.1': {
              label: '2.0.0-beta.1 (Beta)',
              path: '/beta/',
              banner: 'unreleased',
            },
          },

          // 베타 버전도 포함
          onlyIncludeVersions: ['current', '2.0.0-beta.1'],

          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },

        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/vmintf/SimpleEnvs-Docs/tree/main/',
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'All Updates',
        },

        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Options,
    ],
  ],

  themeConfig: {
    // 베타 알림 배너
    announcementBar: {
      id: 'v2_beta_announcement',
      content:
          '🚧 <strong>v2.0.0-beta.1</strong> is now available for testing! <a target="_blank" href="https://github.com/vmintf/SimpleEnvs-Python/releases/tag/v2.0.0-beta.1">Try beta version</a>',
      backgroundColor: '#ffeaa7',
      textColor: '#2d3436',
      isCloseable: true,
    },

    navbar: {
      title: 'SimpleEnvs',
      logo: {
        alt: 'SimpleEnvs Logo',
        src: 'img/simpleenvs-logo.svg',
        srcDark: 'img/simpleenvs-logo-dark.svg',
        width: 32,
        height: 32,
      },
      items: [
        {
          type: 'doc',
          docId: 'installation',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/blog',
          label: 'Blog',
          position: 'left'
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownActiveClassDisabled: true,
        },
        {
          href: 'https://github.com/vmintf/SimpleEnvs-Python',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://pypi.org/project/simpleenvs-python/',
          label: 'PyPI',
          position: 'right',
        },
        {
          type: 'search',
          position: 'right',
        },
      ],
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Installation',
              to: '/docs/installation',
            },
            {
              label: 'Quick Start',
              to: '/docs/quickstart',
            },
            {
              label: 'API Reference',
              to: '/docs/api-reference',
            },
            {
              label: 'Security Guide',
              to: '/docs/security',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub Discussions',
              href: 'https://github.com/vmintf/SimpleEnvs-Python/discussions',
            },
            {
              label: 'Issues',
              href: 'https://github.com/vmintf/SimpleEnvs-Python/issues',
            },
            {
              label: 'PyPI',
              href: 'https://pypi.org/project/simpleenvs-python/',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'Changelog',
              href: 'https://github.com/vmintf/SimpleEnvs-Python/blob/main/CHANGELOG.md',
            },
            {
              label: 'Benchmark',
              href: 'https://github.com/vmintf/SimpleEnvs-Python/tree/main/benchmark.py',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} SimpleEnvs Contributors. Built with Docusaurus.`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['python', 'bash', 'json', 'yaml', 'toml'],
    },

    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },

  } satisfies ThemeConfig,
};

export default config;