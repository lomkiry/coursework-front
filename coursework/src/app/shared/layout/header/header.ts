import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from "@angular/router";
import { MatChipsModule } from '@angular/material/chips';
import { MatDivider } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddCategory } from '../../../add-category/add-category';
import { AddTransaction } from '../../../add-transaction/add-transaction';
import { MatMenuModule } from '@angular/material/menu';
import { TransactionService } from '../../../core/transaction/transaction.service';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    MatIconModule, 
    MatToolbarModule, 
    MatButtonModule, 
    MatTooltipModule, 
    RouterLink, 
    MatChipsModule, 
    MatDivider,
    MatDialogModule,
    MatMenuModule,
    AsyncPipe
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private transactionService = inject(TransactionService);
  constructor(private dialog: MatDialog) {}

  balance$ = this.transactionService.transactions$.pipe(
    map(transactions => {
      return transactions.reduce((acc, t) => {
        return t.type === 'income' ? acc + t.amount : acc - t.amount;
      }, 0);
    })
  );

  openTransactionForm () {
    this.dialog.open(AddTransaction);
  }

  openCategoryForm() {
    this.dialog.open(AddCategory);
  }
}
