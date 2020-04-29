import { Injectable, OnDestroy } from '@angular/core';
import { UserStateService } from '@shared/user-state/user-state-service/user-state.service';
import { UserModel } from '@domain/user.model';
import { GeoLocationService } from '@shared/geo-location/geo-location.service';
import { Observable } from 'rxjs/internal/Observable';
import { Location } from '@domain/location.interface';
import { Marker, MapOptions, LatLng } from 'leaflet';
import { tap, debounceTime, filter, catchError } from 'rxjs/operators';
import { Subject, Subscription, throwError } from 'rxjs';
import { EventOptions } from '@shared/types/event-options';
import { MapEvents } from '@shared/utils/map-events.enum';
import { UserService } from '@shared/user-service/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService implements OnDestroy {

  private subScrip = new Subscription();
  markers$: Observable<Array<Marker> | null>;
  mapOptions$: Observable<MapOptions | null>;
  eventSubject = new Subject<EventOptions>();
  private readonly DEBOUNCE_TIME = 500;

  constructor(
    private geoLocationService: GeoLocationService,
    private userService: UserService
  ) {
    this.subScrip.add(
      this.userService.initListeningUserPositionUpdated()
    );

    // this.subScrip.add(
    //   this.userService.initListeningUserUpdatingLocation()
    // );
    this.initVars();
    this.handleEventMap();
  }

  initVars(): void {
    this.markers$ = this.geoLocationService.markers$;
    this.mapOptions$ = this.geoLocationService.mapOptions$;
  }

  private handleEventMap(): void {
    this.eventSubject.pipe(
      debounceTime(this.DEBOUNCE_TIME),
      filter(event => {
        return event.eventType === MapEvents.mapMoveEnd;
      }),
      tap(event => {
        this.geoLocationService.getMarkets(event.center, event.zoom);
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.subScrip.unsubscribe();
  }

}
