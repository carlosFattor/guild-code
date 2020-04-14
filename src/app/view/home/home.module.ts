import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { MapsModule } from '@shared/maps/maps.module';
import { LoginModule } from '@components/login/login.module';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MapsModule,
    LoginModule
  ],
  exports: [
    HomePageComponent
  ]
})
export class HomeModule { }
