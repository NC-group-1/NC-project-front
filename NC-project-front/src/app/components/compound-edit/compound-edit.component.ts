import {AfterViewChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CompoundModel} from '../../../models/CompoundModel';
import {ActionPage} from '../../../models/action-page';
import {Action} from '../../../models/action';
import {CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem} from '@angular/cdk/drag-drop';
import {ActionOfCompound} from '../../../models/ActionOfCompound';

@Component({
  selector: 'app-compound-edit',
  templateUrl: './compound-edit.component.html',
  styleUrls: ['./compound-edit.component.css']
})
export class CompoundEditComponent implements OnInit {

  compound: CompoundModel;
  actions: ActionPage;
  compoundActions: ActionOfCompound[];
  actionsAsCompActions: ActionOfCompound[];
  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(value => {
      this.compound = this.activatedRoute.snapshot.data.compound;
      this.actions = this.activatedRoute.snapshot.data.actionPage;
      if (!!this.compound){
        this.compoundActions = this.compound.actions.sort((a, b) => a.orderNum - b.orderNum);
      }else {
        this.compoundActions = [];
      }
      this.actionsAsCompActions = this.actions.list.map<ActionOfCompound>(value1 => ({action: value1, orderNum: 0, key: value1.key}));
    });
  }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer === event.container){
      event.container.data[event.previousIndex].orderNum = event.currentIndex + 1;
      event.container.data[event.currentIndex].orderNum = event.previousIndex + 1;
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }else if (event.previousContainer.id === 'cdk-drop-list-0' && event.previousContainer !== event.container){
      this.compoundActions.splice(event.previousIndex, 1);
    }else if (event.previousContainer.id === 'cdk-drop-list-1' && event.previousContainer !== event.container){
      copyArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      // event.container[]
    }
  }

}
