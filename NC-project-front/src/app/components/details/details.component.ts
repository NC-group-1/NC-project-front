import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSort, Sort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

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
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit,AfterViewInit {
  testCase: TestCase[] = [
    {id: 1, name: 'Compound 1', dataset: 'Dataset 1', result: 'Result 1', status: 'failed'},
    {id: 2, name: 'Action 2', dataset: 'Dataset 3', result: 'Result 5', status: 'passed'},
    {id: 3, name: 'Compound 3', dataset: 'Dataset 3', result: 'Result 6', status: 'failed'},
    {id: 4, name: 'Compound 4', dataset: 'Dataset 4', result: 'Result 3', status: 'passed'},
    {id: 5, name: 'Action 3', dataset: 'Dataset 5', result: 'Result 2', status: 'failed'},
    {id: 6, name: 'Compound 3', dataset: 'Dataset 2', result: 'Result 4', status: 'passed'},
    {id: 7, name: 'Action 6', dataset: 'Dataset 2', result: 'Result 4', status: 'passed'},
    {id: 8, name: 'Action 4', dataset: 'Dataset 7', result: 'Result 3', status: 'failed'}];
  size: number;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'dataset', 'result', 'status'];
  length: number;
  sortedData: TestCase[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private router: Router, public activatedRoute: ActivatedRoute) {
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  ngOnInit(): void {
    this.activatedRoute.data.subscribe(() => {
      this.dataSource = new MatTableDataSource<any>(this.testCase);
    });
  }

}

