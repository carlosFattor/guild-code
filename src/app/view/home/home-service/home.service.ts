import { Injectable } from '@angular/core';
import { UserStateService } from '@shared/user-state/user-state-service/user-state.service';
import { UserModel } from '@domain/user.model';
import { GeoLocationService } from '@shared/geo-location/geo-location.service';
import { Observable } from 'rxjs/internal/Observable';
import { Location } from '@domain/location.interface';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  user$: Observable<UserModel> | null = null;
  userLocation$: Observable<Location | null> = null;

  constructor(
    private userState: UserStateService,
    private geoLocation: GeoLocationService
  ) {
    this.user$ = this.userState.user$;
    this.userLocation$ = this.geoLocation.userLocation$;
  }
}
