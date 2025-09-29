import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

interface loginPayloadType {
  email: string,
  password: string
}

const apiUrl = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUserId$ = new BehaviorSubject<string | null>(null);

  constructor(private readonly http: HttpClient){

  }

  setSelectedUserId(userId: string | null): void {
    this.selectedUserId$.next(userId);
  }

  getSelectedUserId(): BehaviorSubject<string | null> {
    return this.selectedUserId$;
  }

  loginUser(payload: loginPayloadType){
    return this.http.post(`${apiUrl}/users/login`, payload);
  }

  saveToken(token:string){
    localStorage.setItem('token', token);
  }

  verifyUserToken():boolean{
    return localStorage.getItem('token')? true : false;
 
  }

  availabeUser(){

    const token = localStorage.getItem('token');
    if(!token){
      throw new Error("User not authenticated");
    }
    return this.http.get(`${apiUrl}/users/available`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
  }

  userProfile(){
    const token = localStorage.getItem('token');
    if(!token){
      throw new Error("User not authenticated");
    }
    return this.http.get(`${apiUrl}/users/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  userData(userId: string){
    const token = localStorage.getItem('token');
    if(!token){
      throw new Error("User not authenticated");
    }
    return this.http.get(`${apiUrl}/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
  
}
