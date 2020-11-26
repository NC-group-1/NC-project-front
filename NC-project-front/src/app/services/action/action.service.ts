import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Action} from '../../../models/action';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  private apiPath = 'http://localhost:8081/';

  constructor(private http: HttpClient, private router: Router) { }

  getPaginatedActions(pageSize: number, pageIndex: number): Observable<Action[]>{
    return this.http.get<Action[]>(this.apiPath + 'actions/page?index=' + pageIndex + '&size=' + pageSize)
      .pipe(tap(() => {}, e => {if (e.status) { this.router.navigate(['404']); } }));
  }

  getActionTypes(): Observable<string[]>{
    return this.http.get<string[]>(this.apiPath + 'actions/types')
      .pipe(tap(() => {}, e => {if (e.status) { this.router.navigate(['404']); } }));
  }

  getNumberOfActions(): Observable<number>{
    return this.http.get<number>(this.apiPath + 'actions/number')
      .pipe(tap(() => {}, e => {if (e.status) { this.router.navigate(['404']); } }));
  }

  updateAction(action: Action): Observable<any>{
    return this.http.put(this.apiPath + 'actions', action);
  }

  createAction(action: Action): Observable<any>{
    return this.http.post(this.apiPath + 'actions', action);
  }
}
