import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../../model/category.interface';
import { v4 as uuidv4 } from 'uuid'; 

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly STORAGE_KEY = 'my_finance_categories';


  private defaultCategories: Category[] = [
    { id: uuidv4(), name: 'Продукты', type: 'expense', icon: 'shopping_cart', color: '#ff9800' }, 
    { id: uuidv4(), name: 'Зарплата', type: 'income', icon: 'payments', color: '#4caf50' },     
    { id: uuidv4(), name: 'Транспорт', type: 'expense', icon: 'directions_bus', color: '#2196f3' },
    { id: uuidv4(), name: 'Жилье', type: 'expense', icon: 'home', color: '#9c27b0' }           
  ];

  private categoriesSubject = new BehaviorSubject<Category[]>(this.loadFromLocalStorage());
  public categories$ = this.categoriesSubject.asObservable();

  constructor() {}

  private loadFromLocalStorage(): Category[] {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return saved ? JSON.parse(saved) : this.defaultCategories;
  }

  private saveToLocalStorage(categories: Category[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(categories));
  }

  addCategory(categoryData: Omit<Category, 'id'>): void {
    const current = this.categoriesSubject.getValue();
    const newCategory: Category = {
      ...categoryData,
      id: uuidv4()
    };
    const updated = [...current, newCategory];
    
    this.categoriesSubject.next(updated);
    this.saveToLocalStorage(updated);
  }

  deleteCategory(id: string): void {
    const updated = this.categoriesSubject.getValue().filter(c => c.id !== id);
    this.categoriesSubject.next(updated);
    this.saveToLocalStorage(updated);
  }

  getCategoryById(id: string): Category | undefined {
    return this.categoriesSubject.getValue().find(c => c.id === id);
  }
}