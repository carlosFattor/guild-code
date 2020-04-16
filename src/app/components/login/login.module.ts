import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login-component/login.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginApi } from './login-service/login.api';
import { LoginService } from './login-service/login.service';
import { StorageModule } from '@shared/storage/storage.module';
import { TagsModule } from '@components/tags/tags.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    StorageModule,
    TagsModule
  ],
  providers: [
    LoginApi,
    LoginService
  ],
  exports: [LoginComponent]
})
export class LoginModule { }