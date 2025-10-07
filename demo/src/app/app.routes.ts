import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'code',
    loadComponent: () => import('./components/code-demo'),
  },
  {
    path: 'markdown',
    loadComponent: () => import('./components/markdown-demo'),
  },
  {
    path: 'slides',
    loadComponent: () => import('./components/slides-demo'),
  },
  {
    path: 'query',
    loadComponent: () => import('./components/query-demo'),
  },
  {
    path: 'more',
    loadComponent: () => import('./components/more'),
  }
];
