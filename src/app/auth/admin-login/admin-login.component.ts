import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  form: FormGroup;

  get password() { return this.form.get('password') as FormControl; }
  get email() { return this.form.get('email') as FormControl; }
  // get remember() { return this.form.get('remember') as FormControl; }

  constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private authService: AuthService,
    ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      // remember: [null],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.loginAdmin(this.email.value, this.password.value).pipe(
        tap(token => localStorage.setItem('token', token)),
      ).subscribe(
        () => this.router.navigate(['/admin']),
        err => this.form.setErrors({invalidCredentials: err.error.message})
      );
    }
  }
}
