import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PageModel} from '../../../models/PageModel';
import {CompoundModel} from '../../../models/CompoundModel';
import {apiPath} from '../../../../globals';
import {Action} from '../../../models/action';
import {ActionOfCompound} from '../../../models/ActionOfCompound';
import {TestCaseModel} from '../../../models/TestCaseModel';

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
}
