import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {catchError, throwError} from 'rxjs';
import {ErrorService} from '../services/error.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const errorService = inject(ErrorService);

    return next(req).pipe(
        catchError((err) => {
            let errorMessage = 'An unexpected error has occurred';
            const {status, error} = err;

            const errorData = {
                status: status,
                message: '',
                error: error,
            };
            if (err.error instanceof ErrorEvent) {
                errorMessage = `Client error: ${err.error.message}`;
            } else {
                switch (status) {
                    case 400:
                        errorMessage = 'Bad request. Please check your input.';
                        break;
                    case 401:
                        errorMessage = 'Unauthorized. Please log in again.';
                        router.navigate(['/login']);
                        break;
                    case 403:
                        errorMessage = 'Forbidden. You do not have access to this resource.';
                        break;
                    case 404:
                        errorMessage = 'Resource not found.';
                        break;
                    case 409:
                        errorMessage = 'Duplicate entry. Please check your data.';
                        break;
                    case 500:
                        errorMessage = err.error.message;
                        break;
                    default:
                        errorMessage = `Unexpected error: ${status}`;
                }
                errorData.message = errorMessage;
            }
            errorService.setError(errorData);

            return throwError(() => new Error(errorMessage));
        }),
    );
};
