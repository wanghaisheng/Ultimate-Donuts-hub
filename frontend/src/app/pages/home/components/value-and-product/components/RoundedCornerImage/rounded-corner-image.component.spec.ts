import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundedCornerImageComponent } from './rounded-corner-image.component';

describe('RoundedCornerImageComponent', () => {
  let component: RoundedCornerImageComponent;
  let fixture: ComponentFixture<RoundedCornerImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoundedCornerImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoundedCornerImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
