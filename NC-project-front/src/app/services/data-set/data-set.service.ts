import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {apiPath} from '../../../../globals';
import {DataSetGeneralInfoDtoPage} from '../../../models/data-set-general-info-dto-page';
import {DataSetGeneralInfoDto} from '../../../models/data-set-general-info-dto';
import {Parameter} from '../../../models/parameter';

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

  getDataSetById(id: number): Observable<DataSetGeneralInfoDto>{
    return this.http.get<DataSetGeneralInfoDto>(apiPath + 'api/datasets/' + id)
      .pipe(tap(() => {}, e => {if (e.status) { this.router.navigate(['404']); } }));
  }

  updateDataSet(dataSet: DataSetGeneralInfoDto): Observable<any>{
    return this.http.put(apiPath + 'api/datasets/' + dataSet.id, dataSet);
  }

  createDataSet(dataSet: DataSetGeneralInfoDto): Observable<any>{
    return this.http.post(apiPath + 'api/datasets', dataSet);
  }

  createParameter(parameter: Parameter): Observable<any>{
    return this.http.post(apiPath + 'api/parameters', parameter);
  }

  deleteDataSet(id: number): Observable<any>{
    return this.http.delete(apiPath + 'api/datasets/' + id);
  }

  getParametersByDataSetId(id: number): Observable<Parameter[]> {
    return this.http.get<Parameter[]>(apiPath + 'api/datasets/' + id + '/parameters')
      .pipe(tap(() => {}, e => {if (e.status) { this.router.navigate(['404']); } }));
  }
}
