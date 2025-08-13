import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('../features/home'),
  },
  {
    path: 'code',
    loadComponent: () => import('../features/code'),
  },
  {
    path: 'markdown',
    loadComponent: () => import('../features/markdown'),
  },
  {
    path: 'slides',
    loadComponent: () => import('../features/slides'),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
