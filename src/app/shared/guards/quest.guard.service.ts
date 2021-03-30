import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";

@Injectable()
export class GuestGuard implements CanActivate {

  constructor(
    private router: Router
  ) {

  }

  canActivate( route: ActivatedRouteSnapshot,
               state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (state.url.substring(1, 12) === 'auth/verify') {
      return true;
    }
    if (!localStorage.getItem('token')) {
      return true;
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
}
