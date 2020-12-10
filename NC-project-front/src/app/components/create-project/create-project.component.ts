import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClientService} from '../../services/projects/http-client.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from "../../services/auth/authentication.service";
import {ProjectModel} from "../../../models/ProjectModel";
import {state, style, trigger} from "@angular/animations";

declare var $: any;

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
  animations: [
    trigger('invalidForm', [
      state('invalid', style({
        animation: 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
        transform: 'translate3d(0, 0, 0)',
        perspective: '1000px',
        border: '2px solid #dc3545'
      })),
      state('', style({}))
    ])
  ],
})
export class CreateProjectComponent implements OnInit {

  form: FormGroup;
  project: ProjectModel;
  role: string;
  userId: number;
  isError = false;
  creating = false;

  constructor(private activatedRoute: ActivatedRoute,
              private httpClientService: HttpClientService,
              private router: Router,
              private auth: AuthenticationService) {
    // console.log(auth.getRole().toString());
    // console.log(auth.getId());
    this.creating = this.router.url.startsWith('/createProject');
    console.log(parseInt(auth.getId(), 10));
    this.userId = parseInt(auth.getId(), 10);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      link: new FormControl(null, [Validators.required])
    });
  }

  createProject() {
    if (this.creating && this.form.valid) {
      this.httpClientService.postProject({
        name: this.form.value.name,
        link: this.form.value.link,
        // user_id: this.userId,
        user: {
          userId: this.userId
        },
      }).subscribe(() => this.router.navigate(['listProject'], {queryParams: {created: true}}));
    } else this.isError = true;
  }

  closeAlert(): void {
    $('.alert').alert('close');
  }

  modalShow() {
    this.router.navigateByUrl('/listProject');
  }
}
