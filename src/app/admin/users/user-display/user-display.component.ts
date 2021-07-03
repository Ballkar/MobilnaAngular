import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { UserModel } from 'src/app/shared/model/user.model';
import { UsersService } from '../../services/users.service';
import { AddTransactionFormPopupComponent } from '../add-transaction-form-popup/add-transaction-form-popup.component';

@Component({
  selector: 'app-user-display',
  templateUrl: './user-display.component.html',
  styleUrls: ['./user-display.component.scss']
})
export class UserDisplayComponent implements OnInit {
  @Input() user: UserModel;

  constructor(
    private dialog: MatDialog,
    private usersService: UsersService,
  ) { }

  ngOnInit(): void {
  }

  refreshUser() {
    this.usersService.getUser(this.user.id).subscribe(user => this.user = user);
  }

  addTransaction() {
    const ref = this.dialog.open(AddTransactionFormPopupComponent, { data: this.user });

    ref.afterClosed().pipe(
      filter(transaction => !!transaction),
    ).subscribe(() => this.refreshUser());
  }
}
