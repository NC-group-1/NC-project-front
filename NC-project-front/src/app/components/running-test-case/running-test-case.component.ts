import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PageEvent} from '@angular/material/paginator';
import {ActivatedRoute, Router} from '@angular/router';
import {RunningTestCaseService} from '../../services/running-test-case/running-test-case.service';
import {ProjectService} from '../../services/projects/project.service';
import {TestCaseResponseModel} from '../../../models/TestCaseResponseModel';
import {TestCaseModel} from '../../../models/TestCaseModel';
import {WatcherModel} from '../../../models/WatcherModel';
import {UserResponseModel} from '../../../models/UserResponseModel';
import {UserListModel} from '../../../models/UserListModel';
import {Sort} from '@angular/material/sort';
import {ThemePalette} from '@angular/material/core';
import {MatSort} from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import {MatSnackBar} from "@angular/material/snack-bar";


/**
 * @title Table with expandable rows
 */

 @Component({
   selector: 'app-running-test-case',
   templateUrl: './running-test-case.component.html',
   styleUrls: ['./running-test-case.component.scss'],
 })

export class RunningTestCaseComponent implements OnInit {
  projectId: number;
  projectName: string;
  columnsToDisplay = ['id', 'name', 'starter', 'startDate', 'status', 'stop/run'];
  responseRunningTestCase?: TestCaseResponseModel;
  runningListTestCase: TestCaseModel[];
  dataSource: any;

  length = 0;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 15];
  filter = '';
  orderBy = '';
  order = '';

  @ViewChild(MatSort) sort: MatSort;

  constructor(private _snackBar: MatSnackBar, private runningTestCaseService: RunningTestCaseService, private httpClientService: ProjectService, public router: ActivatedRoute) {
    this.runningListTestCase = [];
    this.dataSource = new MatTableDataSource();
    this.projectId = parseInt(this.router.snapshot.paramMap.get('projectId'), 10);

  }

  ngOnInit(): void {
    this.reloadRunningTestCases();
    this.loadProjectName();
  }

  loadProjectName(): void {
    this.httpClientService.getProjectName(this.projectId)
      .subscribe(
        response => {
          this.projectName = response;
        },
        error => console.log(error)
      );
  }

  reloadRunningTestCases(): void {
    this.runningTestCaseService.getPaginatedRunningTestCases(this.pageSize, this.pageIndex + 1, this.filter, this.orderBy, this.order, this.projectId)
      .subscribe(
        response => {
          this.responseRunningTestCase = response;
          this.runningListTestCase = response.list;
          console.log(this.runningListTestCase);
          this.dataSource = new MatTableDataSource(this.runningListTestCase);
          this.length = response.size;
        },
        error => console.log(error)
      );
  }

  openSnackBar(message: string, type: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3500,
      panelClass: [type],
    });
  }

  applyFilter(event: Event) {
    this.filter = (event.target as HTMLInputElement).value;
    this.reloadRunningTestCases();
  }

  sortData(): void {
    this.order = this.sort.direction.toUpperCase();
    this.orderBy = this.sort.active;
    this.reloadRunningTestCases();
  }

  onPaginationChange(pageEvent: PageEvent): void {
    this.pageSize = pageEvent.pageSize;
    this.pageIndex = pageEvent.pageIndex;
    this.reloadRunningTestCases();
  }

  updateStatus(value, test_case_id) {
    const test_case = this.runningListTestCase.find(element => element.id === test_case_id);
    console.log(test_case);
    if (value.checked === true) {
      test_case.status = 'IN_PROGRESS';
    } else {
      test_case.status = 'STOPPED';
    }
  }

  onChangeStatus(test_case_id) {
    const body = this.runningListTestCase.find(element => element.id === test_case_id);
    console.log(body);
    this.runningTestCaseService.updateRunningTestCase(body)
      .subscribe(
        response => console.log(response),
        error => console.log(error)
      );
  }
}
