import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {apiPath} from '../../../../globals';
import {DataSetGeneralInfoDtoPage} from '../../../models/data-set-general-info-dto-page';

@Injectable({
  providedIn: 'root'
})
export class DataSetService {

  constructor(private http: HttpClient, private router: Router) { }

  getPaginatedDataSets(page: number,
                       size: number,
                       filter: string,
                       orderBy: string,
                       order: string): Observable<DataSetGeneralInfoDtoPage>{
    return this.http.get<DataSetGeneralInfoDtoPage>(
      apiPath + 'api/datasets'
      + '?page=' + page
      + '&size=' + size
      + '&filter=' + filter
      + '&orderBy=' + orderBy
      + '&order=' + order
    ).pipe(tap(() => {}, e => {if (e.status) { this.router.navigate(['404']); } }));
  }
}
