import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutActionButtonsComponent } from './donut-action-buttons.component';

describe('DonutActionButtonsComponent', () => {
  let component: DonutActionButtonsComponent;
  let fixture: ComponentFixture<DonutActionButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonutActionButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonutActionButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
