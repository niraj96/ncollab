import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Channel {
  id: string;
  name: string;
  description?: string;
  isPrivate: boolean;
  members?: any[];
}

interface MemberSuggestion {
  id: string;
  name: string;
  email: string;
}

@Component({
  selector: 'app-create-channel',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-channel.html',
  styleUrl: './create-channel.css'
})
export class CreateChannel {
  @Input() showCreateChannelModal: boolean = false;
  @Output() closeModal = new EventEmitter<string>();
  @Output() createChannel = new EventEmitter<void>();

  newChannel: Channel = {
    id: '',
    name: '',
    description: '',
    isPrivate: false,
    members: []
  };

  selectedChannelMembers: MemberSuggestion[] = [];
  channelMemberSearchQuery: string = '';
  channelMemberSuggestions: MemberSuggestion[] = [];

  availableUsers: MemberSuggestion[] = [
    { id: '1', name: 'Sarah Johnson', email: 'sarah.johnson@company.com' },
    { id: '2', name: 'Mike Chen', email: 'mike.chen@company.com' },
    { id: '3', name: 'Alex Rodriguez', email: 'alex.rodriguez@company.com' },
    { id: '4', name: 'Emily Davis', email: 'emily.davis@company.com' },
    { id: '5', name: 'David Wilson', email: 'david.wilson@company.com' }
  ];

  onCloseModal(): void {
    this.closeModal.emit('createChannel');
  }

  onCreateChannel(): void {
    this.createChannel.emit();
  }

  searchChannelMembers(): void {
    if (this.channelMemberSearchQuery.trim()) {
      this.channelMemberSuggestions = this.availableUsers.filter(user => 
        user.name.toLowerCase().includes(this.channelMemberSearchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(this.channelMemberSearchQuery.toLowerCase())
      ).filter(user => !this.selectedChannelMembers.some(selected => selected.id === user.id));
    } else {
      this.channelMemberSuggestions = [];
    }
  }

  addChannelMember(member: MemberSuggestion): void {
    if (!this.selectedChannelMembers.some(selected => selected.id === member.id)) {
      this.selectedChannelMembers.push(member);
      this.channelMemberSearchQuery = '';
      this.channelMemberSuggestions = [];
    }
  }

  removeChannelMember(member: MemberSuggestion): void {
    this.selectedChannelMembers = this.selectedChannelMembers.filter(selected => selected.id !== member.id);
  }

  resetCreateChannelForm(): void {
    this.newChannel = {
      id: '',
      name: '',
      description: '',
      isPrivate: false,
      members: []
    };
    this.selectedChannelMembers = [];
    this.channelMemberSearchQuery = '';
    this.channelMemberSuggestions = [];
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }
}
