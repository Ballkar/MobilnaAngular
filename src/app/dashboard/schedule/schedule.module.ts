import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { WorkComponent } from './work/work.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainCalendarModule } from '../main-calendar/main-calendar.module';
import { WorkFormComponent } from './work-form/work-form.component';
import { WorkPopupComponentComponent } from './work-popup-component/work-popup-component.component';
import { CustomersModule } from '../customers/customers.module';
import { LabelFormComponent } from './label-form/label-form.component';
import { LabelChooseComponent } from './label-choose/label-choose.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { LabelEditingPopupComponent } from './label-editing-popup/label-editing-popup.component';
import { WorkDisplayerComponent } from './work-displayer/work-displayer.component';
import { LabelAddPopupComponent } from './label-add-popup/label-add-popup.component';

@NgModule({
  declarations: [
    WorkComponent,
    WorkFormComponent,
    WorkPopupComponentComponent,
    LabelFormComponent,
    LabelChooseComponent,
    LabelEditingPopupComponent,
    LabelAddPopupComponent,
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
    LabelEditingPopupComponent,
    LabelAddPopupComponent,
  ]
})
export class ScheduleModule { }
