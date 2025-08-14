import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./features/home')
  },
  {
    path: 'docs',
    loadComponent: () => import('./features/docs'),
    loadChildren: () => import('../docs/routes'),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
