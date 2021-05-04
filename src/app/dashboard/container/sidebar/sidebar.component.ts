import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { SidemenuElement } from './SidemenuElement.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  sidemenuElements: SidemenuElement[];
  constructor(
    public sidebarService: SidebarService,
  ) { }

  ngOnInit() {
    this.sidemenuElements = this.sidebarService.sidemenuElements;
  }

}



