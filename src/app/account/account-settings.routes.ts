import {Routes} from '@angular/router';

export const routes: Routes = [
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
    },
    {
        path: 'books',
        loadComponent: () => import('./manage-books/manage-books.component').then(mod => mod.ManageBooksComponent),
        pathMatch: 'full',
    },
    {
        path: 'edit',
        loadComponent: () => import('./add-edit-book/add-edit-book.component').then(mod => mod.AddEditBookComponent),
        pathMatch: 'full',
    },
    {
        path: 'users',
        loadComponent: () => import('./users/users.component').then(mod => mod.UsersComponent),
        pathMatch: 'full',
    }
]