import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  };

  showPassword = false;

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.validateForm()) {
      console.log('Registration form submitted:', this.user);
      // Here you would typically send the data to your backend service
      this.handleRegistration();
    }
  }

  private validateForm(): boolean {
    // Additional validation logic can be added here
    return this.user.firstName.length >= 2 &&
           this.user.lastName.length >= 2 &&
           this.isValidEmail(this.user.email) &&
           this.user.password.length >= 8 &&
           this.user.password === this.user.confirmPassword &&
           this.user.acceptTerms;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private handleRegistration(): void {
    // Simulate API call
    console.log('Creating account...');
    
    // You can add loading state, success/error handling here
    // For demo purposes, we'll just show an alert
    alert('Account created successfully! (This is a demo)');
    
    // Reset form after successful registration
    this.resetForm();
  }

  private resetForm(): void {
    this.user = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false
    };
    this.showPassword = false;
  }
}
