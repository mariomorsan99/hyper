import { TestBed } from '@angular/core/testing';
import { ApiSetSearchService } from './apisetsearch.service';

describe('ApisetsearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiSetSearchService = TestBed.get(ApiSetSearchService);
    expect(service).toBeTruthy();
  });
});
