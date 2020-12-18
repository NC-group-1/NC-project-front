import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PageModel} from '../../../models/PageModel';
import {CompoundModel} from '../../../models/CompoundModel';
import {apiPath} from '../../../../globals';
import {Action} from '../../../models/action';
import {ActionOfCompound} from '../../../models/ActionOfCompound';
import {TestCaseModel} from '../../../models/TestCaseModel';
import {DetailsTestCaseProgressModel} from '../../../models/DetailsTestCaseProgressModel';
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
  getDetailTestCase(): Observable<DetailsTestCaseProgressModel[]>{
    return this.http.get<DetailsTestCaseProgressModel[]>(apiPath + 'api/ncp/test-case/details/');
  }
  getTestCase(testCaseId): Observable<TestCaseModel>{
    return this.http.get<TestCaseModel>(apiPath + 'api/ncp/test-case/' + testCaseId);
  }
  getActionInstances(testCaseId): Observable<ActionInstanceModel[]>{
    return this.http.get<ActionInstanceModel[]>(apiPath + 'api/ncp/test-case/actions/' + testCaseId);
  }

  editTestCase(testCase: TestCaseModel): Observable<boolean> {
    return this.http.put<boolean>(apiPath + 'api/ncp/test-case', testCase);
  }
}
