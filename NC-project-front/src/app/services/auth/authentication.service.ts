import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {TokenModel} from '../../../models/TokenModel';
import {UserModel} from '../../../models/UserModel';
import {tap} from 'rxjs/operators';
import {apiPath} from '../../../../globals';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private token = null;
  private isAuth = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {
    this.isAuth.next(this.isAuthenticated());
    this.token = localStorage.getItem('Authorization');
  }

  login(user: UserModel): Observable<TokenModel> {
    // console.log(user);
    return this.http.post<TokenModel>(apiPath + 'user/auth/', user)
      .pipe(tap(({token}) => {
        this.isAuth.next(true);
        localStorage.setItem('Authorization', 'Bearer ' + token);
        this.setToken('Bearer ' + token);
      }));
  }

  register(user: UserModel): Observable<any> {
    return this.http.post(apiPath + 'user', user);
  }

  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string {
    if (!!this.token){
      return this.token;
    }else {
      return localStorage.getItem('Authorization');
    }
  }

  getRole(): string {
    const temp = this.token.toString().substr(8);
    const s = atob(temp.split('.')[1]);
    const parse = JSON.parse(s);
    return parse.role;
  }

  getId(): string {
    const temp = this.token.toString().substr(8);
    const s = atob(temp.split('.')[1]);
    const parse = JSON.parse(s);
    console.log(parse.userId);
    return parse.userId;
  }
  isTokenExpired(): boolean{
    const temp = this.getToken().toString().substr(8);
    const s = atob(temp.split('.')[1]);
    const parse = JSON.parse(s);
    if (parse.exp <= (Math.floor((new Date()).getTime() / 1000))){
      this.logout();
      return false;
    }
    else{
      return true;
    }
  }

  getUsername(): string {
    const temp = this.getToken().toString().substr(8);
    const s = atob(temp.split('.')[1]);
    const parse = JSON.parse(s);
    return parse.sub;
  }

  isAuthenticated(): boolean {
    return !!this.getToken() && this.isTokenExpired();
  }

  authSubscribe(): Observable<boolean> {
    return this.isAuth.asObservable();
  }

  logout(): void {
    this.isAuth.next(false);
    this.setToken(null);
    localStorage.clear();
  }
}
