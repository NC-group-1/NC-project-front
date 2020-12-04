import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {TestCaseModel} from '../../../models/TestCaseModel';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {TestCaseResponseModel} from '../../../models/TestCaseResponseModel';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestCaseService {

  private urlPath = 'http://localhost:8081/';

  constructor(private httpClient: HttpClient, private router: Router) {}

  getPaginatedTestCases(pageSize: number, pageIndex: number, filter: string, orderBy: string, order: string): Observable<TestCaseResponseModel>{
    return this.httpClient.get<TestCaseResponseModel>(
      this.urlPath + 'api/test_case/get_test_case_list/' + pageIndex + '/' + pageSize
      + '?filter=' + filter
      + '&orderBy=' + orderBy
      + '&order=' + order
    ).pipe(tap(() => {}, e => {if (e.status) { this.router.navigate(['404']); } }));
  }

  updateTestCase(testCase: TestCaseModel): Observable<any> {
    const httpOption = {
      headers:new HttpHeaders({"Content-Type":"application/json"})
    }
    return this.httpClient.post(this.urlPath + 'api/test_case/update', JSON.stringify(testCase),httpOption);
  }

  deleteTestCase(id: number) {
    return this.httpClient.delete(this.urlPath + 'api/test_case/' + id);
  }

  /*postTestCase(testCase: TestCaseModel) {
    return this.httpClient.post(this.urlPath + 'test_case', testCase);
  }*/

}
