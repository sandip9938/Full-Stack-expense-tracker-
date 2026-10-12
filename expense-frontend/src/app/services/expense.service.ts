import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
  private readonly url = 'http://localhost:3000/expenses';

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.url);
  }

  getById(id: number): Observable<Expense> {
    return this.http.get<Expense>(`${this.url}/${id}`);
  }

  create(expense: ExpenseInput): Observable<Expense> {
    return this.http.post<Expense>(this.url, expense);
  }

  update(id: number, expense: Partial<ExpenseInput>): Observable<Expense> {
    return this.http.patch<Expense>(`${this.url}/${id}`, expense);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}