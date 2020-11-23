import { Component } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';

export interface ListUsers {
  name: string;
  surname: string;
  email: string;
  role: string;
  activated: boolean;
  edit: boolean;
}

@Component({
  selector: 'app-list-project',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements AfterViewInit{
  selectedUser: string;
  displayedColumns: string[] = ['select', 'name', 'surname', 'email', 'role', 'activated', 'editBtn'];
  listUsers: ListUsers[] = [
    {name: 'Name1', surname: 'Surname1', email: 'email1', role: 'Admin', activated: false, edit: false},
    {name: 'Name2', surname: 'Surname2', email: 'email2', role: 'Manager', activated: false, edit: false}
  ];
  dataSource = new MatTableDataSource<ListUsers>(this.listUsers);
  selection = new SelectionModel<ListUsers>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor() {
    this.selectedUser = '';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  activate() {
    this.selection.selected.forEach(select => select.activated = !select.activated);
  }

  updateName(index: number, name: string) {
    this.listUsers[index].name = name;
  }

  updateSurname(index: number, surname: string) {
    this.listUsers[index].surname = surname;
  }

  updateEmail(index: number, email: string) {
    this.listUsers[index].email = email;
  }

  change(index: number) {
    // console.log(JSON.stringify(this.listProject));
    this.listUsers[index].edit = !this.listUsers[index].edit;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: ListUsers): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name + 1}`;
  }


}
