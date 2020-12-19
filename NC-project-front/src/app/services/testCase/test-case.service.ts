import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {apiPath} from '../../../../globals';
import {TestCaseModel} from '../../../models/TestCaseModel';
import {DetailsTestCaseModel} from '../../../models/DetailsTestCaseModel';
import {ActionInstRun} from '../../../models/ActionInstRun';
import {ActionInstanceModel} from '../../../models/ActionInstanceModel';

@Injectable({
  providedIn: 'root'
})
export class TestCaseService {

  constructor(private http: HttpClient) { }
  createTestCase(testCase: TestCaseModel): Observable<any>{
    return this.http.post(apiPath + 'api/ncp/test-case', testCase);
  }

  getTestCaseWatchers(userId): Observable<number[]>{
    return this.http.get<number[]>(apiPath + 'api/ncp/test-case/user/' + userId);
  }

  getAllActionInstRun(tcId): Observable<ActionInstRun[]>{
    return this.http.get<ActionInstRun[]>(apiPath + 'api/ncp/test-case/' + tcId + '/run-details');
  }

  getTestCaseDetailsById(tcId): Observable<DetailsTestCaseModel>{
    return this.http.get<DetailsTestCaseModel>(apiPath + 'api/ncp/test-case/'+ tcId + '/details');
  }

  getTestCase(testCaseId): Observable<TestCaseModel>{
    return this.http.get<TestCaseModel>(apiPath + 'api/ncp/test-case/' + testCaseId);
  }

  getActionInstances(testCaseId): Observable<ActionInstanceModel[]> {
    return this.http.get<ActionInstanceModel[]>(apiPath + 'api/ncp/test-case/actions/' + testCaseId);
  }

  editTestCase(testCase: TestCaseModel): Observable<boolean> {
    return this.http.put<boolean>(apiPath + 'api/ncp/test-case', testCase);
  }
}
