import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {apiPath} from '../../../../globals';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }
  markRead(userId, notificationId: number): Observable<boolean>{
    return this.http.put<boolean>(apiPath + 'api/ncp/notifications/' + userId, notificationId);
  }
  delete(userId, notificationId: number): Observable<boolean>{
    return this.http.delete<boolean>(apiPath + 'api/ncp/notifications/user/' + userId + '/notification/' + notificationId);
  }
}
