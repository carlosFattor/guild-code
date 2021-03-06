import { Injectable, OnDestroy } from '@angular/core';
import { LatLng, Marker, MapOptions, tileLayer, DivIcon, Util, Layer, Content, Popup } from 'leaflet';
import { EventBusService } from '@shared/event-bus/event-bus-service/event-bus.service';
import { UserEventEmitter } from '@shared/user-service/users-event';
import { UserEventsEnum } from '@shared/user-service/user-events.enum';
import { BehaviorSubject, Subscription, of, throwError } from 'rxjs';
import { UserStateService } from '@shared/user-state/user-state-service/user-state.service';
import { tap, take, catchError } from 'rxjs/operators';
import { UserService } from '@shared/user-service/user.service';
import { UserModel } from '@domain/user.model';
import { PopUpFactory } from '@shared/pop-up/pop-up-factory/pop-up.factory';
import { GeoLocationUtils } from './geo-locations.utils';
import { GeolocationErrorResponse } from '@shared/exception/exceptions/impl/geolocation-error.response';
import { UserChannel } from '@shared/user-service/user-channel';

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService implements OnDestroy {

  private subsCript = new Subscription();
  private geoLocUtils = new GeoLocationUtils();

  // tslint:disable-next-line: variable-name
  private readonly _markers = new BehaviorSubject<Array<Marker>>(new Array<Marker>());
  markers$ = this._markers.asObservable();
  private userUpdatingPosition = false;

  get markers(): Array<Marker> {
    return this._markers.getValue();
  }

  set markers(markers: Array<Marker>) {
    this._markers.next(markers);
  }

  // tslint:disable-next-line:variable-name
  private readonly _mapOptions = new BehaviorSubject<MapOptions>(this.geoLocUtils.getDefaultMapOptions());
  mapOptions$ = this._mapOptions.asObservable();

  get mapOptions(): MapOptions {
    return this._mapOptions.getValue();
  }

  set mapOptions(mapOptions: MapOptions) {
    this._mapOptions.next(mapOptions);
  }

  constructor(
    private eventBus: EventBusService,
    private userState: UserStateService,
    private userService: UserService,
    private popUpFactory: PopUpFactory
  ) {
    this.initListening();
    this.listeningUserUpdatingLocation();
  }

  initListening(): Subscription {
    return this.userState.user$
      .pipe(
        tap(user => {
          if (user && user?.loc?.coordinates) {
            const temp = this.mapOptions;
            this.geoLocUtils.center = new LatLng(user.loc.coordinates[0], user.loc.coordinates[1]);
            temp.center = this.geoLocUtils.center;
            temp.zoom = this.geoLocUtils.ZOOM_USER;
            this.mapOptions = temp;
          } else {
            this.mapOptions = this.geoLocUtils.getDefaultMapOptions();
          }
        })
      )
      .subscribe();
  }

  listeningUserUpdatingLocation(): Subscription {
    return this.eventBus
      .on<LatLng>(new UserChannel(UserEventsEnum.USER_UPDATE_POSITION), value => {
        this.userService.updateLatLng(value);
        this.userUpdatingPosition = false;
      });
  }

  listeningUserUpdatingPosition(newLocation: LatLng): void {
    this.userUpdatingPosition = true;
    const user = this.userState.user;
    this.formatMarkers([user], this.userUpdatingPosition, newLocation);
  }

  getMarkets(center: LatLng, zoom: number): void {

    this.userService.fetchUsersByLatLng(center, zoom)
      .pipe(
        take(1),
        catchError((error: Error) => {
          error.message = 'Não foi possivel obter informação de localização';
          return throwError(new GeolocationErrorResponse(error));
        })
      ).subscribe(users => {
        if (!this.userUpdatingPosition) {
          this.formatMarkers(users);
        }
      });
  }

  getRefComponent(user: UserModel, userUpdatingPosition = false, userNewLocation = null)
    : string | HTMLElement | ((layer: Layer) => Content) | Popup {

    return this.popUpFactory.loadComponent(user, userUpdatingPosition, userNewLocation);
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        this.eventBus.emit<LatLng>(new UserEventEmitter(UserEventsEnum.LOAD_USER_LAT_LNG, new LatLng(latitude, longitude)));
      }, (error) => {
        console.log({ error });
      }, { maximumAge: 600000, timeout: 10000, enableHighAccuracy: true });
    } else {
      throw new Error('It\'s impossible to get user location');
    }
  }

  updateCenterMap(center: LatLng): void {
    const temp = this.mapOptions;
    temp.center = center;
    this.mapOptions = temp;
  }

  private formatMarkers(users: Array<UserModel>, userUpdatingPosition: boolean = false, newLocation?: LatLng): void {
    const tempMarkers = new Array<Marker>();
    const userLogged = this.userState.user;

    users.forEach((user, i) => {
      const iconSettings = this.geoLocUtils.iconDefaultValue(user);
      const divIcon = this.geoLocUtils.getNewIcon(iconSettings.mapIconUrl, iconSettings);

      let center: LatLng | null = null;
      if (!userUpdatingPosition) {
        center = this.geoLocUtils.formatLatLng(user.loc.coordinates[0], user.loc.coordinates[1]);
      } else {
        center = newLocation;
      }
      const markerOptions = { icon: divIcon, riseOnHover: true, draggable: false };

      if (
        userLogged &&
        userLogged.loc.coordinates[0] === user.loc.coordinates[0] &&
        userLogged.loc.coordinates[1] === user.loc.coordinates[1]
      ) {
        markerOptions.draggable = true;
      }

      const marker = new Marker(center, markerOptions);
      marker.bindPopup(this.getRefComponent(user, userUpdatingPosition, newLocation)).openPopup();
      if (markerOptions.draggable) {
        marker.on('dragend', (data) => {
          this.listeningUserUpdatingPosition(data.target.getLatLng());
        });

      }
      tempMarkers.push(marker);
    });
    this.markers = tempMarkers;
  }

  ngOnDestroy(): void {
    this.subsCript.unsubscribe();
  }
}
