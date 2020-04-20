import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  showError(message: string | string[]): void {
    console.log({ message });
  }

}
