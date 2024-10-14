import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutFlavouredCardComponent } from './donut-flavoured-card.component';

describe('DonutFlavouredCardComponent', () => {
  let component: DonutFlavouredCardComponent;
  let fixture: ComponentFixture<DonutFlavouredCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonutFlavouredCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonutFlavouredCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
