import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {catchError, Observable} from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const router = inject(Router)
  const authToken = authService.getToken();

  let authReq = req;
  if(authToken) {
    authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`),
    });
  }
  return next(authReq).pipe(catchError((error: HttpErrorResponse) => {
    if(error.status === 401){
      authService.logout();
      router.navigate(['/login']);
    }
    throw error;
  }));
};
