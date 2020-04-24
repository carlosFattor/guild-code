import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { UserApi } from './user.api';
import { UtilsModule } from '@shared/utils/utils.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UtilsModule
  ],
  providers: [
    UserService,
    UserApi
  ]
})
export class UserServiceModule { }
