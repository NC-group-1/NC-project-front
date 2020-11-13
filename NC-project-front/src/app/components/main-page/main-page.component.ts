import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/auth/authentication.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  username: string;
  isAuth: boolean;
  constructor(private auth: AuthenticationService) {
    auth.authSubscribe().subscribe(value => {
      this.isAuth = value;
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
    this.auth.logout();
  }

}
