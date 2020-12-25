import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute, Router} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {WebSocketService} from '../../services/webSocket/web-socket.service';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {DetailsTestCaseModel} from '../../../models/DetailsTestCaseModel';
import {ActionInstRun} from '../../../models/ActionInstRun';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {TestCaseService} from '../../services/testCase/test-case.service';
import {TestCaseProgressModel} from '../../../models/TestCaseProgressModel';

// export interface TestCase {
//   id: number;
//   name: string;
//   dataset: string;
//   result: string;
//   status: string;
// }

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DetailsComponent implements OnInit {
  // actionInst: TestCase[] = [
  //   {id: 1, name: 'Compound 1', dataset: 'Dataset 1', result: 'Result 1', status: 'failed'},
  //   {id: 2, name: 'Action 2', dataset: 'Dataset 3', result: 'Result 5', status: 'passed'},
  //   {id: 3, name: 'Compound 3', dataset: 'Dataset 3', result: 'Result 6', status: 'failed'},
  //   {id: 4, name: 'Compound 4', dataset: 'Dataset 4', result: 'Result 3', status: 'passed'},
  //   {id: 5, name: 'Action 3', dataset: 'Dataset 5', result: 'Result 2', status: 'failed'},
  //   {id: 6, name: 'Compound 3', dataset: 'Dataset 2', result: 'Result 4', status: 'passed'},
  //   {id: 7, name: 'Action 6', dataset: 'Dataset 2', result: 'Result 4', status: 'passed'},
  //   {id: 8, name: 'Action 4', dataset: 'Dataset 7', result: 'Result 3', status: 'failed'}];
  testCase: DetailsTestCaseModel;
  size: number;
  dataSource = new MatTableDataSource<ActionInstRun>([]);
  columnToDisplay = ['actionName', 'dataSetName', 'status'];
  expandedElement: ActionInstRun[] | null;
  length: number;
  stompCase;
  username: string;
  detailsProgress: ActionInstRun[];
  id: number;
  tcProgress: TestCaseProgressModel;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(private router: Router,
              private auth: AuthenticationService,
              public activatedRoute: ActivatedRoute,
              private webSocketService: WebSocketService,
              private tcService: TestCaseService) {
    this.id = parseInt(this.router.url.split('/')[3], 10);
    this.dataSource.paginator = this.paginator;
    this.detailsProgress = [];
  }

  private reloadTestCaseDetails(id: number) {
    this.tcService.getTestCaseDetailsById(id)
      .subscribe(value => {
        this.testCase = value;
        this.stompCase = this.webSocketService.connect();
        this.stompCase.connect({}, () => {
          this.subscribeOnTcProgress(id);
          if (value.status === 'IN_PROGRESS' || value.status === 'STOPPED') {
            this.subscribeOnActionInstUpdates(id);
          } else {
            this.tcService.getAllActionInstRun(id).subscribe(actionInstRuns => {
              this.testCase.actionInstRunDtos = actionInstRuns;
              console.log(this.testCase);
              // this.dataSource = new MatTableDataSource(actionInstRuns);
              this.dataSource.data = actionInstRuns;
            });
          }
        });
      });
  }

  private subscribeOnActionInstUpdates(id: number) {
    this.stompCase.send('/app/actionInst/tc', {}, +this.id);
    this.stompCase.subscribe('/topic/actionInst/' + this.id, response => {
      console.log(JSON.parse(response.body));
      const data = this.dataSource.data;
      JSON.parse(response.body).forEach(actionInstRun => {
        data.push(actionInstRun);
      });
      this.dataSource.data = data;
    });
  }

  private subscribeOnTcProgress(id: number) {
    this.stompCase.send('/app/progress/tc', {}, id);
    this.stompCase.subscribe('/topic/progress/' + id, progress => {
      this.tcProgress = JSON.parse(progress.body);
      if (this.tcProgress.progress === 1 && this.tcProgress.status === 'IN_PROGRESS') {
        this.reloadTestCaseDetails(this.id);
      }
    });
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(() => {
      // this.dataSource = new MatTableDataSource(this.detailsProgress);
    });
    this.reloadTestCaseDetails(this.id);
  }

}

