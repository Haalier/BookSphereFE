import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, finalize, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

interface loginData {
  email?: string | null | undefined;
  password?: string | null | undefined;
}

interface signupData {
  email?: string | null | undefined;
  name?: string | null | undefined;
  password?: string | null | undefined;
  confirmPassword?: string | null | undefined;
}

interface forgotData {
  email?: string | null | undefined;
}

interface loginResponse {
  data: {
    user: User;
  };
  status: string;
  token: string;
}

interface forgotResponse {
  status: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiService = inject(ApiService);
  private apiUrl = 'http://localhost:8080/api/v1/users';
  private http = inject(HttpClient);
  private router = inject(Router);

  constructor() {
    this.loadUserFromLocalStorage();
  }

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.currentUserSubject.asObservable();

  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  private removeToken(): void {
    localStorage.removeItem('token');
  }

  private loadUserFromLocalStorage(): void {
    const token = this.getToken();
    console.log(token);
    if (token) {
      this.http
        .get<User>(`${this.apiUrl}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .subscribe({
          next: (user) => {
            console.log('User after refresh: ', user);
            this.currentUserSubject.next(user);
          },
          error: (err) => {
            console.log('Error fetching user: ', err);
            this.logout();
          },
        });
    }
  }

  logout() {
    this.removeToken();
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  login(data: loginData) {
    this.apiService.loadingSubject.next(true);
    return this.http.post<loginResponse>(`${this.apiUrl}/login`, data).pipe(
      tap((response) => {
        this.setToken(response.token);
        this.currentUserSubject.next(response.data.user);
        this.router.navigate(['/']);
      }),
      finalize(() => this.apiService.loadingSubject.next(false)),
    );
  }

  forgotPassword(data: forgotData) {
    this.apiService.loadingSubject.next(true);
    return this.http
      .post<forgotResponse>(`${this.apiUrl}/forgotPassword`, data)
      .pipe(finalize(() => this.apiService.loadingSubject.next(false)));
  }

  signup(data: signupData) {
    this.apiService.loadingSubject.next(true);
    return this.http.post<loginResponse>(`${this.apiUrl}/signup`, data).pipe(
      tap((response) => {
        this.setToken(response.token);
        this.currentUserSubject.next(response.data.user);
        this.router.navigate(['/']);
      }),
      finalize(() => this.apiService.loadingSubject.next(false)),
    );
  }
}
