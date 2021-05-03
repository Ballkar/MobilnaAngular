import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WalletTransaction, WalletTransactionTypes } from 'src/app/dashboard/user/WalletTransaction';
import { UserModel } from 'src/app/shared/model/user.model';

@Component({
  selector: 'app-add-transaction-form-popup',
  templateUrl: './add-transaction-form-popup.component.html',
  styleUrls: ['./add-transaction-form-popup.component.scss']
})
export class AddTransactionFormPopupComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AddTransactionFormPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public user: UserModel,
  ) { }

  ngOnInit(): void {
  }

  close(transaction: WalletTransaction) {
    this.dialogRef.close(true);
  }
}
