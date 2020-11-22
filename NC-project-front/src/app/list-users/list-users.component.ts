import { Component } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

export interface ListUsers {
  name: string;
  surname: string;
  email: string;
  role: string;
  activate: boolean;
  edit: boolean;
}

@Component({
  selector: 'app-list-project',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent {
  selectedUser: string;
  displayedColumns: string[] = ['radioBtn', 'name', 'surname', 'email', 'role', 'activate', 'editBtn'];
  listUsers: ListUsers[] = [
    {name: 'Name1', surname: 'Surname1', email: 'email1', role: 'Admin', activate: false, edit: false},
    {name: 'Name2', surname: 'Surname2', email: 'email2', role: 'Admin', activate: false, edit: false}
  ];
  dataSource = new MatTableDataSource(this.listUsers);

  constructor() {
    this.selectedUser = '';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  open() {
    console.log(this.selectedUser);
  }

  updateName(index: number, name: string) {
    this.listUsers[index].name = name;
  }

  updateSurname(index: number, surname: string) {
    this.listUsers[index].surname = surname;
  }

  change(index: number) {
    // console.log(JSON.stringify(this.listProject));
    this.listUsers[index].edit = !this.listUsers[index].edit;
  }
}
