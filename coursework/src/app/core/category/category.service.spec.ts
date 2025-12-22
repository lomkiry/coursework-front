import { TestBed } from '@angular/core/testing';
import { CategoryService } from './category.service';
import { Category } from '../../model/category.interface';

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(() => {
    localStorage.clear();
    
    TestBed.configureTestingModule({
      providers: [CategoryService]
    });
    service = TestBed.inject(CategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return category object with correct properties', () => {
    const mockCategory: Category = { 
      id: 'test-id', 
      name: 'Еда', 
      type: 'expense', 
      icon: 'fastfood', 
      color: '#ff0000' 
    };

    (service as any).categoriesSubject.next([mockCategory]);

    const result = service.getCategoryById('test-id');
    
    expect(result).toBeDefined();
    expect(result?.name).toBe('Еда');
    expect(result?.id).toBe('test-id');
  });

  it('should return undefined', () => {
    const result = service.getCategoryById('some-fake-id');
    expect(result).toBeUndefined();
  });

  it('should add a new category and generate an ID', () => {
    const newCat = { name: 'Спорт', type: 'expense' as const, icon: 'fitness', color: '#000' };
    service.addCategory(newCat);

    const currentCategories = (service as any).categoriesSubject.getValue();
    const added = currentCategories.find((c: Category) => c.name === 'Спорт');
    
    expect(added).toBeDefined();
    expect(added.id).toBeDefined();
  });
});