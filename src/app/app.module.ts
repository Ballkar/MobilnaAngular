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
import { SnotifyModule, SnotifyService } from 'ng-snotify';
import { NotificationConfiguration } from 'src/config/notification.config';
import { GuidedTourModule, GuidedTourService } from 'ngx-guided-tour';
import { TutorialService } from './dashboard/services/tutorial.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    SnotifyModule,
    GuidedTourModule,
  ],
  providers: [
    GuestGuard,
    AuthGuard,
    TutorialService,
    { provide: 'SnotifyToastConfig', useValue: NotificationConfiguration},
    SnotifyService,
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
    GuidedTourService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
