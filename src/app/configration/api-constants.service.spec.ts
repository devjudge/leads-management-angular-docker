import { TestBed, inject } from '@angular/core/testing';

import { ApiConstantsService } from './api-constants.service';

describe('ApiConstantsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiConstantsService]
    });
  });

  it('should be created', inject([ApiConstantsService], (service: ApiConstantsService) => {
    expect(service).toBeTruthy();
  }));
});
