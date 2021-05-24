import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodReviewComponent } from './mood-review.component';

describe('MoodReviewComponent', () => {
  let component: MoodReviewComponent;
  let fixture: ComponentFixture<MoodReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoodReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
