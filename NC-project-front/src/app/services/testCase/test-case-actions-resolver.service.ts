import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ActionInstanceModel} from '../../../models/ActionInstanceModel';
import {Observable} from 'rxjs';
import {TestCaseService} from './test-case.service';

@Injectable({
  providedIn: 'root'
})
export class TestCaseActionsResolverService implements Resolve<ActionInstanceModel[]>{

  constructor(private tcService: TestCaseService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<ActionInstanceModel[]> | Promise<ActionInstanceModel[]> | ActionInstanceModel[] {
    return this.tcService.getActionInstances(route.paramMap.get('testCaseId'));
  }
}
