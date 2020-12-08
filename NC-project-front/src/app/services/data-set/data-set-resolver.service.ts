import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {DataSetGeneralInfoDto} from '../../../models/data-set-general-info-dto';
import {Observable} from 'rxjs';
import {DataSetService} from './data-set.service';

@Injectable({
  providedIn: 'root'
})
export class DataSetResolverService implements Resolve<DataSetGeneralInfoDto>{

  constructor(private dataSetService: DataSetService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DataSetGeneralInfoDto> {
    return this.dataSetService.getDataSetById(parseInt(route.paramMap.get('id'), 10));
  }
}
