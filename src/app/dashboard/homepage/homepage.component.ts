import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';
import { TutorialService } from '../services/tutorial.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  constructor(
    private authServie: UserService,
    private tutorialService: TutorialService,
    private sidebarService: SidebarService,
  ) {
  }

  ngOnInit(): void {
    if(!this.authServie.loggedUser.tutorials.includes(this.tutorialService.baseTour.tourId)) {
      setTimeout(() => !this.sidebarService.open ? this.sidebarService.toggle() : null, 50);
      this.startTour();
    }
  }

  startTour(): void {
    setTimeout(() => this.tutorialService.startBaseTutorial(), 700);
  }

}
