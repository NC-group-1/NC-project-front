import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserDataModel} from '../../../models/UserDataModel';
import {apiPath} from '../../../../globals';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, private router: Router) {
  }
  getUserByEmail(email: string): Observable<UserDataModel>{
    return this.http.get<UserDataModel>(apiPath + 'user/email/' + email)
      .pipe(tap(() => {}, e => {if (e.status) { this.router.navigate(['404']); } }));
  }
  getUserById(id: number): Observable<UserDataModel>{
    return this.http.get<UserDataModel>(apiPath + 'user/' + id)
      .pipe(tap(() => {}, e => {if (e.status) { this.router.navigate(['404']); } }));
  }
  updateUserProfile(user: UserDataModel): Observable<UserDataModel>{
    return this.http.put(apiPath + 'user', user);
  }
}
