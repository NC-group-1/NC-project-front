import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {PageEvent} from '@angular/material/paginator';
import {ActivatedRoute, Router} from '@angular/router';
import {PageModel} from '../../../models/PageModel';
import {ScenarioModel} from '../../../models/TestScenario';
import {ScenarioService} from '../../services/scenario/scenario.service';
import {ProjectService} from '../../services/projects/project.service';
declare var $: any;

@Component({
  selector: 'app-test-case',
  templateUrl: './test-scenarios.component.html',
  styleUrls: ['./test-scenarios.component.css']
})
export class TestScenariosComponent implements OnInit {

  currentPage: number;
  selectedScenario: { testScenarioId: number, name: string, description: string, creatorName: string, active: boolean};
  size: number;
  dataSource: MatTableDataSource<any>;
  searchColumns = {columns:  ['name', 'creatorName', 'description'], selected: ''};
  sort: MatSort;
  length: number;
  testScenarios: ScenarioModel[];
  created: boolean;
  projectId: any;
  projectName: string;
  testScenariosPage: PageModel<any>;
  // testScenarios = [
  //   {id: 1, name: 'Name 1', user: {id: 1, email: 'quantum13man@gmail.com'}, description: 'Description 1', active: true},
  //   {id: 2, name: 'Name 2', user: {id: 13, email: 'clayn130@gmail.com'}, description: 'Description 1', active: false},
  //   {id: 3, name: 'Name 3', user: {id: 1, email: 'quantum13man@gmail.com'}, description: 'Description 1', active: false},
  //   {id: 4, name: 'Name 4', user: {id: 1, email: 'quantum13man@gmail.com'}, description: 'Description 1', active: true}];
  constructor(private router: Router, public activatedRoute: ActivatedRoute, private httpClientService: ProjectService, private scService: ScenarioService) {
    this.projectId = parseInt(this.activatedRoute.snapshot.paramMap.get('projectId'),10)
    this.projectName = "";
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(value => {
      this.testScenarios = this.activatedRoute.snapshot.data.testScenarios.list;
      this.length = this.activatedRoute.snapshot.data.testScenarios.size;
      this.dataSource = new MatTableDataSource<any>(this.testScenarios);
    });
    this.activatedRoute.queryParams.subscribe(value => {
      this.currentPage = !value.page ? 0 : value.page;
      this.size = !value.size ? 10 : value.size;
    });
    this.dataSource.sort = this.sort;
    this.loadProjectName();
  }

  loadProjectName(): void {
    console.log(this.projectId);
    this.httpClientService.getProjectName(this.projectId)
      .subscribe(
        response => {
          this.projectName = response;
        },
        error => console.log(error)
      );
  }

  deleteScenario(){
    const testScenarioId = this.selectedScenario.testScenarioId;
    this.scService.deleteScenario(testScenarioId).subscribe(value => {
      const delEl = this.testScenarios.find(sc => sc.testScenarioId === testScenarioId);
      this.testScenarios.splice(this.testScenarios.indexOf(delEl), 1);
      this.selectedScenario = null;
      this.length -= 1;
      this.dataSource = new MatTableDataSource<any>(this.testScenarios);
    });
  }

  pageParamsChange(event: PageEvent): void {
    this.router.navigate([], {relativeTo: this.activatedRoute,
      queryParams: {size: event.pageSize, page: event.pageIndex}, queryParamsHandling: 'merge'});
  }

  clearQuery(): void{
    this.router.navigate([], {relativeTo: this.activatedRoute,
      queryParams: {searchBy: null},
      queryParamsHandling: 'merge'});
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

  closeAlert() {
    $('.alert').alert('close');
  }
}
