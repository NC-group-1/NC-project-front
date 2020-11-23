import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../services/auth/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoginActivateGuard implements CanActivate {
  loggedIn: boolean;
  constructor(private auth: AuthenticationService, private router: Router) {
    auth.authSubscribe().subscribe(value => {
      this.loggedIn = value;
    });
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.loggedIn){
      this.router.navigate(['login']);
    }
    return this.loggedIn;
  }
}
