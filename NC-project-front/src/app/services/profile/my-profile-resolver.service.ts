import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {UserDataModel} from '../../../models/UserDataModel';
import {Observable} from 'rxjs';
import {ProfileService} from './profile.service';
import {AuthenticationService} from '../auth/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class MyProfileResolverService implements Resolve<UserDataModel>{

  constructor(private profileService: ProfileService, private auth: AuthenticationService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserDataModel> {
    return this.profileService.getUserByEmail(this.auth.getUsername());
  }
}
