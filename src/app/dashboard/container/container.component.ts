import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  opened: boolean;
  isMobile: boolean;
  mobileWidth = 667;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isMobile = event.target.innerWidth < this.mobileWidth ? true : false;
  }
  constructor(
    private sideBarService: SidebarService,
  ) {

    this.isMobile = window.innerWidth < this.mobileWidth ? true : false;
  }

  ngOnInit() {
    this.sideBarService.opened$.subscribe(opened => this.opened = opened);
    const initOpened = this.isMobile ? false : true;
    this.sideBarService.opened$.next(initOpened);
  }

}
