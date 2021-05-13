import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeManagerComponent } from './time-manager.component';

describe('TimeManagerComponent', () => {
  let component: TimeManagerComponent;
  let fixture: ComponentFixture<TimeManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
