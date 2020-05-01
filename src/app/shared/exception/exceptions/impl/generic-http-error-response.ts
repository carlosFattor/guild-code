import { ErrorHandler } from '../interfaces/error-handler.interface';
import { LoggingService } from '../logging.service';
import { NotificationService } from '../../../notification/notification.service';
import { ErrorService } from '../error.service';
import { AuthService } from '@shared/security/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

export class GenericHttpErrorResponse implements ErrorHandler {

  private errorService: ErrorService | null = null;
  private notifier: NotificationService | null = null;
  private logger: LoggingService | null = null;
  private authService: AuthService | null = null;
  private error: Error | null = null;

  // tslint:disable-next-line:max-line-length
  constructor(error: Error, logger?: LoggingService, notifier?: NotificationService, errorService?: ErrorService, authService?: AuthService) {
    this.errorService = errorService;
    this.notifier = notifier;
    this.logger = logger;
    this.error = error;
    this.authService = authService;
  }

  handle(): void {
    const TIMEOUT = 5000;
    const message = this.errorService.getClientMessage(this.error);
    const stack = this.errorService.getServerMessage(this.error as HttpErrorResponse);
    this.notifier.showError([message], TIMEOUT);
    this.logger.logError(message, stack);
    this.authService.loggedOut();
  }
}
