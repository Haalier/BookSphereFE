import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AddBookComponent} from './add-book/add-book.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Home Page',
    component: HomeComponent
  },
  {
    path: 'addBook',
    title: 'Add new book',
    component: AddBookComponent,
  },

];
