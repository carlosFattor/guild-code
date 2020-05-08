import { ErrorHandler } from '../interfaces/error-handler.interface';
import { ErrorService } from '../error.service';
import { NotificationService } from '@shared/notification/notification.service';
import { LoggingService } from '../logging.service';
import { Observable } from 'rxjs/internal/Observable';
import { HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs/operators';

export class HttpInterceptionErrorResponse implements ErrorHandler {

  private errorService: ErrorService | null = null;
  private logger: LoggingService | null = null;
  private error: Error | null = null;

  constructor(error: Error, logger?: LoggingService, errorService?: ErrorService) {
    this.errorService = errorService;
    this.errorService = errorService;
    this.logger = logger;
    this.error = error;
  }

  handle(): void {
    // tslint:disable-next-line:no-string-literal
    const error = this.error['error'];
    const message = this.errorService.getClientMessage(error);
    const stackTrace = this.errorService.getClientStack(error);
    this.logger.logError(message, stackTrace);
  }

}
