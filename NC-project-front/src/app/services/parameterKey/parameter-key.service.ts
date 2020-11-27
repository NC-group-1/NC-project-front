import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ParameterKey} from '../../../models/parameter-key';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ParameterKeyService {

  private apiPath = 'http://localhost:8081/';

  constructor(private http: HttpClient, private router: Router) { }

  getSearchedParameterKeys(searchStr: string): Observable<ParameterKey[]>{
    return this.http.get<ParameterKey[]>(this.apiPath + 'api/keys?name=' + searchStr)
      .pipe(tap(() => {}, e => {if (e.status) { this.router.navigate(['404']); } }));
  }
}
