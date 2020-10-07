import { HostListener, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SidebarService } from '../services/sidebar.service';

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
  ) {
    this.isMobile = window.innerWidth < this.mobileWidth ? true : false;
    this.opened = this.isMobile ? false : true;
    this.sideBarService.open = this.opened;
  }

  ngOnInit() {
    this.sub = this.sideBarService.opened$.subscribe(res => this.opened = res);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
