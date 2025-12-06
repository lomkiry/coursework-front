import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardShell } from './card-shell';

describe('CardShell', () => {
  let component: CardShell;
  let fixture: ComponentFixture<CardShell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardShell]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardShell);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
