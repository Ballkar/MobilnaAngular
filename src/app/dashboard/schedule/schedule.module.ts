import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { WorkComponent } from './work/work.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainCalendarModule } from '../main-calendar/main-calendar.module';
import { WorkFormComponent } from './work-form/work-form.component';
import { WorkPopupComponentComponent } from './work-popup-component/work-popup-component.component';
import { CustomersModule } from '../customers/customers.module';
import { WorkerFormComponent } from './worker-form/worker-form.component';
import { WorkerChooseComponent } from './worker-choose/worker-choose.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { WorkerEditingPopupComponent } from './worker-editing-popup/worker-editing-popup.component';
import { WorkDisplayerComponent } from './work-displayer/work-displayer.component';
import { WorkerAddPopupComponent } from './worker-add-popup/worker-add-popup.component';

@NgModule({
  declarations: [
    WorkComponent,
    WorkFormComponent,
    WorkPopupComponentComponent,
    WorkerFormComponent,
    WorkerChooseComponent,
    WorkerEditingPopupComponent,
    WorkerAddPopupComponent,
    WorkDisplayerComponent,
  ],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    SharedModule,
    CustomersModule,
    MainCalendarModule,
    ColorPickerModule,
  ],
  entryComponents: [
    WorkPopupComponentComponent,
    WorkerEditingPopupComponent,
    WorkerAddPopupComponent,
  ]
})
export class ScheduleModule { }
