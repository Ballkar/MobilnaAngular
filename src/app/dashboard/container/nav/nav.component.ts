import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { UserModel } from 'src/app/shared/model/user.model';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {

  user: UserModel;
  onDestroy$: Subject<void> = new Subject();
  constructor(
    public sidebarService: SidebarService,
    public authService: AuthService,
    public router: Router,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.user = this.route.snapshot.data.user;
    this.authService.authUser$.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(user => this.user = user);
  }

  clickOnProfileMenu(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
