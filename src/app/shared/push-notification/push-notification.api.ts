import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationApi {

  private URI_USER_SUBSCRIPTION = '/api/v1/notifier/subscriber';

  constructor(
    private httpClient: HttpClient
  ) { }

  verifyUserSubscription(email: string): Observable<any> {
    return this.httpClient.get<any>(`${this.URI_USER_SUBSCRIPTION}/${email}`);
  }
}
