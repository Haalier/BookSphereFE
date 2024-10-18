import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import { ApiService } from '../services/api.service';
import {Book} from '../models/book.model';
import {CurrencyPipe} from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {AppLoaderComponent} from '../utils/app-loader/app-loader.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CurrencyPipe,
    RouterLink,
    AppLoaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
apiService = inject(ApiService);
destroyRef = inject(DestroyRef);
activatedRoute = inject(ActivatedRoute);
router = inject(Router);
isLoading = false;


books: Book[] = [];
results: number = 0;
page: number = 1;
limit: number = 20;
hasNextPage: boolean | undefined;
hasPreviousPage: boolean | undefined;
nextPage: number = 0;
previousPage: number = 0;
lastPage: number = 0;


ngOnInit() {
  this.activatedRoute.queryParams.subscribe((params) => {
    const pageParam = params['page'];
    if(!pageParam){
      this.onFirstPage();
    }
    console.log(pageParam);
    this.page = +pageParam;
  });
  this.apiService.loading$.subscribe(loading => {
    this.isLoading = loading;
  })
  this.fetchBooks()

}

scrollToTop() {
  window.scrollTo({
    top: 0,

  });
}

fetchBooks() {
const subscription = this.apiService.getBooks(this.page, this.limit).subscribe({
  next: result => {
    this.results = result.results;
    this.books = result.data.books;
    this.hasNextPage = this.limit * this.page < this.results;
    this.hasPreviousPage = this.page > 1;
    this.nextPage = this.page + 1;
    this.previousPage = this.page - 1;
    this.lastPage= Math.ceil(this.results / this.limit);
  }
})

  this.destroyRef.onDestroy(() => {
    subscription.unsubscribe();

  })
}

navigateTo(page: number){
  this.router.navigate(['/books'], {
    relativeTo: this.activatedRoute,
    queryParams: {page: page},
    queryParamsHandling: 'merge'});
}

  onFirstPage() {
    this.page = 1;
    this.navigateTo(this.page);
    this.fetchBooks();
    this.scrollToTop();
  }
  onPreviousPage() {
    if(this.hasPreviousPage) {
      this.page = this.previousPage;
      this.navigateTo(this.page);
      this.fetchBooks();
      this.scrollToTop()
    }
  }
  onNextPage() {
    if(this.hasNextPage){
      this.page = this.nextPage;
      this.navigateTo(this.page);
      this.fetchBooks();
      this.scrollToTop();
    }
  }

  onLastPage() {
    this.page = this.lastPage;
    this.navigateTo(this.page);
    this.fetchBooks();
    this.scrollToTop();
  }
}
