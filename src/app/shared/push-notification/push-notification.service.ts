import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { RegisterService } from '@shared/register/register.service';
import { environment } from '@environment';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor(
    private swPush: SwPush,
    private registerService: RegisterService
  ) { }

  requestSubscription(): void {
    this.swPush.requestSubscription({
      serverPublicKey: environment.VAPID_PUBLIC_KEY
    })
      .then(sub => {
        this.registerService.registerSubscriber(sub);
      })
      .then(() => {
        this.swPush.messages
          .subscribe((message) => {
            console.log('[App] Push message received', message);
          });
        this.swPush.notificationClicks
          .subscribe((event) => {
            console.log('[Click] Notification clicked: ', event);
            if (event.notification.data.url) {
              window.location = event.notification.data.url;
            }
          });
      })
      .catch(err => console.error('Could not subscribe to notifications', err));
  }
}
