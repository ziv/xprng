import {Routes} from '@angular/router';

export default [
  {
    path: 'markdown',
    title: 'Markdown',
    loadComponent: () => import('./markdown-doc') as Promise<any>,
  },
  {
    path: 'code',
    title: 'Code',
    loadComponent: () => import('./code-doc') as Promise<any>,
  },
  {
    path: 'slides',
    title: 'Slides',
    loadComponent: () => import('./slides-doc'),
  },
  {
    path: 'example',
    title: 'Pico Example',
    loadComponent: () => import('./example-doc'),
  },
  {
    path: 'scenario',
    title: 'Scenario',
    loadComponent: () => import('./scenario'),
  }
] as Routes;
