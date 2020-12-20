import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ProjectService} from '../../services/projects/project.service';
import {ProjectModel} from '../../../models/ProjectModel';
import {PageEvent} from '@angular/material/paginator';
import {ProjectResponseModel} from '../../../models/ProjectResponseModel';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MatSort} from "@angular/material/sort";
import {UserDataModel} from "../../../models/UserDataModel";

declare var $: any;

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.scss']
})
export class ListProjectComponent implements OnInit {
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
  created: boolean;
  projectForm: FormGroup;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private httpClientService: ProjectService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      orderBy: new FormControl('name'),
      order: new FormControl('ASC')
    });
    this.created = !!this.activatedRoute.snapshot.queryParamMap.get('created');
    this.selectedProject = '';
    this.listProjects = [];
    this.dataSource = new MatTableDataSource();
    this.reloadProjects();
  }

  reloadProjects(): void {
    this.httpClientService.getPaginatedProjects(this.pageSize, this.pageIndex + 1, this.filter, this.projectForm.value.orderBy, this.projectForm.value.order)
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

  sortData() {
    this.projectForm.value.order = this.sort.direction.toUpperCase();
    this.projectForm.value.orderBy = this.sort.active;
    this.reloadProjects();
  }

  open() {
    // console.log(this.selectedProject);
    this.router.navigateByUrl('/testCase');
  }

  updateName(index: number, name: string) {
    this.listProjects[index].name = name;
  }

  updateLink(index: number, link: string) {
    this.listProjects[index].link = link;
  }

  change(index: number) {
    this.listProjects[index].edit = !this.listProjects[index].edit;

    if (!this.listProjects[index].edit) {
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

  // sortData(orderBy: string) {
  //   this.orderBy = orderBy;
  //   this.order == '' ? this.order = 'DESC' : this.order = '';
  //   this.reloadProjects();
  // }

  closeAlert(): void {
    $('.alert').alert('close');
  }

  openProfile(id: number) {
    this.router.navigateByUrl('/user/profile');
  }
}
