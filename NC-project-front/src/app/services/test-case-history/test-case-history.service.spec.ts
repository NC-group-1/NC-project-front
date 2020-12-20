import { TestBed } from '@angular/core/testing';

import { TestCaseHistoryService } from './test-case-history.service';

describe('TestCaseHistoryService', () => {
  let service: TestCaseHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestCaseHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
