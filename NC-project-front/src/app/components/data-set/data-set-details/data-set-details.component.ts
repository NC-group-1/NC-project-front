import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataSetGeneralInfoDto} from '../../../../models/data-set-general-info-dto';
import {MatTableDataSource} from '@angular/material/table';
import {Parameter} from '../../../../models/parameter';
import {DataSetService} from '../../../services/data-set/data-set.service';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {ParameterKey} from '../../../../models/parameter-key';
import {ParameterKeyService} from '../../../services/parameterKey/parameter-key.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-data-set-details',
  templateUrl: './data-set-details.component.html',
  styleUrls: ['./data-set-details.component.css']
})
export class DataSetDetailsComponent implements OnInit {
  errorMessage = '';
  okMessage = '';
  displayedColumns: string[] = ['key', 'value', 'edit', 'delete'];
  dataSet: DataSetGeneralInfoDto;
  dataSource = new MatTableDataSource<Parameter>();
  creation = false;
  editing = false;
  parameterForm: FormGroup;
  parameterKeys: ParameterKey[];

  constructor(private dataSetService: DataSetService,
              private parameterKeyService: ParameterKeyService,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder) {
    this.activatedRoute.params.subscribe(param => {
      this.dataSet = this.activatedRoute.snapshot.data.dataSet;
    });
    this.parameterForm = this.formBuilder.group({
      id: new FormControl(null),
      parameterKey: this.formBuilder.group({
        id: new FormControl(0),
        key: new FormControl('', [this.validateKeyInput(), Validators.required])
      }),
      value: new FormControl('', Validators.required),
      dataSetId: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.reloadParameters();
    this.reloadKeys();
  }

  reloadParameters(): void {
    this.dataSetService.getParametersByDataSetId(this.dataSet.id)
      .subscribe( (data: Parameter[]) => {
          this.dataSource.data = data;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.errorMessage = 'Can not load parameters';
        });
  }

  onKeyInputChange(): void {
    this.reloadKeys();
    if (this.parameterKeys.length === 1 && this.parameterKeys[0].key === this.parameterForm.value.parameterKey.key) {
      this.parameterForm.get('parameterKey.id').setValue(this.parameterKeys[0].id);
    } else {
      this.parameterForm.get('parameterKey.id').setValue(0);
    }
  }

  reloadKeys(): void {
    this.parameterKeyService.getSearchedParameterKeys(this.parameterForm.value.parameterKey.key).subscribe(
      (data: ParameterKey[]) => {this.parameterKeys = data; });
    if (this.parameterKeys === null) {
      this.parameterKeys = [];
    }
  }

  onSubmitButton(): void {
    this.parameterForm.disable();
    if (this.creation && !this.editing){
      this.saveCreatedParameter();
    } else {
      this.saveEditedParameter();
    }
    this.parameterForm.enable();
    this.cancelCreation();
  }

  private saveCreatedParameter(): void {
    console.log(this.parameterForm.value);
    this.dataSetService.createParameter(this.parameterForm.value).subscribe((result) => {
      this.reloadParameters();
      console.log(result);
      this.okMessage = 'Parameter created';
    }, (error: HttpErrorResponse) => {
      console.log(error);
      this.errorMessage = 'Can not create parameter';
    });
  }

  private saveEditedParameter(): void {
    console.log(this.parameterForm.value);
    this.dataSetService.updateParameter(this.parameterForm.value).subscribe((result) => {
      this.reloadParameters();
      console.log(result);
      this.okMessage = 'Parameter edited';
    }, (error: HttpErrorResponse) => {
      console.log(error);
      this.errorMessage = 'Can not edit parameter';
    });
  }

  cancelCreation(): void {
    this.creation = false;
    this.editing = false;
    this.parameterForm.reset({
      parameterKey: {id: 0, key: '' },
      value: '',
      dataSetId: null,
      id: null
    });
    this.reloadKeys();
    this.parameterForm.get('parameterKey.key').enable();
  }

  createParameter(): void {
    this.creation = true;
    this.parameterForm.get('dataSetId').setValue(this.dataSet.id);
  }

  editParameter(parameter: Parameter): void {
    this.dataSetService.getParameterUsages(parameter.id).subscribe((result) => {
      if (result === 0) {
        this.editing = true;
        this.parameterForm.get('dataSetId').setValue(this.dataSet.id);
        this.parameterForm.get('value').setValue(parameter.value);
        this.parameterForm.get('id').setValue(parameter.id);
        this.parameterForm.get('parameterKey.id').setValue(parameter.parameterKey.id);
        this.parameterForm.get('parameterKey.key').setValue(parameter.parameterKey.key);
        this.parameterForm.get('parameterKey.key').disable();
      } else {
        this.errorMessage = 'Can not edit parameter! Parameter assigned to '
          + result + ' action(s).';
      }
    }, (error: HttpErrorResponse) => {
      console.log(error);
      this.errorMessage = 'Can not edit parameter';
    });
  }

  deleteParameter(parameter: Parameter): void {
    this.dataSetService.deleteParameter(parameter.id).subscribe((result) => {
      this.reloadParameters();
      console.log(result);
      this.okMessage = 'Parameter deleted';
    }, (error: HttpErrorResponse) => {
      console.log(error);
      if (error.status === 403){
        this.errorMessage = 'Can not delete parameter! Parameter assigned to '
          + error.error + ' action(s).';
      } else {
        this.errorMessage = 'Can not delete parameter';
      }
    });
  }

  validateKeyInput(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>
    {
      let valid = true;
      this.dataSource.data.forEach(parameter => {
        if (parameter.parameterKey.key === control.value) {
          valid = false;
        }
      });
      return valid ? null : {wrongKey: control.value};
    };
  }

  closeErrorAlert(): void {
    this.errorMessage = '';
  }

  closeOkAlert(): void {
    this.okMessage = '';
  }
}
