import { ChangeDetectorRef, HostListener, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { CustomerPopupComponent } from '../customers/customer-popup/customer-popup.component';
import { CustomerModel } from '../customers/customer.model';
import { WorkPopupComponentComponent } from '../schedule/work-popup-component/work-popup-component.component';
import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit, OnDestroy {
  isMobile: boolean;
  mobileWidth = 667;
  sub: Subscription;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isMobile = event.target.innerWidth < this.mobileWidth ? true : false;
  }
  constructor(
    public sideBarService: SidebarService,
    private dialog: MatDialog,
  ) {
    this.isMobile = window.innerWidth < this.mobileWidth ? true : false;
  }

  ngOnInit() {
    setTimeout(() => this.sideBarService.opened$.next(this.isMobile ? false : true), 5);
  }

  addWork() {
    this.dialog.open(WorkPopupComponentComponent, { data: {} });
  }

  addCustomer() {
    const ref = this.dialog.open(CustomerPopupComponent, {});
    ref.afterClosed().pipe(
      filter((customer: CustomerModel) => !!customer)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
