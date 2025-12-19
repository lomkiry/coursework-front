import { Component, OnInit, inject, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TransactionService } from '../core/transaction/transaction.service';
import { CategoryService } from '../core/category/category.service';
import { Observable } from 'rxjs';
import { Transaction } from '../model/transaction.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe, DatePipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, AsyncPipe, DatePipe, CommonModule],
  templateUrl: './history.html',
  styleUrl: './history.scss',
})
export class History implements OnInit {
  @Input() limit: number = 0; 

  private transactionService = inject(TransactionService);
  private categoryService = inject(CategoryService);

  transactions$!: Observable<Transaction[]>;
  displayedColumns: string[] = ['date', 'type', 'category', 'description', 'amount', 'actions'];

  ngOnInit() {
    // Если лимит задан (например 5), вызываем спец. метод, иначе — берем всё
    this.transactions$ = this.limit > 0 
      ? this.transactionService.getLastFiveTransactions() 
      : this.transactionService.transactions$;
  }

  getCategoryData(id: string) {
    return this.categoryService.getCategoryById(id);
  }

  getIcon(type: 'income' | 'expense'): string {
    return type === 'income' ? 'call_received' : 'call_made';
  }

  getClass(type: 'income' | 'expense'): string {
    return type === 'income' ? 'income-row' : 'expense-row';
  }

  deleteTransaction(id: string) {
    if (confirm('Удалить эту операцию?')) {
      this.transactionService.deleteTransaction(id);
    }
  }

  formatAmount(amount: number): string {
  if (amount === null || amount === undefined) return '0';
  
  return new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
}
}