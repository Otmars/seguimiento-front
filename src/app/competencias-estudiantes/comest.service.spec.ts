import { TestBed } from '@angular/core/testing';

import { ComestService } from './comest.service';

describe('ComestService', () => {
  let service: ComestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
