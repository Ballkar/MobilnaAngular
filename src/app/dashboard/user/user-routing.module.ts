import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { WalletComponent } from './wallet/wallet.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ProfileComponent,
  },
  {
    path: 'wallet',
    component: WalletComponent,
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
