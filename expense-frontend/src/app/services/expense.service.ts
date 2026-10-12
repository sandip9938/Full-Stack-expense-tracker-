import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Backend se aane wale expense record ka TypeScript shape.
export interface Expense {
  id?: number;
  title: string;
  amount: number;
  category: string;
  date: string;
  note?: string | null;
  userId?: string;
  createdAt?: string | Date;
}

// Naya expense banate waqt client se bheje jaane wale fields.
export interface ExpenseInput {
  title: string;
  amount: number;
  category: string;
  date: string;
  note?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  // Backend ke expenses endpoints ka base URL.
  private readonly url = 'http://localhost:3000/expenses';

  constructor(private readonly http: HttpClient) {}

  // Login user ke saare expenses backend se laata hai.
  getAll(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.url);
  }

  getById(id: number): Observable<Expense> {
    return this.http.get<Expense>(`${this.url}/${id}`);
  }

  // Naya expense API ko bhejkar database mein save karta hai.
  create(expense: ExpenseInput): Observable<Expense> {
    return this.http.post<Expense>(this.url, expense);
  }

  update(id: number, expense: Partial<ExpenseInput>): Observable<Expense> {
    return this.http.patch<Expense>(`${this.url}/${id}`, expense);
  }

  // Diye gaye ID wala expense delete karne ki request bhejta hai.
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}