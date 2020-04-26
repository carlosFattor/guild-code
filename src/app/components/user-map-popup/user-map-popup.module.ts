import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserMapPopupComponent } from './user-popup/user-map-popup.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    UserMapPopupComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
  ]
})
export class UserMapPopupModule { }
