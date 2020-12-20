import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {TestCaseModel} from '../../../models/TestCaseModel';
import {Observable} from 'rxjs';
import {PageModel} from '../../../models/PageModel';
import {apiPath} from '../../../../globals';
import {tap} from 'rxjs/operators';
import {DetailsTestCaseModel} from '../../../models/DetailsTestCaseModel';
import {TestCaseStatisticModel} from '../../../models/TestCaseStatisticModel';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient, private router: Router) {
  }

  getPaginatedTestCases(page: number, size: number, orderBy: string, order: string,
                        userId: number): Observable<PageModel<DetailsTestCaseModel>> {
    return this.http.get<PageModel<DetailsTestCaseModel>>(
      apiPath + 'api/ncp/test-case/user/' + userId + '/paginated'
      + '?page=' + (!page ? '' : page)
      + '&size=' + (!size ? '' : size)
      + '&orderBy=' + (!orderBy ? '' : orderBy)
      + '&order=' + (!order ? '' : order)
    ).pipe(tap(() => {
    }, e => {
      if (e.status) {
        this.router.navigate(['404']);
      }
    }));
  }

  getTestCasesStatistic(userId: number): Observable<TestCaseStatisticModel> {
    return this.http.get<TestCaseStatisticModel>(
      apiPath + 'api/ncp/test-case/user/' + userId + '/statistic'
    ).pipe(tap(() => {
    }, e => {
      if (e.status) {
        this.router.navigate(['404']);
      }
    }));
  }

}
