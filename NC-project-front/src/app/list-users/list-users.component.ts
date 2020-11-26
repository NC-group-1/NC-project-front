import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {PageEvent} from '@angular/material/paginator';
import {HttpClientService} from '../service/http-client.service';
import {UserModel} from '../../model/UserModel';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})

export class ListUsersComponent implements OnInit {
  selectedUser: string;
  length = 0;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 15];

  displayedColumns: string[] = ['user_id','select','name', 'surname', 'email', 'role', 'activated', 'editBtn'];
  listUsers: UserModel[] = [
    {name: 'Name1', surname: 'Surname1', email: 'email1', role: 'Admin', activated: false, edit: false},
    {name: 'Name2', surname: 'Surname2', email: 'email2', role: 'Manager', activated: false, edit: false}
  ];

  dataSource = new MatTableDataSource<UserModel>(this.listUsers);
  selection = new SelectionModel<UserModel>(true, []);

  constructor(private httpClientService: HttpClientService) {
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

  checkboxLabel(row?: UserModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.user_id + 1}`;
  }

  onPaginationChange (pageEvent: PageEvent): void {
    this.pageSize = pageEvent.pageSize;
    this.pageIndex = pageEvent.pageIndex;
    this.reloadActions();
  }

  reloadActions(): void {
    this.httpClientService.getPaginatedActions(this.pageSize, this.pageIndex)
      .subscribe((data: UserModel[]) => {
        this.listUsers = data;
      });
  }

  reloadNumberOfActions(): void {
    this.httpClientService.getNumberOfActions().subscribe((data: number) => {
      this.length = data;
    });
  }

  ngOnInit(): void {
    this.reloadNumberOfActions();
    this.reloadActions();
  }
}
