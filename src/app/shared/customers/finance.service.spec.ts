import { TestBed } from '@angular/core/testing';

import { FinanceService } from './finance.service';

describe('FinanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FinanceService = TestBed.get(FinanceService);
    expect(service).toBeTruthy();
  });
});
