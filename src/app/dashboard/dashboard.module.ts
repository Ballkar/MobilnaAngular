import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ContainerComponent } from './container/container.component';
import { SharedModule } from '../shared/shared.module';
import { NavComponent } from './container/nav/nav.component';
import { SidebarComponent } from './container/sidebar/sidebar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CustomersModule } from './customers/customers.module';
import { ScheduleModule } from './schedule/schedule.module';
import { NotificationMenuComponent } from './container/notification-menu/notification-menu.component';
import { WorkerCubeComponent } from './homepage/worker-cube/worker-cube.component';
import { MessageCubeComponent } from './homepage/message-cube/message-cube.component';
import { ScheduleCubeComponent } from './homepage/schedule-cube/schedule-cube.component';
import { CustomersCubeComponent } from './homepage/customers-cube/customers-cube.component';
import { WelcomeCubeComponent } from './homepage/welcome-cube/welcome-cube.component';
import { ProfileCubeComponent } from './homepage/profile-cube/profile-cube.component';


@NgModule({
  declarations: [
    ContainerComponent,
    NavComponent,
    SidebarComponent,
    HomepageComponent,
    NotificationMenuComponent,
    WorkerCubeComponent,
    MessageCubeComponent,
    ScheduleCubeComponent,
    CustomersCubeComponent,
    WelcomeCubeComponent,
    ProfileCubeComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    CustomersModule,
    ScheduleModule,
  ],
})
export class DashboardModule { }
