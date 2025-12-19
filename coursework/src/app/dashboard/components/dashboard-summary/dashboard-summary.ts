import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../../core/transaction/transaction.service';
import { CardShellComponent } from "../../../shared/card-shell/card-shell";
import { map } from 'rxjs';

@Component({
  selector: 'app-dashboard-summary',
  standalone: true,
  imports: [CommonModule, CardShellComponent],
  templateUrl: './dashboard-summary.html',
  styleUrl: './dashboard-summary.scss'
})
export class DashboardSummary implements OnInit {
  private transactionService = inject(TransactionService);

  summary$ = this.transactionService.transactions$.pipe(
    map(transactions => {
      const income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const expense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      return {
        income,
        expense,
        total: income - expense
      };
    })
  );

  ngOnInit() {}

  formatAmount(amount: number): string {
    return new Intl.NumberFormat('ru-RU').format(amount) + ' ₽';
  }
}