import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SchemaResolver } from './message/plans/schema.resolver';
import { WorkersResolver } from './workers/workers.resolver';


const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    resolve: {
      workers: WorkersResolver
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        component: HomepageComponent,
      },
      {
        path: 'message',
        loadChildren : () => import('./message/message.module').then(m => m.MessageModule),
        resolve: { schemas: SchemaResolver },
      },
      {
        path: 'customer',
        loadChildren : () => import('./customers/customers.module').then(m => m.CustomersModule),
      },
      {
        path: 'work',
        loadChildren : () => import('./schedule/schedule.module').then(m => m.ScheduleModule),
      },
      {
        path: 'workers',
        loadChildren : () => import('./workers/workers.module').then(m => m.WorkersModule),
      },
      {
        path: 'profile',
        loadChildren : () => import('./user/user.module').then(m => m.UserModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
