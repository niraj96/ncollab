import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface AlertConfig {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number; // in milliseconds, 0 means no auto-dismiss
  showCloseButton?: boolean;
  position?: 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';
}

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() config: AlertConfig = {
    type: 'info',
    title: '',
    message: '',
    duration: 5000,
    showCloseButton: true,
    position: 'top-right'
  };

  @Output() close = new EventEmitter<void>();
  @Output() action = new EventEmitter<string>();

  showAlert = false;
  alertClass = '';

  ngOnInit() {
    this.alertClass = `alert-${this.config.type} alert-${this.config.position}`;
    this.showAlert = true;

    // Auto-dismiss if duration is set
    if (this.config.duration && this.config.duration > 0) {
      setTimeout(() => {
        this.dismiss();
      }, this.config.duration);
    }
  }

  dismiss() {
    this.showAlert = false;
    setTimeout(() => {
      this.close.emit();
    }, 300); // Wait for animation to complete
  }

  onAction(action: string) {
    this.action.emit(action);
  }

  getIconPath(): string {
    switch (this.config.type) {
      case 'success':
        return 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z';
      case 'error':
        return 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
      case 'warning':
        return 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z';
      case 'info':
        return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
      default:
        return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
    }
  }
}
