import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TransactionService } from '../core/transaction/transaction.service';
import { Observable, of } from 'rxjs';
import { Transaction } from '../model/transaction.interface';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-history',
  imports: [MatTableModule, MatIconModule, AsyncPipe, DatePipe],
  templateUrl: './history.html',
  styleUrl: './history.scss',
})
export class History implements OnInit {
  lastFiveTransactions$: Observable<Transaction[]> = of ([]);

  displayedColumns: string[] = ['date', 'type', 'category', 'description', 'amount', 'actions'];

  constructor(private transactionService: TransactionService) {}
  
  ngOnInit() {
    this.lastFiveTransactions$ = this.transactionService.getLastFiveTransactions();
  }

  getIcon(type: 'income' | 'expense'): string {
    return type === 'income' ? 'call_received' : 'call_made';
  }

  getClass(type: 'income' | 'expense'): string {
    return type === 'income' ? 'income-row' : 'expense-row';
  }
}
