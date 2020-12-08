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
      apiPath + 'api/test-scenario/list'
      + '?pageSize=' + (!pageSize ? '' : pageSize)
      + '&pageIndex=' + (!pageIndex ? '' : pageIndex)
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

  getTestScenarioById(scenarioId): Observable<ScenarioModel>{
    return this.http.get<ScenarioModel>(apiPath + 'api/test-scenario/' + scenarioId).pipe(tap(() => {
    }, e => {
      if (e.status) {
        this.router.navigate(['404']);
      }
    }));
  }

}
