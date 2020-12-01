import {Component, OnInit, ViewChild} from '@angular/core';
import {ProjectResponseModel} from '../../../../../models/ProjectResponseModel';
import {ProjectModel} from '../../../../../models/ProjectModel';
import {HttpClientService} from '../../../../services/projects/http-client.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {Action} from '../../../../../models/action';
import {DataSetGeneralInfoDto} from '../../../../../models/data-set-general-info-dto';
import {DataSetService} from '../../../../services/data-set/data-set.service';
import {DataSetGeneralInfoDtoPage} from '../../../../../models/data-set-general-info-dto-page';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-list-data-set',
  templateUrl: './list-data-set.component.html',
  styleUrls: ['./list-data-set.component.css']
})
export class ListDataSetComponent implements OnInit {
  dataSource = new MatTableDataSource<DataSetGeneralInfoDto>();
  displayedColumns: string[] = ['name', 'createdByRole', 'createdByName', 'createdBySurname', 'details', 'edit'];
  length = 0;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 15];
  dataSetTableForm: FormGroup;

  @ViewChild('paginator') paginator: MatPaginator;

  constructor(private dataSetService: DataSetService,
              private formBuilder: FormBuilder) {
    this.dataSetTableForm = this.formBuilder.group({
      filter: new FormControl(''),
      orderBy: new FormControl('name'),
      order: new FormControl('ASC')
    });
  }

  ngOnInit(): void {
    this.reloadDataSets();
  }

  reloadDataSets(): void {
    this.dataSetService.getPaginatedDataSets(
      this.pageIndex,
      this.pageSize,
      this.dataSetTableForm.value.filter,
      this.dataSetTableForm.value.orderBy,
      this.dataSetTableForm.value.order)
      .subscribe( (data: DataSetGeneralInfoDtoPage) => {
          this.dataSource.data = data.list;
          this.length = data.size;
        },
        error => console.log(error)
      );
  }

  onPaginationChange(pageEvent: PageEvent): void {
    this.pageSize = pageEvent.pageSize;
    this.pageIndex = pageEvent.pageIndex;
    this.reloadDataSets();
  }

  applyFilter() {
    if (this.pageIndex !== 0) {
      this.paginator.firstPage();
    }
    this.reloadDataSets();
  }

  sortData(orderBy: string){
    if (this.pageIndex !== 0) {
      this.paginator.firstPage();
    }
    if (this.dataSetTableForm.value.orderBy === orderBy) {
      this.dataSetTableForm.value.order === 'ASC' ?
        this.dataSetTableForm.value.order = 'DESC' : this.dataSetTableForm.value.order = 'ASC';
    } else {
      this.dataSetTableForm.value.orderBy = orderBy;
      this.dataSetTableForm.value.order = 'ASC';
    }
    this.reloadDataSets();
  }

  editDataSet(dataSet: DataSetGeneralInfoDto): void {
    console.log(dataSet);
  }

  createDataSet(): void {
    console.log('createDataSet()');
  }

  openDetails(dataSet: DataSetGeneralInfoDto): void {
    console.log(dataSet);
  }
}
