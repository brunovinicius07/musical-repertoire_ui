import { TestBed } from '@angular/core/testing';

import { ProfileServiceTsService } from './profile.service.ts.service';

describe('ProfileServiceTsService', () => {
  let service: ProfileServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
