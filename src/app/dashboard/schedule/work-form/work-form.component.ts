import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { concatMap, debounceTime, filter, finalize, map, startWith, takeUntil, tap } from 'rxjs/operators';
import { CustomerPopupComponent } from '../../customers/customer-popup/customer-popup.component';
import { CustomerModel } from '../../customers/customer.model';
import { CustomersService } from '../../customers/customers.service';
import { LabelChooseComponent } from '../label-choose/label-choose.component';
import { LabelModel } from '../label.model';
import { WorkModel } from '../work.model';
import { WorkService } from '../work.service';

@Component({
  selector: 'app-work-form',
  templateUrl: './work-form.component.html',
  styleUrls: ['./work-form.component.scss']
})
export class WorkFormComponent implements OnInit, OnDestroy {

  @ViewChild('labelChoose', {static: false}) labelChooseComponent: LabelChooseComponent;
  newLabelOpenned = false;
  isLocked = false;
  form: FormGroup;
  filteredCustomers$: Observable<CustomerModel[]>;
  customers: CustomerModel[] = [];
  actualDate: Date = new Date();
  private onDestroy$ = new Subject<void>();
  get startCtrl() { return this.form.get('start') as FormControl; }
  get stopCtrl() { return this.form.get('stop') as FormControl; }
  get labelCtrl() { return this.form.get('label') as FormControl; }
  get customerCtrl() { return this.form.get('customer') as FormControl; }
  @Input() work: WorkModel;
  @Input() ableToRemove: boolean;
  @Output() workSubmitted: EventEmitter<WorkModel> = new EventEmitter();
  @Output() workRemoved: EventEmitter<void> = new EventEmitter();
  constructor(
    private customerService: CustomersService,
    private workService: WorkService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.work.stop = this.work.stop ? this.work.stop : moment(this.work.start, 'YYYY-M-D H:m:s').add(2, 'hours').format('YYYY-M-D H:m:s');
    this.form = new FormGroup({
      start: new FormControl(this.work ? moment(this.work.start, 'YYYY-M-D H:m:s').toDate() : this.actualDate, Validators.required),
      stop: new FormControl(this.work ? moment(this.work.stop, 'YYYY-M-D H:m:s').toDate() : '', Validators.required),
      label: new FormControl(this.work ? this.work.label : null),
      customer: new FormControl(this.work ? this.work.customer : null, Validators.required),
    });

    this.filteredCustomers$ = this.customerCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      map(value => typeof value === 'string' ? value : value.name),
      concatMap(name => this.customerService.getCustomers(null, name)),
      map(res => res.items)
    );
  }

  displayFn(customer: CustomerModel): string {
    return customer && customer.name ? `${customer.name} ${customer.surname} (${customer.phone})` : '';
  }

  catchLabelChange(label: LabelModel) {
    this.labelCtrl.setValue(label);
    this.newLabelOpenned = false;
  }

  catchLabelSave(label: LabelModel) {
    this.labelChooseComponent.setNewLabelsActive([label]);
    this.catchLabelChange(label);
  }

  newCustomer(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    const ref = this.dialog.open(CustomerPopupComponent, {});
    ref.afterClosed().pipe(
      filter((customer: CustomerModel) => !!customer)
    ).subscribe(customer => this.customerCtrl.setValue(customer));
  }

  remove() {
    this.workRemoved.emit();
  }

  onSubmit() {
    if (this.form.invalid) { return false; }

    this.isLocked = true;
    const work: WorkModel = {
      id: this.work ? this.work.id : null,
      start: moment(this.startCtrl.value).format('YYYY-M-D H:m:s'),
      stop: moment(this.stopCtrl.value).format('YYYY-M-D H:m:s'),
      customer: this.customerCtrl.value,
      label: this.labelCtrl.value,
    };

    this.workSubmitted.emit(work);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
