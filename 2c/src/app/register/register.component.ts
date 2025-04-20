import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="register-wrapper">
      <div class="register-container">
        <div class="register-content">
          <div class="register-header">
            <h2>Create an Account</h2>
            <p>Join our platform and get started</p>
          </div>
          
          <form (ngSubmit)="register()" class="register-form">
            <div class="input-group">
              <label for="name">Full Name</label>
              <div class="input-wrapper">
                <i class="icon-user"></i>
                <input 
                  id="name"
                  [(ngModel)]="user.name" 
                  placeholder="Enter your full name" 
                  name="name" 
                  required 
                />
              </div>
            </div>

            <div class="input-group">
              <label for="username">Username</label>
              <div class="input-wrapper">
                <i class="icon-at"></i>
                <input 
                  id="username"
                  [(ngModel)]="user.username" 
                  placeholder="Choose a username" 
                  name="username" 
                  required 
                />
              </div>
            </div>

            <div class="input-group">
              <label for="phoneNumber">Phone Number</label>
              <div class="input-wrapper">
                <i class="icon-phone"></i>
                <input 
                  id="phoneNumber"
                  [(ngModel)]="user.phoneNumber" 
                  placeholder="Enter your phone number" 
                  name="phoneNumber" 
                  required 
                  type="tel"
                />
              </div>
            </div>

            <div class="input-group">
              <label for="password">Password</label>
              <div class="input-wrapper">
                <i class="icon-lock"></i>
                <input 
                  id="password"
                  [(ngModel)]="user.password" 
                  type="password" 
                  placeholder="Create a strong password" 
                  name="password" 
                  required 
                />
                <i class="icon-eye" (click)="togglePasswordVisibility()"></i>
              </div>
            </div>

            <button type="submit" class="register-button">
              Create Account
            </button>

            <div class="login-link">
              Already have an account? 
              <a routerLink="/login">Sign In</a>
            </div>

            <div *ngIf="registrationError" class="error-message">
              <i class="icon-alert"></i>
              {{ registrationError }}
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = { username: '', password: '', name: '', phoneNumber: '' };
  showPassword: boolean = false;
  registrationError: string = '';

  constructor(private userService: UserService, private router: Router) {}

  register(): void {
    try {
      // Basic validation
      if (!this.validateForm()) {
        return;
      }

      this.userService.register(this.user);
      localStorage.setItem('user', JSON.stringify(this.user));
      this.router.navigate(['/login']);
    } catch (error) {
      this.registrationError = 'Registration failed. Please try again.';
    }
  }

  validateForm(): boolean {
    // Basic form validation
    if (!this.user.name || !this.user.username || !this.user.phoneNumber || !this.user.password) {
      this.registrationError = 'Please fill in all fields';
      return false;
    }

    // Phone number validation (basic example)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(this.user.phoneNumber)) {
      this.registrationError = 'Please enter a valid 10-digit phone number';
      return false;
    }

    // Password strength validation
    if (this.user.password.length < 6) {
      this.registrationError = 'Password must be at least 6 characters long';
      return false;
    }

    return true;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }
}