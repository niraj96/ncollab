import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Demo functionality for the chat preview
  sendMessage(): void {
    console.log('Demo: Message sent!');
    // In a real app, this would send the message via a service
  }

  // Navigation methods
  goToLogin(): void {
    // In a real app, this would navigate to login page
    console.log('Navigate to login');
  }

  goToRegister(): void {
    // In a real app, this would navigate to register page
    console.log('Navigate to register');
  }

  goToDemo(): void {
    console.log('Open demo video or modal');
    // In a real app, this would open a demo video or modal
  }
}
