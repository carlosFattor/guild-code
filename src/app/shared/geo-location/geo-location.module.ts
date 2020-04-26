import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeoLocationService } from './geo-location.service';
import { UserStateModule } from '@shared/user-state/user-state.module';
import { UserMapPopupModule } from '@components/user-map-popup/user-map-popup.module';



@NgModule({
  imports: [
    CommonModule,
    UserStateModule,
    UserMapPopupModule
  ],
  providers: [
    GeoLocationService
  ]
})
export class GeoLocationModule { }
