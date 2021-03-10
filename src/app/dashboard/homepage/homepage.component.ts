import { Component, OnInit } from '@angular/core';
import { OrientationConfiguration, Orientation, TourStep, GuidedTour, GuidedTourService } from 'ngx-guided-tour';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  config: OrientationConfiguration = {
    orientationDirection: Orientation.Center
  };
  stepOne: TourStep = {
    content: 'test',
    skipStep: false,
  }
  stepTwo: TourStep = {
    content: 'test2',
    skipStep: false,
  }
  stepThree: TourStep = {
    content: 'test3',
    skipStep: false,
  }
  tour: GuidedTour = {
    steps: [
      this.stepOne,
      this.stepTwo,
      this.stepThree,
    ],
    tourId: 'base',
    completeCallback: () => console.log('complete'),
  }

  constructor(
    private guidedTourService: GuidedTourService,
    private authServie: UserService,
  ) {
    if(!this.authServie.loggedUser.tutorialComplete) {
      setTimeout(() => this.startTour(), 1000);
    }
  }

  ngOnInit(): void {
  }

  startTour(): void {
    this.guidedTourService.startTour(this.tour);
  }

}
