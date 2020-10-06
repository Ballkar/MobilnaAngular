import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { PasswordValidation } from 'src/app/shared/validators/password-validation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  get email() { return this.form.get('email') as FormControl; }
  get name() { return this.form.get('name') as FormControl; }
  get password() { return this.form.get('password') as FormControl; }
  get password_confirmation() { return this.form.get('password_confirmation') as FormControl; }
  get regs() { return this.form.get('regs') as FormControl; }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required, Validators.minLength(5)]],
      name: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      password_confirmation: [''],
      regs: ['', Validators.requiredTrue],
    }, {
      validator: PasswordValidation.MatchPassword
    });
  }

  onSubmit() {
    this.regs.markAsTouched();

    if (this.form.valid) {
      const {email, password, password_confirmation, name, regs} = this;
      // this.authService.register(email.value, password.value, password_confirmation.value, name.value)
      // .subscribe(
      //   user => {
      //     // console.log(this.authService.authUser);
      //     this.router.navigate(['/dashboard']);
      //   },
      //   (response: ErrorResponseModel) => {
      //     Object.keys(response.errors).forEach(prop => {
      //       const formControl = this.form.get(prop);
      //       if (formControl) {
      //         formControl.setErrors({
      //           serverError: response.errors[prop]
      //         });
      //       }
      //     });
      //   }
      // );
    }
  }
}
