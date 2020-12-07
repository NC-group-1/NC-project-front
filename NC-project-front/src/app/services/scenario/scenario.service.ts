import { Injectable } from '@angular/core';
import {CompoundModel} from "../../../models/CompoundModel";
import {Observable} from "rxjs";
import {apiPath} from "../../../../globals";
import {HttpClient} from "@angular/common/http";
import {ScenarioModel} from "../../../models/ScenarioModel";
import {Action} from "../../../models/action";
import {CompoundPage} from "../../../models/CompoundPage";
import {ProjectResponseModel} from "../../../models/ProjectResponseModel";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ScenarioService {

  constructor(private http: HttpClient, private router:  Router) { }

  getPaginatedScenario(pageSize: number, pageIndex: number, filter: string, orderBy: string, order: string, projectId: number): Observable<ScenarioModel>{
    return this.http.get<ScenarioModel>(
      apiPath + 'api/project/list'
      + '?pageSize=' + pageSize
      + '&pageIndex=' + pageIndex
      + '&filter=' + filter
      + '&orderBy=' + orderBy
      + '&order=' + order
    + '&projectId=' + projectId)
      .pipe(tap(() => {}, e => {if (e.status) { this.router.navigate(['404']); } }));
  }

  createTestScenario(scenario: ScenarioModel): Observable<any>{
    return this.http.post(apiPath + 'api/test-scenario', scenario);
  }

  getScenarioById(scenarioId): Observable<ScenarioModel>{
    return this.http.get<ScenarioModel>(apiPath + 'api/test-scenario/' + scenarioId);
  }
  updateCompound(testScenario: ScenarioModel): Observable<any>{
    return this.http.put(apiPath + 'api/test-scenario/update', testScenario);
  }
  deleteCompound(scenarioId: number): Observable<any>{
    return this.http.delete(apiPath + 'api/test-scenario/delete/' + scenarioId);
  }

}
