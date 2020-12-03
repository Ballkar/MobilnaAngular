import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { WalletComponent } from './wallet/wallet.component';
import { UserRoutingModule } from './user-routing.module';



@NgModule({
  declarations: [
    ProfileComponent,
    WalletComponent,
  ],
  imports: [
    SharedModule,
    UserRoutingModule,
  ]
})
export class UserModule { }
