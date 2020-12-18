import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {DatasetModel} from '../../../models/DatasetModel';
import {PageModel} from '../../../models/PageModel';
import {Observable} from 'rxjs';
import {DataSetService} from './data-set.service';
import {DataSetGeneralInfoDto} from '../../../models/data-set-general-info-dto';

@Injectable({
  providedIn: 'root'
})
export class DataSetListResolverServiceService implements Resolve<PageModel<DataSetGeneralInfoDto>>{

  constructor(private datasetService: DataSetService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PageModel<DataSetGeneralInfoDto>>
    | Promise<PageModel<DataSetGeneralInfoDto>> | PageModel<DataSetGeneralInfoDto> {
    return this.datasetService.getPaginatedDataSets(
      route.queryParamMap.get('dsPage'),
      route.queryParamMap.get('dsSize'),
      null,
      null,
      null);
  }
}
