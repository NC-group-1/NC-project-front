import { TestBed } from '@angular/core/testing';

import { ParameterKeyService } from './parameter-key.service';

describe('ParameterKeyService', () => {
  let service: ParameterKeyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParameterKeyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
