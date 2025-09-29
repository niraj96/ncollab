import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="alert-demo">
      <h3>Alert System Demo</h3>
      <div class="demo-buttons">
        <button class="btn btn-success" (click)="showSuccess()">Success Alert</button>
        <button class="btn btn-error" (click)="showError()">Error Alert</button>
        <button class="btn btn-warning" (click)="showWarning()">Warning Alert</button>
        <button class="btn btn-info" (click)="showInfo()">Info Alert</button>
        <button class="btn btn-secondary" (click)="clearAll()">Clear All</button>
      </div>
    </div>
  `,
  styles: [`
    .alert-demo {
      padding: 20px;
      text-align: center;
    }
    
    .demo-buttons {
      display: flex;
      gap: 10px;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 20px;
    }
    
    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s ease;
    }
    
    .btn-success { background: #10b981; color: white; }
    .btn-error { background: #ef4444; color: white; }
    .btn-warning { background: #f59e0b; color: white; }
    .btn-info { background: #3b82f6; color: white; }
    .btn-secondary { background: #6b7280; color: white; }
    
    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
  `]
})
export class AlertDemoComponent {
  constructor(private alertService: AlertService) {}

  showSuccess() {
    this.alertService.success('Success!', 'This is a success message that will auto-dismiss in 5 seconds.');
  }

  showError() {
    this.alertService.error('Error!', 'This is an error message that will stay until manually closed.');
  }

  showWarning() {
    this.alertService.warning('Warning!', 'This is a warning message that will auto-dismiss in 5 seconds.');
  }

  showInfo() {
    this.alertService.info('Information', 'This is an info message that will auto-dismiss in 5 seconds.');
  }

  clearAll() {
    this.alertService.clearAll();
  }
}
