import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ErrorData {
  status: number;
  error: {
    message: string;
    status: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private errorSubject = new BehaviorSubject<ErrorData | null>(null);
  public error$ = this.errorSubject.asObservable();

  setError(error: ErrorData) {
    this.errorSubject.next(error);
  }

  clearError() {
    this.errorSubject.next(null);
  }
}
