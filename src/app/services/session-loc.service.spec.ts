import { TestBed, inject } from '@angular/core/testing';

import { SessionLocService } from './session-loc.service';

describe('SessionLocService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionLocService]
    });
  });

  it('should be created', inject([SessionLocService], (service: SessionLocService) => {
    expect(service).toBeTruthy();
  }));
});
