import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProjectModel} from '../../../models/ProjectModel';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {ProjectResponseModel} from '../../../models/ProjectResponseModel';
import {tap} from 'rxjs/operators';
import {apiPath} from '../../../../globals';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient, private router: Router) {}

  getPaginatedProjects(pageSize: number,
                       pageIndex: number,
                       filter: string,
                       orderBy: string,
                       order: string): Observable<ProjectResponseModel>{
    return this.httpClient.get<ProjectResponseModel>(
      apiPath + 'project/get_project_list/' + pageIndex + '/' + pageSize
      + '?filter=' + filter
      + '&orderBy=' + orderBy
      + '&order=' + order
    ).pipe(tap(() => {}, e => {if (e.status) { this.router.navigate(['404']); } }));
  }

  postProject(project: ProjectModel) {
    return this.httpClient.post(apiPath + 'project', project);
  }

  updateProject(project: ProjectModel) {
    return this.httpClient.post(apiPath + 'project/update', project);
  }

}
