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
import { UserFormComponent } from './users/user-form/user-form.component';
import { UserPopupComponent } from './users/user-popup/user-popup.component';
import { UserDisplayComponent } from './users/user-display/user-display.component';
import { AddTransactionFormComponent } from './users/add-transaction-form/add-transaction-form.component';
import { AddTransactionFormPopupComponent } from './users/add-transaction-form-popup/add-transaction-form-popup.component';


@NgModule({
  declarations: [
    ContainerComponent,
    SidebarComponent,
    NotificationMenuComponent,
    NavComponent,
    AdminDashboardComponent,
    UsersComponent,
    UserFormComponent,
    UserPopupComponent,
    UserDisplayComponent,
    AddTransactionFormComponent,
    AddTransactionFormPopupComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
  ],
  entryComponents: [
    UserPopupComponent
  ]
})
export class AdminModule { }
