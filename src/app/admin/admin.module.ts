import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ContainerComponent } from './container/container.component';
import { SidebarComponent } from './container/sidebar/sidebar.component';
import { NotificationMenuComponent } from './container/notification-menu/notification-menu.component';
import { NavComponent } from './container/nav/nav.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UsersComponent } from './users/users.component';


@NgModule({
  declarations: [
    ContainerComponent,
    SidebarComponent,
    NotificationMenuComponent,
    NavComponent,
    AdminDashboardComponent,
    UsersComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
