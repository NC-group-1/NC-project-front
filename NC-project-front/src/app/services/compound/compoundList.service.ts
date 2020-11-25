import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CompoundListModel} from '../../models/CompoundListModel';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  private urlPath = 'http://localhost:8081/';

  constructor(private httpClient: HttpClient) {}

  getCompounds() {
    return this.httpClient.get<CompoundListModel[]>(this.urlPath + 'compound');
  }

  postCompound(compound: CompoundListModel) {
    return this.httpClient.post(this.urlPath + 'compound', compound);
  }

  getCompoundID() {
    return this.httpClient.get<CompoundListModel[]>(this.urlPath + 'compound/');
  }

  updateCompound(compound: CompoundListModel) {
    return this.httpClient.post(this.urlPath + 'compound/update', compound);
  }

  deleteCompound(compound: CompoundListModel) {
    return this.httpClient.delete(this.urlPath + 'compound/update', compound);
  }
}
