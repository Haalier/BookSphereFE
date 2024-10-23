import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, catchError, finalize, tap, throwError} from 'rxjs';
import {User} from '../models/user.model';
import {Router} from '@angular/router';

interface loginData {
  email?: string | null | undefined;
  password?: string | null | undefined;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/v1/users';
  private http = inject(HttpClient);
  private router = inject(Router);

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.currentUserSubject.asObservable();

  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }
  public getToken(): string | null{
    return localStorage.getItem('token');
  }
  private removeToken(): void {
    localStorage.removeItem('token');
  }

  logout(){
    this.removeToken();
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(){
  const token = this.getToken();
  return !!token;
  }

  login(data: loginData){
    this.loadingSubject.next(true);
    return this.http.post<{token: string; user: User}>(`${this.apiUrl}/login`, data).pipe(tap((response) => {
      this.setToken(response.token);
      this.currentUserSubject.next(response.user);
      this.router.navigate(['/']);
    }),
      catchError(this.handleError),
      finalize(() => this.loadingSubject.next(false)));
  }

  private handleError(error: HttpErrorResponse){
    let errorMessage = 'An unknown error occurred!';

    if(error.error instanceof ErrorEvent){
      errorMessage = `Error: ${error.error.message}`;
    } else{
      switch(error.status){
        case 401:
          errorMessage = 'Incorrect email or password.';
          break;
        case 500:
          errorMessage = 'Internal server error.';
          break;
          default:
            errorMessage = `Error code: ${error.status}, Message: ${error.message}`;
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}
