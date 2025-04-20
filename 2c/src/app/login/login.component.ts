import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="login-wrapper">
      <div class="login-container">
        <div class="login-content">
          <div class="login-header">
            <h2>Welcome Back</h2>
            <p>Sign in to continue to your account</p>
          </div>
          
          <form (ngSubmit)="login()" class="login-form">
            <div class="input-group">
              <label for="username">Username</label>
              <div class="input-wrapper">
                <i class="icon-user"></i>
                <input 
                  id="username"
                  [(ngModel)]="username" 
                  placeholder="Enter your username" 
                  name="username" 
                  required 
                />
              </div>
            </div>

            <div class="input-group">
              <label for="password">Password</label>
              <div class="input-wrapper">
                <i class="icon-lock"></i>
                <input 
                  id="password"
                  [(ngModel)]="password" 
                  type="password" 
                  placeholder="Enter your password" 
                  name="password" 
                  required 
                />
                <i class="icon-eye" (click)="togglePasswordVisibility()"></i>
              </div>
            </div>

            <div class="forgot-password">
              <a href="#">Forgot Password?</a>
            </div>

            <button type="submit" class="login-button">
              Sign In
            </button>

            <div class="or-divider">
              <span>or</span>
            </div>

            <button 
              type="button" 
              class="register-button" 
              (click)="navigateToRegister()"
            >
              Not Registered? Create an Account
            </button>

            <div *ngIf="loginFailed" class="error-message">
              <i class="icon-alert"></i>
              Login failed. Please check your credentials.
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginFailed: boolean = false;
  showPassword: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  login(): void {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    
    if (storedUser && storedUser.username === this.username && storedUser.password === this.password) {
      this.router.navigate(['/profile']);
    } else {
      this.loginFailed = true;
    }
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }
}