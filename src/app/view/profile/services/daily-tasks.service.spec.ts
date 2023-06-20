import { TestBed } from '@angular/core/testing';

import { DailyTasksService } from './daily-tasks.service';

describe('DailyTasksService', () => {
  let service: DailyTasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
