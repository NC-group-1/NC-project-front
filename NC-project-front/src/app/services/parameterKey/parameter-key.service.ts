import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ParameterKey} from '../../../models/parameter-key';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {apiPath} from '../../../../globals';

@Injectable({
  providedIn: 'root'
})
export class ParameterKeyService {

  constructor(private http: HttpClient, private router: Router) { }

  getSearchedParameterKeys(searchStr: string): Observable<ParameterKey[]>{
    return this.http.get<ParameterKey[]>(apiPath + 'api/keys?name=' + searchStr)
      .pipe(tap(() => {}, e => {if (e.status) { this.router.navigate(['404']); } }));
  }
}
