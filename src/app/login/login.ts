import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

interface LoginUser {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginSuccessResp {
  code: number;
  success: boolean;
  data: {
    userId: string;
    token: string;
  };
  message: string;
  error: string | null;
  meta: any | null;
}



@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login  implements OnDestroy{

  constructor(private readonly userServ: UserService, private router: Router){

  }
  user: LoginUser = {
    email: '',
    password: '',
    rememberMe: false
  };

  showPassword = false;

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.validateForm()) {
      console.log('Login form submitted:', this.user);
      // Here you would typically send the data to your backend service
      this.handleLogin();
    }
  }

  private validateForm(): boolean {
    return this.isValidEmail(this.user.email) && this.user.password.length > 0;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private handleLogin(): void {
    // Simulate API call
    console.log('Authenticating user...');

    this.userServ.loginUser({email: this.user.email, password: this.user.password})
    .subscribe({

      next:(resp: unknown)=>{
        const {code, message, data} = resp as LoginSuccessResp

        alert(message);
        this.userServ.saveToken(data.token);
        this.router.navigate(['/dashboard'])

        
      },

      error:(err)=>{
        console.log('Error found', err);
        alert('Error found')
      }

    })
    
    // You can add loading state, success/error handling here
    // For demo purposes, we'll just show an alert
    alert('Login successful! Welcome to nCollab! (This is a demo)');
    
    // Reset form after successful login
    this.resetForm();
  }

  private resetForm(): void {
    this.user = {
      email: '',
      password: '',
      rememberMe: false
    };
    this.showPassword = false;
  }


  ngOnDestroy(): void {
   
  }
}
