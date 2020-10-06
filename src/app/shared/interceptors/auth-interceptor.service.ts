import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class AuthIntercecptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (localStorage.getItem('token')) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      return next.handle(req);
    }

    return next.handle(req);
  }
}
