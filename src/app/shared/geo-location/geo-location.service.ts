import { Injectable } from '@angular/core';
import { LatLng } from 'leaflet';
import { EventBusService } from '@shared/event-bus/event-bus-service/event-bus.service';
import { UserEventEmitter } from '@shared/user-service/users-event';
import { UserEventsEnum } from '@shared/user-service/user-events.enum';

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {

  constructor(
    private eventBusService: EventBusService
  ) { }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        const data = new LatLng(latitude, longitude);
        this.eventBusService.emit<LatLng>(new UserEventEmitter(UserEventsEnum.LOAD_USER_LAT_LNG, data));
      });
    } else {
      throw new Error('It\'s impossible to get user location');
    }
  }
}
