import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  token: string;
  form = new FormGroup({
    password: new FormControl('', [Validators.required]),
    password_confirm: new FormControl('', [Validators.required]),
  });

  get passwordCtrl() { return this.form.get('password') as FormControl; }
  get passwordConfirmCtrl() { return this.form.get('password_confirm') as FormControl; }
  constructor(
    private authService: AuthService,
    private notifierService: SnotifyService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams.token;
  }

  onSubmit() {
    if(this.form.invalid) {
      return;
    }

    this.authService.changePassword(this.passwordCtrl.value,  this.token).subscribe(
      () => {
        this.router.navigate(['/', 'auth']);
        this.notifierService.success('Hasło zostało ustawione!');
      },
      () => {
        this.notifierService.error('Błąd podczas zmiany hasła!');
      },
    );
  }
}
