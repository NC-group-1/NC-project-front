import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClientService} from '../../services/projects/http-client.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  form: FormGroup;

  constructor(private httpClientService: HttpClientService, private router: Router) {
    this.form = new FormGroup({
      name: new FormControl(null),
      link: new FormControl(null),
      user_id: new FormControl(null)
    });
  }

  ngOnInit(): void {

  }

  createProject() {
    this.form.value.user_id = 1;
    this.httpClientService.postProject(this.form.value)
      .subscribe(
        response => console.log(response),
        error => console.log(error)
      );
    this.router.navigateByUrl('/listProject');
  }
}
