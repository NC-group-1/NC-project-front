import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Action} from '../../../models/action';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  private apiPath = 'http://localhost:8081/';

  constructor(private http: HttpClient) { }

  getPaginatedActions(pageSize: number, pageIndex: number): Observable<Action[]>{
    return this.http.get<Action[]>(this.apiPath + 'action/get_action_list/' + pageIndex + '/' + pageSize);
  }

  getNumberOfActions(): Observable<number>{
    return this.http.get<number>(this.apiPath + 'action/get_number');
  }
}
