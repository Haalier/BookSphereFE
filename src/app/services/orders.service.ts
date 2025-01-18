import {inject, Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, finalize, Observable, tap} from 'rxjs';
import {Checkout, GetOrders} from '../models/order.model';
import {AuthService} from './auth.service';

interface CheckoutItem {
    book: string;
    quantity: number;
    price: number;
    title: string;
    author: string;
    photoUrl: string;
}

interface CheckoutData {
    user: string;
    items: CheckoutItem[];
    total: number;
}

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    private apiService = inject(ApiService);
    private authService = inject(AuthService);
    private apiUrl = 'http://localhost:8080/api/v1/orders';
    private http = inject(HttpClient);

    private orderResultsSubject = new BehaviorSubject<number | undefined>(0);
    public orderResults$ = this.orderResultsSubject.asObservable();

    getOrders(): Observable<GetOrders> {
        this.apiService.loadingSubject.next(true);
        return this.http.get<GetOrders>(this.apiUrl).pipe(tap((data => {
                this.orderResultsSubject.next(data.results);
            })),
            finalize(() => {
                this.apiService.loadingSubject.next(false);
            }))
    }

    checkout(data: CheckoutData): Observable<Checkout> {
        this.apiService.loadingSubject.next(true);
        return this.http.post<Checkout>(`${this.http}/checkout`, data).pipe(finalize(() => {
            this.apiService.loadingSubject.next(false);
        }))
    }
}
