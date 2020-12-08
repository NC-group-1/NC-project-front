import {Injectable} from '@angular/core';
import {ScenarioModel} from '../../../models/TestScenario';
import {apiPath} from '../../../../globals';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {PageModel} from '../../../models/PageModel';

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
                       projectId: string): Observable<PageModel<ScenarioModel>> {
    return this.http.get<PageModel<ScenarioModel>>(
      apiPath + 'test_scenario/get_list'
      + '?pageSize=' + (!pageSize ? '' : pageSize)
      + '&pageIndex=' + (!pageIndex ? '' : pageIndex + 1)
      + '&filter=' + (!filter ? '' : filter)
      + '&orderBy=' + (!orderBy ? '' : orderBy)
      + '&order=' + (!order ? '' : order)
      + '&projectId=' + (!projectId ? '0' : projectId))
      .pipe(tap(() => {
      }, e => {
        if (e.status) {
          this.router.navigate(['404']);
        }
      }));
  }

  createTestScenario(scenario: ScenarioModel): Observable<any> {
    return this.http.post(apiPath + 'api/test-scenario', scenario);
  }

  getScenarioById(scenarioId): Observable<ScenarioModel> {
    return this.http.get<ScenarioModel>(apiPath + 'api/test-scenario/' + scenarioId);
  }

  updateCompound(testScenario: ScenarioModel): Observable<any> {
    return this.http.put(apiPath + 'api/test-scenario/update', testScenario);
  }

  deleteCompound(scenarioId: number): Observable<any> {
    return this.http.delete(apiPath + 'api/test-scenario/delete/' + scenarioId);
  }

}
