import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHistory } from './dashboard-history';

describe('History', () => {
  let component: DashboardHistory;
  let fixture: ComponentFixture<DashboardHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardHistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
