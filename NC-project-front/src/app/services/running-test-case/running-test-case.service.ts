import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {TestCaseModel} from '../../../models/TestCaseModel';
import {UserListModel} from '../../../models/UserListModel';
import {WatcherModel} from '../../../models/WatcherModel';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {TestCaseResponseModel} from '../../../models/TestCaseResponseModel';
import {UserResponseModel} from '../../../models/UserResponseModel';
import {tap} from 'rxjs/operators';
import {apiPath} from '../../../../globals'

@Injectable({
  providedIn: 'root'
})
export class RunningTestCaseService {

  constructor(private httpClient: HttpClient, private router: Router) {}

  getPaginatedRunningTestCases(pageSize: number, pageIndex: number, filter: string, orderBy: string, order: string): Observable<TestCaseResponseModel>{
    return this.httpClient.get<TestCaseResponseModel>(
      apiPath + 'api/running-test-case/list'
      + '?pageSize=' + pageSize
      + '&pageIndex=' + pageIndex
      + '&filter=' + filter
      + '&orderBy=' + orderBy
      + '&order=' + order)
      .pipe(tap(() => {}, e => {if (e.status) { this.router.navigate(['404']); } }));
  }

  updateRunningTestCase(testCase: TestCaseModel): Observable<any> {
    const httpOption = {
      headers:new HttpHeaders({"Content-Type":"application/json"})
    }
    return this.httpClient.post(apiPath + 'api/running-test-case', JSON.stringify(testCase),httpOption);
  }

  getWatcherByTestCaseId(test_case_id: number): Observable<UserResponseModel>{
    return this.httpClient.get<UserResponseModel>(
      apiPath + 'api/running-test-case/?test_case_id=' + test_case_id)
      .pipe(tap(() => {}, e => {if (e.status) { this.router.navigate(['404']); } }));
  }

  getSearchedUsers(searchStr: string): Observable<UserResponseModel>{
    return this.httpClient.get<UserResponseModel>(
      apiPath + 'api/running-test-case/users/?name=' + searchStr)
      .pipe(tap(() => {}, e => {if (e.status) { this.router.navigate(['404']); } }));
  }

  postWatcher(watcher: WatcherModel) {
    return this.httpClient.post(apiPath + 'api/running-test-case/add-watcher', watcher);
  }

}
