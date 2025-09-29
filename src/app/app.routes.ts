import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', loadComponent: () => import('./home/home').then(m => m.Home) },
  { path: 'register', loadComponent: () => import('./register/register').then(m => m.Register) },
  { path: 'login', loadComponent: () => import('./login/login').then(m => m.Login) },
  { path: 'about', loadComponent: () => import('./about/about').then(m => m.About) },

  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard),
    children: [
      {
        path: 'main',
        loadComponent: () => import('./dashboard/main/main').then(m => m.Main)
      }
    ]
  },

  { path: '**', redirectTo: 'home' }
];

