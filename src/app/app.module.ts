import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapsModule } from '@shared/maps/maps.module';
import { HttpClientModule } from '@angular/common/http';
import { SecurityModule } from '@shared/security/security.module';
import { StorageModule } from './shared/storage/storage.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MapsModule.forRoot(),
    HttpClientModule,
    SecurityModule,
    StorageModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
