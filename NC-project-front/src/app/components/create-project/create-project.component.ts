import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClientService} from '../../services/projects/http-client.service';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {UserDataModel} from "../../../models/UserDataModel";
import {AuthenticationService} from "../../services/auth/authentication.service";



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
    // console.log(auth.getId());
    console.log(parseInt(auth.getId(),10));
    this.user_id = parseInt(auth.getId(),10);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null),
      link: new FormControl(null)
    });
  }

  createProject() {
    this.httpClientService.postProject({
      user_id: this.user_id,
      name: this.form.value.name,
      link: this.form.value.link
    })
      .subscribe(
        response => console.log(response),
        error => console.log(error)
      );
    this.router.navigateByUrl('/listProject');
  }
}
