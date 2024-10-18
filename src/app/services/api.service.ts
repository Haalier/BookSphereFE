import {inject, Injectable} from '@angular/core';
import {Book} from '../models/book.model';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, finalize, Observable} from 'rxjs';

export interface ApiResponse {
  status: string;
  results: number;
  data: {
    books: Book[];  // Assuming you already have a Book interface
  };
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {
private apiUrl = 'http://localhost:8080/api/v1/books';
private http = inject(HttpClient);

private loadingSubject = new BehaviorSubject<boolean>(false);
public loading$ = this.loadingSubject.asObservable();

getBooks(page:number, limit:number): Observable<ApiResponse> {
  this.loadingSubject.next(true);
  return this.http.get<ApiResponse>(`${this.apiUrl}?page=${page}&limit=${limit}`).pipe(
    finalize(() => this.loadingSubject.next(false))
  );
}

getBook(id:number): Observable<ApiResponse> {
  return this.http.get<ApiResponse>(`${this.apiUrl}/${id}`);
}
}
