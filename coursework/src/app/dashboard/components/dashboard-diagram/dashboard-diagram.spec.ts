import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDiagram } from './dashboard-diagram';

describe('DashboardDiagram', () => {
  let component: DashboardDiagram;
  let fixture: ComponentFixture<DashboardDiagram>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardDiagram]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardDiagram);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
