import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserDataModel} from '../../../models/UserDataModel';
import {DatePipe} from '@angular/common';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: UserDataModel;
  editing: boolean;
  nameEditing: boolean;
  surnameEditing: boolean;
  aboutMeEditing: boolean;
  form: FormGroup;
  constructor(private activatedRoute: ActivatedRoute){
    this.activatedRoute.params.subscribe(param => {
      this.user = this.activatedRoute.snapshot.data.user;
    });
  }

  ngOnInit(): void{
    this.editing = false;
    this.nameEditing = false;
    this.surnameEditing = false;
    this.aboutMeEditing = false;
    this.form = new FormGroup({
      name: new FormControl(null),
      surname: new FormControl(null),
      aboutMe: new FormControl(null)
    });
  }

  nameEdit(): void{
    this.editing = !this.editing;
    this.nameEditing = !this.nameEditing;
  }
  surnameEdit(): void{
    this.editing = !this.editing;
    this.surnameEditing = !this.surnameEditing;
  }
  aboutMeEdit(): void{
    this.editing = !this.editing;
    this.aboutMeEditing = !this.aboutMeEditing;
  }
}
