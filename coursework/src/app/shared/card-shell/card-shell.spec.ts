import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardShellComponent } from './card-shell';

describe('CardShell', () => {
  let component: CardShellComponent;
  let fixture: ComponentFixture<CardShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardShellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
