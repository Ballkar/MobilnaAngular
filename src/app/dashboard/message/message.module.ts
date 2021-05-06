import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { InitMessageComponent } from './init-message/init-message.component';
import { InitMessagePopupComponent } from './init-message-popup/init-message-popup.component';
import { MessageMobilePreviewComponent } from './message-mobile-preview/message-mobile-preview.component';


@NgModule({
  declarations: [
    InitMessageComponent,
    InitMessagePopupComponent,
    MessageMobilePreviewComponent,
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
    MessageMobilePreviewComponent,
  ]
})
export class MessageModule { }
