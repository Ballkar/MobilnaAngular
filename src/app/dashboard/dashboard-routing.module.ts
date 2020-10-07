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
        path: 'orders',
        loadChildren : () => import('./orders/orders.module').then(m => m.OrdersModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
