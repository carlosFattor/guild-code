import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { RegisterService } from '@shared/register/register.service';
import { environment } from '@environment';
import { PayloadNotification } from '@domain/payload-notification';
import { UserStateService } from '@shared/user-state/user-state-service/user-state.service';
import { StorageService } from '@shared/storage/storage.service';
import { filter, tap, take, first } from 'rxjs/operators';
import { PushNotificationApi } from './push-notification.api';
import { LoginData } from '@domain/login-data.model';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor(
    private swPush: SwPush,
    private registerService: RegisterService,
    private userState: UserStateService,
    private storage: StorageService
  ) {
    this.listeningEvents();
  }

  private listeningEvents(): void {
    this.swPush.messages
      .subscribe((message: PayloadNotification) => {
        console.log('[App] Push message received', message);
      });

    this.swPush.notificationClicks
      .subscribe((event) => {
        console.log('[Click] Notification clicked: ', event);
        if (event.notification.data.url) {
          // window.location = event.notification.data.url;
        }
      });
  }

  requestSubscription(): void {
    this.swPush.requestSubscription({
      serverPublicKey: environment.VAPID_PUBLIC_KEY
    })
      .then(sub => {
        const user = (this.userState.user) ? this.userState.user : null;
        if (sub && user.email) {
          this.registerService.registerSubscriber(sub, user.email);
          this.setSubscriptionUpdated();
        }
      })
      .catch(err => console.error('Could not subscribe to notifications', err));
  }

  setSubscriptionUpdated(): void {
    this.storage.localStorage(null, (data: LoginData) => {
      if (!data) {
        data = {};
      }
      data.sub = true;
      return data;
    });
  }
}
