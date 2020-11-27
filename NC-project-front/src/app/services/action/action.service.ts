import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Action} from '../../../models/action';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ActionPage} from '../../../models/action-page';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  private apiPath = 'http://localhost:8081/';

  constructor(private http: HttpClient, private router: Router) { }

  getPaginatedActions(pageSize: number, pageIndex: number): Observable<ActionPage>{
    return this.http.get<ActionPage>(this.apiPath + 'api/actions?page=' + pageIndex + '&size=' + pageSize)
      .pipe(tap(() => {}, e => {if (e.status) { this.router.navigate(['404']); } }));
  }

  getActionTypes(): Observable<string[]>{
    return this.http.get<string[]>(this.apiPath + 'api/actions/types')
      .pipe(tap(() => {}, e => {if (e.status) { this.router.navigate(['404']); } }));
  }

  updateAction(action: Action): Observable<any>{
    console.log(action);
    return this.http.put(this.apiPath + 'api/actions/{' + action.id + '}', action);
  }

  createAction(action: Action): Observable<any>{
    console.log(action);
    return this.http.post(this.apiPath + 'api/actions', action);
  }
}
