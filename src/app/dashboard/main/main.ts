import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../shared/services/alert.service';
import {SocketService} from '../../services/socket.service';
import { UserService } from '../../services/user.service';
import { firstValueFrom } from 'rxjs';

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


@Component({
  selector: 'app-main',
  imports: [CommonModule, FormsModule],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main {
  
  constructor(private alertService: AlertService, private socketService: SocketService, private userService: UserService){   

  }

  ngOnInit(){
    this.socketService.connect()

    this.socketService.listen("chat message", (data: any)=>{
      console.log("after listen", data);

      this.messageGroups[0].messages.push( {
        sender: this.selectedChatId != data.sender? 'You' : data.sender,
        text: data.text,
        time: new Date(data.time).toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true 
        }),
        isOwn: this.selectedChatId != data.sender ? true : false
      });

    

    })
    
    this.userService.getSelectedUserId().subscribe(userId=>{
      console.log("Selected user ID changed:", userId);
      this.selectedChatId = userId || '';
      this.getChatDisplayName(this.selectedChatId);
      this.selectedChatType = userId ? this.getChatType(userId) : 'channel';
      // Load messages for selected chat
      if(userId){
        this.loadMessagesForChat(userId);
      }
      // Scroll to bottom of messages
      setTimeout(() => {
        this.scrollToBottom();
      }, 100);
    })
  }

  ngAfterViewInit(): void {
    // Scroll to bottom when component initializes
    setTimeout(() => {
      this.scrollToBottom();
    }, 100);
  }

  selectedChatName: string = '';
  selectedChatType: 'user' | 'group' | 'channel' = 'user';
  newMessage: string = '';
  selectedChatId: string = '';

  // Sample message data
  messageGroups: MessageGroup[] = [
    {
      date: 'Today',
      messages: [
        // {
        //   sender: 'Sarah Johnson',
        //   text: 'Hey, how\'s the project going?',
        //   time: '2:30 PM',
        //   isOwn: false
        // },
       
      ]
    }
  ];

  selectChat(chatId: string, chatName?: string, chatType?: string): void {
    // Set selected chat info
    this.selectedChatId = chatId;
    this.getChatDisplayName(chatId);
    this.selectedChatType = (chatType as 'user' | 'group' | 'channel') || this.getChatType(chatId);

    // Load messages for selected chat
    this.loadMessagesForChat(chatId);
    // Scroll to bottom of messages
    setTimeout(() => {
      this.scrollToBottom();
    }, 100);
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  getChatDisplayName(chatId: string): void {
    // const chatNames: { [key: string]: string } = {
    //   'sarah': 'Sarah Johnson',
    //   'mike': 'Mike Chen',
    //   'alex': 'Alex Rodriguez',
    //   'dev-team': 'Dev Team',
    //   'design-team': 'Design Team',
    //   'general': 'general',
    //   'announcements': 'announcements',
    //   'random': 'random'
    // };
    // return chatNames[chatId] || chatId;

    this.userService.userData(chatId).subscribe({
      next:(resp: unknown)=>{
        const {code, message, data} = resp as any;
        console.log('User data:', data);
         this.selectedChatName = data.name;
      },

      error:(err)=>{
        console.log('Error found', err);
        return chatId;
      }

    })
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

  sendMessage(): void {
    if (!this.newMessage.trim()) {
      return;
    }


    const messagePayload = {      
      chatId: this.selectedChatId,
      message: this.newMessage.trim()
    };

    console.log('Sending message:', messagePayload);
    // Emit message via SocketService

    this.socketService.emit("chat message", messagePayload);

   
    // If no chat is selected, set a default chat name
    if (!this.selectedChatName) {
      this.selectedChatName = 'General Chat';
      this.selectedChatType = 'channel';
    }

    const newMsg: Message = {
      sender: 'You',
      text: this.newMessage.trim(),
      time: this.getCurrentTime(),
      isOwn: true
    };

    // Add message to current group or create new group
    const today = this.messageGroups.find(group => group.date === 'Today');
    if (today) {
      today.messages.push(newMsg);
    } else {
      this.messageGroups.push({
        date: 'Today',
        messages: [newMsg]
      });
    }

    // Clear input
    this.newMessage = '';

    // Scroll to bottom
    setTimeout(() => {
      this.scrollToBottom();
    }, 100);

    // // Simulate response (in a real app, this would come from the server)
    // setTimeout(() => {
    //   this.simulateResponse();
    // }, 1000);
  }

  private simulateResponse(): void {
    const responses = [
      'That sounds great!',
      'Thanks for the update!',
      'I\'ll check that out.',
      'Perfect timing!',
      'Let me know if you need any help.',
      'Awesome work!',
      'I agree with that approach.',
      'Looking forward to seeing it!'
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    const responseMsg: Message = {
      sender: this.selectedChatName,
      text: randomResponse,
      time: this.getCurrentTime(),
      isOwn: false
    };

    const today = this.messageGroups.find(group => group.date === 'Today');
    if (today) {
      today.messages.push(responseMsg);
    }

    setTimeout(() => {
      this.scrollToBottom();
    }, 100);
  }

  private getCurrentTime(): string {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  }

  private scrollToBottom(): void {
    // if (this.messagesContainer) {
    //   const element = this.messagesContainer.nativeElement;
    //   element.scrollTop = element.scrollHeight;
    // }
  }


  ngOnDestroy(){
    this.socketService.disconnect();
    this.userService.getSelectedUserId().unsubscribe();
  }


}
