import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {

  form: FormGroup;
  submitTouched = false;

  constructor(private router: Router) {
    this.form = new FormGroup({
        password: new FormControl(null, [Validators.required, Validators.min(6)]),
        confirmPassword: new FormControl(null, [Validators.required, Validators.min(6)])
      }, {validators: this.passwordValidator.bind(this)});
  }
  passwordValidator: ValidatorFn = (control: FormGroup) => {
    return control.get('confirmPassword').value === control.get('password').value ? null : {notSame: true};
  }

  ngOnInit(): void {
  }
  changePass(): void {
    if (!this.form.invalid){
      this.router.navigate(['login'], {queryParams: {changed: true}});
    }
  }

  setTouched(): void{
    this.submitTouched = true;
  }
}
