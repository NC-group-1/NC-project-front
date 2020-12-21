import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/auth/authentication.service";
import {Router} from "@angular/router";
import {ThemePalette} from "@angular/material/core";
import {HttpClientService} from "../../services/users/http-client.service";
import {ProjectService} from "../../services/projects/project.service";
import {DetailsTestCaseModel} from "../../../models/DetailsTestCaseModel";
import {ReportModel} from "../../../models/ReportModel";
import {ActionInstRun} from "../../../models/ActionInstRun";
import {ProjectModel} from "../../../models/ProjectModel";

declare var $: any;

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

  emptyInvalid = false;
  creating: boolean;
  reportFormGroup = new FormGroup({
    emailUser: new FormControl('', [Validators.required, Validators.email])
  });

  project: Task = {
    name: 'Project',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Name', completed: false, color: 'primary'},
      {name: 'Link', completed: false, color: 'primary'}
    ]
  };
  testCase: Task = {
    name: 'TestCase',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Name', completed: false, color: 'primary'},
      {name: 'Creator', completed: false, color: 'primary'},
      {name: 'Starter', completed: false, color: 'primary'},
      {name: 'Started date', completed: false, color: 'primary'},
      {name: 'Finished date', completed: false, color: 'primary'},
      {name: 'Status', completed: false, color: 'primary'}
    ]
  };
  actionInst: Task = {
    name: 'Action and Compound',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Name', completed: false, color: 'primary'},
      {name: 'Status', completed: false, color: 'primary'}
    ]
  };

  allCompleteProjects: boolean = false;
  allCompleteTestCase: boolean = false;
  allCompleteActionInst: boolean = false;
  isError: boolean;
  emails: string[] = [];

  reportModelReceive: ReportModel = {};
  reportModel: ReportModel = {};

  constructor(private auth: AuthenticationService,
            private projectService: ProjectService,
            private router: Router) {
    console.log(this.router.getCurrentNavigation().extras.state);
    //this.reportModel.testCaseDetailsDto = new DetailsTestCaseModel();
    this.reportModelReceive.testCaseDetailsDto = this.router.getCurrentNavigation().extras.state;
  }



  ngOnInit(): void {
  }

  updateAllCompleteProject() {
    this.allCompleteProjects = this.project.subtasks != null && this.project.subtasks.every(t => t.completed);
  }
  updateAllCompleteTestCase() {
    this.allCompleteTestCase = this.testCase.subtasks != null && this.testCase.subtasks.every(t => t.completed);
  }
  updateAllCompleteAction() {
    this.allCompleteActionInst = this.actionInst.subtasks != null && this.actionInst.subtasks.every(t => t.completed);
  }

  someCompleteProject(): boolean {
    if (this.project.subtasks == null) {
      return false;
    }
    return this.project.subtasks.filter(t => t.completed).length > 0 && !this.allCompleteProjects;
  }
  someCompleteTestCase(): boolean {
    if (this.testCase.subtasks == null) {
      return false;
    }
    return this.testCase.subtasks.filter(t => t.completed).length > 0 && !this.allCompleteTestCase;
  }
  someCompleteAction(): boolean {
    if (this.actionInst.subtasks == null) {
      return false;
    }
    return this.actionInst.subtasks.filter(t => t.completed).length > 0 && !this.allCompleteActionInst;
  }

  setAllProject(completed: boolean) {
    this.allCompleteProjects = completed;
    if (this.project.subtasks == null) {
      return;
    }
    this.project.subtasks.forEach(t => t.completed = completed);
  }

  setAllTestCase(completed: boolean) {
    this.allCompleteTestCase = completed;
    if (this.testCase.subtasks == null) {
      return;
    }
    this.testCase.subtasks.forEach(t => t.completed = completed);
  }

  setAllAction(completed: boolean) {
    this.allCompleteActionInst = completed;
    if (this.actionInst.subtasks == null) {
      return;
    }
    this.actionInst.subtasks.forEach(t => t.completed = completed);
  }


  modalShow() {
    this.router.navigateByUrl('testCase/details/2');
  }

  sendReport(): void {
    if (!this.emptyInvalid && this.reportFormGroup.valid) {
      this.emails.forEach(
        email => {
          this.reportModel = JSON.parse(JSON.stringify(this.reportModelReceive));
          !this.project.subtasks[0].completed ? this.reportModel.testCaseDetailsDto.project.name = null : this.reportModel.testCaseDetailsDto.project.name;
          !this.project.subtasks[1].completed ? this.reportModel.testCaseDetailsDto.project.link = null : this.reportModel.testCaseDetailsDto.project.link;

          !this.testCase.subtasks[0].completed ? this.reportModel.testCaseDetailsDto.name = null : this.reportModel.testCaseDetailsDto.name;
          !this.testCase.subtasks[1].completed ? this.reportModel.testCaseDetailsDto.creator = null : this.reportModel.testCaseDetailsDto.creator;
          !this.testCase.subtasks[2].completed ? this.reportModel.testCaseDetailsDto.starter = null : this.reportModel.testCaseDetailsDto.starter;
          !this.testCase.subtasks[3].completed ? this.reportModel.testCaseDetailsDto.startDate = null : this.reportModel.testCaseDetailsDto.startDate;
          !this.testCase.subtasks[4].completed ? this.reportModel.testCaseDetailsDto.finishDate = null : this.reportModel.testCaseDetailsDto.finishDate;
          !this.testCase.subtasks[5].completed ? this.reportModel.testCaseDetailsDto.status = null : this.reportModel.testCaseDetailsDto.status;

          !this.actionInst.subtasks[0].completed ? this.reportModel.testCaseDetailsDto.actionInstRunDtos.map(value => {value.actionName = null; value.compoundName = null}) : this.reportModel.testCaseDetailsDto.actionInstRunDtos;
          !this.actionInst.subtasks[1].completed ? this.reportModel.testCaseDetailsDto.actionInstRunDtos.map(value => value.status = null) : this.reportModel.testCaseDetailsDto.actionInstRunDtos;

          this.reportModel.email = email;
          this.projectService.sendReport(this.reportModel).subscribe(
            () => {},
            error => console.log(error)
          );
          // this.router.navigate(['testCase/details/2'], {queryParams: {created: true}});
        }
      );
    } else {
      this.isError = true;
    }
  }

  closeAlert(): void {
    $('.alert').alert('close');
  }

  addRecipient(emailUser: any) {
    this.emails.push(emailUser);
    console.log(this.emails);
  }

  deleteSkill(i: number) {
    this.emails.splice(i, 1);
  }
}
