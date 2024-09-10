import { TestBed } from '@angular/core/testing';

import { EmployeeTaskService } from './employee-task.service';

describe('EmployeeTaskService', () => {
  let service: EmployeeTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
