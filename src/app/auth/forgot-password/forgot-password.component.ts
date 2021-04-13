import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl(''),
    phone: new FormControl(''),
  });

  get emailCtrl() { return this.form.get('email') as FormControl; }
  get phoneCtrl() { return this.form.get('phone') as FormControl; }

  constructor(
    private authService: AuthService,
    private notifierService: SnotifyService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    if(this.form.invalid) {
      this.notifierService.error('Potrzebujemy poprawnego adresu email lub numeru telefonu!');
      return;
    }

    this.authService.sendPasswordEmail(this.emailCtrl.value, this.phoneCtrl.value).subscribe(
      () => {
        this.router.navigate(['/', 'auth']);
        this.notifierService.success('Email ze zmianą hasła został wysłany!');
      },
      () => {
        this.notifierService.error('Błąd podczas zmiany hasła!');
      },
    );
  }

}
