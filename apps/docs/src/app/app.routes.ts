import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home')
  },
  {
    path: 'docs',
    loadComponent: () => import('./documentation'),
    loadChildren: () => import('../docs/routes'),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
