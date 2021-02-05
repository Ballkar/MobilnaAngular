import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GuestGuard } from './shared/guards/quest.guard.service';
import { AuthGuard } from './shared/guards/auth.guard.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthIntercecptorService } from './shared/interceptors/auth-interceptor.service';
import { ErrorIntercecptorService } from './shared/interceptors/error-interceptor.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [
    GuestGuard,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthIntercecptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorIntercecptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
