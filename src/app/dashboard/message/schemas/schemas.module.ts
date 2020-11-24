import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchemasRoutingModule } from './schemas-routing.module';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchemaFormComponent } from './schema-form/schema-form.component';
import { SchemaPopupComponent } from './schema-popup/schema-popup.component';
import { SchemaBodyComponent } from './schema-form/schema-body/schema-body.component';
import { SchemaBodyPipe } from './schema-form/schema-body.pipe';
import { SchemaPreviewComponent } from './schema-preview/schema-preview.component';


@NgModule({
  declarations: [
    ListComponent,
    SchemaFormComponent,
    SchemaPopupComponent,
    SchemaBodyComponent,
    SchemaBodyPipe,
    SchemaPreviewComponent,
  ],
  imports: [
    CommonModule,
    SchemasRoutingModule,
    SharedModule,
  ],
  entryComponents: [
    SchemaPopupComponent,
    SchemaPreviewComponent,
  ]
})
export class SchemasModule { }
