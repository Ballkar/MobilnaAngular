import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, map } from 'rxjs/operators';
import { UserModel } from 'src/app/shared/model/user.model';
import { UsersService } from '../services/users.service';
import { UserPopupComponent } from './user-popup/user-popup.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: UserModel[];
  constructor(
    private usersService: UsersService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.usersService.usersList().pipe(
    ).subscribe(users => this.users = users);
  }

  addUser() {
    const ref = this.dialog.open(UserPopupComponent, { data: null });

    ref.afterClosed().pipe(
      filter(user => !!user),
    ).subscribe(() => this.getUsers());
  }

  clicked(user: UserModel) {
    const ref = this.dialog.open(UserPopupComponent, { data: user });

    ref.afterClosed().pipe(
      filter(user => !!user),
    ).subscribe(() => this.getUsers());
  }
}
