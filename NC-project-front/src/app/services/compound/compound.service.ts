import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {apiPath} from '../../../../globals';
import {CompoundModel} from '../../../models/CompoundModel';
import {Action} from '../../../models/action';
import {ActionOfCompound} from '../../../models/ActionOfCompound';
import {PageModel} from '../../../models/PageModel';

@Injectable({
  providedIn: 'root'
})
export class CompoundService {

  constructor(private http: HttpClient, private router: Router) { }

  getCompoundPage(page, size, name, description, orderBy, direction): Observable<PageModel<CompoundModel>>{
    return this.http.get<PageModel<CompoundModel>>(apiPath + 'api/ncp/compound?page=' + page +
      '&size=' + (!size ? '' : size) +
      '&name=' + (!name ? '' : name) +
      '&description=' + (!description ? '' : description) +
      '&orderBy=' + (!orderBy ? '' : orderBy) +
      '&direction=' + (!direction ? '' : direction));
  }
  createCompound(compound: CompoundModel): Observable<any>{
    return this.http.post(apiPath + 'api/ncp/compound', compound);
  }
  getCompoundById(compoundId): Observable<CompoundModel>{
    return this.http.get<CompoundModel>(apiPath + 'api/ncp/compound/' + compoundId);
  }
  updateCompound(action: Action): Observable<any>{
    return this.http.put(apiPath + 'api/ncp/compound/update', action);
  }
  deleteCompound(compoundId: number): Observable<any>{
    return this.http.delete(apiPath + 'api/ncp/compound/delete/' + compoundId);
  }
  postActionInCompound(action: ActionOfCompound, id: number): Observable<any>{
    return this.http.post(apiPath + 'api/ncp/compound/actions/' + id, action);
  }
  removeActionFromCompound(actionId: number, compoundId: number): Observable<any>{
    return this.http.post(apiPath + 'api/ncp/compound/actions/' + compoundId, actionId);
  }
  changeActions(compoundId: number, actions: ActionOfCompound[]): Observable<any>{
    return this.http.put(apiPath + 'api/ncp/compound/actions/' + compoundId, actions);
  }
}
