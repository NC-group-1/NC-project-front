import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/auth/authentication.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  username: string;
  loggedIn: boolean;
  constructor(private auth: AuthenticationService) {
    auth.authSubscribe().subscribe(value => {
      this.loggedIn = value;
      if (!!value){
        setTimeout(() => {
          this.username = this.auth.getUsername();
        }, 50);
      }
    });
  }

  ngOnInit(): void {
  }
  logout(): void {
    this.username = null;
    this.auth.logout();
  }

}
