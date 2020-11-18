import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {AlertService} from '../../services/alert.service';
import {first} from 'rxjs/operators';
import {ResetPasswordService} from '../../services/reset-pass/reset-password.service';

// const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-signup',
  templateUrl: `./signup.component.html`,
  styleUrls: [`./signup.component.css`]
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  submitTouched = false;
  error: boolean;

  constructor(private router: Router, private passwordService: ResetPasswordService, private auth: AuthenticationService) {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    });
  }

  ngOnInit(): void {
  }

  sendCode(): void {
    if (!this.form.invalid) {
      this.auth.register({
        email: this.form.value.email,
        role: 'ROLE_MANAGER'
      }).subscribe(
        value => {
          console.log({recipients: [this.form.value.email]});
          this.passwordService.sendCodeOnEmail({recipients: [this.form.value.email]}).subscribe(
            value1 => {
            }, error => {
              console.log(error);
              this.error = true;
            });
        }, error1 => {
          console.log(error1);
          this.error = true;
        });
    }
  }

  setTouched(): void {
    this.submitTouched = true;
  }
}
