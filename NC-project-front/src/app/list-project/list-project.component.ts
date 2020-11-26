import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {HttpClientService} from '../service/http-client.service';
import {ProjectModel} from '../../model/ProjectModel';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.scss']
})
export class ListProjectComponent implements OnInit{
  selectedProject: string;
  displayedColumns: string[] = ['project_id', 'radioBtn', 'name', 'link', 'date', 'role', 'archived', 'editBtn'];
  listProject: ProjectModel[];
  dataSource: any;
  length = 0;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 15];

  constructor(private httpClientService: HttpClientService) {
    this.selectedProject = '';
    this.listProject = [];
    this.dataSource = null;
  }
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  open() {
    console.log(this.selectedProject);
  }

  updateName(index: number, name: string) {
    this.listProject[index].name = name;
  }

  updateLink(index: number, link: string) {
    this.listProject[index].link = link;
  }

  change(index: number) {
    this.listProject[index].edit = !this.listProject[index].edit;

    if(!this.listProject[index].edit) {
      this.httpClientService.updateProject(this.listProject[index])
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

  reloadProjects(): void {
    this.httpClientService.getPaginatedProjects(this.pageSize, this.pageIndex)
      .subscribe(
        data => {
          this.listProject = data;
          this.dataSource = new MatTableDataSource(this.listProject);
        }
      );
  }
  reloadNumberOfProjects(): void {
    this.httpClientService.getNumberOfProjects(this.pageSize)
      .subscribe(
      data => this.length = data
    );
  }

  ngOnInit(): void {
    this.reloadNumberOfProjects();
    this.reloadProjects();
    this.httpClientService.getPaginatedProjects(this.pageSize, this.pageIndex).subscribe(
      response => {
        this.listProject = response;
        this.dataSource = new MatTableDataSource(this.listProject);
        // console.log(JSON.stringify(this.listProject));
      },
      error => console.log(error)
    );

  }
}
