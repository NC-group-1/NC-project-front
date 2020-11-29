import {Component, OnInit} from '@angular/core';
import {Action} from '../../../../models/action';
import {ActionService} from '../../../services/action/action.service';
import {PageEvent} from '@angular/material/paginator';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import {ParameterKey} from '../../../../models/parameter-key';
import {ParameterKeyService} from '../../../services/parameterKey/parameter-key.service';
import {MatTableDataSource} from '@angular/material/table';
import {HttpErrorResponse} from '@angular/common/http';
import {ActionPage} from '../../../../models/action-page';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {

  actions: Action[];
  actionTableDS = new MatTableDataSource<Action>();
  displayedColumns: string[] = ['name', 'key', 'edit'];
  length = 0;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 15];

  creation = false;
  editing = false;
  actionTypes: string[];
  keys: ParameterKey[];
  filteredActionTypes: string[];
  manageActionForm: FormGroup;

  constructor(private actionService: ActionService,
              private parameterKeyService: ParameterKeyService,
              private formBuilder: FormBuilder) {
    this.manageActionForm = this.formBuilder.group({
      id: new FormControl(null),
      name: new FormControl(''),
      key: this.formBuilder.group({id: new FormControl(0), key: new FormControl('') }),
      type: new FormControl('', this.validateActionTypeInput()),
      description: new FormControl('')
    });
  }

  onPaginationChange(pageEvent: PageEvent): void {
    this.pageSize = pageEvent.pageSize;
    this.pageIndex = pageEvent.pageIndex;
    this.reloadActions();
  }

  reloadActions(): void {
    this.actionService.getPaginatedActions(this.pageSize, this.pageIndex)
        .subscribe((data: ActionPage) => {
      this.actionTableDS.data = data.list;
      this.actions = data.list;
      this.length = data.size;
    });
  }

  reloadActionTypes(): void {
    this.actionService.getActionTypes().subscribe((data: string[]) => {
      this.actionTypes = data;
      this.filteredActionTypes = data;
    });
  }

  onTypeInputChanges(): void {
    this.filteredActionTypes = this.actionTypes.filter(
    (element) => {
      return (element.toLowerCase().includes(this.manageActionForm.value.type?.toLowerCase()));
    });
  }

  onKeyInputChange(): void {
    // this.selectedKeyId = null;
    this.reloadKeys();
    if (this.keys.length === 1 && this.keys[0].key === this.manageActionForm.value.key.key) {
      this.manageActionForm.get('key.id').setValue(this.keys[0].id);
    } else {
      this.manageActionForm.get('key.id').setValue(0);
    }
  }

  reloadKeys(): void {
    this.parameterKeyService.getSearchedParameterKeys(this.manageActionForm.value.key.key).subscribe(
      (data: ParameterKey[]) => {this.keys = data; });
    if (this.keys === null) {
      this.keys = [];
    }
  }

  ngOnInit(): void {
    this.reloadActions();
    this.reloadKeys();
    this.reloadActionTypes();
  }

  onSubmitButton(): void {
    this.manageActionForm.disable();
    if (this.manageActionForm.value.key.key === '') {
      // this.manageActionForm.get('key').setValue(null);
      this.manageActionForm.value.key = null;
    }
    if (this.manageActionForm.value.description === '') {
      this.manageActionForm.value.description = null;
    }
    if (this.creation && !this.editing){
      this.saveCreatedAction();
    } else {
      this.saveEditedAction();
    }
    this.manageActionForm.enable();
    this.cancelEdit();
    // this.reloadActions();
  }

  private saveEditedAction(): void {
    this.actionService.updateAction(this.manageActionForm.value).subscribe((result) => {
      this.reloadActions();
      console.log(result);
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  private saveCreatedAction(): void {
    console.log(this.manageActionForm.value);
    this.actionService.createAction(this.manageActionForm.value).subscribe((result) => {
      this.reloadActions();
      console.log(result);
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  cancelEdit(): void {
    this.editing = false;
    this.creation = false;
    this.manageActionForm.reset({
      name: '',
      type: '',
      description: '',
      key: {id: 0, key: '' }
    });
    this.reloadKeys();
    console.log(this.manageActionForm.value);
  }

  editAction(action: Action): void {
    this.editing = true;
    this.manageActionForm.get('id').setValue(action.id);
    this.manageActionForm.get('name').setValue(action.name);
    this.manageActionForm.get('type').setValue(action.type);
    this.manageActionForm.get('description').setValue(action.description);
    if (action.key.key === null) {
      this.manageActionForm.get('key.key').setValue('');
    }
    else {
      this.manageActionForm.get('key.key').setValue(action.key.key);
      this.manageActionForm.get('key.id').setValue(action.key.id);
    }
  }

  createAction(): void {
    this.creation = true;
  }

  validateActionTypeInput(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>
      this.actionTypes?.indexOf(control.value) > -1 ? null : {wrongType: control.value};
  }
}