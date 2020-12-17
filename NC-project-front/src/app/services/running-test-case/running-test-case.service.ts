import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {TestCaseModel} from '../../../models/TestCaseModel';
import {UserListModel} from '../../../models/UserListModel';
import {UserDataModel} from '../../../models/UserDataModel';
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

  getPaginatedRunningTestCases(pageSize: number, pageIndex: number, filter: string, orderBy: string, order: string, projectId: number): Observable<TestCaseResponseModel>{
    return this.httpClient.get<TestCaseResponseModel>(
      apiPath + 'api/ncp/running-test-case/list/' + projectId
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
    return this.httpClient.put(apiPath + 'api/ncp/running-test-case/edit', JSON.stringify(testCase),httpOption);
  }

  getWatcherByTestCaseId(test_case_id: number): Observable<UserListModel[]>{
    return this.httpClient.get<UserListModel[]>(
      apiPath + 'api/ncp/running-test-case/?test_case_id=' + test_case_id)
      .pipe(tap(() => {}, e => {if (e.status) { this.router.navigate(['404']); } }));
  }

  getSearchedUsers(searchStr: string): Observable<UserListModel[]>{
    return this.httpClient.get<UserListModel[]>(
      apiPath + 'api/ncp/running-test-case/users/?name=' + searchStr)
      .pipe(tap(() => {}, e => {if (e.status) { this.router.navigate(['404']); } }));
  }

  postWatcher(watcher: WatcherModel) {
    return this.httpClient.post(apiPath + 'api/ncp/running-test-case/add-watcher', watcher);
  }

}
