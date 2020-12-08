import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {PageEvent} from '@angular/material/paginator';
import {ActivatedRoute, Router} from '@angular/router';
import {PageModel} from '../../../models/PageModel';
import {ScenarioModel} from '../../../models/TestScenario';

@Component({
  selector: 'app-test-case',
  templateUrl: './test-scenarios.component.html',
  styleUrls: ['./test-scenarios.component.css']
})
export class TestScenariosComponent implements OnInit {

  currentPage: number;
  selectedScenario: { test_scenario_id: number, name: string, description: string, creatorName: string, active: boolean};
  size: number;
  dataSource: MatTableDataSource<any>;
  searchColumns = {columns:  ['name', 'creatorName', 'description'], selected: ''};
  sort: MatSort;
  testScenariosPage: PageModel<any>;
  // testScenarios = [
  //   {id: 1, name: 'Name 1', user: {id: 1, email: 'quantum13man@gmail.com'}, description: 'Description 1', active: true},
  //   {id: 2, name: 'Name 2', user: {id: 13, email: 'clayn130@gmail.com'}, description: 'Description 1', active: false},
  //   {id: 3, name: 'Name 3', user: {id: 1, email: 'quantum13man@gmail.com'}, description: 'Description 1', active: false},
  //   {id: 4, name: 'Name 4', user: {id: 1, email: 'quantum13man@gmail.com'}, description: 'Description 1', active: true}];
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(value => {
      this.testScenariosPage = this.activatedRoute.snapshot.data.testScenarios;
      this.currentPage = value.page;
      this.dataSource = new MatTableDataSource<any>(this.testScenariosPage.list);
    });
    this.activatedRoute.data.subscribe(value => {
      this.testScenariosPage = this.activatedRoute.snapshot.data.testScenarios;
      this.dataSource = new MatTableDataSource<any>(this.testScenariosPage.list);
    });
    this.activatedRoute.queryParams.subscribe(value => {
      this.size = !value.size ? 10 : value.size;
    });
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
  }

  pageParamsChange(event: PageEvent): void {
    this.router.navigate(['testScenarios', event.pageIndex], {
      queryParams: {size: event.pageSize}, queryParamsHandling: 'merge'});
  }

  clearQuery(): void{
    this.router.navigate([], {relativeTo: this.activatedRoute,
      queryParams: {searchBy: null}, queryParamsHandling: 'merge'});
  }
  setSearch(field: string){
    this.searchColumns.selected = this.searchColumns.selected === field ? '' : field;
  }

  find(event: any) {
    this.router.navigate([], {relativeTo: this.activatedRoute,
      queryParams: {searchBy: this.searchColumns.selected, searchValue: event.target.value}, queryParamsHandling: 'merge'});
  }
  sortBy(event: any): void {
    this.router.navigate([], {relativeTo: this.activatedRoute,
      queryParams: {orderBy: event.active, direction: event.direction}, queryParamsHandling: 'merge'});
  }
}
