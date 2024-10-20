import {Component, inject, OnInit} from '@angular/core';
import {Book} from '../models/book.model';
import {CurrencyPipe} from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {AppLoaderComponent} from '../utils/app-loader/app-loader.component';
import {BookService} from '../services/book.service';


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
bookService = inject(BookService);
activatedRoute = inject(ActivatedRoute);
router = inject(Router);
isLoading = false;


books: Book[] = [];
results!: number;
page: number = 1;
limit: number = this.bookService.limit;
hasNextPage!: boolean;
hasPreviousPage!: boolean;
nextPage!: number;
previousPage!: number;
lastPage!: number;


ngOnInit() {
  this.activatedRoute.queryParams.subscribe((params) => {
    const pageParam = params['page'];
    if(!pageParam){
      this.onFirstPage();
    }
    this.page = +pageParam;
  });
  this.fetchBooks()
  this.bookService.loading$.subscribe(loading => {
    this.isLoading = loading;
  })
  this.bookService.bookResults$.subscribe(results => {
    this.results = results;
    this.paginate();
  })
  this.bookService.bookList$.subscribe(books => {
    this.books = books;
  })


}

scrollToTop() {
  window.scrollTo({
    top: 0,

  });
}

fetchBooks() {
    this.bookService.getBooks(this.page);
}

paginate(){
  this.hasNextPage = this.limit * this.page < this.results;
  this.hasPreviousPage = this.page > 1;
  this.nextPage = this.page + 1;
  this.previousPage = this.page - 1;
  this.lastPage= Math.ceil(this.results / this.limit);
}


navigateTo(page: number){
  this.router.navigate(['/books'], {
    relativeTo: this.activatedRoute,
    queryParams: {page: page},
    queryParamsHandling: 'merge'});
  this.paginate()
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
