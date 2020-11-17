import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {AlertService} from '../../services/alert.service';
import {first} from 'rxjs/operators';

// const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-signup',
  templateUrl: `./signup.component.html`,
  styleUrls: [`./signup.component.css`]
})
export class SignupComponent implements OnInit {

  userRegisterForm: FormGroup;
  submitTouched = false;
  constructor(private router: Router,
              private auth: AuthenticationService,
              private alert: AlertService) {
  }

  ngOnInit(): void {
    this.userRegisterForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ])
    });
  }
  setTouched(): void{
    this.submitTouched = true;
  }
  get data(): { [p: string]: AbstractControl }{
    return this.userRegisterForm.controls;
  }

  onSubmit(): void {
    this.alert.clear();

    if (this.userRegisterForm.invalid) {
      return;
    }

    this.auth.register(this.userRegisterForm.value).pipe(first())
      .subscribe({
        next: () => {
          this.alert.success('Registration successful', {keepAfterRouteChange: true});
          this.router.navigate(['/login']);
        },
        error: error => {
          this.alert.error(error);
        }
      });
  }
}
