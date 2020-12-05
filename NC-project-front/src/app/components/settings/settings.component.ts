import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {ResetPasswordService} from '../../services/reset-pass/reset-password.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  sent: boolean;

  constructor(private auth: AuthenticationService, private router: Router, private passwordService: ResetPasswordService) {
    this.sent = false;
  }

  ngOnInit(): void {
  }

  sendCode(): void {
    this.sent = true;
    this.passwordService.sendCodeOnEmail(this.auth.getUsername()).subscribe(
      value => {
      }, error => {
      });
  }
}
