import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Transaction } from '../../model/transaction.interface';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private readonly STORAGE_KEY = 'transactions';
  private transactionsSubject = new BehaviorSubject<Transaction[]>(this.loadFromLocalStorage());
  
  public transactions$ = this.transactionsSubject.asObservable();

  constructor() {}

  private loadFromLocalStorage(): Transaction[] {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.transactionsSubject.getValue()));
  }

  addTransaction(transaction: Transaction): void {
    const current = this.transactionsSubject.getValue();
    
    const newTransaction: Transaction = {
      ...transaction,
      id: transaction.id || crypto.randomUUID() 
    };

    const updated = [newTransaction, ...current];
    this.transactionsSubject.next(updated);
    this.saveToLocalStorage();
  }

  getLastFiveTransactions(): Observable<Transaction[]> {
    return this.transactions$.pipe(
      map(list => [...list]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5)
      )
    );
  }

  deleteTransaction(id: string): void {
    const currentTransactions = this.transactionsSubject.getValue();
    
    const updatedTransactions = currentTransactions.filter(t => t.id !== id);
    
    this.transactionsSubject.next(updatedTransactions);
    this.saveToLocalStorage();
  }

getTransactionsSync() {
  return this.transactionsSubject.getValue();
}
}