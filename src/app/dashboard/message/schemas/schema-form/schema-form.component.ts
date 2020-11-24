import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { filter } from 'rxjs/operators';
import { MessageSchemaModel } from '../../message.model';
import { MessageSchemaService } from '../messageSchema.service';
import { SchemaPreviewComponent } from '../schema-preview/schema-preview.component';

@Component({
  selector: 'app-schema-form',
  templateUrl: './schema-form.component.html',
  styleUrls: ['./schema-form.component.scss']
})
export class SchemaFormComponent implements OnInit {

  state: 'add' | 'edit';
  form: FormGroup;
  @Input() schema: MessageSchemaModel;
  @Input() ableToRemove: boolean;
  @Output() schemaSubmitted: EventEmitter<MessageSchemaModel> = new EventEmitter();
  @Output() schemaRemoved: EventEmitter<void> = new EventEmitter();
  get nameCtrl() { return this.form.get('name') as FormControl; }
  get bodyCtrl() { return this.form.get('body') as FormControl; }
  get clearDiacriticsCtrl() { return this.form.get('clearDiacritics') as FormControl; }
  constructor(
    private schemaService: MessageSchemaService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.state = this.schema ? 'edit' : 'add';

    this.form = new FormGroup({
      name: new FormControl(this.schema ? this.schema.name : '', Validators.required),
      body: new FormControl(this.schema ? this.schema.body : '', Validators.required),
      clearDiacritics: new FormControl(this.schema ? this.schema.clearDiacritics : true, Validators.required),
    });
  }

  remove() {
    this.schemaService.deleteSchema(this.schema.id).subscribe(() => this.schemaRemoved.emit());
  }

  preview() {
    const ref = this.dialog.open(SchemaPreviewComponent, { data: {...this.form.value, id: this.schema.id} });
    ref.afterClosed().pipe(
      filter((message: MessageSchemaModel) => !!message)
    ).subscribe();
  }

  onSubmit() {
    if (this.form.invalid) { return false; }

    if (this.state === 'add') {
      this.schemaService.saveSchema(this.form.value).subscribe(res => this.schemaSubmitted.emit(res));
    } else {
      this.schemaService.updateSchema({...this.schema,
          name: this.nameCtrl.value,
          body: this.bodyCtrl.value})
      .subscribe(res => this.schemaSubmitted.emit(res));
    }
  }
}
