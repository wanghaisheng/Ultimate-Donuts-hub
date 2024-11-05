import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueAndProductComponent } from './value-and-product.component';

describe('ValueAndProductComponent', () => {
  let component: ValueAndProductComponent;
  let fixture: ComponentFixture<ValueAndProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValueAndProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValueAndProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
