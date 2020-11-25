import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CompoundDescModel} from '../../models/CompoundDescModel';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  private urlPath = 'http://localhost:8081/';

  constructor(private httpClient: HttpClient) {}

  getActionOfCompound() {
    return this.httpClient.get<CompoundDescModel[]>(this.urlPath + 'action');
  }

  getAllActionCompound() {
    return this.httpClient.get<CompoundDescModel[]>(this.urlPath + 'action');
  }

  postActionInCompound(action: CompoundDescModel) {
    return this.httpClient.post(this.urlPath + 'action', action);
  }

  deleteActionInCompound(action: CompoundDescModel) {
    return this.httpClient.post(this.urlPath + 'action', action);
  }
}
