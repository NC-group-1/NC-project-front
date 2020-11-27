import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserResponseModel} from '../../model/UserResponseModel';
import {UserModel} from '../../model/UserModel';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  private urlPath = 'http://localhost:8081/';

  constructor(private httpClient: HttpClient, private router: Router) {}

  getPaginatedUsers(pageSize: number, pageIndex: number, filter: string, orderBy: string, order: string): Observable<UserResponseModel>{
    return this.httpClient.get<UserResponseModel>(
      this.urlPath + 'user/get_user_list/' + pageIndex + '/' + pageSize
      + '?filter=' + filter
      + '&orderBy=' + orderBy
      + '&order=' + order
    ).pipe(tap(() => {}, e => {if (e.status) { this.router.navigate(['404']); } }));
  }

  createUser(name: string, surname: string) {
    const params = {
      nameUser: name,
      surnameUser: surname
    };

    return this.httpClient.post(this.urlPath, params);
  }

  updateUser(user: UserModel) {
    return this.httpClient.post(this.urlPath + 'user/update', user);
  }

  // getNumberOfUsers( pageSize: number): Observable<number>{
  //   return this.httpClient.get<number>(this.urlPath + 'user/get_number'+ pageSize);
  // }


}
