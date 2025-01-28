import {Routes} from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'account',
        pathMatch: 'full',
    },
    {
        path: 'orders',
        loadComponent: () =>
            import('./orders/orders.component').then(mod => mod.OrdersComponent),
        pathMatch: 'full',
    },
    {
        path: 'settings',
        loadComponent: () =>
            import('./settings/settings.component').then(mod => mod.SettingsComponent),
        pathMatch: 'full',
    },
    {
        path: 'reviews',
        loadComponent: () =>
            import('./my-reviews/my-reviews.component').then(mod => mod.MyReviewsComponent),
        pathMatch: 'full',
    }
]