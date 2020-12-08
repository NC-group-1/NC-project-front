import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {PageModel} from '../../../models/PageModel';
import {ScenarioModel} from '../../../models/TestScenario';
import {Observable} from 'rxjs';
import {ScenarioService} from './scenario.service';

@Injectable({
  providedIn: 'root'
})
export class TestScenarioListResolverService implements Resolve<PageModel<ScenarioModel>>{

  constructor(private tsService: ScenarioService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PageModel<ScenarioModel>>
    | Promise<PageModel<ScenarioModel>> | PageModel<ScenarioModel> {
    return this.tsService.getPaginatedScenario(
      route.queryParamMap.get('size'),
      route.paramMap.get('page'),
      route.queryParamMap.get('searchValue'),
      route.queryParamMap.get('orderBy'),
      route.queryParamMap.get('direction'),
      route.queryParamMap.get(''));
  }
}
