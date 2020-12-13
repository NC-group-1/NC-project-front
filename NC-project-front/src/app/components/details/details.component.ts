import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute, Router} from "@angular/router";
import {ScenarioService} from "../../services/scenario/scenario.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'dataset', 'result', 'status'];
  length: number;
  testCase = [
    {id: 1, name: 'Compound 1', dataset: 'Dataset', result: 'Result', status: 'failed'},
    {id: 2, name: 'Action 2', dataset: 'Dataset', result: 'Result', status: 'failed'},
    {id: 3, name: 'Compound 3', dataset: 'Dataset', result: 'Result', status: 'failed'},
    {id: 4, name: 'Action 4', dataset: 'Dataset', result: 'Result', status: 'failed'}];
  size: number;

  constructor(private router: Router, public activatedRoute: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.activatedRoute.data.subscribe(() => {
      this.dataSource = new MatTableDataSource<any>(this.testCase);
    });
  }

  sortBy(event: any): void {
    this.router.navigate([],
      {relativeTo: this.activatedRoute,
      queryParams: {orderBy: event.active, direction: event.direction},
      queryParamsHandling: 'merge'});
  }
}
