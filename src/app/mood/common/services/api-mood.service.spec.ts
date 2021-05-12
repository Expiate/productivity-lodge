import { TestBed } from '@angular/core/testing';

import { ApiMoodService } from './api-mood.service';

describe('ApiMoodService', () => {
  let service: ApiMoodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiMoodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
