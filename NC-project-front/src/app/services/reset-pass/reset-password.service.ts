import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiPath} from '../../../../globals';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http: HttpClient) { }
  sendCodeOnEmail(email: string): Observable<any>{
    return this.http.post(apiPath + '/recovery-password', email);
  }
  verifyCode(code: string): Observable<any>{
    return this.http.post(apiPath + '/recovery-password/code', code);
  }
  updatePassword(password: string): Observable<any>{
    return this.http.put(apiPath + '/recovery-password/new-password/' + 1, password);
  }
}
