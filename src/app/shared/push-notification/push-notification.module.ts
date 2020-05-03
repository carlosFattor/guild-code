import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PushNotificationService } from './push-notification.service';
import { StorageModule } from '@shared/storage/storage.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    PushNotificationService
  ]
})
export class PushNotificationModule { }
