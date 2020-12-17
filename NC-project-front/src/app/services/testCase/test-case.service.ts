import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {apiPath} from '../../../../globals';
import {TestCaseModel} from '../../../models/TestCaseModel';
import {DetailsTestCaseModel} from "../../../models/DetailsTestCaseModel";
import {ActionInstRun} from "../../../models/ActionInstRun";


@Injectable({
  providedIn: 'root'
})
export class TestCaseService {

  constructor(private http: HttpClient) { }
  createTestCase(testCase: TestCaseModel): Observable<any>{
    return this.http.post(apiPath + 'api/test-case', testCase);
  }

  getTestCaseWatchers(userId): Observable<number[]>{
    return this.http.get<number[]>(apiPath + 'api/test-case/user/' + userId);
  }

  getAllActionInstRun(tcId):Observable<ActionInstRun[]>{
    return this.http.get<ActionInstRun[]>(apiPath + 'api/test-case/' + tcId + '/run-details');
  }

  getTestCaseDetailsById(tcId): Observable<DetailsTestCaseModel>{
    return this.http.get<DetailsTestCaseModel>(apiPath + 'api/test-case/'+ tcId + '/details');
  }

}
