import { TestBed } from '@angular/core/testing';

import { UserGeoLocationService } from './user-geo-location.service';

describe('UserGeoLocationService', () => {
  let service: UserGeoLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserGeoLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
