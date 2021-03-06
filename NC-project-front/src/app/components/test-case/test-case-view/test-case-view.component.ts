import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ActionInstanceModel} from '../../../../models/ActionInstanceModel';
import {DataSetService} from '../../../services/data-set/data-set.service';
import {ActivatedRoute} from '@angular/router';
import {DatasetModel} from '../../../../models/DatasetModel';
import {TestCaseModel} from '../../../../models/TestCaseModel';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-test-case-view',
  templateUrl: './test-case-view.component.html',
  styleUrls: ['./test-case-view.component.css']
})
export class TestCaseViewComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  testCase: TestCaseModel;
  actions: ActionInstanceModel[];
  dataSource: MatTableDataSource<ActionInstanceModel>;
  datasets: DatasetModel[] = [];
  columns = ['name', 'key', 'dataset', 'value'];

  constructor(private activatedRoute: ActivatedRoute, private dsService: DataSetService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      this.testCase = this.activatedRoute.snapshot.data.testCase;
      this.actions = this.activatedRoute.snapshot.data.actions.sort((a, b) => a.orderNum - b.orderNum);
      this.actions.forEach(value => {
        this.dsService.getDatasetValueByParam(value.datasetId, value.parameterKey.id).subscribe(value1 => {
          value.dataset = value1.name;
          value.value = value1.value;
        });
      });
      this.dataSource = new MatTableDataSource<ActionInstanceModel>(this.actions);
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

}
