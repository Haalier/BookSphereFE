import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private refreshSubject = new Subject<void>();
  refreshUserData$ = this.refreshSubject.asObservable();

  private clearFiltersSubject = new Subject<void>();
  clearFilters$ = this.clearFiltersSubject.asObservable();

  private refreshRatingSubject = new Subject<void>();
  refreshRating$ = this.refreshRatingSubject.asObservable();

  private refreshBooksSubject = new Subject<void>();
  refreshBooks$ = this.refreshBooksSubject.asObservable();

  emitRefreshEvent(){
    this.refreshSubject.next();
  }

  emitClearFiltersEvent(){
    this.clearFiltersSubject.next();
  }

  emitRefreshRating(){
    this.refreshRatingSubject.next();
  }

  emitRefreshBooks(){
    this.refreshBooksSubject.next();
  }
}
