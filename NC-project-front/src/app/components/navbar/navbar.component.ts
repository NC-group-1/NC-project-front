import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {ActivatedRoute} from '@angular/router';
import {ProfileService} from '../../services/profile/profile.service';
import {UserModel} from '../../../models/UserModel';
import {UserDataModel} from '../../../models/UserDataModel';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: UserDataModel;
  notifications = [{description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
      '          sed do eiusmod tempor incididunt' +
      '          ut' +
      '          labore et dolore magna aliqua. Ut enim ad minim veniam, quis' +
      '          mollit anim id est laborum.'}, {description: 'Notification 2'}, {description: 'Notification 3'},
    {description: 'Notification 4'}];
  username: string;
  loggedIn: boolean;
  constructor(private auth: AuthenticationService, private profileService: ProfileService) {
    auth.authSubscribe().subscribe(value => {
      this.loggedIn = value;
      if (!!value){
        setTimeout(() => {
          this.username = this.auth.getUsername();
          this.profileService.getUserByEmail(this.username).subscribe(user => {
            this.user = user;
          });
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

  remove(i: number): void {
    this.notifications.splice(i, 1);
  }
}
