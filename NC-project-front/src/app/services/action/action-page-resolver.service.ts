import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Action} from '../../../models/action';
import {Observable} from 'rxjs';
import {ActionService} from './action.service';
import {ActionPage} from '../../../models/action-page';

@Injectable({
  providedIn: 'root'
})
export class ActionPageResolverService implements Resolve<ActionPage>{

  constructor(private actionService: ActionService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ActionPage> | Promise<ActionPage> | ActionPage {
    return this.actionService.getPaginatedActions(
      route.queryParamMap.get('actionSize'),
      route.queryParamMap.get('actionPage'),
      route.queryParamMap.get('filter'));
  }
}
