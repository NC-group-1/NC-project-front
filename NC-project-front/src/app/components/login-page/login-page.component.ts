import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../services/auth/authentication.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(null),
      password: new FormControl(null)
    });
  }

  login(): void {
    this.authenticationService.logout();
    this.form.disable();
    this.authenticationService.login(this.form.value).subscribe((result) => {
      this.router.navigate(['/']);
    }, (error: HttpErrorResponse) => {});
    this.form.enable();
  }
}
