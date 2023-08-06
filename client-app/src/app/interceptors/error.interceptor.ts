import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((response: HttpErrorResponse) => {
        if (response) {
          switch (response.status) {
            case 400:
              const errorsList = response.error?.errors;

              if (errorsList) {
                const modelStateErrors = [];

                for (const key in errorsList)
                  modelStateErrors.push(errorsList[key]);

                throw modelStateErrors.flat();
              } else
                this.toastr.error(response.error, response.status.toString());
              break;
            case 401:
              this.toastr.error('Unauthorised', response.status.toString());
              break;
            case 404:
              this.router.navigateByUrl('/not-found');
              break;
            case 500:
              const navigationExtras: NavigationExtras = {
                state: { error: response.error },
              };

              this.router.navigateByUrl('/server-error', navigationExtras);
              break;

            default:
              console.log(response);
              this.toastr.error('Something! Went Wrong.', 'Error!');
              break;
          }
        }

        throw response;
      })
    );
  }
}
