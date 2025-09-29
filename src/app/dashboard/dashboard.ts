import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../shared/services/alert.service';
import { AlertContainerComponent } from '../shared/components/alert-container/alert-container.component';
import { RouterOutlet } from '@angular/router';
import { InviteUser } from './modal/invite-user/invite-user';
import { CreateChannel } from './modal/create-channel/create-channel';
import { CreateGroup } from './modal/create-group/create-group';
import { StatusModal } from './modal/status-modal/status-modal';
import { AddUserToGroup } from './modal/add-user-to-group/add-user-to-group';
import { DeleteAccountConfirm } from './modal/delete-account-confirm/delete-account-confirm';
import { Main } from './main/main';

interface Message {
  sender: string;
  text: string;
  time: string;
  isOwn: boolean;
}

interface MessageGroup {
  date: string;
  messages: Message[];
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  department?: string;
}

interface InviteData {
  emails: string;
  role: string;
  message?: string;
}

interface Group {
  id: string;
  name: string;
  description?: string;
  isPrivate: boolean;
  members: User[];
}

interface Channel {
  id: string;
  name: string;
  description?: string;
  isPrivate: boolean;
  members?: User[];
}

interface MemberSuggestion {
  id: string;
  name: string;
  email: string;
}

interface UserStatus {
  status: 'available' | 'busy' | 'away' | 'donotdisturb' | 'invisible';
  message?: string;
  duration?: string;
  expiresAt?: Date;
  showInChat?: boolean;
}

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule, FormsModule, AlertContainerComponent, 
    InviteUser, CreateChannel, CreateGroup, 
    StatusModal, AddUserToGroup, DeleteAccountConfirm, Main ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  constructor(private alertService: AlertService) {}

  // Modal states
  showAddUserModal: boolean = false;
  showInviteUserModal: boolean = false;
  showCreateGroupModal: boolean = false;
  showCreateChannelModal: boolean = false;
  showStatusModal: boolean = false;
  showStatusDropdown: boolean = false;
  showDeleteAccountModal: boolean = false;
  showAddUserToGroupModal: boolean = false;

  // Main search properties
  mainSearchQuery: string = '';
  showMainSearchSuggestions: boolean = false;
  mainSearchSuggestions: any[] = [];
  selectedSuggestionIndex: number = -1;

  // Form data
  newUser: User = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    department: ''
  };

  // Sample users for search suggestions
  availableUsers: MemberSuggestion[] = [
    { id: '1', name: 'Sarah Johnson', email: 'sarah.johnson@company.com' },
    { id: '2', name: 'Mike Chen', email: 'mike.chen@company.com' },
    { id: '3', name: 'Alex Rodriguez', email: 'alex.rodriguez@company.com' },
    { id: '4', name: 'Emily Davis', email: 'emily.davis@company.com' },
    { id: '5', name: 'David Wilson', email: 'david.wilson@company.com' },
    { id: '6', name: 'Lisa Brown', email: 'lisa.brown@company.com' },
    { id: '7', name: 'John Smith', email: 'john.smith@company.com' },
    { id: '8', name: 'Maria Garcia', email: 'maria.garcia@company.com' },
    { id: '9', name: 'James Wilson', email: 'james.wilson@company.com' },
    { id: '10', name: 'Jennifer Lee', email: 'jennifer.lee@company.com' },
    { id: '11', name: 'Robert Taylor', email: 'robert.taylor@company.com' },
    { id: '12', name: 'Amanda White', email: 'amanda.white@company.com' },
    { id: '13', name: 'Christopher Brown', email: 'christopher.brown@company.com' },
    { id: '14', name: 'Jessica Miller', email: 'jessica.miller@company.com' },
    { id: '15', name: 'Daniel Anderson', email: 'daniel.anderson@company.com' },
    { id: '16', name: 'Ashley Thomas', email: 'ashley.thomas@company.com' },
    { id: '17', name: 'Matthew Jackson', email: 'matthew.jackson@company.com' },
    { id: '18', name: 'Stephanie Harris', email: 'stephanie.harris@company.com' },
    { id: '19', name: 'Andrew Martin', email: 'andrew.martin@company.com' },
    { id: '20', name: 'Nicole Thompson', email: 'nicole.thompson@company.com' },
    { id: '21', name: 'Kevin Garcia', email: 'kevin.garcia@company.com' },
    { id: '22', name: 'Rachel Martinez', email: 'rachel.martinez@company.com' },
    { id: '23', name: 'Brandon Robinson', email: 'brandon.robinson@company.com' },
    { id: '24', name: 'Samantha Clark', email: 'samantha.clark@company.com' },
    { id: '25', name: 'Tyler Rodriguez', email: 'tyler.rodriguez@company.com' }
  ];

  // Sample groups data for search
  groups: any[] = [
    { id: '1', name: 'Development Team', members: ['1', '2', '3'], description: 'Main development team' },
    { id: '2', name: 'Design Team', members: ['4', '5'], description: 'UI/UX design team' },
    { id: '3', name: 'Marketing', members: ['6', '7', '8'], description: 'Marketing and sales team' },
    { id: '4', name: 'Management', members: ['9', '10'], description: 'Management team' }
  ];

  // Sample channels data for search
  channels: any[] = [
    { id: '1', name: 'general', description: 'General discussion for the team', members: ['1', '2', '3', '4', '5'] },
    { id: '2', name: 'announcements', description: 'Important announcements and updates', members: ['1', '2', '3', '4', '5', '6', '7', '8'] },
    { id: '3', name: 'random', description: 'Random chat and water cooler conversations', members: ['1', '2', '3', '4'] },
    { id: '4', name: 'dev-updates', description: 'Development progress and technical discussions', members: ['1', '2', '3'] },
    { id: '5', name: 'design-feedback', description: 'Design reviews and feedback sessions', members: ['4', '5', '1', '2'] }
  ];

  // Recent users data - ordered by most recent activity
  recentUsers: any[] = [
    { id: '1', name: 'Sarah Johnson', avatar: '', status: 'available', lastSeen: '2 min ago', sortOrder: 1 },
    { id: '15', name: 'Daniel Anderson', avatar: '', status: 'available', lastSeen: '5 min ago', sortOrder: 2 },
    { id: '2', name: 'Mike Chen', avatar: '', status: 'busy', lastSeen: '5 min ago', sortOrder: 3 },
    { id: '11', name: 'Robert Taylor', avatar: '', status: 'available', lastSeen: '10 min ago', sortOrder: 4 },
    { id: '6', name: 'Lisa Brown', avatar: '', status: 'available', lastSeen: '15 min ago', sortOrder: 5 },
    { id: '13', name: 'Christopher Brown', avatar: '', status: 'available', lastSeen: '20 min ago', sortOrder: 6 },
    { id: '4', name: 'Emily Davis', avatar: '', status: 'available', lastSeen: '30 min ago', sortOrder: 7 },
    { id: '9', name: 'James Wilson', avatar: '', status: 'busy', lastSeen: '45 min ago', sortOrder: 8 },
    { id: '3', name: 'Alex Rodriguez', avatar: '', status: 'away', lastSeen: '1 hour ago', sortOrder: 9 },
    { id: '8', name: 'Maria Garcia', avatar: '', status: 'available', lastSeen: '1 hour ago', sortOrder: 10 },
    { id: '12', name: 'Amanda White', avatar: '', status: 'busy', lastSeen: '1 hour ago', sortOrder: 11 },
    { id: '10', name: 'Jennifer Lee', avatar: '', status: 'away', lastSeen: '2 hours ago', sortOrder: 12 },
    { id: '5', name: 'David Wilson', avatar: '', status: 'donotdisturb', lastSeen: '2 hours ago', sortOrder: 13 },
    { id: '7', name: 'John Smith', avatar: '', status: 'invisible', lastSeen: '3 hours ago', sortOrder: 14 },
    { id: '14', name: 'Jessica Miller', avatar: '', status: 'away', lastSeen: '4 hours ago', sortOrder: 15 }
  ];

  // Status management
  currentStatus: UserStatus = {
    status: 'available',
    message: '',
    duration: 'never',
    showInChat: true
  };

  // Menu management
  activeMenu: 'chats' | 'groups' | 'channels' = 'chats';
  isCollapsed: boolean = false;
  selectedChatId: string = '';

  // Chat properties (used by main component)
  selectedChatName: string = '';
  selectedChatType: 'user' | 'group' | 'channel' = 'user';

  selectChat(chatId: string, chatName?: string, chatType?: string): void {
    // Set selected chat info
    this.selectedChatId = chatId;
    this.selectedChatName = chatName || this.getChatDisplayName(chatId);
    this.selectedChatType = (chatType as 'user' | 'group' | 'channel') || this.getChatType(chatId);

    // Load messages for selected chat
    this.loadMessagesForChat(chatId);
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  getChatDisplayName(chatId: string): string {
    const chatNames: { [key: string]: string } = {
      'sarah': 'Sarah Johnson',
      'mike': 'Mike Chen',
      'alex': 'Alex Rodriguez',
      'dev-team': 'Dev Team',
      'design-team': 'Design Team',
      'general': 'general',
      'announcements': 'announcements',
      'random': 'random'
    };
    return chatNames[chatId] || chatId;
  }

  getChatType(chatId: string): 'user' | 'group' | 'channel' {
    if (['sarah', 'mike', 'alex'].includes(chatId)) {
      return 'user';
    } else if (['dev-team', 'design-team'].includes(chatId)) {
      return 'group';
    } else {
      return 'channel';
    }
  }

  getGroupMembers(): string {
    return '5'; // Sample data
  }

  loadMessagesForChat(chatId: string): void {
    // In a real app, this would load messages from a service
    // For demo purposes, we'll use sample data
    console.log(`Loading messages for chat: ${chatId}`);
  }


  // Modal Methods
  openModal(modalType: string): void {
    this.closeAllModals();
    switch (modalType) {
      case 'addUser':
        this.showAddUserModal = true;
        break;
      case 'inviteUser':
        this.showInviteUserModal = true;
        break;
      case 'createGroup':
        this.showCreateGroupModal = true;
        break;
      case 'createChannel':
        this.showCreateChannelModal = true;
        break;
      case 'addUserToGroup':
        this.showAddUserToGroupModal = true;
        break;
    }
  }

  closeModal(modalType: string): void {
    switch (modalType) {
      case 'addUser':
        this.showAddUserModal = false;
        this.resetAddUserForm();
        break;
      case 'inviteUser':
        this.showInviteUserModal = false;
        break;
      case 'createGroup':
        this.showCreateGroupModal = false;
        break;
      case 'createChannel':
        this.showCreateChannelModal = false;
        break;
      case 'status':
        this.showStatusModal = false;
        break;
      case 'deleteAccount':
        this.showDeleteAccountModal = false;
        break;
      case 'addUserToGroup':
        this.showAddUserToGroupModal = false;
        break;
    }
  }

  closeAllModals(): void {
    this.showAddUserModal = false;
    this.showInviteUserModal = false;
    this.showCreateGroupModal = false;
    this.showCreateChannelModal = false;
    this.showStatusModal = false;
    this.showStatusDropdown = false;
    this.showDeleteAccountModal = false;
    this.showAddUserToGroupModal = false;
  }

  // Add User Methods
  addUser(): void {
    if (this.newUser.firstName && this.newUser.lastName && this.newUser.email && this.newUser.role) {
      // In a real app, this would call a service to add the user
      console.log('Adding user:', this.newUser);
      this.alertService.success('User Added', `User ${this.newUser.firstName} ${this.newUser.lastName} has been added successfully!`);
      this.closeModal('addUser');
    }
  }

  resetAddUserForm(): void {
    this.newUser = {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      department: ''
    };
  }

  // Modal event handlers (for child components)
  inviteUsers(): void {
    this.alertService.success('Invitations Sent', 'User invitations have been sent successfully!');
    this.closeModal('inviteUser');
  }

  createGroup(): void {
    this.alertService.success('Group Created', 'Group has been created successfully!');
    this.closeModal('createGroup');
  }

  createChannel(): void {
    this.alertService.success('Channel Created', 'Channel has been created successfully!');
    this.closeModal('createChannel');
  }

  addUserToGroup(): void {
    this.alertService.success('Users Added', 'Users have been added to the group successfully!');
    this.closeModal('addUserToGroup');
  }

  deleteAccount(): void {
    this.alertService.success('Account Deleted', 'Your account has been deleted successfully!');
    this.closeModal('deleteAccount');
  }

  setStatusMessage(): void {
    this.alertService.success('Status Updated', 'Your status message has been updated!');
    this.closeModal('status');
  }

  clearStatusMessage(): void {
    this.alertService.success('Status Cleared', 'Your status message has been cleared!');
    this.closeModal('status');
  }

  // Status Methods
  toggleStatusDropdown(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.showStatusDropdown = !this.showStatusDropdown;
  }

  closeStatusDropdown(): void {
    this.showStatusDropdown = false;
  }

  // Menu Methods
  setActiveMenu(menu: 'chats' | 'groups' | 'channels'): void {
    this.activeMenu = menu;
    // Clear selected chat when switching menus
    this.selectedChatName = '';
    this.selectedChatType = 'user';
  }

  getCurrentMenuTitle(): string {
    switch (this.activeMenu) {
      case 'chats':
        return 'Chats';
      case 'groups':
        return 'Groups';
      case 'channels':
        return 'Channels';
      default:
        return 'Chats';
    }
  }

  getChatCount(): number {
    // Return number of active chats
    return 5; // Sample data
  }

  getGroupCount(): number {
    // Return number of groups
    return 4; // Sample data
  }

  getChannelCount(): number {
    // Return number of channels
    return 5; // Sample data
  }

  getRecentUsers(): any[] {
    // Return users sorted by most recent activity (sortOrder)
    return this.recentUsers.sort((a, b) => a.sortOrder - b.sortOrder);
  }

  // Main search methods
  searchMain(): void {
    if (this.mainSearchQuery.trim() === '') {
      this.mainSearchSuggestions = [];
      this.selectedSuggestionIndex = -1;
      return;
    }

    const query = this.mainSearchQuery.toLowerCase();
    const suggestions: any[] = [];

    // Search users
    const userResults = this.availableUsers.filter(user => 
      user.name.toLowerCase().includes(query) || 
      user.email.toLowerCase().includes(query)
    ).slice(0, 5).map(user => ({ ...user, type: 'user' }));

    // Search groups
    const groupResults = this.groups.filter(group => 
      group.name.toLowerCase().includes(query) || 
      group.description.toLowerCase().includes(query)
    ).slice(0, 3).map(group => ({ ...group, type: 'group' }));

    // Search channels
    const channelResults = this.channels.filter(channel => 
      channel.name.toLowerCase().includes(query) || 
      channel.description.toLowerCase().includes(query)
    ).slice(0, 3).map(channel => ({ ...channel, type: 'channel' }));

    suggestions.push(...userResults, ...groupResults, ...channelResults);
    this.mainSearchSuggestions = suggestions;
    this.selectedSuggestionIndex = -1;
  }

  getSearchSuggestionsByType(type: string): any[] {
    return this.mainSearchSuggestions.filter(item => item.type === type);
  }

  hideMainSearchSuggestions(): void {
    // Use setTimeout to allow click events to fire before hiding
    setTimeout(() => {
      this.showMainSearchSuggestions = false;
      this.selectedSuggestionIndex = -1;
    }, 150);
  }

  navigateSearchSuggestions(direction: 'up' | 'down', event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();
    
    if (this.mainSearchSuggestions.length === 0) return;

    if (direction === 'down') {
      this.selectedSuggestionIndex = Math.min(
        this.selectedSuggestionIndex + 1, 
        this.mainSearchSuggestions.length - 1
      );
    } else {
      this.selectedSuggestionIndex = Math.max(this.selectedSuggestionIndex - 1, -1);
    }
  }

  selectSearchSuggestion(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();
    
    if (this.selectedSuggestionIndex >= 0 && this.selectedSuggestionIndex < this.mainSearchSuggestions.length) {
      const selectedItem = this.mainSearchSuggestions[this.selectedSuggestionIndex];
      this.selectSearchItem(selectedItem, selectedItem.type);
    }
  }

  selectSearchItem(item: any, type: string): void {
    this.mainSearchQuery = '';
    this.showMainSearchSuggestions = false;
    this.selectedSuggestionIndex = -1;

    // Handle selection based on type
    switch (type) {
      case 'user':
        this.selectChat(item.id, item.name, 'user');
        this.alertService.info('User Selected', `Opened chat with ${item.name}`);
        break;
      case 'group':
        this.selectChat(item.id, item.name, 'group');
        this.alertService.info('Group Selected', `Opened group ${item.name}`);
        break;
      case 'channel':
        this.selectChat(item.id, item.name, 'channel');
        this.alertService.info('Channel Selected', `Opened channel #${item.name}`);
        break;
    }
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  logout(): void {
    // Close status dropdown
    this.showStatusDropdown = false;
    
    // In a real app, this would:
    // 1. Clear user session/token
    // 2. Clear local storage
    // 3. Redirect to login page
    // 4. Call logout API endpoint
    
    console.log('User logged out');
    this.alertService.success('Logged Out', 'You have been logged out successfully!');
    
    // For demo purposes, we'll just show an alert
    // In a real app, you would redirect to login page:
    // this.router.navigate(['/login']);
  }

  openDeleteAccountModal(): void {
    this.showStatusDropdown = false;
    this.showDeleteAccountModal = true;
    this.alertService.warning('Account Deletion', 'This action cannot be undone. All your data will be permanently deleted.');
  }

  setStatus(status: 'available' | 'busy' | 'away' | 'donotdisturb' | 'invisible'): void {
    this.currentStatus.status = status;
    this.showStatusDropdown = false;
    
    // In a real app, this would update the status on the server
    console.log('Status changed to:', status);
  }

  getStatusText(status?: string): string {
    const statusToCheck = status || this.currentStatus.status;
    const statusTexts: { [key: string]: string } = {
      'available': 'Available',
      'busy': 'Busy',
      'away': 'Away',
      'donotdisturb': 'Do not disturb',
      'invisible': 'Invisible'
    };

    let text = statusTexts[statusToCheck] || statusToCheck;
    if (statusToCheck === this.currentStatus.status && this.currentStatus.message) {
      text += ` - ${this.currentStatus.message}`;
    }
    return text;
  }

  openStatusModal(): void {
    this.showStatusDropdown = false;
    this.showStatusModal = true;
  }

}
