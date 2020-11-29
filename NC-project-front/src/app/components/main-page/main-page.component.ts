import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  userId: number;
  username: string;
  loggedIn: boolean;
  token1: string;
  constructor(private auth: AuthenticationService, private router: Router) {
    auth.authSubscribe().subscribe(value => {
      this.loggedIn = value;
      if (!!value){
        setTimeout(() => {
          this.username = this.auth.getUsername();
        }, 50);
      }else {
        // this.router.navigate(['login']);
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
