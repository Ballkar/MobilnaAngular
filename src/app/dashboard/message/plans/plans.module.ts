import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlansRoutingModule } from './plans-routing.module';
import { ContainerComponent } from './container/container.component';
import { RemindPlanComponent } from './remind-plan/remind-plan.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ContainerComponent, RemindPlanComponent],
  imports: [
    CommonModule,
    SharedModule,
    PlansRoutingModule,
    FormsModule,
  ]
})
export class PlansModule { }
