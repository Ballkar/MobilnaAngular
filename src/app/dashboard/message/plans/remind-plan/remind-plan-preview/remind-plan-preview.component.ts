import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { startWith, debounceTime, map, concatMap, filter, takeUntil, tap } from 'rxjs/operators';
import { CustomerModel } from 'src/app/dashboard/customers/customer.model';
import { CustomersService } from 'src/app/dashboard/customers/customers.service';
import { RemindPlanModel } from '../models/remindPlan.model';
import { RemindPlanService } from '../remind-plan.service';
import { RemindPlanPreviewModel } from '../models/remindPlanPreviewModel.model';

@Component({
  selector: 'app-remind-plan-preview',
  templateUrl: './remind-plan-preview.component.html',
  styleUrls: ['./remind-plan-preview.component.scss']
})
export class RemindPlanPreviewComponent implements OnInit, OnDestroy {

  preview: RemindPlanPreviewModel;
  onDestroy$: Subject<CustomerModel[]> = new Subject();
  filteredCustomers$: Observable<CustomerModel[]>;
  form: FormGroup = new FormGroup({
    customer: new FormControl(null, Validators.required),
  });
  get customerCtrl() { return this.form.get('customer') as FormControl; }
  constructor(
    private remindPlanService: RemindPlanService,
    private customerService: CustomersService,
    public dialogRef: MatDialogRef<RemindPlanPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { schemaId: number, customer: CustomerModel },
  ) { }

  ngOnInit() {
    this.filteredCustomers$ = this.customerCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      map(value => typeof value === 'string' ? value : value.name),
      concatMap(name => this.customerService.getCustomers(null, name)),
      map(res => res.items)
    );

    this.customerCtrl.valueChanges.pipe(
      tap(() => this.preview = null),
      filter(() => this.customerCtrl.value),
      filter(() => this.customerCtrl.value.id),
      takeUntil(this.onDestroy$),
    ).subscribe(customer => this.getPreview(customer));

    this.customerCtrl.setValue(this.data.customer);
  }

  getPreview(customer: CustomerModel) {
    this.remindPlanService.getPreview(customer.id, this.data.schemaId).pipe(
      tap(preview => this.preview = preview),
    ).subscribe();
  }

  displayFnCustomer(customer: CustomerModel): string {
    return customer && customer.name ? `${customer.name} ${customer.surname} (${customer.phone})` : '';
  }

  close() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
