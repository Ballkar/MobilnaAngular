import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, debounceTime, map, concatMap } from 'rxjs/operators';
import { CustomerModel } from '../../customers/customer.model';
import { CustomersService } from '../../customers/customers.service';
import { MessageSchemaService } from '../../schemas/messageSchema.service';
import { MessageModel, MessageSchemaModel } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-init-message',
  templateUrl: './init-message.component.html',
  styleUrls: ['./init-message.component.scss']
})
export class InitMessageComponent implements OnInit {

  filteredCustomers$: Observable<CustomerModel[]>;
  filteredSchemas$: Observable<MessageSchemaModel[]>;
  form: FormGroup;
  get customerCtrl() { return this.form.get('customer') as FormControl; }
  get schemaCtrl() { return this.form.get('schema') as FormControl; }
  get textCtrl() { return this.form.get('text') as FormControl; }
  @Output() messageInited: EventEmitter<MessageModel> = new EventEmitter();
  constructor(
    private messageService: MessageService,
    private customerService: CustomersService,
    private schemaService: MessageSchemaService,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      customer: new FormControl(null, Validators.required),
      schema: new FormControl(null),
      text: new FormControl(null),
    });

    this.filteredCustomers$ = this.customerCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      map(value => typeof value === 'string' ? value : value.name),
      concatMap(name => this.customerService.getCustomers(null, name)),
      map(res => res.items)
    );

    this.filteredSchemas$ = this.schemaCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      map(value => typeof value === 'string' ? value : value.name),
      concatMap(name => this.schemaService.getSchemas(null, name)),
      map(res => res.items)
    );
  }


  init() {
    if (this.form.valid && (this.schemaCtrl.value || this.textCtrl.value)) {
      this.messageService.initMessage(this.customerCtrl.value.id,
        this.schemaCtrl.value ? this.schemaCtrl.value.id : null, this.textCtrl.value)
        .subscribe(res => this.messageInited.emit(res));
    }
  }

  displayFnCustomer(customer: CustomerModel): string {
    return customer && customer.name ? `${customer.name} ${customer.surname} (${customer.phone})` : '';
  }

  displayFnMessage(customer: CustomerModel): string {
    return customer && customer.name ? `${customer.name}` : '';
  }
}
