import {Routes} from '@angular/router';
import {DocDescriptor} from '../app/shared/descriptor';

export default [
  {
    path: 'markdown',
    title: 'Markdown',
    loadComponent: () => import('./markdown-doc'),
    data: {
      component: {
        id: 'markdown',
        name: 'Markdown Documentation',
        description: 'Documentation for the Markdown component.',
        overview: "/docs.overview.md",
        props: [
          {
            id: 'content',
            name: 'content',
            type: 'text',
            description: 'Markdown content to render. Do not use with `src`.',
            value: '',
          },
          {
            id: 'src',
            name: 'src',
            type: 'string',
            description: 'Path to a markdown file to load. Do not use with `content`.',
            value: '/example.md',
          }
        ],
      } as DocDescriptor
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
        description: 'Documentation for the Markdown component.',
        overview: "/docs.overview.md",
        props: [
          {
            id: 'cyclic',
            name: 'cyclic',
            type: 'boolean',
            description: 'Enable cyclic navigation through slides.',
            value: false,
          }
        ]
      } as DocDescriptor
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
        description: 'Documentation for the simple button.',
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
      } as DocDescriptor
    } as any
  }
] as Routes;
