import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete-account-confirm',
  imports: [CommonModule, FormsModule],
  templateUrl: './delete-account-confirm.html',
  styleUrl: './delete-account-confirm.css'
})
export class DeleteAccountConfirm {
  @Input() showDeleteAccountModal: boolean = false;
  @Output() closeModal = new EventEmitter<string>();
  @Output() deleteAccount = new EventEmitter<void>();

  deleteConfirmationText: string = '';

  onCloseModal(): void {
    this.closeModal.emit('deleteAccount');
  }

  onDeleteAccount(): void {
    this.deleteAccount.emit();
  }
}
