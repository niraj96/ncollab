import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertConfig } from '../components/alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertsSubject = new BehaviorSubject<AlertConfig[]>([]);
  public alerts$ = this.alertsSubject.asObservable();

  private alertId = 0;

  constructor() { }

  /**
   * Show a success alert
   */
  success(title: string, message: string, duration: number = 5000): void {
    this.addAlert({
      type: 'success',
      title,
      message,
      duration,
      showCloseButton: true,
      position: 'top-right'
    });
  }

  /**
   * Show an error alert
   */
  error(title: string, message: string, duration: number = 0): void {
    this.addAlert({
      type: 'error',
      title,
      message,
      duration,
      showCloseButton: true,
      position: 'top-right'
    });
  }

  /**
   * Show a warning alert
   */
  warning(title: string, message: string, duration: number = 5000): void {
    this.addAlert({
      type: 'warning',
      title,
      message,
      duration,
      showCloseButton: true,
      position: 'top-right'
    });
  }

  /**
   * Show an info alert
   */
  info(title: string, message: string, duration: number = 5000): void {
    this.addAlert({
      type: 'info',
      title,
      message,
      duration,
      showCloseButton: true,
      position: 'top-right'
    });
  }

  /**
   * Show a custom alert
   */
  show(config: AlertConfig): void {
    this.addAlert(config);
  }

  /**
   * Add a new alert to the queue
   */
  private addAlert(config: AlertConfig): void {
    const alert = {
      ...config,
      id: this.alertId++
    } as AlertConfig & { id: number };

    const currentAlerts = this.alertsSubject.value;
    this.alertsSubject.next([...currentAlerts, alert]);

    // Auto-remove if duration is set
    if (config.duration && config.duration > 0) {
      setTimeout(() => {
        this.removeAlert(alert.id);
      }, config.duration);
    }
  }

  /**
   * Remove a specific alert
   */
  removeAlert(alertId: number): void {
    const currentAlerts = this.alertsSubject.value;
    this.alertsSubject.next(currentAlerts.filter(alert => (alert as any).id !== alertId));
  }

  /**
   * Clear all alerts
   */
  clearAll(): void {
    this.alertsSubject.next([]);
  }

  /**
   * Get current alerts
   */
  getAlerts(): AlertConfig[] {
    return this.alertsSubject.value;
  }
}
