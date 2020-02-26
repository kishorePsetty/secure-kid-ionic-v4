import { TestBed } from '@angular/core/testing';

import { SkApiService } from './sk-api.service';

describe('SkApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SkApiService = TestBed.get(SkApiService);
    expect(service).toBeTruthy();
  });
});
