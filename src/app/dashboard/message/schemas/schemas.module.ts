import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchemasRoutingModule } from './schemas-routing.module';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchemaFormComponent } from './schema-form/schema-form.component';
import { SchemaPopupComponent } from './schema-popup/schema-popup.component';
import { SchemaBodyComponent } from '../plans/remind-plan/remind-plan-form/schema-body/schema-body.component';
import { SchemaPreviewComponent } from './schema-preview/schema-preview.component';
import { MessageModule } from '../message.module';


@NgModule({
  declarations: [
    ListComponent,
    SchemaFormComponent,
    SchemaPopupComponent,
    SchemaBodyComponent,
    SchemaPreviewComponent,
  ],
  imports: [
    CommonModule,
    SchemasRoutingModule,
    SharedModule,
    MessageModule,
  ],
  entryComponents: [
    SchemaPopupComponent,
    SchemaPreviewComponent,
  ]
})
export class SchemasModule { }
