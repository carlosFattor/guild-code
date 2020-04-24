import { ErrorHandler } from './interfaces/error-handler.interface';
import { Injectable, Injector } from '@angular/core';
import { ErrorService } from './error.service';
import { LoggingService } from './logging.service';
import { NotificationService } from './notification.service';
import { AuthService } from '@shared/security/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { GenericHttpErrorResponse } from './impl/generic-http-error-response';

@Injectable()
export class ErrorHandlesStrategy {

  constructor(private injector: Injector) { }

  getStrategy(error: Error): ErrorHandler {

    const errorService = this.injector.get(ErrorService);
    const logger = this.injector.get(LoggingService);
    const notifier = this.injector.get(NotificationService);
    const authService = this.injector.get(AuthService);

    switch (error.constructor) {
      case HttpErrorResponse:
        return new GenericHttpErrorResponse(logger, notifier, errorService, authService, error);

      default:
        return new GenericHttpErrorResponse(logger, notifier, errorService, authService, error);
    }

    console.log({ error });
  }
}
