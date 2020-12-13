import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Action} from '../../../models/action';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ActionPage} from '../../../models/action-page';
import {apiPath} from '../../../../globals';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(private http: HttpClient, private router: Router) {
  }

  getPaginatedActionsWithFilter(page: number,
                                size: number,
                                filter: string,
                                filterTable: string,
                                orderBy: string,
                                order: string): Observable<ActionPage> {
    return this.http.get<ActionPage>(
      apiPath + 'api/ncp/actions'
      + '?page=' + page
      + '&size=' + size
      + '&filter=' + filter
      + '&filterTable=' + filterTable
      + '&orderBy=' + orderBy
      + '&order=' + order)
      .pipe(tap(() => {}, e => {if (e.status) { this.router.navigate(['404']); } }));
  }

  getPaginatedActions(pageSize, pageIndex): Observable<ActionPage> {
    return this.http.get<ActionPage>(apiPath + 'api/ncp/actions/oldPage?page='
      + (!pageIndex ? '' : pageIndex) + '&size=' + (!pageSize ? '' : pageSize))
      .pipe(tap(() => {}, e => {if (e.status) { this.router.navigate(['404']); } }));
  }
  getPaginatedActionsWithoutTarget(targetId, pageSize, pageIndex): Observable<ActionPage> {
    if (!targetId){
      return this.getPaginatedActions(pageSize, pageIndex);
    }else {
      return this.http.get<ActionPage>(apiPath + 'api/ncp/actions/compounds/' + targetId + '?page='
        + (!pageIndex ? '' : pageIndex) + '&size=' + (!pageSize ? '' : pageSize))
        .pipe(tap(() => {}, e => {if (e.status) {this.router.navigate(['404']); } }));
    }
  }

  getActionTypes(): Observable<string[]> {
    return this.http.get<string[]>(apiPath + 'api/ncp/actions/types')
      .pipe(tap(() => {}, e => {if (e.status) {this.router.navigate(['404']); } }));
  }

  updateAction(action: Action): Observable<any> {
    console.log(action);
    return this.http.put(apiPath + 'api/ncp/actions/' + action.id, action);
  }

  createAction(action: Action): Observable<any> {
    console.log(action);
    return this.http.post(apiPath + 'api/ncp/actions', action);
  }
}
