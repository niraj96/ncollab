import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface loginPayloadType {
  email: string,
  password: string
}

const apiUrl = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http: HttpClient){

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
    
  }
  
}
