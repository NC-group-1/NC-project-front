import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {flatten} from '@angular/compiler';
import {MatSelectChange} from '@angular/material/select';
import {ActionOfCompound} from '../../../models/ActionOfCompound';
import {Dataset} from '../../../models/Dataset';
import {ActionInstanceModel} from '../../../models/ActionInstanceModel';
import {ScenarioModel} from '../../../models/TestScenario';
import {ParameterKey} from '../../../models/parameter-key';
import {DataSetGeneralInfoDto} from '../../../models/data-set-general-info-dto';
import {DataSetService} from '../../services/data-set/data-set.service';
import {PageModel} from '../../../models/PageModel';
import {TestCaseService} from '../../services/testCase/test-case.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/auth/authentication.service';

declare var $: any;

@Component({
  selector: 'app-test-case',
  templateUrl: './test-case.component.html',
  styleUrls: ['./test-case.component.css']
})
export class TestCaseComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  datasets: Dataset[];
  actions: ActionInstanceModel[];
  testScenario: ScenarioModel;
  selectedDatasets: Dataset[] = [];
  columns = ['name', 'key', 'dataset', 'value'];
  autocompleteOptions: string[];
  dataSource: MatTableDataSource<any>;
  dsPage: number;
  dsSize: number;
  datasetPage: PageModel<DataSetGeneralInfoDto>;
  keys: string[];
  filteredKeys: string[];
  testCaseForm: FormGroup;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private auth: AuthenticationService,
              private datasetService: DataSetService, private testCaseService: TestCaseService) {
    this.testCaseForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(value => {
      this.datasetPage = this.activatedRoute.snapshot.data.dataSets;
      this.datasets = this.datasetPage.list.map(value1 => new Dataset(value1));
      this.testScenario = this.activatedRoute.snapshot.data.testScenario;
      this.actions = this.testScenario.actions.map(value1 =>
        ({
          action: value1.action,
          orderNum: value1.orderNum,
          datasetId: null,
          value: null,
          parameterKey: {key: null, id: null}
        }));
      this.dataSource = new MatTableDataSource<any>(this.actions.sort((a, b) => a.orderNum - b.orderNum));
    });
    this.activatedRoute.queryParams.subscribe(value => {
      this.dsPage = !value.dsPage ? 0 : value.dsPage;
      this.dsSize = !value.dsSize ? 10 : value.dsSize;
    });
    this.activatedRoute.data.subscribe(value => {
      this.dataSource = new MatTableDataSource<any>(this.actions.sort((a, b) => a.orderNum - b.orderNum));
    });
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
    this.datasetService.getParametersByDataSetId(dataset.id)
      .subscribe(value => {
        this.datasets.find(value1 => {
          return value1.id === dataset.id;
        }).parameters = value;
        this.selectedDatasets.push(dataset);
        this.actions.map(action => {
          if (!action.value) {
            const datasetKeyVal = dataset.parameters.find(value1 => value1.key === action.parameterKey.key)?.value;
            action.value = datasetKeyVal;
            action.datasetId = datasetKeyVal ? dataset.id : null;
          }
        });
        this.keys = [...new Set(
          flatten(this.selectedDatasets
            .map(value1 => flatten(value1.parameters))
            .map(value1 => value1.map(value2 => value2.key.key)))
        )];
      });
  }

  removeDataset(dataset: Dataset) {
    this.actions.map(action => {
      console.log(action, dataset.id);
      if (action.datasetId === dataset.id) {
        action.value = null;
        action.datasetId = null;
      }
    });
    this.selectedDatasets.splice(this.selectedDatasets.indexOf(dataset), 1);
    this.keys = [...new Set(
      flatten(this.selectedDatasets
        .map(value => flatten(value.parameters))
        .map(value => value.map(value1 => value1.key.key)))
    )];
  }

  isSelected(dataset: Dataset): boolean {
    return !!this.selectedDatasets.find(value => value === dataset);
  }

  matchingDatasets(paramKey: string): Dataset[] {
    return this.selectedDatasets.filter(dataset => !!dataset.parameters.find(value => value.key.key === paramKey));
  }

  filter(event: any, action: any) {
    action.dataset = null;
    action.value = null;
    this.filteredKeys = this.keys.filter(value => value.toLowerCase().includes(event.toLowerCase()));
  }


  select(action: ActionInstanceModel, event: MatSelectChange) {
    const dataset: Dataset = event.value;
    action.datasetId = dataset.id;
    action.parameterKey.id = dataset.parameters.find(value => value.key.key === action.parameterKey.key).key.id;
    action.value = dataset.parameters.find(value => value.key.key === action.parameterKey.key).value;
  }

  loadParams(dataset: Dataset) {
    this.datasetService.getParametersByDataSetId(dataset.id)
      .subscribe(value => this.datasets.find(value1 => {
        return value1.id === dataset.id;
      }).parameters = value);
  }

  createTestCase() {
    this.testCaseService.createTestCase({
      name: this.testCaseForm.value.name,
      description: this.testCaseForm.value.description,
      actions: this.actions,
      creatorId: parseInt(this.auth.getId(), 10),
      role: this.auth.getRole(),
      testScenarioId: parseInt(this.activatedRoute.snapshot.paramMap.get('testScenarioId'), 10)
    }).subscribe(value => this.router.navigate(['testScenarios'], {queryParams: {created: true}}));
  }
}
