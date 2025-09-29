import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface UserStatus {
  status: 'available' | 'busy' | 'away' | 'donotdisturb' | 'invisible';
  message?: string;
  duration?: string;
  expiresAt?: Date;
  showInChat?: boolean;
}

@Component({
  selector: 'app-status-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './status-modal.html',
  styleUrl: './status-modal.css'
})
export class StatusModal {
  @Input() showStatusModal: boolean = false;
  @Output() closeModal = new EventEmitter<string>();
  @Output() setStatusMessage = new EventEmitter<void>();
  @Output() clearStatusMessage = new EventEmitter<void>();

  statusMessage: string = '';
  statusDuration: string = 'never';
  showStatusInChat: boolean = true;

  onCloseModal(): void {
    this.closeModal.emit('status');
  }

  onSetStatusMessage(): void {
    this.setStatusMessage.emit();
  }

  onClearStatusMessage(): void {
    this.clearStatusMessage.emit();
  }
}
