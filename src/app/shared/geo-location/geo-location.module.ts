import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeoLocationService } from './geo-location.service';
import { UserStateModule } from '@shared/user-state/user-state.module';



@NgModule({
  imports: [
    CommonModule,
    UserStateModule
  ],
  providers: [
    GeoLocationService
  ]
})
export class GeoLocationModule { }
