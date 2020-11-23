import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {ProfileService} from '../../services/profile/profile.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {


  constructor(public router: Router) {
  }

  ngOnInit(): void {
  }

}
