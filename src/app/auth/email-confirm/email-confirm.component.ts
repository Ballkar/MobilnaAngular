import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-email-confirm',
  templateUrl: './email-confirm.component.html',
  styleUrls: ['./email-confirm.component.scss']
})
export class EmailConfirmComponent implements OnInit {
  emailCtrl: FormControl = new FormControl(null, [Validators.required, Validators.email]);
  error = false;
  success = false;
  locked = false;
  token: string;

  isButtonUnlocked = false;
  timeToUnlock = 5;

  countDown = setInterval(() => {
    if (this.timeToUnlock <= 0) {
      clearInterval(this.countDown);
      this.isButtonUnlocked = true;
    } else {
      this.timeToUnlock -= 1;
    }
  }, 1000);
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private notificationService: SnotifyService,
  ) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams.token;
    this.confirm();
  }

  resend() {
    if(this.emailCtrl.invalid) {
      this.notificationService.error('Wymagany jest poprawny adres email');
      return;
    }
    this.locked = true;

    this.authService.resendConfirmEmail(this.emailCtrl.value).subscribe(
      () => {
        this.locked = false;
        this.notificationService.success('Email potwierdzający został wysłany');
        this.router.navigate(['/auth']);
      },
      () => {
        this.locked = false;
        this.notificationService.error('Błąd poczas wysyłki email');
      },
    );
  }

  confirm() {
    this.authService.confirmEmail(this.token).subscribe(
      () => {
        this.notificationService.success('Email został potwierdzony');
        this.success = true;
      },
      () => {
        this.notificationService.error('Błąd podczas potwierdzenia adresu email');
        this.error = true;
      },
    );
  }
}
