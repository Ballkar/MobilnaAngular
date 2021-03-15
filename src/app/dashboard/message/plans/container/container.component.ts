import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/dashboard/services/tutorial.service';
import { UserService } from 'src/app/dashboard/user/user.service';
import { PlanService, PlansResponse } from '../services/plan.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  plans: PlansResponse;
  constructor(
    private planService: PlanService,
    private authService: UserService,
    private tutorialService: TutorialService,
  ) { }

  ngOnInit() {
    this.planService.getPlans().subscribe(res => this.plans = res);

    if(!this.authService.loggedUser.tutorials.includes(this.tutorialService.messageTour.tourId)) {
      setTimeout(() => this.tutorialService.startMessageTutorial(), 800);
    }
  }

}
