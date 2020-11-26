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
  displayedColumns: string[] = ['user_id','select','name', 'surname', 'email', 'role', 'activated', 'editBtn'];
  listUsers: UserModel[] = [];
  dataSource : any;
  length = 0;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 15];
  filter = '';
  orderBy = '';
  order = '';

  selection = new SelectionModel<UserModel>(true, []);

  constructor(private httpClientService: HttpClientService) {
    this.selectedUser = '';
    this.listUsers =[];
    this.dataSource = null;
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.httpClientService.getPaginatedUsers(this.pageSize, this.pageIndex, this.filter, this.orderBy, this.order)
      .subscribe(
      response => {
        this.listUsers = response;
        this.dataSource = new MatTableDataSource(this.listUsers);
        // console.log(JSON.stringify(this.listUsers));
      },
      error => console.log(error)
    );
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
      this.dataSource.data.forEach((row: UserModel) => this.selection.select(row));
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
    this.reloadUsers();
  }

  reloadUsers(): void {
    this.httpClientService.getPaginatedUsers(this.pageSize, this.pageIndex, this.filter, this.orderBy, this.order)
      .subscribe(
      response => {
        this.listUsers = response;
        this.dataSource = new MatTableDataSource(this.listUsers);
        // console.log(JSON.stringify(this.listUsers));
      },
      error => console.log(error)
    );
  }

  reloadNumberOfUsers(): void {
    this.httpClientService.getNumberOfUsers(this.pageSize)
      .subscribe(
        data => this.length = data
      );
  }

  ngOnInit(): void {
    this.reloadNumberOfUsers();
    this.reloadUsers();
    this.httpClientService.getPaginatedUsers(this.pageSize, this.pageIndex, this.filter, this.orderBy, this.order)
      .subscribe(
      response => {
        this.listUsers = response;
        this.dataSource = new MatTableDataSource(this.listUsers);
        // console.log(JSON.stringify(this.listUsers));
      },
      error => console.log(error)
    );
  }
}
