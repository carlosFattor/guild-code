import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapsModule } from '@shared/maps/maps.module';
import { HttpClientModule } from '@angular/common/http';
import { SecurityModule } from '@shared/security/security.module';
import { StorageModule } from './shared/storage/storage.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ExceptionModule } from '@shared/exception/exception.module';

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
    StorageModule,
    ExceptionModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
