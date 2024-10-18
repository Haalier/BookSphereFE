import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';

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
    path: '**',
    redirectTo: '/books?page=1',
  }

];
