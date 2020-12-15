import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {TestCaseModel} from '../../../models/TestCaseModel';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {TestCaseResponseModel} from '../../../models/TestCaseResponseModel';
import {tap} from 'rxjs/operators';
import {apiPath} from '../../../../globals'

@Injectable({
  providedIn: 'root'
})
export class TestCaseService {

  constructor(private httpClient: HttpClient, private router: Router) {}

  getPaginatedTestCases(pageSize: number, pageIndex: number, filter: string, orderBy: string, order: string): Observable<TestCaseResponseModel>{
    return this.httpClient.get<TestCaseResponseModel>(
      apiPath + 'api/test-case/list'
      + '?pageSize=' + pageSize
      + '&pageIndex=' + pageIndex
      + '&filter=' + filter
      + '&orderBy=' + orderBy
      + '&order=' + order)
      .pipe(tap(() => {}, e => {if (e.status) { this.router.navigate(['404']); } }));
  }

  updateTestCase(testCase: TestCaseModel): Observable<any> {
    const httpOption = {
      headers:new HttpHeaders({"Content-Type":"application/json"})
    }
    return this.httpClient.post(apiPath + 'api/test-case', JSON.stringify(testCase),httpOption);
  }

  deleteTestCase(id: number): Observable<any> {
    return this.httpClient.delete(apiPath + 'api/test-case/' + id);
  }

  /*postTestCase(testCase: TestCaseModel) {
    return this.httpClient.post(this.apiPath + 'test_case', testCase);
  }*/

}
