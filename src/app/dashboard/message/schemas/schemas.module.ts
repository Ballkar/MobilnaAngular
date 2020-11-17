import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchemasRoutingModule } from './schemas-routing.module';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchemaFormComponent } from './schema-form/schema-form.component';
import { SchemaPopupComponent } from './schema-popup/schema-popup.component';


@NgModule({
  declarations: [
    ListComponent,
    SchemaFormComponent,
    SchemaPopupComponent
  ],
  imports: [
    CommonModule,
    SchemasRoutingModule,
    SharedModule,
  ],
  entryComponents: [
    SchemaPopupComponent
  ]
})
export class SchemasModule { }
