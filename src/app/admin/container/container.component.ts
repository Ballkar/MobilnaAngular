import { ChangeDetectorRef, HostListener, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit, OnDestroy {
  isMobile: boolean;
  mobileWidth = 667;

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

  ngOnDestroy(): void {
  }
}
