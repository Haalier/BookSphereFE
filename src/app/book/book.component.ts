import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { BooksService } from '../services/books.service';
import { Book } from '../models/book.model';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe, NgClass } from '@angular/common';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ReviewsComponent } from './reviews/reviews.component';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { StarRatingComponent } from '../utils/star-rating/star-rating.component';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CurrencyPipe, NgClass, ReviewsComponent, StarRatingComponent],
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
export class BookComponent implements AfterViewInit {
  booksService = inject(BooksService);
  authService = inject(AuthService);
  cartService = inject(CartService);
  route = inject(ActivatedRoute);
  book: Book | undefined;
  isCollapsed: boolean = true;
  folded = 'closed';
  isLoggedIn = false;
  role: 'user' | 'admin' | undefined;
  public bookId!: string;
  private slug!: string;

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

  fetchBook(bookId: string, slug: string) {
    const subscribe = this.booksService.getBook(bookId, slug).subscribe({
      next: (res) => {
        this.book = res.data.book;
      },
    });
  }
  onExpand() {
    this.isCollapsed = !this.isCollapsed;
    this.folded = this.folded === 'open' ? 'closed' : 'open';
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
}
