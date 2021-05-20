import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent implements OnDestroy {
  alerts: any[] = [];
  subscription: Subscription;

  constructor(private alert: AlertService) {
    this.subscription = this.alert.get().subscribe(alert => {
      if (alert) {
        this.alerts.push(alert);
      } else {
        this.alerts = [];
      }
    });
  }

  close(i: number) {
    this.alerts.splice(i, 1);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
