import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { InitMessageComponent } from './init-message/init-message.component';
import { InitMessagePopupComponent } from './init-message-popup/init-message-popup.component';
import { StartPageComponent } from './start-page/start-page.component';


@NgModule({
  declarations: [
    InitMessageComponent,
    InitMessagePopupComponent,
    StartPageComponent,
  ],
  imports: [
    CommonModule,
    MessageRoutingModule,
    SharedModule,
  ],
  entryComponents: [
    InitMessagePopupComponent,
  ],
  exports: [
  ]
})
export class MessageModule { }
