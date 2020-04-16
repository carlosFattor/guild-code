import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpApiInterceptor } from './interceptors/http-api-interceptor';
import { HttpJwtInterceptor } from './interceptors/http-jwt.interceptor';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './guard/auth-guard.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpApiInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpJwtInterceptor,
      multi: true
    }
  ]
})
export class SecurityModule {
}
