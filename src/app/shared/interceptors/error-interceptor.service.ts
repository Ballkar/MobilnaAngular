import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Injectable } from "@angular/core";

@Injectable()
export class ErrorIntercecptorService implements HttpInterceptor {

  constructor(
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog,
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
              this.dialog.closeAll();
              break;
            case 403:

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
