import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Existing Firebase user ko sign in karne ke liye login page component.
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="auth-card">
      <h2>Welcome back</h2>
      <p class="muted">Expense Tracker</p>

      <form (ngSubmit)="submit()">
        <input [(ngModel)]="email" name="email" type="email" placeholder="Email" required />
        <input [(ngModel)]="password" name="password" type="password" placeholder="Password" required />

        <button class="btn" type="submit" [disabled]="loading">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>

      @if (error) {
        <p class="error">{{ error }}</p>
      }

      <p class="muted center">
        Need an account?
        <a routerLink="/register">Create one</a>
      </p>
    </div>
  `,
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  email = '';
  password = '';
  loading = false;
  error = '';

  // Form validate karke sign in karta hai aur successful login par expenses page kholta hai.
  async submit(): Promise<void> {
    if (!this.email || !this.password) {
      this.error = 'Email and password are required.';
      return;
    }

    this.loading = true;
    this.error = '';

    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/expenses']);
    } catch (err: any) {
      this.error = err?.message || 'Login failed.';
    } finally {
      this.loading = false;
    }
  }
}
