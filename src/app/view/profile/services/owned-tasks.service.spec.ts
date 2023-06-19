import { TestBed } from '@angular/core/testing';

import { OwnedTasksService } from './owned-tasks.service';

describe('OwnedTasksService', () => {
  let service: OwnedTasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnedTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
