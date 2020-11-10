import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UserModel } from '../shared/model/user.model';
import { UserService } from './user/user.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardResolver implements Resolve<UserModel> {

  user: UserModel = null;
  constructor(
    private userService: UserService,
    ) { }

  resolve() {
    return this.userService.user();
  }
}
