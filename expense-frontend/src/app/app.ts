import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Root component jahan router active page ko render karta hai.
@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  // Angular starter title; abhi UI mein directly use nahi hota.
  protected readonly title = signal('expense-frontend');
}
