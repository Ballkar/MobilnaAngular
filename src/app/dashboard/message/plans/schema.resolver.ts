import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { of } from 'rxjs';
import { PlanSchema } from './models/PlanSchema.model';
import { SchemaService } from './services/schema.service';

@Injectable({
  providedIn: 'root'
})
export class SchemaResolver implements Resolve<PlanSchema[]> {
  constructor(
    private schemaService: SchemaService,
    ) { }

  resolve() {
    if(this.schemaService.schemas) {
      return of(this.schemaService.schemas);
    }
    return this.schemaService.getSchemas();
  }
}
