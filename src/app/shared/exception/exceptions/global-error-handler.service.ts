import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlesStrategy } from './error-handler.strategy';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private HTTP_ERROR_CODE = 401;

  constructor(private errorStrategy: ErrorHandlesStrategy) { }

  handleError(error: Error): void {
    if (error instanceof HttpErrorResponse && error.status === this.HTTP_ERROR_CODE) {
      return;
    }

    this.errorStrategy.getStrategy(error).handle();
  }
}
