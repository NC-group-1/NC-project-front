import { Injectable } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {CompoundModel} from '../../../models/CompoundModel';
import {Observable} from 'rxjs';
import {CompoundService} from './compound.service';

@Injectable({
  providedIn: 'root'
})
export class CompoundResolverService implements Resolve<CompoundModel>{

  constructor(private compoundService: CompoundService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CompoundModel> | Promise<CompoundModel> | CompoundModel {
    return this.compoundService.getCompoundById(route.paramMap.get('compoundId'));
  }
}
