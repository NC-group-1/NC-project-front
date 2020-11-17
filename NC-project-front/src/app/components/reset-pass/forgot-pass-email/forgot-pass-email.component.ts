import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forgot-pass-email',
  templateUrl: './forgot-pass-email.component.html',
  styleUrls: ['./forgot-pass-email.component.css']
})
export class ForgotPassEmailComponent implements OnInit {
  submitTouched = false;
  form: FormGroup;
  constructor(private router: Router) {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    });
  }

  ngOnInit(): void {
  }
  sendCode(): void{
    if (!this.form.invalid){
      localStorage.setItem('email', this.form.controls.email.value);
      this.router.navigate(['password', 'code']);
    }
  }
  setTouched(): void{
    this.submitTouched = true;
  }
}
