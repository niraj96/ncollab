import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface InviteData {
  emails: string;
  role: string;
  message?: string;
}

@Component({
  selector: 'app-invite-user',
  imports: [CommonModule, FormsModule],
  templateUrl: './invite-user.html',
  styleUrl: './invite-user.css'
})
export class InviteUser {
  @Input() showInviteUserModal: boolean = false;
  @Output() closeModal = new EventEmitter<string>();
  @Output() inviteUsers = new EventEmitter<void>();

  inviteData: InviteData = {
    emails: '',
    role: '',
    message: ''
  };

  onCloseModal(): void {
    this.closeModal.emit('inviteUser');
  }

  onInviteUsers(): void {
    this.inviteUsers.emit();
  }

  resetInviteForm(): void {
    this.inviteData = {
      emails: '',
      role: '',
      message: ''
    };
  }
}
