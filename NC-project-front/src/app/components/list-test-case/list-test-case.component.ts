import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {PageEvent} from '@angular/material/paginator';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {TestCaseService} from '../../services/test-case/test-case.service';
import {TestCaseResponseModel} from '../../../models/TestCaseResponseModel';
import {TestCaseModel} from '../../../models/TestCaseModel';
import {Sort} from '@angular/material/sort';
import {ThemePalette} from '@angular/material/core';
import {MatSort} from '@angular/material/sort';
import * as moment from 'moment';


interface RecTime {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-list-test-case',
  templateUrl: './list-test-case.component.html',
  styleUrls: ['./list-test-case.component.scss']
})

export class ListTestCaseComponent implements OnInit {

  selectedTestCase: string;
  displayedColumns: string[] = ['id', 'select', 'name', 'creator', 'creationDate', 'iterationsAmount', 'recurringTime','startDate', 'status','editBtn'];
  responseTestCase?: TestCaseResponseModel;
  listTestCase: TestCaseModel[];
  dataSource: any;
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions: number[] = [10, 20, 30];
  filter = '';
  orderBy = '';
  order = '';
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


  constructor(private testCaseService: TestCaseService) {
    this.minDate = moment().add(1,'day').format('YYYY-MM-DDTHH:mm');
    this.selectedTestCase = "";
    this.listTestCase = [];
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.reloadTestCases();
  }

  reloadTestCases(): void {
    this.testCaseService.getPaginatedTestCases(this.pageSize, this.pageIndex + 1, this.filter, this.orderBy, this.order)
      .subscribe(
        response => {
          this.responseTestCase = response;
          this.listTestCase = response.list;
          this.dataSource = new MatTableDataSource(this.listTestCase);
          this.length = response.size;
          // console.log(JSON.stringify(this.listUsers));
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
    this.listTestCase[index].edit = !this.listTestCase[index].edit;

    if (!this.listTestCase[index].edit) {
      this.testCaseService.updateTestCase(this.listTestCase[index])
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
