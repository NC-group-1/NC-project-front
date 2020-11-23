import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient) {}

  post(name: string, surname: string) {
    const params = {
      nameUser: name,
      surnameUser: surname
    };

    return this.httpClient.post('http://localhost:8090/createUser', params);
  }
}
