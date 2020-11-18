import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiPath} from '../../../../globals';
import {Observable} from 'rxjs';
import {PasswordModel} from '../../../models/PasswordModel';
import {EmailModel} from '../../../models/EmailModel';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http: HttpClient) { }
  sendCodeOnEmail(email: EmailModel): Observable<any>{
    return this.http.post(apiPath + 'recovery-password', email);
  }
  updatePassword(password: PasswordModel): Observable<any>{
    return this.http.post(apiPath + 'save-password', password);
  }
}
