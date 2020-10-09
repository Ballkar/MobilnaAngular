import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { HomepageComponent } from './homepage/homepage.component';


const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
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
      },
      {
        path: 'customer',
        loadChildren : () => import('./customers/customers.module').then(m => m.CustomersModule),
      },
      {
        path: 'calendar',
        loadChildren : () => import('./calendars/calendars.module').then(m => m.CalendarsModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
