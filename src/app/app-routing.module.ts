import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard.service';
import { GuestGuard } from './shared/guards/quest.guard.service';

const routes: Routes = [
  {
    path: 'dashboard',
    // canActivate: [AuthGuard],
    loadChildren : () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'auth',
    // canActivate: [GuestGuard],
    loadChildren : () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
