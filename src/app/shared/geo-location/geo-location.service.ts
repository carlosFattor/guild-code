import { Injectable, OnDestroy } from '@angular/core';
import { LatLng, Marker, MapOptions, Icon, tileLayer, DivIcon, Util } from 'leaflet';
import { EventBusService } from '@shared/event-bus/event-bus-service/event-bus.service';
import { UserEventEmitter } from '@shared/user-service/users-event';
import { UserEventsEnum } from '@shared/user-service/user-events.enum';
import { BehaviorSubject, Observable, Subscription, of } from 'rxjs';
import { UserStateService } from '@shared/user-state/user-state-service/user-state.service';
import { Location } from '@domain/location.interface';
import { tap, take } from 'rxjs/operators';
import { UserService } from '@shared/user-service/user.service';
import { UserModel } from '@domain/user.model';

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService implements OnDestroy {

  private subsCript = new Subscription();
  private readonly ZOOM_USER = 17;
  private readonly LAT_DEFAULT = 46.879966;
  private readonly LNG_DEFAULT = -121.726909;
  private center = new LatLng(this.LAT_DEFAULT, this.LNG_DEFAULT);
  private readonly defaultMapOptions = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 5,
    center: this.center
  };

  // tslint:disable-next-line: variable-name
  private readonly _markers = new BehaviorSubject<Array<Marker>>(new Array<Marker>());
  markers$ = this._markers.asObservable();

  get markers(): Array<Marker> {
    return this._markers.getValue();
  }

  set markers(markers: Array<Marker>) {
    this._markers.next(markers);
  }

  // tslint:disable-next-line:variable-name
  private readonly _mapOptions = new BehaviorSubject<MapOptions>(this.defaultMapOptions);
  mapOptions$ = this._mapOptions.asObservable();

  get mapOptions(): MapOptions {
    return this._mapOptions.getValue();
  }

  set mapOptions(mapOptions: MapOptions) {
    this._mapOptions.next(mapOptions);
  }

  constructor(
    private eventBusService: EventBusService,
    private userState: UserStateService,
    private userService: UserService
  ) {
    this.initListening();
  }

  initListening(): Subscription {
    return this.userState.user$
      .pipe(
        tap(user => {
          if (user && user.loc) {
            const temp = this.mapOptions;
            this.center = new LatLng(user.loc.coordinates[0], user.loc.coordinates[1]);
            temp.center = this.center;
            temp.zoom = this.ZOOM_USER;
            this.mapOptions = temp;
          } else {
            this.mapOptions = this.defaultMapOptions;
          }
        })
      )
      .subscribe();
  }

  getMarkets(center: LatLng, zoom: number): void {
    this.userService.fetchUsersByLatLng(center, zoom)
      .pipe(
        take(1)
      ).subscribe(users => {
        this.formatMarkers(users);
      });
  }

  private formatMarkers(users: Array<UserModel>): void {
    const tempMarkers = new Array<Marker>();
    users.forEach((user, i) => {
      const iconSettings = {
        // tslint:disable-next-line:max-line-length
        mapIconUrl: `<svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 149 178"><defs><clipPath id="circleView"><circle cx="75" cy="75" r="55" fill="#FFFFFF" /></clipPath></defs><path fill="{mapIconColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="M126 23l-6-6A69 69 0 0 0 74 1a69 69 0 0 0-51 22A70 70 0 0 0 1 74c0 21 7 38 22 52l43 47c6 6 11 6 16 0l48-51c12-13 18-29 18-48 0-20-8-37-22-51z"/><circle fill="{mapIconColorInnerCircle}" cx="74" cy="75" r="61"/><circle fill="#FFF" cx="74" cy="75" r="{pinInnerCircleRadius}"/><image href="${user.avatar_url}" height="150px" width="150px" clip-path="url(#circleView)"/></svg>`,
        mapIconColor: 'blue',
        mapIconColorInnerCircle: '#fff',
        pinInnerCircleRadius: 48
      };

      const divIcon = new DivIcon({
        className: 'leaflet-data-marker',
        html: Util.template(iconSettings.mapIconUrl, iconSettings),
        iconAnchor: [18, 42],
        iconSize: [60, 60],
        popupAnchor: [0, -30]
      });
      const lat = user.loc.coordinates[0];
      const lng = user.loc.coordinates[1];
      const marker = new Marker({ lat, lng }, { icon: divIcon, riseOnHover: true });
      tempMarkers.push(marker);
    });
    this.markers = tempMarkers;
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        this.eventBusService.emit<LatLng>(new UserEventEmitter(UserEventsEnum.LOAD_USER_LAT_LNG, new LatLng(latitude, longitude)));
      }, (error) => {
        console.log({ error });
      }, { maximumAge: 600000, timeout: 10000, enableHighAccuracy: true });
    } else {
      throw new Error('It\'s impossible to get user location');
    }
  }

  ngOnDestroy(): void {
    this.subsCript.unsubscribe();
  }
}
