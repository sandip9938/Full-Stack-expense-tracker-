import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase.config';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly router = inject(Router);
  readonly user = signal<User | null>(null);
  readonly ready: Promise<void>;

  constructor() {
    this.ready = new Promise((resolve) => {
      onAuthStateChanged(auth, (currentUser) => {
        this.user.set(currentUser);
        resolve();
      });
    });
  }

  async register(email: string, password: string) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    this.user.set(cred.user);
  }

  async login(email: string, password: string) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    this.user.set(cred.user);
  }

  async logout() {
    await signOut(auth);
    this.user.set(null);
    this.router.navigate(['/login']);
  }

  async getToken(): Promise<string | null> {
    return auth.currentUser ? auth.currentUser.getIdToken() : null;
  }
}