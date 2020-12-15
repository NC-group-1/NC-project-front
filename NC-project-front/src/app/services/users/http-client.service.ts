import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserResponseModel} from '../../../models/UserResponseModel';
import {UserListModel} from '../../../models/UserListModel';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {apiPath} from "../../../../globals";

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  getPaginatedUsers(pageSize: number, pageIndex: number, filter: string, orderBy: string, order: string): Observable<UserResponseModel> {
    return this.httpClient.get<UserResponseModel>(
      apiPath + 'api/ncp/users/list'
      + '?pageSize=' + pageSize
      + '&pageIndex=' + pageIndex
      + '&filter=' + filter
      + '&orderBy=' + orderBy
      + '&order=' + order)
      .pipe(tap(() => {
      }, e => {
        if (e.status) {
          this.router.navigate(['404']);
        }
      }));
  }

  updateUser(user: UserListModel) {
    return this.httpClient.put(apiPath + 'api/ncp/users/', user);
  }
}
