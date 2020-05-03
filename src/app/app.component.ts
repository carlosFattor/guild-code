import { Component, OnInit } from '@angular/core';
import { environment } from '@environment';
import { SwPush } from '@angular/service-worker';
import { RegisterService } from '@shared/register/register.service';
import { PushNotificationService } from '@shared/push-notification/push-notification.service';

@Component({
  selector: 'gc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'guild-code';

  constructor(
    private pushNotification: PushNotificationService
  ) {
  }
  ngOnInit(): void {
    this.pushNotification.requestSubscription();
  }
}
