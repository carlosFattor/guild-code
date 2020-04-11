import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapsModule } from '@shared/maps/maps.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpApiInterceptor } from '@shared/security/interceptors/http-api-interceptor';
import { SecurityModule } from '@shared/security/security.module';
import { LoginApi } from '@shared/login/login-service/login.api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MapsModule.forRoot(),
    HttpClientModule,
    SecurityModule
  ],
  providers: [
    LoginApi
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
