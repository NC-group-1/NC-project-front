import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CompoundModel} from '../../../models/CompoundModel';
import {Action} from '../../../models/action';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {CompoundsPage} from '../../../models/CompoundsPage';

@Injectable({
  providedIn: 'root'
})
export class CompoundListService {

  private apiPath = 'http://localhost:8081/';

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  getCompoundID() {
    return this.http.get<CompoundModel[]>(this.apiPath + 'compound/');
  }

  postCompound(compound: CompoundModel): Observable<any> {
  return this.http.post(this.apiPath + 'compound', compound);
  }

  updateCompound(compound: CompoundModel): Observable<any> {
    return this.http.put(this.apiPath + 'compound/update', compound);
  }

  /*deleteCompound(compound: CompoundModel): Observable<any> {
    return this.http.delete(this.apiPath + 'compound/update', compound);
  }*/

  getPaginatedCompounds(): Observable<CompoundsPage>{
    return this.http.get<CompoundsPage>(this.apiPath + 'compound?page=' + this.route.snapshot.queryParamMap.get('page') + '&size=' + this.route.snapshot.queryParamMap.get('size'));
  }

  getNumberOfCompounds(): Observable<number>{
    return this.http.get<number>(this.apiPath + 'compound/number');
  }

  getActionOfCompound(id: number) {
    return this.http.get<CompoundModel[]>(this.apiPath + 'compound/action'+id);
  }

  postActionInCompound(action: CompoundModel): Observable<any> {
    return this.http.post(this.apiPath + 'compound/action', action);
  }

  /*deleteActionInCompound(action: CompoundModel): Observable<any> {
    return this.http.delete(this.apiPath + 'compound/action', action);
  }*/

  getPaginatedAction(pageSize: number, pageIndex: number): Observable<Action[]>{
    return this.http.get<Action[]>(this.apiPath + 'action/page?index=' + pageIndex + '&size=' + pageSize);
  }

  getNumberOfAction(): Observable<number>{
    return this.http.get<number>(this.apiPath + 'action/number')
  }

}
