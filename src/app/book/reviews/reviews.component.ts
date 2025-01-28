import {Component, DestroyRef, EventEmitter, inject, Input, OnInit, output, Output, ViewChild} from '@angular/core';
import {Book} from '../../models/book.model';
import {ReviewsService} from '../../services/reviews.service';
import {Review} from '../../models/review.model';
import {AuthService} from '../../services/auth.service';
import {FormsModule, NgForm} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {StarRatingComponent} from '../../utils/star-rating/star-rating.component';
import {ReviewComponent} from '../../review/review.component';
import {ErrorService} from '../../services/error.service';
import {distinctUntilChanged, filter, startWith, Subscription} from 'rxjs';

@Component({
    selector: 'app-reviews',
    standalone: true,
    imports: [
        FormsModule,
        StarRatingComponent,
        ReviewComponent,
    ],
    templateUrl: './reviews.component.html',
    styleUrl: './reviews.component.scss'
})
export class ReviewsComponent implements OnInit {
    @Input() book!: Book;
    @Output() reviewAdded = new EventEmitter<void>();
    @ViewChild('reviewForm') reviewForm: NgForm;
    openEditModal = output<Review>();
    openDeleteModal = output<Review>();
    private errorService = inject(ErrorService);
    private apiService = inject(ApiService);
    private reviewsService = inject(ReviewsService);
    destroyRef = inject(DestroyRef);
    authService = inject(AuthService);
    reviews: Review[] | undefined | null = [];
    isLoading = false;
    isLoggedIn = false;
    role: 'user' | 'admin' | undefined;
    userId: string | null = null;
    rating = 0;
    errorMsg: string | null = null;

    ngOnInit() {
        if (this.book) {
            this.fetchReviews()
        }
        const subscriptions: Subscription[] = [this.authService.user$.subscribe(user => {
            this.isLoggedIn = !!user;
            this.role = user?.role;
            this.userId = user?._id;
        }),

            this.errorService.error$.subscribe(error => {
                this.errorMsg = error?.error.message;
            })]
        this.destroyRef.onDestroy(() => {
            subscriptions.forEach(subscription => subscription.unsubscribe());
            this.errorService.clearError();
        })

        // TODO
        this.reviewForm.statusChanges.pipe(startWith(this.reviewForm.status),
            filter(() => this.reviewForm.touched),
            distinctUntilChanged()).subscribe(() => {
                this.errorService.clearError()
        })

    }

    fetchReviews() {
        const subscription = this.reviewsService.getBookReviews(this.book._id).subscribe({
            next: result => {
                this.reviews = result.reviews.reverse();
            },
            error: err => {
                console.log('Error fetching reviews', err)
            }
        })
        this.destroyRef.onDestroy(() => {
            subscription.unsubscribe();
        })
        this.apiService.loading$.subscribe(loading => {
            this.isLoading = loading;
        })
    }

    onReviewCreate(reviewForm: NgForm,) {
        const review = {
            review: reviewForm.value.review,
            rating: this.rating
        };
        this.reviewsService.createBookReview(this.book._id, review).subscribe({
            next: () => {
                this.fetchReviews()
                this.reviewAdded.emit();
            }
        });
        this.rating = 0;
        reviewForm.reset();
    }

    onReviewEdit(review: Review) {
        this.openEditModal.emit(review);
    }

    onReviewDelete(review: Review) {
        this.openDeleteModal.emit(review);
    }
}
