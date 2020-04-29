import { ErrorHandler } from '../interfaces/error-handler.interface';
import { ErrorService } from '../error.service';
import { NotificationService } from '../notification.service';
import { LoggingService } from '../logging.service';
import { AuthService } from '@shared/security/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

export class GeolocationErrorResponse implements ErrorHandler {

  private errorService: ErrorService | null = null;
  private notifier: NotificationService | null = null;
  private logger: LoggingService | null = null;
  private error: Error | null = null;

  // tslint:disable-next-line:max-line-length
  constructor(error: Error, logger?: LoggingService, notifier?: NotificationService, errorService?: ErrorService) {
    this.errorService = errorService;
    this.errorService = errorService;
    this.notifier = notifier;
    this.logger = logger;
    this.error = error;
  }

  handle(): void {
    const TIMEOUT = 5000;
    // tslint:disable-next-line:no-string-literal
    const error = this.error['error'];
    const message = this.errorService.getClientMessage(error);
    const stackTrace = this.errorService.getClientStack(error);
    this.notifier.showError([message], TIMEOUT);
    this.logger.logError(message, stackTrace);
  }
}
