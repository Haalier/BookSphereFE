import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BookService } from '../services/book.service';
import {Book} from '../models/book.model';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
bookService = inject(BookService);
destroyRef = inject(DestroyRef);
books: Book[] = [];
results= '';
page: number = 1;
limit: number = 20;




ngOnInit() {
const subscription = this.bookService.getBooks(this.page, this.limit).subscribe({
  next: result => {
    console.log(result.data.books);
    this.books = result.data.books;
  }
})

  this.destroyRef.onDestroy(() => {
    subscription.unsubscribe();
  })
}
}
