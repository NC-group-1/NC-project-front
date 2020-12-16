import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {TestCaseHistory} from '../../../models/TestCaseHistory';
import {ActivatedRoute, Router} from '@angular/router';
import {ScenarioService} from '../../services/scenario/scenario.service';
import {TestCaseHistoryService} from '../../services/test-case-history/test-case-history.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DataSetService} from '../../services/data-set/data-set.service';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {DataSetGeneralInfoDtoPage} from '../../../models/data-set-general-info-dto-page';
import {HttpErrorResponse} from '@angular/common/http';
import {PageModel} from "../../../models/PageModel";
import {DataSetGeneralInfoDto} from "../../../models/data-set-general-info-dto";

@Component({
  selector: 'app-test-case-history',
  templateUrl: './test-case-history.component.html',
  styleUrls: ['./test-case-history.component.css']
})
export class TestCaseHistoryComponent implements OnInit {
  currentPage: number;
  size: number;
  dataSource = new MatTableDataSource<TestCaseHistory>();
  length: number;
  created: boolean;
  projectId: any;
  testCaseTableForm: FormGroup;
  manageTestCaseForm: FormGroup;
  displayedColumns: string[] = ['tc.name', 'role', 'finish_date', 'ts.name',
    'status'];
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions: number[] = [10, 20, 50, 100];
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private testCaseHistoryService: TestCaseHistoryService,
              private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private router: ActivatedRoute) {
    this.testCaseTableForm = this.formBuilder.group({
      filter: new FormControl(''),
      orderBy: new FormControl('tc.name'),
      order: new FormControl('ASC')
    });
    this.manageTestCaseForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      id: new FormControl(null),
      createdById: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.projectId = this.router.snapshot.paramMap.get('projectId');
    this.reloadTestCases();
  }

  reloadTestCases(): void {
    this.testCaseHistoryService.getPaginatedCaseHistory(
      this.pageSize,
      this.pageIndex,
      this.testCaseTableForm.value.filter,
      this.testCaseTableForm.value.orderBy,
      this.testCaseTableForm.value.order,
      this.projectId)
      .subscribe( (data: PageModel<TestCaseHistory>) => {
        this.dataSource.data = data.list;
        this.length = data.size;
      }, (error: HttpErrorResponse) => {
        console.log(error);
      });
  }
  onPaginationChange(pageEvent: PageEvent): void {
    this.pageSize = pageEvent.pageSize;
    this.pageIndex = pageEvent.pageIndex;
    this.reloadTestCases();
  }

  applyFilter() {
    if (this.pageIndex !== 0) {
      this.paginator.firstPage();
    }
    this.reloadTestCases();
  }

  sortData(): void{
    this.testCaseTableForm.value.order = this.sort.direction.toUpperCase();
    this.testCaseTableForm.value.orderBy = this.sort.active;
    this.reloadTestCases();
  }
}