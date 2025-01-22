import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {Book} from '../models/book.model';
import {CurrencyPipe, NgIf, NgStyle} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {BooksService} from '../services/books.service';
import {ApiService} from '../services/api.service';
import {FormsModule, NgForm} from '@angular/forms';
import {StarRatingComponent} from '../utils/star-rating/star-rating.component';
import {SearchService} from '../services/search.service';
import {CartService} from '../services/cart.service';
import {AuthService} from '../services/auth.service';
import {SliderModule} from 'primeng/slider';
import {AddToCartPopupComponent} from '../popups/add-to-cart-popup/add-to-cart-popup.component';
import {MultiSelect, MultiSelectModule, MultiSelectSelectAllChangeEvent} from 'primeng/multiselect';
import {BOOK_CATEGORIES} from '../utils/book-categories';
import {RATING_OPTIONS} from '../utils/rating-options';
import {EventService} from '../services/event.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CurrencyPipe, FormsModule, StarRatingComponent, SliderModule, AddToCartPopupComponent, MultiSelectModule, NgStyle, NgIf],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
    @ViewChild('ms') ms: MultiSelect

    eventService = inject(EventService);
    apiService = inject(ApiService);
    booksService = inject(BooksService);
    searchService = inject(SearchService);
    cartService = inject(CartService);
    activatedRoute = inject(ActivatedRoute);
    router = inject(Router);
    authService = inject(AuthService);
    categories: string[] = []
    isLoggedIn = false;
    isLoading = false;
    isMenuOpen = false;
    books: Book[] = [];
    results!: number;
    page: number = 1;
    limit: number = this.booksService.limit;
    hasNextPage!: boolean;
    hasPreviousPage!: boolean;
    nextPage!: number;
    previousPage!: number;
    lastPage!: number;
    rangeValues: number[] = [0, 40];
    book: Book | undefined = undefined;
    showModal = false;
    items: any[];
    selectAll: boolean = false;
    selectedItems!: any[];
    query = {};
    options: any[];
    rating: number | string = '';

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe((params) => {
            const pageParam = params['page'];
            if (!pageParam) {
                this.onFirstPage();
            }
            this.page = +pageParam;
            this.fetchBooks(this.query);
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

        this.eventService.clearFilters$.subscribe(() => {
            this.rangeValues = [0, 40];
            this.selectedItems = [];
            this.selectAll = false;
            this.rating = '';
            this.query = {};
        })

        this.categories = BOOK_CATEGORIES;
        this.items = BOOK_CATEGORIES.map((category, index) => ({
            label: category,
            value: index,
        }));

        this.options = RATING_OPTIONS;
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
        });
    }

    fetchBooks(query: any) {
        this.booksService.getBooks(this.page, query);
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
            queryParams: {page: page},
            queryParamsHandling: 'merge',
        });
        this.paginate();
    }

    onFirstPage() {
        this.page = 1;
        this.navigateTo(this.page);
        this.fetchBooks(this.query);
        this.scrollToTop();
    }

    onPreviousPage() {
        if (this.hasPreviousPage) {
            this.page = this.previousPage;
            this.navigateTo(this.page);
            this.fetchBooks(this.query);
            this.scrollToTop();
        }
    }

    onNextPage() {
        if (this.hasNextPage) {
            this.page = this.nextPage;
            this.navigateTo(this.page);
            console.log(this.query);
            this.fetchBooks(this.query);
            this.scrollToTop();
        }
    }

    onLastPage() {
        this.page = this.lastPage;
        this.navigateTo(this.page);
        this.fetchBooks(this.query);
        this.scrollToTop();
    }

    onBook(id: string | undefined, slug: string | undefined) {
        this.router.navigate(['/books', id, slug], {
            relativeTo: this.activatedRoute,
        });
        this.scrollToTop();
    }

    applyFilters() {
        let categoryQuery;
        if (this.selectedItems) {
            categoryQuery = this.selectedItems.map(item => {
                return item.label
            })
        }

        console.log(this.rating);


        if (categoryQuery && categoryQuery.length > 0) {
            categoryQuery = categoryQuery.toString()
        }

        if (this.query && this.page !== 1) {
            this.onFirstPage();
        }

        if (this.rangeValues || this.selectedItems || this.rating) {
            this.query = {
                'price[gte]': this.rangeValues[0],
                'price[lte]': this.rangeValues[1],
                'category': this.selectedItems ? categoryQuery : '',
                'ratingsAverage[gte]': this.rating ? this.rating : 1,
            };
        }
        this.fetchBooks(this.query);
    }

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
                this.fetchBooks(this.query);
            }
            this.books = books.data;
            this.paginate();
        });
        searchForm.reset();
    }

    onAddToCart(bookId: string | undefined, slug: string | undefined, event: Event) {
        event.stopPropagation();
        const data = {
            bookId: bookId,
            quantity: 1,
        };

        this.cartService.addToCart(data).subscribe(() => {
            document.body.style.overflow = 'hidden';
            this.showModal = true;
        });

        this.booksService.getBook(bookId, slug).subscribe((book) => {
            this.book = book.data.book

        })
    }

    onModalClose() {
        this.showModal = false;
        document.body.style.overflow = 'auto';
    }

    onSelectAllChange(event: MultiSelectSelectAllChangeEvent) {
        this.selectedItems = event.checked ? [...this.ms.visibleOptions()] : [];
        this.selectAll = event.checked
    }
}
