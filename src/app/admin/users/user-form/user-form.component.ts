import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SnotifyService } from 'ng-snotify';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { ConfirmPopupComponent, ConfirmPopupComponentData } from 'src/app/shared/modal/confirm-popup/confirm-popup.component';
import { UserModel } from 'src/app/shared/model/user.model';
import { PasswordValidation } from 'src/app/shared/validators/password-validation.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})

export class UserFormComponent implements OnInit, OnDestroy {
  @Input() user: UserModel;
  @Output() userChanged: EventEmitter<UserModel> = new EventEmitter();
  @Output() userSaved: EventEmitter<UserModel> = new EventEmitter();
  @Output() userRemoved: EventEmitter<UserModel> = new EventEmitter();
  form: FormGroup;
  onDestroy$: Subject<void> = new Subject();

  get emailCtrl() { return this.form.get('email') as FormControl; }
  get nameCtrl() { return this.form.get('name') as FormControl; }
  get passwordCtrl() { return this.form.get('password') as FormControl; }
  get password_confirmationCtrl() { return this.form.get('password_confirmation') as FormControl; }
  get regsCtrl() { return this.form.get('regs') as FormControl; }

  constructor(
    private userService: UsersService,
    private notifyService: SnotifyService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required, Validators.minLength(5)]],
      name: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      password_confirmation: [''],
    }, {
      validator: PasswordValidation.MatchPassword
    });
  }

  saveWorker() {
    return this.userService.addUser(this.form.value).pipe(
      tap(() => this.notifyService.success('User został dodany!')),
    );
  }

  submit() {
    if (this.form.invalid) { return; }
    this.saveWorker().subscribe(() => this.userSaved.emit());
  }

  initRemove() {
    const data: ConfirmPopupComponentData = {
      confirm: 'tak',
      cancel: 'nie',
      text: 'Czy napewno chcesz usunąć tego Pracownika?',
      subtitle: `Spowoduje to usunięcie go z wszystkich spotkań.
      Wszystkie wizyty przypisane do tego pracownika będą istniały bez pracownika.`
    };
    const ref = this.dialog.open(ConfirmPopupComponent, { data });
    // ref.afterClosed().pipe(
    //   filter((data: boolean) => !!data)
    // ).subscribe(() => this.remove());
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
