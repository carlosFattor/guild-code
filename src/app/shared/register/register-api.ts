import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterApi {

  private basePath = '/api/v1/notifier';

  constructor(
    private httpClient: HttpClient
  ) { }

  register(subscription: any, email: string): Observable<any> {
    return this.httpClient.post(`${this.basePath}/subscriber`, { ...subscription, email });
  }
}
