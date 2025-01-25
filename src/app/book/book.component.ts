import {
    AfterViewChecked,
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    inject, OnInit, output,
    ViewChild,
} from '@angular/core';
import {BooksService} from '../services/books.service';
import {Book} from '../models/book.model';
import {ActivatedRoute} from '@angular/router';
import {AsyncPipe, CurrencyPipe} from '@angular/common';
import {ReviewsComponent} from './reviews/reviews.component';
import {AuthService} from '../services/auth.service';
import {CartService} from '../services/cart.service';
import {StarRatingComponent} from '../utils/star-rating/star-rating.component';
import {EditReviewComponent} from '../popups/edit-review/edit-review.component';
import {Review} from '../models/review.model';
import {DeleteReviewComponent} from '../popups/delete-review/delete-review.component';
import {EventService} from '../services/event.service';

@Component({
    selector: 'app-book',
    standalone: true,
    imports: [CurrencyPipe, ReviewsComponent, StarRatingComponent, EditReviewComponent, AsyncPipe, DeleteReviewComponent],
    templateUrl: './book.component.html',
    styleUrl: './book.component.scss',
})
export class BookComponent implements AfterViewInit, AfterViewChecked, OnInit {
    @ViewChild('descriptionDiv', {static: false}) descriptionDiv!: ElementRef;
    @ViewChild('reviewsComponent') reviewsComponent!: ReviewsComponent;

    booksService = inject(BooksService);
    authService = inject(AuthService);
    cartService = inject(CartService);
    eventService = inject(EventService);
    update = output<void>()
    route = inject(ActivatedRoute);
    book: Book | undefined;
    isOverflowing = false;
    expanded = false;
    isLoggedIn = false;
    role: 'user' | 'admin' | undefined;
    reviewForModal: Review | undefined;
    public bookId!: string;
    private slug!: string;
    private cdr = inject(ChangeDetectorRef);

    showEditModal: boolean = false;
    showDeleteModal: boolean = false;

    ngOnInit() {
        this.eventService.refreshRating$.subscribe(() => {
            this.onReviewAdded();
        })
    }

    ngAfterViewInit() {
        this.route.params.subscribe((params) => {
            this.bookId = params['bookId'];
            this.slug = params['slug'];
            this.fetchBook(this.bookId, this.slug);
        });

        this.authService.user$.subscribe((user) => {
            this.isLoggedIn = !!user;
            this.role = user?.role;
        });


    }

    ngAfterViewChecked(): void {
        if (this.descriptionDiv) {
            this.checkOverflow();
        }
        this.cdr.detectChanges();
    }

    checkOverflow(): void {
        const element = this.descriptionDiv.nativeElement;

        if (!this.expanded) {
            this.isOverflowing = element.scrollHeight > element.clientHeight;
        } else {
            this.isOverflowing = true;
        }
    }

    toggleExpand(): void {
        this.expanded = !this.expanded;

        const element = this.descriptionDiv.nativeElement;

        if (this.expanded) {
            element.style.maxHeight = `${element.scrollHeight}px`;
        } else {
            element.style.maxHeight = '5em';
        }

        setTimeout(() => this.checkOverflow(), 15);
    }

    fetchBook(bookId: string, slug: string) {
        this.booksService.getBook(bookId, slug).subscribe({
            next: (res) => {
                this.book = res.data.book;
            },
        });
    }

    onReviewAdded() {
        this.fetchBook(this.bookId, this.slug);
    }

    onAddToCart() {
        const data = {
            bookId: this.bookId,
            quantity: 1,
        };

        this.cartService.addToCart(data).subscribe();
    }

    onEditModalClose() {
        this.showEditModal = false;
        document.body.style.overflow = 'auto';
    }

    onEditModalOpen(review: Review | undefined) {
        this.showEditModal = true;
        document.body.style.overflow = 'hidden';
        this.reviewForModal = review;
    }

    onDeleteModalOpen(review: Review | undefined) {
        this.showDeleteModal = true;
        document.body.style.overflow = 'hidden';
        this.reviewForModal = review;
    }

    onReviewsUpdate() {
        this.reviewsComponent.fetchReviews();
    }

    onDeleteReview() {
        this.reviewsComponent.fetchReviews();
    }

    onDeleteModalClose() {
        this.showDeleteModal = false;
        document.body.style.overflow = 'auto';
    }
}
