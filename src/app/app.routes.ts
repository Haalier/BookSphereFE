import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AccountComponent} from './account/account.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/books?page=1',
        pathMatch: 'full',
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./auth/login/login.component').then(mod => mod.LoginComponent),
    },
    {
        path: 'signup',
        loadComponent: () =>
            import('./auth/signup/signup.component').then(mod => mod.SignupComponent),
    },
    {
        path: 'forgot-password',
        loadComponent: () =>
            import('./auth/forgot-password/forgot-password.component').then(mod => mod.ForgotPasswordComponent)
    },
    {
        path: 'reset-password/:resetToken',
        loadComponent: () =>
            import('./auth/reset-password/reset-password.component').then(mod => mod.ResetPasswordComponent),

    },
    {
        path: 'books',
        component: HomeComponent,
    },
    {
        path: 'books/:bookId/:slug',
        loadComponent: () =>
            import('./book-info/book-info.component').then(mod => mod.BookInfoComponent),
    },
    {
        path: 'cart',
        loadComponent: () =>
            import('./cart/cart.component').then(mod => mod.CartComponent),
    },
    {
        path: 'account',
        component: AccountComponent,
        loadChildren: () =>
            import('./account/account-settings.routes').then(mod => mod.routes)
    },
    {
        path: '**',
        redirectTo: '/account',
    },
];
