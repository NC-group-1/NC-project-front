import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forgot-pass-code',
  templateUrl: './forgot-pass-code.component.html',
  styleUrls: ['./forgot-pass-code.component.css']
})
export class ForgotPassCodeComponent implements OnInit {

  email: string;
  submitTouched = false;
  form: FormGroup;

  constructor(private router: Router) {
    this.form = new FormGroup({
      code: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  checkCode(): void {
    if (!this.form.invalid) {
      this.router.navigate(['password', 'change']);
    }
  }

  sendCode(): void {
    console.log(localStorage.getItem('email'));
  }

  setTouched(): void {
    this.submitTouched = true;
  }
}
