import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserDataModel} from '../../../models/UserDataModel';
import {DatePipe} from '@angular/common';
import {FormControl, FormGroup} from '@angular/forms';
import {ProfileService} from '../../services/profile/profile.service';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {TestCaseStatisticModel} from "../../../models/TestCaseStatisticModel";
import {DashboardService} from "../../services/dashboard/dashboard.service";

declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: UserDataModel;
  hasEditingPermission: boolean;
  editing: boolean;
  nameEditing: boolean;
  surnameEditing: boolean;
  aboutMeEditing: boolean;
  form: FormGroup;
  statistic: TestCaseStatisticModel;

  constructor(private activatedRoute: ActivatedRoute,
              private profileService: ProfileService,
              private dashboardService: DashboardService,
              private auth: AuthenticationService) {
    this.activatedRoute.params.subscribe(param => {
      this.user = this.activatedRoute.snapshot.data.user;
      if (auth.getRole() === 'ROLE_ADMIN' || auth.getUsername() === this.user.email ){
        this.hasEditingPermission = true;
      }
    });
  }

  ngOnInit(): void {
    this.setEditFalse();
    this.form = new FormGroup({
      name: new FormControl(null),
      surname: new FormControl(null),
      aboutMe: new FormControl(null)
    });
    this.dashboardService.getTestCasesStatistic(this.user.userId)
      .subscribe((statistic: TestCaseStatisticModel) => {
        this.statistic = statistic;
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
        userId: this.user.userId,
        name: this.form.value.name,
        surname: this.form.value.surname,
        imageLink: this.user.imageLink,
        aboutMe: this.form.value.aboutMe,
      }).subscribe(value =>
      this.profileService.getUserById(this.user.userId)
        .subscribe(value1 => this.user = value1));
  }

  savePicture() {
    this.profileService.updateUserProfile({
      userId: this.user.userId,
      name: this.form.value.name,
      surname: this.form.value.surname,
      imageLink: this.user.imageLink,
      aboutMe: this.form.value.aboutMe,
    }).subscribe();
  }
  modalShow() {
    $('#imageModal').modal('show');
  }
}
