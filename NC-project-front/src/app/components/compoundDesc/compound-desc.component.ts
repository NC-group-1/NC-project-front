import {Component, ViewChild, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {CompoundListService} from '../../services/compound/compoundList.service';
import {CompoundModel} from '../../../models/CompoundModel';
import {MatSnackBar} from '@angular/material/snack-bar';

/**
 * @title Basic Inputs
 */
@Component({
  selector: 'app-compoundDesc',
  templateUrl: './compound-desc.component.html',
  styleUrls: ['./compound-desc.component.scss']
})
export class CompoundDescComponent {

  displayedColumns2: string[] = ['id', 'name', 'key', 'delete'];
  listActions: CompoundModel[];
  dataSource2 = new MatTableDataSource<CompoundModel>();

  displayedColumns3: string[] = ['id', 'name', 'key', 'plus'];
  listAllActions: CompoundModel[];
  dataSource3 = new MatTableDataSource<CompoundModel>();

  length = 0;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 15];

  constructor(private compoundListService: CompoundListService, private _snackBar: MatSnackBar){
    this.listActions = [];
    this.listAllActions = [];
    this.dataSource2 = null;
    this.dataSource3 = null;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['mat-primary']
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }

  /** Delete action in compound */
  deleteRowData(obj){
    this.dataSource2.data = this.dataSource2.data.filter((value,key)=>{
      return value.id != obj.id;
    });
  }

  addFromAllListToCompound(obj){
    this.dataSource2.data.unshift({id : this.dataSource2.data.length + 1 , name : obj.name, key : obj.key});
    return this.dataSource2.filter = "";
  }

  onPaginationChange(pageEvent: PageEvent): void {
    this.pageSize = pageEvent.pageSize;
    this.pageIndex = pageEvent.pageIndex;
    this.reloadActions();
  }

  reloadActions(): void {
    this.compoundListService.getPaginatedAction(this.pageSize, this.pageIndex)
       .subscribe((data: CompoundModel[]) => {
      this.dataSource3.data = data;
      this.listAllActions = data;
    });
  }

  reloadNumberOfCompounds(): void {
    this.compoundListService.getNumberOfAction().subscribe((data: number) => {
        this.length = data;
    });
  }

}
