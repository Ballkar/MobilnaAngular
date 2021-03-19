import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SnotifyService } from 'ng-snotify';
import { filter, finalize, tap } from 'rxjs/operators';
import { ConfirmPopupComponent, ConfirmPopupComponentData } from 'src/app/shared/modal/confirm-popup/confirm-popup.component';
import { CustomerModel } from '../customer.model';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
  state: 'add' | 'edit';
  form: FormGroup;
  customers: CustomerModel[] = [];
  isLocked = false;

  get nameCtrl() { return this.form.get('name') as FormControl; }
  get surnameCtrl() { return this.form.get('surname') as FormControl; }
  get phoneCtrl() { return this.form.get('phone') as FormControl; }
  get additionalInfoCtrl() { return this.form.get('additionalInfo') as FormControl; }

  @Input() customer: CustomerModel;
  @Input() ableToRemove: boolean;
  @Output() customerEmitted: EventEmitter<CustomerModel> = new EventEmitter();
  @Output() customerRemoved: EventEmitter<void> = new EventEmitter();
  constructor(
    private customerService: CustomersService,
    private notifyService: SnotifyService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    const {customer} = this;
    this.state = customer && customer.id ? 'edit' : 'add';
    this.form  = new FormGroup({
      name: new FormControl(customer ? customer.name : '', [Validators.required, Validators.minLength(3)]),
      surname: new FormControl(customer ? customer.surname : '', [Validators.required, Validators.minLength(3)]),
      phone: new FormControl(customer ? customer.phone : '', [Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
      additionalInfo: new FormControl(customer ? customer.additionalInfo : ''),
    });
  }

  initRemove() {
    const data: ConfirmPopupComponentData = {
      confirm: 'tak',
      cancel: 'nie',
      text: 'Czy napewno chcesz usunąć tego klienta?',
      subtitle: `Spowoduje to usunięcie jego przyszłych wizyt.
      Zachowamy natomiast wizyty oraz całą historię spotkań z tą osobą.`
    };
    const ref = this.dialog.open(ConfirmPopupComponent, { data });
    ref.afterClosed().pipe(
      filter((data: CustomerModel) => !!data)
    ).subscribe(() => this.remove());
  }

  private remove() {
    this.isLocked = true;
    this.customerService.deleteCustomer(this.customer.id).pipe(
      tap(() => this.customerRemoved.emit()),
    ).subscribe(
      () => this.notifyService.success('Klientka została usunięta!')
    );
  }

  onSubmit() {
    if (this.form.invalid) {  return false; }
    this.isLocked = true;

    if (this.state === 'add') {
      this.customerService.saveCustomer({...this.form.value}).pipe(
        finalize(() => this.isLocked = false),
        tap(customer => this.customerEmitted.emit(customer)),
      ).subscribe(
        () => this.notifyService.success('Klientka została dodana!')
      );
    } else {
      this.customerService.editCustomer({...this.form.value, id: this.customer.id}).pipe(
        finalize(() => this.isLocked = false),
        tap(customer => this.customerEmitted.emit(customer)),
      ).subscribe(
        () => this.notifyService.success('Klientka została zaktualizowana!')
      );
    }
  }
}
