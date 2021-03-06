import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PushNotificationService } from './push-notification.service';
import { StorageModule } from '@shared/storage/storage.module';
import { PushNotificationApi } from './push-notification.api';
import { UtilsModule } from '@shared/utils/utils.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    PushNotificationService,
    PushNotificationApi,
    UtilsModule
  ]
})
export class PushNotificationModule { }
