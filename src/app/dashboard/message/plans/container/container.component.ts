import { Component, OnInit } from '@angular/core';
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
  ) { }

  ngOnInit() {
    this.planService.getPlans().subscribe(res => this.plans = res);
  }

}
