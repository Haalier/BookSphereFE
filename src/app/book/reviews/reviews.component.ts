import {Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {Book} from '../../models/book.model';
import {ReviewsService} from '../../services/reviews.service';
import {Review} from '../../models/review.model';
import {DatePipe} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {FormsModule, NgForm} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute} from '@angular/router';
import {StarRatingComponent} from '../../utils/star-rating/star-rating.component';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [
    DatePipe,
    FormsModule,
    StarRatingComponent
  ],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent implements OnInit {
@Input() book!: Book;
@Output() reviewAdded = new EventEmitter<void>();
private apiService = inject(ApiService);
private reviewsService = inject(ReviewsService);
destroyRef = inject(DestroyRef);
authService = inject(AuthService);
activatedRoute = inject(ActivatedRoute);

reviews: Review[] | undefined | null = [];
isLoading = false;
isLoggedIn = false;
role: 'user' | 'admin' | undefined;
rating = 0;

 ngOnInit() {
   if(this.book){
     this.fetchReviews()
   }
   this.authService.user$.subscribe(user => {
     this.isLoggedIn = !!user;
     this.role = user?.role;
   })
 }

 fetchReviews(){
   const subscription = this.reviewsService.getBookReviews(this.book._id).subscribe({
     next: result => {
       this.reviews = result.data.reviews;

       this.destroyRef.onDestroy(() =>{
         subscription.unsubscribe();
       })
     },
     error: err => {
       console.log('Error fetching reviews', err)
     }
   })
   this.apiService.loading$.subscribe(loading => {
     this.isLoading = loading;
   })
 }

  protected readonly onsubmit = onsubmit;

  onReviewCreate(reviewForm: NgForm,) {
    const review = {
      review: reviewForm.value.review,
      rating: this.rating
    };
    this.reviewsService.createBookReview(this.book._id, review).subscribe({
      next: result => {
        this.fetchReviews()
        this.reviewAdded.emit();
      }
    });

  }
}
