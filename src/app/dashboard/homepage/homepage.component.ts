import { Component, OnInit } from '@angular/core';
import { OrientationConfiguration, Orientation, TourStep, GuidedTour, GuidedTourService } from 'ngx-guided-tour';
import { AuthService } from 'src/app/auth/auth.service';
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
  ) {
    if(!this.authServie.loggedUser.tutorialComplete) {
      setTimeout(() => this.startTour(), 1000);
    }
  }

  ngOnInit(): void {
  }

  startTour(): void {
    this.tutorialService.startBaseTutorial();
  }

}
