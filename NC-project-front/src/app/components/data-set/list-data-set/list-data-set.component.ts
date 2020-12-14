import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {DataSetGeneralInfoDto} from '../../../../models/data-set-general-info-dto';
import {DataSetService} from '../../../services/data-set/data-set.service';
import {DataSetGeneralInfoDtoPage} from '../../../../models/data-set-general-info-dto-page';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {AuthenticationService} from '../../../services/auth/authentication.service';

@Component({
  selector: 'app-list-data-set',
  templateUrl: './list-data-set.component.html',
  styleUrls: ['./list-data-set.component.css']
})
export class ListDataSetComponent implements OnInit {
  errorMessage = '';
  okMessage = '';
  dataSource = new MatTableDataSource<DataSetGeneralInfoDto>();
  displayedColumns: string[] = ['name', 'role', 'username',
    'surname', 'details', 'edit', 'delete'];
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions: number[] = [10, 20, 50, 100];
  dataSetTableForm: FormGroup;
  selection = new SelectionModel<DataSetGeneralInfoDto>(true, []);

  manageDataSetForm: FormGroup;
  creation = false;
  editing = false;

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataSetService: DataSetService,
              private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.dataSetTableForm = this.formBuilder.group({
      filter: new FormControl(''),
      orderBy: new FormControl('name'),
      order: new FormControl('ASC')
    });
    this.manageDataSetForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      id: new FormControl(null),
      createdById: new FormControl(null)
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
        }, (error: HttpErrorResponse) => {
          console.log(error);
          this.errorMessage = 'Can not load data sets';
        });
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

  sortData(): void{
    this.dataSetTableForm.value.order = this.sort.direction.toUpperCase();
    this.dataSetTableForm.value.orderBy = this.sort.active;
    this.reloadDataSets();
  }

  deleteDataSet(dataSet: DataSetGeneralInfoDto): void {
    this.dataSetService.deleteDataSet(dataSet.id).subscribe((result) => {
      this.reloadDataSets();
      console.log(result);
      this.okMessage = 'Data set deleted';
    }, (error: HttpErrorResponse) => {
      console.log(error);
      if (error.status === 403){
        this.errorMessage = 'Can not delete data set! Parameters in this dataset assigned to '
          + error.error + ' action(s).';
      } else {
        this.errorMessage = 'Can not delete data set';
      }
    });
  }

  editDataSet(dataSet: DataSetGeneralInfoDto): void {
    this.editing = true;
    this.manageDataSetForm.get('name').setValue(dataSet.name);
    this.manageDataSetForm.get('description').setValue(dataSet.description);
    this.manageDataSetForm.get('id').setValue(dataSet.id);
    this.manageDataSetForm.get('createdById').setValue(dataSet.createdById);
  }

  createDataSet(): void {
    this.creation = true;
    this.manageDataSetForm.get('createdById').setValue(this.authenticationService.getId());
  }

  onSubmitButton(): void {
    this.manageDataSetForm.disable();
    if (this.manageDataSetForm.value.description === '') {
      this.manageDataSetForm.value.description = null;
    }
    if (this.creation && !this.editing){
      this.saveCreatedDataSet();
    } else {
      this.saveEditedDataSet();
    }
    this.manageDataSetForm.enable();
    this.cancelEdit();
  }

  private saveCreatedDataSet(): void{
    this.dataSetService.createDataSet(this.manageDataSetForm.value).subscribe((result) => {
      // this.reloadDataSets();
      this.openDetails(result);
      console.log(result);
    }, (error: HttpErrorResponse) => {
      console.log(error);
      this.errorMessage = 'Can not create data set';
    });
  }

  private saveEditedDataSet(): void{
    this.dataSetService.updateDataSet(this.manageDataSetForm.value).subscribe((result) => {
      this.reloadDataSets();
      console.log(result);
      this.okMessage = 'Dataset edited';
    }, (error: HttpErrorResponse) => {
      console.log(error);
      this.errorMessage = 'Can not edit data set';
    });
  }

  cancelEdit(): void {
    this.editing = false;
    this.creation = false;
    this.manageDataSetForm.reset({
      name: '',
      description: '',
      id: null,
      createdById: null
    });
  }

  openDetails(dataSet: DataSetGeneralInfoDto): void {
    this.router.navigate(['dataSet/' + dataSet.id]);
  }

  closeErrorAlert(): void {
    this.errorMessage = '';
  }

  closeOkAlert(): void {
    this.okMessage = '';
  }
}
