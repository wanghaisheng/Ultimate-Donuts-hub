import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselArrowButtonsComponent } from './carousel-arrow-buttons.component';

describe('CarouselArrowButtonsComponent', () => {
  let component: CarouselArrowButtonsComponent;
  let fixture: ComponentFixture<CarouselArrowButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselArrowButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselArrowButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
