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
  selectedCompounds: string;
  displayedColumns: string[] = ['id', 'radioBtn', 'name', 'description', 'open', 'edit'];
  listCompound: CompoundModel[];
  dataSource: any;

  length = 0;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 15];

  constructor(private compoundListService: CompoundListService, private _snackBar: MatSnackBar){
    this.selectedCompounds = '';
    this.listCompound = [];
    this.dataSource = null;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['mat-primary']
    });
  }

  /*open(index: number) {
    this.httpClientService.postProject(this.form.value)
      .subscribe(
        response => console.log(response),
        error => console.log(error)
      );
    this.router.navigateByUrl('/compound/description');
}
    console.log(this.selectedProject);
  }
*/

  /** Delete compound if they are selected */
/*  deleteCompound(index: number){
    this.listCompound[index].delete = !this.listCompound[index].delete;

    if(!this.listCompound[index].delete) {
      this.compoundListService.deleteCompound(this.listCompound[index])
        .subscribe(
          response => console.log(response),
          error => console.log(error)
        );
    }
  }*/

  updateDesc(index: number, description: string) {
    this.listCompound[index].description = description;
  }

  updateName(index: number, name: string) {
    this.listCompound[index].name = name;
  }

  change(index: number) {
    this.listCompound[index].edit = !this.listCompound[index].edit;

    if(!this.listCompound[index].edit) {
      this.compoundListService.updateCompound(this.listCompound[index])
        .subscribe(
          response => console.log(response),
          error => console.log(error)
        );
    }
  }

  /** Add new compound*/
  addCompound(){
    const max = this.dataSource?.data.reduce((prev,current)=>{
      return (prev.id > current.id) ? prev : current
    })

    this.dataSource?.data.unshift({id : max.id + 1, name : 'Compound #'+(max.id + 1), description: " "});
    return this.dataSource.filter = "";

    this.compoundListService.postCompound({id : max.id + 1, name : 'Compound #'+(max.id + 1), description: " "})
      .subscribe(
        response => console.log(response),
        error => console.log(error)
    );
  }

  onPaginationChange(pageEvent: PageEvent): void {
    this.pageSize = pageEvent.pageSize;
    this.pageIndex = pageEvent.pageIndex;
    this.reloadCompounds();
  }

  reloadCompounds(): void {
    this.compoundListService.getPaginatedCompounds()
       .subscribe((data: CompoundsPage) => {
      //this.dataSource.data = data.list;
      this.length = data.size;
      const newList = data.list.slice(this.pageSize*this.pageIndex,this.pageSize*this.pageIndex+this.pageSize);
      this.dataSource = new MatTableDataSource(newList);
      this.listCompound = newList;

    });
  }


  ngOnInit(): void {
    this.compoundListService.getPaginatedCompounds().subscribe(
      response => {
        this.length = response.size;
        this.listCompound = response.list;
        this.dataSource = new MatTableDataSource(this.listCompound);
      },
      error => console.log(error)
    );

  }

}
