import {Routes} from '@angular/router';

export default [
  {
    path: 'markdown',
    title: 'Markdown',
    loadComponent: () => import('./markdown-doc') as Promise<any>,
    data: {
      component: {
        id: 'markdown',
        name: 'Markdown Documentation',
        description: 'Documentation for the Markdown component.',
        overview: "/docs.overview.md",
        props: [
          {
            id: 'src',
            name: 'src',
            type: 'string',
            description: 'Path to a markdown file to load. Do not use with `code`.',
            value: '/example.md',
          },
          {
            id: 'content',
            name: 'content',
            type: 'text',
            description: 'Markdown code to render. Do not use with `src`',
            value: '',
          },
        ],
      }
    }
  },
  {
    path: 'slides',
    title: 'Slides',
    loadComponent: () => import('./slides-doc'),
    data: {
      component: {
        id: 'slides',
        name: 'Slides Documentation',
        description: 'Documentation for the Markdown component',
        overview: "/docs.overview.md",
        props: [
          {
            id: 'cyclic',
            name: 'cyclic',
            type: 'boolean',
            description: 'Enable cyclic navigation through slides',
            value: false,
          },
          {
            id: 'interval',
            name: 'interval',
            type: 'number',
            description: 'Interval in milliseconds for automatic slide transitions',
            value: 5000,
          }
        ]
      }
    }
  },
  {
    path: 'button',
    title: 'Button',
    loadComponent: () => import('./buttons-doc'),
    data: {
      component: {
        id: 'button',
        name: 'Button Documentation',
        description: 'Documentation for the simple button',
        overview: "/docs.overview.md",
        props: [
          {
            id: 'disabled',
            name: 'disabled',
            type: 'boolean',
            description: 'Disable the button',
            value: false,
          },
          {
            id: 'content',
            name: 'text',
            type: 'string',
            description: 'Button text',
            value: 'click me',
          }
        ],
      }
    }
  },
] as Routes;
