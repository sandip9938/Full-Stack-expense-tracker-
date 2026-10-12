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

// Firebase signup, login, logout aur current user state ko manage karta hai.
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly router = inject(Router);
  readonly user = signal<User | null>(null);
  readonly ready: Promise<void>;

  constructor() {
    // Firebase se initial signed-in user milne tak guard ko wait karne deta hai.
    this.ready = new Promise((resolve) => {
      onAuthStateChanged(auth, (currentUser) => {
        this.user.set(currentUser);
        resolve();
      });
    });
  }

  // Email aur password ke saath Firebase account create karta hai.
  async register(email: string, password: string) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    this.user.set(cred.user);
  }

  // Firebase mein user ko sign in karke current user signal update karta hai.
  async login(email: string, password: string) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    this.user.set(cred.user);
  }

  // Current Firebase session band karke login page par bhejta hai.
  async logout() {
    await signOut(auth);
    this.user.set(null);
    this.router.navigate(['/login']);
  }

  // Backend request ke liye current user ka Firebase ID token deta hai.
  async getToken(): Promise<string | null> {
    return auth.currentUser ? auth.currentUser.getIdToken() : null;
  }
}