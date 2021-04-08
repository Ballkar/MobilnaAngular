import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkersRoutingModule } from './workers-routing.module';
import { WorkerChooseComponent } from './worker-choose/worker-choose.component';
import { WorkerEditingPopupComponent } from './worker-editing-popup/worker-editing-popup.component';
import { WorkerFormComponent } from './worker-form/worker-form.component';
import { WorkerAddPopupComponent } from './worker-popup/worker-popup.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ColorPickerModule } from 'ngx-color-picker';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    WorkerFormComponent,
    WorkerChooseComponent,
    WorkerEditingPopupComponent,
    WorkerAddPopupComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    WorkersRoutingModule,
    ColorPickerModule,
  ],
  exports: [
    WorkerFormComponent,
    WorkerChooseComponent,
    WorkerEditingPopupComponent,
    WorkerAddPopupComponent,
  ],
  entryComponents: [
    WorkerEditingPopupComponent,
    WorkerAddPopupComponent,
  ]
})
export class WorkersModule { }
