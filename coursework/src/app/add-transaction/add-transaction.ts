import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { TransactionService } from '../core/transaction/transaction.service';
import { CategoryService } from '../core/category/category.service';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { map, startWith } from 'rxjs';
import { combineLatest, Observable } from 'rxjs';

function positiveAmountValidator(control: AbstractControl): ValidationErrors | null {
  const amount = control.value;
  return amount > 0 ? null : { positiveAmount: true };
}

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, 
    MatInputModule, MatButtonModule, MatIconModule, MatDatepickerModule, 
    MatNativeDateModule, MatDialogModule, MatNativeDateModule
  ],
  templateUrl: './add-transaction.html',
  styleUrl: './add-transaction.scss',
})
export class AddTransaction implements OnInit {
  private categoryService = inject(CategoryService);
  private transactionService = inject(TransactionService);
  private fb = inject(FormBuilder);
  transactionForm!: FormGroup;

  categories$ = this.categoryService.categories$; 

  constructor(public dialogRef: MatDialogRef<AddTransaction>) {}

  filteredCategories$!: Observable<any[]>;

  ngOnInit() {
    this.transactionForm = this.fb.group({
      type: ['expense', Validators.required],
      amount: [null, [Validators.required, positiveAmountValidator]],
      date: [new Date(), Validators.required],
      description: ['', Validators.maxLength(100)],
      categoryId: [null, Validators.required],
    });
    this.filteredCategories$ = combineLatest([
      this.categoryService.categories$, 
      this.transactionForm.get('type')!.valueChanges.pipe(startWith('expense')) 
    ]).pipe(
      map(([categories, selectedType]) => {
        return categories.filter(cat => cat.type === selectedType);
      })
    );
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      const rawData = this.transactionForm.value;
      
      this.transactionService.addTransaction(rawData);

      this.dialogRef.close(true);
    }
  }
  onTypeChange() {
    this.transactionForm.get('categoryId')?.setValue(null);
  }
}