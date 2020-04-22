import { ErrorHandler } from '../interfaces/error-handler.interface';
import { LoggingService } from '../logging.service';
import { NotificationService } from '../notification.service';
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
  constructor(logger: LoggingService, notifier: NotificationService, errorService: ErrorService, authService: AuthService, error: Error) {
    this.errorService = errorService;
    this.notifier = notifier;
    this.logger = logger;
    this.error = error;
  }

  handle(): void {
    const TIMEOUT = 5000;
    const message = this.errorService.getServerMessage(this.error as HttpErrorResponse);
    const stackTrace = this.errorService.getClientMessage(this.error);
    this.notifier.showError([message], TIMEOUT);
    this.logger.logError(message, stackTrace);
    this.authService.loggedOut();
  }

}
