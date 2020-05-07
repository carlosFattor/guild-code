import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubscriptionType } from '@domain/subscription-type';
import { SubscriptionFound } from '@domain/subscription-found';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationApi {

  private URI_USER_SUBSCRIPTION = '/api/v1/notifier/subscriber';

  constructor(
    private httpClient: HttpClient
  ) { }

  verifyUserSubscription(email: string, device: string): Observable<SubscriptionFound> {
    return this.httpClient.get<SubscriptionFound>(`${this.URI_USER_SUBSCRIPTION}/${email}/${device}`);
  }
}
