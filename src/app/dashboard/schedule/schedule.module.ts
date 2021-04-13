import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { WorkComponent } from './work/work.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainCalendarModule } from '../main-calendar/main-calendar.module';
import { WorkFormComponent } from './work-form/work-form.component';
import { WorkPopupComponentComponent } from './work-popup-component/work-popup-component.component';
import { CustomersModule } from '../customers/customers.module';
import { WorkDisplayerComponent } from './work-displayer/work-displayer.component';
import { WorkersModule } from '../workers/workers.module';

@NgModule({
  declarations: [
    WorkComponent,
    WorkFormComponent,
    WorkPopupComponentComponent,
    WorkDisplayerComponent,
  ],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    SharedModule,
    CustomersModule,
    MainCalendarModule,
    WorkersModule,
  ],
  entryComponents: [
    WorkPopupComponentComponent
  ],
})
export class ScheduleModule { }
