import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SnotifyService } from 'ng-snotify';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { ConfirmPopupComponent, ConfirmPopupComponentData } from 'src/app/shared/modal/confirm-popup/confirm-popup.component';
import { UserModel } from 'src/app/shared/model/user.model';
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
  get nameCtrl() { return this.form.get('name') as FormControl; }

  constructor(
    private userService: UsersService,
    private notifyService: SnotifyService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(this.user ? this.user.name : '', Validators.required),
    });
  }

  saveWorker() {
    return this.userService.addUser(this.form.value).pipe(
      tap(() => this.notifyService.success('User został dodany!')),
    );
  }

  editWorker() {
    // return this.userService.editWorker({
    //   ...this.user,
    //   color: this.colorCtrl.value,
    //   name: this.nameCtrl.value,
    // }).pipe(
    //   tap(() => this.notifyService.success('Pracownik została zaktualizowany!')),
    // );
  }

  submit() {
    if (this.form.invalid) { return; }
    let request: Observable<UserModel>;
    if (this.user) {
      // request = this.editWorker();
    } else {
      request = this.saveWorker();
    }

    request.subscribe(user => this.userSaved.emit(user));
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
