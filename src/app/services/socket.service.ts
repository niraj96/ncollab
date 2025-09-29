
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

const apiUrl = `http://localhost:3000`
@Injectable({
  providedIn: 'root'
})  
export class SocketService {

  private socket!: Socket
  connect(): void {
    this.socket = io(apiUrl, {
      query: {
        token: localStorage.getItem('token') as string
      }
    });
  }

  listen(event:string, cb:any){
    return this.socket.on(event, cb);
  }

  emit(event: string, data:any): void {
    this.socket.emit(event, data)
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
