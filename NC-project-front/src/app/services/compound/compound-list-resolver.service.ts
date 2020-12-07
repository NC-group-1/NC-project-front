import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {CompoundService} from './compound.service';
import {PageModel} from '../../../models/PageModel';
import {CompoundModel} from '../../../models/CompoundModel';

@Injectable({
  providedIn: 'root'
})
export class CompoundListResolverService implements Resolve<PageModel<CompoundModel>>{

  constructor(private compService: CompoundService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PageModel<CompoundModel>>
    | Promise<PageModel<CompoundModel>> | PageModel<CompoundModel> {
    return this.compService.getCompoundPage(route.paramMap.get('page'),
      route.queryParamMap.get('size'),
      route.queryParamMap.get('name'),
      route.queryParamMap.get('description'),
      route.queryParamMap.get('orderBy'),
      route.queryParamMap.get('direction'));
  }
}

