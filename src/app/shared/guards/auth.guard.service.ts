import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from "@angular/core";
import { UserService } from 'src/app/dashboard/user/user.service';
import { catchError, map, tap } from 'rxjs/operators';
import { userRoleTypes } from '../enum/userRoleTypes';
import { UserModel } from '../model/user.model';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserService,
  ) {

  }

  canActivate(route: ActivatedRouteSnapshot): UrlTree | boolean | Observable<UrlTree | boolean> | Promise<UrlTree | boolean> {
    if (localStorage.getItem('token')) {
      const isAdminRoute = route.url[0].path === 'admin';

      return this.userService.user().pipe(
        tap(u => console.log(u.role_id)),
        tap(() => console.log(isAdminRoute)),
        map(user => this.matchDashboard(isAdminRoute, user)),
        catchError(() => of(this.router.parseUrl('/'))),
      );
    }
    return this.router.parseUrl('/');
  }

  matchDashboard(isAdminRoute: boolean, user: UserModel): UrlTree | boolean {
    let res: UrlTree | boolean;
    if(isAdminRoute) {
      res = user.role_id === userRoleTypes.admin ? true : this.router.parseUrl('/dashboard');
    } else {
      res = user.role_id === userRoleTypes.user ? true : this.router.parseUrl('/admin');
    }

    return res;
  }
}
