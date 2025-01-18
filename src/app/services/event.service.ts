import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private refreshSubject = new Subject<void>();
  refreshUserData$ = this.refreshSubject.asObservable();

  emitEvent(){
    this.refreshSubject.next();
  }
}
