import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/dashboard/user/user.service';
import { WalletTransaction } from 'src/app/dashboard/user/WalletTransaction';
import { UserModel } from 'src/app/shared/model/user.model';

@Component({
  selector: 'app-add-transaction-form',
  templateUrl: './add-transaction-form.component.html',
  styleUrls: ['./add-transaction-form.component.scss']
})
export class AddTransactionFormComponent implements OnInit {

  @Input() user: UserModel;
  @Output() transactionAdded: EventEmitter<WalletTransaction> = new EventEmitter();
  form = new FormGroup({
    money: new FormControl(null, Validators.required)
  });

  get moneyCtrl() { return this.form.get('money') as FormControl; }
  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }


  submit() {
    if(this.form.invalid) {
      return;
    }

    this.userService.addWalletTransaction(this.moneyCtrl.value, this.user.id).subscribe(transaction => this.transactionAdded.emit(transaction))
  }
}
