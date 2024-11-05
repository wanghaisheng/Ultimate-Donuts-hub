import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerCardComponent } from './drawer-card.component';

describe('DrawerCardComponent', () => {
  let component: DrawerCardComponent;
  let fixture: ComponentFixture<DrawerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
