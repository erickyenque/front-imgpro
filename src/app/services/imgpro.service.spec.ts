import { TestBed } from '@angular/core/testing';

import { ImgproService } from './imgpro.service';

describe('ImgproService', () => {
  let service: ImgproService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImgproService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
