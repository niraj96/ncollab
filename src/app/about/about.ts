import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {
  
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Navigation methods
  goToHome(): void {
    console.log('Navigate to home');
  }

  goToLogin(): void {
    console.log('Navigate to login');
  }

  goToRegister(): void {
    console.log('Navigate to register');
  }

  goToFeatures(): void {
    this.scrollToSection('features');
  }

  goToTechStack(): void {
    this.scrollToSection('tech-stack');
  }

  goToDeveloper(): void {
    this.scrollToSection('developer');
  }
}
