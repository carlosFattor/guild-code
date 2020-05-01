import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserModel } from '@domain/user.model';
import { LatLng } from 'leaflet';
import { EventBusService } from '@shared/event-bus/event-bus-service/event-bus.service';
import { UserEventEmitter } from '@shared/user-service/users-event';
import { UserEventsEnum } from '@shared/user-service/user-events.enum';

@Component({
  selector: 'gc-user-map-popup',
  templateUrl: './user-map-popup.component.html',
  styleUrls: ['./user-map-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMapPopupComponent {

  user: UserModel | null = null;
  userUpdatingPosition = false;
  userNewLocation: LatLng | null = null;

  constructor(
    private eventBus: EventBusService
  ) { }

  eventUpdatingLocation(): void {
    this.eventBus.emit<LatLng>(new UserEventEmitter(UserEventsEnum.USER_UPDATE_POSITION, this.userNewLocation));
  }

}
