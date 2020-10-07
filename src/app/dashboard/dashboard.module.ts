import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ContainerComponent } from './container/container.component';
import { SharedModule } from '../shared/shared.module';
import { NavComponent } from './container/nav/nav.component';
import { SidebarComponent } from './container/sidebar/sidebar.component';
import { HomepageComponent } from './homepage/homepage.component';


@NgModule({
  declarations: [
    ContainerComponent,
    NavComponent,
    SidebarComponent,
    HomepageComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
  ]
})
export class DashboardModule { }
