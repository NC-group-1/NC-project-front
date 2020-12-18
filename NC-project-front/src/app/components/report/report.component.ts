import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/auth/authentication.service";
import {ResetPasswordService} from "../../services/reset-pass/reset-password.service";
import {Router} from "@angular/router";
import {ThemePalette} from "@angular/material/core";


export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  reportFormGroup = new FormGroup({
    emailUser: new FormControl('', [Validators.required, Validators.email]),
    roleUser: new FormControl('', [Validators.required]),
  });

  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Primary', completed: false, color: 'primary'},
      {name: 'Accent', completed: false, color: 'accent'},
      {name: 'Warn', completed: false, color: 'warn'}
    ]
  };

  allComplete: boolean = false;
  constructor(private auth: AuthenticationService,
              private passwordService: ResetPasswordService,
              private router: Router) { }

  ngOnInit(): void {
  }

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => t.completed = completed);
  }

  sendReport(email: string): void {
    this.auth.register({
      email: email,
    }).subscribe(() => {
        this.passwordService.sendCodeOnEmail(email).subscribe(
          () => {
          },
          error => console.log(error)
        );
      }, error => console.log(error)
    );
    this.router.navigate(['testCase/details/2'], {queryParams: {created: true}});
  }

  modalShow() {
    this.router.navigateByUrl('testCase/details/2');
  }
}
