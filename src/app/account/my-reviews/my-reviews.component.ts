import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {ReviewsService} from '../../services/reviews.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MyReview, Review} from '../../models/review.model';
import {AuthService} from '../../services/auth.service';
import {ReviewComponent} from '../../review/review.component';
import {EditReviewComponent} from '../../popups/edit-review/edit-review.component';
import {DeleteReviewComponent} from '../../popups/delete-review/delete-review.component';

@Component({
    selector: 'app-my-reviews',
    standalone: true,
    imports: [
        ReviewComponent,
        EditReviewComponent,
        DeleteReviewComponent,
    ],
    templateUrl: './my-reviews.component.html',
    styleUrl: './my-reviews.component.scss'
})
export class MyReviewsComponent implements OnInit {
    authService = inject(AuthService);
    reviewsService = inject(ReviewsService);
    destroyRef = inject(DestroyRef);
    isLoggedIn = false;
    userId: string | null = null;
    reviews?: MyReview[];
    showEditModal: boolean = false;
    showDeleteModal: boolean = false;
    reviewForModal: Review | MyReview;

    ngOnInit() {
        this.fetchMyReviews();

        this.authService.user$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(user => {
            this.isLoggedIn = !!user;
            this.userId = user?._id;
        })
    }

    fetchMyReviews() {
        this.reviewsService.getUserReviews().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(reviewsData => {
            this.reviews = reviewsData.reviews;
        })
    }

    onReviewEdit(review: Review | MyReview) {
        this.reviewForModal = review;
        this.showEditModal = true;
        document.body.style.overflow = 'hidden';
    }

    onReviewDelete(review: Review | MyReview) {
        this.reviewForModal = review;
        this.showDeleteModal = true;
        document.body.style.overflow = 'hidden';
    }

    onEditModalClose() {
        this.showEditModal = false;
    }

    onDeleteModalClose() {
        this.showDeleteModal = false;
    }

    onDeleteReview() {
        this.fetchMyReviews();
        document.body.style.overflow = 'auto';
    }

    onReviewsUpdate() {
        this.fetchMyReviews();
        document.body.style.overflow = 'auto';
    }
}
