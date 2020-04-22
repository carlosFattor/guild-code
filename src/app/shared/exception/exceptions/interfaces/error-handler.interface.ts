import { LoggingService } from '../logging.service';
import { NotificationService } from '../notification.service';
import { ErrorService } from '../error.service';
import { AuthService } from '@shared/security/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

export interface ErrorHandler {
  // tslint:disable-next-line:max-line-length
  handle(): void;
}
