import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, finalize, Observable} from 'rxjs';
import {Book} from '../models/book.model';

export interface BookResponse {
  status: string;
  results: number;
  data: {
    books: Book[];  // Assuming you already have a Book interface
  };
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:8080/api/v1/books';
  private http = inject(HttpClient);
  public limit = 20;

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private bookListSubject: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);
  public bookList$ = this.bookListSubject.asObservable();

  private bookResultsSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public bookResults$ = this.bookResultsSubject.asObservable();

  getBooks(page:number): void {
    this.loadingSubject.next(true);
    this.http.get<BookResponse>(`${this.apiUrl}?page=${page}&limit=${this.limit}`).pipe(
      finalize(() => this.loadingSubject.next(false))
    ).subscribe({
      next: (res) => {
        this.bookListSubject.next(res.data.books);
        this.bookResultsSubject.next(res.results);
      },
    });
  }


}
