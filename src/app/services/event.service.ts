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


  emitRefreshEvent(){
    this.refreshSubject.next();
  }

  emitClearFiltersEvent(){
    this.clearFiltersSubject.next();
  }
}
