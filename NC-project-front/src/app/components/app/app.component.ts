import { Component } from '@angular/core';
import {AuthenticationService} from '../../services/auth/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NC-project-front';
  loggedIn: boolean;
  constructor(private auth: AuthenticationService) {
    auth.authSubscribe().subscribe(value => {
      this.loggedIn = value;
    });
  }
}
