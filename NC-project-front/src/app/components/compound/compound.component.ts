import {SelectionModel} from '@angular/cdk/collections';
import {Component, ViewChild, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {CompoundListService} from '../../services/compound/compoundList.service';
import {CompoundModel} from '../../../models/CompoundModel';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CompoundsPage} from '../../../models/CompoundsPage';

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
    const numRows = this.dataSource?.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource?.data.forEach(row => this.selection.select(row));
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
    this.dataSource.data = this.dataSource?.data.filter(row => {return !this.selection.isSelected(row)});
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
    const max = this.dataSource?.data.reduce((prev,current)=>{
    return (prev.id > current.id) ? prev : current
    })
    this.dataSource?.data.unshift({id : max.id + 1, name : 'Compound #'+(max.id + 1), description: " "});
    return this.dataSource.filter = "";
  }

  onPaginationChange(pageEvent: PageEvent): void {
    this.pageSize = pageEvent.pageSize;
    this.pageIndex = pageEvent.pageIndex;
    this.reloadCompounds();
  }

  reloadCompounds(): void {
    this.compoundListService.getPaginatedCompounds()
       .subscribe((data: CompoundsPage) => {
      this.dataSource.data = data.list;
      this.length = data.size;
      this.listCompound = data.list;
    });
  }


  ngOnInit(): void {
    this.compoundListService.getPaginatedCompounds().subscribe(
      response => {
        this.listCompound = response.list;
        this.dataSource = new MatTableDataSource(this.listCompound);
      },
      error => console.log(error)
    );

  }

}
