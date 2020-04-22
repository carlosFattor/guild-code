import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Marker, Icon } from 'leaflet';

@Component({
  selector: 'gc-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit {

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
  ) { }

  ngOnInit(): void {
  }

}
