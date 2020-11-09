import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DisplayMessageComponent } from './display-message/display-message.component';
import { InitMessageComponent } from './init-message/init-message.component';
import { InitMessagePopupComponent } from './init-message-popup/init-message-popup.component';
import { SettingsComponent } from './settings/settings.component';
import { SettingsPopupComponent } from './settings-popup/settings-popup.component';


@NgModule({
  declarations: [
    ListComponent,
    DisplayMessageComponent,
    InitMessageComponent,
    InitMessagePopupComponent,
    SettingsComponent,
    SettingsPopupComponent,
  ],
  imports: [
    CommonModule,
    MessageRoutingModule,
    SharedModule,
  ],
  entryComponents: [
    InitMessagePopupComponent,
    DisplayMessageComponent,
    SettingsPopupComponent,
  ],
  exports: [
    SettingsPopupComponent,
  ]
})
export class MessageModule { }
