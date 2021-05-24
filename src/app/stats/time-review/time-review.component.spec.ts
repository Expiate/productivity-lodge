import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeReviewComponent } from './time-review.component';

describe('TimeReviewComponent', () => {
  let component: TimeReviewComponent;
  let fixture: ComponentFixture<TimeReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
