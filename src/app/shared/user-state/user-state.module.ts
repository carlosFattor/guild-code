import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStateService } from './user-state-service/user-state.service';
import { StorageModule } from '@shared/storage/storage.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    UserStateService,
    StorageModule
  ]
})
export class UserStateModule { }
