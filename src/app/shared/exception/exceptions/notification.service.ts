import { Injectable } from '@angular/core';
import { SnackService } from '@shared/snack-messages/snack-service/snack-service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private snackService: SnackService
  ) { }

  showError(messages: string[]): void {
    this.snackService.openSnackInfoC(messages);
  }

}
