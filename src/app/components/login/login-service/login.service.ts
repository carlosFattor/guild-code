import { Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';
import { LoginApi } from './login.api';
import { Observable } from 'rxjs/internal/Observable';
import { UserModel } from '@domain/user.model';
import { tap, take, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { StorageService } from '@shared/storage/storage.service';
import { UserGeoLocationService } from '@shared/geo-location/user-geo-location.service';
import { UserStateService } from '@shared/user-state/user-state-service/user-state.service';

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
    private userLocation: UserGeoLocationService
  ) {
    this.user$ = this.userState.user$;
  }

  loadUserData(params: Params): void {
    if (params?.code) {
      this.user$ = this.loginApi.fetchUserData(params.code)
        .pipe(
          take(1),
          tap(data => {
            const temp = this.storage.formatData(data);
            this.storage.localStorage(null, () => {
              return temp;
            });
            this.userState.user = temp;
          }),
          switchMap(loginData => of(loginData.userData)),
          tap(() => this.router.navigateByUrl('home'))
        );
    }
  }

  tryGetUserLocation(): void {
    this.userLocation.getLocation();
  }
}
