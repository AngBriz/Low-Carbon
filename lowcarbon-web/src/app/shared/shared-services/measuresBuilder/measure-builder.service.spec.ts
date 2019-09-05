import { TestBed } from '@angular/core/testing';

import { MeasureBuilderService } from './measure-builder.service';

describe('MeasureBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MeasureBuilderService = TestBed.get(MeasureBuilderService);
    expect(service).toBeTruthy();
  });
});
