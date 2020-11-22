import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {HttpClientService} from '../service/http-client.service';
import {ProjectModel} from '../../model/ProjectModel';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.scss']
})
export class ListProjectComponent implements OnInit{
  selectedProject: string;
  displayedColumns: string[] = ['radioBtn', 'name', 'link', 'date', 'role', 'archived', 'editBtn'];
  listProject: ProjectModel[];
  dataSource: any;

  constructor(private httpClientService: HttpClientService) {
    this.selectedProject = '';
    this.listProject = [];
    this.dataSource = null;

    this.httpClientService.getProjects().subscribe(
      response => {
        this.listProject = response;
        this.dataSource = new MatTableDataSource(this.listProject);
      },
      error => console.log(error)
    );
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
    this.listProject[index].edit = !this.listProject[index].edit;

    if(this.listProject[index].edit == false) {
      this.httpClientService.updateProject(this.listProject[index])
        .subscribe(
          response => console.log(response),
          error => console.log(error)
        );
    }
  }

  ngOnInit(): void {
  }
}
