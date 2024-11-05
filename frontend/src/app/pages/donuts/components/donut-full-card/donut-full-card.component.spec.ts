import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutFullCardComponent } from './donut-full-card.component';

describe('DonutFullCardComponent', () => {
  let component: DonutFullCardComponent;
  let fixture: ComponentFixture<DonutFullCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonutFullCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonutFullCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
