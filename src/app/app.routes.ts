import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {BookComponent} from './book/book.component';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {CartComponent} from './cart/cart.component';
import {ForgotPasswordComponent} from './auth/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './auth/reset-password/reset-password.component';
import {AccountComponent} from './account/account.component';
import {OrdersComponent} from './account/orders/orders.component';
import {SettingsComponent} from './account/settings/settings.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/books?page=1',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'signup',
        component: SignupComponent,
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
    },
    {
        path: 'reset-password/:resetToken',
        component: ResetPasswordComponent,
    },
    {
        path: 'books',
        component: HomeComponent,
    },
    {
        path: 'books/:bookId/:slug',
        component: BookComponent,
    },
    {
        path: 'cart',
        component: CartComponent,
    },
    {
        path: 'account',
        component: AccountComponent,
        children: [
            {
                path: 'orders',
                component: OrdersComponent,
                pathMatch: 'full',
            },
            {
                path: 'settings',
                component: SettingsComponent,
                pathMatch: 'full',
            }
        ],
    },
    {
        path: '**',
        redirectTo: '/books?page=1',
    },
];
