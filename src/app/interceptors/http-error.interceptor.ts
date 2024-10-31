import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {catchError, throwError} from 'rxjs';
import {ErrorService} from '../services/error.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const errorService = inject(ErrorService);

  return next(req).pipe(catchError((error) => {
    let errorMessage = '';

    if(error.error instanceof ErrorEvent){
      errorMessage = error.error.message;
    } else {
      switch(error.status){
        case 400:
          errorMessage = 'Bad Request';
          break;
        case 401:
          errorMessage = 'Unauthorized';
          router.navigate(['/login']);
          break;
        case 403:
          errorMessage = 'Forbidden';
          break;
        case 404:
          errorMessage = 'Not Found';
          break;
        case 500:
          errorMessage = 'Internal Server Error';
          break;
        default:
          errorMessage = `Error Code: ${error.status}, Message: ${error.message}`
      }
    }
    const statusToShow = [400, 401, 403, 404, 500];

    if(statusToShow.includes(error.status)){
    errorService.setError(error.error.message);
    }

    return throwError(() => new Error(errorMessage));
  }));
};
