import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DataResponse } from 'src/app/shared/model/response.model';
import { HelperService } from 'src/app/shared/service/helper.service';
import { UserService } from '../user.service';
import { WalletTransaction, WalletTransactionTypes } from '../WalletTransaction';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  transactionsTypes = WalletTransactionTypes;
  pagination: PaginationEvent;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  transactions: DataResponse<WalletTransaction>;
  constructor(
    private userService: UserService,
    private helperService: HelperService,
  ) { }

  ngOnInit() {
    this.getMessages();
  }

  getMessages(pagination?: PaginationEvent) {
    this.isLoading$.next(true);

    this.userService.getWalletHistory(pagination).pipe(
      tap(r => console.log(r)),
      tap(res => this.pagination = this.helperService.mapApiPaginationToMaterialEvent(res.pagination)),
    ).subscribe(res => this.transactions = res);
  }


  select(transaction: WalletTransaction) {
  }

  changePage(event: PaginationEvent) {
    this.getMessages(event);
  }
}
