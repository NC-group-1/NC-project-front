import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {flatten} from '@angular/compiler';
import {MatSelectChange} from '@angular/material/select';
import {DatasetModel} from '../../../models/DatasetModel';
import {ActionInstanceModel} from '../../../models/ActionInstanceModel';
import {ScenarioModel} from '../../../models/TestScenario';
import {DataSetGeneralInfoDto} from '../../../models/data-set-general-info-dto';
import {DataSetService} from '../../services/data-set/data-set.service';
import {PageModel} from '../../../models/PageModel';
import {TestCaseService} from '../../services/testCase/test-case.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {TestCaseModel} from '../../../models/TestCaseModel';
import {MatOption} from '@angular/material/core';
import {getNeedParams} from '../../../../globals';

declare var $: any;

@Component({
  selector: 'app-test-case',
  templateUrl: './test-case.component.html',
  styleUrls: ['./test-case.component.css']
})
export class TestCaseComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  datasets: DatasetModel[];
  testCaseData: TestCaseModel;
  actions: ActionInstanceModel[];
  selectedDatasets: DatasetModel[] = [];
  columns = ['name', 'key', 'dataset', 'value'];
  autocompleteOptions: string[];
  dataSource: MatTableDataSource<any>;
  dsPage: number;
  dsSize: number;
  datasetPage: PageModel<DataSetGeneralInfoDto>;
  keys: string[] = [];
  filteredKeys: string[] = [];
  testCaseForm: FormGroup;
  flattenedActions: ActionInstanceModel[] = [];
  empty = true;
  creating = false;
  projectId: number;
  private actionsSource: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private auth: AuthenticationService,
              private datasetService: DataSetService, private testCaseService: TestCaseService,
              private dsService: DataSetService) {
  }

  ngOnInit(): void {
    this.creating = this.router.url.startsWith('/testCase/new/');
    this.activatedRoute.data.subscribe(value => {
      this.datasetPage = this.activatedRoute.snapshot.data.dataSets;
      this.testCaseData = this.activatedRoute.snapshot.data.testCase;
      if (!this.creating && this.testCaseData.status !== 'READY' && this.testCaseData.status !== 'NOT_STARTED' &&
        this.testCaseData.status !== 'UNKNOWN') {
        this.router.navigate(['testCase', 'details', this.testCaseData.id]);
      }
      this.datasets = this.datasetPage.list.map(value1 => new DatasetModel(value1));
      if (this.flattenedActions.length === 0){
        this.actionsSource = this.creating ?
          this.activatedRoute.snapshot.data.testScenario.actions
          : this.activatedRoute.snapshot.data.actions;
        if (this.creating) {
          this.initParamsCreation();
        } else {
          this.initParamsEdit();
        }
        this.flattenedActions.forEach((value1, index) => value1.orderNum = index + 1);
        this.dataSource = new MatTableDataSource<any>(this.flattenedActions);
      }
    });
    this.activatedRoute.queryParams.subscribe(value => {
      this.dsPage = !value.dsPage ? 0 : value.dsPage;
      this.dsSize = !value.dsSize ? 10 : value.dsSize;
    });
    this.testCaseForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required])
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  fieldsEmpty(): void {
    this.empty = !!this.flattenedActions.find(value =>
      value.parameterKey.key === '' && getNeedParams(value.action.type) !== 0
      || value.datasetId === null && getNeedParams(value.action.type) === 2);
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

  addDataset(dataset: DatasetModel): void {
    this.datasetService.getParametersByDataSetId(dataset.id)
      .subscribe(parameters => {
        dataset.parameters = parameters;
        if (!this.selectedDatasets.find(value => value.id === dataset.id)) {
          this.selectedDatasets.push(dataset);
        }
        this.flattenedActions.map(action => {
          if (!action.value && getNeedParams(action.action.type) === 2) {
            const datasetKeyVal = !!action.datasetId
              ? dataset.parameters.find(value => value.dataSetId === action.datasetId)?.value
              : dataset.parameters.find(value1 => value1.parameterKey.key === action.parameterKey.key)?.value;
            action.value = datasetKeyVal;
            action.datasetId = action.datasetId || (datasetKeyVal ? dataset.id : null);
          }
        });
        this.keys = [...new Set(
          flatten(this.selectedDatasets
            .map(value1 => flatten(value1.parameters))
            .map(value1 => value1.map(value2 => value2.parameterKey.key)))
        )];
        this.fieldsEmpty();
      });
  }

  removeDataset(dataset: DatasetModel) {
    this.actions.map(action => {
      if (action.datasetId === dataset.id) {
        action.value = null;
        action.datasetId = null;
      }
    });
    this.selectedDatasets.splice(this.selectedDatasets.indexOf(dataset), 1);
    this.keys = [...new Set(
      flatten(this.selectedDatasets
        .map(value => flatten(value.parameters))
        .map(value => value.map(value1 => value1.parameterKey.key)))
    )];
  }

  isSelected(dataset: DatasetModel): boolean {
    return !!this.selectedDatasets.find(value => value.id === dataset.id);
  }

  matchingDatasets(paramKey: string): DatasetModel[] {
    return this.selectedDatasets.filter(dataset => !!dataset.parameters.find(value => value.parameterKey.key === paramKey));
  }

  filter(event: any, action: any) {
    if (event !== '') {
      action.datasetId = null;
      action.value = null;
    }
    this.filteredKeys = this.keys.filter(value => value.toLowerCase().includes(event.toLowerCase()));
  }

  select(action: ActionInstanceModel, event: MatSelectChange | MatOption) {
    const dsId = event.value;
    action.datasetId = dsId;
    const matchingParam = this.selectedDatasets.find(ds => ds.id === dsId)
      .parameters.find(value => value.parameterKey.key === action.parameterKey.key);
    action.parameterKey.id = matchingParam?.parameterKey.id;
    action.value = matchingParam?.value;
    this.fieldsEmpty();
  }

  loadParams(dataset: DatasetModel) {
    this.datasetService.getParametersByDataSetId(dataset.id)
      .subscribe(value => dataset.parameters = value);
  }

  createTestCase() {
    this.testCaseService.createTestCase({

      name: this.testCaseForm.value.name,
      description: this.testCaseForm.value.description,
      actions: this.flattenedActions,
      user: {userId: parseInt(this.auth.getId(), 10)},
      // role: this.auth.getRole(),
      testScenarioId: parseInt(this.activatedRoute.snapshot.paramMap.get('testScenarioId'), 10)
    }).subscribe(value => {
      this.testCaseService.getProjectIdOfTestScenario(this.activatedRoute.snapshot.paramMap.get('testScenarioId'))
        .subscribe(prId => this.router.navigate(['../testCase/list', prId], {queryParams: {created: true}}));
    });
  }

  editTestCase() {
    this.testCaseService.editTestCase({
      id: +this.activatedRoute.snapshot.paramMap.get('testCaseId'),
      name: this.testCaseForm.value.name,
      description: this.testCaseForm.value.description,
      user: {userId: parseInt(this.auth.getId(), 10)},
      actions: this.flattenedActions,
    }).subscribe(value => {
      this.testCaseService.getProjectIdOfTestScenario(this.testCaseData.testScenario)
        .subscribe(prId => this.router.navigate(['../testCase/list', prId], {queryParams: {created: true}}));
    });
  }

  initParamsCreation() {
    this.flattenedActions = [];
    this.actions = this.actionsSource.map(value1 => {
      return {
          action: value1.action,
          orderNum: value1.orderNum,
          datasetId: null,
          value: null,
          parameterKey: value1.action?.parameterKey
        };
      }
    ).sort((a, b) => a.orderNum - b.orderNum);
    for (const action of this.actions) {
      if (action.action.type === 'COMPOUND') {
        this.flattenedActions.push(...action.action.actions.map((value1) => {
          if (getNeedParams(action.action.type) !== 0) {
            if (value1.parameterKey == null) {
              value1.parameterKey = {key: ''};
            } else if (value1.parameterKey?.key == null) {
              value1.parameterKey.key = '';
            }
          }
          value1.compoundId = action.action.id;
          return value1;
        }));
      } else {
        if (getNeedParams(action.action.type) !== 0) {
          if (action.parameterKey == null) {
            action.parameterKey = {key: ''};
          } else if (action.parameterKey?.key == null) {
            action.parameterKey.key = '';
          }
        }
        this.flattenedActions.push(action);
      }
    }
  }

  initParamsEdit() {
    this.flattenedActions = [];
    this.actions = this.actionsSource.sort((a, b) => a.orderNum - b.orderNum);
    this.actions.forEach(action => {
      if (getNeedParams(action.action.type) !== 0) {
        if (action.parameterKey === null) {
          action.parameterKey = {key: ''};
        } else if (action.parameterKey?.key === null) {
          action.parameterKey.key = '';
        }
      }
      this.dsService.getDataSetById(action.datasetId).subscribe(ds => {
        this.addDataset(new DatasetModel(ds));
      });
      this.flattenedActions.push(action);
    });
  }

  getNeedParams(type: string): number {
    return getNeedParams(type);
  }
}
