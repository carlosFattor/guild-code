import { Injectable, NgZone } from '@angular/core';
import { SnackService } from '@shared/snack-messages/snack-service/snack-service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private snackService: SnackService,
    private zone: NgZone
  ) { }

  showError(messages: string[], duration?: number): void {
    this.zone.runGuarded(() => {
      this.snackService.openSnackInfoC(messages, duration);
    });
  }

}
