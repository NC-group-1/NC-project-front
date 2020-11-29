import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ResetPasswordService} from '../../../services/reset-pass/reset-password.service';

@Component({
  selector: 'app-forgot-pass-email',
  templateUrl: './forgot-pass-email.component.html',
  styleUrls: ['./forgot-pass-email.component.css']
})
export class ForgotPassEmailComponent implements OnInit {
  submitTouched = false;
  form: FormGroup;
  error: boolean;

  constructor(private router: Router, private passwordService: ResetPasswordService) {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    });
  }

  ngOnInit(): void {
  }

  sendCode(): void {
    if (!this.form.invalid) {
      this.passwordService.sendCodeOnEmail({recipients: [this.form.value.email]}).subscribe(
        value => {
        }, error => {
          this.error = true;
        }
      );
    }
  }

  setTouched(): void {
    this.submitTouched = true;
  }
}
