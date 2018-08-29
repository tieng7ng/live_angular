import { TestBed, inject } from '@angular/core/testing';

import { TranslateLocService } from './translate-loc.service';

describe('TranslateLocService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TranslateLocService]
    });
  });

  it('should be created', inject([TranslateLocService], (service: TranslateLocService) => {
    expect(service).toBeTruthy();
  }));
});
