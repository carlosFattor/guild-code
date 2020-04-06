import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ShowHideModule } from '@shared/others/show-hide/show-hide.module';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ShowHideModule
  ],
  exports: [LoginComponent]
})
export class LoginModule { }
