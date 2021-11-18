import { TestBed } from '@angular/core/testing';

import { ThirdPartyAccountService } from './third-party-account.service';

describe('ThirdPartyAccountService', () => {
  let service: ThirdPartyAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThirdPartyAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
