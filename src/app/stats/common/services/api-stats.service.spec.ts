import { TestBed } from '@angular/core/testing';

import { ApiStatsService } from './api-stats.service';

describe('ApiStatsService', () => {
  let service: ApiStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
