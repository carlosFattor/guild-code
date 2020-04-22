import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserGeoLocationService } from './user-geo-location.service';



@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    UserGeoLocationService
  ]
})
export class GeoLocationModule { }
