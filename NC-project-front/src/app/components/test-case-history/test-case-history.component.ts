import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {TestCaseHistory} from '../../../models/TestCaseHistory';
import {ActivatedRoute} from '@angular/router';
import {TestCaseHistoryService} from '../../services/test-case-history/test-case-history.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {ProjectService} from '../../services/projects/project.service';
import {HttpErrorResponse} from '@angular/common/http';
import {PageModel} from "../../../models/PageModel";

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
  projectName: string;
  testCaseTableForm: FormGroup;
  manageTestCaseForm: FormGroup;
  displayedColumns: string[] = ['tc.name', 'role', 'finish_date', 'ts.name', 'status'];
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions: number[] = [10, 20, 50, 100];

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private testCaseHistoryService: TestCaseHistoryService,
              private projectService: ProjectService,
              private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              public router: ActivatedRoute) {
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
    this.loadProjectName();
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

  reloadTestCases(): void {
    this.testCaseHistoryService.getPaginatedCaseHistory(
      this.pageSize,
      this.pageIndex,
      this.testCaseTableForm.value.filter,
      this.testCaseTableForm.value.orderBy,
      this.testCaseTableForm.value.order,
      this.projectId)
      .subscribe((data: PageModel<TestCaseHistory>) => {
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

  sortData(): void {
    this.testCaseTableForm.value.order = this.sort.direction.toUpperCase();
    this.testCaseTableForm.value.orderBy = this.sort.active;
    this.reloadTestCases();
  }
}
