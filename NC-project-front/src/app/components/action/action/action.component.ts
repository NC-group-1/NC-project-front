import {Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Action} from '../../../../models/action';
import {ActionService} from '../../../services/action/action.service';
import {MatPaginator} from '@angular/material/paginator';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {

  actions: Action[];
  length = 0;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 15];

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // pageEvent: PageEvent;

  constructor(private actionService: ActionService) { }

  onPaginationChange(pageEvent: PageEvent): void {
    this.pageSize = pageEvent.pageSize;
    this.pageIndex = pageEvent.pageIndex;
    this.reloadActions();
  }

  reloadActions(): void {
    this.actionService.getPaginatedActions(this.pageSize, this.pageIndex)
      .subscribe((data: Action[]) => {
      this.actions = data;
    });
  }

  reloadNumberOfActions(): void {
    this.actionService.getNumberOfActions().subscribe((data: number) => {
      this.length = data;
    });
  }

  ngOnInit(): void {
    this.reloadNumberOfActions();
    this.reloadActions();
  }

}
