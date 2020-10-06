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


const materialComponents = [
  CommonModule,
  MatCardModule,
  MatInputModule,
  MatCheckboxModule,
  MatButtonModule
];


@NgModule({
  declarations: [
    OnlyNumberDirective,
    TruncatePipe,
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
  ]
})
export class SharedModule { }
