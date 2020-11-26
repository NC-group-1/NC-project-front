import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserModel} from '../../model/UserModel';


@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient) {}

  private urlPath = 'http://localhost:8081/';

  post(name: string, surname: string) {
    const params = {
      nameUser: name,
      surnameUser: surname
    };

    return this.httpClient.post('http://localhost:8090/createUser', params);
  }

  getPaginatedActions(pageSize: number, pageIndex: number): Observable<UserModel[]>{
    return this.httpClient.get<UserModel[]>(this.urlPath + 'user/get_user_list/' + pageIndex + '/' + pageSize);
  }

  getNumberOfActions(): Observable<number>{
    return this.httpClient.get<number>(this.urlPath + 'user/get_number');
  }
}
