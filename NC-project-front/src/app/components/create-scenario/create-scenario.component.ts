import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CompoundModel} from '../../../models/CompoundModel';
import {ActionPage} from '../../../models/action-page';
import {Action} from '../../../models/action';
import {ActionOfCompound} from '../../../models/ActionOfCompound';
import {PageEvent} from '@angular/material/paginator';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CompoundService} from '../../services/compound/compound.service';
import {state, style, trigger} from '@angular/animations';
import {MatTableDataSource} from "@angular/material/table";
import {CompoundPage} from "../../../models/CompoundPage";
import {ScenarioService} from "../../services/scenario/scenario.service";
import {AuthenticationService} from "../../services/auth/authentication.service";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {fromEvent} from "rxjs";
import {debounceTime, map} from "rxjs/operators";

declare var $: any;

@Component({
  selector: 'app-create-scenario',
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
  templateUrl: './create-scenario.component.html',
  styleUrls: ['./create-scenario.component.css']
})
export class CreateScenarioComponent implements OnInit, AfterViewInit {

  compound: CompoundModel;
  actions: ActionPage;
  compoundActions: ActionOfCompound[];
  actionsAsCompActions: ActionOfCompound[];
  // responseScenario: ScenarioResponseModel;
  size: number;
  page: number;
  creating: boolean;
  emptyInvalid = false;
  scenarioForm: FormGroup;
  isError = false;
  selectedAction: ActionOfCompound;
  dataSource: MatTableDataSource<any>;
  compoundPage: CompoundPage;
  currentPage: number;
  nameSearch = false;
  user_id: number;
  project_id: number;

  @ViewChild('search', {static: false}) search: any

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private compService: CompoundService,
              private scenarioService: ScenarioService,
              private changeDetector: ChangeDetectorRef,
              private auth: AuthenticationService) {
    this.compoundActions = [];
    this.creating = this.router.url.startsWith('/testScenarios/new');
    this.user_id = parseInt(auth.getId(), 10);
    this.activatedRoute.queryParams.subscribe(value => {
      this.size = !value.actionSize ? 10 : value.actionSize;
      this.page = !value.actionPage ? 0 : value.actionPage;
    });
    this.activatedRoute.params.subscribe(() => {
      this.compound = this.activatedRoute.snapshot.data.compound;
      if (!!this.compound) {
        this.compoundActions = this.compound.actions.sort((a, b) => a.orderNum - b.orderNum);
      }
    });
    this.activatedRoute.data.subscribe(() => {
      this.actions = this.activatedRoute.snapshot.data.actionPage;
      this.actionsAsCompActions = this.actions.list.map<ActionOfCompound>(value1 => ({
        action: value1,
        orderNum: 0,
        key: value1.key
      }));
    });
    this.scenarioForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.clearQuery();
  }

  clearQuery(): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {name: null, description: null},
      queryParamsHandling: 'merge'
    });
  }

  ngAfterViewInit(): void {
    fromEvent(this.search.nativeElement, 'keydown').pipe(
      debounceTime(550),
      map(x => x['target']['value'])).subscribe(value => {
      // this.updateFilter(value);
    })
    this.changeDetector.detectChanges();
  }

  // updateFilter(val: any) {
  //   const count = this.compoundActions.length;
  //   this.actionsAsCompActions = this.compoundActions.filter(value => {
  //     for (let i = 0; i < count; i++) {
  //       return !!value.toLocaleLowerCase().trim().match(val.toLocaleLowerCase().trim());
  //     }
  //   });
  // }

  adjustOrder(actions: ActionOfCompound[]): void {
    actions.forEach((value, index) => value.orderNum = index + 1);
  }

  drop(event: CdkDragDrop<any[]>) {
    console.log(event);
    if (event.previousContainer.id === 'cdk-drop-list-0' && event.previousContainer === event.container) {
      moveItemInArray(this.compoundActions, event.previousIndex, event.currentIndex);
    } else if (event.previousContainer.id === 'cdk-drop-list-1' && event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else if (event.previousContainer.id === 'cdk-drop-list-0' && event.previousContainer !== event.container) {
      this.compoundActions.splice(event.previousIndex, 1);
    } else if (event.previousContainer.id === 'cdk-drop-list-1' && event.previousContainer !== event.container) {
      this.compoundActions.splice(event.currentIndex, 0, JSON.parse(JSON.stringify(event.previousContainer.data[event.previousIndex])));
      this.adjustOrder(this.compoundActions);
    }
    this.adjustOrder(this.compoundActions);
    // this.updateFilter(this.search.nativeElement.value);
  }

  submit(): void {
    this.emptyInvalid = this.compoundActions.length === 0;
    if (this.creating && !this.emptyInvalid && this.scenarioForm.valid) {
      this.scenarioService.createTestScenario(
        {
          name: this.scenarioForm.value.name,
          description: this.scenarioForm.value.description,
          user_id: this.user_id,
          actions: this.compoundActions
        }
      ).subscribe(() => this.router.navigate(['testScenarios'], {queryParams: {created: true}}));
    } else if (!this.emptyInvalid && this.scenarioForm.valid) {
      this.compService.updateCompound(
        {
          id: this.compound.id,
          name: this.scenarioForm.value.name,
          description: this.scenarioForm.value.description,
          type: 'COMPOUND'
        }).subscribe(value => {
        this.compService.changeActions(this.compound.id, this.compoundActions).subscribe(
          () => {
            this.router.navigate(['testScenarios'], {queryParams: {created: true}});
          }
        );
      });
    } else {
      this.isError = true;
    }
  }

  delete(): void {
    this.compService.deleteCompound(this.compound.id).subscribe();
    this.router.navigate(['testScenarios']);
  }

  searchByName(): void {
    this.clearQuery();
    this.nameSearch = !this.nameSearch;
  }

  findName(event: any): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {name: event.target.value},
      queryParamsHandling: 'merge'
    });
  }

  pageParamsChange(event: PageEvent): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {actionSize: event.pageSize, actionPage: event.pageIndex},
      queryParamsHandling: 'merge'
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
  }

  navToCompound(action: Action): void {
    if (action.type === 'COMPOUND') {
      this.router.navigate(['compounds', 'edit', action.id]);
    }
  }

  sortBy(event: any): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {orderBy: event.active, direction: event.direction},
      queryParamsHandling: 'merge'
    });
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
}

