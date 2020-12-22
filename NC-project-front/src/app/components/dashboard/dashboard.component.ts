import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ActivatedRoute, Router} from '@angular/router';
import {PageModel} from '../../../models/PageModel';
import {DashboardService} from '../../services/dashboard/dashboard.service';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import {DetailsTestCaseModel} from '../../../models/DetailsTestCaseModel';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {Status} from 'tslint/lib/runner';
import {TestingStatus} from '../../../models/TestingStatus';
import {Test} from 'tslint';
import {TestCaseStatisticModel} from '../../../models/TestCaseStatisticModel';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dataSource = new MatTableDataSource<DetailsTestCaseModel>();
  statistic = new TestCaseStatisticModel();
  displayedColumns: string[] = ['name', 'created', 'finished', 'project', 'status'];
  length = 0;
  pageSize = 5;
  pageIndex = 0;
  userId: any;
  pageSizeOptions: number[] = [5, 20, 50, 100];
  dashboardTableForm: FormGroup;
  testCasesPage: PageModel<DetailsTestCaseModel>;

  barChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  barChartLabels: Label[] = ['Passed', 'Failed'];
  barChartType: ChartType = 'bar';
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [{
    data: [this.statistic.passedCount, this.statistic.failedCount],
  }];

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private dashboardService: DashboardService,
              private auth: AuthenticationService) {
    this.dashboardTableForm = this.formBuilder.group({
      orderBy: new FormControl('finish_date'),
      order: new FormControl('ASC')
    });
    this.userId = parseInt(auth.getId(), 10);
  }

  ngOnInit(): void {
    this.reloadTestCases();
  }

  reloadTestCases(): void {
    this.dashboardService.getPaginatedTestCases(
      this.pageIndex,
      this.pageSize,
      this.dashboardTableForm.value.orderBy,
      this.dashboardTableForm.value.order,
      this.userId
    ).subscribe((data: PageModel<DetailsTestCaseModel>) => {
        this.dataSource.data = data.list;
        this.length = data.size;
      },
      error => console.log(error)
    );

    this.dashboardService.getTestCasesStatistic(this.userId)
      .subscribe((statistic: TestCaseStatisticModel) => {
        this.statistic = statistic;
        this.barChartData = [{
          data: [statistic.passedCount, statistic.failedCount],
        }];
      });
  }

  onPaginationChange(pageEvent: PageEvent): void {
    this.pageSize = pageEvent.pageSize;
    this.pageIndex = pageEvent.pageIndex;
    this.reloadTestCases();
  }

}
