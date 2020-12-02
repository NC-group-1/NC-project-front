import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {PageEvent} from '@angular/material/paginator';
import {HttpClientService} from '../../services/users/http-client.service';
import {UserResponseModel} from '../../../models/UserResponseModel';
import {UserListModel} from '../../../models/UserListModel';
import {Sort} from '@angular/material/sort';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../services/auth/authentication.service";
import {UserModel} from "../../../models/UserModel";

@Component({
  selector: 'app-list-project',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})

export class ListUsersComponent implements OnInit {
  selectedUser: string;
  hasSearchingPermission: boolean;
  displayedColumns: string[] = ['user_id', 'select', 'name', 'surname', 'email', 'role', 'activated', 'editBtn'];
  responseUser?: UserResponseModel;
  listUsers: UserListModel[];
  user: UserListModel;
  dataSource: MatTableDataSource<any>;
  length = 0;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 15];
  filter = '';
  orderBy = '';
  order = '';

  selection = new SelectionModel<UserListModel>(true, []);

  constructor(private activatedRoute: ActivatedRoute, private httpClientService: HttpClientService, private auth: AuthenticationService) {
    this.selectedUser = '';
    this.listUsers = [];
    this.dataSource = new MatTableDataSource();
    this.activatedRoute.params.subscribe(param => {
      this.user = this.activatedRoute.snapshot.data.user;
      if (!auth.getRole().includes('engineer')){
        this.hasSearchingPermission = true;
      }
    });
  }

  ngOnInit(): void {
    this.reloadUsers();
  }

  reloadUsers(): void {
    console.log(this.orderBy);
    this.httpClientService.getPaginatedUsers(this.pageSize, this.pageIndex + 1, this.filter, this.orderBy, this.order)
      .subscribe(
        response => {
          // console.log(JSON.stringify(response));
          this.responseUser = response;
          this.listUsers = response.list;
          this.dataSource = new MatTableDataSource(this.listUsers);
          this.length = response.size;
          // console.log(JSON.stringify(this.listUsers));
        },
        error => console.log(error)
      );
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }


  applyFilter(event: Event) {
    this.filter = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    this.reloadUsers();
  }

  activate() {
    this.selection.selected.forEach(select => select.activated = !select.activated);
    this.selection.selected
      .forEach(value => {
          this.httpClientService.updateUser(value)
            .subscribe(
              response => console.log(response),
              error => console.log(error)
            );
        }
      );
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
    this.listUsers[index].edit = !this.listUsers[index].edit;

    if (!this.listUsers[index].edit) {
      this.httpClientService.updateUser(this.listUsers[index])
        .subscribe(
          response => console.log(response),
          error => console.log(error)
        );
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach((row: UserListModel) => this.selection.select(row));
  }

  checkboxLabel(row?: UserListModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.user_id + 1}`;
  }

  onPaginationChange(pageEvent: PageEvent): void {
    this.pageSize = pageEvent.pageSize;
    this.pageIndex = pageEvent.pageIndex;
    this.reloadUsers();
  }

  // sortData(orderBy: string) {
  //   this.orderBy = orderBy;
  //   this.order === '' ? this.order = 'DESC' : this.order = '';
  //   this.reloadUsers();
  // }

  sortBy(event: any): void {
    this.router.navigate([], {relativeTo: this.activatedRoute,
      queryParams: {orderBy: event.active, direction: event.direction}, queryParamsHandling: 'merge'});
  }
}
