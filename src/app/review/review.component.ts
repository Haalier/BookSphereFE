import {Component, input, output} from '@angular/core';
import {DatePipe} from '@angular/common';
import {MyReview, Review} from '../models/review.model';

@Component({
    selector: 'app-review',
    standalone: true,
    imports: [
        DatePipe
    ],
    templateUrl: './review.component.html',
    styleUrl: './review.component.scss'
})
export class ReviewComponent {
    myReview = input<boolean>();
    isLoggedIn = input<boolean>();
    userId = input<string>();
    review = input<Review | MyReview>();
    openModal = output<Review | MyReview>();
    deleteModal = output<Review | MyReview>();

    get isMyReview(): boolean {
        return this.review().user._id === this.userId()
    }

    onReviewEdit() {
        this.openModal.emit(this.review());
    }

    onReviewDelete() {
        this.deleteModal.emit(this.review());
    }
}
