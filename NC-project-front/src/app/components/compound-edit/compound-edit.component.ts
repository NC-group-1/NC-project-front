import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CompoundModel} from '../../../models/CompoundModel';
import {ActionPage} from '../../../models/action-page';
import {Action} from '../../../models/action';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {ActionOfCompound} from '../../../models/ActionOfCompound';
import {PageEvent} from '@angular/material/paginator';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CompoundService} from '../../services/compound/compound.service';
import {state, style, trigger} from '@angular/animations';
import {Observable} from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-compound-edit',
  animations: [
    trigger('invalidForm', [
      state('invalid', style({
        animation: 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
        transform: 'translate3d(0, 0, 0)',
        perspective: '1000px',
        border: '2px solid #dc3545'
      })),
      state('', style({}))
    ])
  ],
  templateUrl: './compound-edit.component.html',
  styleUrls: ['./compound-edit.component.css']
})
export class CompoundEditComponent implements OnInit, AfterViewInit {

  compound: CompoundModel;
  actions: ActionPage;
  compoundActions: ActionOfCompound[];
  actionsAsCompActions: ActionOfCompound[];
  size: number;
  page: number;
  creating: boolean;
  emptyInvalid = false;
  compoundForm: FormGroup;
  isError = false;
  selectedAction: ActionOfCompound;
  selectedCompoundActions: ActionOfCompound[];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private compService: CompoundService,
              private changeDetector: ChangeDetectorRef) {
    this.compoundActions = [];
    this.creating = this.router.url.startsWith('/compounds/new');
    this.activatedRoute.queryParams.subscribe(value => {
      this.size = !value.actionSize ? 10 : value.actionSize;
      this.page = !value.actionPage ? 0 : value.actionPage;
    });
    this.activatedRoute.params.subscribe(value => {
      this.compound = this.activatedRoute.snapshot.data.compound;
      if (!!this.compound) {
        this.compoundActions = this.compound.actions.sort((a, b) => a.orderNum - b.orderNum);
      }
    });
    this.activatedRoute.data.subscribe(value => {
      this.actions = this.activatedRoute.snapshot.data.actionPage;
      this.actionsAsCompActions = this.actions.list.map<ActionOfCompound>(value1 => ({
        action: value1,
        orderNum: 0,
        parameterKey: value1.parameterKey
      }));
    });
    this.compoundForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.changeDetector.detectChanges();
  }

  adjustOrder(actions: ActionOfCompound[]): void {
    actions.forEach((value, index) => value.orderNum = index + 1);
  }

  drop(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer.id === 'cdk-drop-list-0' && event.previousContainer === event.container) {
      moveItemInArray(this.compoundActions, event.previousIndex, event.currentIndex);
    } else if (event.previousContainer.id === 'cdk-drop-list-1' && event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else if (event.previousContainer.id === 'cdk-drop-list-0' && event.previousContainer !== event.container) {
      this.compoundActions.splice(event.previousIndex, 1);
    } else if (event.previousContainer.id === 'cdk-drop-list-1' && event.previousContainer !== event.container) {
      const dataAct = event.previousContainer.data[event.previousIndex];
      if (dataAct.action.type === 'COMPOUND'){
        this.compService.getCompoundById(dataAct.action.id).subscribe(value => {
          dataAct.compoundActions = value.actions.sort((a, b) => a.orderNum - b.orderNum);
          this.compoundActions.splice(event.currentIndex, 0, JSON.parse(JSON.stringify(dataAct)));
          this.adjustOrder(this.compoundActions);
        });
      }else {
        this.compoundActions.splice(event.currentIndex, 0, JSON.parse(JSON.stringify(dataAct)));
        this.adjustOrder(this.compoundActions);
      }
    }
  }

  getCompoundActions(action: Action): Observable<CompoundModel> {
    return this.compService.getCompoundById(action.id);
  }

  submit(): void {
    this.emptyInvalid = this.compoundActions.length === 0;
    if (this.creating && !this.emptyInvalid && this.compoundForm.valid) {
      this.compoundActions.map(
        (value, index, array) => value.action.type === 'COMPOUND'
          ? this.compoundActions.splice(index, 1, ...value.compoundActions) : value);
      this.adjustOrder(this.compoundActions);
      this.compService.createCompound(
        {
          name: this.compoundForm.value.name,
          description: this.compoundForm.value.description,
          actions: this.compoundActions
        }
      ).subscribe(value => this.router.navigate(['compounds'], {queryParams: {created: true}}));
    }
    else {
      this.isError = true;
    }
  }
  delete(): void {
    this.compService.deleteCompound(this.compound.id).subscribe(value => {
      this.router.navigate(['compounds']);
    });
  }

  pageParamsChange(event: PageEvent): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {actionSize: event.pageSize, actionPage: event.pageIndex}, queryParamsHandling: 'merge'
    });
  }

  popoverToggle(): boolean {
    $('[data-toggle="popover"]').popover();
    $(document).on('click', () => {
      $('.popover').popover('dispose');
    });
    return false;
  }

  modalShow(): void {
    $('#discardModal').modal('show');
  }

  closeAlert(): void {
    $('.alert').alert('close');
  }

  modalDelShow(): void {
    $('#deleteModal').modal('show');
  }

  showActionDetails(action: ActionOfCompound): void {
    this.selectedAction = action;
    if (action.action.type === 'COMPOUND') {
      this.getCompoundActions(action.action).subscribe(value => {
        this.selectedCompoundActions = value.actions.sort((a, b) => a.orderNum - b.orderNum);
      });
    }else {
      this.selectedCompoundActions = [];
    }
  }

  navToCompound(action: Action): void {
    if (action.type === 'COMPOUND') {
      this.router.navigate(['compounds', 'edit', action.id]);
    }
  }

  changeCompoundActionKey(event: any, action: ActionOfCompound, id: number) {
    this.compoundActions.find(compound => compound.action.id === id).compoundActions
      .find(cAction => action.orderNum === cAction.orderNum).parameterKey.key = event;
  }
}
