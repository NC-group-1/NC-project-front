import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {UserDataModel} from '../../../models/UserDataModel';
import {Observable} from 'rxjs';
import {ProfileService} from './profile.service';
import {toNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolverService implements Resolve<UserDataModel>{

  constructor(private profileService: ProfileService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserDataModel> {
    return this.profileService.getUserByEmail(route.paramMap.get('email'));
  }
}
