import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UserModel } from 'src/app/shared/model/user.model';
import { SidebarService } from '../../services/sidebar.service';
import { SidemenuElement } from './SidemenuElement.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  sidemenuElements: SidemenuElement[];
  user: UserModel;
  constructor(
    public sidebarService: SidebarService,
    public authService: AuthService,
  ) { }

  ngOnInit() {
    this.sidemenuElements = this.sidebarService.sidemenuElements;
    this.user = this.authService.authUser;
  }

}



