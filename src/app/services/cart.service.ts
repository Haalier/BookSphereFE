import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, finalize, Observable, tap } from 'rxjs';

interface CartItem {
  _id: string;
  id: string;
  title: string;
  author: string;
  price: number;
  photoUrl: string;
}

export interface CartItems {
  book: CartItem;
  quantity: number;
  _id: string;
}

interface CartPostData {
  bookId: string | undefined;
  quantity: number;
}

interface CartPostRes {
  status: string;
  data: {
    user: string;
    items: [CartItems];
    total: number;
    totalItems: number;
  };
}

interface CartCountRes {
  status: string;
  totalItems: number;
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
    this.apiService.loadingSubject.next(true);
    return this.http.post<CartPostRes>(`${this.apiUrl}/add`, data).pipe(
      tap((res) => this.cartResultsSubject.next(res.data.totalItems)),
      finalize(() => this.apiService.loadingSubject.next(false)),
    );
  }

  getCart() {
    this.apiService.loadingSubject.next(true);
    return this.http.get<CartPostRes>(`${this.apiUrl}`).pipe(
      tap((res) => this.cartResultsSubject.next(res.data.totalItems)),
      finalize(() => this.apiService.loadingSubject.next(false)),
    );
  }

  getCartCount() {
    this.apiService.loadingSubject.next(true);
    return this.http.get<CartCountRes>(`${this.apiUrl}/count`).pipe(
      tap((res) => {
        this.cartResultsSubject.next(res.totalItems);
      }),
      finalize(() => this.apiService.loadingSubject.next(false)),
    );
  }

  removeFromCart(bookId: string) {
    this.apiService.loadingSubject.next(true);
    return this.http
      .delete(`${this.apiUrl}/${bookId}`)
      .pipe(finalize(() => this.apiService.loadingSubject.next(false)));
  }
}
