import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthReviewComponent } from './month-review.component';

describe('MonthReviewComponent', () => {
  let component: MonthReviewComponent;
  let fixture: ComponentFixture<MonthReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
