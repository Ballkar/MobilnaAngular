import { Injectable } from '@angular/core';
import { OrientationConfiguration, Orientation, TourStep, GuidedTour, GuidedTourService } from 'ngx-guided-tour';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {
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

  baseTour: GuidedTour = {
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
  ) {

  }

  startBaseTutorial() {
    this.guidedTourService.startTour(this.baseTour);
  }
}
