import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Alert, ALERT_MESSAGE_STYLE } from '../models/alert.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new Subject<Alert>();

  get(): Observable<Alert> {
    return this.subject.asObservable();
  }

  primary(message: string) {
    this.alert({ message, style: ALERT_MESSAGE_STYLE.PRIMARY });
  }

  secondary(message: string) {
    this.alert({ message, style: ALERT_MESSAGE_STYLE.SECONDARY });
  }

  success(message: string) {
    this.alert({ message, style: ALERT_MESSAGE_STYLE.SUCCESS });
  }

  danger(message: string) {
    this.alert({ message, style: ALERT_MESSAGE_STYLE.DANGER });
  }

  info(message: string) {
    this.alert({ message, style: ALERT_MESSAGE_STYLE.INFO });
  }

  light(message: string) {
    this.alert({ message, style: ALERT_MESSAGE_STYLE.LIGHT });
  }

  dark(message: string) {
    this.alert({ message, style: ALERT_MESSAGE_STYLE.DARK });
  }

  alert(alert: Alert) {
    this.subject.next(alert);
  }

  clear() {
    this.subject.next();
  }
}
