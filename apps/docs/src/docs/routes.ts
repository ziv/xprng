import {Routes} from '@angular/router';

export default [
  {
    path: 'markdown',
    title: 'Markdown',
    loadComponent: () => import('./markdown-doc') as Promise<any>,
    data: {
      component: {
        id: 'markdown',
        name: 'Markdown XpdDocumentation',
        description: 'XpdDocumentation for the Markdown component.',
        overview: "/docs.overview.md",
        props: [
          {
            id: 'src',
            name: 'src',
            type: 'string',
            description: 'Path to a markdown file to load. Do not use with `code`.',
            value: 'https://raw.githubusercontent.com/ziv/xprng/refs/heads/main/README.md',
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
    path: 'code',
    title: 'Code',
    loadComponent: () => import('./code-doc') as Promise<any>,
    data: {
      component: {
        id: 'code',
        name: 'Code Highlighter',
        overview: "/docs.overview.md",
        props: [
          {
            id: 'src',
            name: 'src',
            type: 'string',
            description: 'Path to a source file to load.',
            value: '/example.js',
          },
          {
            id: 'content',
            name: 'content',
            type: 'text',
            description: 'Source code to render.',
            value: 'console.log("Hello world!");',
          },
          {
            id: 'lang',
            name: 'lang',
            type: 'string',
            description: 'Language of the source code for syntax highlighting.',
            value: 'javascript',
          }
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
        name: 'Slides XpdDocumentation',
        description: 'XpdDocumentation for the Markdown component',
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
    path: 'example',
    title: 'Pico Example',
    loadComponent: () => import('./exampl-doc'),
    data: {
      component: {
        id: 'button',
        name: 'Pico Documentation',
        props: [
          {
            id: 'open',
            name: 'open',
            type: 'boolean',
            description: 'Open the accordion',
            value: true,
          },
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
          },
          {
            id: 'type',
            name: 'type',
            type: 'list',
            description: 'Button type',
            value: 'primary',
            options: [
              {label: 'Primary', value: 'primary'},
              {label: 'Secondary', value: 'secondary'},
              {label: 'Contrast', value: 'contrast'},
            ]
          }
        ],
      }
    }
  },
] as Routes;
