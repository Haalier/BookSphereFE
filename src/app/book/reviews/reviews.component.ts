import {Component, DestroyRef, inject, Input, input, OnInit} from '@angular/core';
import {Book} from '../../models/book.model';
import {ReviewsService} from '../../services/reviews.service';
import {Review} from '../../models/review.model';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent implements OnInit {
@Input() book!: Book;
private reviewsSerivce = inject(ReviewsService);
destroyRef = inject(DestroyRef);

reviews?: Review[] = [];
isLoading = false;

 ngOnInit() {
   if(this.book){
     this.fetchReviews()
   }
 }

 fetchReviews(){
   const subscription = this.reviewsSerivce.getBookReviews(this.book._id).subscribe({
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
   this.reviewsSerivce.loading$.subscribe(loading => {
     this.isLoading = loading;
   })
 }

  isLogged = true;
}
