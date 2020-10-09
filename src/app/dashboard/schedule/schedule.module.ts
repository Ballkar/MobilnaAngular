import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { WorkComponent } from './work/work.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainCalendarModule } from '../main-calendar/main-calendar.module';


@NgModule({
  declarations: [
    WorkComponent
  ],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    SharedModule,
    MainCalendarModule,
  ]
})
export class ScheduleModule { }
