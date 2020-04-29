import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  logError(message: string, stackTrace: string): void {
    console.error({ message, stackTrace });
  }

}
