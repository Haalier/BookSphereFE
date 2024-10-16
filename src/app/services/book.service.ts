import {inject, Injectable} from '@angular/core';
import {Book} from '../models/book.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

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
export class BookService {
private apiUrl = 'http://localhost:8080/api/v1/books';
private http = inject(HttpClient);

getBooks(page:number, limit:number): Observable<ApiResponse> {
  return this.http.get<ApiResponse>(`${this.apiUrl}?page=${page}&limit=${limit}`);
}
}
