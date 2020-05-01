import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalErrorHandler } from './exceptions/global-error-handler.service';
import { SnackMessagesModule } from '@shared/snack-messages/snack-messages.module';
import { ErrorHandlesStrategy } from './exceptions/error-handler.strategy';
import { NotificationModule } from '@shared/notification/notification.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SnackMessagesModule,
    NotificationModule
  ],
  providers: [
    ErrorHandlesStrategy,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ]
})
export class ExceptionModule { }
