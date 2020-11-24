import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { startWith, debounceTime, map, concatMap, filter, takeUntil, tap } from 'rxjs/operators';
import { CustomerModel } from 'src/app/dashboard/customers/customer.model';
import { CustomersService } from 'src/app/dashboard/customers/customers.service';
import { MessageSchemaModel } from '../../message.model';
import { MessageSchemaService } from '../messageSchema.service';

@Component({
  selector: 'app-schema-preview',
  templateUrl: './schema-preview.component.html',
  styleUrls: ['./schema-preview.component.scss']
})
export class SchemaPreviewComponent implements OnInit, OnDestroy {

  preview: string;
  onDestroy$: Subject<CustomerModel[]> = new Subject();
  filteredCustomers$: Observable<CustomerModel[]>;
  form: FormGroup = new FormGroup({
    customer: new FormControl(null, Validators.required),
  });
  get customerCtrl() { return this.form.get('customer') as FormControl; }
  constructor(
    private schemaService: MessageSchemaService,
    private customerService: CustomersService,
    public dialogRef: MatDialogRef<SchemaPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public schema: MessageSchemaModel,
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
      tap(() => this.preview = ''),
      filter(() => this.customerCtrl.value),
      filter(() => this.customerCtrl.value.id),
      takeUntil(this.onDestroy$),
    ).subscribe(customer => this.getPreview(customer));
  }

  getPreview(customer: CustomerModel) {
    this.schemaService.getPreview(customer.id, this.schema).pipe(
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
