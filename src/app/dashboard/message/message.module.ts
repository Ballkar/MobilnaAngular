import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateMessagePopupComponent } from './create-message-popup/create-message-popup.component';
import { DisplayMessageComponent } from './display-message/display-message.component';
import { InitMessageComponent } from './init-message/init-message.component';


@NgModule({
  declarations: [
    AddComponent,
    ListComponent,
    EditComponent,
    CreateMessagePopupComponent,
    DisplayMessageComponent,
    InitMessageComponent,
  ],
  imports: [
    CommonModule,
    MessageRoutingModule,
    SharedModule,
  ],
  entryComponents: [
    CreateMessagePopupComponent,
    DisplayMessageComponent,
  ]
})
export class MessageModule { }
