import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateMessagePopupComponent } from './create-message-popup/create-message-popup.component';


@NgModule({
  declarations: [
    AddComponent,
    ListComponent,
    EditComponent,
    CreateMessagePopupComponent,
  ],
  imports: [
    CommonModule,
    MessageRoutingModule,
    SharedModule,
  ],
  entryComponents: [
    CreateMessagePopupComponent,
  ]
})
export class MessageModule { }
