import { TestBed } from '@angular/core/testing';

import { PopupmsgService } from './popupmsg.service';

describe('PopupmsgService', () => {
  let service: PopupmsgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopupmsgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
