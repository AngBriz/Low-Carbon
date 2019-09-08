import { TestBed } from '@angular/core/testing';

import { CertifierService } from './certifier.service';

describe('CertifierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CertifierService = TestBed.get(CertifierService);
    expect(service).toBeTruthy();
  });
});
