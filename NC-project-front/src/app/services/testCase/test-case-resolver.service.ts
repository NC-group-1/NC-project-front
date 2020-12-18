import { Injectable } from '@angular/core';
import {TestCaseService} from './test-case.service';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {TestCaseModel} from '../../../models/TestCaseModel';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestCaseResolverService implements Resolve<TestCaseModel>{

  constructor(private tcService: TestCaseService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TestCaseModel> | Promise<TestCaseModel> | TestCaseModel {
    return this.tcService.getTestCase(route.paramMap.get('testCaseId'));
  }
}
