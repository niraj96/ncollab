import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Group {
  id: string;
  name: string;
  description?: string;
  isPrivate: boolean;
  members: any[];
}

interface MemberSuggestion {
  id: string;
  name: string;
  email: string;
}

@Component({
  selector: 'app-add-user-to-group',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-user-to-group.html',
  styleUrl: './add-user-to-group.css'
})
export class AddUserToGroup {
  @Input() showAddUserToGroupModal: boolean = false;
  @Output() closeModal = new EventEmitter<string>();
  @Output() addUserToGroup = new EventEmitter<void>();

  userAddType: 'existing' | 'guest' = 'existing';
  selectedGroupForUser: string = '';
  userSearchQuery: string = '';
  userSuggestions: MemberSuggestion[] = [];
  selectedUsersForGroup: MemberSuggestion[] = [];
  guestUser: any = {
    name: '',
    email: '',
    role: 'member'
  };

  groups: Group[] = [
    { id: '1', name: 'Development Team', members: ['1', '2', '3'], description: 'Main development team', isPrivate: false },
    { id: '2', name: 'Design Team', members: ['4', '5'], description: 'UI/UX design team', isPrivate: false },
    { id: '3', name: 'Marketing', members: ['6', '7', '8'], description: 'Marketing and sales team', isPrivate: false },
    { id: '4', name: 'Management', members: ['9', '10'], description: 'Management team', isPrivate: false }
  ];

  availableUsers: MemberSuggestion[] = [
    { id: '1', name: 'Sarah Johnson', email: 'sarah.johnson@company.com' },
    { id: '2', name: 'Mike Chen', email: 'mike.chen@company.com' },
    { id: '3', name: 'Alex Rodriguez', email: 'alex.rodriguez@company.com' },
    { id: '4', name: 'Emily Davis', email: 'emily.davis@company.com' },
    { id: '5', name: 'David Wilson', email: 'david.wilson@company.com' }
  ];

  onCloseModal(): void {
    this.closeModal.emit('addUserToGroup');
  }

  onAddUserToGroup(): void {
    this.addUserToGroup.emit();
  }

  setUserAddType(type: 'existing' | 'guest'): void {
    this.userAddType = type;
    this.resetUserAddForm();
  }

  searchUsers(): void {
    if (this.userSearchQuery.trim() === '') {
      this.userSuggestions = [];
      return;
    }

    const query = this.userSearchQuery.toLowerCase();
    this.userSuggestions = this.availableUsers.filter(user => 
      user.name.toLowerCase().includes(query) || 
      user.email.toLowerCase().includes(query)
    ).slice(0, 5);
  }

  selectUserForGroup(user: MemberSuggestion): void {
    const isAlreadySelected = this.selectedUsersForGroup.some(selected => selected.id === user.id);
    if (!isAlreadySelected) {
      this.selectedUsersForGroup.push(user);
    }
    this.userSearchQuery = '';
    this.userSuggestions = [];
  }

  removeUserFromGroup(user: MemberSuggestion): void {
    this.selectedUsersForGroup = this.selectedUsersForGroup.filter(selected => selected.id !== user.id);
  }

  canAddUserToGroup(): boolean {
    if (!this.selectedGroupForUser) {
      return false;
    }

    if (this.userAddType === 'existing') {
      return this.selectedUsersForGroup.length > 0;
    } else {
      return this.guestUser.name.trim() !== '';
    }
  }

  resetUserAddForm(): void {
    this.selectedGroupForUser = '';
    this.userSearchQuery = '';
    this.userSuggestions = [];
    this.selectedUsersForGroup = [];
    this.guestUser = {
      name: '',
      email: '',
      role: 'member'
    };
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }
}
