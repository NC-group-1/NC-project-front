import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {HttpClientService} from '../../services/projects/http-client.service';
import {ProjectModel} from '../../../models/ProjectModel';
import {PageEvent} from '@angular/material/paginator';
import {ProjectResponseModel} from '../../../models/ProjectResponseModel';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.scss']
})
export class ListProjectComponent implements OnInit{
  selectedProject: string;
  displayedColumns: string[] = ['project_id', 'name', 'link', 'date', 'role', 'archived', 'editBtn'];
  responseProject?: ProjectResponseModel;
  listProjects: ProjectModel[];
  dataSource: any;
  length = 0;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 15];
  filter = '';
  orderBy = '';
  order = '';

  constructor(private httpClientService: HttpClientService) {
    this.selectedProject = '';
    this.listProjects = [];
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.reloadProjects();
  }

  reloadProjects(): void {
    console.log(this.orderBy);
    this.httpClientService.getPaginatedProjects(this.pageSize, this.pageIndex + 1, this.filter, this.orderBy, this.order)
      .subscribe(
        response => {
          // console.log(JSON.stringify(response));
          this.responseProject = response;
          this.listProjects = response.list;
          console.log(this.listProjects);
          this.dataSource = new MatTableDataSource(this.listProjects);
          this.length = response.size;
          // console.log(JSON.stringify(this.listUsers));
        },
        error => console.log(error)
      );
  }

  applyFilter(event: Event) {
    this.filter = (event.target as HTMLInputElement).value;
    this.reloadProjects();
  }

  open() {
    console.log(this.selectedProject);
  }

  updateName(index: number, name: string) {
    this.listProjects[index].name = name;
  }

  updateLink(index: number, link: string) {
    this.listProjects[index].link = link;
  }

  change(index: number) {
    this.listProjects[index].edit = !this.listProjects[index].edit;

    if(!this.listProjects[index].edit) {
      this.httpClientService.updateProject(this.listProjects[index])
        .subscribe(
          response => console.log(response),
          error => console.log(error)
        );
    }
  }

  onPaginationChange(pageEvent: PageEvent): void {
    this.pageSize = pageEvent.pageSize;
    this.pageIndex = pageEvent.pageIndex;
    this.reloadProjects();
  }

  sortData(orderBy: string) {
    this.orderBy = orderBy;
    this.order == '' ? this.order = 'DESC' : this.order = '';
    this.reloadProjects();
  }
}
