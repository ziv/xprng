import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('@xprng/docs').then(m => m.XpdHome)
  },
  {
    path: 'docs',
    loadComponent: () => import('@xprng/docs').then(m => m.XpdDocumentation),
    loadChildren: () => import('../docs/routes'),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
