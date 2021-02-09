import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { concatMap, debounceTime, filter, finalize, map, startWith, tap } from 'rxjs/operators';
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
export class WorkFormComponent implements OnInit {

  @ViewChild('labelChoose', {static: false}) labelChooseComponent: LabelChooseComponent;
  newLabelOpenned = false;
  isLocked = false;
  state: 'add' | 'edit';
  actualDate: Date = new Date();
  form: FormGroup;
  filteredCustomers$: Observable<CustomerModel[]>;
  customers: CustomerModel[] = [];
  get startCtrl() { return this.form.get('start') as FormControl; }
  get stopCtrl() { return this.form.get('stop') as FormControl; }
  get labelCtrl() { return this.form.get('label') as FormControl; }
  get customerCtrl() { return this.form.get('customer') as FormControl; }
  @Input() work: WorkModel;
  @Input() ableToRemove: boolean;
  @Output() workSubmitted: EventEmitter<WorkModel> = new EventEmitter();
  @Output() workRemoved: EventEmitter<void> = new EventEmitter();
  @Output() errorEmitted: EventEmitter<void> = new EventEmitter();
  constructor(
    private customerService: CustomersService,
    private workService: WorkService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.state = this.work.stop && this.work.customer ? 'edit' : 'add';
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
    this.labelChooseComponent.getLabels();
    this.labelChooseComponent.setNewLabels([label]);
    this.newLabelOpenned = false;
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
    this.workService.removeWork(this.work).subscribe(() => this.workRemoved.emit());
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

    if (this.state === 'add') {
      this.workService.saveWork(work).pipe(
        finalize(() => this.isLocked = false),
      ).subscribe(
        res => this.workSubmitted.emit(res),
        err => this.errorEmitted.emit(err)
      );
    } else {
      this.workService.editWork(work).pipe(
        finalize(() => this.isLocked = false),
      ).subscribe(
        res => this.workSubmitted.emit(res),
        err => this.errorEmitted.emit(err)
      );
    }
  }
}
