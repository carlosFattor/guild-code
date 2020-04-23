import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-component/home-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { MapsModule } from '@shared/maps/maps.module';
import { LoginModule } from '@components/login/login.module';
import { SecurityModule } from '@shared/security/security.module';
import { UserStateModule } from '@shared/user-state/user-state.module';
import { GeoLocationModule } from '@shared/geo-location/geo-location.module';
import { UserServiceModule } from '@shared/user-service/user-service.module';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MapsModule,
    LoginModule,
    SecurityModule,
    UserStateModule,
    GeoLocationModule,
    UserServiceModule
  ],
  exports: [
    HomePageComponent
  ]
})
export class HomeModule { }
