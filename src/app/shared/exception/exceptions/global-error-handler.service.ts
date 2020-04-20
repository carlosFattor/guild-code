import { ErrorHandler, Injector, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from './error.service';
import { LoggingService } from './logging.service';
import { NotificationService } from './notification.service';

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

    switch (error.constructor) {
      case HttpErrorResponse:
        this.handleHttpErrorResponse(logger, notifier, errorService, error as HttpErrorResponse)
        break;

      default:
        this.handleDefaultError(logger, notifier, errorService, error as HttpErrorResponse)
        break;
    }

  }

  private handleHttpErrorResponse(
    logger: LoggingService,
    notifier: NotificationService,
    errorService: ErrorService,
    error: HttpErrorResponse): void {

    const message = errorService.getServerMessage(error);
    const stackTrace = errorService.getServerStack(error);
    notifier.showError(message);
    logger.logError(message, stackTrace);
  }

  private handleDefaultError(
    logger: LoggingService,
    notifier: NotificationService,
    errorService: ErrorService,
    error: HttpErrorResponse): void {

    const message = errorService.getServerMessage(error);
    const stackTrace = errorService.getServerStack(error);
    notifier.showError(message);
    logger.logError(message, stackTrace);
  }

}
