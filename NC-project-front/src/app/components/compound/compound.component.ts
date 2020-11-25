import {SelectionModel} from '@angular/cdk/collections';
import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';

export interface PeriodicElement {
  position: number;
  name: string;
  description: string;

}

export interface PeriodicElement2 {
  position: number;
  name: string;
  key: string;
}

export interface PeriodicElement3 {
  position: number;
  name: string;
  key: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Compound #10', description: 'Ipsum illum he la pillotre illum he la pillotre'},
  {position: 2, name: 'Compound #9', description: 'Ipsum illum he la pillotre illum he la pillotre'},
  {position: 3, name: 'Compound #8', description: 'Ipsum illum he la pillotre illum he la pillotre'},
  {position: 4, name: 'Compound #7', description: 'Ipsum illum he la pillotre'},
  {position: 5, name: 'Compound #6', description: 'Ipsum illum he la pillotre'},
  {position: 6, name: 'Compound #5', description: 'Ipsum illum he la pillotre'},
  {position: 7, name: 'Compound #4', description: 'Ipsum illum he la pillotre'},
  {position: 8, name: 'Compound #3', description: 'Ipsum illum he la pillotre'},
  {position: 9, name: 'Compound #2', description: 'Ipsum illum he la pillotre'},
  {position: 10, name: 'Compound #1', description: 'Ipsum illum he la pillotre'},
];

const ELEMENT_DATA2: PeriodicElement2[] = [
  {position: 1, name: 'Action #8', key:''},
  {position: 2, name: 'UserName Field ID', key:'userNameFieldID'},
  {position: 3, name: 'Action #6', key:''},
  {position: 4, name: 'UserName Value', key:'userNameValue'},
  {position: 5, name: 'UserPass Value', key:'userPassValue'},
];



const ELEMENT_DATA3: PeriodicElement3[] = [
  {position: 1, name: 'Action #12', key:''},
  {position: 2, name: 'UserName Field ID', key:'userNameFieldID'},
  {position: 3, name: 'Action #6', key:''},
  {position: 4, name: 'UserName Value', key:'userNameValue'},
  {position: 5, name: 'UserPass Value', key:'userPassValue'},
];

/**
 * @title Basic Inputs
 */
@Component({
  selector: 'app-compound',
  templateUrl: './compound.component.html',
  styleUrls: ['./compound.component.scss']
})
export class CompoundComponent {
  displayedColumns: string[] = ['select', 'position', 'name', 'description', 'open', 'edit'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  displayedColumns2: string[] = ['position', 'name', 'key', 'delete'];
  dataSource2 = new MatTableDataSource<PeriodicElement2>(ELEMENT_DATA2);
  @ViewChild(MatTableDataSource,{static:true}) table: MatTableDataSource<any>;


  displayedColumns3: string[] = ['position', 'name', 'key', 'plus'];
  dataSource3 = new MatTableDataSource<PeriodicElement3>(ELEMENT_DATA3);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
  }

  constructor(private _snackBar: MatSnackBar) {}

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
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  /** Delete all compounds if they are selected */
  deleteCompound(){
    this.dataSource.data = this.dataSource.data.filter(row => {return !this.selection.isSelected(row)});
    this.selection.clear();
  }

  /** Delete action in compound */
  deleteRowData(obj){
    this.dataSource2.data = this.dataSource2.data.filter((value,key)=>{
      return value.position != obj.position;
    });
  }

  addFromAllListToCompound(obj){
    this.dataSource2.data.unshift({position : this.dataSource2.data.length + 1 , name : obj.name, key : obj.key});
    return this.dataSource2.filter = "";
    /*this.dataSource3.data = this.dataSource3.data.filter((value,key)=>{

    });*/
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
    return (prev.position > current.position) ? prev : current
    })
    this.dataSource.data.unshift({position : max.position + 1, name : 'Compound #'+(max.position + 1), description: " "});
    return this.dataSource.filter = "";
  }

}
