import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {PageEvent} from '@angular/material/paginator';
import {ActivatedRoute, Router} from '@angular/router';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {TestCaseService} from '../../services/list-test-case/list-test-case.service';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {TestCaseResponseModel} from '../../../models/TestCaseResponseModel';
import {TestCaseModel} from '../../../models/TestCaseModel';
import {UserListModel} from '../../../models/UserListModel';
import {ProjectService} from '../../services/projects/project.service';
import {Sort} from '@angular/material/sort';
import {ThemePalette} from '@angular/material/core';
import {MatSort} from '@angular/material/sort';
import {UserDataModel} from "../../../models/UserDataModel";
import {WatcherModel} from '../../../models/WatcherModel';
import {MatSnackBar} from "@angular/material/snack-bar";
import { Observable } from 'rxjs';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { map, startWith } from 'rxjs/operators';
import * as moment from 'moment';


interface RecTime {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-list-test-case',
  templateUrl: './list-test-case.component.html',
  styleUrls: ['./list-test-case.component.scss'],
  animations: [
   trigger('detailExpand', [
     state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
     state('expanded', style({height: '*'})),
     transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
   ]),
 ],
})

export class ListTestCaseComponent implements OnInit {
  projectId: number;
  projectName: string;
  authorizedUserId: number;

  selectedTestCase: string;
  displayedColumns: string[] = ['id', 'select', 'name', 'creator', 'creationDate', 'iterationsAmount', 'recurringTime',  'watcher_numb', 'startDate', 'status','editBtn'];
  responseTestCase?: TestCaseResponseModel;
  listTestCase: TestCaseModel[];
  dataSource: any;

  dataSource2: any;
  watcherList: UserListModel[];
  watchersCtrl = new FormControl();
  filteredWatchers: Observable<UserListModel[]>;
  userList: UserListModel[];
  selectedUserID: number;

  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions: number[] = [10, 20, 30];
  filter = '';
  orderBy = '';
  order = '';

  displayedColumns2 = ['user_id', 'name', 'surname', 'role'];
  expandedElement: TestCaseModel[] | null;

  background: ThemePalette = undefined;
  public color: ThemePalette = "primary";
  public disabled = false;
  minDate: string;
  //minDate = moment().format().toString();
  //public minDate = new Date().toString();


  selection = new SelectionModel<TestCaseModel>(true, []);
  @ViewChild(MatSort) sort: MatSort;

  rectimes: RecTime[] = [
  {value: '00:30:00', viewValue: '00:30:00'},
  {value: '01:00:00', viewValue: '01:00:00'},
  {value: '06:00:00', viewValue: '06:00:00'},
  {value: '12:00:00', viewValue: '12:00:00'},
  {value: '1 day', viewValue: '1 day'},
  {value: '7 days', viewValue: '7 days'},
  {value: '14 days', viewValue: '14 days'},
  {value: '1 mon', viewValue: '1 mon'},
  {value: '6 mon', viewValue: '6 mon'},
  {value: '1 year', viewValue: '1 year'},
  ];


  constructor(private _snackBar: MatSnackBar, private testCaseService: TestCaseService, private auth: AuthenticationService, private projectService: ProjectService, public router: ActivatedRoute) {
    this.minDate = moment().add(1,'day').format('YYYY-MM-DDTHH:mm');
    this.selectedTestCase = "";
    this.projectName = "";
    this.listTestCase = [];
    this.watcherList = [];
    this.userList = [];
    this.dataSource = new MatTableDataSource();
    this.dataSource2 = new MatTableDataSource();
    this.selectedUserID = 0;
    this.projectId = parseInt(this.router.snapshot.paramMap.get('projectId'),10);
    this.authorizedUserId = parseInt(auth.getId(), 10);

    this.filteredWatchers = this.watchersCtrl.valueChanges
        .pipe(
          startWith(''),
          map(user => user ? this._filterUserList(user) : this.userList.slice())
        );

  }

  ngOnInit(): void {
    this.reloadTestCases();
    this.reloadUsers('');
    this.loadProjectName();
  }

