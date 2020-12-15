import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {ResetPasswordService} from '../../../services/reset-pass/reset-password.service';
import {AuthenticationService} from '../../../services/auth/authentication.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {

  form: FormGroup;
  submitTouched = false;
  error: boolean;

  constructor(private router: Router,
              private passwordService: ResetPasswordService,
              private route: ActivatedRoute, private auth: AuthenticationService) {
    this.form = new FormGroup({
      password: new FormControl(null, [Validators.required, Validators.min(6)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.min(6)])
    }, {validators: this.passwordValidator.bind(this)});
  }

  passwordValidator: ValidatorFn = (control: FormGroup) => {
    return control.get('confirmPassword').value === control.get('password').value ? null : {notSame: true};
  }

  ngOnInit(): void {
    this.auth.logout();
  }

  changePass(): void {
    if (!this.form.invalid) {
      this.passwordService.updatePassword({
        newPassword: this.form.value.password,
        token: this.route.snapshot.queryParamMap.get('token')
      }).subscribe((value) => {
        this.router.navigate(['login'], {queryParams: {changed: true}});
      }, error => {
        this.error = true;
      });
    }
  }

  setTouched(): void {
    this.submitTouched = true;
  }
}
