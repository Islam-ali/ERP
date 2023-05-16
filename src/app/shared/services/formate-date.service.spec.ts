import { TestBed } from '@angular/core/testing';

import { FormateDateService } from './formate-date.service';

describe('FormateDateService', () => {
  let service: FormateDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormateDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
