const fs = require('fs');
const path = require('path');

// Helper function to generate sidebar items based on files in a directory
const generateSidebarItems = (dir) => {
  return fs.readdirSync(dir)
    .filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
    .map(file => `${path.basename(dir)}/${file.replace(/\.mdx?$/, '')}`);
};

module.exports = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'AI',
      items: generateSidebarItems('docs/Ai'),
    },
  ],

  frontendSidebar: [
    {
      type: 'category',
      label: 'Frontend',
      items: generateSidebarItems('docs/Frontend'),
    },
  ],

  backendSidebar: [
    {
      type: 'category',
      label: 'Backend',
      items: generateSidebarItems('docs/Backend'),
    },
  ],

  designSidebar: [
    {
      type: 'category',
      label: 'Design',
      items: generateSidebarItems('docs/Design'),
    },
  ],

  metricsSidebar: [
    {
      type: 'category',
      label: 'Metrics',
      items: generateSidebarItems('docs/Metrics'),
    },
  ],

  architectureSidebar: [
    {
      type: 'category',
      label: 'Architecture',
      items: generateSidebarItems('docs/Architecture'),
    },
  ],
};