  openSnackBar(message: string, type: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3500,
      panelClass: [type],
    });
  }

  _filterUserList(value: string): UserListModel[] {
    const filterValue = value.toLowerCase();
    return this.userList.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }

  updateUserID(index:any){
    this.selectedUserID = index;
  }

  reloadWatchers(index: number): void {
    this.testCaseService.getWatcherByTestCaseId(index).subscribe(
      response => {
        this.watcherList = response;
        this.dataSource2 = new MatTableDataSource(this.watcherList);
      },
      error => console.log(error)
    );
  }

  reloadUsers(name: string): void {
    this.testCaseService.getSearchedUsers(name).subscribe(
      response => {
        this.userList = response;
      },
      error => console.log(error)
    );
  }

  addWatcher(test_case_id: number): boolean {
    if (!this.watcherList.some(element => element.userId === this.selectedUserID) && (this.selectedUserID != 0)){
      const watcher: WatcherModel = {user_id: this.selectedUserID, test_case_id: test_case_id};
      console.log(watcher);

      this.testCaseService.postWatcher(watcher)
        .subscribe(
          response => {console.log(response);this.reloadWatchers(test_case_id);},
          error => console.log(error)
        );
        return true;
    } else {
      return false;
    }
  }

  reloadTestCases(): void {
    this.testCaseService.getPaginatedTestCases(this.pageSize, this.pageIndex + 1, this.filter, this.orderBy, this.order, this.projectId)
      .subscribe(
        response => {
          this.responseTestCase = response;
          this.listTestCase = response.list;
          this.dataSource = new MatTableDataSource(this.listTestCase);
          this.length = response.size;
        },
        error => console.log(error)
      );
  }

  loadProjectName(): void {
    this.projectService.getProjectName(this.projectId)
      .subscribe(
        response => {
          this.projectName = response;
        },
        error => console.log(error)
      );
  }

  applyFilter(event: Event) {
    this.filter = (event.target as HTMLInputElement).value;
    this.reloadTestCases();
  }

  sortData(): void{
    this.order = this.sort.direction.toUpperCase();
    this.orderBy = this.sort.active;
    this.reloadTestCases();
  }

  delete(){
    this.selection.selected
      .forEach(element => {
          this.testCaseService.deleteTestCase(element.id)
            .subscribe(
              response => {console.log(response);
              this.reloadTestCases();this.selection.clear();},
              error => console.log(error)
            );
        }
      );
  }

  run(){
    this.selection.selected
      .forEach(element => {
          this.testCaseService.runTestCase(element.id, !element.startDate ? "RUN" : "SCHEDULE", this.authorizedUserId)
            .subscribe(
              response => {console.log(response);
              this.reloadTestCases();this.selection.clear();},
              error => console.log(error)
            )
        }
      );
  }

  updateName(index: number, name: string) {
    this.listTestCase[index].name = name;
  }

  updateStartTime(index: number, startDate: any) {
    this.listTestCase[index].startDate = startDate;
  }


  updateIterations(index: number, iterationsAmount: any) {
    this.listTestCase[index].iterationsAmount = iterationsAmount;
  }

  updateRecTime(index: number, recurringTime: string) {
    this.listTestCase[index].recurringTime = recurringTime;
  }

  change(index: number) {
    const testCase = this.listTestCase.find(element => element.id === index);
    testCase.edit = !testCase.edit;
    const newListTestCase = {...testCase};
    newListTestCase.startDate = moment.utc(new Date(newListTestCase.startDate)).format().substr(0,16);
    if (!newListTestCase.edit) {
      this.testCaseService.updateTestCase(newListTestCase)
        .subscribe(
          response => console.log(response),
          error => console.log(error)
        );
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach((row: TestCaseModel) => this.selection.select(row));
  }

  checkboxLabel(row?: TestCaseModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  onPaginationChange(pageEvent: PageEvent): void {
    this.pageSize = pageEvent.pageSize;
    this.pageIndex = pageEvent.pageIndex;
    this.reloadTestCases();
  }

}
