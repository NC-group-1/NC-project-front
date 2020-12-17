import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute, Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {WebSocketService} from "../../services/webSocket/web-socket.service";
import {AuthenticationService} from "../../services/auth/authentication.service";
import {DetailsTestCaseModel} from "../../../models/DetailsTestCaseModel";
import {ActionInstRun} from "../../../models/ActionInstRun";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {TestCaseService} from "../../services/testCase/test-case.service";

export interface TestCase {
  id: number;
  name: string;
  dataset: string;
  result: string;
  status: string;
}

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
export class DetailsComponent implements OnInit,AfterViewInit {
  // actionInst: TestCase[] = [
  //   {id: 1, name: 'Compound 1', dataset: 'Dataset 1', result: 'Result 1', status: 'failed'},
  //   {id: 2, name: 'Action 2', dataset: 'Dataset 3', result: 'Result 5', status: 'passed'},
  //   {id: 3, name: 'Compound 3', dataset: 'Dataset 3', result: 'Result 6', status: 'failed'},
  //   {id: 4, name: 'Compound 4', dataset: 'Dataset 4', result: 'Result 3', status: 'passed'},
  //   {id: 5, name: 'Action 3', dataset: 'Dataset 5', result: 'Result 2', status: 'failed'},
  //   {id: 6, name: 'Compound 3', dataset: 'Dataset 2', result: 'Result 4', status: 'passed'},
  //   {id: 7, name: 'Action 6', dataset: 'Dataset 2', result: 'Result 4', status: 'passed'},
  //   {id: 8, name: 'Action 4', dataset: 'Dataset 7', result: 'Result 3', status: 'failed'}];
  // testCase: DetailsTestCaseModel;
  actionInst: ActionInstRun[];
  testCase: DetailsTestCaseModel;
  size: number;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'dataset', 'status'];
  expandedElement: TestCase | null;
  length: number;
  stompCase;
  username: string;
  detailsProgress: ActionInstRun[] = [];
  id: number;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private router: Router,
              private auth: AuthenticationService,
              public activatedRoute: ActivatedRoute,
              private webSocketService: WebSocketService,
              private tcService: TestCaseService) {
    this.id = 1; //***********************************************************************************//
    this.tcService.getTestCaseDetailsById(this.id)
      .subscribe(
        value => this.testCase = value
      );
    this.stompCase = this.webSocketService.connect();
    this.stompCase.connect({}, () => {
      this.tcService.getAllActionInstRun(this.id).subscribe(value => {
        console.log(value);
        this.stompCase.send('/api/test-case/actionInst/tc', {}, +this.id);
        this.stompCase.subscribe('/topic/actionInst/'+this.id, response => {
          console.log(JSON.parse(response.body));
          this.detailsProgress.push(JSON.parse(response.body));
        });
      });
    });
  }


  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(() => {
      this.dataSource = new MatTableDataSource<any>(this.actionInst);
    });
  }

}

