import { TestBed } from '@angular/core/testing';

import { FactoriesService } from './factories.service';

describe('FactoriesService', () => {
  let service: FactoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FactoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
