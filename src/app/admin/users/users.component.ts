import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { filter, map, tap } from 'rxjs/operators';
import { PaginationEvent } from 'src/app/shared/model/paginationEvent.model';
import { DataResponse, Pagination } from 'src/app/shared/model/response.model';
import { UserModel } from 'src/app/shared/model/user.model';
import { HelperService } from 'src/app/shared/service/helper.service';
import { UsersService } from '../services/users.service';
import { UserPopupComponent } from './user-popup/user-popup.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: UserModel[];
  pagination: PaginationEvent;
  constructor(
    private usersService: UsersService,
    private dialog: MatDialog,
    private helperService: HelperService,
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(page: number = 1, perPage: number = 15) {
    this.usersService.usersList(page, perPage).pipe(
      tap(data => this.pagination = this.helperService.mapApiPaginationToMaterialEvent(data.pagination)),
    ).subscribe(users => this.users = users.items);
  }

  changePage(page: PageEvent) {
    this.getUsers(page.pageIndex + 1, page.pageSize);
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
