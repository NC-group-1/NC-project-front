/* tslint:disable */
import {Observable, Subject} from 'rxjs';
import {Alert, AlertType} from '../../models/alert';
import {filter} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private subject = new Subject<Alert>();
  private defaultId = 'default-alert';

  onAlert(id = this.defaultId): Observable<Alert> {
    return this.subject.asObservable().pipe(filter(x => x && x.id === id));
  }

  success(message: string, options?: any) {
    this.alert(new Alert({...options, type: AlertType.Success, message}));
  }

  info(message: string, options?: any) {
    this.alert(new Alert({...options, type: AlertType.Info, message}));
  }

  warn(message: string, options?: any) {
    this.alert(new Alert({...options, type: AlertType.Warning, message}));
  }

  error(message: string, options?: any) {
    this.alert(new Alert({...options, type: AlertType.Error, message}));
  }

  alert(alert: Alert) {
    alert.id = alert.id || this.defaultId;
    this.subject.next(alert);
  }

  clear(id = this.defaultId) {
    this.subject.next(new Alert({id}));
  }
}
