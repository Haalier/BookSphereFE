import {Component, inject, input, OnInit, output} from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import {StarRatingComponent} from '../../utils/star-rating/star-rating.component';
import {MyReview, Review} from '../../models/review.model';
import {ReviewsService} from '../../services/reviews.service';
import {EventService} from '../../services/event.service';

@Component({
    selector: 'app-edit-review',
    standalone: true,
    imports: [
        FormsModule,
        StarRatingComponent,
        ReactiveFormsModule
    ],
    templateUrl: './edit-review.component.html',
    styleUrl: './edit-review.component.scss'
})
export class EditReviewComponent implements OnInit {
    reviewsService = inject(ReviewsService);
    eventService = inject(EventService)
    review = input<Review | MyReview>();
    bookId = input<string>()
    close = output<void>()
    update = output<void>()
    rating!: number;

    ngOnInit(): void {
        this.editReviewForm.patchValue({
            reviewText: this.review()?.review
        })
        if (this.review()) {
            this.rating = this.review()!.rating;
        }

    }

    editReviewForm: FormGroup = new FormGroup({
        reviewText: new FormControl('', [Validators.required, Validators.maxLength(350), Validators.minLength(1)])
    });

    closeModal() {
        this.close.emit();
    }

    onReviewEdit() {
        const bookId = this.bookId();
        const reviewId = this.review()?._id
        const review = {
            review: this.editReviewForm.controls['reviewText'].value,
            rating: this.rating,
        }
        this.reviewsService.editReview(bookId, reviewId, review).subscribe(() => {
            this.close.emit();
            this.update.emit();
            this.eventService.emitRefreshRating();
        })
    }
}
