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

  onBrokenLinks: 'warn', // 깨진 링크를 경고로 처리
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
              path: '/stable',
              banner: 'none',
            },
            '2.0.0-beta.2': {
              label: '2.0.0-beta.2 (Beta)',
              path: '/beta',
              banner: 'unreleased',
            },
          },

          // 베타 버전도 포함
          onlyIncludeVersions: ['current', '2.0.0-beta.2'],

          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },

        blog: false, // 블로그 비활성화

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
          '🚧 <strong>v2.0.0-beta.2</strong> is now available for testing! <a target="_blank" href="https://github.com/vmintf/SimpleEnvs-Python/releases/tag/v2.0.0-beta.2">Try beta version</a>',
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
          docId: 'introduce', // index 대신 introduce로 변경
          position: 'left',
          label: 'Docs',
        },
        // 블로그 항목 제거
        // {
        //   to: '/blog',
        //   label: 'Blog',
        //   position: 'left'
        // },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownActiveClassDisabled: true,
        },
        {
          position: 'right',
          label: 'Official Discord',
          href: 'https://discord.gg/QV6ux4mQ8h'
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
              to: '/docs/stable/installation',
            },
            {
              label: 'Quick Start',
              to: '/docs/stable/quickstart',
            },
            {
              label: 'API Reference',
              to: '/docs/stable/api-reference',
            },
            {
              label: 'Security Guide',
              to: '/docs/stable/security',
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
            // 블로그 항목 제거
            // {
            //   label: 'Blog',
            //   to: '/blog',
            // },
            {
              label: 'Changelog',
              href: 'https://github.com/vmintf/SimpleEnvs-Python/releases',
            },
            {
              label: 'Benchmark',
              href: 'https://github.com/vmintf/SimpleEnvs-Python/actions/workflows/benchmark.yml',
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