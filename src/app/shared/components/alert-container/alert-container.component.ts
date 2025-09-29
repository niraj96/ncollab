import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AlertService } from '../../services/alert.service';
import { AlertConfig, AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-alert-container',
  standalone: true,
  imports: [CommonModule, AlertComponent],
  templateUrl: './alert-container.component.html',
  styleUrls: ['./alert-container.component.css']
})
export class AlertContainerComponent implements OnInit, OnDestroy {
  alerts: (AlertConfig & { id: number })[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.subscription = this.alertService.alerts$.subscribe(alerts => {
      this.alerts = alerts as (AlertConfig & { id: number })[];
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onAlertClose(alertId: number): void {
    this.alertService.removeAlert(alertId);
  }

  onAlertAction(action: string, alertId: number): void {
    // Handle alert actions if needed
    console.log('Alert action:', action, 'for alert:', alertId);
  }

  trackByAlertId(index: number, alert: any): number {
    return alert.id;
  }
}
