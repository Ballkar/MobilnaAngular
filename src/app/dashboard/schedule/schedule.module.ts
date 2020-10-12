import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { WorkComponent } from './work/work.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainCalendarModule } from '../main-calendar/main-calendar.module';
import { WorkFormComponent } from './work-form/work-form.component';
import { WorkPopupComponentComponent } from './work-popup-component/work-popup-component.component';
import { CustomersModule } from '../customers/customers.module';

@NgModule({
  declarations: [
    WorkComponent,
    WorkFormComponent,
    WorkPopupComponentComponent,
  ],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    SharedModule,
    CustomersModule,
    MainCalendarModule,
  ],
  entryComponents: [
    WorkPopupComponentComponent,
  ]
})
export class ScheduleModule { }
