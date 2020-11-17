import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanRoutingModule } from './plan-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListComponent } from './list/list.component';
import { PlanFormComponent } from './plan-form/plan-form.component';
import { PlanPopupComponent } from './plan-popup/plan-popup.component';


@NgModule({
  declarations: [
    ListComponent,
    PlanFormComponent,
    PlanPopupComponent
  ],
  entryComponents: [
    PlanPopupComponent,
  ],
  imports: [
    CommonModule,
    PlanRoutingModule,
    SharedModule,
  ]
})
export class PlanModule { }
