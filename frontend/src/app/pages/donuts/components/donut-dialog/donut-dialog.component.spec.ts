import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutDialogComponent } from './donut-dialog.component';

describe('DonutDialogComponent', () => {
  let component: DonutDialogComponent;
  let fixture: ComponentFixture<DonutDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonutDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DonutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
