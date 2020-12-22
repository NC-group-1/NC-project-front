import { Injectable } from '@angular/core';
import {CompoundModel} from '../../../models/CompoundModel';
import {Observable} from 'rxjs';
import {apiPath} from '../../../../globals';
import {HttpClient} from '@angular/common/http';
import {Action} from '../../../models/action';
import {CompoundPage} from '../../../models/CompoundPage';
import {ProjectResponseModel} from '../../../models/ProjectResponseModel';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {PageModel} from '../../../models/PageModel';
import {ScenarioModel} from '../../../models/TestScenario';


@Injectable({
  providedIn: 'root'
})
export class ScenarioService {

  constructor(private http: HttpClient, private router: Router) {
  }

  getPaginatedScenario(pageSize: string,
                       pageIndex: string,
                       filter: string,
                       orderBy: string,
                       order: string,
                       searchBy: string,
                       projectId: string): Observable<PageModel<ScenarioModel>> {
    return this.http.get<PageModel<ScenarioModel>>(
      apiPath + 'api/ncp/test-scenario/list/' + projectId

      + '?pageSize=' + (!pageSize ? '' : pageSize)
      + '&pageIndex=' + (!pageIndex ? '' : pageIndex)
      + '&filter=' + (!filter ? '' : filter)
      + '&orderBy=' + (!orderBy ? '' : orderBy)
      + '&order=' + (!order ? '' : order)
      + '&filterBy=' + (!searchBy ? '' : searchBy)
      )
      .pipe(tap(() => {
      }, e => {
        if (e.status) {
          this.router.navigate(['404']);
        }
      }));
  }

  getPaginatedLibrary(pageSize: string,
                       pageIndex: string,
                       filter: string,
                       orderBy: string,
                       order: string): Observable<PageModel<ScenarioModel>> {
    return this.http.get<PageModel<ScenarioModel>>(
      apiPath + 'api/ncp/test-scenario/list/'
      + '?pageSize=' + (!pageSize ? '' : pageSize)
      + '&pageIndex=' + (!pageIndex ? '' : pageIndex)
      + '&filter=' + (!filter ? '' : filter)
      + '&orderBy=' + (!orderBy ? '' : orderBy)
      + '&order=' + (!order ? '' : order)
    )
      .pipe(tap(() => {
      }, e => {
        if (e.status) {
          this.router.navigate(['404']);
        }
      }));
  }

  createTestScenario(scenario: ScenarioModel): Observable<any> {
    return this.http.post(apiPath + 'api/ncp/test-scenario', scenario);
  }

  updateScenario(testScenario: ScenarioModel): Observable<any> {
    return this.http.put(apiPath + 'api/ncp/test-scenario', testScenario);
  }

  getTestScenarioById(scenarioId): Observable<ScenarioModel>{
    return this.http.get<ScenarioModel>(apiPath + 'api/ncp/test-scenario/' + scenarioId).pipe(tap(() => {
    }, e => {
      if (e.status) {
        this.router.navigate(['404']);
      }
    }));
  }

  deleteScenario(testScenarioId): Observable<any>{
    return this.http.delete(apiPath + 'api/ncp/test-scenario/' + testScenarioId);
  }
}
