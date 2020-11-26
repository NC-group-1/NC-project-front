import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CompoundModel} from '../../../models/CompoundModel';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CompoundListService {

  private apiPath = 'http://localhost:8081/';

  constructor(private http: HttpClient, private router: Router) { }

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


  getPaginatedCompounds(pageSize: number, pageIndex: number): Observable<CompoundModel[]>{
  return this.http.get<CompoundModel[]>(this.apiPath + 'compounds/page?index=' + pageIndex + '&size=' + pageSize)
    .pipe(tap(() => {}, e => {if (e.status) { this.router.navigate(['404']); } }));
  }

  getNumberOfCompounds(): Observable<number>{
  return this.http.get<number>(this.apiPath + 'compounds/number')
    .pipe(tap(() => {}, e => {if (e.status) { this.router.navigate(['404']); } }));
  }

}
