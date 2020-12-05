import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClientService} from '../../services/projects/http-client.service';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {UserDataModel} from "../../../models/UserDataModel";
import {AuthenticationService} from "../../services/auth/authentication.service";
import {ProjectModel} from "../../../models/ProjectModel";

declare var $: any;

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  form: FormGroup;
  user: UserDataModel;
  project: ProjectModel;
  user_id: number;
  isError = false;
  creating = false;

  constructor(private activatedRoute: ActivatedRoute,
              private httpClientService: HttpClientService,
              private router: Router,
              private auth: AuthenticationService) {
    // console.log(auth.getRole().toString());
    // console.log(auth.getId());
    console.log(parseInt(auth.getId(),10));
    this.user_id = parseInt(auth.getId(),10);
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      link: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  createProject() {
    if(this.creating && this.form.valid){
    this.httpClientService.postProject({
      name: this.form.value.name,
      link: this.form.value.link,
      user_id: this.user_id
    })
      .subscribe(
        response => console.log(response),
        error => console.log(error)
      );
      this.router.navigateByUrl('/listProject');
    } else this.isError = true;
  }

  closeAlert(): void {
    $('.alert').alert('close');
  }

  modalShow() {
    this.router.navigateByUrl('/listProject');
  }
}
