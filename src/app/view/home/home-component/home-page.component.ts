import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Marker, Icon, LatLng, MapOptions } from 'leaflet';
import { Subscription, Subject, Observable } from 'rxjs';
import { UserStateService } from '@shared/user-state/user-state-service/user-state.service';
import { HomeService } from '../home-service/home.service';
import { UserService } from '@shared/user-service/user.service';
import { GeoLocationService } from '@shared/geo-location/geo-location.service';
import { tap } from 'rxjs/operators';

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

  constructor(
    private userState: UserStateService,
    private userService: UserService,
    private geoLocationService: GeoLocationService,
  ) { }

  ngOnInit(): void {
    this.markers$ = this.geoLocationService.markers$;
    this.mapOptions$ = this.geoLocationService.mapOptions$
      .pipe(tap(data => {
        this.zoom = data.zoom;
        this.center = data.center as LatLng;
      }));
    this.subscription.add(
      this.userService.initListening()
    );

    this.subscription.add(
      this.userState.user$.subscribe(user => {
        if (user && !user.loc) {
          this.geoLocationService.getLocation();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
