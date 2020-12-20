import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProjectModel} from '../../../models/ProjectModel';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {ProjectResponseModel} from '../../../models/ProjectResponseModel';
import {tap} from 'rxjs/operators';
import {apiPath} from "../../../../globals";
import {ReportModel} from "../../../models/ReportModel";


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  postProject(project: ProjectModel) {
    console.log(project);
    return this.httpClient.post(apiPath + 'api/ncp/project', project);
  }

  getPaginatedProjects(pageSize: number,
                       pageIndex: number,
                       filter: string,
                       orderBy: string,
                       order: string): Observable<ProjectResponseModel> {
    return this.httpClient.get<ProjectResponseModel>(
      apiPath + 'api/ncp/project/list'
      + '?pageSize=' + pageSize
      + '&pageIndex=' + pageIndex
      + '&filter=' + filter
      + '&orderBy=' + orderBy
      + '&order=' + order)
      .pipe(tap(() => {
      }, e => {
        if (e.status) {
          this.router.navigate(['404']);
        }
      }));
  }

  updateProject(project: ProjectModel) {
    return this.httpClient.put(apiPath + 'api/ncp/project', project);
  }

  sendReport(reportDto: ReportModel): Observable<any>{
    return this.httpClient.post(apiPath + 'api/ncp/project/send-report', reportDto);
  }

}
