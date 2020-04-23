import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { EventBusService } from '@shared/event-bus/event-bus-service/event-bus.service';
import { LatLng } from 'leaflet';
import { UserChannel } from './user-channel';
import { UserEventsEnum } from './user-events.enum';
import { UserApi } from './user.api';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private eventBusService: EventBusService,
    private userApi: UserApi
  ) {
  }

  initListening(): Subscription {
    return this.eventBusService
      .on<LatLng>(new UserChannel(UserEventsEnum.LOAD_USER_LAT_LNG), value => {
        this.updateLatLng(value);
      });
  }

  updateLatLng(value: LatLng): void {
    this.userApi.updateUserLatLng(value)
      .pipe(
        take(1)
      )
      .subscribe(userUpdated => {
        console.log({ userUpdated });
      });
  }
}
