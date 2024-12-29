import { Component, inject, OnInit } from '@angular/core';
import { Book } from '../models/book.model';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AppLoaderComponent } from '../utils/app-loader/app-loader.component';
import { BooksService } from '../services/books.service';
import { ApiService } from '../services/api.service';
import { FormsModule, NgForm } from '@angular/forms';
import { StarRatingComponent } from '../utils/star-rating/star-rating.component';
import { SearchService } from '../services/search.service';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CurrencyPipe, FormsModule, StarRatingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  apiService = inject(ApiService);
  booksService = inject(BooksService);
  searchService = inject(SearchService);
  cartService = inject(CartService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  authService = inject(AuthService);

  isLoggedIn = false;
  isLoading = false;
  isMenuOpen = false;
  books: Book[] = [];
  categories: string[] = [];
  results!: number;
  page: number = 1;
  limit: number = this.booksService.limit;
  hasNextPage!: boolean;
  hasPreviousPage!: boolean;
  nextPage!: number;
  previousPage!: number;
  lastPage!: number;

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      const pageParam = params['page'];
      if (!pageParam) {
        this.onFirstPage();
      }
      this.page = +pageParam;
      this.fetchBooks();
    });

    this.authService.user$.subscribe((user) => {
      this.isLoggedIn = !!user;

      if (this.isLoggedIn) {
        this.cartService.getCartCount().subscribe();
      }
    });

    this.apiService.loading$.subscribe((loading) => {
      this.isLoading = loading;
    });
    this.booksService.bookResults$.subscribe((results) => {
      this.results = results;
      this.paginate();
    });
    this.booksService.bookList$.subscribe((books) => {
      this.books = books;
    });
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
    });
  }

  fetchBooks() {
    this.booksService.getBooks(this.page);
  }

  paginate() {
    this.hasNextPage = this.limit * this.page < this.results;
    this.hasPreviousPage = this.page > 1;
    this.nextPage = this.page + 1;
    this.previousPage = this.page - 1;
    this.lastPage = Math.ceil(this.results / this.limit);
  }

  navigateTo(page: number) {
    this.router.navigate(['/books'], {
      relativeTo: this.activatedRoute,
      queryParams: { page: page },
      queryParamsHandling: 'merge',
    });
    this.paginate();
  }

  onFirstPage() {
    this.page = 1;
    this.navigateTo(this.page);
    this.fetchBooks();
    this.scrollToTop();
  }
  onPreviousPage() {
    if (this.hasPreviousPage) {
      this.page = this.previousPage;
      this.navigateTo(this.page);
      this.fetchBooks();
      this.scrollToTop();
    }
  }
  onNextPage() {
    if (this.hasNextPage) {
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

  onBook(id: string | undefined, slug: string | undefined) {
    this.router.navigate(['/books', id, slug], {
      relativeTo: this.activatedRoute,
    });
    this.scrollToTop();
  }

  applyFilters() {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeOnBackgroundClick($event: MouseEvent) {
    this.isMenuOpen = false;
  }

  onSearch(searchForm: NgForm) {
    const query = searchForm.value.searchQuery;
    console.log(query);
    this.searchService.searchFor(query).subscribe((books) => {
      this.results = books.results;

      if (this.results === 0) {
        this.fetchBooks();
      }
      this.books = books.data;
      this.paginate();
    });
    searchForm.reset();
  }

  onAddToCart(bookId: string | undefined, event: Event) {
    event.stopPropagation();
    const data = {
      bookId: bookId,
      quantity: 1,
    };

    this.cartService.addToCart(data).subscribe();
  }
}
