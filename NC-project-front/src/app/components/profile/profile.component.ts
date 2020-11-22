import { Component, OnInit } from '@angular/core';
import {UserModel} from '../../../models/UserModel';
import {ActivatedRoute} from '@angular/router';
import {UserDataModel} from '../../../models/UserDataModel';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: UserDataModel;

  constructor(private activatedRoute: ActivatedRoute){
    this.activatedRoute.params.subscribe(param => {
      this.user = this.activatedRoute.snapshot.data.user;
    });
  }

  ngOnInit(): void{
  }

}
