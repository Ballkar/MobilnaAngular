import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnotifyService } from 'ng-snotify';
import { filter } from 'rxjs/operators';
import { CustomerPopupComponent } from '../../customers/customer-popup/customer-popup.component';
import { CustomerModel } from '../../customers/customer.model';

@Component({
  selector: 'app-customers-cube',
  templateUrl: './customers-cube.component.html',
  styleUrls: ['./customers-cube.component.scss']
})
export class CustomersCubeComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private notifierService: SnotifyService,
  ) { }

  ngOnInit(): void {
  }

  addCustomer() {
    const ref = this.dialog.open(CustomerPopupComponent, {});
    ref.afterClosed().pipe(
      filter((customer: CustomerModel) => !!customer)
    ).subscribe(
      () => this.notifierService.success('Klient został dodany!'),
      () => this.notifierService.error('Wystąpił problem podczas dodawania Klienta!'),
    );
  }
}
