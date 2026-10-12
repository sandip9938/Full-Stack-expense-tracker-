import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="auth-card">
      <h2>Create account</h2>
      <p class="muted">Expense Tracker</p>

      <form (ngSubmit)="submit()">
        <input [(ngModel)]="email" name="email" type="email" placeholder="Email" required />
        <input [(ngModel)]="password" name="password" type="password" placeholder="Password" required />

        <button class="btn" type="submit" [disabled]="loading">
          {{ loading ? 'Creating account...' : 'Register' }}
        </button>
      </form>

      @if (error) {
        <p class="error">{{ error }}</p>
      }

      <p class="muted center">
        Already have an account?
        <a routerLink="/login">Login</a>
      </p>
    </div>
  `,
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  email = '';
  password = '';
  loading = false;
  error = '';

  async submit(): Promise<void> {
    if (!this.email || !this.password) {
      this.error = 'Email and password are required.';
      return;
    }

    this.loading = true;
    this.error = '';

    try {
      await this.authService.register(this.email, this.password);
      this.router.navigate(['/expenses']);
    } catch (err: any) {
      this.error = err?.message || 'Registration failed.';
    } finally {
      this.loading = false;
    }
  }
}
