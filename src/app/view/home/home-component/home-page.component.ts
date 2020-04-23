import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Marker, Icon } from 'leaflet';
import { Observable, Subscription } from 'rxjs';
import { UserModel } from '@domain/user.model';
import { UserStateService } from '@shared/user-state/user-state-service/user-state.service';
import { HomeService } from '../home-service/home.service';
import { UserService } from '@shared/user-service/user.service';

@Component({
  selector: 'gc-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();

  mapOptions = {
    zoom: 13
  };

  markOption = {
    draggable: true,
  };

  markers = [
    new Marker({ lat: -23.533773, lng: -46.625290 }),
    new Marker({ lat: -23.55, lng: -46.625290 }),
    new Marker({ lat: -23.56, lng: -46.625290 }, this.markOption)
      .setIcon(new Icon({
        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Firefox_Developer_Edition_Logo%2C_2017.svg',
        iconSize: [30, 60],
        iconAnchor: [15, 30],
        popupAnchor: [0, -15]
      }))
      .bindPopup('<b>Hello world!</b><br>I am a popup.')
  ];

  constructor(
    private userState: UserStateService,
    private homeService: HomeService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.userService.initListening()
    );
    this.subscription.add(
      this.userState.user$.subscribe(user => {
        if (user) {
          this.homeService.verifyLatLng();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
