import {Component, inject, input, output} from '@angular/core';
import {ReviewsService} from '../../services/reviews.service';
import {EventService} from '../../services/event.service';

@Component({
  selector: 'app-delete-review',
  standalone: true,
    imports: [],
  templateUrl: './delete-review.component.html',
  styleUrl: './delete-review.component.scss'
})
export class DeleteReviewComponent {
    reviewsService = inject(ReviewsService);
    eventService = inject(EventService);
close = output<void>()
    delete = output<void>();
reviewId = input<string>();

   closeModal() {
        this.close.emit();
    }

    deleteReview() {
   this.reviewsService.deleteReview(this.reviewId()).subscribe(() =>{
       this.close.emit();
       this.delete.emit()
       this.eventService.emitRefreshRating();
   })
    }
}
