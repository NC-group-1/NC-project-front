import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

export interface ListProject {
  name: string;
  link: string;
  date: string;
  creator: string;
  archived: boolean;
  edit: boolean;
}

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.scss']
})
export class ListProjectComponent {
  selectedProject: string;
  displayedColumns: string[] = ['radioBtn', 'name', 'link', 'date', 'creator', 'archived', 'editBtn'];
  listProject: ListProject[] = [
    {name: 'Project1', link: 'Link1', date: '1/1/2020', creator: 'Admin', archived: false, edit: false},
    {name: 'Project2', link: 'Link2', date: '2/1/2020', creator: 'Admin', archived: true, edit: false}
  ];
  dataSource = new MatTableDataSource(this.listProject);

  constructor() {
    this.selectedProject = '';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

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
    // console.log(JSON.stringify(this.listProject));
    this.listProject[index].edit = !this.listProject[index].edit;
  }
}
