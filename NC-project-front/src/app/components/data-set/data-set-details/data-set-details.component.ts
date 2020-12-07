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

  displayedColumns: string[] = ['key', 'value'];
  dataSet: DataSetGeneralInfoDto;
  dataSource = new MatTableDataSource<Parameter>();
  creation = false;
  parameterForm: FormGroup;
  keys: ParameterKey[];

  constructor(private dataSetService: DataSetService,
              private parameterKeyService: ParameterKeyService,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder) {
    this.activatedRoute.params.subscribe(param => {
      this.dataSet = this.activatedRoute.snapshot.data.dataSet;
    });
    this.parameterForm = this.formBuilder.group({
      key: this.formBuilder.group({
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
        error => console.log(error)
      );
  }

  onKeyInputChange(): void {
    this.reloadKeys();
    if (this.keys.length === 1 && this.keys[0].key === this.parameterForm.value.key.key) {
      this.parameterForm.get('key.id').setValue(this.keys[0].id);
    } else {
      this.parameterForm.get('key.id').setValue(0);
    }
  }

  reloadKeys(): void {
    this.parameterKeyService.getSearchedParameterKeys(this.parameterForm.value.key.key).subscribe(
      (data: ParameterKey[]) => {this.keys = data; });
    if (this.keys === null) {
      this.keys = [];
    }
  }

  onSubmitButton(): void {
    this.parameterForm.disable();
    this.saveCreatedParameter();
    this.parameterForm.enable();
    this.cancelCreation();
  }

  private saveCreatedParameter(): void {
    console.log(this.parameterForm.value);
    this.dataSetService.createParameter(this.parameterForm.value).subscribe((result) => {
      this.reloadParameters();
      console.log(result);
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  cancelCreation(): void {
    this.creation = false;
    this.parameterForm.reset({
      key: {id: 0, key: '' },
      value: '',
      dataSetId: null
    });
    this.reloadKeys();
  }

  createParameter(): void {
    this.creation = true;
    this.parameterForm.get('dataSetId').setValue(this.dataSet.id);
  }

  validateKeyInput(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>
    {
      let valid = true;
      this.dataSource.data.forEach(parameter => {
        if (parameter.key.key === control.value) {
          valid = false;
        }
      });
      return valid ? null : {wrongKey: control.value};
    };
  }

}
