import {SelectionModel} from '@angular/cdk/collections';
import {Component, ViewChild, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {CompoundListService} from '../../services/compound/compoundList.service';
import {CompoundModel} from '../../../models/CompoundModel';
import {MatSnackBar} from '@angular/material/snack-bar';

/*export interface PeriodicElement {
  id: number;
  name: string;
  description: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, name: 'Compound #10', description: 'Ipsum illum he la pillotre illum he la pillotre'},
  {id: 2, name: 'Compound #9', description: 'Ipsum illum he la pillotre illum he la pillotre'},
  {id: 3, name: 'Compound #8', description: 'Ipsum illum he la pillotre illum he la pillotre'},
  {id: 4, name: 'Compound #7', description: 'Ipsum illum he la pillotre'},
  {id: 5, name: 'Compound #6', description: 'Ipsum illum he la pillotre'},
  {id: 6, name: 'Compound #5', description: 'Ipsum illum he la pillotre'},
  {id: 7, name: 'Compound #4', description: 'Ipsum illum he la pillotre'},
  {id: 8, name: 'Compound #3', description: 'Ipsum illum he la pillotre'},
  {id: 9, name: 'Compound #2', description: 'Ipsum illum he la pillotre'},
  {id: 10, name: 'Compound #1', description: 'Ipsum illum he la pillotre'},
];*/

/**
 * @title Basic Inputs
 */
@Component({
  selector: 'app-compound',
  templateUrl: './compound.component.html',
  styleUrls: ['./compound.component.scss']
})
export class CompoundComponent implements OnInit {
  displayedColumns: string[] = ['select', 'id', 'name', 'description', 'open', 'edit'];
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  listCompound: CompoundModel[];
  dataSource = new MatTableDataSource<CompoundModel>();
  selection = new SelectionModel<CompoundModel>(true, []);
  length = 0;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 15];

  constructor(private compoundListService: CompoundListService, private _snackBar: MatSnackBar){
    this.listCompound = [];
    this.dataSource = null;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['mat-primary']
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: CompoundModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  /** Delete all compounds if they are selected */
  deleteCompound(){
    this.dataSource.data = this.dataSource.data.filter(row => {return !this.selection.isSelected(row)});
    this.selection.clear();
  }

  updateDesc(index: number, description: string) {
    this.dataSource[index].description = description;
  }

  updateName(index: number, name: string) {
    this.dataSource[index].name = name;
  }

  change(index: number) {
    this.dataSource[index].edit = !this.dataSource[index].edit;
  }

  /** Add new compound*/
  addCompound(){
    const max = this.dataSource.data.reduce((prev,current)=>{
    return (prev.id > current.id) ? prev : current
    })
    this.dataSource.data.unshift({id : max.id + 1, name : 'Compound #'+(max.id + 1), description: " "});
    return this.dataSource.filter = "";
  }

  onPaginationChange(pageEvent: PageEvent): void {
    this.pageSize = pageEvent.pageSize;
    this.pageIndex = pageEvent.pageIndex;
    this.reloadCompounds();
  }

  reloadCompounds(): void {
    this.compoundListService.getPaginatedCompounds(this.pageSize, this.pageIndex)
       .subscribe((data: CompoundModel[]) => {
      this.dataSource.data = data;
      this.listCompound = data;
    });
  }

  reloadNumberOfCompounds(): void {
    this.compoundListService.getNumberOfCompounds().subscribe((data: number) => {
        this.length = data;
    });
  }

    ngOnInit(): void {
      this.reloadNumberOfCompounds();
      this.reloadCompounds();
      this.compoundListService.getPaginatedCompounds(this.pageSize, this.pageIndex).subscribe(
        response => {
          this.listCompound = response;
          this.dataSource = new MatTableDataSource(this.listCompound);
        },
        error => console.log(error)
      );

    }
}
