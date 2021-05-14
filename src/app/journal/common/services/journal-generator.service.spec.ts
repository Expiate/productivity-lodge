import { TestBed } from '@angular/core/testing';

import { JournalGeneratorService } from './journal-generator.service';

describe('JournalGeneratorService', () => {
  let service: JournalGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JournalGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
