import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {BookComponent} from './book/book.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/books?page=1',
    pathMatch: 'full',
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
