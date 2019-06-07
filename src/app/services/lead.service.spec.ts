import { TestBed, inject } from '@angular/core/testing';

import { LeadService } from './lead.service';

describe('LeadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeadService]
    });
  });

  it('should be created', inject([LeadService], (service: LeadService) => {
    expect(service).toBeTruthy();
  }));
});
