import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsPopupComponent } from './settings-popup/settings-popup.component';
import { SettingsComponent } from './settings/settings.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    SettingsPopupComponent,
    SettingsComponent,
  ],
  entryComponents: [
    SettingsPopupComponent,
  ],
  exports: [
    SettingsPopupComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class SettingsModule { }
