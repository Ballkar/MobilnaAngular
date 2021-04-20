import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ContainerComponent } from './container/container.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: AdminDashboardComponent
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'message',
        loadChildren : () => import('./admin-message/admin-message.module').then(m => m.AdminMessageModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
