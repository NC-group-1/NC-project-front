import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProjectModel} from '../../model/ProjectModel';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  private urlPath = 'http://localhost:8081/';

  constructor(private httpClient: HttpClient) {}

  postProject(project: ProjectModel) {
    return this.httpClient.post(this.urlPath + 'project', project);
  }

  getProjects() {
    return this.httpClient.get<ProjectModel[]>(this.urlPath + 'project');
  }

  updateProject(project: ProjectModel) {
    return this.httpClient.post(this.urlPath + 'project/update', project);
  }
}
