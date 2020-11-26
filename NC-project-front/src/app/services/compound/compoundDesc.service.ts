import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CompoundModel} from '../../../models/CompoundModel';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  private apiPath = 'http://localhost:8081/';

  constructor(private http: HttpClient, private router: Router) { }

  getActionOfCompound() {
    return this.http.get<CompoundDescModel[]>(this.apiPath + 'compound/action'+id);
  }

  postActionInCompound(action: CompoundDescModel): Observable<any> {
    return this.http.post(this.apiPath + 'compound/action', action);
  }

  deleteActionInCompound(action: CompoundDescModel): Observable<any> {
    return this.http.delete(this.apiPath + 'compound/action', action);
  }
}
