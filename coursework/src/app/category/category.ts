import { Component, inject } from '@angular/core';
import { CategoryService } from '../core/category/category.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatCardModule],
  templateUrl: './category.html',
  styleUrl: './category.scss',
})
export class Category {
  private categoryService = inject(CategoryService);
  categories$ = this.categoryService.categories$;

  deleteCategory(id: string) {
    if (confirm('Удалить категорию? Это не удалит связанные с ней транзакции, но они останутся без категории.')) {
      this.categoryService.deleteCategory(id);
    }
  }
}