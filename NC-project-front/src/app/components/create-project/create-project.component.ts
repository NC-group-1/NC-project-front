import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClientService} from '../../services/projects/http-client.service';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {UserDataModel} from "../../../models/UserDataModel";
import {ProfileService} from "../../services/profile/profile.service";
import {AuthenticationService} from "../../services/auth/authentication.service";
import {ProjectModel} from "../../../models/ProjectModel";
import {UserListModel} from "../../../models/UserListModel";


@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  form: FormGroup;
  user: UserDataModel;
  user_id: number;


  constructor(private activatedRoute: ActivatedRoute,
              private httpClientService: HttpClientService,
              private router: Router,
              private auth: AuthenticationService) {
    // console.log(auth.getRole().toString());
    // this.user_id = auth.getId();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null),
      link: new FormControl(null),
      role: new FormControl(null)
    });
  }

  createProject() {
    this.form.value.user_id = this.user_id;
    this.httpClientService.postProject(this.form.value)
      .subscribe(
        response => console.log(response),
        error => console.log(error)
      );
    this.router.navigateByUrl('/listProject');
  }
}
