import { HostListener, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CustomerPopupComponent } from '../customers/customer-popup/customer-popup.component';
import { CustomerModel } from '../customers/customer.model';
import { WorkPopupComponentComponent } from '../schedule/work-popup-component/work-popup-component.component';
import { SidebarService } from '../services/sidebar.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit, OnDestroy {
  isMobile: boolean;
  mobileWidth = 667;
  opened: boolean;
  sub: Subscription;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isMobile = event.target.innerWidth < this.mobileWidth ? true : false;
  }
  constructor(
    private sideBarService: SidebarService,
    private userService: UserService,
    private dialog: MatDialog,
  ) {
    this.isMobile = window.innerWidth < this.mobileWidth ? true : false;
    this.opened = this.isMobile && this.userService.loggedUser.tutorialComplete ? false : true;
    this.sideBarService.opened$.next(this.opened);
    this.sideBarService.open = this.opened;
  }

  ngOnInit() {
    this.sub = this.sideBarService.opened$.subscribe(res => this.opened = res);
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
