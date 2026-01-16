import { TestBed } from '@angular/core/testing';

import { PernissionService } from './pernission-service';

describe('PernissionService', () => {
  let service: PernissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PernissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
