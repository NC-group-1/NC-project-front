import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {PageModel} from "../../../models/PageModel";
import {TestCaseHistory} from "../../../models/TestCaseHistory";
import {apiPath} from "../../../../globals";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TestCaseHistoryService {

  constructor(private http: HttpClient, private router: Router) {
  }

  getPaginatedCaseHistory(pageSize: number,
                          pageIndex: number,
                          filter: string,
                          orderBy: string,
                          order: string,
                          projectId: number): Observable<PageModel<TestCaseHistory>> {
    return this.http.get<PageModel<TestCaseHistory>>(
      apiPath + 'api/ncp/test-case/historyList/' + projectId

      + '?pageSize=' + (!pageSize ? '' : pageSize)
      + '&pageIndex=' + (!pageIndex ? '' : pageIndex)
      + '&filter=' + (!filter ? '' : filter)
      + '&orderBy=' + (!orderBy ? '' : orderBy)
      + '&order=' + (!order ? '' : order)
    )
      .pipe(tap(() => {
      }, e => {
        if (e.status) {
          this.router.navigate(['404']);
        }
      }));
  }

}
