import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserModel} from '../../model/UserModel';


@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  private urlPath = 'http://localhost:8081/';

  constructor(private httpClient: HttpClient) {}

  post(name: string, surname: string) {
    const params = {
      nameUser: name,
      surnameUser: surname
    };

    return this.httpClient.post(this.urlPath, params);
  }

  // postUser(user: UserModel) {
  //   return this.httpClient.post(this.urlPath + 'user', user);
  // }

  updateUser(project: UserModel) {
    return this.httpClient.put(this.urlPath + 'user/update', project);
  }

  getPaginatedUsers(pageSize: number, pageIndex: number, filter: string, orderBy: string, order: string): Observable<UserModel[]>{
    return this.httpClient.get<UserModel[]>(this.urlPath + 'user/get_user_list/' + pageIndex + '/' + pageSize + '/'+ filter + '/' + orderBy + '/' +order);
  }

  getNumberOfUsers( pageSize: number): Observable<number>{
    return this.httpClient.get<number>(this.urlPath + 'user/get_number'+ pageSize);
  }
}
