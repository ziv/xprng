import { TestBed } from '@angular/core/testing';

import { TinyService } from './tiny.service';

describe('TinyService', () => {
  let service: TinyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TinyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
