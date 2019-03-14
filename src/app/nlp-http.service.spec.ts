import { TestBed } from '@angular/core/testing';

import { NlpHttpService } from './nlp-http.service';

describe('NlpHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NlpHttpService = TestBed.get(NlpHttpService);
    expect(service).toBeTruthy();
  });
});
