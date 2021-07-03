import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlansComponent } from './plans/plans.component';
import { AdminMessageRoutingModule } from './admin-message-routing.module';



@NgModule({
  declarations: [PlansComponent],
  imports: [
    CommonModule,
    AdminMessageRoutingModule,
  ]
})
export class AdminMessageModule { }
