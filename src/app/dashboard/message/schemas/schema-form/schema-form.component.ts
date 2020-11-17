import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageSchemaModel } from '../../message.model';
import { MessageSchemaService } from '../messageSchema.service';

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
  get textCtrl() { return this.form.get('text') as FormControl; }
  constructor(
    private schemaService: MessageSchemaService
  ) { }

  ngOnInit() {
    this.state = this.schema ? 'edit' : 'add';

    this.form = new FormGroup({
      name: new FormControl(this.schema ? this.schema.name : '', Validators.required),
      text: new FormControl(this.schema ? this.schema.text : '', Validators.required),
    });
  }


  newCustomer(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

  }

  remove() {
    this.schemaService.deleteSchema(this.schema.id).subscribe(() => this.schemaRemoved.emit());
  }

  onSubmit() {
    if (this.form.invalid) {
      return false;
    }

    if (this.state === 'add') {
      this.schemaService.saveSchema(this.form.value).subscribe(res => this.schemaSubmitted.emit(res));
    } else {
      this.schemaService.updateSchema({...this.schema,
          name: this.nameCtrl.value,
          text: this.textCtrl.value})
      .subscribe(res => this.schemaSubmitted.emit(res));
    }
  }
}