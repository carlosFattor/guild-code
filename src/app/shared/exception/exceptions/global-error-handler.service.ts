import { ErrorHandler, Injector, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from './error.service';
import { LoggingService } from './logging.service';
import { NotificationService } from './notification.service';
import { AuthService } from '@shared/security/services/auth.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private HTTP_ERROR_CODE = 401;

  constructor(private injector: Injector) { }

  handleError(error: Error): void {
    if (error instanceof HttpErrorResponse && error.status === this.HTTP_ERROR_CODE) {
      return;
    }

    const errorService = this.injector.get(ErrorService);
    const logger = this.injector.get(LoggingService);
    const notifier = this.injector.get(NotificationService);
    const authService = this.injector.get(AuthService);

    switch (error.constructor) {
      case HttpErrorResponse:
        this.handleHttpErrorResponse(logger, notifier, errorService, error as HttpErrorResponse, authService);
        break;

      default:
        console.log(error);
        break;
    }

  }

  private handleHttpErrorResponse(
    logger: LoggingService,
    notifier: NotificationService,
    errorService: ErrorService,
    error: HttpErrorResponse,
    auth: AuthService): void {

    const message = errorService.getServerMessage(error);
    const stackTrace = errorService.getClientMessage(error);
    notifier.showError([message]);
    logger.logError(message, stackTrace);
    auth.loggedOut();
  }
}
