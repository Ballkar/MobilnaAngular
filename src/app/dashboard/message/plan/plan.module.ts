import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanRoutingModule } from './plan-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { AddMessagePlanPopupComponent } from './add-message-plan-popup/add-message-plan-popup.component';


@NgModule({
  declarations: [ListComponent, AddComponent, AddMessagePlanPopupComponent],
  imports: [
    CommonModule,
    PlanRoutingModule,
    SharedModule,
  ]
})
export class PlanModule { }
