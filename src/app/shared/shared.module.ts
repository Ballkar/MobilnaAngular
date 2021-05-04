import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlyNumberDirective } from './directives/number-only.directive';
import { TruncatePipe } from './pipes/truncate.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PhoneMaskDirective } from './directives/phone-mask.directive';
import { PhonePipe } from './pipes/phone.pipe';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { TimeLeadingZeroPipe } from './pipes/timeLeadingZero.pipe';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';
import { getPolishPaginatorIntl } from './internationalizations/polish-paginator-intl';
import { ConfirmPopupComponent } from './modal/confirm-popup/confirm-popup.component';
import { HelpInfoComponent } from './components/help-info/help-info.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatGridListModule} from '@angular/material/grid-list';

const materialComponents = [
  CommonModule,
  MatCardModule,
  MatInputModule,
  MatCheckboxModule,
  MatButtonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatListModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatGridListModule,
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
  MatDatepickerModule,
  MatAutocompleteModule,
  MatRippleModule,
  MatSelectModule,
  MatRadioModule,
  MatChipsModule,
  MatExpansionModule,
  MatBadgeModule,
  MatTooltipModule,
  MatSlideToggleModule,
];


@NgModule({
  declarations: [
    OnlyNumberDirective,
    TruncatePipe,
    PhonePipe,
    PhoneMaskDirective,
    TimeLeadingZeroPipe,
    ConfirmPopupComponent,
    HelpInfoComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    materialComponents,
  ],
  exports: [
    OnlyNumberDirective,
    TruncatePipe,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    materialComponents,
    PhonePipe,
    PhoneMaskDirective,
    TimeLeadingZeroPipe,
    ConfirmPopupComponent,
    HelpInfoComponent,
  ],
  entryComponents: [
    ConfirmPopupComponent,
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getPolishPaginatorIntl() }
 ]
})
export class SharedModule { }
