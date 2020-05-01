import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { UserApi } from './user.api';
import { UtilsModule } from '@shared/utils/utils.module';
import { NotificationModule } from '@shared/notification/notification.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UtilsModule,
    NotificationModule
  ],
  providers: [
    UserService,
    UserApi
  ]
})
export class UserServiceModule { }
