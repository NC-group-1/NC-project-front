import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserDataModel} from '../../../models/UserDataModel';
import {DatePipe} from '@angular/common';
import {FormControl, FormGroup} from '@angular/forms';
import {ProfileService} from '../../services/profile/profile.service';

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

  constructor(private activatedRoute: ActivatedRoute, private profileService: ProfileService) {
    this.activatedRoute.params.subscribe(param => {
      this.user = this.activatedRoute.snapshot.data.user;
    });
  }

  ngOnInit(): void {
    this.setEditFalse();
    this.form = new FormGroup({
      name: new FormControl(null),
      surname: new FormControl(null),
      aboutMe: new FormControl(null)
    });
  }

  setEditFalse(): void {
    this.editing = false;
    this.nameEditing = false;
    this.surnameEditing = false;
    this.aboutMeEditing = false;
  }

  nameEdit(): void {
    this.editing = !this.editing;
    this.nameEditing = !this.nameEditing;
  }

  surnameEdit(): void {
    this.editing = !this.editing;
    this.surnameEditing = !this.surnameEditing;
  }

  aboutMeEdit(): void {
    this.editing = !this.editing;
    this.aboutMeEditing = !this.aboutMeEditing;
  }

  updateProfile(): void {
    this.setEditFalse();
    this.profileService.updateUserProfile(
      {
        userId: parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10),
        name: this.form.value.name,
        surname: this.form.value.surname,
        aboutMe: this.form.value.aboutMe,
      }).subscribe(value =>
      this.profileService.getUserById(parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10))
        .subscribe(value1 => this.user = value1));
  }
}
