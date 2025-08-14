import {Routes} from '@angular/router';

export default [
  {
    path: 'markdown',
    title: 'Markdown',
    loadComponent: () => import('./markdown-doc'),
  },
  {
    path: 'slides',
    title: 'Slides',
    loadComponent: () => import('./slides-doc'),
  }
] as Routes;
