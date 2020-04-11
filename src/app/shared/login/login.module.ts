import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login-component/login.component';
import { ShowHideModule } from '@shared/others/show-hide/show-hide.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginApi } from './login-service/login.api';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ShowHideModule
  ],
  providers: [
    LoginApi
  ],
  exports: [LoginComponent]
})
export class LoginModule { }
