import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/dashboard/services/sidebar.service';
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
    private sidebarService: SidebarService,
  ) { }

  ngOnInit() {
    this.planService.getPlans().subscribe(res => this.plans = res);
    this.tutorialLogic();
  }

  tutorialLogic() {
    if(!this.authService.loggedUser.tutorials.includes(this.tutorialService.messageTour.tourId)) {
      setTimeout(() => this.sidebarService.open ? this.sidebarService.toggle() : null, 100);
      setTimeout(() => this.tutorialService.startMessageTutorial(), 800);
    }
  }
}
