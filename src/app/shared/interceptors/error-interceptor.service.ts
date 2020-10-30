import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

export class ErrorIntercecptorService implements HttpInterceptor {

  constructor(
    private router: Router,
    private authService: AuthService
    ) {}


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe( tap(() => {},
      (error: any) => {
        if (error instanceof HttpErrorResponse) {
          switch (error.status) {
            case 401:
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              this.router.navigate(['/']);
              break;

            default:
              console.log('Not Handled error');
          }

          // if (error.status === 401) {
          //   console.log('wylogowanie interceptor');
          //   this.authService.logout();
          //   return;
          // }

          console.log(error);

        }
      }));
  }
}
