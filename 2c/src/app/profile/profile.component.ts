import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="profile-wrapper">
      <div class="profile-container">
        <div class="profile-header">
          <div class="profile-avatar">
            <span class="avatar-initials">{{ getInitials() }}</span>
          </div>
          <h2 class="profile-name">{{ user?.name || 'User Profile' }}</h2>
          <p class="profile-username">{{ getUsernameDisplay() }}</p>
        </div>

        <div class="profile-details">
          <div class="detail-section">
            <h3>Personal Information</h3>
            <div class="detail-item">
              <span class="detail-label">Full Name</span>
              <span class="detail-value">{{ user?.name || 'Not provided' }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Username</span>
              <span class="detail-value">{{ user?.username || 'Not provided' }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Phone Number</span>
              <span class="detail-value">{{ user?.phoneNumber || 'Not provided' }}</span>
            </div>
          </div>

          <div class="profile-actions">
            <button class="edit-profile-btn" (click)="editProfile()">
              Edit Profile
            </button>
            <button class="logout-btn" (click)="logout()">
              Logout
            </button>
          </div>
        </div>

        <ng-container *ngIf="!user">
          <div class="no-user-message">
            <p>No user logged in.</p>
            <div class="login-options">
              <button routerLink="/login" class="login-btn">
                Go to Login
              </button>
              <button routerLink="/register" class="register-btn">
                Create Account
              </button>
            </div>
          </div>
        </ng-container>
      </div>
    </div>
  `,
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      this.user = storedUser ? JSON.parse(storedUser) : null;
    }
  }

  getUsernameDisplay(): string {
    return this.user?.username ? `@${this.user.username}` : '';
  }

  getInitials(): string {
    if (!this.user || !this.user.name) return '?';
    
    const names = this.user.name.split(' ');
    if (names.length > 1) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return this.user.name[0].toUpperCase();
  }

  editProfile() {
    // Placeholder for edit profile functionality
    alert('Edit profile functionality to be implemented');
  }

  logout() {
    // Clear user from local storage and navigate to login
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}