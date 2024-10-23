import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {BookComponent} from './book/book.component';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';

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
    path: 'books',
    component: HomeComponent,
  },
  {
    path: 'books/:bookId/:slug',
    component: BookComponent,
  },
  {
    path: '**',
    redirectTo: '/books?page=1',
  }

];
