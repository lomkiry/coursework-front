import { TestBed } from '@angular/core/testing';
import { TransactionService } from './transaction.service';
import { Transaction } from '../../model/transaction.interface';

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(() => {
    localStorage.clear(); 
    TestBed.configureTestingModule({
      providers: [TransactionService]
    });
    service = TestBed.inject(TransactionService);
  });

  it('should add a transaction with description', (done) => {
    const mockTx: Transaction = {
      id: 'test-uuid-123',
      type: 'expense',
      amount: 500,
      date: new Date(),
      description: 'Купил пиццу',
      categoryId: 'cat-1'
    };

    service.addTransaction(mockTx);

    service.transactions$.subscribe(list => {
      const found = list.find(t => t.id === 'test-uuid-123');
      expect(found).toBeTruthy();
      expect(found?.description).toBe('Купил пиццу');
      expect(found?.amount).toBe(500);
      done();
    });
  });

  it('should correctly delete transaction by string id', () => {
    const tx1: Transaction = { id: '1', type: 'income', amount: 100, date: new Date(), description: 'D1', categoryId: 'c1' };
    const tx2: Transaction = { id: '2', type: 'expense', amount: 200, date: new Date(), description: 'D2', categoryId: 'c2' };
    
    service.addTransaction(tx1);
    service.addTransaction(tx2);

    service.deleteTransaction('1');

    const current = service.getTransactionsSync();
    expect(current.length).toBe(1);
    expect(current[0].id).toBe('2');
  });
});