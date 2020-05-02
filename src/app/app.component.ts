import { Component } from '@angular/core';
import { environment } from '@environment';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';
import { RegisterService } from '@shared/register/register.service';

@Component({
  selector: 'gc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'guild-code';

  constructor(
    private swPush: SwPush,
    private registerService: RegisterService
  ) {
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
          .subscribe((data) => {
            console.log('[Click] Notification clicked: ', data);
          });
      })
      .catch(err => console.error('Could not subscribe to notifications', err));
  }
}
