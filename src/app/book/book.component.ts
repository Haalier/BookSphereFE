import {AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {BooksService} from '../services/books.service';
import {Book} from '../models/book.model';
import {ActivatedRoute} from '@angular/router';
import {CurrencyPipe, NgClass} from '@angular/common';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ReviewsComponent} from './reviews/reviews.component';


@Component({
  selector: 'app-book',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgClass,
    ReviewsComponent,
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
  animations: [
    trigger('panelState', [
      state('closed', style({ height: '50px' })),
      state('open', style({ height: '*' })),
      transition('closed <=> open', animate('300ms ease-in-out')),
    ]),
  ],
})
export class BookComponent implements OnInit {
booksService = inject(BooksService);
route = inject(ActivatedRoute);
book: Book | undefined;
isCollapsed: boolean = true;
folded = 'closed'

ngOnInit() {
this.route.params.subscribe(params => {
  const {bookId, slug} = params;
  this.booksService.getBook(bookId, slug).subscribe({
    next: res => {
      this.book = res.data.book;
    }
  })
})
}

  onExpand() {
    this.isCollapsed = !this.isCollapsed;
  this.folded = this.folded === 'open' ? 'closed' : 'open';
}
}
