import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, filter, tap } from 'rxjs/operators';
import { HelperService } from 'src/app/shared/service/helper.service';
import { MessageSchemaModel } from '../../message/message.model';
import { MessageSchemaService } from '../messageSchema.service';
import { SchemaFormComponent } from '../schema-form/schema-form.component';
import { SchemaPopupComponent } from '../schema-popup/schema-popup.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  schemas: MessageSchemaModel[];
  pagination: PaginationEvent;
  searchCtrl: FormControl = new FormControl();
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  constructor(
    private helperService: HelperService,
    private schemaService: MessageSchemaService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.searchCtrl.valueChanges.pipe(
      debounceTime(300),
    ).subscribe(console.log);
    this.getSchemas();
  }

  getSchemas(pagination?: PaginationEvent) {
    this.isLoading$.next(true);
    this.schemaService.getSchemas(pagination).pipe(
      tap(res => this.pagination = this.helperService.mapApiPaginationToMaterialEvent(res.pagination)),
      tap(() => this.isLoading$.next(false)),
    ).subscribe(res => this.schemas = res.items);
  }


  initChat(schema: MessageSchemaModel) {

  }

  select(schema: MessageSchemaModel) {

  }

  edit(schema: MessageSchemaModel) {
    const ref = this.dialog.open(SchemaPopupComponent, { data: {schema, ableToRemove: true} });
    ref.afterClosed().pipe(
      filter((message: MessageSchemaModel) => !!message)
    ).subscribe(() => this.getSchemas());
  }

  add() {
    const ref = this.dialog.open(SchemaPopupComponent, { data: {ableToRemove: false} });
    ref.afterClosed().pipe(
      filter((message: MessageSchemaModel) => !!message)
    ).subscribe(() => this.getSchemas());
  }

  changePage(event: PaginationEvent) {
    this.getSchemas(event);
  }
}
