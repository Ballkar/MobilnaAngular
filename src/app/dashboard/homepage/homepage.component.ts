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
    if(!this.authServie.loggedUser.tutorialComplete) {
      this.startTour();
    }
  }

  ngOnInit(): void {
  }

  startTour(): void {
    if(!this.sidebarService.open) {
      // console.log('open');
      // this.sidebarService.toggle();
    }
    setTimeout(() => this.tutorialService.startBaseTutorial(), 1000);
  }

}
