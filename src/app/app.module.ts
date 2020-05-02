import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { MapsModule } from '@shared/maps/maps.module';
import { HttpClientModule } from '@angular/common/http';
import { SecurityModule } from '@shared/security/security.module';
import { StorageModule } from './shared/storage/storage.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ExceptionModule } from '@shared/exception/exception.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SnackMessagesModule } from '@shared/snack-messages/snack-messages.module';
import { MatIconModule } from '@angular/material/icon';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LoginModule } from '@components/login/login.module';
import { PopUpModule } from '@shared/pop-up/pop-up.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { RegisterModule } from '@shared/register/register.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    // MapsModule.forRoot(),
    HttpClientModule,
    SecurityModule,
    StorageModule,
    ExceptionModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    SnackMessagesModule,
    MatIconModule,
    LeafletModule,
    LoginModule,
    RegisterModule
  ],
  providers: [
    PopUpModule,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
