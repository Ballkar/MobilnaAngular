import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { ListComponent } from './list/list.component';
import { DisplayMessageComponent } from './display-message/display-message.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MessageModule } from '../message.module';


@NgModule({
  declarations: [
    ListComponent,
    DisplayMessageComponent,
  ],
  entryComponents: [
    DisplayMessageComponent,
  ],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    SharedModule,
    MessageModule,
  ]
})
export class HistoryModule { }
