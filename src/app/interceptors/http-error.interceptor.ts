import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ErrorService } from '../services/error.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const errorService = inject(ErrorService);

  return next(req).pipe(
    catchError((err) => {
      let errorMessage = '';
      const { status, error } = err;

      const errorData = {
        status: status,
        error: error,
      };
      if (err.error instanceof ErrorEvent) {
        errorMessage = err.error.message;
      }
      if (status === 401) {
        router.navigate(['/login']);
      }
      errorService.setError(errorData);

      return throwError(() => new Error(errorMessage));
    }),
  );
};
