import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PageEvent} from '@angular/material/paginator';
import {RunningTestCaseService} from '../../services/running-test-case/running-test-case.service';
import {TestCaseResponseModel} from '../../../models/TestCaseResponseModel';
import {TestCaseModel} from '../../../models/TestCaseModel';
import {WatcherModel} from '../../../models/WatcherModel';
import {UserResponseModel} from '../../../models/UserResponseModel';
import {UserListModel} from '../../../models/UserListModel';
import {UserDataModel} from '../../../models/UserDataModel';
import {Sort} from '@angular/material/sort';
import {ThemePalette} from '@angular/material/core';
import {MatSort} from '@angular/material/sort';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import {MatSnackBar} from "@angular/material/snack-bar";
import {animate, state, style, transition, trigger} from '@angular/animations';

/**
 * @title Table with expandable rows
 */

 @Component({
   selector: 'app-running-test-case',
   templateUrl: './running-test-case.component.html',
   styleUrls: ['./running-test-case.component.scss'],
   animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
 })

export class RunningTestCaseComponent implements OnInit {
  columnsToDisplay = ['id', 'name', 'starter_id', 'watcher_numb', 'status', 'stop/run'];
  responseRunningTestCase?: TestCaseResponseModel;
  responseListWatcher?: UserResponseModel;
  responseListUser?: UserResponseModel;
  runningListTestCase: TestCaseModel[];
  watcherList: UserDataModel[];
  dataSource: any;
  dataSource2: any;

  length = 0;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 15];
  filter = '';
  orderBy = '';
  order = '';

  columnsToDisplay2 = ['user_id', 'name', 'surname', 'role'];
  expandedElement: TestCaseModel[] | null;

  watchersCtrl = new FormControl();
  filteredWatchers: Observable<UserDataModel[]>;
  userList: UserDataModel[];
  selectedUserID: number;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private _snackBar: MatSnackBar, private runningTestCaseService: RunningTestCaseService) {
    this.runningListTestCase = [];
    this.dataSource = new MatTableDataSource();
    this.watcherList = [];
    this.userList = [];
    this.dataSource2 = new MatTableDataSource();
    this.selectedUserID = 0;

    this.filteredWatchers = this.watchersCtrl.valueChanges
        .pipe(
          startWith(''),
          map(user => user ? this._filterUserList(user) : this.userList.slice())
        );
  }

  ngOnInit(): void {
    this.reloadRunningTestCases();
    this.reloadUsers('');
  }

  reloadRunningTestCases(): void {
    this.runningTestCaseService.getPaginatedRunningTestCases(this.pageSize, this.pageIndex + 1, this.filter, this.orderBy, this.order)
      .subscribe(
        response => {
          this.responseRunningTestCase = response;
          this.runningListTestCase = response.list;
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

  _filterUserList(value: string): UserDataModel[] {
    const filterValue = value.toLowerCase();
    return this.userList.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }

  updateUserID(index:any){
    this.selectedUserID = index;
  }



  reloadWatchers(index: number): void {
    this.runningTestCaseService.getWatcherByTestCaseId(index).subscribe(
      response => {
        this.responseListWatcher = response;
        this.watcherList = response.list;
        this.dataSource2 = new MatTableDataSource(this.watcherList);
      },
      error => console.log(error)
    );
  }

  reloadUsers(name: string): void {
    this.runningTestCaseService.getSearchedUsers(name).subscribe(
      response => {
        this.responseListUser = response;
        this.userList = response.list;
      },
      error => console.log(error)
    );
  }

  addWatcher(test_case_id: number): boolean {
    if (!this.watcherList.some(element => element.userId === this.selectedUserID) && (this.selectedUserID != 0)){
      const watcher: WatcherModel = {user_id: this.selectedUserID, test_case_id: test_case_id};
      this.runningTestCaseService.postWatcher(watcher)
        .subscribe(
          response => {console.log(response);this.reloadWatchers(test_case_id);},
          error => console.log(error)
        );
        return true;
    } else {
      return false;
    }
  }

  applyFilter(event: Event) {
    this.filter = (event.target as HTMLInputElement).value;
    this.reloadRunningTestCases();
  }

  sortData(): void{
    this.order = this.sort.direction.toUpperCase();
    this.orderBy = this.sort.active;
    this.reloadRunningTestCases();
  }

  onPaginationChange(pageEvent: PageEvent): void {
    this.pageSize = pageEvent.pageSize;
    this.pageIndex = pageEvent.pageIndex;
    this.reloadRunningTestCases();
  }

  updateStatus (value, test_case_id){
    const test_case = this.runningListTestCase.find(element => element.id === test_case_id);
    if (value.checked === true) {
      test_case.status = 'Running';
    } else {
      test_case.status = 'Stopped';
    }
  }

  onChangeStatus(test_case_id) {
    const body = this.runningListTestCase.find(element => element.id === test_case_id);
      this.runningTestCaseService.updateRunningTestCase(body)
        .subscribe(
          response => console.log(response),
          error => console.log(error)
        );
  }

}
