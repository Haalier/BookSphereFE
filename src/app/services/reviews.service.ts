import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, finalize, Observable} from 'rxjs';
import {Review} from '../models/review.model';

interface ReviewsResponse {
  status: string,
  results: number,
  data: {
    reviews: Review[],
  }
}

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private apiUrl = 'http://localhost:8080/api/v1/books';
private http = inject(HttpClient);


  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

getBookReviews(bookId: string | undefined): Observable<ReviewsResponse> {
  this.loadingSubject.next(true);
  return this.http.get<ReviewsResponse>(`${this.apiUrl}/${bookId}/reviews`).pipe(
    finalize(() => this.loadingSubject.next(false))
  );
}
}
