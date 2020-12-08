import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {testActions, testDatasets} from './testData';
import {flatten} from '@angular/compiler';
import {MatSelectChange} from '@angular/material/select';

declare var $: any;

interface Dataset {
  id: number;
  name: string;
  description: string;
  creator: { id: number; email: string };
  parameters: ({ id?: number; value?: any; key: string })[];
}

@Component({
  selector: 'app-test-case',
  templateUrl: './test-case.component.html',
  styleUrls: ['./test-case.component.css']
})
export class TestCaseComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  datasets = testDatasets;
  actions = testActions;
  selectedDatasets: Dataset[] = [];
  columns = ['name', 'key', 'dataset', 'value'];
  autocompleteOptions: string[];
  dataSource: MatTableDataSource<any>;
  dsPage: number;
  dsSize: number;
  keys: string[];
  filteredKeys: string[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(value => {
    });
    this.activatedRoute.queryParams.subscribe(value => {
      this.dsPage = !value.dsPage ? 0 : value.dsPage;
      this.dsSize = !value.dsSize ? 10 : value.dsSize;
    });
    this.activatedRoute.data.subscribe(value => {
      this.dataSource = new MatTableDataSource<any>(this.actions.sort((a, b) => a.orderNum - b.orderNum));
    });
  }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  showDatasets() {
    $('#datasetModal').modal('show');
  }
  dsPageParamsChange(event: PageEvent) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {dsSize: event.pageSize, dsPage: event.pageIndex},
      queryParamsHandling: 'merge'
    });
  }

  addDataset(dataset: Dataset): void {
    this.selectedDatasets.push(dataset);
    this.actions.map(action => {
      if (!action.value) {
        const datasetKeyVal = dataset.parameters.find(value => value.key === action.key.key)?.value;
        action.value = datasetKeyVal;
        action.dataset = datasetKeyVal ? dataset : null;
      }
    });
    this.keys = [...new Set(
      flatten(this.selectedDatasets
        .map(value => flatten(value.parameters))
        .map(value => value.map(value1 => value1.key)))
    )];
  }
  removeDataset(dataset: Dataset) {
    this.actions.map(action => {
      if (action.dataset === dataset) {
        action.value = null;
        action.dataset = null;
      }
    });
    this.selectedDatasets.splice(this.selectedDatasets.indexOf(dataset), 1);
    this.keys = [...new Set(
      flatten(this.selectedDatasets
        .map(value => flatten(value.parameters))
        .map(value => value.map(value1 => value1.key)))
    )];
  }
  isSelected(dataset: Dataset): boolean {
    return !!this.selectedDatasets.find(value => value === dataset);
  }
  matchingDatasets(paramKey: string): Dataset[] {
    return this.selectedDatasets.filter(dataset => !!dataset.parameters.find(value => value.key === paramKey));
  }

  filter(event: any, action: any) {
    action.dataset = null;
    action.value = null;
    this.filteredKeys = this.keys.filter(value => value.toLowerCase().includes(event.toLowerCase()));
  }


  select(action: any, event: MatSelectChange) {
    const dataset: Dataset = event.value;
    action.value = dataset.parameters.find(value => value.key === action.key.key).value;
  }
}
