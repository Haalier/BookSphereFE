import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {catchError, Observable} from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const router = inject(Router)
  const authToken = localStorage.getItem('token');

  let authReq = req;
  if(authToken) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
  }
  return next(authReq).pipe(catchError((error: HttpErrorResponse) => {
    if(error.status === 401){
      localStorage.removeItem('token');
      router.navigate(['/login']);
    }
    throw error;
  }));
};
