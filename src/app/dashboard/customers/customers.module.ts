import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomerPopupComponent } from './customer-popup/customer-popup.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { MessageModule } from '../message/message.module';


@NgModule({
  declarations: [
    ListComponent,
    CustomerPopupComponent,
    CustomerFormComponent,
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    SharedModule,
    MessageModule,
  ],
  exports: [
    CustomerPopupComponent
  ],
  entryComponents: [
    CustomerPopupComponent
  ]
})
export class CustomersModule { }
