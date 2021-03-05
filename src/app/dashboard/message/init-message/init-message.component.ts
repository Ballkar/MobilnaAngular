import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, debounceTime, map, concatMap, tap, finalize } from 'rxjs/operators';
import { CustomerModel } from '../../customers/customer.model';
import { CustomersService } from '../../customers/customers.service';
import { MessageModel } from '../message.model';
import { count as smsCount } from 'sms-length';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-init-message',
  templateUrl: './init-message.component.html',
  styleUrls: ['./init-message.component.scss']
})
export class InitMessageComponent implements OnInit {

  isLocked = false;
  filteredCustomers$: Observable<CustomerModel[]>;
  form: FormGroup;
  smsCountData: {
    encoding: any;
    length: number;
    characterPerMessage: number;
    inCurrentMessage: number;
    remaining: number;
    messages: number;
  };
  get customerCtrl() { return this.form.get('customer') as FormControl; }
  get schemaCtrl() { return this.form.get('schema') as FormControl; }
  get textCtrl() { return this.form.get('text') as FormControl; }
  @Input() customer: EventEmitter<CustomerModel>;
  @Output() messageInited: EventEmitter<MessageModel> = new EventEmitter();
  constructor(
    private messageService: MessageService,
    private customerService: CustomersService,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      customer: new FormControl(this.customer ? this.customer : null, Validators.required),
      text: new FormControl('', Validators.minLength(3)),
    });

    this.smsCountData = smsCount(' ');

    this.filteredCustomers$ = this.customerCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      map(value => typeof value === 'string' ? value : value.name),
      concatMap(name => this.customerService.getCustomers(null, name)),
      map(res => res.items)
    );

    this.textCtrl.valueChanges.pipe(
      startWith(''),
      tap(res => this.smsCountData = smsCount(res)),
    ).subscribe();
  }

  init() {
    if (this.form.invalid) { return false; }
    if (!this.schemaCtrl.value && !this.textCtrl.value) {
      this.form.setErrors({textNeeded: 'Wymagany jest wybór schematu lub wpisanie własnej treści wiadomości.'});
      return false;
    }
    this.isLocked = true;
    this.messageService.initMessage(this.customerCtrl.value.id,
      this.schemaCtrl.value ? this.schemaCtrl.value.id : null, this.textCtrl.value).pipe(
        finalize(() => this.isLocked = false),
      ).subscribe(
        res => this.messageInited.emit(res),
        error => this.form.setErrors({apiError: error.error.errors})
      );
  }

  displayFnCustomer(customer: CustomerModel): string {
    return customer && customer.name ? `${customer.name} ${customer.surname} (${customer.phone})` : '';
  }
}
