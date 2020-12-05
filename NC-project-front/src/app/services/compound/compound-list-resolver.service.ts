import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {CompoundPage} from '../../../models/CompoundPage';
import {Observable} from 'rxjs';
import {CompoundService} from './compound.service';

@Injectable({
  providedIn: 'root'
})
export class CompoundListResolverService implements Resolve<CompoundPage>{

  constructor(private compService: CompoundService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CompoundPage> | Promise<CompoundPage> | CompoundPage {
    return this.compService.getCompoundPage(route.paramMap.get('page'),
      route.queryParamMap.get('size'),
      route.queryParamMap.get('name'),
      route.queryParamMap.get('description'),
      route.queryParamMap.get('orderBy'),
      route.queryParamMap.get('direction'));
  }
}

