import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { UserModel } from 'src/app/shared/model/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  opened: string;
  user: UserModel;
  formProfile: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    phone: new FormControl(null, Validators.required),
  });
  get nameCtrl() { return this.formProfile.get('name') as FormControl; }
  get phoneCtrl() { return this.formProfile.get('phone') as FormControl; }
  formPassword: FormGroup = new FormGroup({
    password: new FormControl(null, Validators.required),
    new_password: new FormControl(null, Validators.required),
    new_password_confirmation: new FormControl(null, Validators.required),
  });
  get passwordCtrl() { return this.formPassword.get('password') as FormControl; }
  get newPasswordCtrl() { return this.formPassword.get('new_password') as FormControl; }
  get newPasswordConfirmationCtrl() { return this.formPassword.get('new_password_confirmation') as FormControl; }
  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.user = this.userService.loggedUser;
    this.nameCtrl.setValue(this.user.name);
    this.phoneCtrl.setValue(this.user.phone);
  }

  setOpened(form: string) {
    this.opened = form;
  }

  onProfileSubmit() {
    if (this.formProfile.invalid) { return false; }
    this.userService.updateProfile(this.formProfile.value).subscribe(res => console.log(res));
  }

  onPasswordSubmit() {
    if (this.formPassword.invalid) { return false; }
    this.userService.changePassword(this.formPassword.value).subscribe(
      () => this.resetForm(this.formPassword),
    );
  }

  resetForm(form: FormGroup) {
    form.reset();
    Object.keys(form.controls).forEach(key => form.controls[key].setErrors(null));
  }
}
