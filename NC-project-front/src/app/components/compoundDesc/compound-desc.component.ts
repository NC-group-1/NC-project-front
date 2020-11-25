import {SelectionModel} from '@angular/cdk/collections';
import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';


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
  selector: 'app-compoundDesc',
  templateUrl: './compound-desc.component.html',
  styleUrls: ['./compound-desc.component.scss']
})
export class CompoundDescComponent {

  displayedColumns2: string[] = ['position', 'name', 'key', 'delete'];
  dataSource2 = new MatTableDataSource<PeriodicElement2>(ELEMENT_DATA2);
  @ViewChild(MatTableDataSource,{static:true}) table: MatTableDataSource<any>;


  displayedColumns3: string[] = ['position', 'name', 'key', 'plus'];
  dataSource3 = new MatTableDataSource<PeriodicElement3>(ELEMENT_DATA3);

  constructor(private _snackBar: MatSnackBar) {}

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
      return value.position != obj.position;
    });
  }

  addFromAllListToCompound(obj){
    this.dataSource2.data.unshift({position : this.dataSource2.data.length + 1 , name : obj.name, key : obj.key});
    return this.dataSource2.filter = "";
    /*this.dataSource3.data = this.dataSource3.data.filter((value,key)=>{

    });*/
  }

}
