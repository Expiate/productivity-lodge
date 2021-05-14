import { TestBed } from '@angular/core/testing';

import { ApiJournalService } from './api-journal.service';

describe('ApiJournalService', () => {
  let service: ApiJournalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiJournalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
