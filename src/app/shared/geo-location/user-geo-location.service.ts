import { Injectable } from '@angular/core';
import { LatLng } from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class UserGeoLocationService {

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        const data = new LatLng(latitude, longitude);
        console.log({ data });
      });
    } else {
      throw new Error('It\'s impossible to get user location');
    }
  }
}
