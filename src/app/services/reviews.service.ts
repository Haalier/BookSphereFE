import {inject, Injectable, InputSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, finalize, Observable} from 'rxjs';
import {Review} from '../models/review.model';
import {ApiService} from './api.service';

interface ReviewsResponse {
    status: string;
    results: number;
    reviews: Review[];
}

interface ReviewEditResponse {
    status: string;
    reviewData: {
        id: number;
        review: string;
        rating: number;
        book: string;
        user: {
            id: number;
            name: string;
        };
        createdAt: string,
        updatedAt: string,

    }
}

interface ReviewResponse {
    status: string;
    data: {
        review: Review;
    };
}

@Injectable({
    providedIn: 'root',
})
export class ReviewsService {
    private apiService = inject(ApiService);
    private apiUrl = 'http://localhost:8080/api/v1/books';
    private apiUrlReviews = 'http://localhost:8080/api/v1/reviews'
    private http = inject(HttpClient);

    getBookReviews(bookId: string | undefined): Observable<ReviewsResponse> {
        this.apiService.loadingSubject.next(true);
        return this.http
            .get<ReviewsResponse>(`${this.apiUrl}/${bookId}/reviews`)
            .pipe(finalize(() => this.apiService.loadingSubject.next(false)));
    }

    createBookReview(
        bookId: string | undefined,
        review: { review: string; rating: number },
    ): Observable<ReviewResponse> {
        this.apiService.loadingSubject.next(true);
        return this.http
            .post<ReviewResponse>(`${this.apiUrl}/${bookId}/reviews`, review)
            .pipe(finalize(() => this.apiService.loadingSubject.next(false)));
    }

    editReview(bookId: string | undefined, reviewId: string | undefined, review: {
        review: string;
        rating: number
    }): Observable<ReviewEditResponse> {
        this.apiService.loadingSubject.next(true);
        return this.http.patch<ReviewEditResponse>(`${this.apiUrl}/${bookId}/reviews/${reviewId}`, review)
            .pipe(finalize(() => this.apiService.loadingSubject.next(false)));
    }

    deleteReview(reviewId: string) {
        this.apiService.loadingSubject.next(true);
        return this.http.delete<{
            status: string,
            data: null
        }>(`${this.apiUrlReviews}/${reviewId}`).pipe(finalize(() => this.apiService.loadingSubject.next(false)));
    }
}
