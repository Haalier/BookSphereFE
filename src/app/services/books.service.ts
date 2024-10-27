import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, finalize, Observable} from 'rxjs';
import {Book} from '../models/book.model';
import {ApiService} from './api.service';

interface BooksResponse {
  status: string;
  results: number;
  data: {
    books: Book[];
  };
}

interface BookResponse {
  status: string;
  data: {
    book: Book;
  };
}

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private apiService = inject(ApiService);
  private apiUrl = 'http://localhost:8080/api/v1/books';
  private http = inject(HttpClient);
  public limit = 20;

  private bookListSubject: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);
  public bookList$ = this.bookListSubject.asObservable();

  private bookResultsSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public bookResults$ = this.bookResultsSubject.asObservable();

  getBooks(page:number): void {
    this.apiService.loadingSubject.next(true);
    this.http.get<BooksResponse>(`${this.apiUrl}?page=${page}&limit=${this.limit}`).pipe(
      finalize(() => this.apiService.loadingSubject.next(false))
    ).subscribe({
      next: (res) => {
        this.bookListSubject.next(res.data.books);
        console.log(res.data)
        this.bookResultsSubject.next(res.results);
      },
    });
  }

  getBook(bookId:string, slug: string): Observable<BookResponse>{
    this.apiService.loadingSubject.next(true);
    return this.http.get<BookResponse>(`${this.apiUrl}/${bookId}`).pipe(finalize(() => this.apiService.loadingSubject.next(false)));
  }

}
