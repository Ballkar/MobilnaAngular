import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/shared/model/user.model';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  user: UserModel;
  constructor(
    public sidebarService: SidebarService,
    public router: Router,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.user = this.route.snapshot.data.user;
  }

  clickOnProfileMenu(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
