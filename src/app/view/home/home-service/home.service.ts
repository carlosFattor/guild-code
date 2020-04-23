import { Injectable } from '@angular/core';
import { UserStateService } from '@shared/user-state/user-state-service/user-state.service';
import { UserModel } from '@domain/user.model';
import { GeoLocationService } from '@shared/geo-location/geo-location.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  user$: Observable<UserModel> | null = null;

  constructor(
    private userState: UserStateService,
    private geoLocationService: GeoLocationService
  ) {
    this.user$ = this.userState.user$;
  }

  verifyLatLng(): void {
    if (!this.userState.user.latLng) {
      this.geoLocationService.getLocation();
    }
  }
}
