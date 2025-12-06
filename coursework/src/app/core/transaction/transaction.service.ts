import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Transaction } from '../../model/transaction.interface';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'Transactions';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private transactionsSubject = new BehaviorSubject<Transaction[]>([]);

  public transactions$: Observable<Transaction[]> = this.transactionsSubject.asObservable();

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const transaction: Transaction[] = JSON.parse(data).map((t: any) => ({
        ...t,
        date: new Date(t.date)
      }));
      this.transactionsSubject.next(transaction);
    } else {
      this.transactionsSubject.next([]);
    }
  }

  private saveToLocalStorage() {
    const data = this.transactionsSubject.getValue();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  addTransaction(transaction: Transaction) {
    const current = this.transactionsSubject.getValue();
    const newId = uuidv4();
    const updated = [...current, { ...transaction, id: newId }];
    this.transactionsSubject.next(updated);
    this.saveToLocalStorage(); 
  }

  getLastFiveTransactions(): Observable<Transaction[]> {
    return this.transactions$.pipe(
      map(transactions => 
        transactions
          .sort((a, b) => b.date.getTime() - a.date.getTime())
          .slice(0, 5)
      )
    );
  }
}
