import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../core/category/category.service';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    MatButtonModule, 
    MatIconModule, 
    MatDialogModule
  ],
  templateUrl: './add-category.html',
  styleUrl: './add-category.scss',
})
export class AddCategory {
  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  public dialogRef = inject(MatDialogRef<AddCategory>);

  categoryForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(20)]],
    type: ['expense', Validators.required],
    color: ['#3f51b5', Validators.required], 
    icon: ['label', Validators.required]
  });

  availableIcons = [
    'shopping_cart', 'payments', 'directions_bus', 'home', 
    'restaurant', 'local_gas_station', 'fitness_center', 
    'movie', 'medical_services', 'school', 'work', 'star',
    'pets', 'build', 'Brush', 'celebration'
  ];

  onSubmit() {
    if (this.categoryForm.valid) {
      this.categoryService.addCategory(this.categoryForm.value);
      this.dialogRef.close(true);
    }
  }
}