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
import { UtilsService } from '@shared/utils/utils.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { SubscriptionType } from '@domain/subscription-type';
import { SubscriptionFound } from '@domain/subscription-found';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  // tslint:disable-next-line:variable-name
  private _notificationEnabled = new BehaviorSubject<boolean>(false);
  notificationEnabled$ = this._notificationEnabled.asObservable();

  constructor(
    private swPush: SwPush,
    private registerService: RegisterService,
    private userState: UserStateService,
    private storage: StorageService,
    private utils: UtilsService,
    private pushApi: PushNotificationApi
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
        if (event?.notification?.data?.url) {
          window.location = event.notification.data.url;
        }
      });
  }

  verifyUserSubscription(email: string, device: string): Observable<SubscriptionFound> {
    return this.pushApi.verifyUserSubscription(email, device)
      .pipe(
        tap(data => this._notificationEnabled.next((data) ? true : false)),
        tap(data => {
          if (data.subscription.status) {
            console.log('get subscription again and update it');
          }
        })
      );
  }

  requestSubscription(): void {
    this.swPush.requestSubscription({
      serverPublicKey: environment.VAPID_PUBLIC_KEY
    })
      .then(sub => {
        const user = (this.userState.user) ? this.userState.user : null;
        if (sub && user.email) {
          const device = this.utils.getDevice();
          this.registerService.registerSubscriber(sub, user.email, device);
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
