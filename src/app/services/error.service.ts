import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorSubject = new BehaviorSubject<string | null>(null);
  public error$ = this.errorSubject.asObservable();

  setError(message: string){
    this.errorSubject.next(message);
  }

// TODO - clear error after changing pages
  clearError(){
    this.errorSubject.next(null);
  }
}
