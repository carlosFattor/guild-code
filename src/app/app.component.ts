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
  readonly

  constructor(
    private swPush: SwPush,
    private registerService: RegisterService
  ) {
    console.log({ env: environment });

    this.swPush.requestSubscription({
      serverPublicKey: environment.VAPID_PUBLIC_KEY
    })
      .then(sub => {
        console.log('sub: ', sub);
        this.registerService.registerSubscriber(sub);
      })
      .catch(err => console.error('Could not subscribe to notifications', err));
  }
}
