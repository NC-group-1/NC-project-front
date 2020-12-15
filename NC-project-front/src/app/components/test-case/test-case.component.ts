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
  keys: string[] = [];
  filteredKeys: string[] = [];
  testCaseForm: FormGroup;
  flattenedActions: ActionInstanceModel[] = [];

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
      this.actions = this.testScenario.actions.map(value1 => {
          return {
            action: value1.action,
            orderNum: value1.orderNum,
            datasetId: null,
            value: null,
            parameterKey: {key: null, id: null}
          };
        }
      ).sort((a, b) => a.orderNum - b.orderNum);
      for (const action of this.actions) {
        if (action.action.type === 'COMPOUND'){
          this.flattenedActions.push(...action.action.actions.map(value1 => {
            if (value1.parameterKey === null){
              value1.parameterKey = {key: ''};
            } else if (value1.parameterKey?.key === null){
              value1.parameterKey.key = '';
            }
            return value1;
          }));
        }else {
          if (action.parameterKey === null){
            action.parameterKey = {key: ''};
          } else if (action.parameterKey?.key === null){
            action.parameterKey.key = '';
          }
          this.flattenedActions.push(action);
        }
      }
      this.dataSource = new MatTableDataSource<any>(this.flattenedActions);
    });
    this.activatedRoute.queryParams.subscribe(value => {
      this.dsPage = !value.dsPage ? 0 : value.dsPage;
      this.dsSize = !value.dsSize ? 10 : value.dsSize;
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
        this.flattenedActions.map(action => {
          if (!action.value) {
            const datasetKeyVal = dataset.parameters.find(value1 => value1.parameterKey.key === action.parameterKey.key)?.value;
            action.value = datasetKeyVal;
            action.datasetId = datasetKeyVal ? dataset.id : null;
          }
        });
        this.keys = [...new Set(
          flatten(this.selectedDatasets
            .map(value1 => flatten(value1.parameters))
            .map(value1 => value1.map(value2 => value2.parameterKey.key)))
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
        .map(value => value.map(value1 => value1.parameterKey.key)))
    )];
  }

  isSelected(dataset: Dataset): boolean {
    return !!this.selectedDatasets.find(value => value === dataset);
  }

  matchingDatasets(paramKey: string): Dataset[] {
    return this.selectedDatasets.filter(dataset => !!dataset.parameters.find(value => value.parameterKey.key === paramKey));
  }

  filter(event: any, action: any) {
    console.log(action);
    action.dataset = null;
    action.value = null;
    this.filteredKeys = this.keys.filter(value => value.toLowerCase().includes(event.toLowerCase()));
  }


  select(action: ActionInstanceModel, event: MatSelectChange) {
    const dsId = event.value;
    action.datasetId = dsId;
    const matchingParam = this.datasets.find(ds => ds.id === dsId)
        .parameters.find(value => value.parameterKey.key === action.parameterKey.key);
    action.parameterKey.id = matchingParam.parameterKey.id;
    action.value = matchingParam.value;
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
      user: { id:parseInt(this.auth.getId(), 10) },
      role: this.auth.getRole(),
      testScenarioId: parseInt(this.activatedRoute.snapshot.paramMap.get('testScenarioId'), 10)
    }).subscribe(value => this.router.navigate(['testScenarios'], {queryParams: {created: true}}));
  }
  initParams(): void{

  }

  log(obj) {
    console.log(obj);
  }

}
