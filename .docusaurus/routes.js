import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/blog',
    component: ComponentCreator('/blog', 'da3'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', '182'),
    exact: true
  },
  {
    path: '/blog/intro',
    component: ComponentCreator('/blog/intro', '7dc'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '3d7'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', 'e7d'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '51a'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '193'),
            routes: [
              {
                path: '/docs/Ai/intro',
                component: ComponentCreator('/docs/Ai/intro', '39a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/Architecture/intro',
                component: ComponentCreator('/docs/Architecture/intro', 'd20'),
                exact: true,
                sidebar: "architectureSidebar"
              },
              {
                path: '/docs/Backend/intro',
                component: ComponentCreator('/docs/Backend/intro', 'e62'),
                exact: true,
                sidebar: "backendSidebar"
              },
              {
                path: '/docs/Design/intro',
                component: ComponentCreator('/docs/Design/intro', '4d6'),
                exact: true,
                sidebar: "designSidebar"
              },
              {
                path: '/docs/Frontend/intro',
                component: ComponentCreator('/docs/Frontend/intro', '5ae'),
                exact: true,
                sidebar: "frontendSidebar"
              },
              {
                path: '/docs/intro',
                component: ComponentCreator('/docs/intro', '853'),
                exact: true
              },
              {
                path: '/docs/Metrics/intro',
                component: ComponentCreator('/docs/Metrics/intro', '1ff'),
                exact: true,
                sidebar: "metricsSidebar"
              },
              {
                path: '/docs/Metrics/rezio-tech-metrics',
                component: ComponentCreator('/docs/Metrics/rezio-tech-metrics', 'cb4'),
                exact: true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '2e1'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
