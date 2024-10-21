import {AfterViewInit, Component, input, OnInit} from '@angular/core';
import {Book} from '../../models/book.model';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent implements OnInit {
 book = input<Book>();

 ngOnInit() {
   console.log(this.book()?._id);
 }

  isLogged = true;
}
