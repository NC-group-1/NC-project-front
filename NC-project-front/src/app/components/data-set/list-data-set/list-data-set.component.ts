import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {DataSetGeneralInfoDto} from '../../../../models/data-set-general-info-dto';
import {DataSetService} from '../../../services/data-set/data-set.service';
import {DataSetGeneralInfoDtoPage} from '../../../../models/data-set-general-info-dto-page';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-data-set',
  templateUrl: './list-data-set.component.html',
  styleUrls: ['./list-data-set.component.css']
})
export class ListDataSetComponent implements OnInit {
  dataSource = new MatTableDataSource<DataSetGeneralInfoDto>();
  displayedColumns: string[] = ['select', 'name', 'createdByRole', 'createdByName',
    'createdBySurname', 'details', 'edit'];
  length = 0;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 15];
  dataSetTableForm: FormGroup;
  selection = new SelectionModel<DataSetGeneralInfoDto>(true, []);

  manageDataSetForm: FormGroup;
  creation = false;
  editing = false;

  @ViewChild('paginator') paginator: MatPaginator;

  constructor(private dataSetService: DataSetService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.dataSetTableForm = this.formBuilder.group({
      filter: new FormControl(''),
      orderBy: new FormControl('name'),
      order: new FormControl('ASC')
    });
    this.manageDataSetForm = this.formBuilder.group({
      name: new FormControl(''),
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

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data?.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data?.forEach((row: DataSetGeneralInfoDto) => this.selection.select(row));
  }

  checkboxLabel(row?: DataSetGeneralInfoDto): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  deleteSelected() {
    this.selection.selected
      .forEach(value => {
        this.dataSetService.deleteDataSet(value.id).subscribe((result) => {
          this.reloadDataSets();
          console.log(result);
        }, (error: HttpErrorResponse) => {
          console.log(error);
        });
        }
      );
    this.selection.clear();
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
    this.manageDataSetForm.get('createdById').setValue(86);
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
      this.reloadDataSets();
      console.log(result);
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  private saveEditedDataSet(): void{
    this.dataSetService.updateDataSet(this.manageDataSetForm.value).subscribe((result) => {
      this.reloadDataSets();
      console.log(result);
    }, (error: HttpErrorResponse) => {
      console.log(error);
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
}
