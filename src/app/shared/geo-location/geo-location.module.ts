import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeoLocationService } from './geo-location.service';



@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    GeoLocationService
  ]
})
export class GeoLocationModule { }
