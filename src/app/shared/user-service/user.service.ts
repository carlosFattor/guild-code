import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { EventBusService } from '@shared/event-bus/event-bus-service/event-bus.service';
import { LatLng } from 'leaflet';
import { UserChannel } from './user-channel';
import { UserEventsEnum } from './user-events.enum';
import { UserApi } from './user.api';
import { take } from 'rxjs/operators';
import { StorageService } from '@shared/storage/storage.service';
import { UserStateService } from '@shared/user-state/user-state-service/user-state.service';
import { UserModel } from '@domain/user.model';
import { UtilsService } from '@shared/utils/utils.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private eventBusService: EventBusService,
    private userApi: UserApi,
    private store: StorageService,
    private userState: UserStateService,
    private utils: UtilsService
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
        const temp = this.store.localStorage<UserModel>('userData', (data) => {
          return data = this.utils.getFieldsFromObject(userUpdated);
        });
        this.userState.user = temp;
      });
  }

  fetchUsers(): Observable<Array<UserModel>> {
    return this.userApi.fetchUsers();
  }
}
