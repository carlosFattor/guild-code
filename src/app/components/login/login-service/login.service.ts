import { Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';
import { LoginApi } from './login.api';
import { Observable } from 'rxjs/internal/Observable';
import { UserModel } from '@domain/user.model';
import { tap, take, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { StorageService } from '@shared/storage/storage.service';
import { UserStateService } from '@shared/user-state/user-state-service/user-state.service';
import { LoginData } from '@domain/login-data.model';
import { GeoLocationService } from '@shared/geo-location/geo-location.service';
import { LatLng } from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user$: Observable<UserModel> | null = null;

  constructor(
    private router: Router,
    private loginApi: LoginApi,
    private storage: StorageService,
    private userState: UserStateService,
    private geoLocationService: GeoLocationService
  ) {
    this.user$ = this.userState.user$;
  }

  loadUserData(params: Params): void {
    if (params?.code) {
      this.user$ = this.loginApi.fetchUserData(params.code)
        .pipe(
          take(1),
          tap(data => {
            const temp = this.storage.formatData<LoginData>(data);
            this.storage.localStorage(null, (store: LoginData) => {
              if (!store) {
                return temp;
              }
              store.sub = false;
              store.tokenData = temp.tokenData;
              store.userData = temp.userData;
              return store;
            });
            this.userState.user = temp.userData;
          }),
          switchMap(loginData => of(loginData.userData)),
          tap(() => this.router.navigateByUrl('home'))
        );
    }
  }

  centerUSer(): void {
    const temp = this.userState.user.loc.coordinates;
    const center = new LatLng(temp[0], temp[1]);
    this.geoLocationService.updateCenterMap(center);
  }
}
