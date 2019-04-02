import { TestBed } from '@angular/core/testing';

import { ConfpService } from './confp.service';

describe('ConfpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfpService = TestBed.get(ConfpService);
    expect(service).toBeTruthy();
  });
});
