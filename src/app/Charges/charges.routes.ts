import { Routes } from '@angular/router';

export const CHARGES_ROUTES: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./presentation/views/home/home').then((m) => m.Home),
  },
  {
    path: 'charges/new',
    loadComponent: () =>
      import('./presentation/views/charges-order-new/charges-order-new').then(
        (m) => m.ChargesOrderNew,
      ),
  },
];
