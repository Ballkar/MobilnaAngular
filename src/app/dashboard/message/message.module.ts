import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [AddComponent, ListComponent, EditComponent],
  imports: [
    CommonModule,
    MessageRoutingModule
  ]
})
export class MessageModule { }
