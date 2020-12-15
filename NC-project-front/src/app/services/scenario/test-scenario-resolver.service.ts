import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ScenarioModel} from '../../../models/TestScenario';
import {ScenarioService} from './scenario.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestScenarioResolverService implements Resolve<ScenarioModel>{

  constructor(private scService: ScenarioService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ScenarioModel> | Promise<ScenarioModel> | ScenarioModel {
    return this.scService.getTestScenarioById(route.paramMap.get('testScenarioId'));
  }
}
