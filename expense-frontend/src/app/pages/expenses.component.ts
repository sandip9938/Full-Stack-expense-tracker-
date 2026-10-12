import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Expense, ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [FormsModule, CurrencyPipe],
  template: `
    <div class="wrap">
      <header>
        <h1>Expense Tracker</h1>
        <div class="right">
          <span class="muted">{{ auth.user()?.email }}</span>
          <button class="btn ghost" type="button" (click)="auth.logout()">Logout</button>
        </div>
      </header>

      <div class="card total">
        <span class="muted">Total Spent</span>
        <h2>{{ total() | currency: 'INR' }}</h2>
      </div>

      <form class="card grid" (ngSubmit)="save()">
        <input name="title" [(ngModel)]="form.title" placeholder="Title (e.g. Chai)" required />
        <input name="amount" type="number" [(ngModel)]="form.amount" placeholder="Amount" required />

        <select name="category" [(ngModel)]="form.category">
          @for (c of categories; track c) {
            <option [value]="c">{{ c }}</option>
          }
        </select>

        <input name="date" type="date" [(ngModel)]="form.date" required />
        <input name="note" [(ngModel)]="form.note" placeholder="Note (optional)" />

        <div class="actions">
          <button class="btn" type="submit">{{ editingId() ? 'Update' : 'Add Expense' }}</button>
          @if (editingId()) {
            <button class="btn ghost" type="button" (click)="reset()">Cancel</button>
          }
        </div>
      </form>

      @if (error()) {
        <p class="err">{{ error() }}</p>
      }

      <div class="card">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Category</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            @for (e of expenses(); track e.id) {
              <tr>
                <td>{{ e.date }}</td>
                <td>
                  {{ e.title }}
                  <div class="muted small">{{ e.note }}</div>
                </td>
                <td><span class="tag">{{ e.category }}</span></td>
                <td>{{ e.amount | currency: 'INR' }}</td>
                <td class="row-actions">
                  <button class="btn sm" type="button" (click)="edit(e)">Edit</button>
                  <button class="btn sm danger" type="button" (click)="remove(e.id!)">Delete</button>
                </td>
              </tr>
            } @empty {
              <tr>
                <td colspan="5" class="muted center">Abhi koi expense nahi hai</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class ExpensesComponent implements OnInit {
  private readonly api = inject(ExpenseService);
  readonly auth = inject(AuthService);

  readonly categories = ['Food', 'Travel', 'Shopping', 'Bills', 'Health', 'Other'];
  readonly expenses = signal<Expense[]>([]);
  readonly total = computed(() =>
    this.expenses().reduce((sum, item) => sum + Number(item.amount || 0), 0),
  );
  readonly editingId = signal<number | null>(null);
  readonly error = signal('');

  form = {
    title: '',
    amount: null as number | null,
    category: 'Food',
    date: new Date().toISOString().slice(0, 10),
    note: '',
  };

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.api.getAll().subscribe({
      next: (data) => this.expenses.set(data),
      error: () => this.error.set('Data load nahi hua. Backend chal raha hai?'),
    });
  }

  save(): void {
    const payload = {
      title: this.form.title,
      amount: Number(this.form.amount),
      category: this.form.category,
      date: this.form.date,
      note: this.form.note || null,
    };

    if (!payload.title || !payload.category || !payload.date || !payload.amount) {
      this.error.set('Please fill in all required fields.');
      return;
    }

    this.error.set('');
    const id = this.editingId();
    const request = id == null ? this.api.create(payload) : this.api.update(id, payload);

    request.subscribe({
      next: () => {
        this.reset();
        this.load();
      },
      error: (err) => this.error.set(err?.error?.message ?? 'Save nahi hua'),
    });
  }

  edit(expense: Expense): void {
    this.editingId.set(expense.id ?? null);
    this.form = {
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
      note: expense.note ?? '',
    };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  reset(): void {
    this.editingId.set(null);
    this.form = {
      title: '',
      amount: null,
      category: 'Food',
      date: new Date().toISOString().slice(0, 10),
      note: '',
    };
    this.error.set('');
  }

  remove(id: number): void {
    if (!confirm('Pakka delete karna hai?')) {
      return;
    }

    this.api.delete(id).subscribe({
      next: () => this.load(),
      error: () => this.error.set('Delete nahi hua'),
    });
  }
}