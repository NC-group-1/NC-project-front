import {Component, OnInit} from '@angular/core';
import {Action} from '../../../../models/action';
import {ActionService} from '../../../services/action/action.service';
import {PageEvent} from '@angular/material/paginator';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import {ParameterKey} from '../../../../models/parameter-key';
import {ParameterKeyService} from '../../../services/parameterKey/parameter-key.service';
import {MatTableDataSource} from '@angular/material/table';
import {HttpErrorResponse} from '@angular/common/http';

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
      key: this.formBuilder.group({id: new FormControl(null), key: new FormControl('') }),
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
        .subscribe((data: Action[]) => {
      this.actionTableDS.data = data;
      this.actions = data;
    });
  }

  reloadNumberOfActions(): void {
    this.actionService.getNumberOfActions().subscribe((data: number) => {
      this.length = data;
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
      this.manageActionForm.get('key.id').setValue(null);
    }
  }

  reloadKeys(): void {
    this.parameterKeyService.getSearchedParameterKeys(this.manageActionForm.value.key.key).subscribe(
      (data: ParameterKey[]) => {this.keys = data; });
  }

  ngOnInit(): void {
    this.reloadNumberOfActions();
    this.reloadActions();
    this.reloadKeys();
    this.reloadActionTypes();
  }

  onSubmitButton(): void {
    console.log(this.manageActionForm.value);
    this.manageActionForm.disable();
    if (this.creation && !this.editing){
      this.saveCreatedAction();
    } else {
      this.saveEditedAction();
    }
    this.manageActionForm.enable();
    this.cancelEdit();
  }

  private saveEditedAction(): void {
    this.actionService.updateAction(this.manageActionForm.value).subscribe((result) => {
      console.log(result);
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  private saveCreatedAction(): void {
    this.actionService.createAction(this.manageActionForm.value).subscribe((result) => {
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
      key: { key: '' }
    });
    console.log(this.manageActionForm.value);
  }

  editAction(action: Action): void {
    this.editing = true;
    this.manageActionForm.get('id').setValue(action.id);
    this.manageActionForm.get('name').setValue(action.name);
    this.manageActionForm.get('type').setValue(action.type);
    this.manageActionForm.get('description').setValue(action.description);
    if (action.key === null) {
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
