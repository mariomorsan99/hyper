import { TestBed } from '@angular/core/testing';
import { ApiSearchService } from './apisearch.service';

describe('ApisearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiSearchService = TestBed.get(ApiSearchService);
    expect(service).toBeTruthy();
  });
});
