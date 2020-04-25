import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Marker, LatLng, MapOptions } from 'leaflet';
import { Subscription, Subject, Observable } from 'rxjs';
import { UserStateService } from '@shared/user-state/user-state-service/user-state.service';
import { HomeService } from '../home-service/home.service';
import { UserService } from '@shared/user-service/user.service';
import { GeoLocationService } from '@shared/geo-location/geo-location.service';
import { tap } from 'rxjs/operators';
import { EventOptions } from '@shared/types/event-options';

@Component({
  selector: 'gc-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();
  markers$: Observable<Array<Marker> | null>;
  mapOptions$: Observable<MapOptions | null>;
  zoom: number | null = null;
  center: LatLng | null = null;
  eventSubject: Subject<EventOptions> | null = null;

  constructor(
    private userState: UserStateService,
    private userService: UserService,
    private geoLocationService: GeoLocationService,
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.initListenings();
  }

  initListenings(): void {
    this.initVars();

    this.subscription.add(
      this.userState.user$.subscribe(user => {
        if (user && !user.loc) {
          this.geoLocationService.getLocation();
        }
      })
    );
  }

  initVars(): void {
    this.markers$ = this.homeService.markers$;
    this.mapOptions$ = this.homeService.mapOptions$
      .pipe(tap(data => {
        this.zoom = data.zoom;
        this.center = data.center as LatLng;
      }));
    this.eventSubject = this.homeService.eventSubject;
  }

  handleEvent(eventType: string, event: any): void {
    const data: EventOptions = {
      eventType,
      center: this.center,
      zoom: this.zoom
    };
    this.eventSubject.next(data);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
