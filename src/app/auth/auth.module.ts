import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ContainerComponent } from './container/container.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { EmailConfirmComponent } from './email-confirm/email-confirm.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
  declarations: [
    ContainerComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    EmailConfirmComponent,
    ResetPasswordComponent,
  ],
  imports: [
    AuthRoutingModule,
    SharedModule
  ],
})
export class AuthModule { }
