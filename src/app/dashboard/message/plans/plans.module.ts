import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlansRoutingModule } from './plans-routing.module';
import { ContainerComponent } from './container/container.component';
import { RemindPlanComponent } from './remind-plan/remind-plan.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RemindPlanFormComponent } from './remind-plan/remind-plan-form/remind-plan-form.component';
import { SchemaBodyComponent } from './remind-plan/remind-plan-form/schema-body/schema-body.component';
import { SchemaBodyPipe } from './remind-plan/remind-plan-form/schema-body/schema-body.pipe';
import { RemindPlanPopupComponent } from './remind-plan/remind-plan-popup/remind-plan-popup.component';
import { RemindPlanPreviewComponent } from './remind-plan/remind-plan-preview/remind-plan-preview.component';
import { MessageModule } from '../message.module';



@NgModule({
  declarations: [
    ContainerComponent,
    RemindPlanComponent,
    RemindPlanFormComponent,
    SchemaBodyComponent, // TODO: refactor
    SchemaBodyPipe, RemindPlanPopupComponent, // TODO: refactor
    RemindPlanPreviewComponent, // TODO: refactor
  ],
  imports: [
    CommonModule,
    SharedModule,
    PlansRoutingModule,
    FormsModule,
    MessageModule,
  ],
  entryComponents: [
    RemindPlanPopupComponent,
    RemindPlanPreviewComponent,
  ]
})
export class PlansModule { }
