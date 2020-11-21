import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient) {}

  post(name: string, link: string) {
    const params = {
      nameProject: name,
      linkProject: link
    };

    return this.httpClient.post('http://localhost:8090/createProject', params);
  }
}
