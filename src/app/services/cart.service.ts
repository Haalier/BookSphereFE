import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, finalize, Observable, tap } from 'rxjs';

interface CartBook {
  _id: string;
  title: string;
  price: number;
}

interface CartPostData {
  bookId: string | undefined;
  quantity: number;
}

interface CartPostRes {
  status: string;
  results: number;
  data: {
    cart: {
      _id: string;
      user: string;
      items: [{ book: CartBook; quantity: number; _id: string }];
      total: number;
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiService = inject(ApiService);
  private apiUrl = 'http://localhost:8080/api/v1/cart';
  private http = inject(HttpClient);

  private cartResultsSubject = new BehaviorSubject<number>(0);
  public cartResults$ = this.cartResultsSubject.asObservable();

  constructor() {}

  addToCart(data: CartPostData): Observable<CartPostRes> {
    return this.http
      .post<CartPostRes>(`${this.apiUrl}/add`, data)
      .pipe(tap((res) => this.cartResultsSubject.next(res.results)));
  }
}
