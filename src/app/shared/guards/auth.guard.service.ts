import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

export class AuthGuard implements CanActivate {

  constructor(
    private router: Router
  ) {

  }

  canActivate( route: ActivatedRouteSnapshot,
               state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      this.router.navigate(['/']);
    }
  }
}
