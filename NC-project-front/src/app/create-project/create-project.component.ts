import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClientService} from '../service/http-client.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  constructor(private httpClientService: HttpClientService, private router: Router) {}

  ngOnInit(): void {}

  createProject(nameProject: string, linkProject: string) {
    this.httpClientService.post(nameProject, linkProject)
      .subscribe(
        response => console.log(response),
        error => console.log(error)
      );

    this.router.navigateByUrl('/listProject');
  }
}
