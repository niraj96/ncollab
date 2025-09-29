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
  selector: 'app-create-group',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-group.html',
  styleUrl: './create-group.css'
})
export class CreateGroup {
  @Input() showCreateGroupModal: boolean = false;
  @Output() closeModal = new EventEmitter<string>();
  @Output() createGroup = new EventEmitter<void>();

  newGroup: Group = {
    id: '',
    name: '',
    description: '',
    isPrivate: false,
    members: []
  };

  selectedMembers: MemberSuggestion[] = [];
  memberSearchQuery: string = '';
  memberSuggestions: MemberSuggestion[] = [];

  availableUsers: MemberSuggestion[] = [
    { id: '1', name: 'Sarah Johnson', email: 'sarah.johnson@company.com' },
    { id: '2', name: 'Mike Chen', email: 'mike.chen@company.com' },
    { id: '3', name: 'Alex Rodriguez', email: 'alex.rodriguez@company.com' },
    { id: '4', name: 'Emily Davis', email: 'emily.davis@company.com' },
    { id: '5', name: 'David Wilson', email: 'david.wilson@company.com' }
  ];

  onCloseModal(): void {
    this.closeModal.emit('createGroup');
  }

  onCreateGroup(): void {
    this.createGroup.emit();
  }

  searchMembers(): void {
    if (this.memberSearchQuery.trim()) {
      this.memberSuggestions = this.availableUsers.filter(user => 
        user.name.toLowerCase().includes(this.memberSearchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(this.memberSearchQuery.toLowerCase())
      ).filter(user => !this.selectedMembers.some(selected => selected.id === user.id));
    } else {
      this.memberSuggestions = [];
    }
  }

  addMember(member: MemberSuggestion): void {
    if (!this.selectedMembers.some(selected => selected.id === member.id)) {
      this.selectedMembers.push(member);
      this.memberSearchQuery = '';
      this.memberSuggestions = [];
    }
  }

  removeMember(member: MemberSuggestion): void {
    this.selectedMembers = this.selectedMembers.filter(selected => selected.id !== member.id);
  }

  resetCreateGroupForm(): void {
    this.newGroup = {
      id: '',
      name: '',
      description: '',
      isPrivate: false,
      members: []
    };
    this.selectedMembers = [];
    this.memberSearchQuery = '';
    this.memberSuggestions = [];
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }
}
